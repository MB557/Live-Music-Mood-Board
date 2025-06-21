'use client';

import { useEffect, useRef } from 'react';

export default function SongFeed({ songs, getMoodIcon, getMoodColor }) {
  const feedRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom when new songs are added
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [songs]);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  };

  const getMoodClass = (mood) => {
    const classes = {
      happy: 'mood-happy',
      sad: 'mood-sad',
      angry: 'mood-angry',
      energetic: 'mood-energetic',
      neutral: 'mood-neutral'
    };
    return classes[mood] || 'mood-neutral';
  };

  if (songs.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎵</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No songs yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Waiting for live music activity...
          </p>
          <div className="mt-4">
            <div className="animate-pulse flex justify-center">
              <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={feedRef}
      className="max-h-96 overflow-y-auto p-6 space-y-4"
    >
      {songs.map((song, index) => (
        <div
          key={`${song.id}-${index}`}
          className={`mood-card ${getMoodClass(song.mood)} animate-in slide-in-from-bottom duration-300`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-start space-x-3">
            {/* User Avatar */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-medium">
                {song.avatar || song.user?.charAt(0) || '🎵'}
              </div>
            </div>
            
            {/* Song Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {song.user || 'Anonymous'}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTimeAgo(song.timestamp)}
                </span>
              </div>
              
              <h4 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                {song.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                by {song.artist}
              </p>
              
              {/* Mood Badge */}
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-lg">{getMoodIcon(song.mood)}</span>
                <span className={`text-sm font-medium capitalize ${getMoodColor(song.mood)}`}>
                  {song.mood}
                </span>
              </div>
            </div>
            
            {/* Pulse Animation */}
            <div className="flex-shrink-0">
              <div className={`w-3 h-3 rounded-full animate-pulse ${
                getMoodColor(song.mood).replace('text-', 'bg-')
              }`}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 