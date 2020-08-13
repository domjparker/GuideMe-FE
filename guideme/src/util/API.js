import axios from 'axios'

export default {
    //GET all adventures
    getAllAdventures: () => {
        return axios.get('/api/adventure')
    },
    //GET adventures by host id
    getAdventurebyHost: (id) => {
        return axios.get('/api/adventure/host/' + id)
    },
    //GET adventures by id
    getAdventurebyId: (id) => {
        return axios.get('/api/adventure/' + id)
    },
    //GET adventures by location
    getAdventurebyLocation: (location) => {
        return axios.get('/api/adventure/location/' + location)
    },
    //GET user by id
    getUserbyId: (id) => {
        return axios.get('/api/user/' + id)
    }
}