import React, { useEffect, useState } from 'react'
import { getAllAlbums, getAllArtists, getAllSongs, saveNewAlbum, saveNewArtist, saveNewSong } from '../api'
import { actionType } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import {} from 'firebase/firestore'
import { storage } from '../config/firebase.config'
import { filterByLanguage, filters } from '../utils/supportfinction'
import FilterButtons from './FilterButtons'
import { BiClipboard } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { motion } from 'framer-motion'


export default function DashboardNewSong() {
  const [songName,setSongName] = useState('')
  const [imageUploadProgress,setImageUploadProgress] = useState(0)
  const [ songImageCover,setSongImageCover ] = useState(null)
  const [{allArtists ,allSongs ,allAlbums,artistFilter,albumFilter, filterTerm, languageFilter,alertType} , dispatch] = useStateValue()
  const [ isImageLoading,setIsImageLoading ] = useState(false)

  const [ audioImageCover,setAudioImageCover ] = useState(null)
  const [ audioUploadingProgress,setAudioUploadingProgress ] = useState(0)
  const [ isAudioLoading,setIsAudioLoading ] = useState(false)

  const [artistImageCover,setArtistImageCover] = useState(null)
  const [artistUploadingProgress,setArtistUploadingProgress] = useState(0)
  const [isArtistUploading,setIsAtristUploading] = useState(false)
  const [artistName,setArtistName] = useState("")
  const [twitter,setTwitter] = useState("")
  const [instagram,setInstagram] = useState("")

  const [albumImageCover,setAlbumImageCover] = useState(null)
  const [albumUploadingProgress,setAlbumUploadingProgress] = useState(0)
  const [isAlbumLoading,setIsAlbumLoading] = useState(false)
  const [albumName,setAlbumName] = useState("")

  useEffect(()=>{
    if(!allArtists){
        getAllArtists().then((data)=>{
            dispatch({
                type: actionType.SET_ALL_ARTISTS,
                allArtists: data.artist
            })
        })
    }
    if(!allAlbums){
        getAllAlbums().then((data)=>{
            dispatch({
                type: actionType.SET_ALL_ALBUMS,
                allAlbums: data.album
            })
        })
    }
  },[])

 const deleteFileObject = (url, isImage)=>{
   if(isImage){
    setIsImageLoading(true)
    setIsAudioLoading(true)
    setIsAlbumLoading(true)
    setIsAtristUploading(true)
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
   }
   const deleteRef = ref(storage, url)
   deleteObject(deleteRef).then(() =>{
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
    setSongImageCover(null);
    setAudioImageCover(null)
    setAlbumImageCover(null)
    setArtistImageCover(null)
    setIsImageLoading(false)
    setIsAudioLoading(false)
    setIsAlbumLoading(false)
    setIsAtristUploading(false)
   });
  };

  const savesong = ()=>{
    if(!songImageCover || !audioImageCover){
        //throw the aleret
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
    }else{
        setIsAudioLoading(true)
        setIsImageLoading(true)

        const data = {
            name: songName,
            imageURL: songImageCover,
            songURL : audioImageCover,
            album : albumFilter,
            language: languageFilter,
            artist: artistFilter,
            category: filterTerm,
        }
        saveNewSong(data).then((res)=>{
            getAllSongs().then(songs =>{
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: songs.song
                })                
            })
        })
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
        setSongName(null)
        setIsImageLoading(false)
        setIsAudioLoading(false)
        setSongImageCover(null)
        setAudioImageCover(null)
        dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter:null })
        dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter:null })
        dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter:null })
        dispatch({ type: actionType.SET_FILTER_TERM, filterTerm:null })
    }
  }

  const saveArtist = ()=>{
    if(!artistName || !artistImageCover || !twitter || !instagram){
        //alert
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
    }else{
        setIsAtristUploading(true)
        const data = {
            name: artistName,
            imageURL : artistImageCover,
            twitter: twitter,
            instagram: instagram,
        }
        saveNewArtist(data).then((res)=>{
            getAllArtists().then(artist =>{
                dispatch({
                    type: actionType.SET_ALL_ARTISTS,
                    allSongs: artist.artist
                })                
            })
        })
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
        setIsAtristUploading(false)
        setArtistImageCover(null)
        setArtistName("")
        setTwitter('')
        setInstagram('')
    }
  }

  const saveAlbum = ()=>{
    if(!albumName || !albumImageCover){
        //alert
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
    }else{
        setIsAlbumLoading(true)
        const data = {
            name: albumName,
             imageURL: albumImageCover,
        }
        saveNewAlbum(data).then((res)=>{
            getAllArtists().then(album =>{
                dispatch({
                    type: actionType.SET_ALL_ALBUMS,
                    allSongs: album.album
                })                
            })
        })
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
        setIsAlbumLoading(false)
        setAlbumImageCover(null)
        setAlbumName("")
    }
  }

  return (
    <div className='flex flex-col items-center justify-center p-4 border border-gray-300 gap-4'>
      <input type="text"
      value={songName}
      onChange={(e)=> setSongName(e.target.value)}
      placeholder='Type your song name'
      className='w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-md border border-gray-300 bg-transparent'
       />

        <div className='flex w-full justify-between flex-wrap items-center gap-4'>
            <FilterButtons filterData={allArtists} flag={'Artist'}/>
            <FilterButtons filterData={allAlbums} flag={'Album'}/>
            <FilterButtons filterData={filterByLanguage} flag={'Language'}/>
            <FilterButtons filterData={filters} flag={'category'}/>
        </div>

        <div className='bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer'>
            {isImageLoading && <FileLoader progress={imageUploadProgress}/> }
            {!isImageLoading && (
                <>
                    {!songImageCover ? (
                        <FileUploader updateState={setSongImageCover} setProgress={setImageUploadProgress} isLoading={setIsImageLoading} isImage={true}/>
                    ) : (
                        <div className='relative w-full h-full overflow-hidden rounded-md'>
                            <img src={songImageCover} className="w-full h-full object-cover" alt='' />
                            <button
                            type='button'
                            className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out'
                            onClick={()=>deleteFileObject(songImageCover, true)}
                            >
                                <MdDelete className='text-white'/>
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
        {/*audio file uploading */}
        <div className='bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer'>
            {isAudioLoading && <FileLoader progress={audioUploadingProgress}/> }
            {!isAudioLoading && (
                <>
                    {!audioImageCover ? (
                        <FileUploader updateState={setAudioImageCover} setProgress={setAudioUploadingProgress} isLoading={setIsAudioLoading} isImage={false}/>
                    ) : (
                        <div className='relative w-full h-full overflow-hidden rounded-md flex items-center justify-center'>
                            <audio src={audioImageCover} controls></audio>
                            <button
                            type='button'
                            className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out'
                            onClick={()=>deleteFileObject(audioImageCover, false)}
                            >
                                <MdDelete className='text-white'/>
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
        {/*send button */}
        <div className='flex items-center justify-center w-60 cursor-pointer p-4'>
            {isImageLoading || isAudioLoading ? (
                <DisableButton/>
            ) : (
                <motion.button
                whileTap={{scale : 0.75}}
                className='px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg'
                onClick={savesong}
                >
                    save song
                </motion.button>
            )}
        </div>
        {/*image uploader fot artist */}
        <p className='font-semibold'>Artist Detalis</p>
        <div className='bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer'>
            {isArtistUploading && <FileLoader progress={artistUploadingProgress}/> }
            {!isArtistUploading && (
                <>
                    {!artistImageCover ? (
                        <FileUploader updateState={setArtistImageCover} setProgress={setArtistUploadingProgress} isLoading={setIsAtristUploading} isImage={true}/>
                    ) : (
                        <div className='relative w-full h-full overflow-hidden rounded-md'>
                            <img src={artistImageCover} className="w-full h-full object-cover" alt='' />
                            <button
                            type='button'
                            className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out'
                            onClick={()=>deleteFileObject(artistImageCover, true)}
                            >
                                <MdDelete className='text-white'/>
                            </button>
                        </div>
                        
                    )}
                </>
            )}
        </div>
        {/*artist name */}
        <input type="text"
        value={artistName}
        onChange={(e)=> setArtistName(e.target.value)}
        placeholder='Artist Name'
        className='w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-md border border-gray-300 bg-transparent'
       />
        {/*twitter */}
       <div className='flex items-center rounded-md p-3 border border-gray-300 w-full'>
            <p className='text-base font-semibold text-gray-400'>
                www.twitter.com/
            </p>
            <input 
            type="text"
            className='w-full rounded-md text-textColor bg-transparent outline-none'
            placeholder='your twitter id'
            value={twitter}
            onChange={(e)=> setTwitter(e.target.value)} 
            />
       </div>
       {/*instagtam */}
       <div className='flex items-center rounded-md p-3 border border-gray-300 w-full'>
            <p className='text-base font-semibold text-gray-400'>
                www.twitter.com/
            </p>
            <input 
            type="text"
            className='w-full rounded-md text-textColor bg-transparent outline-none'
            placeholder='your instagram id'
            value={instagram}
            onChange={(e)=> setInstagram(e.target.value)} 
            />
       </div>
       <div className='flex items-center justify-center w-60 cursor-pointer p-4'>
            {isArtistUploading ? (
                <DisableButton/>
            ) : (
                <motion.button
                whileTap={{scale : 0.75}}
                className='px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg'
                onClick={saveArtist}
                >
                    save artist
                </motion.button>
            )}
        </div>
        {/*album info */}
        <p className='font-semibold'>Album Detalis</p>
        <div className='bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer'>
            {isAlbumLoading && <FileLoader progress={albumUploadingProgress}/> }
            {!isAlbumLoading && (
                <>
                    {!albumImageCover ? (
                        <FileUploader updateState={setAlbumImageCover} setProgress={setAlbumUploadingProgress} isLoading={setIsAlbumLoading} isImage={true}/>
                    ) : (
                        <div className='relative w-full h-full overflow-hidden rounded-md'>
                            <img src={albumImageCover} className="w-full h-full object-cover" alt='' />
                            <button
                            type='button'
                            className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out'
                            onClick={()=>deleteFileObject(albumImageCover, true)}
                            >
                                <MdDelete className='text-white'/>
                            </button>
                        </div>
                        
                    )}
                </>
            )}
        </div>
        {/*album name */}
        <input type="text"
        value={albumName}
        onChange={(e)=> setAlbumName(e.target.value)}
        placeholder='Album Name'
        className='w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-md border border-gray-300 bg-transparent'
       />
       <div className='flex items-center justify-center w-60 cursor-pointer p-4'>
            {isAlbumLoading ? (
                <DisableButton/>
            ) : (
                <motion.button
                whileTap={{scale : 0.75}}
                className='px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg'
                onClick={saveAlbum}
                >
                    save album
                </motion.button>
            )}
        </div>
    </div>
  )
}

export const DisableButton = ()=>{
    return (
        <>
            
<button disabled type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
    <svg role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
    </svg>
    Loading...
</button>
<button disabled type="button" class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
    <svg role="status" class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
    </svg>
    Loading...
</button>

        </>
    )
}

export const FileLoader =({progress})=>{
    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
        <p className='text-xl font-semibold text-textColor'>
            {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
        </p>
        <div className='w-20 h-20 min-w-[40px] bg-red-600 animate-ping rounded-full flex items-center justify-center relative'>
            <div className='absolute inset-0 rounded-full bg-red-600 blur-xl'></div>
        </div>
    </div>
    )
}

export const FileUploader = ({updateState,setProgress,isLoading,isImage})=>{
    const [{alertType} , dispatch] = useStateValue()


    const uploadFile = (e)=>{
        isLoading(true)
        const uploadedFile = e.target.files[0]
        const storageRef = ref(storage, `${isImage ? "Images" : "Audio"}/${Date.now()}-${uploadedFile.name}`)
        const uploadTask = uploadBytesResumable(storageRef, uploadedFile)
        
        uploadTask.on("state_changed", 
        (snapshot)=>{
            setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        }, 
        (error)=>{
            dispatch({
                type: actionType.SET_ALERET_TYPE,
                alertType : "danger"
            })
            setInterval(() => {
                dispatch({
                    type: actionType.SET_ALERET_TYPE,
                    alertType: null,
                })
            }, 3000);
           
        }, 
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                updateState(downloadURL)
                isLoading(false)
            })
            dispatch({
                type: actionType.SET_ALERET_TYPE,
                alertType : "success"
            })
            setInterval(() => {
                dispatch({
                    type: actionType.SET_ALERET_TYPE,
                    alertType: null,
                })
            }, 3000);
        }
        )
    }

    return <label>
        <div className='flex flex-col items-center justify-center h-full'>
            <div className='flex flex-col items-center justify-center cursor-pointer'>
                <p className='font-bold text-2xl'>
                    <BiClipboard/>
                </p>
                <p className='text-lg'>
                    Click to upload { isImage ? "an image" : "an audio"}
                </p>
            </div>
        </div>
        <input 
        type="file" 
        name='upload-file' 
        accept={`${isImage ? "image/*" : "audio/*"}`}
        className='w-0 h-0'
        onChange={uploadFile}
         />
    </label>
}