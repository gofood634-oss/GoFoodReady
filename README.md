# GoFood - Food Delivery Application

A full-stack food delivery application built with Node.js, Express, MongoDB, and vanilla JavaScript.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation & Setup

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Start both servers:**
   ```bash
   npm run dev
   ```
   This will start both backend (port 5000) and frontend (port 8000) simultaneously.

### Manual Server Startup

**Backend Server (Port 5000):**
```bash
cd backend
npm run dev
```

**Frontend Server (Port 8000):**
```bash
cd frontend
npm run dev
```

## 🔧 Troubleshooting

### Port Issues
If you get "port already in use" errors:

**Check if ports are available:**
```bash
# Backend port 5000
cd backend && npm run check-port

# Frontend port 8000
cd frontend && npm run check-port
```

**Kill processes using ports (Windows):**
```bash
# Find process using port 5000
netstat -ano | findstr :5000
# Kill with: taskkill /PID <PID> /F

# Find process using port 8000
netstat -ano | findstr :8000
# Kill with: taskkill /PID <PID> /F
```

### MongoDB Issues
- Ensure MongoDB is running locally or your Atlas connection string is correct
- The server will continue running even if MongoDB connection fails
- Check `backend/.env` for correct `MONGODB_URI`

### Common Issues
- **"npm command not found"**: Install Node.js from https://nodejs.org/
- **"MongoDB connection error"**: Start MongoDB service or check Atlas connection
- **"Port already in use"**: Kill existing processes or change ports in config

## 📁 Project Structure

```
GoFood_Ready/
├── backend/                 # Node.js Express API
│   ├── config/             # Database configuration
│   ├── controllers/        # Business logic
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── middleware/        # Authentication
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── frontend/               # Static HTML/CSS/JS
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   ├── *.html             # HTML pages
│   └── package.json       # Frontend scripts
├── package.json           # Root scripts
└── README.md             # This file
```

## 🎯 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend
- `npm run install:all` - Install all dependencies
- `npm run clean` - Clean node_modules

### Backend
- `npm run dev` - Start with nodemon (auto-restart)
- `npm start` - Start production server
- `npm run check-port` - Check if port 5000 is available

### Frontend
- `npm run dev` - Start http-server with CORS
- `npm start` - Start http-server
- `npm run check-port` - Check if port 8000 is available

## 🌐 Access the Application

- **Frontend**: http://localhost:8000
- **Backend API**: http://localhost:5000

## 📝 Features

- User authentication (JWT)
- Restaurant browsing with cuisine filtering
- Shopping cart functionality
- Order management
- Admin panel
- Responsive design

## 🔐 Environment Variables

Create `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gofood_db
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Ensure all prerequisites are installed
3. Verify MongoDB is running
4. Check browser console and server logs

---

**Happy coding! 🚀**