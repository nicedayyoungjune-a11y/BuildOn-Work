# Tasks

## Phase 1: Project Standards

- [x] Create `AGENTS.md`
- [x] Create `README.md`
- [x] Create `docs/SERVICE_PLAN.md`
- [x] Create `docs/PROJECT_RULES.md`
- [x] Create `docs/MVP_SCOPE.md`
- [x] Create `docs/DESIGN_RULES.md`
- [x] Create `docs/FOLDER_STRUCTURE.md`
- [x] Create `docs/CHECKLIST.md`
- [x] Create `docs/TASKS.md`
- [x] Create `docs/SCREEN_MAP.md`

## Phase 2: Project Setup

- [x] Initialize the actual web project when approved.
- [x] Add package configuration when approved.
- [x] Add lint, typecheck, and build scripts when approved.
- [x] Create the initial app folder structure when approved.

## Phase 3: Basic Types, Constants, And Mock Data

- [x] Add basic TypeScript types for MVP mock flow.
- [x] Add constants for roles, statuses, job categories, regions, and payment options.
- [x] Add minimal mock data for workers, companies, sites, jobs, applications, assignments, attendance, payment options, and inquiries.

## Phase 4: Landing Page Structure

- [x] Design and implement the basic landing page structure when approved.
- [x] Add landing page sections for hero, trust indicators, worker value, company value, usage flow, payment options, FAQ, and CTA.

## Phase 5: Landing Page First Review

- [x] Review landing page copy, section flow, mobile readability, and CTA hierarchy.
- [x] Refine landing page copy for workers, construction companies, and site managers.
- [x] Clarify that payment options mean selection and display, not payment or remittance automation.

## Phase 6: Landing Page Premium Blue Review

- [x] Refine landing page with a premium blue and deep navy visual direction.
- [x] Strengthen the hero, CTA, dashboard preview, card hierarchy, and mobile readability.
- [x] Keep payment option copy clear so it is not confused with remittance or payment automation.
- [x] Refine landing page wording with more natural construction job and site manager terminology.

## Phase 7: Worker Webapp Static Screens

- [x] Create worker job list, job detail, application history, and my page routes.
- [x] Add worker page shell, summary cards, job cards, job detail, application list, and profile card components.
- [x] Use existing mock data only, without authentication, DB, API, or real application actions.

## Phase 8: Worker Screen Review

- [x] Review worker job list, job detail, application history, and my page screens.
- [x] Refine worker screen wording with natural construction site terminology.
- [x] Improve job card information priority for daily wage, work date, region, job category, headcount, and payment option.
- [x] Improve mobile card spacing, status badge clarity, and primary action readability.
- [x] Keep the work limited to static screens without new features, new data, integrations, or real actions.

## Phase 9: Company Webapp Static Screens

- [x] Create company dashboard, sites, jobs, applicants, and attendance routes.
- [x] Add company page shell, summary cards, site cards, job cards, applicant list, attendance list, and dashboard overview components.
- [x] Use existing mock data only, without authentication, DB, API, approval actions, attendance actions, or real save actions.
- [x] Keep company screens focused on today needed workers, sites, jobs, applicants, attendance status, and payment option guidance.

## Phase 10: Company Screen Review

- [x] Review company dashboard, sites, jobs, applicants, and attendance screens.
- [x] Refine company screen wording with natural site manager terminology.
- [x] Improve information priority for today needed workers, applicants, scheduled workers, attendance completed, and absent workers.
- [x] Improve company card spacing, status badge clarity, and mobile readability.
- [x] Keep the work limited to static screens without new files, new data, integrations, events, or real actions.

## Phase 11: Admin Webapp Static Screens

- [x] Create admin dashboard, workers, companies, sites, jobs, applications, and inquiries routes.
- [x] Add admin page shell, summary cards, dashboard overview, and list components for each admin area.
- [x] Use existing mock data only, without authentication, authorization, DB, API, edit, delete, approval, status change, or reply actions.
- [x] Keep admin screens focused on operational visibility for workers, companies, sites, jobs, applications, attendance, inquiries, and payment option status.

## Phase 12: Admin Screen Review

- [x] Review admin dashboard, workers, companies, sites, jobs, applications, and inquiries screens.
- [x] Refine admin screen wording for platform operators.
- [x] Improve information priority for workers, companies, sites, jobs, applications, attendance, inquiries, and items that need checking.
- [x] Improve status badge wording, no-content guidance, mobile card spacing, and overall readability.
- [x] Keep the work limited to static screens without new files, new data, integrations, events, or real actions.

## Phase 13: Screen Connection Review

- [x] Review landing, worker, company, and admin screen links.
- [x] Connect landing page links to worker jobs, company dashboard, and admin dashboard.
- [x] Add simple area menus for worker, company, and admin screens.
- [x] Add current-location emphasis to worker, company, and admin menus.
- [x] Keep the work limited to static links without authentication, events, state, integrations, or real actions.

## Phase 14: First QA And Pre-Deployment Review

- [x] Review all landing, worker, company, and admin routes before deployment.
- [x] Check landing links, area menus, static screen roles, and current-location emphasis.
- [x] Review visible wording for developer-style terms and real-action misunderstandings.
- [x] Run lint, typecheck, build, local route checks, and Git status review.
- [x] Keep the work limited to QA and minimal copy adjustments without new files, new data, integrations, events, or real actions.

## Phase 22: Final Service Flow QA And Demo Scenario

- [x] Review the full landing, worker, company, and admin demo flow.
- [x] Create `docs/DEMO_SCENARIO.md` for customer, partner, developer, and internal team demos.
- [x] Clarify that the current product is a screen-based MVP before real feature connections.
- [x] Record demo talking points, cautions, next development candidates, and a demo checklist.
- [x] Keep the work limited to documentation without screen code, new features, integrations, or real actions.

## Phase 23: Real Function Scope Definition

- [x] Review post-MVP development direction.
- [x] Create `docs/FUNCTION_SCOPE.md`.
- [x] Split the first real-function phase into Phase 1-A core data flow and Phase 1-B site operation flow.
- [x] Define 2nd phase, legal/compliance phase, long-term features, and explicit exclusions.
- [x] Define initial role boundaries, core status values, referral policy, notification policy, and privacy cautions.
- [x] Keep the work limited to documentation without DB, authentication, authorization, Supabase, integrations, or application code.

## Phase 24: Worker Signup/Login Pre-Implementation Flow Review

- [x] Review the current Supabase Auth, users, workers, and referrals relationship before implementation.
- [x] Create `docs/WORKER_AUTH_FLOW.md`.
- [x] Define the proposed worker signup and login routes.
- [x] Define signup input fields, referral storage policy, login flow, RLS/security criteria, admin referral review direction, and first implementation boundaries.
- [x] Keep the work limited to documentation without signup/login pages, Supabase Auth calls, DB insert code, API routes, middleware, mock data changes, or migrations.

## Phase 25: Worker Signup/Login UI First Pass

- [x] Create `/worker/signup` as a static worker signup UI preview.
- [x] Create `/worker/login` as a static worker login UI preview.
- [x] Add worker signup input groups for basic information, job preferences, and referral information.
- [x] Add worker login input fields and guidance that real login is not connected yet.
- [x] Add lightweight worker-screen links to the signup and login preview screens.
- [x] Keep real Auth connection, data storage, API routes, middleware, protected routes, mock data changes, and migrations for later phases.

## Later Phases

- [x] Create `docs/DATA_MODEL_PLAN.md` before DB or Supabase implementation.
- [x] Create `docs/AUTH_ROLE_PLAN.md` before authentication or authorization implementation.
- [x] Create `docs/IMPLEMENTATION_PHASES.md` before coding real-function phases.

## Phase 26: Supabase And DB/Auth Foundation

- [x] Add Supabase client dependencies.
- [x] Add `.env.example` for Supabase public environment variables.
- [x] Add client and server Supabase utility boundaries.
- [x] Add initial Phase 1 schema migration with core tables and status enums.
- [x] Add initial RLS enablement and worker/company/admin policy boundaries.
- [x] Add `docs/SUPABASE_SETUP.md`.
- [x] Review the worker signup Server Action design before connecting Supabase Auth.
- [x] Create `docs/WORKER_SIGNUP_ACTION_PLAN.md`.
- [ ] Link a real Supabase project when credentials are available.
- [ ] Apply migrations to the real Supabase project.
- [ ] Generate database TypeScript types from the real Supabase schema.
- [ ] Implement worker signup and login.

## Phase 27: Production Domain Setup

- [x] Confirm primary production domain: `https://www.workerin.co.kr`.
- [x] Confirm secondary production domain: `https://workerin.co.kr`.
- [x] Add `docs/DOMAIN_SETUP.md`.
- [x] Add `www.workerin.co.kr` to the Vercel project.
- [x] Add `workerin.co.kr` to the Vercel project.
- [ ] Configure DNS A record for apex domain to a HTTPS-ready Vercel endpoint.
- [ ] Configure DNS CNAME record for `www` to a HTTPS-ready Vercel endpoint.
- [ ] Verify Vercel domain status and SSL certificate in dashboard.
- [x] Confirm production site loads through the primary custom domain.
- [ ] Confirm secondary domain redirects to the primary custom domain.
