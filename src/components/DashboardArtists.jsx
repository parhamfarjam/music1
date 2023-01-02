import React, { useEffect } from 'react'
import { getAllArtists } from '../api'
import { actionType } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'
import SongCard from './SongCard'

export default function DashboardArtists() {
  const [{allArtists} ,dispatch] = useStateValue()

  useEffect(()=>{
    if(!allArtists){
      getAllArtists().then((data)=>{
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artist
        })
      })
    }
  },[])
  return (
    <div className='w-full p-4 flex flex-col items-center justify-center'>
       <div className='relative w-full my-4 p-4 border border-gray-300 rounded-md'>
        
        <ArtistContainer data={allArtists}/>
      </div>
    </div>
  )
}

export const ArtistContainer = ({data}) =>{
  
  return (
    <div className='w-full flex flex-wrap items-center justify-evenly gap-3'>
      {data && data.map((song , i)=>(
        <SongCard key={song._id} data={song} index={i} type="artist"/>
    ))}
    </div>
  )
}
