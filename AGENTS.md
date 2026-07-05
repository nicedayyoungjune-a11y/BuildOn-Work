# BuildOn Work Agent Guidelines

## Project Identity

BuildOn Work is a web-based construction workforce platform that connects daily construction workers, skilled workers, teams, construction companies, and site managers.

The product aims to combine the construction job matching strength of GADA with the easy user experience of miso.kr.

Initial service areas are Gyeonggi-do and Chungcheong-do.

## Current Phase

This repository is currently in the project standards and planning phase.

Do not create application code, project scaffolding, database connections, authentication, authorization, UI components, mock data, or TypeScript type files until the relevant setup phase is explicitly requested.

## Development Principles

- Do not build features outside the MVP scope without explicit approval.
- Split features into small, reviewable units.
- Avoid building large flows in one step.
- Separate UI from business logic.
- Define TypeScript types clearly when code development begins.
- Reduce duplication, but avoid unnecessary abstraction.
- Add new libraries only when clearly needed.
- Build mobile-first responsive screens.
- After project setup, verify all work with lint, typecheck, and build.
- Validate screens and flows with mock data first.
- Do not add DB, authentication, authorization, or Supabase before the approved phase.

## Naming Note

For MVP documents and future code, prefer `payment-options` or `payment-preferences` over `payments` to avoid implying real payment or remittance functionality.
