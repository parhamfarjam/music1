import React, { useEffect } from 'react'
import { getAllAlbums } from '../api'
import { actionType } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'
import SongCard from './SongCard'

export default function DashboardAlbums() {
  const [{allAlbums} ,dispatch] = useStateValue()

  useEffect(()=>{
    if(!allAlbums){
      getAllAlbums().then((data)=>{
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album
        })
      })
    }
  },[])
  return (
    <div className='w-full p-4 flex flex-col items-center justify-center'>
    <div className='relative w-full my-4 p-4 border border-gray-300 rounded-md'>
     
     <AlbumContainer data={allAlbums}/>
   </div>
 </div>
  )
}

export const AlbumContainer = ({data}) =>{
  
  return (
    <div className='w-full flex flex-wrap items-center justify-evenly gap-3'>
      {data && data.map((song , i)=>(
        <SongCard key={song._id} data={song} index={i} type="album"/>
    ))}
    </div>
  )
}
