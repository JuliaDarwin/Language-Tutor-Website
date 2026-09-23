Language Tutoring Web App (Next.js)

A modern, full-stack language tutoring and booking platform built with Next.js 16. This application provides a comprehensive suite of features for scheduling lessons, processing payments, real-time messaging, and managing user profiles.


Tech Stack

Framework: Next.js 16 (App Router)
Language: TypeScript
Styling: Tailwind CSS v4, Framer Motion (animations), Next Themes (dark mode)
Database: PostgreSQL
ORM: Prisma (using @prisma/adapter-pg for performance)
Deployment: Vercel (recommended)


Core Integrations & Services

Authentication: Clerk (@clerk/nextjs) for secure and scalable user authentication and identity management.
Payments: Stripe (@stripe/stripe-js, stripe) for processing lesson payments securely.
Scheduling & Booking: Cal.com (@calcom/embed-react) natively embedded for seamless lesson scheduling.
Real-time Messaging: Pusher (pusher, pusher-js) to handle live chat and direct messaging between students and tutors.
Transactional Emails: Resend for fast and reliable email notifications.


Project Structure (Key Routes)

Built utilizing Next.js App Router paradigm, modularizing features into dedicated directories under src/app/:

/admin: Administration dashboard for overall platform management.
/dashboard: Primary user dashboard after successful authentication.
/booking: Embedded Cal.com booking flow.
/lessons: Managing and tracking scheduled/past lessons.
/messages: Real-time chat interface powered by Pusher.
/payment: Stripe integration for checkout flows.
/user-profile: Clerk-integrated user settings.


Database Schema

The PostgreSQL database (managed by Prisma) relies on two primary models connected to the Clerk userId:
Lesson: Tracks scheduled classes, including the userId (student), lesson date, Cal.com booking uid, and historical status (isPast).
Message: Stores real-time chat history between the platform/tutor and the student, logging the userId, senderId, userName, and text content.


Getting Started

Prerequisites
Ensure you have Node.js and npm (or pnpm/yarn) installed. You will need API keys for Clerk, Stripe, Cal.com, Pusher, Resend, and a PostgreSQL connection string.

Local Development
Clone and Install dependencies

bash
npm install
Set up environment variables Create a .env and .env.local file with your respective API keys.

Database Setup Push the Prisma schema to your PostgreSQL database and generate the client:

bash
npx prisma generate
npx prisma db push
Run the development server

bash
npm run dev
Open http://localhost:3000 to view the application.
