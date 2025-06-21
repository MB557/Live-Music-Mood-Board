'use client';

import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function MoodChart({ data = {} }) {
  const moodColors = {
    happy: '#10B981',
    sad: '#3B82F6',
    angry: '#EF4444',
    energetic: '#F59E0B',
    neutral: '#6B7280',
  };

  const moodIcons = {
    happy: '😄',
    sad: '😢',
    angry: '😠',
    energetic: '⚡',
    neutral: '😐',
  };

  // Prepare data for the chart
  const chartData = {
    labels: Object.keys(data).map(mood => `${moodIcons[mood] || '🎵'} ${mood.charAt(0).toUpperCase() + mood.slice(1)}`),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: Object.keys(data).map(mood => moodColors[mood] || '#6B7280'),
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const mood = Object.keys(data)[context.dataIndex];
            const count = context.parsed;
            const total = Object.values(data).reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
            return `${count} song${count !== 1 ? 's' : ''} (${percentage}%)`;
          },
        },
      },
    },
  };

  if (Object.keys(data).length === 0 || Object.values(data).every(val => val === 0)) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-gray-500 dark:text-gray-400">
        <div className="text-4xl mb-2">📊</div>
        <p className="text-sm text-center">
          No mood data available yet.<br />
          Start listening to see the mood distribution!
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-48">
      <Pie data={chartData} options={options} />
    </div>
  );
} 