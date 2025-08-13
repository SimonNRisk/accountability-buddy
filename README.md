# Accountability Buddy ✅

My (Simon's) daily habit tracker built with **Next.js (App Router)** and **Firebase Firestore**.  
I can check off tasks throughout the day, and the list automatically resets to all `false` at **2 a.m. Eastern** via a secure API route triggered by an external cron. This way, friends and family can check out this website and ensure I'm staying productive 😎

---

## Features

- **Real-time habit tracking** using Firestore `onSnapshot`
- Add, toggle, and remove tasks instantly
- **Automatic daily reset** at 2 a.m. Eastern via a `/api/reset` endpoint protected by a shared secret
- Firebase Admin SDK on the server to securely update Firestore without client permissions
- Client SDK in the browser for real-time UI updates
- Deployed on **Vercel**, with reset job scheduled via [cron-job.org](https://cron-job.org) (free)

---

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- [Firebase](https://firebase.google.com/) — Firestore + Admin SDK
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) (optional if styling is included)
- [cron-job.org](https://cron-job.org) for free daily scheduling

---

## Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd accountability-buddy
npm install
```

### 2. Environment Variables
Create a .env.local file in the project root:

```bash
# Firebase Admin SDK (from service account JSON)
FIREBASE_PROJECT_ID=accountability-buddy-305c1
FIREBASE_CLIENT_EMAIL=<firebase-adminsdk-xxxx@accountability-buddy-305c1.iam.gserviceaccount.com>
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n<your-private-key>\n-----END PRIVATE KEY-----\n"

# Security + Firestore document ID
CRON_SECRET=<random-long-string>
USER_DOC_ID=<your-firestore-user-doc-id>
```

### 3. Development Server
```bash
npm run dev
```
Open http://localhost:3000 to view the app.

### 4. Daily Reset Job Setup
We use cron-job.org to call the /api/reset route every day at 2 a.m. Eastern.

Target URL:

```perl
https://<your-vercel-domain>/api/reset
```
Method: POST

Header:

```makefile
Authorization: Bearer <your CRON_SECRET>
```

Time Zone: America/Toronto
Schedule: Every day at 02:00

### How the Reset Works
/api/reset is a server-only route that:

Verifies the Authorization header matches CRON_SECRET

Uses Firebase Admin SDK to read your Firestore document

Sets all top-level boolean fields to false

This allows the client app to remain read/write only for the current user, while privileged updates (like resets) happen securely on the server.

