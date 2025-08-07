# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# MERN Forum Web Application

## Project Overview

This is a **Forum Web Application** built using the MERN stack (MongoDB, Express.js, React.js, Node.js).  
It allows users to post messages, comment, vote, and share posts, supporting user authentication and membership features.

---

## Live Demo

## Live Site URL : https://react-mern-discussion-platform.web.app

## Live server URL: https://react-mern-discussion-platform-serv.vercel.app

## 1.Admin Email: admin@gmail.com
## 1.Admin Password: Admin@1234



---

## Key Features

- User Authentication (Email/Password + Google Social Login)
- Role-based access: Normal User and Admin
- Create, Read, Update, Delete (CRUD) Posts with tags
- Search posts by tags (server-side search)
- Pagination with 5 posts per page on homepage
- Sorting posts by popularity (upvotes minus downvotes)
- Comments on posts with report and feedback functionality
- Post sharing using `react-share` package
- Membership system with Gold and Bronze badges
- Image upload support for posts (using imgbb API)
- Fully responsive design (mobile, tablet, desktop)
- Dark/Light theme toggle _(if implemented)_
- Admin dashboard to manage users, reports, announcements
- Secured Firebase and MongoDB credentials using environment variables
- Data fetching optimized with TanStack Query

---

## Technologies Used

- Frontend:

  - React.js
  - React Router
  - React Hook Form
  - React Select
  - React Share
  - Tailwind CSS + DaisyUI
  - TanStack Query (React Query)
  - SweetAlert2
  - React Animation on Scroll

- Backend:
  - Node.js
  - Express.js
  - MongoDB (Atlas)
  - JWT Authentication
  - Firebase Authentication (Google Login)
- Deployment:
  - Firebase (frontend)
  - Vercel (backend) _(or any cloud service)_

---

## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-ChakmaShantunu.git
   git clone https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-ChakmaShantunu.git

## Next Steps

- Install backend and frontend dependencies
- Configure environment variables
- Run backend and frontend servers
- Visit http://localhost:3000 to see the app in action
