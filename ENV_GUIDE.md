# Environment Configuration Guide

## 🔧 Frontend Environment Variables

Create a `.env` file in the project root:

```env
# Development
VITE_API_URL=http://localhost:5001

# Production
# VITE_API_URL=https://honepotdemobackend.onrender.com
```

## 🚀 Quick Setup Commands

### For Development (Local Backend):
```bash
# 1. Start the backend server
cd backend
npm run dev

# 2. In another terminal, start the frontend
cd ..
npm run dev
```

### For Production:
1. Update `.env` file:
   ```env
   VITE_API_URL=https://honepotdemobackend.onrender.com
   ```

2. Build and deploy:
   ```bash
   npm run build
   npm run preview
   ```

## 🔐 Current Credentials
- **Email**: `admin@honeypot-siem.com`
- **Password**: `SecureAdmin1234!`

## ✅ Improvements Implemented

1. **✅ Centralized API Configuration**
   - Single source of truth for API URLs
   - Environment-based configuration
   - Easy switching between dev/prod

2. **✅ Removed Redundant Code**
   - Fixed duplicate `localStorage.setItem()` calls
   - Centralized token management
   - Cleaner auth flow

3. **✅ Enhanced Security**
   - Added `credentials: 'include'` for cross-origin auth
   - Proper timeout handling
   - Centralized auth headers

4. **✅ Better Error Handling**
   - Request timeout protection
   - Consistent error responses
   - Network error detection

5. **✅ Production Ready**
   - Environment variable support
   - Proper .gitignore configuration
   - Easy deployment setup

## 🔄 Migration from Old Code

The system now automatically:
- Uses the correct API URL based on environment
- Handles token storage consistently
- Provides better error messages
- Supports production deployment

No manual changes needed - just update your `.env` file for different environments!
