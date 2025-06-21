import './globals.css'

export const metadata = {
  title: 'Live Music Mood Board',
  description: 'Real-time music mood tracking and visualization',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-2">
                <div className="text-2xl">🎵</div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Live Music Mood Board
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="animate-pulse-slow">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Live</span>
              </div>
            </div>
          </div>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
} 