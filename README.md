Secure Bookmark Manager

A production-ready full-stack Bookmark Manager built using modern web technologies with secure authentication and database-level access control.

This project demonstrates real-world full-stack development practices including OAuth authentication, Row-Level Security (RLS), and secure per-user data isolation.

Live Demo:

 https://bookmark-manager-six-beta.vercel.app

 GitHub Repository

 https://github.com/mehdialinaqvi110-cell/bookmark-manager

Project Objective:

The goal of this project was to build a secure web application where:

Users authenticate using Google OAuth

Each user manages personal bookmarks

Data is securely stored and isolated per user

Database-level security policies prevent unauthorized access

This project emphasizes security, architecture, and best practices rather than only UI functionality.

Tech Stack
Frontend:-

Next.js (App Router)

TypeScript

Tailwind CSS

Backend (BaaS):-

Supabase Authentication

Supabase PostgreSQL Database

Row-Level Security (RLS)

Deployment:-

Vercel (Production hosting)

GitHub (Version control)

Authentication

Authentication is implemented using Supabase Google OAuth.

Only Google login is enabled

No email/password authentication

Secure session management handled by Supabase

Each authenticated user is assigned a unique user_id

Security Implementation

Row-Level Security (RLS) is enabled on the database.

Policies ensure:

Users can SELECT only their own bookmarks

Users can INSERT bookmarks linked to their own user_id

Users can DELETE only their own bookmarks

Security is enforced at the database level, not just in frontend logic.

This prevents:

Cross-user data access

Unauthorized modification

Data leakage

Deployment

The application is deployed using Vercel.

Any push to the main branch automatically triggers a new production deployment.

Environment variables must also be configured inside the Vercel dashboard.

Challenges Faced
1️ OAuth Configuration:-

Setting up Google OAuth required:

Proper redirect URL configuration

Supabase provider setup

Debugging redirect mismatch errors

2️ Row-Level Security (RLS):-

Understanding and correctly implementing RLS policies was a critical challenge.

Issues encountered:

Insert operations failing due to policy mismatch

Incorrect user_id mapping

Testing multi-user isolation

3️ Environment Variable Issues:-

Misconfigured environment variables initially caused:

Supabase client initialization errors

Authentication failures

4️ State Management:-

Ensuring UI updated immediately after insert/delete required careful state handling and re-fetching logic.

 Key Learnings

Through this project, I strengthened my understanding of:

OAuth authentication flow

Secure backend-as-a-service architecture

Database-level access control

Full-stack integration

Production deployment workflow

Debugging authentication systems

 Final Outcome

This project demonstrates:

Secure authentication implementation

Proper database schema design

Production-level security practices

Clean UI structure

End-to-end full-stack deployment

 Author

Mehdi Ali Naqvi

GitHub: https://github.com/mehdialinaqvi110-cell



