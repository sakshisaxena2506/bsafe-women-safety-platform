# bSafe - Women Safety Platform

bSafe is a production-style React frontend for a women safety and emergency assistance platform. It is built as a final-year project or startup prototype with a maintainable folder structure, reusable components, realistic dummy data, Context API state, React Router pages, Tailwind CSS styling, Lucide icons, and Supabase-ready service files.

## Tech Stack

- React + Vite
- JavaScript
- Tailwind CSS
- React Router DOM
- Lucide React icons
- Context API
- Supabase integration-ready structure

## Features

- Startup-style landing page with hero, features, CareOS concept, statistics, testimonials, workflow, FAQ, and footer
- Login, register, and forgot password screens with validation
- User dashboard with safety status, current location, quick actions, alerts, contacts, notifications, and incident statistics
- SOS module with large emergency button, confirmation modal, countdown timer, alert sent state, live location UI, incident details, and alert timeline
- Emergency contacts module with add, edit, delete, search, relationship labels, and realistic sample data
- Incident history with date, time, status, severity, location, description, and filters
- Safe zones page for hospitals, police stations, and safe shelters
- Notification system with unread/read sections and badge count
- Profile page with user avatar placeholder and editable profile form
- Settings page with dark mode, notification preferences, privacy settings, and language selection
- Volunteer dashboard with active alerts, assigned cases, nearby requests, response statistics, and completed cases
- Admin dashboard with KPI cards, chart placeholder, recent incidents, user management, volunteer management, and analytics section

## Project Structure

```txt
src/
  components/
    common/
    layout/
    dashboard/
    sos/
    contacts/
    admin/
    volunteer/
    notifications/
  pages/
  context/
  utils/
  services/
  data/
  assets/
  hooks/
  App.jsx
  main.jsx
```

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

The app will run at:

```txt
http://localhost:5173
```

## Build

```bash
npm run build
```

## Supabase Setup

Copy `.env.example` to `.env` and add your Supabase project values:

```txt
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

The app works with demo data when Supabase keys are not configured.

## Demo Login

```txt
Email: ananya.sharma@example.com
Password: secure123
```

## Important Files

- `src/App.jsx` - application routes
- `src/context/` - authentication, safety, notifications, and theme state
- `src/services/` - Supabase-ready service layer
- `src/data/` - realistic dummy data
- `src/components/common/` - reusable UI system
- `src/pages/` - all feature pages

## Submission Notes

This is a frontend prototype. Backend APIs, production authentication, real maps, SMS/call services, and direct emergency service integrations can be connected later through the service layer.
