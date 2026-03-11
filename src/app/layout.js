import Header from "@/components/layout/Header/Header";
import "./globals.css";
import Footer from "@/components/layout/Footer/Footer";
import { Analytics } from "@vercel/analytics/next"
import GoogleTranslateWidget from "@/components/shared/GoogleTranslate/GoogleTranslate";


export const metadata = {
  title: "New Tree of Hope Foundation - NTHF",
  description: "Relief and Development NGO",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer/>
          <Analytics />

          <GoogleTranslateWidget/>
      </body>
    </html>
  );
}