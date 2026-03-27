import axios from 'axios'


const api = axios.create({
    baseURL:'http://localhost:3000/api/posts',
    withCredentials:true
})

export async function getfeed(){
    try {
        const res = await api.get('/feed')
        return res.data
        
    } catch (error) {
        throw error
        
    }
}

export async function createfeed(imagefile,caption){ 
    const formdata = new FormData()

    formdata.append('img',imagefile)
    formdata.append('caption',caption)


    try {
        const res = await api.post('/',formdata)
        return res.data
    } catch (error) {
        throw error
    }
}

export async function likepost(postid){

    
    const res= await api.post('/like/'+postid)
    return res.data
}

export async function unlikepost(postid){
   const res = await api.post('/unlike/'+postid)
   return res.data
}