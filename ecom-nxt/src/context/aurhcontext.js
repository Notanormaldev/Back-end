"use client"
import { api } from "@/lib/api";
import { createContext, useContext, useEffect, useState } from "react";

let Auth = createContext()

let Authprovider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [loading, setLoading] = useState(true)

    let hydrateuser = async () => {
        try {
            let res = await api.get("/api/auth/me")
            setuser(res.data.user)
        } catch (error) {
            setuser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        hydrateuser()
    }, [])

    return (
        <Auth.Provider value={{ user, setuser, loading, hydrateuser }}>
            {children}
        </Auth.Provider>
    )
}

let useAuth = () => {
    return useContext(Auth)
}

export { useAuth, Authprovider }