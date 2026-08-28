create table public.site_manager_sessions (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites (id) on delete cascade,
  access_code text not null,
  session_token_hash text not null unique,
  status text not null default 'active' check (status in ('active', 'expired', 'revoked')),
  expires_at timestamptz not null,
  last_used_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  user_agent text
);

create index site_manager_sessions_site_id_idx
on public.site_manager_sessions (site_id);

create index site_manager_sessions_access_code_idx
on public.site_manager_sessions (access_code);

create index site_manager_sessions_status_idx
on public.site_manager_sessions (status);

create index site_manager_sessions_expires_at_idx
on public.site_manager_sessions (expires_at);

alter table public.site_manager_sessions enable row level security;

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.site_manager_sessions to authenticated;

create policy "Admins can manage site manager sessions"
on public.site_manager_sessions for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Site manager session creation and validation should be handled by
-- security definer RPCs. Do not store raw session tokens or open anon
-- select, update, or delete policies directly on this table.
