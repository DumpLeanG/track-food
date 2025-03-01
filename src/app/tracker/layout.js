"use client"

import "@/styles/globals.scss";
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import { useState } from "react";
import { dayContext, setDayContext } from "@/lib/dayContext";

export default function Layout({ children }) {
  const [day, setDay] = useState(new Date());
  return (
      <>
        <Header day={day} setDay={setDay}/>
        <main>
          <dayContext.Provider value={day}>
            <setDayContext.Provider value={setDay}>
              {children}
            </setDayContext.Provider>
          </dayContext.Provider>
        </main>
        <Footer />
      </>
  );
}
