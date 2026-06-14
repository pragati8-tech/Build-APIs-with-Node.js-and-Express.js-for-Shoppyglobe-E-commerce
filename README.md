ShoppyGlobe Backend API

A REST API backend for ShoppyGlobe E-commerce application built with Node.js, Express, and MongoDB.


Tech Stack

Node.js - Runtime environment
Express.js - Web framework
MongoDB - Database
Mongoose - MongoDB ODM
JWT - Authentication
Bcryptjs - Password encryption


Project Structure

shoppyglobe-backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Register and Login logic
│   ├── cartController.js     # Cart CRUD logic
│   └── productController.js  # Product CRUD logic
├── middleware/
│   ├── auth.js               # JWT protect middleware
│   ├── errorHandler.js       # Global error handler
│   └── validate.js           # Input validation middleware
├── models/
│   ├── Cart.js               # Cart schema
│   ├── Product.js            # Product schema
│   └── User.js               # User schema
├── routes/
│   ├── authRoutes.js         # /register and /login routes
│   ├── cartRoutes.js         # /cart routes
│   └── productRoutes.js      # /products routes
├── .env                      # Environment variables (not pushed to GitHub)
├── .gitignore                # node_modules and .env ignored
├── package.json
└── server.js                 # Entry point


Getting Started

1. Clone the repository

bashgit clone https://github.com/pragati8-tech/Build-APIs-with-Node.js-and-Express.js-for-Shoppyglobe-E-commerce
cd shoppyglobe-backend

2. Install dependencies

bash npm install

3. Run the server

npm run dev

# Production
npm start

Server will start on http://localhost:5000

Cart routes are protected with JWT authentication.

Author

Pragati Agrawal

GitHub: https://github.com/pragati8-tech/Build-APIs-with-Node.js-and-Express.js-for-Shoppyglobe-E-commerce