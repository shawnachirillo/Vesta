# Vesta starter

A Next.js starter for your household dashboard.

## Run it

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`

## What to edit first

### 1. Homepage data
Edit:
- `lib/data.ts`

This file controls:
- weather/date/status
- events
- tasks
- routines
- library shortcuts
- starter notes
- quick links for YouTube and Music

### 2. Homepage layout
Edit:
- `app/page.tsx`

This is the main Vesta dashboard.

### 3. Quick Launch buttons
Edit:
- `components/QuickLaunch.tsx`

Put your real YouTube playlist links and your real music links here.

### 4. Routines page
Edit:
- `app/routines/page.tsx`
- `lib/data.ts`

Add person-specific routines and media suggestions here.

## Google Calendar later
When you're ready to replace fake events with real events:
- create a Google Cloud project
- enable Google Calendar API
- add credentials
- create a fetch layer or route handler
- replace the `todayEvents` array with live data

## Auto-open on OptiPlex login later
Once the app is running:
- host it locally or on Vercel
- set the browser to open your Vesta URL on login
- optionally set fullscreen/kiosk mode
