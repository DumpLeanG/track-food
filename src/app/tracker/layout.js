import { Roboto } from 'next/font/google';
import "@/styles/globals.scss";
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';

export default function Layout({ children }) {
  return (
      <>
        <Header />
        <main>{children}</main>
        <Footer />
      </>
  );
}
