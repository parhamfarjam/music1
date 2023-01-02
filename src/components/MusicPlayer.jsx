import { motion } from 'framer-motion'
import React from 'react'
import { useStateValue } from '../context/StateProvider'
import { RiPlayListFill } from 'react-icons/ri'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllSongs } from '../api'
import { actionType } from '../context/reducer'
import {} from 'react-icons/io'
import { IoClose, IoMusicalNote } from 'react-icons/io5'

export default function MusicPlayer() {
  const [{allSongs, songIndex, isSongPlaying}, dispatch] = useStateValue()
  const [isPlayList,setIsPlayList] = useState(false)

  const prevTrack = ()=>{
    if(songIndex === 0){
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex : 0,
      })
    }else{
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex : songIndex - 1,
      })
    }
  }

  const nextTrack = ()=>{
    if(songIndex > allSongs.length - 1){
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex : 0,
      })
    }else{
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex : songIndex + 1,
      })
    }
  }

  const closeLayer = ()=>{
    dispatch({
      type: actionType.SET_ISSONG_PLAYING,
      songIndex : false,
    })
  }

  return (
    <div className='w-full flex items-center gap-3'>
      <div className={`w-full items-center gap-3 p-4 flex relative`}>
        <img src={allSongs[songIndex]?.imageURL} className="w-40 h-20 object-cover rounded-md" alt="" />
        <div className='flex items-start flex-col'>
          <p className='text-xl text-lighttextGray font-semibold'>
            {`${allSongs[songIndex]?.name.length > 20 ? allSongs[songIndex]?.name.slice(0,20) : allSongs[songIndex]?.name}`}
            <span className='text-base'>({allSongs[songIndex]?.album})</span>
          </p>
          <p className='text-xl text-lighttextGray font-semibold'>
            {`${allSongs[songIndex]?.artist.length > 20 ? allSongs[songIndex]?.artist.slice(0,20) : allSongs[songIndex]?.artist}`}
            <span className='text-base'>({allSongs[songIndex]?.category})</span>
          </p>
          <motion.i
          whileTap={{ scale : 0.8}}
          onClick={()=> setIsPlayList(!isPlayList)}
          >
            <RiPlayListFill className='text-textColor hover:text-lighttextGray text-2xl mt-2'/>
          </motion.i>
        </div>

        <div className='flex-1'>
          <AudioPlayer
          src={allSongs[songIndex]?.songURL}
          onPlay={()=> console.log('is playing')}
          autoPlay={false}
          showSkipControls={true}
          onClickNext={nextTrack}
          onClickPrevious={prevTrack}
          />
        </div>

        {isPlayList && (
          <PlayListCard/>
        )}

        <IoClose className='bg-red-500 text-white' onClick={closeLayer}/>

      </div>
    </div>
  )
}

export const PlayListCard = ()=>{
  const [{allSongs, songIndex, isSongPlaying}, dispatch] = useStateValue()

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

  const setCurrendPlaySong = (index)=>{
    if(!isSongPlaying){
      dispatch({
        type: actionType.SET_ISSONG_PLAYING,
        isSongPlaying: true,
      })
    }
    if(!songIndex !== index){
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: index,
      })
    }
  }

  return (
    <div className='left-4 bottom-24 absolute gap-2 w-350 max-w-[350px] h-510 max-h-[530px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-primary'>
      {allSongs.length > 0 ? (
        allSongs.map((music , index)=> (
          <motion.div
          initial={{ opacity : 0 , translateX : -50}}
          animate={{ opacity: 1 , translateX: 0}}
          transition={{ duration: 0.3, delay: index * 0.1}}
          className='group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer bg-transparent'
          onClick={()=> setCurrendPlaySong(index) }
          key={index}
          >
          <IoMusicalNote className='text-textColor group-hover:text-headingColor cursor-pointer text-2xl '/>
            <div className='flex items-start flex-col'>
            <p className='text-xl text-lighttextGray font-semibold'>
            {music?.name}
            <span className='text-base'>({music?.album})</span>
            </p>
            <p className='text-xl'>
              {music?.artist}
            <span className='text-base'>({music?.category})</span>
          </p>
            </div>
          </motion.div>
        ))
      ) : <></>}
    </div>
  )
}
