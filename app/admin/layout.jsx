import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800']
})

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100`}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}

