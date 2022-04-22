import Client from "./api";


export const GetComments = async () => {
    try {
      const res = await Client.get('/comments')
      return res.data
    } catch (error) {
      throw error
    }
  }

  export const CreateComment = async (data) => {
    try {

      console.log(`user ${data.userid} post ${data.postid} data ${data.description}`)
      const res = await Client.post(`/comments/create/${data.userid}/${data.postid}`, data)
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