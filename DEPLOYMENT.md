# 🚀 Deployment Guide: Vercel + Render

## 📋 Current Deployment URLs

- **Frontend (Vercel)**: `https://honey-pot-dashboard-demo-4kjlgc7lp-arunarivalagan743s-projects.vercel.app`
- **Backend (Render)**: `https://honepotdemobackend.onrender.com`

## 🔧 Backend Configuration (Render)

### Environment Variables to Set on Render:
```env
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-production-jwt-secret-key
JWT_EXPIRE=24h
NODE_ENV=production
ADMIN_EMAIL=admin@honeypot-siem.com
ADMIN_PASSWORD=SecureAdmin1234!
```

### CORS Configuration ✅
The backend now allows these origins:
- `http://localhost:5173` (development)
- `http://localhost:3000` (alternative dev port)
- `https://honey-pot-dashboard-demo-4kjlgc7lp-arunarivalagan743s-projects.vercel.app` (your Vercel app)
- `https://honepotdemobackend.onrender.com` (backend domain)

## 🌐 Frontend Configuration (Vercel)

### Environment Variables to Set on Vercel:
```env
VITE_API_URL=https://honepotdemobackend.onrender.com
```

### Build Settings:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## 🔐 Security Checklist

### Backend Security:
- [ ] Change JWT_SECRET to a strong random string
- [ ] Use production MongoDB database
- [ ] Enable MongoDB authentication
- [ ] Set NODE_ENV=production
- [ ] Review rate limiting settings

### Frontend Security:
- [ ] Update VITE_API_URL to production backend
- [ ] Remove any development credentials
- [ ] Enable HTTPS redirects
- [ ] Configure proper headers

## 🧪 Testing the Deployment

### 1. Test Backend Health:
```bash
curl https://honepotdemobackend.onrender.com/api/health
```

### 2. Test CORS:
```javascript
// Should work from your Vercel domain
fetch('https://honepotdemobackend.onrender.com/api/health')
  .then(r => r.json())
  .then(console.log);
```

### 3. Test Authentication:
```javascript
// Login test from Vercel frontend
fetch('https://honepotdemobackend.onrender.com/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@honeypot-siem.com',
    password: 'SecureAdmin1234!'
  })
});
```

## 🔄 Deployment Workflow

### For Backend Updates:
1. Push changes to your backend repository
2. Render automatically deploys
3. Seed admin account if needed: `npm run seed`

### For Frontend Updates:
1. Update `.env` for production:
   ```env
   VITE_API_URL=https://honepotdemobackend.onrender.com
   ```
2. Push to your frontend repository
3. Vercel automatically deploys

## 🐛 Troubleshooting

### CORS Issues:
- Check browser console for CORS errors
- Verify your domain is in the allowedOrigins array
- Check backend logs on Render

### Authentication Issues:
- Ensure backend MongoDB is running
- Check if admin account is seeded
- Verify JWT_SECRET is set correctly

### Network Issues:
- Test backend health endpoint first
- Check if Render service is sleeping (free tier)
- Verify environment variables are set correctly

## 📊 Monitoring

### Backend (Render):
- Check logs for errors
- Monitor response times
- Check database connections

### Frontend (Vercel):
- Monitor build logs
- Check function logs
- Verify environment variables

---

## 🎯 Quick Commands

### Restart Backend (if needed):
```bash
# On Render dashboard: Manual Deploy → Deploy Latest Commit
```

### Update Frontend Environment:
```bash
# Update on Vercel dashboard: Settings → Environment Variables
VITE_API_URL=https://honepotdemobackend.onrender.com
```

### Test Login Locally with Production Backend:
```bash
# In your .env file:
VITE_API_URL=https://honepotdemobackend.onrender.com

# Then run:
npm run dev
```

Your SIEM dashboard should now work seamlessly between your Vercel frontend and Render backend! 🛡️
