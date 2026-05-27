# Dhruv Pipaliya Portfolio

Personal digital marketing website for Dhruv Pipaliya, built with Next.js, TypeScript, Tailwind CSS, Framer Motion, Sanity-ready blog schemas, and contact/newsletter API routes.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Deploy To Vercel

Recommended free deployment:

1. Push this project to GitHub.
2. Go to `https://vercel.com/new`.
3. Import the GitHub repository.
4. Use these settings:
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Install Command: `npm install`
   - Output Directory: leave empty
5. Add environment variables from `.env.example` if email, reCAPTCHA, or Sanity are enabled.
6. Deploy.

Vercel will provide a free domain like:

```text
dhruv-pipaliya-portfolio.vercel.app
```

## Optional Custom Domain

In Vercel:

1. Open Project Settings.
2. Go to Domains.
3. Add your domain.
4. Configure DNS with your domain provider using Vercel's displayed records.

## Environment Variables

The site runs without secrets, but production email/CMS features need:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `FROM_EMAIL`
- `TO_EMAIL`
- `RECAPTCHA_SECRET_KEY`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

## Included Routes

- `/`
- `/services`
- `/portfolio`
- `/blog`
- `/blog/[slug]`
- `/contact`
- `/api/contact`
- `/api/newsletter`

## Secret Admin Panel

The secret admin login is available only by typing:

```text
/admin
```

Do not add this URL to any public navigation, footer, sitemap, or page content.

Local fallback credentials, only when environment variables are missing:

```text
ADMIN_EMAIL=ai.dhruv0346@gmail.com
ADMIN_PASSWORD=admin123
```

For production, set these in Vercel:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_JWT_SECRET`

The current admin CRUD storage uses local JSON files in `data/` as a simple fallback. For durable production editing on Vercel, connect Supabase or Vercel Postgres and move the CRUD layer from JSON files to the database, because serverless deployments do not persist filesystem writes reliably.

## Deployment Checklist

- Run `npm run build`
- Confirm contact details are correct
- Replace placeholder CV if needed
- Confirm portfolio PDF opens
- Set environment variables on Vercel
- Submit generated sitemap to Google Search Console after launch
