const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const Sentiment = require('sentiment');
const cron = require('node-cron');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["https://thriving-halva-3ab02a.netlify.app", "http://localhost:3000"],
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;
const sentiment = new Sentiment();

// Middleware
app.use(cors({
  origin: ["https://thriving-halva-3ab02a.netlify.app", "http://localhost:3000"]
}));
app.use(express.json());

// In-memory storage for demo purposes
let recentSongs = [];
let connectedUsers = [];
let spotifyAccessToken = null;

// Mock data for MVP
const mockSongs = [
  {
    id: '1',
    name: 'Blinding Lights',
    artist: 'The Weeknd',
    user: 'User1',
    avatar: '🎵',
    timestamp: new Date(),
    mood: 'energetic',
    lyrics: 'I feel like I am just missing something whenever you are gone'
  },
  {
    id: '2',
    name: 'drivers license',
    artist: 'Olivia Rodrigo',
    user: 'User2',
    avatar: '🎶',
    timestamp: new Date(),
    mood: 'sad',
    lyrics: 'And you are probably with that blonde girl'
  },
  {
    id: '3',
    name: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    user: 'User3',
    avatar: '🎤',
    timestamp: new Date(),
    mood: 'angry',
    lyrics: 'Well good for you I guess you moved on really easily'
  }
];

// Spotify OAuth endpoints
app.get('/auth/spotify', (req, res) => {
  const scopes = 'user-read-currently-playing user-read-playback-state';
  const authURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI)}`;
  res.redirect(authURL);
});

app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', 
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    
    spotifyAccessToken = response.data.access_token;
    console.log('✅ Spotify access token received:', spotifyAccessToken ? 'YES' : 'NO');
    console.log('🔑 Token length:', spotifyAccessToken ? spotifyAccessToken.length : 0);
    const redirectUrl = process.env.NODE_ENV === 'production' 
      ? 'https://thriving-halva-3ab02a.netlify.app/?auth=success'
      : 'http://localhost:3000?auth=success';
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Spotify auth error:', error);
    const redirectUrl = process.env.NODE_ENV === 'production' 
      ? 'https://thriving-halva-3ab02a.netlify.app/?auth=error'
      : 'http://localhost:3000?auth=error';
    res.redirect(redirectUrl);
  }
});

// API Routes
app.get('/api/now-playing', async (req, res) => {
  console.log('🎵 /api/now-playing called. Token exists:', !!spotifyAccessToken);
  
  if (!spotifyAccessToken) {
    console.log('❌ No Spotify token - returning mock data');
    // Return mock data for MVP
    const randomSong = mockSongs[Math.floor(Math.random() * mockSongs.length)];
    return res.json({
      isPlaying: true,
      track: {
        name: randomSong.name,
        artist: randomSong.artist,
        id: randomSong.id
      }
    });
  }
  
  console.log('🔑 Using Spotify token to fetch real data...');

  try {
    const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${spotifyAccessToken}`
      }
    });

    if (response.data && response.data.item) {
      console.log('🎶 Real Spotify data found:', response.data.item.name, 'by', response.data.item.artists[0].name);
      res.json({
        isPlaying: response.data.is_playing,
        track: {
          name: response.data.item.name,
          artist: response.data.item.artists[0].name,
          id: response.data.item.id
        }
      });
    } else {
      console.log('🔇 No music currently playing or no response data');
      res.json({ isPlaying: false });
    }
  } catch (error) {
    console.error('❌ Spotify API error:', error.response?.status, error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch now playing' });
  }
});

app.get('/api/lyrics', async (req, res) => {
  const { track, artist } = req.query;
  
  if (!track || !artist) {
    return res.status(400).json({ error: 'Track and artist are required' });
  }

  // For MVP, return mock lyrics or use a simple approach
  const mockLyricsMap = {
    'Blinding Lights': 'I feel like I am just missing something whenever you are gone',
    'drivers license': 'And you are probably with that blonde girl who always made me doubt',
    'Good 4 U': 'Well good for you I guess you moved on really easily'
  };

  const lyrics = mockLyricsMap[track] || 'Sample lyrics for mood analysis';
  res.json({ lyrics });
});

app.get('/api/mood', (req, res) => {
  const { lyrics } = req.query;
  
  if (!lyrics) {
    return res.status(400).json({ error: 'Lyrics are required' });
  }

  const result = sentiment.analyze(lyrics);
  let mood = 'neutral';
  
  if (result.score > 2) {
    mood = 'happy';
  } else if (result.score < -2) {
    mood = 'sad';
  } else if (result.score < -5) {
    mood = 'angry';
  } else if (result.comparative > 0.5) {
    mood = 'energetic';
  }

  res.json({ 
    mood,
    score: result.score,
    comparative: result.comparative
  });
});

app.get('/api/recent-songs', (req, res) => {
  res.json(recentSongs.slice(-20)); // Return last 20 songs
});

app.get('/api/mood-stats', (req, res) => {
  const now = new Date();
  const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
  
  const recentMoods = recentSongs.filter(song => 
    new Date(song.timestamp) > tenMinutesAgo
  );

  const moodCounts = recentMoods.reduce((acc, song) => {
    acc[song.mood] = (acc[song.mood] || 0) + 1;
    return acc;
  }, {});

  res.json(moodCounts);
});

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Send recent songs to newly connected client
  socket.emit('recentSongs', recentSongs);
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Simulate real-time song updates for MVP (only when no real Spotify data)
const simulateRealTimeUpdates = () => {
  setInterval(async () => {
    // Only use mock data if no Spotify token available
    if (!spotifyAccessToken) {
      const randomSong = mockSongs[Math.floor(Math.random() * mockSongs.length)];
      const newSong = {
        ...randomSong,
        id: Date.now().toString(),
        timestamp: new Date(),
        user: `User${Math.floor(Math.random() * 5) + 1}`
      };
      
      recentSongs.push(newSong);
      
      // Keep only last 50 songs
      if (recentSongs.length > 50) {
        recentSongs = recentSongs.slice(-50);
      }
      
      // Broadcast to all connected clients
      io.emit('newSong', newSong);
    } else {
      // Try to get real Spotify data
      try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: {
            'Authorization': `Bearer ${spotifyAccessToken}`
          }
        });

        if (response.data && response.data.item && response.data.is_playing) {
          const track = response.data.item;
          const lyrics = 'Real lyrics would be fetched here';
          const result = sentiment.analyze(lyrics);
          let mood = 'neutral';
          
          if (result.score > 2) mood = 'happy';
          else if (result.score < -2) mood = 'sad';
          else if (result.score < -5) mood = 'angry';
          else if (result.comparative > 0.5) mood = 'energetic';

          const newSong = {
            id: track.id + '-' + Date.now(),
            name: track.name,
            artist: track.artists[0].name,
            user: 'You',
            avatar: '🎧',
            timestamp: new Date(),
            mood: mood,
            lyrics: lyrics
          };
          
          recentSongs.push(newSong);
          
          // Keep only last 50 songs
          if (recentSongs.length > 50) {
            recentSongs = recentSongs.slice(-50);
          }
          
          // Broadcast real song to all connected clients
          io.emit('newSong', newSong);
          console.log(`Real Spotify song: ${track.name} by ${track.artists[0].name}`);
        }
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
      }
    }
  }, 15000); // Every 15 seconds
};

// Start simulation
simulateRealTimeUpdates();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket server ready`);
}); 