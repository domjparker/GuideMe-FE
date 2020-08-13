import axios from 'axios'
const prefix = "http://localhost:3001"

export default {
    //GET all adventures
    getAllAdventures: () => {
        return axios.get(`${prefix}/api/adventure`, {withCredentials:true})
    },
    //GET adventures by host id
    getAdventurebyHost: (id) => {
        return axios.get(`${prefix}/api/adventure/host/` + id, {withCredentials:true})
    },
    //GET adventures by id
    getAdventurebyId: (id) => {
        return axios.get(`${prefix}/api/adventure/` + id, {withCredentials:true})
    },
    //GET adventures by location
    getAdventurebyLocation: (location) => {
        return axios.get(`${prefix}/api/adventure/location/` + location, {withCredentials:true})
    },
    //GET user by id
    getUserbyId: (id) => {
        return axios.get(`${prefix}/api/user/` + id, {withCredentials:true})
    },
    //GET tag by id
    getTagbyId: (id) => {
        return axios.get(`${prefix}/api/tag/` + id, {withCredentials:true})
    }
}
