import {useState, createContext, useEffect } from "react"
import axios from "axios"

export const Context = createContext()

export const ContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null))

    const login = async (inputs) => {
        const resp = await axios.post("/auth/login", inputs)
        setCurrentUser(resp.data)
    };

    const logout = async () => {
        await axios.post("/auth/logout")
        setCurrentUser(null)
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser]); // effect activates when current user changes

    return (
        <Context.Provider value = {{currentUser, login, logout}}>
            {children}
        </Context.Provider>
    );
};