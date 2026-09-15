import axios from 'axios';


export let api= axios.create({
    baseURL:"https://team-sync-backend-n78w.onrender.com/",
    withCredentials: true,
})


