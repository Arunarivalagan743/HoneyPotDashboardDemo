# 🛡️ Full-Stack Secure HoneyPot SIEM Dashboard Setup Guide

## Quick Start Instructions

### 1. **Backend Setup**

```bash
# Navigate to backend directory
cd backend

# Install dependencies (already done)
npm install

# Start MongoDB (ensure MongoDB is running on your system)
# Default connection: mongodb://localhost:27017/honeypot-siem

# Seed the admin account
npm run seed

# Start the backend server
npm run dev
```

**Backend will run on:** `http://localhost:5000`

### 2. **Frontend Setup**

```bash
# Navigate back to root directory
cd ..

# Install frontend dependencies (already done)
npm install

# Start the frontend development server
npm run dev
```

**Frontend will run on:** `http://localhost:5173`

### 3. **Default Login Credentials**

- **Email:** `admin@honeypot-siem.com`
- **Password:** `SecureAdmin123!`

## 🔧 Backend Configuration

### Environment Variables (`.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/honeypot-siem
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=24h
NODE_ENV=development

# Admin Account
ADMIN_EMAIL=admin@honeypot-siem.com
ADMIN_PASSWORD=SecureAdmin123!
```

### 🚀 Backend Features

- **JWT Authentication** with secure token handling
- **Bcrypt Password Hashing** (12 salt rounds)
- **Rate Limiting** (5 login attempts per 15 minutes)
- **Account Locking** (after 5 failed attempts for 2 hours)
- **Protected API Routes** with middleware validation
- **CORS Configuration** for frontend communication
- **Security Headers** with Helmet.js

### 📡 API Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/api/auth/login` | Admin login | Public |
| POST | `/api/auth/verify` | Verify JWT token | Public |
| GET | `/api/dashboard` | Get dashboard data | Protected |
| GET | `/api/dashboard/logs` | Get paginated logs | Protected |
| GET | `/api/health` | Health check | Public |

### 🗄️ MongoDB Collections

- **admins**: Stores admin user account with hashed password

## 🎨 Frontend Features

### 🔐 Authentication Flow
1. **Login Form** with email/password validation
2. **JWT Token Storage** in localStorage
3. **Protected Routes** with automatic redirect
4. **Token Verification** on app initialization
5. **Auto-logout** on token expiration

### 🖥️ Dashboard Components
- **Real-time Stats**: Total events, threats, detection rate
- **Threat Visualization**: Pie charts and bar graphs
- **Alert Panel**: Active malicious threats only
- **Log Table**: Sortable, filterable event logs
- **Live Updates**: Auto-refresh every 30 seconds

### 🎯 State Management
- **Zustand Store** for authentication state
- **Persistent Storage** for user session
- **API Client** with automatic token handling
- **Error Handling** with toast notifications

## 🔧 Development Commands

### Backend Commands
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed admin account
```

### Frontend Commands
```bash
npm run dev        # Start Vite development server
npm run build      # Build for production
npm run preview    # Preview production build
```

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Helmet** for security headers
- **CORS** for cross-origin requests
- **Express Rate Limit** for DDoS protection

### Frontend
- **React 18** with functional components
- **Vite** for build tooling
- **Tailwind CSS** with custom cybersecurity theme
- **React Router** for client-side routing
- **Zustand** for state management
- **React Hot Toast** for notifications
- **Chart.js** with react-chartjs-2 for visualization
- **Inter & Fira Code** fonts for clean aesthetics

## 🔒 Security Features

### Authentication Security
- **Secure password hashing** with bcrypt (12 rounds)
- **JWT tokens** with configurable expiration
- **Rate limiting** on login endpoints
- **Account locking** after failed attempts
- **CORS protection** for API access

### Frontend Security
- **Protected routes** with authentication guards
- **Automatic token expiration** handling
- **Secure token storage** in localStorage
- **API request interceptors** for authorization

### Data Security
- **Input validation** on all forms
- **SQL injection protection** via Mongoose
- **XSS protection** via React's built-in escaping
- **CSRF protection** via same-origin policy

## 🎨 UI/UX Features

### Cybersecurity Theme
- **Dark mode interface** with slate color palette
- **Neon glow effects** for threat indicators
- **Professional typography** with Inter font
- **Monospace elements** with Fira Code
- **Responsive design** for all screen sizes

### Interactive Elements
- **Hover effects** on all interactive components
- **Loading states** with spinners and skeletons
- **Toast notifications** for user feedback
- **Real-time updates** with visual indicators
- **Smooth transitions** and animations

## 🚀 Production Deployment

### Environment Setup
1. **Update MongoDB URI** for production database
2. **Change JWT secret** to a secure random string
3. **Update CORS origin** to your production domain
4. **Set NODE_ENV** to "production"
5. **Configure environment variables** on your hosting platform

### Security Checklist
- [ ] Change default admin password
- [ ] Update JWT secret key
- [ ] Configure production MongoDB
- [ ] Enable HTTPS for all traffic
- [ ] Set up database backups
- [ ] Configure monitoring and logging
- [ ] Review rate limiting settings
- [ ] Set up SSL certificates

## 📊 Sample Data

The dashboard displays realistic honeypot attack data including:
- **Attack Types**: SSH Brute Force, SQL Injection, XSS, DDoS, etc.
- **IP Addresses**: Various network ranges and geographic origins
- **Ports**: Common service ports (22, 80, 443, 3306, etc.)
- **ML Predictions**: Malicious vs Benign classification
- **Threat Levels**: Critical, High, Medium, Low severity
- **Geographic Data**: Country-based attack attribution

## 🔮 Future Enhancements

- **WebSocket Integration** for real-time updates
- **Advanced Analytics** with threat intelligence
- **Export Features** for reports and data
- **User Management** with role-based access
- **Email Notifications** for critical threats
- **Geographic Visualization** with world maps
- **API Rate Limiting** with Redis
- **Database Clustering** for scalability

---

**Perfect for**: Security Operations Centers (SOC), Cybersecurity training, Educational demonstrations, Research environments
