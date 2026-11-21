# Learnify Frontend

Learnify is a course platform built with Next.js, React, TypeScript, and
Tailwind CSS. Students browse courses, enroll, watch lessons, and track their
progress. Instructors manage their courses and view enrollments. Administrators
review courses and manage users and sales.

## Local setup

Install Node.js 20.9 or later and npm. Start the Spring Boot API and PostgreSQL
using the [backend setup guide](../backend/README.md). Then run these commands
from the `frontend` directory.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use the course catalog at
`/courses` to verify that the frontend can reach the backend.

### Configuration

The frontend uses `http://localhost:8080` as the backend URL by default.
If your backend runs at a different address, create `frontend/.env.local`
and set `API_URL` to its base URL.

```dotenv
API_URL=http://localhost:8080
```

Browser requests to `/api/*` go through a Next.js rewrite. Server-rendered
pages call the backend directly and forward the authentication cookie for
signed-in users. Set `API_URL` before building so the rewrite points to the
correct backend, and use the same value when starting the production server.

## Main routes

| Route | Purpose |
| --- | --- |
| `/`, `/courses` | Browse published courses |
| `/signIn`, `/signUp` | Sign in or create a student account |
| `/courses/{id}`, `/courses/{id}/enrollment` | View course details and enroll |
| `/courses/{id}/lessons/{lessonId}` | Watch a lesson and mark it complete after enrolling |
| `/dashboard/overview` | Open the student workspace for learning progress, orders, and account settings |
| `/instructor/overview` | Open the instructor workspace for courses and student enrollments |
| `/admin/dashboard` | Open the admin workspace for course review, users, and sales |

## Lint and build

Run these commands from the `frontend` directory.

```bash
npm run lint
npm run build
npm run start
```

`npm run build` creates the production build. `npm run start` serves that
build on port 3000 by default.
