"use client";

import Layout from "../layout/Layout";
import styles from "./Weight.module.scss";
import Form from "./form/Form";
import Chart from "./chart/Chart";
import Changes from "./changes/Changes";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/lib/UserContext";
import { supabase } from "@/lib/supabaseClient";
import { WeightsContext } from "@/lib/WeightsContext";

export default function Weight() {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [weights, setWeights] = useState([]);
    
    async function fetchWeights(user) {
        const { data, error } = await supabase
            .from('current_weight')
            .select('*')
            .eq('user_id', user.id);
    
        if (error) {
            console.error('Ошибка при загрузке данных:', error);
        }

        return data;
    }
    
    useEffect(() => {
        if(user) {
            async function fetchData() {
                setIsLoading(true);
                const result = await fetchWeights(user);
                const initialDate = result.filter(weights => weights.is_initial);
                const notInitialDates = result.filter(weights => !weights.is_initial);
                setWeights([...initialDate, ...notInitialDates]);
                setIsLoading(false);
            }
            
            fetchData();
        }
    }, [user]);

    return (
        <section className={styles.weight}>
            <WeightsContext.Provider value={{ weights, setWeights, fetchWeights, isLoading }}>
                <Layout>
                    <Form/>
                        <>
                            <Chart/>
                            <Changes/>
                        </>
                </Layout>
            </WeightsContext.Provider>
        </section>
    );
}