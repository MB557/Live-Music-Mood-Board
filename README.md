# Live Music Mood Board 🎵

A fullstack application that displays real-time music moods based on Spotify listening activity and sentiment analysis of song lyrics.

![Live Music Mood Board](https://via.placeholder.com/800x400/1f2937/ffffff?text=Live+Music+Mood+Board)

## ✨ Features

- **Real-time Music Feed**: Live display of currently playing songs from connected users
- **Mood Analysis**: Automatic sentiment analysis of song lyrics to determine mood (happy, sad, angry, energetic, neutral)
- **Live WebSocket Updates**: Real-time updates without page refresh
- **Mood Visualization**: Interactive pie chart showing mood distribution over the last 10 minutes
- **Spotify Integration**: OAuth integration with Spotify Web API
- **Responsive Design**: Beautiful, modern UI built with Next.js and TailwindCSS
- **Mock Data Support**: Works with simulated data for demonstration purposes

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **Socket.IO** for real-time WebSocket communication
- **Spotify Web API** for music data
- **Genius API** for lyrics (planned)
- **Sentiment Analysis** using the `sentiment` npm package

### Frontend
- **Next.js 14** with App Router
- **React 18** with hooks
- **TailwindCSS** for styling
- **Chart.js** with react-chartjs-2 for data visualization
- **Socket.IO Client** for real-time updates
- **Lucide React** for icons

## 📦 Project Structure

```
live-music-mood-board/
├── backend/
│   ├── server.js              # Express server with WebSocket
│   ├── package.json           # Backend dependencies
│   └── env.example            # Environment variables template
├── frontend/
│   ├── app/
│   │   ├── components/        # React components
│   │   │   ├── MoodChart.js   # Chart.js mood visualization
│   │   │   ├── SongFeed.js    # Real-time song feed
│   │   │   └── StatsCard.js   # Statistics display cards
│   │   ├── globals.css        # Global styles with TailwindCSS
│   │   ├── layout.js          # Root layout component
│   │   └── page.js            # Main homepage
│   ├── next.config.js         # Next.js configuration
│   ├── tailwind.config.js     # TailwindCSS configuration
│   └── package.json           # Frontend dependencies
├── netlify.toml               # Netlify deployment config
├── package.json               # Root package.json with scripts
└── README.md                  # This file
```

## 🚀 Complete Setup Guide

### Prerequisites
- **Node.js 18+** installed
- **npm** package manager
- **GitHub account** for code hosting
- **Spotify account** (free or premium)
- **Netlify account** (free tier available)
- **Render account** (free tier available)

### 📋 Step 1: Spotify Developer App Setup

1. **Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)**
2. **Login** with your Spotify account
3. **Create a new app**:
   - **App name**: `Live Music Mood Board`
   - **App description**: `Real-time music mood tracking application`
   - **Website**: `https://your-netlify-url.netlify.app` (you'll update this later)
   - **Redirect URIs**: `https://your-backend-url.onrender.com/auth/callback` (you'll update this later)
   - **APIs used**: Check "Web API"

4. **Save your credentials**:
   - **Client ID**: Copy this value
   - **Client Secret**: Click "View client secret" and copy this value

### 📁 Step 2: Clone and Install

1. **Clone the repository**
   ```bash
   git clone https://github.com/MB557/Live-Music-Mood-Board.git
   cd Live-Music-Mood-Board
   ```

2. **Install all dependencies**
   ```bash
   npm install
   npm run install-all
   ```

### 🖥️ Step 3: Local Development Setup

1. **Create environment file**
   ```bash
   cp backend/env.example backend/.env
   ```

2. **Edit `backend/.env` with your Spotify credentials**:
   ```env
   PORT=5000
   SPOTIFY_CLIENT_ID=your_actual_client_id_here
   SPOTIFY_CLIENT_SECRET=your_actual_client_secret_here
   SPOTIFY_REDIRECT_URI=http://localhost:5000/auth/callback
   GENIUS_ACCESS_TOKEN=optional_for_lyrics
   NODE_ENV=development
   ```

3. **Run both servers**
   ```bash
   npm run dev
   ```
   
   This starts:
   - **Backend**: `http://localhost:5000` (Express + WebSocket)
   - **Frontend**: `http://localhost:3000` (Next.js)

4. **Test local setup**:
   - Visit `http://localhost:3000` - should show "Connected" status
   - Visit `http://localhost:5000/auth/spotify` - should redirect to Spotify login

### 🌐 Step 4: Production Deployment

#### 4A. Deploy Frontend to Netlify

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Initial setup"
   git push origin main
   ```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com) and login
   - Click "New site from Git"
   - Connect your GitHub account
   - Select repository: `YOUR_USERNAME/Live-Music-Mood-Board`
   - **Build settings** (auto-configured from `netlify.toml`):
     - Base directory: `frontend`
     - Build command: `npm run build`
     - Publish directory: `out`
   - Click "Deploy site"

3. **Note your Netlify URL** (e.g., `https://amazing-name-123456.netlify.app`)

#### 4B. Deploy Backend to Render

1. **Go to [render.com](https://render.com)** and sign up
2. **Create Web Service**:
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select: `YOUR_USERNAME/Live-Music-Mood-Board`

3. **Configure the service**:
   - **Name**: `live-music-mood-board-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Add Environment Variables** in Render:
   ```
   NODE_ENV=production
   PORT=10000
   SPOTIFY_CLIENT_ID=your_actual_client_id_here
   SPOTIFY_CLIENT_SECRET=your_actual_client_secret_here
   SPOTIFY_REDIRECT_URI=https://your-render-url.onrender.com/auth/callback
   ```

5. **Deploy** and note your backend URL (e.g., `https://live-music-mood-board.onrender.com`)

#### 4C. Connect Frontend to Backend

1. **Add environment variable to Netlify**:
   - Go to Netlify Dashboard → Your site → Site settings → Environment variables
   - **Add variable**:
     - **Key**: `NEXT_PUBLIC_API_URL`
     - **Value**: `https://your-render-backend-url.onrender.com`

2. **Redeploy Netlify site**:
   - Go to Deploys tab → Trigger deploy → Deploy site

### 🔗 Step 5: Update Spotify App Settings

1. **Go back to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)**
2. **Edit your app settings**
3. **Update URLs**:
   - **Website**: `https://your-netlify-url.netlify.app`
   - **Redirect URIs**: `https://your-render-backend-url.onrender.com/auth/callback`
4. **Save changes**

### ✅ Step 6: Test Complete Setup

1. **Visit your Netlify URL**: Should show "Connected" status
2. **Test Spotify OAuth**:
   - Visit: `https://your-render-backend-url.onrender.com/auth/spotify`
   - Login with Spotify and authorize the app
   - Should redirect back to your Netlify app with `?auth=success`
3. **Play music on Spotify** (any device)
4. **Check the live feed**: Your real songs should appear within 15 seconds!

### 🎵 Step 7: Using the App

1. **Authenticate**: Visit the OAuth URL to connect your Spotify
2. **Play music**: Open Spotify (desktop, mobile, or web) and play any song
3. **Watch the magic**: Your real music will appear in the live feed with:
   - 🎧 **User**: "You" 
   - **Real song names and artists**
   - **Mood analysis** based on lyrics sentiment
   - **Real-time updates** every 15 seconds

### 🔧 Development Commands

```bash
# Install dependencies
npm run install-all

# Run both servers in development
npm run dev

# Run servers separately  
npm run backend:dev    # Backend only
npm run frontend:dev   # Frontend only

# Build for production
npm run build

# Start production servers
npm run start
```

## 🛠️ Troubleshooting

### Common Issues

#### ❌ "Disconnected" Status in Frontend
**Problem**: WebSocket connection failing
**Solutions**:
1. Check backend URL in browser: `https://your-backend-url.onrender.com/health`
2. Verify CORS settings in backend include your Netlify domain
3. Ensure backend is deployed and running

#### ❌ Mock Data Instead of Real Spotify Songs
**Problem**: OAuth not working properly
**Solutions**:
1. **Check Spotify redirect URI**: Must be `https://your-backend-url.onrender.com/auth/callback`
2. **Re-authenticate**: Visit `/auth/spotify` endpoint again
3. **Check environment variables** in Render dashboard
4. **Verify Spotify app settings** in developer dashboard

#### ❌ Build Failures on Netlify
**Problem**: Next.js build errors
**Solutions**:
1. Check `netlify.toml` has correct publish directory: `out`
2. Ensure Next.js config has `output: 'export'`
3. Check build logs for specific error messages

#### ❌ CORS Errors in Browser Console
**Problem**: Cross-origin requests blocked
**Solution**: Update backend CORS settings to include your Netlify domain:
```javascript
cors: {
  origin: ["https://your-netlify-url.netlify.app", "http://localhost:3000"]
}
```

### Development Tips
- **Real-time testing**: Use browser dev tools → Network tab to monitor WebSocket connection
- **Backend debugging**: Check Render logs for authentication status
- **Frontend debugging**: Open browser console to see connection status and API calls

## 🚀 Live Demo

**🌟 Try the live application:**
- **Frontend**: [https://thriving-halva-3ab02a.netlify.app](https://thriving-halva-3ab02a.netlify.app)
- **Backend API**: [https://live-music-mood-board.onrender.com](https://live-music-mood-board.onrender.com)

**To test with your Spotify:**
1. Visit the Spotify auth endpoint: [https://live-music-mood-board.onrender.com/auth/spotify](https://live-music-mood-board.onrender.com/auth/spotify)
2. Log in and authorize the app
3. Start playing music on any Spotify device
4. Watch your songs appear in real-time!

## 🎯 Key URLs for Your Deployment
Once deployed, you'll have these important URLs:

**For Authentication:**
- OAuth Login: `https://your-backend-url/auth/spotify`
- Health Check: `https://your-backend-url/health`

**For Users:**
- Main App: `https://your-netlify-url.netlify.app`
- Connection Status: Check top-right corner for "Connected/Disconnected"

## 🎨 API Endpoints

### Backend API Routes

- `GET /api/now-playing` - Get current track info for a user
- `GET /api/lyrics?track=<title>&artist=<name>` - Fetch lyrics from Genius API
- `GET /api/mood?lyrics=...` - Return mood using sentiment analysis
- `GET /api/recent-songs` - Get list of recent songs
- `GET /api/mood-stats` - Get mood distribution statistics
- `GET /auth/spotify` - Initiate Spotify OAuth flow
- `GET /auth/callback` - Handle Spotify OAuth callback
- `WS /ws` - WebSocket endpoint for real-time updates

## 📊 Mood Classification

The app uses sentiment analysis to classify songs into five mood categories:

- **😄 Happy**: Positive sentiment score > 2
- **😢 Sad**: Negative sentiment score < -2
- **😠 Angry**: Very negative sentiment score < -5
- **⚡ Energetic**: High comparative sentiment score > 0.5
- **😐 Neutral**: Sentiment scores between thresholds

## 🌐 Production Deployment Status

This application is currently deployed and running:

- **Frontend (Netlify)**: ✅ [https://thriving-halva-3ab02a.netlify.app](https://thriving-halva-3ab02a.netlify.app)
- **Backend (Render)**: ✅ [https://live-music-mood-board.onrender.com](https://live-music-mood-board.onrender.com)
- **GitHub Repository**: [https://github.com/MB557/Live-Music-Mood-Board](https://github.com/MB557/Live-Music-Mood-Board)

### Architecture
- **Frontend**: Next.js static site deployed on Netlify with automatic builds from `main` branch
- **Backend**: Express.js server with WebSocket support deployed on Render
- **WebSocket**: Real-time communication between frontend and backend
- **APIs**: Spotify Web API for music data, Genius API for lyrics

### Configuration Files
- `netlify.toml`: Netlify build configuration with `output: 'export'` for static hosting
- `next.config.js`: Next.js configuration for static export
- Environment variables configured in respective hosting dashboards

## 🔧 Configuration

### Spotify API Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Create a new app
3. Add redirect URI: `http://localhost:3000/callback` (for development)
4. Copy Client ID and Client Secret to your `.env` file

### Mock Data Mode

The app includes mock data for demonstration. It will automatically use mock data if:
- Spotify credentials are not configured
- API requests fail
- You want to test the UI without API dependencies

## 🛡️ Security Considerations

- API keys are stored in environment variables
- CORS is configured for specific origins
- WebSocket connections are validated
- Rate limiting should be implemented for production use

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [ ] User authentication and profiles
- [ ] Playlist integration
- [ ] Social features (likes, comments)
- [ ] Advanced mood analysis with ML models
- [ ] Mobile app (React Native)
- [ ] Spotify Premium features integration
- [ ] Real-time collaborative playlists
- [ ] Mood-based music recommendations

## 🐛 Known Issues

- **Spotify OAuth**: Currently using mock data due to redirect URI misconfiguration. The Spotify Developer App redirect URI needs to point to the backend (`https://live-music-mood-board.onrender.com/auth/callback`) instead of frontend
- WebSocket connection may timeout on inactive tabs
- Spotify API rate limits may affect real-time updates
- Mock data simulation runs every 15 seconds
- Chart.js responsive design needs refinement on mobile

## ⚡ Quick Start (For Testing)

Want to see it working immediately? 
1. **Visit**: [https://thriving-halva-3ab02a.netlify.app](https://thriving-halva-3ab02a.netlify.app)
2. **Check connection**: Top-right should show "Connected"
3. **Watch mock data**: Songs automatically update every 15 seconds
4. **For real Spotify data**: Follow the complete setup guide above

## 🙏 Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for music data
- [Chart.js](https://www.chartjs.org/) for beautiful charts
- [Socket.IO](https://socket.io/) for real-time communication
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the React framework
