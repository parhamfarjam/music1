import React from 'react'
import {isActiveStyles,isNotActiveStyles} from '../utils/styles'
import { IoMdHome } from 'react-icons/io'
import { Alert, DashboardAlbums, DashboardArtists, DashboardHome, DashboardNewSong, DashboardUsers, Header } from '../components/index'
import { NavLink, Route, Routes } from 'react-router-dom'
import DashboardSongs from './DashboardSongs'
import { useStateValue } from '../context/StateProvider'

export default function Dashboard() {
  const [{alertType} , dispatch] = useStateValue()

  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'>
      
      <Header/>
      <div className='w-[60%] my-2 p-4 flex items-center justify-evenly'>
        <NavLink to={'/dashboard/home'} ><IoMdHome className='text-2xl text-textColor'/></NavLink>
        <NavLink to={'/dashboard/users'} className={({isActive})=> isActive ? isActiveStyles : isNotActiveStyles}>Users</NavLink>
        <NavLink to={'/dashboard/songs'} className={({isActive})=> isActive ? isActiveStyles : isNotActiveStyles}>Songs</NavLink>
        <NavLink to={'/dashboard/artists'} className={({isActive})=> isActive ? isActiveStyles : isNotActiveStyles}>Artist</NavLink>
        <NavLink to={'/dashboard/albums'} className={({isActive})=> isActive ? isActiveStyles : isNotActiveStyles}>Albums</NavLink>
      </div>
      <div className='my-4 w-full p-4'>
        <Routes>
          <Route path='/home' element={<DashboardHome/>}/>
          <Route path='/users' element={<DashboardUsers/>}/>
          <Route path='/songs' element={<DashboardSongs/>}/>
          <Route path='/artists' element={<DashboardArtists/>}/>
          <Route path='/albums' element={<DashboardAlbums/>}/>
          <Route path='/newSong' element={<DashboardNewSong/>}/>
        </Routes>
      </div>
      {alertType && (
        <Alert type={alertType}/>
      )}
    </div>
  )
}
