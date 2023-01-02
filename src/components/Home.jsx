import React from 'react'
import { Header } from './index'

import Slider from './Slider/Slider';




export default function Home() {
  return (
    <div className='w-full h-auto flex flex-col justify-center items-center bg-primary'>
      <Header/>
      <p className='text-lg'>New Song</p>
      <div className='w-full -mt-9'>
        <Slider/>
      </div>
      <img className='w-full h-full object-cover' src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fG11c2ljfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
    </div>
  )
}
