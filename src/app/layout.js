import Header from '@/components/layout/Header/Header'
import './globals.css'
import Footer from '@/components/layout/Footer/Footer'
import { Analytics } from '@vercel/analytics/next'
import GoogleTranslateWidget from '@/components/shared/GoogleTranslate/GoogleTranslate'
import LoadingWrapper from './loading-wrapper'
import { Toaster } from 'react-hot-toast'
import EmailJSInitializer from '@/lib/utils/EmailProvider'

export const metadata = {
  title: 'New Tree of Hope Foundation (NTHF) | A Home for Children in Need',
  description:
    'New Tree of Hope Foundation (NTHF) is a child-centered nonprofit providing a safe home, education, and healthcare for children in our care.',
  openGraph: {
    title: 'New Tree of Hope Foundation (NTHF)',
    description:
      'Providing a safe home, education, and care for children at NTHF.',
    images: ['/images/logos/nthf-logo1.png']
  }
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body>
        <EmailJSInitializer /> 
        <LoadingWrapper>
          <Header />
          {children}
          <Footer />
          <Analytics />
          <Toaster position='top-right' />
        </LoadingWrapper>
        <GoogleTranslateWidget />
      </body>
    </html>
  )
}
