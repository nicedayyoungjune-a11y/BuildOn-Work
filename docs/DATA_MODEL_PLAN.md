# Data Model Plan

## Purpose

This document proposes the future data model for BuildOn Work.

This is a planning document only. It does not approve or implement DB, Supabase, API routes, authentication, authorization, or data access code.

## Design Principles

- Start with the smallest model that supports Phase 1-A and Phase 1-B.
- Keep company and site structures simple at first.
- Do not model main contractor, subcontractor, and re-subcontractor hierarchy in the first data model.
- Store referral information as operational review data, not payout automation data.
- Use payment option and payment preference naming. Do not model real payments, remittance, or settlement execution in Phase 1.
- Keep status fields explicit so admin screens can review operational state.

## Phase 1-A Tables

### users

Stores common account identity.

Candidate fields:

- id
- role: worker, company, admin
- name
- phone
- email
- created_at
- updated_at
- last_login_at
- status: active, inactive, suspended

Notes:

- Authentication provider details should be finalized in `docs/AUTH_ROLE_PLAN.md`.
- Do not store raw passwords in application tables.

### workers

Stores worker profile data.

Candidate fields:

- id
- user_id
- preferred_regions
- preferred_job_categories
- preferred_payment_options
- experience_summary
- profile_status
- created_at
- updated_at

Notes:

- Keep worker onboarding short.
- Sensitive or legally important fields should be added only when required.

### companies

Stores construction company or site manager organization data.

Candidate fields:

- id
- owner_user_id
- company_name
- contact_name
- contact_phone
- region
- business_status
- created_at
- updated_at

Notes:

- A company may later need multiple staff users, but Phase 1 can begin with a simple owner relationship.

### sites

Stores construction site records.

Candidate fields:

- id
- company_id
- site_name
- address
- region
- required_job_categories
- site_status: planned, active, paused, completed
- created_at
- updated_at

Notes:

- Keep site registration simple.
- Do not model full contractor hierarchy in Phase 1.

### jobs

Stores job posts for a site.

Candidate fields:

- id
- site_id
- company_id
- title
- work_date
- start_time
- end_time
- job_category
- required_headcount
- daily_wage
- payment_option
- preparation_notes
- site_notes
- status: draft, open, closed, cancelled
- created_at
- updated_at

Notes:

- `payment_option` means displayed condition or preference, not payment execution.

### referrals

Stores referral relationship review records.

Candidate fields:

- id
- worker_id
- referral_name
- referral_phone
- review_status: pending_review, referral_confirmed, payout_candidate, payout_excluded, payout_completed
- admin_note
- reviewed_by_user_id
- reviewed_at
- created_at
- updated_at

Notes:

- This table should not trigger automatic payout.
- Referral phone is personal information and needs clear purpose notice.

## Phase 1-B Tables

### applications

Stores worker applications to job posts.

Candidate fields:

- id
- job_id
- worker_id
- status: applied, under_review, attendance_confirmed, cancelled, no_show, completed
- applied_at
- reviewed_by_user_id
- reviewed_at
- admin_note
- created_at
- updated_at

Notes:

- Prevent duplicate active applications for the same worker and job.

### attendance

Stores attendance state after application confirmation.

Candidate fields:

- id
- application_id
- job_id
- worker_id
- site_id
- status: scheduled, confirmed, cancelled, no_show, completed
- confirmed_by_user_id
- confirmed_at
- completed_at
- absence_reason
- created_at
- updated_at

Notes:

- Attendance is one of the most important operational records.
- Do not add wage payment execution to this table.

### inquiries

Stores consultation or support inquiries.

Candidate fields:

- id
- name
- phone
- company_name
- inquiry_type
- message
- status: new, reviewing, resolved, closed
- assigned_admin_user_id
- created_at
- updated_at

## Phase 2 Tables

### notifications

Stores notification intent, delivery, and response state.

Candidate fields:

- id
- notification_type: attendance_check, schedule_change, new_job
- target_user_id
- related_site_id
- related_job_id
- related_application_id
- channel: internal, sms, kakao
- status: pending, ready_to_send, sent, failed, responded_yes, responded_no
- message
- sent_at
- responded_at
- failure_reason
- created_at
- updated_at

Notes:

- Create notification records before integrating SMS or KakaoTalk.
- External sending requires notification consent and delivery policy.

## Later Tables

The following should be postponed:

- contracts
- contract_deliveries
- consent_records
- safety_trainings
- safety_certificates
- wage_payment_reviews
- contractor_relationships
- enterprise_project_schedules

## Relationship Summary

- A user can have one worker profile.
- A user can own or manage one company in Phase 1.
- A company can have many sites.
- A site can have many jobs.
- A job can have many applications.
- A worker can have many applications.
- An application can produce one attendance record after confirmation.
- A worker can have one referral review record in Phase 1.
- Notifications can relate to jobs, sites, applications, or attendance records.

## Implementation Gate

Before implementing DB or Supabase, confirm:

- Exact Phase 1-A scope
- Exact Phase 1-B scope
- Final status values
- Required privacy notices
- Authentication provider
- Role and permission rules
- Migration strategy
- Seed or mock-data transition strategy
