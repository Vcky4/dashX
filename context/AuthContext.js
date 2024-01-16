import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import { io } from "socket.io-client";
import endpoints from "../assets/endpoints/endpoints";

export const AuthContext = createContext(null);


export const AuthContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [colorScheme, setColorScheme] = useState('dark')
    const [isOnboarded, setIsOnboarded] = useState(false)
    const appearance = useColorScheme()


    // //setup to socket
    const socket = io(endpoints.socketUrl, {
        // extraHeaders: {
        //     authorization: `Bearer ${token}`,
        // },
    });

    const login = (token, user) => {
        setIsLoading(true);
        setToken(token);
        setUser(user);
        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('user', JSON.stringify(user));
        setIsLoading(false);
    }

    const saveToken = (token) => {
        setIsLoading(true);
        setToken(token);
        AsyncStorage.setItem('token', token);
        setIsLoading(false);
    }
    const saveUser = (user) => {
        setIsLoading(true);
        setUser(user);
        AsyncStorage.setItem('user', JSON.stringify(user));
        setIsLoading(false);
    }

    const onboard = () => {
        setIsOnboarded(true)
        AsyncStorage.setItem('onboarded', 'true')
    }

    const logout = () => {
        setIsLoading(true);
        setToken(null);
        AsyncStorage.removeItem('token');
        setUser(null);
        AsyncStorage.removeItem('user');
        setIsLoading(false);
    }

    const getTheme = async () => {
        let theme = await AsyncStorage.getItem('theme');
        if (theme) {
            setColorScheme(theme)
        } else {
            setColorScheme(appearance)
            AsyncStorage.setItem('theme', appearance)
        }
    }

    const toggleTheme = async () => {
        setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
        AsyncStorage.setItem('theme', colorScheme === 'dark' ? 'light' : 'dark')
    }
    // useEffect(() => {
    //     setColorScheme(appearance)
    //     AsyncStorage.setItem('theme', appearance)
    // }, [appearance])

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let token = await AsyncStorage.getItem('token');
            let user = await AsyncStorage.getItem('user');
            let onboarded = await AsyncStorage.getItem('onboarded')
            setIsOnboarded(onboarded === 'true' ? true : false)
            setToken(token);
            setUser(JSON.parse(user ?? "{}"));
            setIsLoading(false);
        } catch (error) {
            console.log('isLoggedIn error: $(error)');
        }
    }
    useEffect(() => { setTimeout(() => setIsLoading(false), 2000) });
    useEffect(() => {
        getTheme()
        isLoggedIn();
    }, []);
    return (
        <AuthContext.Provider value={{ login, logout, isLoading, token, user, saveUser, saveToken, colorScheme, isOnboarded, onboard, toggleTheme, socket }}>
            {children}
        </AuthContext.Provider>
    );
}