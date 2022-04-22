import Client from './api'

export const PostGetter = async () => {
  try {
    const res = await Client.get('/post')
    return res.data
  } catch (error) {
    throw error
  }
}

export const PostEdit = async (data) => {
  try {
    const res = await Client.put(`/post/${data.id}`,data)
    console.log(res.data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const PostDelete = async (data) => {
  try {
    const res = await Client.delete(`/post/${data.id}`)
    console.log(res.data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const PostCreate = async (data) => {
  try {
    const res = await Client.post('/post/createpost',data)
    return res.data 
  } catch (error){
    throw error
  }
}
export const PostAdder = async () => {
  try {
    const res = await Client.put('/:post_id')
    return res.data 
  } catch (error){
    throw error
  }
}

export const LikePost = async (data) =>{
  try{

    console.log(`frontside` + data)
    const res = await Client.post('/post/likepost',data)
    console.log(res)
  }catch (error){
    throw error
  }
}
export const unLikePost = async (data) =>{
  try{

    const res = await Client.delete('/post/unlikepost',data)
    console.log(res)
  }catch (error){
    throw error
  }
}

export const LikeGetter = async (data) =>{
  try {
    const res = await Client.get(`post/likes/${data}`)
    
    return res.data
  } catch (error) {
    throw error
  }
}

export const UserPost = async (data) => {
  try {
    if(isNaN(data)){
      data = 1
    }


    const res = await Client.get(`/post/profile/${data}`)
    return res.data
  } catch (error) {
    throw error
  }
}