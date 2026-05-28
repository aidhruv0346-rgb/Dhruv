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

1. Push this project to GitHub.
2. Go to `https://vercel.com/new`.
3. Import the GitHub repository.
4. Use these settings:
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Install Command: `npm install`
   - Output Directory: leave empty
5. Add environment variables from `.env.example`.
6. Deploy.

## Environment Variables

Production features may require:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `FROM_EMAIL`
- `TO_EMAIL`
- `RECAPTCHA_SECRET_KEY`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_JWT_SECRET`

## Included Public Routes

- `/`
- `/services`
- `/portfolio`
- `/blog`
- `/blog/[slug]`
- `/contact`
- `/api/contact`
- `/api/newsletter`

## Admin Login

Secret admin URL: `/admin`

Current admin credentials:

- Username: `Dhruv.Pipaliya`
- Password: `Dheuv@0346`

## Deployment Checklist

- Run `npm run build`
- Confirm contact details are correct
- Replace placeholder CV if needed
- Confirm portfolio PDF opens
- Set environment variables on Vercel
- Submit generated sitemap to Google Search Console after launch
