# GoFood - Node.js + MongoDB Version

A complete full-stack food delivery application built with Node.js, Express, MongoDB, and Vanilla JavaScript.

## 📁 Project Structure

```
GoFood_Ready/
├── backend_new/              # Node.js + Express Backend
│   ├── server.js            # Main server entry point
│   ├── package.json         # Dependencies
│   ├── .env                 # Environment variables
│   ├── .gitignore
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── restaurantController.js
│   │   ├── itemController.js
│   │   ├── orderController.js
│   │   └── wishlistController.js
│   ├── routes/              # API endpoints
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── restaurantRoutes.js
│   │   ├── itemRoutes.js
│   │   ├── orderRoutes.js
│   │   └── wishlistRoutes.js
│   ├── models/              # MongoDB schemas
│   │   ├── User.js
│   │   ├── Restaurant.js
│   │   ├── Item.js
│   │   ├── Order.js
│   │   └── Wishlist.js
│   └── middleware/          # Authentication
│       └── auth.js
│
└── frontend_new/             # Vanilla HTML/CSS/JS Frontend
    ├── index.html           # Home page
    ├── menu.html           # Restaurant menu
    ├── cart.html           # Shopping cart
    ├── checkout.html       # Checkout page
    ├── login.html          # Login page
    ├── register.html       # Registration page
    ├── profile.html        # User profile
    ├── order-success.html  # Order confirmation
    ├── css/
    │   └── styles.css      # All styling
    ├── js/                 # JavaScript logic
    │   ├── api.js         # API calls
    │   ├── auth.js        # Authentication management
    │   ├── auth-page.js   # Login/Register page logic
    │   ├── main.js        # Home page logic
    │   ├── products.js    # Menu/Items logic
    │   ├── cart.js        # Cart logic
    │   ├── checkout.js    # Checkout logic
    │   └── profile.js     # Profile page logic
    └── assets/
        └── images/         # Image storage
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (v4.4+)
- Code Editor (VS Code recommended)

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend_new
```

2. **Install dependencies:**
```bash
npm install
```

3. **Verify .env file:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gofood_db
JWT_SECRET=your_secret_key_here_change_in_production
NODE_ENV=development
```

4. **Start MongoDB:**
```bash
mongod
```

5. **Start the server:**
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend_new
```

2. **Start a local server:**
Using Python:
```bash
python -m http.server 8000
```

Or using Node.js:
```bash
npx http-server
```

3. **Open in browser:**
```
http://localhost:8000
```

## 📋 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users` - Get all users (Admin)

### Restaurants
- `GET /api/restaurants` - List all restaurants
- `GET /api/restaurants/:id` - Get restaurant details
- `POST /api/restaurants` - Create restaurant (Admin)
- `PUT /api/restaurants/:id` - Update restaurant (Admin)
- `DELETE /api/restaurants/:id` - Delete restaurant (Admin)

### Items
- `GET /api/items` - List all items
- `GET /api/items/restaurant/:restaurantId` - Get items by restaurant
- `GET /api/items/:id` - Get item details
- `POST /api/items` - Create item (Admin)
- `PUT /api/items/:id` - Update item (Admin)
- `DELETE /api/items/:id` - Delete item (Admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/admin/all` - Get all orders (Admin)
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status (Admin)
- `PUT /api/orders/:id/cancel` - Cancel order

### Wishlist
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist` - Add item to wishlist
- `DELETE /api/wishlist/:id` - Remove from wishlist

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling (Flexbox, Grid)
- **Vanilla JavaScript** - No frameworks, pure JS
- **Fetch API** - API communication
- **localStorage** - Client-side storage

## 📊 Database Models

### User Schema
- name: String
- email: String (unique)
- password: String (hashed)
- phone: String
- address: String
- role: String (customer, admin)
- createdAt: Date

### Restaurant Schema
- name: String
- address: String
- phone: String
- description: String
- createdAt: Date

### Item Schema
- restaurantId: ObjectId (ref: Restaurant)
- name: String
- description: String
- price: Number
- image: String
- category: String
- createdAt: Date

### Order Schema
- userId: ObjectId (ref: User)
- items: Array of {itemId, quantity, price}
- total: Number
- address: String
- paymentMethod: String
- status: String (Pending, Confirmed, Preparing, On The Way, Delivered, Cancelled)
- createdAt: Date

### Wishlist Schema
- userId: ObjectId (ref: User)
- itemId: ObjectId (ref: Item)
- createdAt: Date

## 🔐 Authentication Flow

1. User registers with email/password
2. Password is hashed using bcryptjs
3. User account created in MongoDB
4. User logs in with credentials
5. JWT token generated and sent to frontend
6. Frontend stores token in localStorage
7. Token included in subsequent API requests (Bearer token)
8. Middleware validates token on protected routes

## 🎨 Features Implemented

### User Features
- ✅ User registration and login
- ✅ Profile management
- ✅ Browse restaurants
- ✅ View restaurant menus
- ✅ Add/remove items from cart
- ✅ Checkout and order placement
- ✅ View order history
- ✅ Add items to wishlist

### Admin Features
- ✅ Manage restaurants (CRUD)
- ✅ Manage food items (CRUD)
- ✅ Manage users
- ✅ Update order status
- ✅ View all orders

## 📝 Sample Data

To add sample restaurants and items, use the API or create a seed script. Example with Postman or curl:

```bash
# Create a restaurant
curl -X POST http://localhost:5000/api/restaurants \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pizza Palace",
    "address": "123 Main St",
    "phone": "1234567890",
    "description": "Best pizzas in town"
  }'

# Create an item
curl -X POST http://localhost:5000/api/items \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "restaurantId": "RESTAURANT_ID",
    "name": "Margherita Pizza",
    "price": 299,
    "category": "Pizza",
    "description": "Classic margherita with fresh basil"
  }'
```

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify database name in MONGODB_URI

### CORS Errors
- Backend and frontend must run on different ports
- CORS middleware already configured in `server.js`
- Update CORS_ORIGIN in `.env` if needed

### Port Already in Use
- Change PORT in `.env` (backend)
- Change port in http-server command (frontend)

### API Not Accessible from Frontend
- Ensure backend server is running on http://localhost:5000
- Check API_BASE_URL in `frontend_new/js/api.js`
- Verify CORS is enabled in backend

## 📚 Resources

- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com)
- [JWT Introduction](https://jwt.io)
- [MDN Web Docs](https://developer.mozilla.org)
- [Fetch API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## 📄 License

MIT License - Feel free to use this project for learning and development.

## 🤝 Contributing

This is a learning project. Feel free to fork, modify, and improve!

---

**Built with ❤️ as a full-stack food delivery solution**

Converted from PHP/MySQL to Node.js/MongoDB Stack
