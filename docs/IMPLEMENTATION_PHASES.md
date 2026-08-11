# Implementation Phases

## Purpose

This document turns the post-MVP direction into small development phases.

It is a planning document only. It does not approve implementation of DB, authentication, authorization, Supabase, notifications, payments, contracts, or new application code.

## Current State

BuildOn Work currently has a screen-based MVP:

- Landing page
- Worker screens
- Company screens
- Admin screens
- Mock data
- Static flows

The next development stage should convert this into a real working service gradually.

## Phase 23: Function Scope Definition

Status: complete when `docs/FUNCTION_SCOPE.md` is accepted.

Deliverables:

- Phase 1-A scope
- Phase 1-B scope
- Phase 2 candidates
- Long-term features
- Explicit exclusions
- Referral policy
- Notification policy
- Privacy cautions

No app code should be added in this phase.

## Phase 24: Data Model Planning

Status: complete when `docs/DATA_MODEL_PLAN.md` is accepted.

Deliverables:

- Candidate tables
- Key relationships
- Status fields
- Referral data model
- Notification data model
- Postponed tables
- DB implementation gate

No DB, Supabase, migrations, APIs, or data access code should be added in this phase.

## Phase 25: Auth And Role Planning

Status: complete when `docs/AUTH_ROLE_PLAN.md` is accepted.

Deliverables:

- Initial roles
- Excluded roles
- Route access plan
- Permission matrix
- Admin audit requirements
- Auth implementation gate

No auth provider, middleware, route guard, or authorization code should be added in this phase.

## Phase 26: Phase 1-A Technical Setup

Start only after explicit approval.

Expected work:

- Select DB and auth provider
- Configure environment strategy
- Add DB connection
- Add auth foundation
- Add migration or schema workflow
- Add development seed strategy if needed

Verification:

- lint
- typecheck
- build

## Phase 27: Worker Account And Profile

Start only after Phase 26 is stable.

Expected work:

- Worker signup
- Worker login
- Worker profile storage
- Preferred region storage
- Preferred job category storage
- Preferred payment option storage
- Referral name and phone storage

Verification:

- lint
- typecheck
- build
- signup and profile flow check

## Phase 28: Company, Site, And Job Records

Start only after worker account and profile flow are stable.

Expected work:

- Company account/profile
- Site registration
- Job post registration
- Job list connected to stored jobs
- Job detail connected to stored jobs
- Admin visibility for companies, sites, and jobs

Verification:

- lint
- typecheck
- build
- company site and job creation flow check

## Phase 29: Applications And Attendance Confirmation

Start only after real jobs can be registered and displayed.

Expected work:

- Worker application
- Worker application history
- Company applicant review
- Attendance confirmation
- Attendance cancellation
- No-show status
- Work completed status
- Admin application and attendance visibility

Verification:

- lint
- typecheck
- build
- worker application to company confirmation flow check

## Phase 30: Notification Structure

Start only after applications and attendance confirmation are stable.

Expected work:

- Notification table or record structure
- Attendance confirmation reminder target list
- Construction delay or change notice record
- New job notification candidate logic
- Notification consent policy connection

Excluded at first:

- SMS sending
- KakaoTalk sending
- Push notifications
- Automated delivery retries

Verification:

- lint
- typecheck
- build
- notification record creation and status review check

## Later Phases

Add only after separate approval:

- SMS or KakaoTalk integration
- Employment contract generation
- Safety education records and certificates
- Wage payment review
- Main contractor, subcontractor, and re-subcontractor hierarchy
- Enterprise process schedule-based workforce planning
- Payment, payout, remittance, settlement, or card integration

## Release Discipline

Each implementation phase should be:

- Small enough to review.
- Verified with lint, typecheck, and build.
- Shipped only after the main user flow is checked.
- Kept within the approved scope.
- Separated from unrelated refactors.

## Recommended Immediate Next Step

Review and approve these planning documents:

1. `docs/FUNCTION_SCOPE.md`
2. `docs/DATA_MODEL_PLAN.md`
3. `docs/AUTH_ROLE_PLAN.md`
4. `docs/IMPLEMENTATION_PHASES.md`

After approval, Phase 26 can begin with explicit permission to add DB/auth setup.
