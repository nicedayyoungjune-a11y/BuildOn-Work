# Auth And Role Plan

## Purpose

This document defines the first authentication and role direction for BuildOn Work.

This is a planning document only. It does not approve or implement authentication, authorization, Supabase, middleware, route guards, or login UI changes.

## Initial Roles

Keep roles simple in the first real-function phase.

### worker

Can use worker-facing job and application flows.

Expected access:

- Own profile
- Job list
- Job detail
- Own applications
- Own confirmed attendance status

### company

Represents a construction company or site manager in Phase 1.

Expected access:

- Own company profile
- Own sites
- Own job posts
- Applicants for own job posts
- Attendance records for own sites and jobs

### admin

Represents BuildOn Work operators.

Expected access:

- Worker list
- Company list
- Site list
- Job list
- Application list
- Attendance list
- Referral review list
- Inquiry list
- Basic operational dashboards

## Roles Not Included In Phase 1

Do not add these roles yet:

- main_contractor
- subcontractor
- re_subcontractor
- payroll_manager
- safety_manager
- external_partner

These roles can be reconsidered after the basic worker-company-admin flow is stable.

## Authentication Direction

The exact provider must be approved before implementation.

Possible future direction:

- Phone-based login for workers
- Email or phone-based login for company users
- Admin login with stricter access control

Phase 1 should avoid complicated login choices. Workers and site managers need a simple path.

## Authorization Principles

- A worker can only edit their own worker profile.
- A worker can only view their own applications and attendance records.
- A company user can only manage their own company, sites, jobs, applicants, and attendance records.
- An admin can review platform-wide operational data.
- Admin actions that affect status should be auditable.
- Referral review changes should be admin-only.

## Route Access Plan

### Public

- Landing page
- Public job preview, if approved
- Signup
- Login

### Worker

- Worker job list
- Worker job detail
- Worker application flow
- Worker application history
- Worker my page

### Company

- Company dashboard
- Company site management
- Company job management
- Company applicant review
- Company attendance management

### Admin

- Admin dashboard
- Worker management
- Company management
- Site management
- Job management
- Application management
- Attendance management
- Referral management
- Inquiry management

## Permission Matrix

| Area | worker | company | admin |
| --- | --- | --- | --- |
| Own worker profile | read/write | no | read |
| Own applications | read/write limited | no | read |
| Job list | read | read | read |
| Own company profile | no | read/write | read |
| Own sites | no | read/write | read |
| Own jobs | no | read/write | read |
| Applicants to own jobs | no | read/write status | read |
| Attendance for own jobs | read own only | read/write status | read |
| Referral review status | no | no | read/write |
| Inquiry management | no | limited own inquiry | read/write |

## Admin Audit Requirements

The following admin actions should eventually be auditable:

- Referral review status change
- Worker status change
- Company status change
- Job status change
- Application status change
- Attendance status change
- Inquiry status change

Audit fields can include:

- action_type
- target_table
- target_id
- previous_value
- next_value
- actor_user_id
- created_at

Audit logging can be implemented after the first DB model is approved.

## Privacy And Consent Requirements

Before real launch, auth and role design must connect to:

- Terms agreement
- Privacy collection and use agreement
- Third-party information provision agreement
- Notification consent
- Referral information use notice

Do not expose worker phone numbers to company users beyond what is necessary for the approved operational flow.

## Implementation Gate

Before implementing authentication or authorization, confirm:

- Authentication provider
- Login methods
- Signup fields by role
- Password or OTP policy
- Admin creation policy
- Session duration
- Route guard rules
- Data access rules
- Privacy consent copy
