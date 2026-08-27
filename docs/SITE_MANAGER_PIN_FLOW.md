# Site Manager Link And PIN Flow

## Purpose

BuildOn Work MVP will let site managers manage their own site without formal Auth login. The operating model is a site-specific link plus PIN, issued by the Workerin operations team.

Formal company/site-manager Auth remains a later stabilization task. The MVP goal is to let a paying customer run real applicant review and attendance checks with a simpler access model.

## User Roles

### Worker

- Uses worker-facing flows without login in the MVP.
- Submits signup requests and job applications through simple intake flows.
- Does not access company-wide or site-manager screens.

### Site Manager

- Receives a site-specific link and PIN from the Workerin operations team.
- Opens `/site/[accessCode]`.
- Enters the PIN before seeing the site management screen.
- Manages only the assigned site.

### Workerin Operations Team

- Creates companies, sites, jobs, and access records.
- Issues the site link and PIN to the correct site manager.
- Monitors all operational data.
- Intervenes when a site manager cannot complete a task or reports a problem.

## Site Manager Access Flow

1. Workerin operations creates the company and site.
2. Workerin operations creates an access code and PIN for the site.
3. Only the PIN hash is stored in the database.
4. Workerin operations sends the site manager the link and PIN.
5. The site manager opens `/site/[accessCode]`.
6. The first screen asks for the PIN.
7. After PIN verification, the site manager can access the site management screen.
8. The site management screen shows only data for that site.

## Minimum Site Manager Features

- View site summary.
- View job list for the site.
- View applicants for site jobs.
- Mark applicants as accepted, on hold, or rejected.
- View scheduled workers.
- Mark attendance as checked in, no show, or completed.

## MVP Security Criteria

- Link plus PIN is temporary MVP authentication, not formal account security.
- PIN must never be stored as plain text.
- PIN must not be hardcoded in application code or mock data.
- Site manager access must never expose data from another site.
- Public table select/update/delete must not be opened for this flow.
- Full worker lists must not be exposed to site managers.
- Sensitive information must not be shown: bank accounts, settlement data, contracts, resident registration numbers, or unrelated personal data.
- The structure must allow later migration to formal Auth by keeping site access tied to `site_id`.

## Status Mapping

The existing `application_status` enum is not changed in this phase. MVP screens should map existing statuses to site-manager wording:

- `applied` -> 신청
- `under_review` -> 보류
- `attendance_confirmed` -> 수락 / 출근 예정
- `cancelled` -> 거절
- `no_show` -> 미출근
- `completed` -> 근무 완료

Attendance screens should use the existing `attendance_status` values:

- `scheduled` -> 출근 예정
- `confirmed` -> 출근 완료
- `no_show` -> 미출근
- `completed` -> 근무 완료

## Planned Data Model

Use a separate `public.site_access_tokens` table instead of adding access fields directly to `public.sites`.

Reasons:

- Access codes can be rotated without editing site identity data.
- A site can later have more than one access record if needed.
- Access records can be disabled or expired independently.
- Later formal Auth can keep using `site_id` as the permission boundary.

The first migration only creates the table and admin policy. PIN verification and site-scoped read/update behavior should be implemented later with security definer RPCs.

## PIN Verification RPC

The `public.verify_site_manager_pin` RPC verifies access code, active status, expiry, and PIN hash match inside the database. It returns only the matched site and company summary on success, uses one generic failure message, and updates `last_used_at` only after a successful PIN check.

## Repeated Error Rule

- The same implementation error should be fixed at most two times.
- If the same error appears a third time, stop patching and review the structure before continuing.
