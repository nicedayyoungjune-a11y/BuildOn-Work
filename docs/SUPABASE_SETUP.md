# Supabase Setup

## Purpose

This document records the first Supabase setup direction for BuildOn Work.

The repository now contains local Supabase-ready foundation files, but it is not connected to a real Supabase project until environment variables are provided and migrations are applied.

## Added Foundation

- `.env.example`
- `src/lib/supabase/config.ts`
- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`
- `supabase/migrations/20260811000000_initial_phase_1_schema.sql`

## Required Environment Variables

Copy `.env.example` to `.env.local` and fill:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Do not commit `.env.local`.

## Current Migration Scope

The initial migration defines:

- users
- workers
- companies
- sites
- jobs
- referrals
- applications
- attendance
- inquiries
- notifications

It also defines:

- Phase 1 status enums
- Row Level Security enablement
- Basic worker, company, and admin access policies
- Referral review as an admin-only operations process
- Notification records without external SMS or KakaoTalk sending

## Not Included Yet

- Supabase project linking
- Remote migration execution
- Generated database TypeScript types
- Real signup or login screens
- Middleware route protection
- Server actions or API routes
- SMS or KakaoTalk integration
- Payment, remittance, payout, or settlement features
- Electronic contract automation

## Worker Signup Profile Trigger

Worker signup uses a database trigger draft to avoid relying on a newly created Auth session inside a Server Action.

Migration file to apply manually in Supabase SQL Editor:

- `supabase/migrations/20260815000000_worker_signup_profile_trigger.sql`

The trigger runs after a new `auth.users` row is created and creates:

- `public.users`
- `public.workers`
- `public.referrals` only when referral name or referral phone metadata exists

Signup metadata expected from the application:

- `name`
- `phone`
- `preferred_regions`
- `preferred_job_categories`
- `preferred_payment_options`
- `referral_name`
- `referral_phone`

Security notes for this trigger:

- Do not put the password in user metadata.
- Do not trust metadata for authorization decisions.
- The trigger fixes `role` to `worker` instead of reading role from metadata.
- Referral records are for admin review only.
- Automatic referral payout, remittance, or settlement is not included.
- This SQL must be reviewed and applied manually in Supabase SQL Editor in the next step.

## MVP Worker Signup Request Intake

Formal Auth signup/login is on hold for the MVP. Worker intake now uses a request-first flow so early users can submit contact and preference information without creating a password-based account.

Migration file to apply manually in Supabase SQL Editor:

- `supabase/migrations/20260815010000_worker_signup_requests.sql`

The request table stores name, phone, optional email, free-form preferred regions, free-form preferred job categories, optional payment preferences, referral information, and a note. The existing `inquiries` table remains unchanged because its current RLS policy is admin-only.

## Next Implementation Step

After a real Supabase project is available:

1. Add local `.env.local` values.
2. Apply the migration to Supabase.
3. Generate database TypeScript types.
4. Implement worker signup and login.
5. Implement worker profile and referral storage.

## Security Notes

- Only public publishable keys should use the `NEXT_PUBLIC_` prefix.
- Do not commit service role keys.
- Do not collect bank account information in Phase 1.
- Do not implement automatic referral payout.
- Do not expose worker phone numbers outside the approved operational flow.
