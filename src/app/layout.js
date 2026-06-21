import './globals.css'
import { AppProvider } from '@/context/AppContext'
import { ThemeProvider } from '@/context/ThemeContext'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Harouna Coulibaly | Cybersecurity Portfolio',
  description: 'Portfolio de Harouna Coulibaly, Mastere Cybersecurite, Red Team & Offensive Security.',
  icons: {
    icon: '/assets/favicon-96x96.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      data-theme="ink"
      data-name-style="outline-mix"
      data-section-mark="bare"
      data-aurora="on"
      data-grid-bg="on"
      data-dropcap="off"
      data-show-proj-num="off"
      data-footer-mark="off"
      data-scroll-progress="on"
      data-display-font="playfair"
      data-body-font="geist"
      data-density="normal"
      data-hero-align="left"
      data-proj-layout="uniform"
      data-card-style="default"
      data-corners="sharp"
      data-selection="accent"
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="dark" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('hf-theme');if(t==='paper')document.documentElement.setAttribute('data-theme','paper');}catch(e){}window.addEventListener('pageshow',function(e){if(e.persisted)window.location.reload();});var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Geist:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap';document.head.appendChild(l);})();` }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/HC_logo_100.webp" as="image" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Geist:wght@300;400;500&display=swap" />
      </head>
      <body suppressHydrationWarning>
        <AppProvider>
          <ThemeProvider>
            <Navbar />
            {children}
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  )
}
