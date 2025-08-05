# Shopsphere – Ecommerce Platform

A modern web application for online shopping with admin dashboard, seamless user experience, and real-time order management.

[![Vercel](https://vercelbadge.vercel.app/api/Samyam03/ecommerce-website)](https://shopsphere-xi-three.vercel.app/)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 🚀 Live Demo

- **Frontend:** [shopsphere-xi-three.vercel.app](https://shopsphere-xi-three.vercel.app/)
- **Admin Dashboard:** [shopsphere-admin-rho.vercel.app](https://shopsphere-admin-rho.vercel.app/)

---

## ✨ Features

- Secure user authentication (sign up & sign in)
- Product browsing with search and filtering
- Shopping cart with real-time updates
- Secure checkout process
- Order tracking and history
- Admin dashboard for store management
- Product management (add, edit, delete)
- Order management with status updates
- Cloud image uploads and management
- Clean, responsive dashboard and workspace
- Fast, reliable cloud deployment

---

## 🛠️ Tech Stack

- **React** – UI components and state management
- **Vite** – Lightning-fast development and build tool
- **Node.js** – Server runtime
- **Express.js** – RESTful API framework
- **MongoDB** – NoSQL database
- **Mongoose** – Elegant MongoDB object modeling
- **JWT** – Secure authentication
- **Multer** – File upload handling
- **Cloudinary** – Image storage and CDN
- **Tailwind CSS** – Utility-first CSS styling
- **Vercel** – Cloud deployment and hosting

---

## 📁 Project Structure

- `frontend/` – Customer-facing web app (storefront, cart, checkout)
- `admin/` – Admin dashboard (product, order, user management)
- `backend/` – REST API server (controllers, models, routes)
- `components/` – Reusable UI components
- `pages/` – Page components
- `context/` – React context for state management
- `assets/` – Images and static files
- `public/` – Static assets

---

## 🧭 How It Works

1. Users sign up or sign in securely.
2. Dashboard provides access to products and shopping features.
3. Users can browse products, add to cart, and complete purchases.
4. Admins can manage products, orders, and users through the admin dashboard.
5. All data is managed securely using MongoDB and JWT authentication.

---

## 🖥️ Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm, yarn, pnpm, or bun
- MongoDB database (local or cloud)
- Cloudinary account for image storage

### Installation

Clone the repository:
```bash
git clone https://github.com/Samyam03/ecommerce-website.git
cd ecommerce-website
```

Install dependencies for each app:
```bash
# Frontend
cd frontend
npm install

# Admin
cd ../admin
npm install

# Backend
cd ../backend
npm install
```

Set up environment variables in backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

Start the development servers:
```bash
# Backend (Terminal 1)
cd backend
npm run dev

# Frontend (Terminal 2)
cd frontend
npm run dev

# Admin (Terminal 3)
cd admin
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) for frontend and [http://localhost:5174](http://localhost:5174) for admin in your browser.

---

## ☁️ Deployment

This project is already deployed and running on [Vercel](https://shopsphere-xi-three.vercel.app/). Vercel provides fast, reliable hosting and continuous deployment for the app.

To deploy your own version, push to your GitHub and connect the repo to Vercel.

---

## 📚 Learn More

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📎 Links

- **Frontend:** [shopsphere-xi-three.vercel.app](https://shopsphere-xi-three.vercel.app/)
- **Admin Dashboard:** [shopsphere-admin-rho.vercel.app](https://shopsphere-admin-rho.vercel.app/)
- **GitHub:** [github.com/Samyam03/ecommerce-website](https://github.com/Samyam03/ecommerce-website)

---

## 📝 License

This project is licensed under the MIT License. 