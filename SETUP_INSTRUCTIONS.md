# GoFood - Setup & Installation Guide

## Conversion Summary

Your GoFood_Ready project has been successfully converted from **PHP/MySQL** to **Node.js/Express/MongoDB** with the same technology stack as QuickPick.

### What's New
- ✅ **Backend**: Node.js + Express (backend_new/)
- ✅ **Database**: MongoDB (replaces MySQL)
- ✅ **Frontend**: Vanilla HTML/CSS/JavaScript (frontend_new/)
- ✅ **Authentication**: JWT + bcryptjs
- ✅ **API**: RESTful endpoints (same as QuickPick)

---

## 📋 Prerequisites

Before you start, make sure you have:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version` and `npm --version`

2. **MongoDB** (v4.4 or higher)
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

3. **Python** (for frontend server, optional)
   - Windows comes with it, or install from https://www.python.org/

---

## 🚀 Step 1: Backend Setup

### 1.1 Navigate to Backend Directory
```bash
cd backend_new
```

### 1.2 Install Dependencies
```bash
npm install
```

This will install:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- dotenv
- nodemon

### 1.3 Verify .env Configuration
Open `backend_new/.env` and verify:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gofood_db
JWT_SECRET=your_secret_key_here_change_in_production
NODE_ENV=development
```

If using MongoDB Atlas (cloud), update MONGODB_URI:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gofood_db?retryWrites=true&w=majority
```

### 1.4 Start MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- No setup needed, use connection string in .env

### 1.5 Start the Backend Server
```bash
npm run dev
```

Expected output:
```
MongoDB connected successfully
GoFood server running on http://localhost:5000
```

---

## 🎨 Step 2: Frontend Setup

### 2.1 Navigate to Frontend Directory
```bash
cd frontend_new
```

### 2.2 Start a Local Server

**Option A: Python (Recommended)**
```bash
python -m http.server 8000
```

**Option B: Node.js http-server**
```bash
npx http-server
```

**Option C: VS Code Live Server**
- Install "Live Server" extension
- Right-click on index.html
- Click "Open with Live Server"

### 2.3 Open in Browser
```
http://localhost:8000
```

---

## ✅ Testing the Application

### 1. Register a User
- Click "Register" on homepage
- Fill in: Name, Email, Password, Address
- You'll be logged in automatically

### 2. View Restaurants
- Homepage shows featured restaurants
- Click "View Menu" to see items

### 3. Add Items to Cart
- Click "Add to Cart" on any item
- Cart count updates in navbar

### 4. Checkout
- Click "Cart" in navbar
- Click "Proceed to Checkout"
- Fill in delivery address
- Select payment method
- Click "Place Order"

### 5. View Profile & Orders
- Click "Profile" in navbar (after login)
- View order history
- Update profile information

---

## 🔐 Admin Access

### How to Create an Admin User

**Option A: Via API (Using Postman or curl)**

1. Register a normal user first
2. In MongoDB, update the user's role:
   ```javascript
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```

**Option B: Direct MongoDB Update**
```bash
mongosh gofood_db
db.users.updateOne(
  { email: "admin@gofood.local" },
  { $set: { role: "admin" } }
)
```

### Admin Features
- Access Admin Panel: `/admin.html`
- Manage Restaurants (Add, Edit, Delete)
- Manage Food Items (Add, Edit, Delete)
- View All Orders and Update Status
- View All Users

---

## 📁 Project Structure Reference

```
GoFood_Ready/
├── backend_new/          # Node.js Backend
│   ├── server.js        # Main entry point
│   ├── package.json     # Dependencies
│   ├── .env             # Config (update this!)
│   ├── config/          # DB connection
│   ├── models/          # MongoDB schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API endpoints
│   └── middleware/      # Authentication
│
├── frontend_new/         # Frontend
│   ├── index.html       # Homepage
│   ├── menu.html        # Restaurant menu
│   ├── cart.html        # Shopping cart
│   ├── checkout.html    # Checkout
│   ├── login.html       # Login
│   ├── register.html    # Registration
│   ├── profile.html     # User profile
│   ├── admin.html       # Admin panel
│   ├── css/styles.css   # Styling
│   └── js/              # JavaScript files
│
└── README_NEW.md        # Full documentation
```

---

## 🔗 API Endpoints Quick Reference

### Authentication
```
POST   /api/auth/signup     - Register user
POST   /api/auth/login      - Login user
```

### Restaurants
```
GET    /api/restaurants     - List all
POST   /api/restaurants     - Create (admin)
GET    /api/restaurants/:id - Get one
PUT    /api/restaurants/:id - Update (admin)
DELETE /api/restaurants/:id - Delete (admin)
```

### Items/Food
```
GET    /api/items                      - List all
GET    /api/items/restaurant/:restId   - Get by restaurant
POST   /api/items                      - Create (admin)
GET    /api/items/:id                  - Get one
PUT    /api/items/:id                  - Update (admin)
DELETE /api/items/:id                  - Delete (admin)
```

### Orders
```
POST   /api/orders            - Create order
GET    /api/orders            - Get my orders
GET    /api/orders/admin/all  - Get all (admin)
GET    /api/orders/:id        - Get one
PUT    /api/orders/:id/status - Update status (admin)
PUT    /api/orders/:id/cancel - Cancel order
```

### Users & Wishlist
```
GET    /api/users/profile     - My profile
PUT    /api/users/profile     - Update profile
GET    /api/wishlist          - My wishlist
POST   /api/wishlist          - Add to wishlist
DELETE /api/wishlist/:id      - Remove from wishlist
```

---

## 🐛 Common Issues & Solutions

### Issue: MongoDB Connection Error
**Solution:**
- Make sure MongoDB is running (`mongod`)
- Check MONGODB_URI in .env
- If using Atlas, verify network access is allowed

### Issue: CORS Error in Console
**Solution:**
- Ensure backend is running on port 5000
- Ensure frontend is running on a different port (8000)
- CORS is already configured in server.js

### Issue: "Cannot GET /api/..." Error
**Solution:**
- Check if backend server is running
- Verify API_BASE_URL in `frontend_new/js/api.js` is correct
- Make sure you're accessing the right endpoint

### Issue: Login/Register Not Working
**Solution:**
- Check browser console for error messages
- Verify MongoDB is running and database is connected
- Check that JWT_SECRET is set in .env

### Issue: Port Already in Use
**Solution:**
```bash
# Change PORT in .env for backend (e.g., PORT=5001)
# Or kill the process using the port:
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
```

---

## 📝 Adding Sample Data

Use Postman or curl to add restaurants and items:

```bash
# 1. Register/Login to get a token
POST http://localhost:5000/api/auth/login
Body: { "email": "admin@test.com", "password": "password" }

# 2. Create a Restaurant (use token from login)
POST http://localhost:5000/api/restaurants
Headers: Authorization: Bearer YOUR_TOKEN
Body: {
  "name": "Burger House",
  "address": "123 Main St",
  "phone": "1234567890",
  "description": "Best burgers in town"
}

# 3. Create an Item (use restaurantId from response above)
POST http://localhost:5000/api/items
Headers: Authorization: Bearer YOUR_TOKEN
Body: {
  "restaurantId": "RESTAURANT_ID_HERE",
  "name": "Cheese Burger",
  "price": 299,
  "category": "Burgers",
  "description": "Juicy cheese burger"
}
```

---

## 🔄 Migration from Old Files

The original PHP/MySQL files are still in:
- `backend/` (old PHP code)
- `frontend/` (old PHP views)

You can reference them while working with the new version. The new code has the same functionality but with the Node.js/MongoDB stack.

---

## 📚 Useful Resources

- [Node.js Docs](https://nodejs.org/docs/)
- [Express Guide](https://expressjs.com/guide)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Mongoose Docs](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)
- [REST API Best Practices](https://restfulapi.net/)

---

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Start MongoDB
3. ✅ Start backend server
4. ✅ Start frontend server
5. ✅ Test the application
6. ✅ Add sample restaurants and items
7. ✅ Create admin user
8. ✅ Access admin panel

---

## 💡 Tips

- Use Postman (https://www.postman.com/) to test API endpoints
- Use MongoDB Compass (https://www.mongodb.com/products/compass) to view database
- Keep browser console open (F12) to see errors
- Check backend console for server errors
- Use `npm run dev` to auto-restart server on file changes

---

## ❓ Need Help?

1. Check error messages in console (browser F12)
2. Check backend server logs
3. Verify all prerequisites are installed
4. Make sure MongoDB is running
5. Check README_NEW.md for more details

---

**Happy Coding! 🚀**

The GoFood application is now running with Node.js, Express, MongoDB, and Vanilla JavaScript - just like QuickPick!
