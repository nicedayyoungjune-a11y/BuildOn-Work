create or replace function public.handle_new_worker_signup()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  metadata jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  worker_profile_id uuid;
  worker_name text := nullif(btrim(coalesce(new.raw_user_meta_data ->> 'name', '')), '');
  worker_phone text := nullif(btrim(coalesce(new.raw_user_meta_data ->> 'phone', '')), '');
  referral_name_value text := nullif(btrim(coalesce(new.raw_user_meta_data ->> 'referral_name', '')), '');
  referral_phone_value text := nullif(btrim(coalesce(new.raw_user_meta_data ->> 'referral_phone', '')), '');
  preferred_regions_value text[] := '{}'::text[];
  preferred_job_categories_value text[] := '{}'::text[];
  preferred_payment_options_value text[] := '{}'::text[];
begin
  if jsonb_typeof(metadata -> 'preferred_regions') = 'array' then
    select coalesce(array_agg(value), '{}'::text[])
    into preferred_regions_value
    from (
      select nullif(btrim(array_value), '') as value
      from jsonb_array_elements_text(metadata -> 'preferred_regions') as array_values(array_value)
    ) cleaned_values
    where value is not null;
  elsif jsonb_typeof(metadata -> 'preferred_regions') = 'string' then
    select coalesce(array_agg(value), '{}'::text[])
    into preferred_regions_value
    from (
      select nullif(btrim(array_value), '') as value
      from unnest(string_to_array(metadata ->> 'preferred_regions', ',')) as array_values(array_value)
    ) cleaned_values
    where value is not null;
  end if;

  if jsonb_typeof(metadata -> 'preferred_job_categories') = 'array' then
    select coalesce(array_agg(value), '{}'::text[])
    into preferred_job_categories_value
    from (
      select nullif(btrim(array_value), '') as value
      from jsonb_array_elements_text(metadata -> 'preferred_job_categories') as array_values(array_value)
    ) cleaned_values
    where value is not null;
  elsif jsonb_typeof(metadata -> 'preferred_job_categories') = 'string' then
    select coalesce(array_agg(value), '{}'::text[])
    into preferred_job_categories_value
    from (
      select nullif(btrim(array_value), '') as value
      from unnest(string_to_array(metadata ->> 'preferred_job_categories', ',')) as array_values(array_value)
    ) cleaned_values
    where value is not null;
  end if;

  if jsonb_typeof(metadata -> 'preferred_payment_options') = 'array' then
    select coalesce(array_agg(value), '{}'::text[])
    into preferred_payment_options_value
    from (
      select nullif(btrim(array_value), '') as value
      from jsonb_array_elements_text(metadata -> 'preferred_payment_options') as array_values(array_value)
    ) cleaned_values
    where value is not null;
  elsif jsonb_typeof(metadata -> 'preferred_payment_options') = 'string' then
    select coalesce(array_agg(value), '{}'::text[])
    into preferred_payment_options_value
    from (
      select nullif(btrim(array_value), '') as value
      from unnest(string_to_array(metadata ->> 'preferred_payment_options', ',')) as array_values(array_value)
    ) cleaned_values
    where value is not null;
  end if;

  insert into public.users (id, role, name, phone, email)
  values (
    new.id,
    'worker',
    coalesce(worker_name, nullif(split_part(coalesce(new.email, ''), '@', 1), ''), 'worker'),
    worker_phone,
    new.email
  )
  on conflict (id) do nothing;

  insert into public.workers (
    user_id,
    preferred_regions,
    preferred_job_categories,
    preferred_payment_options
  )
  values (
    new.id,
    preferred_regions_value,
    preferred_job_categories_value,
    preferred_payment_options_value
  )
  on conflict (user_id) do update
  set
    preferred_regions = excluded.preferred_regions,
    preferred_job_categories = excluded.preferred_job_categories,
    preferred_payment_options = excluded.preferred_payment_options,
    updated_at = now()
  returning id into worker_profile_id;

  if referral_name_value is not null or referral_phone_value is not null then
    insert into public.referrals (worker_id, referral_name, referral_phone)
    values (worker_profile_id, referral_name_value, referral_phone_value)
    on conflict (worker_id) do nothing;
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_worker_profile on auth.users;

create trigger on_auth_user_created_worker_profile
after insert on auth.users
for each row execute function public.handle_new_worker_signup();
