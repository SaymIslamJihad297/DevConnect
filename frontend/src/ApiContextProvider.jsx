import { useState, useEffect } from "react";
import { apiContext } from "./context/ApiContext";
import axios from "axios";

const ApiContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const SignUpApi = "/signup"
    const isLoggedInApi = "/isUserLoggedIn";
    const LoginApi = "/login";
    const LogOutApi = "/logout";
    const LoginChecker = async () => {
        try {
            const response = await axios.get("http://localhost:8080/isAuthenticated", { withCredentials: true });
            console.log("API Response:", response);
            setIsLoggedIn(response.data);  // State update
        } catch (error) {
            console.log("Error checking login status:", error);
        }
    };

    useEffect(() => {
        console.log("isLoggedIn changed:", isLoggedIn);
    }, [isLoggedIn]);

    return (
        <apiContext.Provider value={{ SignUpApi, isLoggedIn, setIsLoggedIn, isLoggedInApi, LoginChecker, LoginApi, LogOutApi }}>
            {children}
        </apiContext.Provider>
    );
};

export default ApiContextProvider;
