'use client';

export default function StatsCard({ title, value, icon, color = 'text-gray-600' }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
            {title}
          </p>
          <p className={`text-2xl font-bold ${color} dark:text-white`}>
            {value}
          </p>
        </div>
        <div className="text-2xl">
          {icon}
        </div>
      </div>
    </div>
  );
} 