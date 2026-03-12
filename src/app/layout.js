import Header from '@/components/layout/Header/Header'
import './globals.css'
import Footer from '@/components/layout/Footer/Footer'
import { Analytics } from '@vercel/analytics/next'
import GoogleTranslateWidget from '@/components/shared/GoogleTranslate/GoogleTranslate'
import LoadingWrapper from './loading-wrapper'

export const metadata = {
  title: 'New Tree of Hope Foundation - NTHF',
  description: 'Relief and Development NGO'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body>
        <LoadingWrapper>
          <Header />
          {children}
          <Footer />
          <Analytics />
        </LoadingWrapper>
        <GoogleTranslateWidget />
      </body>
    </html>
  )
}
