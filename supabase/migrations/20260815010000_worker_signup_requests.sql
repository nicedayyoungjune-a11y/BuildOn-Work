create table public.worker_signup_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  preferred_regions text[] not null default '{}',
  preferred_job_categories text[] not null default '{}',
  preferred_payment_options text[] not null default '{}',
  referral_name text,
  referral_phone text,
  note text,
  status text not null default 'new' check (status in ('new', 'contacted', 'converted', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.worker_signup_requests enable row level security;

grant usage on schema public to anon, authenticated;
grant insert on public.worker_signup_requests to anon, authenticated;
grant select, update, delete on public.worker_signup_requests to authenticated;

create policy "Anyone can submit worker signup requests"
on public.worker_signup_requests for insert
to anon, authenticated
with check (true);

create policy "Admins can manage worker signup requests"
on public.worker_signup_requests for all
to authenticated
using (public.is_admin())
with check (public.is_admin());
