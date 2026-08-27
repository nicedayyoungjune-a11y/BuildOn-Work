create table public.site_access_tokens (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites (id) on delete cascade,
  access_code text not null unique,
  pin_hash text not null,
  status text not null default 'active' check (status in ('active', 'inactive', 'expired')),
  expires_at timestamptz,
  last_used_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index site_access_tokens_site_id_idx
on public.site_access_tokens (site_id);

create index site_access_tokens_status_idx
on public.site_access_tokens (status);

alter table public.site_access_tokens enable row level security;

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.site_access_tokens to authenticated;

create policy "Admins can manage site access tokens"
on public.site_access_tokens for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- PIN verification and site-scoped manager access should be handled by
-- security definer RPCs in a later implementation step. Do not open anon
-- select, update, or delete policies directly on this table.
