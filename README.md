# 🏠 Housing Rental System

A full-stack web application designed to streamline property rentals, built using the **MERN stack** (MongoDB, Express.js, React, Node.js). This platform allows property owners to list rentals, while tenants can browse, inquire, and manage their housing needs—all in one place.

## 🚀 Features

- User authentication & role-based access (Tenant, Owner, Admin)
- Property listing & search with filters (location, price, type, etc.)
- Rental request & booking management
- Owner dashboard for managing listed properties
- Tenant dashboard for saved listings and active rentals
- Real-time updates using RESTful APIs
- Responsive, intuitive UI built with React

## 🛠️ Tech Stack

**Frontend:**  
- React  
- React Router  
- Axios  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB (Mongoose)  

**APIs & Tools:**  
- REST API for CRUD operations  
- JWT for authentication  
- Cloudinary (optional) for image uploads  
- MongoDB Atlas (for production DB)

## 📁 Project Structure
- FronEnd
- BackEnd


## 🔧 Getting Started

### Prerequisites
- Node.js and npm
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/ro7hith/housingrentalsystem-MERN_Stack.git
   cd housingrentalsystem-MERN_Stack

cd server && npm install
cd ../client && npm install

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
