import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
})


export async function register(username,email,password){
      try {
        const res = await api.post('/register',{
            username,email,password
        })

        return res.data
      } catch (error) {
        throw error
      }
}

export async function login(username,password){
    try {
        const res = await api.post('/login',{
            username,password
        })

        return res.data

    } catch (error) {
        throw error
        
    }
}


export async function getme(){
    try {
        const res = await api.get('/getme')
        return res.data
    } catch (error) {
        throw error
    }
}