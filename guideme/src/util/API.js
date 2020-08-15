import axios from 'axios'
const prefix = "http://localhost:3001"

export default {
    //============ADVENTURES==================
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
    getAdventurebyTag: (tag) => {
        return axios.get(`${prefix}/api/adventure/tags/` + tag, {withCredentials:true})
    },

    postNewAdventure: (advObj) => {
        return axios.post(`${prefix}/api/adventure`, advObj, {withCredentials:true} )
    },
    //============USERS==================
    //GET user by id
    getUserbyId: (id) => {
        return axios.get(`${prefix}/api/user/profile` + id, {withCredentials:true})
    },
    //POST new user
    postNewUser: (userObj) => {
        return axios.post(`${prefix}/api/user/signup`, userObj, {withCredentials:true} )
    },
    //============TAGS==================
    //GET tag by id
    getTagbyId: (id) => {
        return axios.get(`${prefix}/api/tag/` + id, {withCredentials:true})
    },
  //============MESSAGES==================
    //GET message

    getSentMessage: (id) =>{
        return axios.get(`${prefix}/api/message/` + id, {withCredentials:true})
    }

}
