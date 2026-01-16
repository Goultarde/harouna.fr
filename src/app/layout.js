import './globals.css'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import { AppProvider } from '@/context/AppContext'

export const metadata = {
  title: 'Harouna Coulibaly | Cybersecurity Student',
  description: 'Portfolio of Harouna Coulibaly, Cybersecurity Student & Aspiring Pentester.',
  icons: {
    icon: '/assets/HC_logo_icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppProvider>
          <Navbar />
          {children}
          <Contact />
        </AppProvider>
      </body>
    </html>
  )
}
