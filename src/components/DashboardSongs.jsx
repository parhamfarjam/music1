import React from 'react'
import { NavLink } from 'react-router-dom'
import {IoMdAdd} from 'react-icons/io'
import { useState } from 'react'
import {AiOutlineClear} from 'react-icons/ai'
import { useStateValue } from '../context/StateProvider'
import { useEffect } from 'react'
import { getAllSongs } from '../api'
import {actionType} from '../context/reducer'
import SongCard from './SongCard'

export default function DashboardSongs() {
  const [songFilter,setSongFilter] = useState('')
  const [isFoucs,setIsFocus] = useState(false)

  const [{allSongs}, dispatch] = useStateValue()

  useEffect(()=>{
    if(!allSongs){
      getAllSongs().then((data)=>{
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song
        })
      })
    }
  },[])

  return (
    <div className='w-full p-4 flex flex-col items-center justify-center'>
      <div className='w-full flex justify-center items-center gap-20'>
        <NavLink to={"/dashboard/newSong"} className="flex items-center justify-center px-3 py-3 border cursor-pointer rounded-md border-gray-300 hover:border-gray-500 hover:shadow-md">
          <IoMdAdd/>
        </NavLink>

        <input 
        onBlur={()=> setIsFocus(false)}
        onFocus={()=>setIsFocus(true) } 
        type="text"
        placeholder='Saerch Here...'
        onChange={(e)=> setSongFilter(e.target.value)}
        className={`w-52 px-4 py-2 border ${isFoucs ? "border-gray-500 shadow-md" : "border-gray-300"} outline-none rounded-md bg-transparent`} 
         />

        <i>
          <AiOutlineClear className='text-2xl text-textColor cursor-pointer'/>
        </i>
      </div>
      {/*main container */}
      <div className='relative w-full my-4 p-4 border border-gray-300 rounded-md'>
        {/*the count */}
        <div classname='absolute left-4 top-4'>
          <p className='text-xl font-bold'>
            <span className='text-sm font-semibold text-textColorr'>Count:{' '} </span>
            {allSongs?.length}
          </p>
        </div>
        <SongContainer data={allSongs}/>
      </div>
    </div>
  )
}

export const SongContainer = ({data}) =>{
  return (
    <div className='w-full flex flex-wrap items-center justify-evenly gap-3'>
      {data && data.map((song , i)=>(
        <SongCard key={song._id} data={song} index={i} type="song"/>
    ))}
    </div>
  )
}

