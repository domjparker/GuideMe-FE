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
    //GET adventures by tag
    getAdventurebyTag: (tag) => {
        return axios.get(`${prefix}/api/adventure/tags/` + tag, {withCredentials:true})
    },
    //POST new adventure
    postNewAdventure: (advObj) => {
        return axios.post(`${prefix}/api/adventure`, advObj, {withCredentials:true})
    },
    //DELETE an adventure
    deleteAdventure: (id) => {
        return axios.delete(`${prefix}/api/adventure/` + id, {withCredentials:true})
    },
    //============USERS==================
    //GET user by id
    getUserbyId: () => {
        return axios.get(`${prefix}/api/user/profile`, {withCredentials:true})
    },
    //GET session data
    getSessionData : () => {
        return axios.get(`${prefix}/api/user/getSession`, {withCredentials:true})
    },
    //POST new user
    postNewUser: (userObj) => {
        return axios.post(`${prefix}/api/user/signup`, userObj, {withCredentials:true} )
    },
    //POST user login
    loginUser : (loginObj) => {
        return axios.post(`${prefix}/api/user/login`, loginObj, {withCredentials:true} )
    },
    //DELETE userprofile
    deleteUser : () => {
        return axios.delete(`${prefix}/api/user/profile`, {withCredentials:true})
    },
    //============TAGS==================
    //GET tag by id
    getTagbyId: (id) => {
        return axios.get(`${prefix}/api/tag/` + id, {withCredentials:true})
    }
}
