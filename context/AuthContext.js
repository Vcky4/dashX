import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext(null);


export const AuthContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);


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

    const logout = () => {
        setIsLoading(true);
        setToken(null);
        AsyncStorage.removeItem('token');
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let token = await AsyncStorage.getItem('token');
            let user = await AsyncStorage.getItem('user');
            setToken(token);
            setUser(JSON.parse(user ?? "{}"));
            setIsLoading(false);
        } catch (error) {
            console.log('isLoggedIn error: $(error)');
        }
    }
    useEffect(() => { setTimeout(() => setIsLoading(false), 2000) });
    useEffect(() => {
        isLoggedIn();
    }, []);
    return (
        <AuthContext.Provider value={{ login, logout, isLoading, token, user, saveUser, saveToken }}>
            {children}
        </AuthContext.Provider>
    );
}