import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [logged, setLogged] = useState(

        localStorage.getItem("logged") === "true"

    );

    function login() {

        localStorage.setItem("logged", "true");

        setLogged(true);

    }

    function logout() {

        localStorage.removeItem("logged");

        setLogged(false);

    }

    return (

        <AuthContext.Provider

            value={{

                logged,

                login,

                logout

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}