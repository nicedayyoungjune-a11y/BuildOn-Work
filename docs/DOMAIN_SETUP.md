# Domain Setup

## Production Domain

The intended production domain is:

- `wokerin.co.kr`
- `www.wokerin.co.kr`

## Current Status

The domain has been prepared by the project owner.

As of this setup note, DNS records were not yet resolving locally:

- `wokerin.co.kr` A record was not found.
- `www.wokerin.co.kr` CNAME or A record was not found.

## Vercel Project

- Project name: `buildon-work`
- Project ID: `prj_bYKCy8Knu6TOGVPJ6ZjIZTe8nt1l`
- Team ID: `team_bDQu7zLq026PkOWJxVW6jGfP`
- Current production URL: `https://buildon-work.vercel.app`

## Required Vercel Dashboard Steps

In Vercel:

1. Open the `buildon-work` project.
2. Go to `Settings` > `Domains`.
3. Add `wokerin.co.kr`.
4. Add `www.wokerin.co.kr`.
5. Choose the preferred primary domain.

Recommended primary domain:

- `wokerin.co.kr`

Recommended redirect:

- `www.wokerin.co.kr` redirects to `wokerin.co.kr`

## Required DNS Records

At the domain registrar or DNS provider, configure:

| Host | Type | Value |
| --- | --- | --- |
| `@` | `A` | `76.76.21.21` |
| `www` | `CNAME` | `cname.vercel-dns-0.com` |

Vercel may show a project-specific recommendation after the domain is added. If Vercel shows a different required value, follow the Vercel dashboard recommendation.

## Verification Checklist

After DNS is configured:

- [ ] `wokerin.co.kr` resolves to Vercel.
- [ ] `www.wokerin.co.kr` resolves to Vercel.
- [ ] Vercel domain status is valid.
- [ ] SSL certificate is issued.
- [ ] `https://wokerin.co.kr` loads the production site.
- [ ] `https://www.wokerin.co.kr` redirects to the preferred primary domain.

## Notes

- DNS propagation can take minutes to several hours.
- Do not change Supabase or authentication settings until the domain is verified.
- After the domain is live, update future auth redirect URLs and production environment settings to use `https://wokerin.co.kr`.
