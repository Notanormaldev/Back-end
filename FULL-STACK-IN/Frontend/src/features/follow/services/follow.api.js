import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:3000/api/ff',
    withCredentials:true
})

export async function followdets(){
    const res =await api.get('/getfollowdets')
    return res.data
}


export async function follow(userid){
    const res =await api.post('/follow/'+userid)
    return res.data
}

export async function unfollow(userid){
    const res =await api.post('/unfollow/'+userid)
    return res.data
}


export async function otheruserapi(){
    const res =await api.get('/otheruser')
    return res.data
}


