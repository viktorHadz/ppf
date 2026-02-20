# PPF (carPPF)

Production marketing website for an automotive paint protection and detailing studio (IDO Elite Protection). The project focuses on performance, SEO, and reliability while keeping the infrastructure simple and inexpensive to run.

The site is statically generated and served via Cloudflare Pages, with a single backend endpoint used only for handling customer enquiries.

---

## Overview

This repository contains a full marketing website including:

- Service pages (PPF, tinting, detailing, insurance)
- Portfolio with individual project pages
- Contact form with server‑side email delivery
- Legal pages (privacy, cookies, terms)
- Structured SEO metadata and sitemap

The goal of the architecture is simple:

> behave like a dynamic website for the user, but deploy and run like a static one.

The site renders ahead‑of‑time for search engines and performance, while still supporting a working contact form and analytics.

---

## Architecture

**Frontend:** Static generated SPA (Vue 3 + ViteSSG)

**Backend:** Cloudflare Pages Functions (`/api/contact`)

**Hosting:** Cloudflare Pages CDN

**Email delivery:** Resend API

In practice:

1. Pages are pre‑rendered at build time (SEO friendly)
2. Visitors interact with a client‑side Vue application
3. Contact form posts to `/api/contact`
4. Cloudflare function validates the data
5. Email is sent to the business and an auto‑reply is sent to the customer

No database, no traditional server, and no persistent backend state.

---

## Tech Stack

### Frontend

- Vue 3
- Vite
- ViteSSG (static site generation)
- Vue Router
- Tailwind CSS v4
- Unhead (`@unhead/vue`) for dynamic `<head>` management

### Backend

- Cloudflare Pages Functions (serverless)
- Resend Email API

### SEO & Build

- `vite-plugin-sitemap` (automatic sitemap generation)
- Route meta tags for per‑page SEO
- Structured metadata support

---

## Features

- Static generation for fast first load and SEO indexing
- Per‑route metadata (title, description)
- Portfolio navigation between projects
- Validated contact form
- Honeypot spam protection
- Business notification email
- Customer confirmation email (auto‑reply)
- Legal compliance pages (privacy, cookies, terms)

---

## Local Development

### Requirements

- Node.js `^20.19.0` or `>=22.12.0`

### Install

```
npm install
```

### Start development server

```
npm run dev
```

### Build static site

```
npm run build
```

### Preview production build

```
npm run preview
```

### Lint / Format

```
npm run lint
npm run format
```

---

## Environment Variables

The backend function requires the following environment variable in Cloudflare Pages:

```
RESEND_API_KEY
```

Without this key, the contact form will return a generic error response and no email will be sent.

---

## Contact API

**Endpoint:** `POST /api/contact`

Handled by Cloudflare Pages Function: `functions/api/contact.js`

### Responsibilities

- Validates user input (name, phone, email, service)
- Validates service‑specific fields
- Rejects spam via honeypot field
- Sends notification email to the business
- Sends confirmation email to the customer

The endpoint intentionally returns generic errors to avoid exposing infrastructure details.

---

## Deployment

The project is designed for Cloudflare Pages deployment.

The repository includes a deploy script:

```
npm run pipe
```

This performs:

1. Static build using ViteSSG
2. Deployment of the `dist` folder to Cloudflare Pages using Wrangler

---

## Routes

Main routes include:

- `/` Home
- `/ppf`
- `/tinting`
- `/detailing`
- `/insurance`
- `/portfolio`
- `/portfolio/:id`
- `/about`
- `/contact`
- `/terms`
- `/privacy`
- `/cookies`
- `*` Not Found

---

## Design Goals

- Extremely fast load time
- Search engine friendly
- Minimal backend complexity
- Cheap to host and maintain
- Production reliable (no database dependency)

This project demonstrates a practical real‑world use of a hybrid static + serverless architecture for small business websites.

---

## License

This repository is provided as a portfolio and reference implementation. Adaptation for commercial projects is allowed, but branding, media, and business content belong to the respective business owner.
