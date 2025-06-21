'use client';

import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import MoodChart from './components/MoodChart';
import SongFeed from './components/SongFeed';
import StatsCard from './components/StatsCard';

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [moodStats, setMoodStats] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const socketUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_API_URL || 'https://live-music-mood-board-backend.onrender.com'
      : 'http://localhost:5000';
    const socketInstance = io(socketUrl);
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server');
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from server');
    });

    socketInstance.on('recentSongs', (recentSongs) => {
      setSongs(recentSongs);
    });

    socketInstance.on('newSong', (newSong) => {
      setSongs(prev => [...prev, newSong].slice(-20)); // Keep last 20 songs
    });

    // Fetch initial data
    fetchMoodStats();

    // Set up interval to refresh mood stats
    const statsInterval = setInterval(fetchMoodStats, 30000); // Every 30 seconds

    return () => {
      socketInstance.disconnect();
      clearInterval(statsInterval);
    };
  }, []);

  const fetchMoodStats = async () => {
    try {
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? process.env.NEXT_PUBLIC_API_URL || 'https://live-music-mood-board-backend.onrender.com'
        : 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/mood-stats`);
      const stats = await response.json();
      setMoodStats(stats);
    } catch (error) {
      console.error('Failed to fetch mood stats:', error);
    }
  };

  const getMoodIcon = (mood) => {
    const icons = {
      happy: '😄',
      sad: '😢',
      angry: '😠',
      energetic: '⚡',
      neutral: '😐'
    };
    return icons[mood] || '🎵';
  };

  const getMoodColor = (mood) => {
    const colors = {
      happy: 'text-happy',
      sad: 'text-sad',
      angry: 'text-angry',
      energetic: 'text-energetic',
      neutral: 'text-neutral'
    };
    return colors[mood] || 'text-gray-500';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Connection Status */}
      <div className="mb-6">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          isConnected 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        }`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${
            isConnected ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Feed */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <span className="text-2xl mr-2">🎶</span>
                Live Music Feed
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Real-time music activity and mood analysis
              </p>
            </div>
            <SongFeed songs={songs} getMoodIcon={getMoodIcon} getMoodColor={getMoodColor} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <StatsCard
              title="Active Users"
              value="5"
              icon="👥"
              color="text-blue-600"
            />
            <StatsCard
              title="Songs Today"
              value={songs.length.toString()}
              icon="🎵"
              color="text-purple-600"
            />
          </div>

          {/* Mood Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Mood Distribution (Last 10 min)
            </h3>
            <MoodChart data={moodStats} />
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Top Moods Right Now
            </h3>
            <div className="space-y-3">
              {Object.entries(moodStats)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3)
                .map(([mood, count]) => (
                  <div key={mood} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getMoodIcon(mood)}</span>
                      <span className={`font-medium capitalize ${getMoodColor(mood)}`}>
                        {mood}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {count} song{count !== 1 ? 's' : ''}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 