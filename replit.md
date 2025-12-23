# Kantaland Web

## Overview
A React + TypeScript web application built with Vite, featuring a digital collection/portfolio interface. The project includes components for investor dashboards, admin logins, chat features, and various content sections.

## Project Structure
- `/components` - React components (Hero, Navbar, AdminLogin, InvestorDashboard, etc.)
- `/contexts` - React context providers (AdminContext)
- `/services` - Service modules (geminiService for AI integration)
- `/api` - API setup and sync scripts
- `/prisma` - Prisma database schema

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS (via CDN)
- **Database**: Prisma with PostgreSQL
- **AI**: Google Gemini API integration

## Development
- Run with: `npm run dev`
- Build with: `npm run build`
- Server runs on port 5000

## Environment Variables
- `GEMINI_API_KEY` - Google Gemini API key for AI features

## Recent Changes
- Configured for Replit environment (port 5000, allowed hosts)
