import Client from "./api";


export const GetComments = async () => {
    try {
      const res = await Client.get('/comments')
      return res.data
    } catch (error) {
      throw error
    }
  }

  export const CreateComment = async (data, postid, userid) => {
    try {
      const res = await Client.post(`/comments/create/${userid}/${postid}`, data)
      return res.data 
    } catch (error){
      throw error
    }
  }

export const GetPostComments = async (postid) => {
  try {
    const res=  await Client.get(`/comments/postComments/${postid}`)
    return res.data 
  } catch (error){
    throw error
  }
}

export const DeleteComment = async (data) => {
  try {
    const res = await Client.delete(`/comments/${data.id}`)
    return res.data
  } catch (error) {
    throw error
  }
}