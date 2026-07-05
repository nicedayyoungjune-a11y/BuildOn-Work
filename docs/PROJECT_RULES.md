# Project Rules

## Scope Control

- Do not create features outside the MVP scope without explicit approval.
- Do not add AI, maps, real-time features, notifications, payment systems, chat, or complex payroll automation in the MVP.
- Do not add DB, authentication, authorization, or Supabase before the approved phase.
- Do not create native apps in the MVP phase.

## Development Rules

- Build features in small steps.
- Do not create large flows in a single change.
- Separate UI, business logic, data access, and constants.
- Keep TypeScript types clear once code development begins.
- Reduce duplicated code.
- Avoid unnecessary abstraction.
- Add libraries only when they solve a clear problem.
- Use mobile-first responsive design.

## Verification Rules

After project setup begins, every implementation step should pass:

- lint
- typecheck
- build

This current phase is document-only, so npm verification is not required yet.

## Naming Rules

- Prefer `payment-options` or `payment-preferences`.
- Avoid `payments` in the MVP because it can imply actual payment, remittance, or settlement execution.
