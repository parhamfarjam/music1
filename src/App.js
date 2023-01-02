import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Dashboard, Home, Login, MusicPlayer } from './components'
import { app } from './config/firebase.config'
import { AnimatePresence, motion } from 'framer-motion'
import { validateUser } from './api'
import { useStateValue } from './context/StateProvider'
import { actionType } from './context/reducer'
import Music from './components/music/Music'
import Contact from './components/contact/Contact'
import Premium from './components/premium/Premium'


export default function App() {
  const firebaseAuth = getAuth(app)
  const navigate = useNavigate()
  const [{user , isSongPlaying} , dispatch] = useStateValue()


  const [auth ,setAuth] = useState(false || window.localStorage.getItem("auth") === "true")
  
  useEffect(()=>{
    firebaseAuth.onAuthStateChanged((userCred)=>{
      if(userCred){
        userCred.getIdToken().then((token)=>{
          //console.log(token)
          validateUser(token).then((data)=>{
              dispatch({
                type: actionType.SET_USER,
                user: data
              })
          })
        })
      }else{
        setAuth(false)
        window.localStorage.setItem("auth" , 'false')
        dispatch({
          type: actionType.SET_USER,
          user: null
        })
        navigate("/login")
      }
    })
  },[])

  return (
    <AnimatePresence >
      <div className='h-auto min-w-[600px] bg-primary flex justify-center items-center'>
      <Routes>
        <Route path='/login' element={<Login setAuth={setAuth}/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/music' element={<Music/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/premium' element={<Premium/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/dashboard/*' element={<Dashboard/>}/>
      </Routes>
      {isSongPlaying && (
        <motion.div
        initial={{opacity : 0, y : 50}}
        animate={{opacity : 1, y : 0}}
        className="fixed min-w-[700px] h-26 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center"
        >
          <MusicPlayer/>
        </motion.div>
      )}
    </div>
    </AnimatePresence>
  )
}
