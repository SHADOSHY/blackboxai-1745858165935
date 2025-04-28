# SwapSkill - Student Skills Exchange Platform

## Overview
SwapSkill is a platform where students trade skills instead of paying money. Users can create profiles, offer skills, search for skills, and request skill trades. The platform uses React with TailwindCSS for the frontend and Firebase for backend services including Authentication and Realtime Database.

## Features
- User registration and login with Firebase Authentication
- User profiles with skill offers and ratings
- Skill offer creation and management
- Skill search with filters
- Skill trade request system

## Tech Stack
- Frontend: React, TailwindCSS, Font Awesome, Google Fonts
- Backend: Firebase Authentication, Firebase Realtime Database

## Project Structure
- `src/`
  - `components/` - React components (Auth, Profile, SkillOffer, Search, TradeRequest)
  - `firebase/` - Firebase config and utils
  - `App.js` - Main app component with routing
  - `index.js` - React entry point
- `public/` - Static assets

## Setup and Run
1. Clone the repository
2. Run `npm install` to install dependencies
3. Configure Firebase project and update `src/firebase/firebaseConfig.js`
4. Run `npm start` to start the development server

## Firebase Setup
- Create a Firebase project
- Enable Authentication (Email/Password)
- Create a Realtime Database
- Update Firebase config in the project

## Notes
- This is a minimal viable product focusing on core features
- Further enhancements can include chat, notifications, and advanced rating system
