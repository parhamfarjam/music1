import { deleteObject, ref } from 'firebase/storage'
import { motion } from 'framer-motion'
import React from 'react'
import { useState } from 'react'
import { IoMdTrash } from 'react-icons/io'
import { deleteAlbumById, deleteSArtistById, deleteSongById, getAllAlbums, getAllArtists, getAllSongs } from '../api'
import { storage } from '../config/firebase.config'
import { actionType } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'


export default function SongCard({data ,index , type}) {
  const [{alertType ,allArtists ,allSongs ,allAlbums,isSongPlaying,songIndex} , dispatch] = useStateValue()

  const [isDelete ,setIsDelete] = useState(false)

  const deleteData = (data)=>{
    if(type === "song"){
      const deleteRef = ref(storage , data.imageURL)

      deleteObject(deleteRef).then(() =>{})

      deleteSongById(data._id).then((res)=>{
        if(res.data){
          dispatch({
            type: actionType.SET_ALERET_TYPE,
            alertType: "success"
          })
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERET_TYPE,
              alertType: null
            })
          }, 3000);
          getAllSongs().then((data)=>{
            dispatch({
              type: actionType.SET_ALL_SONGS,
              allSongs: data.song
            })
          })
        }else{
          dispatch({
            type: actionType.SET_ALERET_TYPE,
            alertType: "danger"
          })
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERET_TYPE,
              alertType: null
            })
          }, 3000);
        }
      })
    }
    const deleteRef = ref(storage , data.imageURL)

      deleteObject(deleteRef).then(() =>{})
    //album
    if(type === "album"){
      const deleteRef = ref(storage , data.imageURL)

      deleteObject(deleteRef).then(() =>{})


      deleteAlbumById(data._id).then((res)=>{
        if(res.data){
          dispatch({
            type: actionType.SET_ALERET_TYPE,
            alertType: "success"
          })
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERET_TYPE,
              alertType: null
            })
          }, 3000);
          getAllAlbums().then((data)=>{
            dispatch({
                type: actionType.SET_ALL_ALBUMS,
                allAlbums: data.album
            })
        })
        }else{
          dispatch({
            type: actionType.SET_ALERET_TYPE,
            alertType: "danger"
          })
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERET_TYPE,
              alertType: null
            })
          }, 3000);
        }
      })
    }
    //Atrist
    if(type === "artist"){
      const deleteRef = ref(storage , data.imageURL)

      deleteObject(deleteRef).then(() =>{})


      deleteSArtistById(data._id).then((res)=>{
        if(res.data){
          dispatch({
            type: actionType.SET_ALERET_TYPE,
            alertType: "success"
          })
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERET_TYPE,
              alertType: null
            })
          }, 3000);
          getAllArtists().then((data)=>{
            dispatch({
                type: actionType.SET_ALL_ARTISTS,
                allArtists: data.artist
            })
        })
        }else{
          dispatch({
            type: actionType.SET_ALERET_TYPE,
            alertType: "danger"
          })
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERET_TYPE,
              alertType: null
            })
          }, 3000);
        }
      })
    }
  }

  const addToContext = ()=>{
    if(!isSongPlaying){
      dispatch({
        type: actionType.SET_ISSONG_PLAYING,
        isSongPlaying: true
      })
    }
    if(!songIndex !== index){
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: index
      })
    }
  }

  return (
    <motion.div
    onClick={type === "song" && addToContext} 
    className='relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-md flex flex-col items-center'>
     <div className='w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden'>
        <motion.img
        whileHover={{ scale : 1.05}} 
        src={data.imageURL} 
        className='w-full h-full rounded-lg object-cover'/>
     </div>
     <p className='my-2 text-center font-semibold text-base'>
      {data.name.length > 25 ? `${data.name.slice(0,25)}...` : data.name}
      {data.artist && (
     <span className='block'>{data.artist.length > 25 ? `${data.artist.slice(0,25)}...` : data.artist}
     </span>
     )}
     </p>
     <div className='w-full left-2 absolute bottom-2 items-center flex justify-between px-4'>
        <motion.i
        whileTap={{ scale : 0.75 }}
        className='text-base text-red-400 drop-shadow-md hover:text-red-600'
        onClick={()=>setIsDelete(true)}
        >
          <IoMdTrash/>
        </motion.i>
     </div>

     {isDelete && (
      <motion.div 
      initial={{opacity : 0}}
      animate={{opacity : 1}}
      className='absolute inset-0 backdrop-blur-md bg-cardOverlay flex flex-col items-center justify-center px-4 py-3'>
           <p className='text-lg text-headingColor font-semibold text-center'>Are you sure do you want delete it?</p>
           <div className='flex items-center gap-4'>
               <motion.button
               whileTap={{scale : 0.75}}
               className='px-2 py-1 text-sm uppercase bg-red-300 rounded-md hover:bg-red-500 cursor-pointer'
               onClick={deleteData(data)}
               >
                 Yes
               </motion.button>
               <motion.button
               whileTap={{scale : 0.75}}
               className='px-2 py-1 text-sm uppercase bg-green-300 rounded-md hover:bg-green-500 cursor-pointer'
               onClick={()=>setIsDelete(!isDelete)}
               >
                 no
               </motion.button>
               
           </div>
      </motion.div>
     )}

   </motion.div>
  )
}
