import React, { useContext } from 'react'
import { apiContext } from '../../context/ApiContext'
import './Loader.css'

const Home = () => {
    const { LoginChecker, isLoggedIn } = useContext(apiContext);
    LoginChecker();
    console.log("User Logged In: ", isLoggedIn);
    return (
        <div className='h-screen'>
            <div className='flex justify-end'>
                <div className="relative w-36 h-36 rounded-full border border-gray-800 shadow-[25px_25px_75px_rgba(0,0,0,0.55)] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-5 rounded-full border border-dashed border-gray-700 shadow-inner shadow-black"></div>
                    <div className="absolute w-12 h-12 rounded-full border border-dashed border-gray-700 shadow-inner shadow-black"></div>
                    <h1 className='font-bold text-white'>DevConnect</h1>
                    <span className="absolute top-1/2 left-1/2 w-1/2 h-full border-t border-dashed border-white origin-top-left animate-[radar81_2s_linear_infinite]">
                        <div className="absolute top-0 left-0 w-full h-full bg-green-600 origin-top-left rotate-[-55deg] blur-xl drop-shadow-[20px_20px_20px_seagreen]"></div>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Home