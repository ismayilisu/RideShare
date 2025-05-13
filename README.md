# RideShare
# 🚗 RideShare App (NITC Pooling Service)

A full-stack ride-sharing platform built for students of NIT Calicut. The app enables users to book rides, get pooled with others based on optimized routes, and chat directly with ride providers.

## 📦 Tech Stack

**Frontend**
- React.js
- Tailwind CSS (or your CSS framework)
- @react-google-maps/api for map features
- Socket.IO-client for real-time chat

**Backend**
- Node.js + Express
- MySQL for database
- Socket.IO for WebSocket communication
- Google Maps Directions API (for route similarity and pooling logic)

---

## ✨ Features

- 🗺️ **Interactive Google Maps** – Plot routes between source and destination
- 🔁 **Automatic Pooling** – Match passengers based on route similarity (Haversine, Fréchet Distance, etc.)
- 📅 **Booking System** – Book, view, and cancel rides with live updates
- 💬 **Real-Time Chat** – Secure one-on-one chat between ride provider and passengers using WebSockets
- 🔐 **Authentication** – Secure JWT-based login and session handling
- 📊 **Admin Dashboard** *(optional)* – For viewing all rides, users, and analytics

---

## 🔧 How to Run Locally

### 🖥️ Backend (Express)

```bash
cd server
npm install
npm start

```

#Folder Structure
root/
├── client/           # React Frontend
├── server/           # Express Backend
├── database/         # SQL dump or DB setup scripts
└── README.md

# How Pooling Works
# When a new ride is booked, backend compares its route with existing rides.
# If the similarity score (based on location and time overlap) is high, a match is suggested.
# Users are pooled automatically and notified.


# Future Improvements
Push notifications
In-app payment integration
Ride rating system
Location tracking of rides in real time
PWA support for offline functionality

# Contributers
Muhammed Ismayil
