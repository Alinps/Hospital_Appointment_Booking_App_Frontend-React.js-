# Hospital Appointment Booking App (Frontend)

A simple and professional React frontend for a hospital appointment booking system.

This app allows patients to register, log in, browse doctors, book appointments, reschedule/cancel bookings, and manage their profile.

## Features

- User signup and login
- Token-based authentication with persistent session (Redux + localStorage)
- Doctor listing with department filter, debounced search, and pagination
- Doctor appointment booking with available time slots
- Appointment management (view upcoming/past, reschedule, and cancel)
- Patient profile view and update (including avatar upload)
- Change password
- Backend wake-up/health check screen on app start

## Tech Stack

- React 19
- React Router DOM 7
- Redux Toolkit + React Redux
- Axios
- Bootstrap 5
- Create React App

## Project Structure

- `src/components/` - UI screens and reusable components
- `src/components/auth/` - auth guards (`checkAuth`, `checkGuest`)
- `src/services/api.js` - Axios instance and auth header interceptor
- `src/store/` - Redux store and auth slice
- `src/router.js` - App routes
- `src/static/css/` - Component-specific styles

## Prerequisites

- Node.js (v18 or newer recommended)
- npm
- Running backend API

## Environment Variables

Create a `.env` file in the project root:

```env
REACT_APP_API_URL=http://127.0.0.1:8000
```

Use your backend base URL (without trailing slash if possible).

## Installation and Run

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm start
```

3. Open in browser:

`http://localhost:3000`

## Available Scripts

- `npm start` - Run app in development mode
- `npm test` - Run test runner
- `npm run build` - Build production bundle
- `npm run eject` - Eject CRA config (irreversible)

## Main Routes

- `/` - Server wake-up page
- `/landing` - Landing page
- `/login` - Login
- `/signup` - Registration
- `/doctorlistingpage` - Doctor listing (protected)
- `/doctorbooking/:id` - Book appointment (protected)
- `/myappointments` - View/manage appointments (protected)
- `/profile` - Profile page (protected)
- `/changepassword` - Change password (protected)

## Backend Endpoints Used

The frontend currently calls these APIs:

- `GET health_check/`
- `POST /signup`
- `POST /login/`
- `POST /logout/`
- `GET /doctorlist/`
- `GET /doctordetail/:id`
- `GET /doctor/:id/slots/?date=YYYY-MM-DD`
- `POST /appointmentbooking/`
- `GET /myappointments/`
- `DELETE /cancelappointment/:id/`
- `PUT /appointments/:id/reschedule/`
- `GET /profile/`
- `PUT /profile/`
- `POST /changepassword/`

## Authentication Notes

- Login response should provide `user.token`
- Token is sent automatically as `Authorization: Token <token>`
- User state is persisted in `localStorage` under key `user`

## Build for Production

```bash
npm run build
```

Production files will be generated in the `build/` folder.

## License

This project is for learning and development purposes.
