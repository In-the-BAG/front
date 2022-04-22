import React, {useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { GetPostComments, CreateComment } from '../services/CommentServices'


const Comments = (props) => {


    // let navigate = useNavigate()

    const [comments, setComments] = useState([])

    const [form, setForm] = useState({
        description: ""
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        const handleComments = async () => {
            const data = await GetPostComments(props.postid)
            setComments(data)
        }
        handleComments()
    },[])

        const handleSubmit = async(e) => {
            e.preventDefault()
            const payload = await CreateComment({...form,  userid: props.userid, postid: props.postid})
            console.log(payload)
        }




    return (



        <div className='comment-section'>
            <form onSubmit={handleSubmit}>
            <input
                onChange={handleChange}
                name="description"
                type="text"
                placeholder="Add a comment!"
                value={form.description}
                />
                <button
                // disabled={
                // !authenticated ||
                // !user                
                // }
                >Add comment</button>
            </form>
  
            {comments.slice('').reverse().map((comment) => (
                <div className="comment-single" key={comment.id}>
                    {/* <div>  {comment.userid} </div> */}
                <div>{comment.description}</div>
                {/* <div>Post Id: {comment.postid} </div> */}
                
                </div>
            ))}
        </div>
    )
}

export default Comments





