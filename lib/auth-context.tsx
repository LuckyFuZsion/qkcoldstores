"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth"
import { auth } from "./firebase"
import { isAdminEmail } from "./site-config"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      if (nextUser && !isAdminEmail(nextUser.email)) {
        await signOut(auth)
        setUser(null)
        setLoading(false)
        return
      }
      setUser(nextUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const login = async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    if (!isAdminEmail(credential.user.email)) {
      await signOut(auth)
      throw new Error("Unauthorized")
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
