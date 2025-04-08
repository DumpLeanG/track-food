"use client"

import "@/styles/globals.scss";
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DayContext } from "@/lib/DayContext";
import { UserContext } from "@/lib/UserContext";
import { supabase } from "@/lib/supabaseClient";
import { IsDeviceContext } from "@/lib/IsDeviceContext";

export default function Layout({ children }) {
  const [isEdited, setIsEdited] = useState(false);
  const [day, setDay] = useState(new Date());
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [isLaptop, setIsLaptop] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  useEffect(() => {
    const checkIfDevice = () => {
      setIsLaptop(window.innerWidth <= 1024);
      setIsSmallMobile(window.innerWidth <= 360);
    }
    
    checkIfDevice();

    window.addEventListener('resize', checkIfDevice);
    return () => window.removeEventListener('resize', checkIfDevice);
  }, []);
  
  useEffect(() => {
    if(!user || isEdited) {
      const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        if (!user) {
          router.push("/");
        }
      }
      checkUser();
      setIsEdited(false);
    }
  }, [router, user, isEdited]);

  return (
    <UserContext.Provider value={{user, setIsEdited}}>
      <DayContext.Provider value={{day, setDay}}>
        <IsDeviceContext.Provider value={{isLaptop, isSmallMobile}}>
          <Header/>
          <main>
            {children}
          </main>
          <Footer />
        </IsDeviceContext.Provider>
      </DayContext.Provider>
    </UserContext.Provider>
  );
}
