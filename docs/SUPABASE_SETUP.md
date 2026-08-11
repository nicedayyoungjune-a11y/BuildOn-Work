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
NEXT_PUBLIC_SUPABASE_ANON_KEY=
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

## Next Implementation Step

After a real Supabase project is available:

1. Add local `.env.local` values.
2. Apply the migration to Supabase.
3. Generate database TypeScript types.
4. Implement worker signup and login.
5. Implement worker profile and referral storage.

## Security Notes

- Only public anon keys should use the `NEXT_PUBLIC_` prefix.
- Do not commit service role keys.
- Do not collect bank account information in Phase 1.
- Do not implement automatic referral payout.
- Do not expose worker phone numbers outside the approved operational flow.
