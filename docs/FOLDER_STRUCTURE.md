# Folder Structure

This document records the recommended future folder structure only.

Do not create these folders until the actual project setup phase begins.

```txt
src/
  app/
    page.tsx
    worker/
    company/
    admin/

  components/
    landing/
    worker/
    company/
    admin/
    common/

  features/
    auth/
    jobs/
    applications/
    attendance/
    payment-options/

  data/
  types/
  constants/
  lib/
```

## Folder Intent

- `app/`: Route structure and page entry points.
- `components/`: UI components grouped by product area.
- `features/`: Business flow modules.
- `data/`: Initial mock data after the mock data phase begins.
- `types/`: Shared TypeScript types after the TypeScript phase begins.
- `constants/`: Shared labels, option lists, and fixed values.
- `lib/`: Shared utilities and integration helpers.

## Naming Note

Use `payment-options` or `payment-preferences` instead of `payments` during the MVP.
