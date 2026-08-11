# Function Scope

## Purpose

This document defines the next development scope after the screen-based MVP.

BuildOn Work should move from static screens to a working service in small, reviewable steps. The next phase must not start with every feature at once. It should first prove that real worker, company, job, application, attendance, referral, and admin data can move through the service safely.

## Product Direction

BuildOn Work is not just a job board. The product should solve construction workforce operation problems:

- Site managers need a faster way to recruit workers than repeated phone calls.
- Workers need clear job conditions before applying.
- Site managers need to know who is likely to actually attend.
- Operators need visibility into worker, company, site, job, application, and attendance status.
- Referral information can help early worker acquisition, but referral payout should remain an operations process at first.

## Phase 1-A: Core Data Flow

Phase 1-A should create the minimum working data structure before building the full site operation loop.

### Included

- Worker signup and login
- Worker profile registration
- Worker preferred region, job category, and payment option storage
- Referral name and referral phone number input during worker signup or profile setup
- Admin referral relationship review
- Company signup and login
- Company basic profile registration
- Site registration
- Job post registration
- Admin visibility for workers, companies, sites, jobs, and referrals

### Goal

The goal of Phase 1-A is to make the platform capable of storing and reviewing real operational records.

This phase should answer:

- Can a worker join and save the minimum profile?
- Can a company or site manager register a site?
- Can a company or site manager register a job post?
- Can an admin verify registered workers, companies, sites, jobs, and referral information?

## Phase 1-B: Site Operation Flow

Phase 1-B should connect the core construction staffing workflow.

### Included

- Worker job list connected to real job data
- Worker job detail connected to real job data
- Worker job application
- Worker application history
- Company or site manager applicant review
- Attendance confirmation
- Attendance cancellation
- No-show status
- Work completed status
- Admin visibility for applications and attendance

### Goal

The goal of Phase 1-B is to prove the key service loop:

1. A company registers a site.
2. A company registers a job post.
3. A worker reviews the job.
4. A worker applies.
5. A site manager reviews the applicant.
6. A site manager confirms attendance.
7. Admin can review the operation status.

## Phase 2: Operational Efficiency

Phase 2 should improve field operation efficiency after the basic service loop works.

### Candidate Features

- Scheduled worker confirmation status
- Attendance reminder target list
- Construction delay or change notice structure
- Notification records
- New job notification structure
- More detailed attendance dashboard
- More detailed admin operation dashboard

### Notification Policy

Do not start Phase 2 by integrating SMS or KakaoTalk immediately.

Build the notification data and state structure first:

- Notification type
- Target user
- Related job or site
- Delivery status
- Response status
- Sent time
- Failure reason

External SMS or KakaoTalk integration should be added only after the notification policy and consent flow are confirmed.

## Phase 3: Legal, Labor, And Compliance Features

Phase 3 includes features that require legal, labor, privacy, and operating policy review.

### Candidate Features

- Employment contract data fields
- Employment contract document generation
- Contract email delivery record
- Terms agreement
- Privacy collection and use agreement
- Third-party information provision agreement
- Notification consent
- Safety education completion record
- Safety education certificate

### Policy

These features should not be treated as simple UI tasks. They require review before implementation because they affect legal evidence, personal information handling, and labor operations.

## Long-Term Features

These features are valuable, but they should stay outside the first real-function development phase.

- Main contractor, subcontractor, and re-subcontractor hierarchy
- Complex authorization by contractor hierarchy
- Wage payment confirmation workflow
- Actual remittance, payout, card payment, or settlement automation
- Large enterprise process schedule-based workforce planning
- Custom B2B workforce management solution
- Advanced reporting and prediction
- Native app
- Real-time chat
- Real-time location tracking

## Explicitly Excluded From Phase 1

The following must not be implemented in Phase 1 unless explicitly approved:

- Supabase implementation before DB design approval
- Authentication implementation before auth design approval
- Authorization implementation before role design approval
- SMS or KakaoTalk sending integration
- Automatic referral payout
- Actual payment, remittance, payout, or settlement handling
- Electronic employment contract generation
- Safety education content or certificate generation
- Main contractor, subcontractor, and re-subcontractor hierarchy
- AI automatic matching
- Map features
- Native app

## Initial Roles

Keep the first role model simple.

- `worker`: construction worker using job search and application flows
- `company`: construction company or site manager using site, job, applicant, and attendance flows
- `admin`: BuildOn Work operator reviewing platform status

Do not add main contractor, subcontractor, or re-subcontractor roles in the first implementation phase.

## Core Status Values

Status values should be defined before DB implementation so the service flow stays consistent.

### Job Status

- draft
- open
- closed
- cancelled

### Application Status

- applied
- under_review
- attendance_confirmed
- cancelled
- no_show
- completed

### Attendance Status

- scheduled
- confirmed
- cancelled
- no_show
- completed

### Referral Review Status

- pending_review
- referral_confirmed
- payout_candidate
- payout_excluded
- payout_completed

Referral payout status is for operator review only. It must not imply automatic payment.

### Notification Status

- pending
- ready_to_send
- sent
- failed
- responded_yes
- responded_no

## Referral Policy

Referral functionality should start as an operations support feature, not an automatic payout feature.

### Phase 1 Referral Scope

- Worker can enter referral name.
- Worker can enter referral phone number.
- Referral fields can be empty.
- Admin can review referral information by worker.
- Admin can review workers grouped by referral information.
- Admin can manually update referral review status.

### Referral Copy

Use this meaning in UI and policy documents:

> Referral information is used only to confirm signup source and review referral reward eligibility.

### Excluded Referral Scope

- Automatic referral payout
- Referral wallet
- Referral balance
- Referral settlement automation
- Bank account collection for referral payout
- Tax or withholding automation

## Payment Option Naming

Use `payment-options` or `payment-preferences` when referring to worker preferences or displayed conditions.

Avoid `payments` for Phase 1 features because it can imply actual payment, remittance, settlement, or payout execution.

## Privacy Considerations

The following data needs careful handling:

- Worker name
- Worker phone number
- Referral name
- Referral phone number
- Company contact name
- Company contact phone number
- Attendance history
- Application history
- Payment option preference
- Future wage payment status
- Future contract data
- Future safety education data

Before real launch, the service must prepare:

- Terms of service
- Privacy collection and use agreement
- Third-party information provision agreement
- Notification consent
- Referral information use notice
- Data retention policy

## Recommended Next Documents

After this scope is accepted, the next planning documents should be created in this order:

1. `docs/DATA_MODEL_PLAN.md`
2. `docs/AUTH_ROLE_PLAN.md`
3. `docs/IMPLEMENTATION_PHASES.md`

These documents should be completed before adding DB, authentication, authorization, or Supabase.
