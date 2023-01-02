import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {Logo} from '../assets/img/index'
import {isActiveStyles , isNotActiveStyles} from '../utils/styles'
import {FaCrown} from 'react-icons/fa'
import { useStateValue } from '../context/StateProvider'
import { motion } from 'framer-motion'
import {app} from '../config/firebase.config'
import { getAuth } from 'firebase/auth'



export default function Header() {
    const [{user}, dispatch] = useStateValue()
    const [menu,setMenu] = useState(false)

    const navigate = useNavigate()

   const logOut = ()=>{
     const firebaseAuth =getAuth(app)
     firebaseAuth.signOut().then(()=>{
        window.localStorage.setItem("auth" , "false")
     }).catch((e)=> console.log(e))
     navigate("/login" , {replace : true})
   }

  return (
    <header className='flex items-center w-full p-4 md:py-2 md:px-4'>
    <NavLink to='/'>
     <img src={Logo} alt='Logo' className='w-12'/>
    </NavLink>
    <ul className='flex items-center justify-center ml-7'>
        <li className='mx-5 text-lg'><NavLink to='/home' className={({isActive})=> isActive ? isActiveStyles : isNotActiveStyles}>Home</NavLink> </li>
        <li className='mx-5 text-lg'><NavLink to='/music' className={({isActive})=> isActive ? isActiveStyles : isNotActiveStyles}>Music</NavLink> </li>
        <li className='mx-5 text-lg'><NavLink to='/premium' className={({isActive})=> isActive ? isActiveStyles : isNotActiveStyles}>premium</NavLink> </li>
        <li className='mx-5 text-lg'><NavLink to='/contact' className={({isActive})=> isActive ? isActiveStyles : isNotActiveStyles}>Contact Us</NavLink> </li>
    </ul>
    <div
    onMouseEnter={()=> setMenu(true)}
    onMouseLeave={()=>setMenu(false)}
    className='flex items-center ml-auto cursor-pointer gap-2 relative'>
        <img src={user?.user.ImageURL} className='w-12 min-w-[44px] object-cover rounded-full shadow-lg' referrerPolicy='no-referrer'/>
        <div className='flex flex-col'>
            <p>{user?.user.name}</p>
            <p>premium member.<FaCrown className='text-sm -ml-1 text-yellow-500'/> </p>
        </div>
        {menu && (
          <motion.div 
          initial={{opacity : 0 , y :50}}
          animate={{opacity : 1 , y :0}}
          exit={{opacity : 0 , y :50}}
          className='absolute z-10 top-16 right-0 w-275 p-3 gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col'>
              <NavLink to='/userProfile'>
                <p className='text-base text-textColor hover:font-semibold duration-100 transition-all ease-in-out'>Profile</p>
              </NavLink>
              <p className='text-base text-textColor hover:font-semibold duration-100 transition-all ease-in-out'>My favorites</p>
                <hr/>
                {user?.user?.role === 'admin' && (
                  <>
                  <NavLink to={'/dashboard/home'}>
                 <p className='text-base text-textColor hover:font-semibold duration-100 transition-all ease-in-out'>Dashboard</p>
                </NavLink>
                <hr/>
                  </>
                )}
                <p onClick={logOut} className='text-base text-textColor hover:font-semibold duration-100 transition-all ease-in-out'>Sing Out</p>
          </motion.div>
        )}
    </div>
</header>
  )
}
