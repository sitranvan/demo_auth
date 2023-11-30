import { createContext, useState } from 'react'
import { getAccessToken, getProfile } from '../utils/auth'

const initialAppContext = {
    isAuthenticated: Boolean(getAccessToken()),
    setIsAuthenticated: () => null,
    profile: getProfile(),
    setProfile: () => null
}

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(initialAppContext.isAuthenticated)
    const [profile, setProfile] = useState(initialAppContext.profile)
    return (
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile }}>
            {children}
        </AppContext.Provider>
    )
}
