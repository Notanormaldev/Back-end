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
            console.error("Logout API error:", error)
        } finally {
            setuser(null)
            if (typeof window !== "undefined") {
                localStorage.removeItem("token")
                localStorage.removeItem("user")
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