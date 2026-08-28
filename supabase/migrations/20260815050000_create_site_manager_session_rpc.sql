create or replace function public.create_site_manager_session(
  input_access_code text,
  input_pin text,
  input_session_token_hash text,
  input_user_agent text default null
)
returns table (
  success boolean,
  site_id uuid,
  site_name text,
  company_name text,
  session_expires_at timestamptz,
  message text
)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  token_record record;
  next_session_expires_at timestamptz;
begin
  if nullif(btrim(input_access_code), '') is null
    or nullif(btrim(input_pin), '') is null
    or nullif(btrim(input_session_token_hash), '') is null
  then
    return query
    select
      false,
      null::uuid,
      null::text,
      null::text,
      null::timestamptz,
      '접근 코드 또는 PIN을 확인해 주세요.'::text;
    return;
  end if;

  select
    site_access_tokens.id as token_id,
    site_access_tokens.site_id,
    site_access_tokens.access_code,
    site_access_tokens.pin_hash,
    sites.site_name,
    companies.company_name
  into token_record
  from public.site_access_tokens
  join public.sites on sites.id = site_access_tokens.site_id
  join public.companies on companies.id = sites.company_id
  where site_access_tokens.access_code = btrim(input_access_code)
    and site_access_tokens.status = 'active'
    and (
      site_access_tokens.expires_at is null
      or site_access_tokens.expires_at > now()
    )
  limit 1;

  if not found then
    return query
    select
      false,
      null::uuid,
      null::text,
      null::text,
      null::timestamptz,
      '접근 코드 또는 PIN을 확인해 주세요.'::text;
    return;
  end if;

  if extensions.crypt(btrim(input_pin), token_record.pin_hash) <> token_record.pin_hash then
    return query
    select
      false,
      null::uuid,
      null::text,
      null::text,
      null::timestamptz,
      '접근 코드 또는 PIN을 확인해 주세요.'::text;
    return;
  end if;

  next_session_expires_at := now() + interval '8 hours';

  insert into public.site_manager_sessions (
    site_id,
    access_code,
    session_token_hash,
    status,
    expires_at,
    last_used_at,
    user_agent
  )
  values (
    token_record.site_id,
    token_record.access_code,
    btrim(input_session_token_hash),
    'active',
    next_session_expires_at,
    now(),
    input_user_agent
  );

  update public.site_access_tokens
  set
    last_used_at = now(),
    updated_at = now()
  where site_access_tokens.id = token_record.token_id;

  return query
  select
    true,
    token_record.site_id,
    token_record.site_name,
    token_record.company_name,
    next_session_expires_at,
    '확인되었습니다.'::text;
exception
  when unique_violation then
    return query
    select
      false,
      null::uuid,
      null::text,
      null::text,
      null::timestamptz,
      '접근 코드 또는 PIN을 확인해 주세요.'::text;
end;
$$;

revoke all on function public.create_site_manager_session(text, text, text, text) from public;

grant execute on function public.create_site_manager_session(text, text, text, text)
to anon, authenticated;
