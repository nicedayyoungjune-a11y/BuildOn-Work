# Domain Setup

## Production Domain

The final production domains are:

- Primary: `https://www.workerin.co.kr`
- Secondary: `https://workerin.co.kr`

## Current Status

The final domain spelling has been corrected and confirmed by the project owner.

Confirmed domains:

- Primary: `https://www.workerin.co.kr`
- Secondary: `https://workerin.co.kr`

Current verification notes:

- `workerin.co.kr` currently resolves to a Vercel IP address.
- `www.workerin.co.kr` currently resolves through a Vercel DNS CNAME.
- The latest Vercel production deployment includes `www.workerin.co.kr` and `workerin.co.kr` as aliases.
- HTTPS requests to both custom domains did not connect successfully from the local verification environment yet.

## Vercel Project

- Project name: `buildon-work`
- Project ID: `prj_bYKCy8Knu6TOGVPJ6ZjIZTe8nt1l`
- Team ID: `team_bDQu7zLq026PkOWJxVW6jGfP`
- Current production URL: `https://buildon-work.vercel.app`

## Required Vercel Dashboard Steps

In Vercel:

1. Open the `buildon-work` project.
2. Go to `Settings` > `Domains`.
3. Add `www.workerin.co.kr`.
4. Add `workerin.co.kr`.
5. Choose the preferred primary domain.

Recommended primary domain:

- `www.workerin.co.kr`

Recommended redirect:

- `workerin.co.kr` redirects to `www.workerin.co.kr`

## Required DNS Records

At the domain registrar or DNS provider, configure:

| Host | Type | Value |
| --- | --- | --- |
| `@` | `A` | `76.76.21.21` |
| `www` | `CNAME` | `cname.vercel-dns-0.com` |

Vercel may show a project-specific recommendation after the domain is added. If Vercel shows a different required value, follow the Vercel dashboard recommendation.

Current observed DNS values:

| Host | Type | Observed value |
| --- | --- | --- |
| `@` | `A` | `216.150.1.1` |
| `www` | `CNAME` | `da46417babab4bc3.vercel-dns-016.com` |

Because Vercel can provide project-specific DNS values, keep the current DNS values if Vercel marks them as valid in the dashboard.

## Verification Checklist

After DNS is configured:

- [x] `workerin.co.kr` resolves to Vercel.
- [x] `www.workerin.co.kr` resolves to Vercel.
- [x] Vercel production deployment includes both custom domain aliases.
- [ ] SSL certificate is issued.
- [ ] `https://www.workerin.co.kr` loads the production site.
- [ ] `https://workerin.co.kr` redirects to `https://www.workerin.co.kr`.

## Notes

- DNS propagation can take minutes to several hours.
- Do not change Supabase or authentication settings until the domain is verified.
- After the domain is live, update future auth redirect URLs and production environment settings to use `https://www.workerin.co.kr`.
