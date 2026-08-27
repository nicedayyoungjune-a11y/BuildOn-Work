create or replace function public.verify_site_manager_pin(
  input_access_code text,
  input_pin text
)
returns table (
  success boolean,
  site_id uuid,
  site_name text,
  company_name text,
  message text
)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  token_record record;
begin
  select
    site_access_tokens.id as token_id,
    site_access_tokens.site_id,
    sites.site_name,
    companies.company_name,
    site_access_tokens.pin_hash
  into token_record
  from public.site_access_tokens
  join public.sites on sites.id = site_access_tokens.site_id
  join public.companies on companies.id = sites.company_id
  where site_access_tokens.access_code = input_access_code
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
      '접근 코드 또는 PIN을 확인해 주세요.'::text;
    return;
  end if;

  if input_pin is null
    or input_pin = ''
    or extensions.crypt(input_pin, token_record.pin_hash) <> token_record.pin_hash
  then
    return query
    select
      false,
      null::uuid,
      null::text,
      null::text,
      '접근 코드 또는 PIN을 확인해 주세요.'::text;
    return;
  end if;

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
    '확인되었습니다.'::text;
end;
$$;

revoke all on function public.verify_site_manager_pin(text, text) from public;

grant execute on function public.verify_site_manager_pin(text, text)
to anon, authenticated;
