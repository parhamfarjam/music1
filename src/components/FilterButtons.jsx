import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { IoChevronDown } from 'react-icons/io5'
import { actionType } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'

export default function FilterButtons({filterData ,flag}) {
  const [filterName,setFilterName] = useState(null)
  const [filterMenu,setFilterMenu] = useState(false)
  const [{ artistFilter,albumFilter, filterTerm, languageFilter},dispatch] = useStateValue()

  const updateFitlterButton = (name) =>{
    setFilterMenu(false)
    setFilterName(name)

    if(flag === "Artist"){
      dispatch({ type: actionType.SET_ARTIST_FILTER,artistFilter: name}) 
    }
    if(flag === "Album"){
      dispatch({ type: actionType.SET_ALBUM_FILTER,albumFilter: name}) 
    }
    if(flag === "Language"){
      dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: name}) 
    }
    if(flag === "category"){
      dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: name}) 
    }

  }

  return (
    <div className='border border-gray-300 rounded-md px-4 py-1 relative cursor-pointer hover:border-gray-400'>
      <p onClick={()=> setFilterMenu(!filterMenu)} className='text-base tracking-wide text-textColor flex items-center gap-2'>
        {!filterName && flag}
        {filterName && (
          <>
            {filterName.length > 15 ? `${filterName.slice(0,14)}...`: filterName}
          </>
        )}
        
        <IoChevronDown className={`${filterMenu ? "rotate-180" : "rotate-0"}`}/>
      </p>
       {filterData && filterMenu && (
        <motion.div
        initial={{ opacity : 0, y: 20 }}
        animate={{ opacity : 1, y: 0 }}
        exit={{ opacity : 0, y: 20 }}
        className='w-48 z-50 backdrop-blur-sm max-h-44 overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 py-2 flex flex-col rouneded-md shadow-md absolute top-8 left-8'>
          {filterData?.map((data)=> (
            <div onClick={()=>updateFitlterButton(data.name)} key={data.name} className='flex items-center gap-2 px-4 py-1 hover:bg-gray-200'>
              {(flag === "Artist" || flag === "Album") && (
                <img src={data.imageURL} className='w-8 min-w-[32px] h-8 rounded-full object-cover' />
              )}
              <p>{data.name.length > 15 ? `${data.name.slice(0,15)}...` : data.name}</p>
            </div>
          ))}
        </motion.div>
       )}
    </div>
  )
}
