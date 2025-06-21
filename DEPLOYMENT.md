# 🚀 Deployment Guide - Live Music Mood Board

This guide provides step-by-step instructions for deploying the Live Music Mood Board application.

## 📋 Prerequisites

- GitHub account
- Netlify account (for frontend)
- Render/Railway/Vercel account (for backend)
- Spotify Developer Account
- Optional: Custom domain

## 🎯 Deployment Overview

- **Frontend**: Netlify (Next.js)
- **Backend**: Render (Node.js + Express)
- **Database**: In-memory (for MVP, can be upgraded to MongoDB/PostgreSQL)
- **Real-time**: WebSocket via Socket.IO

## 🌐 Frontend Deployment (Netlify)

### Step 1: Prepare the Repository
The project is already configured for Netlify deployment with `netlify.toml`.

### Step 2: Deploy to Netlify

1. **Login to Netlify**: Go to [netlify.com](https://netlify.com) and sign in
2. **New Site from Git**: Click "New site from Git"
3. **Connect GitHub**: Authorize Netlify to access your GitHub account
4. **Select Repository**: Choose `MB557/Live-Music-Mood-Board`
5. **Build Settings**:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/.next`
6. **Deploy**: Click "Deploy site"

### Step 3: Configure Environment Variables (if needed)
In Netlify dashboard → Site settings → Environment variables:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

### Step 4: Custom Domain (Optional)
1. Go to Domain settings in Netlify
2. Add your custom domain
3. Configure DNS settings as instructed

## 🛠️ Backend Deployment (Render)

### Step 1: Create Render Account
Sign up at [render.com](https://render.com)

### Step 2: Create New Web Service

1. **New Web Service**: Click "New" → "Web Service"
2. **Connect Repository**: Connect your GitHub repository
3. **Configure Service**:
   - Name: `live-music-mood-board-backend`
   - Region: Choose closest to your users
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

### Step 3: Environment Variables
Add these environment variables in Render dashboard:

```env
NODE_ENV=production
PORT=10000
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
SPOTIFY_REDIRECT_URI=https://your-frontend-domain.netlify.app/callback
GENIUS_ACCESS_TOKEN=your_genius_token_here
```

### Step 4: Deploy
Click "Create Web Service" and wait for deployment to complete.

## 🎵 Spotify API Setup

### Step 1: Create Spotify App
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Click "Create an App"
3. Fill in app details:
   - App name: "Live Music Mood Board"
   - App description: "Real-time music mood tracking"
   - Website: Your deployed frontend URL
   - Redirect URI: `https://your-frontend-domain.netlify.app/callback`

### Step 2: Get Credentials
1. Copy Client ID and Client Secret
2. Add to your backend environment variables

### Step 3: Configure Scopes
Required scopes:
- `user-read-currently-playing`
- `user-read-playback-state`

## 🔗 Update API URLs

### Frontend Configuration
Update the WebSocket connection URL in `frontend/app/page.js`:

```javascript
// Change from:
const socketInstance = io('http://localhost:5000');

// To:
const socketInstance = io('https://your-backend-url.onrender.com');
```

Also update API calls:
```javascript
// Change from:
const response = await fetch('http://localhost:5000/api/mood-stats');

// To:
const response = await fetch('https://your-backend-url.onrender.com/api/mood-stats');
```

### Backend CORS Configuration
Update CORS settings in `backend/server.js`:

```javascript
const io = socketIo(server, {
  cors: {
    origin: ["https://your-frontend-domain.netlify.app", "http://localhost:3000"],
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: ["https://your-frontend-domain.netlify.app", "http://localhost:3000"]
}));
```

## 🧪 Testing Deployment

### Backend Testing
Test these endpoints:
- `https://your-backend-url.onrender.com/health`
- `https://your-backend-url.onrender.com/api/recent-songs`
- `https://your-backend-url.onrender.com/api/mood-stats`

### Frontend Testing
1. Visit your Netlify URL
2. Check WebSocket connection status
3. Verify real-time updates are working
4. Test Spotify OAuth flow (if configured)

### WebSocket Testing
Open browser developer tools and check for:
```
Connected to server
```

## 🚨 Troubleshooting

### Common Issues

**1. CORS Errors**
- Ensure backend CORS is configured with your frontend domain
- Check for typos in domain names

**2. WebSocket Connection Failed**
- Verify WebSocket URL is HTTPS in production
- Check Render logs for connection errors

**3. Build Failures**
- Check Node.js version compatibility
- Verify all dependencies are installed
- Review build logs for specific errors

**4. Spotify OAuth Not Working**
- Verify redirect URI matches exactly
- Check client ID/secret are correct
- Ensure scopes are properly configured

### Debugging Steps

1. **Check Render Logs**:
   ```bash
   # In Render dashboard, go to your service → Logs
   ```

2. **Check Netlify Deploy Logs**:
   ```bash
   # In Netlify dashboard, go to Deploys → View details
   ```

3. **Test API Endpoints**:
   ```bash
   curl https://your-backend-url.onrender.com/health
   ```

## 🔄 Continuous Deployment

Both Netlify and Render support automatic deployments:

- **Netlify**: Automatically deploys on pushes to `main` branch
- **Render**: Automatically deploys on pushes to `main` branch

To trigger manual deploys:
- **Netlify**: Dashboard → Deploys → Trigger deploy
- **Render**: Dashboard → Manual Deploy

## 📊 Monitoring

### Performance Monitoring
- Use Netlify Analytics for frontend metrics
- Use Render metrics for backend performance
- Monitor WebSocket connection stability

### Error Tracking
Consider adding:
- Sentry for error tracking
- LogRocket for user session recording
- Uptime monitoring (Pingdom, UptimeRobot)

## 🎯 Production Optimizations

### Security
- Add rate limiting to API endpoints
- Implement proper authentication
- Use HTTPS everywhere
- Validate all user inputs

### Performance
- Enable gzip compression
- Add CDN for static assets
- Implement database connection pooling (when adding persistent storage)
- Add Redis for caching (optional)

### Scalability
- Consider using Redis for WebSocket scaling
- Implement proper database for production
- Add load balancing if needed
- Monitor resource usage

## 📝 Post-Deployment Checklist

- [ ] Backend health check returns 200
- [ ] Frontend loads without errors
- [ ] WebSocket connection established
- [ ] Real-time updates working
- [ ] Spotify OAuth configured (if applicable)
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificates active
- [ ] Error monitoring setup
- [ ] Backup strategy in place

## 🆘 Support

If you encounter issues during deployment:

1. Check the troubleshooting section above
2. Review platform-specific documentation:
   - [Netlify Docs](https://docs.netlify.com/)
   - [Render Docs](https://render.com/docs)
3. Open an issue on the GitHub repository
4. Check the project README for additional information

---

Happy deploying! 🚀 