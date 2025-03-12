import React, { useContext } from 'react'
import Logo from "../../assets/Logo.png";
import { NavLink } from "react-router-dom";
import { apiContext } from '../../context/ApiContext'
import api from '../../api/AxiosInstance'

const NavBar = () => {
    const { isLoggedIn } = useContext(apiContext);

    const logOutUser = async () => {
        try {
            const response = await api.get('/logout');
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='p-2 flex justify-between bg-white sticky top-0 z-999'>
            <div className='flex items-center'>
                <img className='h-10' src={Logo} alt="Logo" />

                <input className='p-2 rounded-l-full outline-none bg-[#F0F2F5]' type="text" placeholder='Search' />
                <button className='bg-[#f0b27a] p-2 px-5 rounded-r-full'><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>

            {/* <div className='flex gap-20 text-2xl'>
                <NavLink to="/"><i className="fa-solid fa-house"></i></NavLink>
                <NavLink to="/messenger"><i className="fa-solid fa-envelope-open"></i></NavLink>
                <NavLink to="/profile"><i className="fa-solid fa-user"></i></NavLink>
            </div> */}


            <div className='flex gap-20 text-2xl'>
                <NavLink to="/notifications"><i className="fa-solid fa-bell text-2xl"></i></NavLink>
                {!isLoggedIn && <NavLink to="/login"><i className="fa-solid fa-user-plus"></i></NavLink>}
                {isLoggedIn && <button onClick={() => logOutUser()}><i className="fa-solid fa-right-from-bracket"></i></button>}
            </div>

        </div>
    )
}

export default NavBar