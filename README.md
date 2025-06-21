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

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Spotify Developer Account (for production use)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MB557/Live-Music-Mood-Board.git
   cd Live-Music-Mood-Board
   ```

2. **Install dependencies for both frontend and backend**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp backend/env.example backend/.env
   ```
   
   Edit `backend/.env` with your API credentials:
   ```env
   PORT=5000
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
   GENIUS_ACCESS_TOKEN=your_genius_access_token
   NODE_ENV=development
   ```

4. **Run the development servers**
   ```bash
   npm run dev
   ```
   
   This will start:
   - Backend server on `http://localhost:5000`
   - Frontend Next.js app on `http://localhost:3000`

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

## 🌐 Deployment

### Frontend Deployment (Netlify)

1. **Connect your GitHub repository to Netlify**
2. **Configure build settings**:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/.next`

3. **Update API URLs** in the frontend code to point to your deployed backend

### Backend Deployment (Render/Railway/Vercel)

1. **Deploy to Render** (recommended for Node.js):
   - Connect your GitHub repository
   - Set root directory to `backend`
   - Build command: `npm install`
   - Start command: `npm start`
   - Add environment variables in the Render dashboard

2. **Update CORS settings** in `backend/server.js` to include your deployed frontend URL

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

- WebSocket connection may timeout on inactive tabs
- Spotify API rate limits may affect real-time updates
- Mock data simulation runs every 15 seconds
- Chart.js responsive design needs refinement on mobile

## 📞 Support

For support, email support@example.com or open an issue on GitHub.

## 🙏 Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for music data
- [Chart.js](https://www.chartjs.org/) for beautiful charts
- [Socket.IO](https://socket.io/) for real-time communication
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the React framework

---

Made with ❤️ by [MB557](https://github.com/MB557) 