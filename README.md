# SCA Frontend - Spy Cats Management

A Next.js application for managing spy cats, built with React and TypeScript.

## Features

- View all spy cats in a table
- Add new spy cats with validation
- Edit cat salaries inline
- Delete spy cats
- Graceful error handling with user-friendly messages
- Modern, responsive UI with Tailwind CSS

## Prerequisites

- Node.js 18+ and npm/yarn
- Backend API running at `http://localhost:8000` (the frontend runs on port 3000, backend on 8000 - no conflict)

## Setup

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Configure Environment

Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Note**: The frontend runs on port **3000** and makes API calls to the backend on port **8000**. There is no port conflict.

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
```

The frontend will start on **http://localhost:3000** and will connect to the backend API at **http://localhost:8000**.

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
sca_front/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── CatList.tsx         # Cat list table component
│   ├── CatForm.tsx         # Add cat form
│   └── CatEditForm.tsx     # Edit salary form
├── lib/
│   └── api.ts              # API client functions
└── package.json
```

## API Integration

The app connects to the SCA Backend API. Make sure the backend is running and accessible at the configured URL.

## Error Handling

The application handles API errors gracefully:
- Shows user-friendly error messages
- Displays validation errors from the backend
- Provides retry options when requests fail
- Shows loading states during operations

