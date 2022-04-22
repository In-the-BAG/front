import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PostCreate } from '../services/PostServices'
import '../style/CreatePost.css'

const Login = ({user, authenticated}) =>{
    const [formVal, setForm] = useState({
        description:"",
        image:""
    })
    const navigate = useNavigate()

    const handleChange = (e) =>{
        setForm({ ...formVal, [e.target.name]: e.target.value })
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()
        const payload = await PostCreate({...formVal, userid:user.id})
        console.log(payload)
        navigate('/profile')
        
    }

    return(
        <div className='create-post-wrap'>
            <div>
                <form onSubmit={handleSubmit}>
                {formVal.image &&  <img src={formVal.image} alt="postimage"  className='picture'/>}

                <div className="input-wrap">
                <input
                onChange={handleChange}
                name="image"
                type="text"
                placeholder="Image URL"
                value={formVal.image}
                required
                />
                </div>
                <div className="input-text-wrap">
                <textarea
                onChange={handleChange}
                name="description"
                type="text"
                placeholder="decription"
                value={formVal.description}
                required
                />
                </div>
                <button
                disabled={
                !authenticated ||
                !user                
                }
                >Submit</button>
                </form>
            </div>
        </div>
    )
}


export default Login