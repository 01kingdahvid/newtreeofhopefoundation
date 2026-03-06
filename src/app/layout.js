import Header from "@/components/layout/Header/Header";
import "./globals.css";
import Footer from "@/components/layout/Footer/Footer";


export const metadata = {
  title: "New Tree of Hope Foundation - UTHF",
  description: "Relief and Development NGO",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  );
}