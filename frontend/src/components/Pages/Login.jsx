import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { apiContext } from '../../context/ApiContext';
import api from '../../api/AxiosInstance.jsx';

const Login = () => {
    const { LoginApi, setIsLoggedIn, isLoggedIn, LoginChecker } = useContext(apiContext);
    LoginChecker();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');  // Redirect to Home page
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(LoginApi, { username, password });
            console.log('Response:', response.data);
            setIsLoggedIn(true);
            console.log("Set Is Logged In", isLoggedIn);
        } catch (error) {
            console.error('Error logging in:', error);
        }
        setUsername('');
        setPassword('');
    };
    const handleGoogleLogin = () => {
        window.open("http://localhost:8080/auth/google", "_self");
    };

    const handleGitHubLogin = () => {
        window.open("http://localhost:8080/auth/github", "_self");
    };

    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-96 px-8 pb-2 bg-[#171717] rounded-2xl transition-transform duration-300 ease-in-out hover:scale-105 hover:border border-black">
                <p id="heading" className="text-center my-8 text-white text-lg">Login</p>

                <div className="flex items-center justify-center gap-2.5 rounded-2xl p-3 bg-gray-900 shadow-inner shadow-black">
                    <svg className="h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643z"></path>
                    </svg>
                    <input type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} className="bg-transparent border-none outline-none w-full text-gray-300" />
                </div>

                <div className="flex items-center justify-center gap-2.5 rounded-2xl p-3 bg-gray-900 shadow-inner shadow-black">
                    <svg className="h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                    </svg>
                    <input type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} className="bg-transparent border-none outline-none w-full text-gray-300" />
                </div>

                <div className="flex justify-center flex-row mt-10">
                    <button type='submit' className="px-5 py-2 rounded-md mr-2 border-none outline-none transition-all duration-300 bg-gray-800 text-white hover:bg-black">Login</button>
                    <Link to="/signup">
                        <button className="px-7 py-2 rounded-md border-none outline-none transition-all duration-300 bg-gray-800 text-white hover:bg-black">Sign Up</button>
                    </Link>
                </div>

                <button type='button' onClick={handleGoogleLogin} className="px-5 py-2 rounded-md border-none outline-none transition-all duration-300 bg-gray-800 text-white hover:bg-red-600 flex items-center justify-center gap-2">
                    <i className="fa-brands fa-google"></i>
                    Continue with Google
                </button>

                <button type='button' onClick={handleGitHubLogin} className="mb-12 px-5 py-2 rounded-md border-none outline-none transition-all duration-300 bg-gray-800 text-white hover:bg-gray-700 flex items-center justify-center gap-2">
                    <i className="fa-brands fa-github"></i>
                    Continue with GitHub
                </button>
            </form>
        </div>
    );
};

export default Login;
