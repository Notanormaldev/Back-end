import axios from "axios";


export let axiosinsta = axios.create({
    baseURL: "https://fakestoreapi.com",
    // withCredentials: true
})
  

// axiosinsta.interceptors.request.use()
axiosinsta.interceptors.response.use(
    (res)=>{
        console.log('axios instance res -->',res);
        return res.data
    },
    (err)=>{
        console.log('axios instance err -->',err);
    }
)