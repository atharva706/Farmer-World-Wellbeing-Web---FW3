# 🌾 FW3 — Farmer World Wellbeing Web

A full-stack digital platform built for rural farming communities in India, centered around the village of **Shendurjane**. FW3 digitizes key agricultural and administrative services — from soil testing appointments to emergency disaster alerts — bringing government resources closer to farmers.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Known Limitations](#known-limitations)

---

## Overview

FW3 is a village-level service portal that bridges the gap between farmers and government/administrative services. It provides a clean, mobile-friendly interface with dark/light theme support, allowing farmers and village representatives to access assistance, cast votes, book soil tests, trigger emergency alerts, and submit technical feedback — all from a single platform.

---

## Features

### 🧪 Soil Testing Appointments
Farmers can book on-field soil testing appointments by selecting from a list of officers. On submission, the assigned officer receives an automated email notification, and the farmer receives a confirmation email with appointment details.

### 🚨 Government Assistance & Emergency Protocol
Village representatives can trigger disaster alerts (Flood, Earthquake, Tsunami, Cyclone) with a severity level. The system simultaneously sends SMS and email notifications to all configured government recipients (Tehsildar, Police, State Government Disaster Cell).

### 📊 Farmer Assistance Dashboard
Browse active government schemes, file financial assistance claims, and track existing claim statuses through a tabbed dashboard interface.

### 🗳️ Market Committee Portal
View the elected village market committee members and participate in live committee elections. Farmers can view candidates and their platforms, cast a single vote, and see real-time vote percentage updates.

### 🤝 Deal Committee Portal
View the deal committee responsible for fair livestock trading oversight, including current election and nomination statuses.

### 💬 Tech Support & Feedback
A dedicated channel for the village tech adoption team to submit reports — bug reports, adoption feedback, content clarifications, and feature requests — which are forwarded via email to the FW3 Tech Lead.

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI framework |
| Vite | 6 | Build tool & dev server |
| Tailwind CSS | 4 | Utility-first styling |
| React Router DOM | 7 | Client-side routing |
| Axios | latest | HTTP client (configured; components use `fetch`) |
| Framer Motion | 12 | Animations |
| Heroicons | 2 | Icon components |
| React Icons | 5 | Additional icons |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | — | Runtime |
| Express | 4 | Web framework |
| Mongoose | 8 | MongoDB ODM |
| Nodemailer | 6 | Email notifications via Gmail SMTP |
| Twilio | 5 | SMS alerts |
| bcryptjs | — | Password hashing (prepared) |
| jsonwebtoken | — | JWT auth (prepared) |
| dotenv | — | Environment variable management |
| cors | — | Cross-origin resource sharing |

---

## Project Structure

```
Farmer Web/
├── Backend/
│   ├── .env                        # Environment variables
│   ├── server.js                   # Express entry point
│   ├── config/
│   │   └── nodemailer.js           # Gmail SMTP transporter
│   ├── controllers/
│   │   ├── committeeController.js  # getCommitteeData, castVote
│   │   └── serviceController.js   # bookAppointment, emergencyTrigger, submitTechFeedback
│   ├── middlewares/                # Auth middleware (prepared, not active)
│   ├── models/
│   │   ├── db.js                   # In-memory mock data store
│   │   └── User.js                 # Mongoose User schema (prepared)
│   ├── routes/
│   │   ├── committeeRoutes.js      # Committee API routes
│   │   └── serviceRoutes.js       # Service API routes
│   └── utils/
│       ├── email.js                # sendEmailAlert() helper
│       └── sms.js                  # sendRealSmsAlert() helper
│
└── Frontend/
    ├── .env                        # VITE_BACKEND_URI config
    ├── index.html
    └── src/
        ├── main.jsx                # React root
        ├── App.jsx                 # Route definitions
        ├── context/
        │   ├── AuthContext.jsx     # Auth state management
        │   └── ThemeContext.jsx    # Dark/light theme (persisted to localStorage)
        ├── Pages/
        │   ├── About.jsx
        │   ├── Contact.jsx
        │   ├── Layout.jsx
        │   ├── Header.jsx
        │   └── Footer.jsx
        └── Components/
            ├── Home.jsx                     # Landing page with service cards
            ├── Header.jsx                   # Service page header
            ├── SoilTesting.jsx              # Soil test booking form
            ├── GovAssistance.jsx            # Emergency trigger form
            ├── FarmerAssistanceDashboard.jsx
            ├── MarketCommitee.jsx           # Committee view + voting portal
            ├── DealCommitee.jsx             # Deal committee view
            ├── TechSupport.jsx              # Tech feedback form
            ├── Auth.jsx                     # Login/Signup (prepared, not routed)
            └── ProtectedRoute.jsx           # Auth guard (prepared, not active)
```

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm
- A Gmail account with an [App Password](https://support.google.com/accounts/answer/185833) enabled
- A [Twilio](https://www.twilio.com/) account for SMS (free trial works)

### 1. Clone the repository

```bash
git clone <repository-url>
cd "Farmer Web"
```

### 2. Set up the Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` directory (see [Environment Variables](#environment-variables)), then start the server:

```bash
npm start
# Server runs on http://localhost:3002
```

### 3. Set up the Frontend

```bash
cd Frontend
npm install
```

Create a `.env` file in the `Frontend/` directory (see [Environment Variables](#environment-variables)), then start the dev server:

```bash
npm run dev
# App runs on http://localhost:5173
```

### Available Frontend Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint checks |

---

## Environment Variables

### Backend (`Backend/.env`)

```env
# Gmail SMTP (use App Password, not your account password)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Twilio SMS
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx

# MongoDB Atlas
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/FarmerDB

# Server
PORT=3002
```

### Frontend (`Frontend/.env`)

```env
VITE_BACKEND_URI=http://localhost:3002/api
```

> ⚠️ Never commit `.env` files to version control. Both are included in `.gitignore`.

---

## API Reference

All routes are prefixed with `/api`. The server runs on `http://localhost:3002` by default.

### Committee

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/committee-data/:villageId` | Fetch committee data and candidate vote counts |
| `POST` | `/api/cast-vote` | Cast a vote for a candidate |

**Cast Vote — Request Body:**
```json
{
  "candidateId": "CAND_A",
  "farmerId": "FARM102"
}
```

### Services

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/book-appointment` | Book a soil testing appointment |
| `POST` | `/api/emergency-trigger` | Send emergency alerts to government officials |
| `POST` | `/api/submit-tech-feedback` | Submit a tech feedback report |

**Book Appointment — Request Body:**
```json
{
  "farmerName": "Ramesh Patil",
  "farmerPhone": "9876543210",
  "village": "Shendurjane",
  "landLocation": "Survey No. 14, North Field",
  "preferredDate": "2026-09-20",
  "email": "farmer@example.com",
  "officer": "Yogesh Kadam",
  "time": "10:00 AM"
}
```

**Emergency Trigger — Request Body:**
```json
{
  "village": "Shendurjane",
  "disasterType": "Flood",
  "severity": "High"
}
```

**Submit Tech Feedback — Request Body:**
```json
{
  "feedbackType": "Bug Report",
  "feedbackDetails": "The voting button doesn't work on older Android phones.",
  "villageTeamMember": "TECH_01",
  "villageName": "Shendurjane"
}
```

---

## Known Limitations

- **In-memory data only** — Vote counts, appointment logs, and feedback entries are stored in memory and reset on every server restart. MongoDB is configured but not yet connected.
- **Authentication is disconnected** — The `User` model, JWT auth, `Auth.jsx`, `ProtectedRoute.jsx`, and OTP verification components exist but are not wired into active routes. All pages are currently public.
- **Deal Committee uses mock data** — The `DealCommitee.jsx` component simulates an async API call but uses local mock data with no real backend endpoint.
- **Farmer Assistance Dashboard** — The "File New Claim" feature simulates a submission without a real backend endpoint.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

---

*FW3 — Empowering Farmers, Enriching Lives.*
