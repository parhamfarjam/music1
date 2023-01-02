import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../config/firebase.config'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider'
import { validateUser } from '../api'
import { actionType } from '../context/reducer'

export default function Login({setAuth}) {
    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider()
    const [{user}, dispatch] = useStateValue()

    const navigate = useNavigate()

    const loginGoogel = async()=>{
        await signInWithPopup( firebaseAuth ,provider).then((userCerd)=>{
            if(userCerd){
                setAuth(true)
                window.localStorage.setItem("auth" ,"true")

                firebaseAuth.onAuthStateChanged((userCred)=>{
                   if(userCerd){
                    userCred.getIdToken().then((token)=>{
                        //console.log(token)
                        validateUser(token).then((data)=>{
                            dispatch({
                                type: actionType.SET_USER,
                                user: data,
                            })
                        })
                      })
                    navigate("/", {replace : true})
                   }
                   else{
                    setAuth(false)
                    dispatch({
                        type: actionType.SET_USER,
                        user: null
                    })
                    navigate("/login")
                   }
                  })
            }
        })
    }
    useEffect(()=>{
        if(window.localStorage.getItem("auth") === "true"){
            navigate("/" ,{replace : true})
        }
    })
  return (
    <div className='relative w-screen h-screen'>
        <video  type='video.mp4' autoPlay muted loop className='w-full h-full object-cover'/>
        <div className='absolute inset-0 flex items-center justify-center p-4'>
          <div className='w-full md:w-375 p-4 bg-lighttextGray flex items-center justify-center flex-col rounded-md'>
              <div onClick={loginGoogel} className='flex justify-center items-center py-2 px-4 gap-2 bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all rounded-md'>
                  <FcGoogle/>
                  sing in with googel
              </div>
          </div>
        </div>
      </div>
  )
}
