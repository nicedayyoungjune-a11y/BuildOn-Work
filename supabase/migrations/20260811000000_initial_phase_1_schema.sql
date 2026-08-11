create type public.user_role as enum ('worker', 'company', 'admin');
create type public.account_status as enum ('active', 'inactive', 'suspended');
create type public.site_status as enum ('planned', 'active', 'paused', 'completed');
create type public.job_status as enum ('draft', 'open', 'closed', 'cancelled');
create type public.application_status as enum (
  'applied',
  'under_review',
  'attendance_confirmed',
  'cancelled',
  'no_show',
  'completed'
);
create type public.attendance_status as enum (
  'scheduled',
  'confirmed',
  'cancelled',
  'no_show',
  'completed'
);
create type public.referral_review_status as enum (
  'pending_review',
  'referral_confirmed',
  'payout_candidate',
  'payout_excluded',
  'payout_completed'
);
create type public.inquiry_status as enum ('new', 'reviewing', 'resolved', 'closed');
create type public.notification_type as enum ('attendance_check', 'schedule_change', 'new_job');
create type public.notification_channel as enum ('internal', 'sms', 'kakao');
create type public.notification_status as enum (
  'pending',
  'ready_to_send',
  'sent',
  'failed',
  'responded_yes',
  'responded_no'
);

create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.user_role not null,
  name text not null,
  phone text,
  email text,
  status public.account_status not null default 'active',
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users (id) on delete cascade,
  preferred_regions text[] not null default '{}',
  preferred_job_categories text[] not null default '{}',
  preferred_payment_options text[] not null default '{}',
  experience_summary text,
  profile_status text not null default 'incomplete',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.companies (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references public.users (id) on delete cascade,
  company_name text not null,
  contact_name text not null,
  contact_phone text,
  region text,
  business_status text not null default 'pending_review',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.sites (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  site_name text not null,
  address text not null,
  region text not null,
  required_job_categories text[] not null default '{}',
  status public.site_status not null default 'planned',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites (id) on delete cascade,
  company_id uuid not null references public.companies (id) on delete cascade,
  title text not null,
  work_date date not null,
  start_time time not null,
  end_time time not null,
  job_category text not null,
  required_headcount integer not null check (required_headcount > 0),
  daily_wage integer not null check (daily_wage >= 0),
  payment_option text not null,
  preparation_notes text,
  site_notes text,
  status public.job_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.referrals (
  id uuid primary key default gen_random_uuid(),
  worker_id uuid not null unique references public.workers (id) on delete cascade,
  referral_name text,
  referral_phone text,
  review_status public.referral_review_status not null default 'pending_review',
  admin_note text,
  reviewed_by_user_id uuid references public.users (id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs (id) on delete cascade,
  worker_id uuid not null references public.workers (id) on delete cascade,
  status public.application_status not null default 'applied',
  applied_at timestamptz not null default now(),
  reviewed_by_user_id uuid references public.users (id) on delete set null,
  reviewed_at timestamptz,
  admin_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (job_id, worker_id)
);

create table public.attendance (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null unique references public.applications (id) on delete cascade,
  job_id uuid not null references public.jobs (id) on delete cascade,
  worker_id uuid not null references public.workers (id) on delete cascade,
  site_id uuid not null references public.sites (id) on delete cascade,
  status public.attendance_status not null default 'scheduled',
  confirmed_by_user_id uuid references public.users (id) on delete set null,
  confirmed_at timestamptz,
  completed_at timestamptz,
  absence_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  company_name text,
  inquiry_type text,
  message text not null,
  status public.inquiry_status not null default 'new',
  assigned_admin_user_id uuid references public.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  notification_type public.notification_type not null,
  target_user_id uuid not null references public.users (id) on delete cascade,
  related_site_id uuid references public.sites (id) on delete set null,
  related_job_id uuid references public.jobs (id) on delete set null,
  related_application_id uuid references public.applications (id) on delete set null,
  channel public.notification_channel not null default 'internal',
  status public.notification_status not null default 'pending',
  message text not null,
  sent_at timestamptz,
  responded_at timestamptz,
  failure_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.workers enable row level security;
alter table public.companies enable row level security;
alter table public.sites enable row level security;
alter table public.jobs enable row level security;
alter table public.referrals enable row level security;
alter table public.applications enable row level security;
alter table public.attendance enable row level security;
alter table public.inquiries enable row level security;
alter table public.notifications enable row level security;

create or replace function public.current_user_role()
returns public.user_role
language sql
security definer
set search_path = public
stable
as $$
  select role from public.users where id = auth.uid()
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.current_user_role() = 'admin'
$$;

create or replace function public.owns_company(company_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.companies
    where companies.id = owns_company.company_id
      and companies.owner_user_id = auth.uid()
  )
$$;

create or replace function public.owns_job(job_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.jobs
    join public.companies on companies.id = jobs.company_id
    where jobs.id = owns_job.job_id
      and companies.owner_user_id = auth.uid()
  )
$$;

create policy "Users can view own profile and admins can view all"
on public.users for select
to authenticated
using (id = auth.uid() or public.is_admin());

create policy "Users can create own worker or company profile"
on public.users for insert
to authenticated
with check (id = auth.uid() and role in ('worker', 'company'));

create policy "Users can update own basic profile and admins can update all"
on public.users for update
to authenticated
using (id = auth.uid() or public.is_admin())
with check (id = auth.uid() or public.is_admin());

create policy "Workers can view own worker profile and admins can view all"
on public.workers for select
to authenticated
using (user_id = auth.uid() or public.is_admin());

create policy "Workers can create own worker profile"
on public.workers for insert
to authenticated
with check (user_id = auth.uid());

create policy "Workers can update own worker profile and admins can update all"
on public.workers for update
to authenticated
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

create policy "Companies can view own company and admins can view all"
on public.companies for select
to authenticated
using (owner_user_id = auth.uid() or public.is_admin());

create policy "Companies can create own company profile"
on public.companies for insert
to authenticated
with check (owner_user_id = auth.uid());

create policy "Companies can update own company and admins can update all"
on public.companies for update
to authenticated
using (owner_user_id = auth.uid() or public.is_admin())
with check (owner_user_id = auth.uid() or public.is_admin());

create policy "Authenticated users can view sites"
on public.sites for select
to authenticated
using (true);

create policy "Companies can create own sites"
on public.sites for insert
to authenticated
with check (public.owns_company(company_id) or public.is_admin());

create policy "Companies can update own sites and admins can update all"
on public.sites for update
to authenticated
using (public.owns_company(company_id) or public.is_admin())
with check (public.owns_company(company_id) or public.is_admin());

create policy "Authenticated users can view jobs"
on public.jobs for select
to authenticated
using (true);

create policy "Companies can create own jobs"
on public.jobs for insert
to authenticated
with check (public.owns_company(company_id) or public.is_admin());

create policy "Companies can update own jobs and admins can update all"
on public.jobs for update
to authenticated
using (public.owns_company(company_id) or public.is_admin())
with check (public.owns_company(company_id) or public.is_admin());

create policy "Workers can view own referrals and admins can view all"
on public.referrals for select
to authenticated
using (
  exists (
    select 1 from public.workers
    where workers.id = referrals.worker_id
      and workers.user_id = auth.uid()
  )
  or public.is_admin()
);

create policy "Workers can create own referral record"
on public.referrals for insert
to authenticated
with check (
  exists (
    select 1 from public.workers
    where workers.id = referrals.worker_id
      and workers.user_id = auth.uid()
  )
);

create policy "Admins can update referral review"
on public.referrals for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Workers, owning companies, and admins can view applications"
on public.applications for select
to authenticated
using (
  exists (
    select 1 from public.workers
    where workers.id = applications.worker_id
      and workers.user_id = auth.uid()
  )
  or public.owns_job(job_id)
  or public.is_admin()
);

create policy "Workers can apply to jobs"
on public.applications for insert
to authenticated
with check (
  exists (
    select 1 from public.workers
    where workers.id = applications.worker_id
      and workers.user_id = auth.uid()
  )
);

create policy "Workers, owning companies, and admins can update applications"
on public.applications for update
to authenticated
using (
  exists (
    select 1 from public.workers
    where workers.id = applications.worker_id
      and workers.user_id = auth.uid()
  )
  or public.owns_job(job_id)
  or public.is_admin()
)
with check (
  exists (
    select 1 from public.workers
    where workers.id = applications.worker_id
      and workers.user_id = auth.uid()
  )
  or public.owns_job(job_id)
  or public.is_admin()
);

create policy "Workers, owning companies, and admins can view attendance"
on public.attendance for select
to authenticated
using (
  exists (
    select 1 from public.workers
    where workers.id = attendance.worker_id
      and workers.user_id = auth.uid()
  )
  or public.owns_job(job_id)
  or public.is_admin()
);

create policy "Owning companies and admins can create attendance"
on public.attendance for insert
to authenticated
with check (public.owns_job(job_id) or public.is_admin());

create policy "Owning companies and admins can update attendance"
on public.attendance for update
to authenticated
using (public.owns_job(job_id) or public.is_admin())
with check (public.owns_job(job_id) or public.is_admin());

create policy "Admins can manage inquiries"
on public.inquiries for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Users can view own notifications and admins can view all"
on public.notifications for select
to authenticated
using (target_user_id = auth.uid() or public.is_admin());

create policy "Admins can manage notifications"
on public.notifications for all
to authenticated
using (public.is_admin())
with check (public.is_admin());
