"use client"

import "@/styles/globals.scss";
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DayContext } from "@/lib/DayContext";
import { UserContext } from "@/lib/UserContext";
import { supabase } from "@/lib/supabaseClient";

export default function Layout({ children }) {
  const [isEdited, setIsEdited] = useState(false);
  const [day, setDay] = useState(new Date());
  const [user, setUser] = useState(null);
  const router = useRouter();

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
        <Header/>
        <main>
          {children}
        </main>
        <Footer />
      </DayContext.Provider>
    </UserContext.Provider>
  );
}
