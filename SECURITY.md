# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Do not open a public issue.** Instead, email **[security contact — update this]** with:

1. A description of the vulnerability
2. Steps to reproduce
3. Potential impact
4. Suggested fix (if any)

We will acknowledge receipt within 48 hours and aim to provide a fix or mitigation within 7 days for critical issues.

## Supported Versions

| Version | Supported |
|---------|-----------|
| latest  | Yes       |

## Security Practices

- Dependencies are audited regularly via `npm audit` or equivalent
- Secrets are never committed — see `.env.example` for required variables
- Authentication uses established providers (Clerk, Supabase Auth, or Auth0)
- All user input is validated and sanitized
