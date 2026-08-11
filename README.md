# BuildOn Work

BuildOn Work is a web-based construction workforce platform for connecting daily construction workers and construction companies or site managers.

The long-term goal is to become a miso.kr-like platform in the construction labor market. The product direction is to combine GADA's construction job matching strength with a simple and approachable user experience.

## Target Users

1. Construction daily workers
2. Skilled workers and skilled worker teams
3. Construction companies and site managers

## Initial Service Area

- Gyeonggi-do
- Chungcheong-do

## MVP Core Flow

1. A worker signs up.
2. A construction company registers a site.
3. A construction company posts a job.
4. A worker views and applies to the job.
5. A construction company reviews applicants and confirms attendance.
6. A worker checks confirmed work status.
7. A site manager manages attendance status.
8. Users check payment option and expected settlement information.

## Current Repository Status

This repository currently contains:

- Project standard and planning documents
- A screen-based MVP built with static mock data
- Landing, worker, company, and admin screens
- Post-MVP function scope and implementation planning documents

The current product is still not connected to real DB, authentication, authorization, Supabase, notifications, payments, remittance, settlement, or contract automation.

## Next Development Direction

The next approved planning sequence is:

1. Confirm real function scope.
2. Confirm data model plan.
3. Confirm authentication and role plan.
4. Confirm implementation phases.
5. Start DB, authentication, authorization, or Supabase setup only after explicit approval.

See:

- `docs/FUNCTION_SCOPE.md`
- `docs/DATA_MODEL_PLAN.md`
- `docs/AUTH_ROLE_PLAN.md`
- `docs/IMPLEMENTATION_PHASES.md`
