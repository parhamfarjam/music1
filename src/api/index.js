import axios from "axios";

const baseURl = "http://localhost:4000/"

export const validateUser = async(token)=>{
    try {
        const res =await axios.get(`${baseURl}api/users/login`, {
           headers : {
            Authorization : "Bearer " + token
           }
        })
        return res.data
    } catch (error) {
        
    }
}

export const getAllUsers = async ()=>{
    try {
        const res = await axios.get(`${baseURl}api/users/getUsers`)
        return res.data
    } catch (error) {
        return null
    }
}

export const getAllArtists = async ()=>{
    try {
        const res = await axios.get(`${baseURl}api/artists/getAll`)
        return res.data
    } catch (error) {
        return null
    }
}

export const getAllAlbums = async ()=>{
    try {
        const res = await axios.get(`${baseURl}api/albums/getAll`)
        return res.data
    } catch (error) {
        return null
    }
}

export const getAllSongs = async ()=>{
    try {
        const res = await axios.get(`${baseURl}api/songs/getAll`)
        return res.data
    } catch (error) {
        return null
    }
}

export const changingUserRole = async (userId , role)=>{
    try {
        const res = axios.put(`${baseURl}api/users/updateRole/${userId}`, {data : {role : role}})
        return res
    } catch (error) {
        return null
    }
}

export const removeuser = async (userId) =>{
    try {
        const res = axios.delete(`${baseURl}api/users/deleteUser${userId}`)
        return res
    } catch (error) {
        return null
    }
}

export const saveNewSong = async(data)=>{
    try {
        const res =axios.post(`${baseURl}api/songs/save`, {...data})
        return (await res).data.savedsong
    } catch (error) {
        return null
    }
}

export const saveNewArtist = async(data)=>{
    try {
        const res =axios.post(`${baseURl}api/artists/save`, {...data})
        return (await res).data.savedArtist
    } catch (error) {
        return null
    }
}

export const saveNewAlbum = async(data)=>{
    try {
        const res =axios.post(`${baseURl}api/albums/save`, {...data})
        return (await res).data.saveAlbum
    } catch (error) {
        return null
    }
}

export const deleteSongById = async (id)=>{
    try {
        const res = await axios.delete(`${baseURl}api/songs/delete/${id}`)
        return res
    } catch (error) {
        return null
    }
}
export const deleteAlbumById = async (id)=>{
    try {
        const res = await axios.delete(`${baseURl}api/albums/delete/${id}`)
        return res
    } catch (error) {
        return null
    }
}
export const deleteSArtistById = async (id)=>{
    try {
        const res = await axios.delete(`${baseURl}api/artists/delete/${id}`)
        return res
    } catch (error) {
        return null
    }
}



