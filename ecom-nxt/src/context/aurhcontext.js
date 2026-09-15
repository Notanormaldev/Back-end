"use client"
import { api } from "@/lib/api";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

let Auth = createContext()

let Authprovider = ({ children }) => {
    const router = useRouter()
    const [user, setuser] = useState(null)
    const [loading, setLoading] = useState(true)

    let hydrateuser = async () => {
        // If user explicitly logged out, do not restore session until they log in again
        if (typeof window !== "undefined" && localStorage.getItem("isLoggedOut") === "true") {
            setuser(null)
            setLoading(false)
            return
        }

        try {
            let res = await api.get("/api/auth/me")
            setuser(res.data?.user || res.data)
        } catch (error) {
            setuser(null)
        } finally {
            setLoading(false)
        }
    }

    let logout = async () => {
        try {
            await api.post("/api/auth/logout")
        } catch (error) {
            // Backend might not have a logout endpoint, handled gracefully
        } finally {
            setuser(null)
            if (typeof window !== "undefined") {
                localStorage.setItem("isLoggedOut", "true")
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            }
            router.push("/login")
        }
    }

    useEffect(() => {
        hydrateuser()
    }, [])

    return (
        <Auth.Provider value={{ user, setuser, loading, hydrateuser, logout }}>
            {children}
        </Auth.Provider>
    )
}

let useAuth = () => {
    return useContext(Auth)
}

export { useAuth, Authprovider }