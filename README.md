# SPM Geosolutions - Next.js Frontend Application

[![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MUI](https://img.shields.io/badge/Material--UI-v5-007FFF?style=for-the-badge&logo=mui)](https://mui.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand-764ABC?style=for-the-badge)](https://github.com/pmndrs/zustand)

A modern, high-performance geodetic processing and GIS consultancy web application built for **SPM Geosolutions (U) Ltd**. This platform serves cadastral SLAAC workflows, spatial data streaming, client portal management, and administrative cluster telemetry.

---

## 🌟 Key Features

### 1. 🌐 Public Platform & Modular Auth System
- **Service Catalog**: Geomatics consultancy, drone aerial photogrammetry, bathymetry, and boundary adjudication.
- **SPM Academy**: Course masterclasses with Mobile Money enrollment integration.
- **Dedicated Modular Auth (`app/auth/`)**:
  - `/auth/login`: Secure email/password login with unverified email redirect.
  - `/auth/register`: User registration with auto-dispatched 6-digit OTP verification.
  - `/auth/verify-email`: 6-digit PIN input with resend countdown timer.
  - `/auth/forgot-password`: Email-based password reset link requester.
  - `/auth/reset-password`: Token-based new password setup with real-time strength evaluation.
- **Social Media Link Previews**: OpenGraph & Twitter metadata optimized for WhatsApp, Telegram, and social sharing.

### 2. 🧩 Client Workspace (`/client`)
- **GIS Studio & SLAAC Pipeline**: Interactive spatial data ingestion and boundary deed plan viewing.
- **Direct S3 Multipart Uploader**: Resumable chunked uploading for large point cloud LAS/LAZ datasets.
- **Billing & Invoices**: Real-time invoice tracking and Mobile Money / Bank payment processing.
- **Profile & Custom Branding**: Firm metadata, CAD title block customization, and surveyor registration info.

### 3. 🛡️ Admin Portal (`/admin`)
- **Cluster Telemetry**: Real-time system status and processing worker nodes.
- **RBAC User Management**: System user roles (Admin, Licensed Surveyor, Student).
- **Course & Product Store**: Academy course management and geomatics inventory.
- **SHA-256 Audit Trail**: Cryptographically logged file downloads and security tracking.

---

## 🏗️ Architecture & Folder Structure

```
frontend/
├── app/                      # Next.js App Router Pages
│   ├── auth/                 # Modular Auth routes (login, register, verify-email, forgot-password, reset-password)
│   ├── (main)/               # Public website routes (Home, Services, Academy, About, Contact)
│   ├── client/               # Client Workspace routes (Overview, GIS Studio, Billing, Profile, Uploader)
│   ├── admin/                # Admin Portal routes (Telemetry, Users, Courses, Invoices, Audit Trail)
│   ├── layout.tsx            # Root layout with OpenGraph & Social Preview tags
│   └── providers.tsx         # MUI Theme & Store Providers
├── src/
│   ├── components/           # Core UI Components
│   │   ├── MainNavbar.tsx    # Header navbar with Light-mode User Avatar Dropdown
│   │   ├── ClientNavbar.tsx  # Client dashboard navbar with Light-mode Dropdown
│   │   ├── AdminNavbar.tsx   # Admin top header bar with Dark-mode Dropdown
│   │   └── Footer.tsx        # Application footer
│   ├── views/
│   │   └── auth/             # Dedicated Auth View Components (LoginView, RegisterView, VerifyEmailView, etc.)
│   ├── store/
│   │   └── useAppStore.ts    # Zustand global state manager (Auth OTP, Jobs, Billing, S3 Uploader)
│   ├── services/
│   │   └── api.ts            # Axios HTTP client for Laravel REST API
│   └── types.ts              # TypeScript definitions & data contracts
├── .githooks/                # Git Hook scripts (pre-commit, pre-push, post-merge, post-checkout)
├── scripts/                  # Helper scripts (setup-hooks.sh)
├── public/                   # Static assets (logo.png, favicon.ico)
├── package.json
└── tsconfig.json
```

---

## 🪝 Automated Git Hooks Architecture

The frontend repository includes executable Git hooks in `.githooks/` to automate formatting checks, linting, type-checking, and environment file switching:

### 1. `pre-commit`
- Runs TypeScript type checking (`npx tsc --noEmit`).
- Runs Next.js ESLint (`npm run lint`).
- Runs Prettier formatting checks on modified files.
- Blocks commits if type or lint errors exist.

### 2. `pre-push`
- Detects target branch during push.
- If pushing to `prod`, automatically backs up `.env` to `.env.backup` and applies `.env.prod`.
- Automatically restores `.env.dev` / `.env.backup` upon push completion.

### 3. `post-merge`
- Detects target branch after merge.
- Applies `.env.prod` for `prod`, `.env.staging` for `staging`.
- Executes `npm install` automatically to sync node dependencies.

### 4. `post-checkout`
- Detects branch switches (`prod`, `staging`, `develop`).
- Applies corresponding `.env.prod`, `.env.staging`, or `.env.dev`.
- Displays confirmation message confirming active environment.

### 🛠️ Installing Git Hooks
To activate Git hooks after cloning or repository separation:

```bash
bash scripts/setup-hooks.sh
```
*(Or run `git config core.hooksPath .githooks`)*

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.x` or `v20.x`
- **Package Manager**: `npm`, `yarn`, `pnpm`, or `bun`

### 1. Environment Setup
Create environment files or let Git hooks switch them automatically:
- `.env.dev` (Local Development)
- `.env.staging` (Staging Environment)
- `.env.prod` (Production Environment)

Example `.env.dev`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Installation
```bash
npm install
bash scripts/setup-hooks.sh
```

### 3. Running Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build
```bash
npm run build
npm run start
```

---

## 📄 License & Ownership
Copyright © 2026 **SPM Geosolutions (U) Ltd**. All Rights Reserved.
