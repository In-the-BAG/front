import React, {useEffect, useState } from 'react'
import { PostEdit, PostGetter, PostDelete, LikePost, LikeGetter, unLikePost  } from '../services/PostServices'
import { useNavigate } from 'react-router-dom'
import '../style/Feed.css'
import Comments from '../components/Comments'

const Feed = ({user, authenticated}) => {

    let navigate = useNavigate()

    const [posts, setPosts] = useState([])
    const [editpost, editPost] = useState([false,user.id])
    const [editdesc, setDesc] = useState('')
    const [cardFocus,setCardFocus] = useState([false,{}])
    const [likes, setLikes] = useState([{postid: 'nothing'}])



    const getLikes = async () => {
      const data = await LikeGetter(user.id);

      if (Object.keys(data).length !== 0) {
        setLikes(data);
      }

      console.log(`API CALL HERE`+ data);
    };

    const isLiked = (post) => {
      return likes.find((element) => element.postid === post.id);
    };


    const updatePost =( post) =>{
        editPost([!editpost[0],post.id])
        setDesc(post.description)
    }


    const navDelete=(post)=>{
        navigate(`../post/${post.id}`)
        delPost(post)
    }
    const delPost = async( post) =>{

        const sendload = {
            ...post,
         }
         const payload = await PostDelete(sendload)
         console.log('Post Deleted',payload)
    }
    const handleChange = (e) =>{
        setDesc(e.target.value)
    }
    const sendit = async(post) =>{

      console.log(`API SEND POST`)
        const sendload = {
           ...post,
            description:editdesc
        }
        const payload = await PostEdit(sendload)
        console.log(payload)
    }
    const focusCard= (post) =>{
      setCardFocus([true,post])
    }

    const handleLike = (post) =>{
      let likedPost = {
        postid:post.id,
        userid:user.id
      }

      // if(likes.find((element) => element.postid === post.id)){
      //   unLikePost({
      //     postid:post.id,
      //     userid:user.id
      //   })
      //   return

      // }
      LikePost(likedPost)
    }

    useEffect(() => {
        const handlePosts = async () => {
            console.log(`API GET POSTS`)
            const data = await PostGetter()
            setPosts(data)
        }
        handlePosts()
        getLikes()
    },[])


    return user && authenticated ? (

      <div className="posts-out">


        {cardFocus[0] ? (
          <div>
            
          <div
            className="focuscard"
            
          >
            <img src={cardFocus[1].image} alt="location" className="bigImage" onClick={() => setCardFocus(...cardFocus, (cardFocus[0] = false))}/>
            
            <div className='bigDesc'>{cardFocus[1].description}</div>
            {cardFocus[1].userid === user.id ? (
              <div className="buttons">
                <div className="follow-button-wrap">
                  <div className="follow-button"></div>
                </div>
                {isLiked(cardFocus[1]) !== undefined ? (
              <div className="like-button-wrap">
                  <div className="liked-button" onClick={()=>handleLike(cardFocus[1])}></div>
                </div>):
                
                
                (<div className="like-button-wrap">
                  <div className="like-button" onClick={()=>handleLike(cardFocus[1])}></div>
                </div>)}
                <div
                  className="edit-button-wrap"
                  onClick={() => updatePost(cardFocus[1])}
                >
                  <div className="edit-button"></div>
                </div>
                <div
                  className="del-button-wrap"
                  onClick={() => navDelete(cardFocus[1])}
                >
                  <div className="del-button"></div>
                </div>
              </div>
            ) : (
              <div className="buttons">
                <div className="follow-button-wrap2">
                  <div className="follow-button"></div>
                </div>

              {isLiked(cardFocus[1]) !== undefined ? (
              <div className="like-button-wrap2">
                  <div className="liked-button" onClick={()=>handleLike(cardFocus[1])}></div>
                </div>):
                
                
                (<div className="like-button-wrap2">
                  <div className="like-button" onClick={()=>handleLike(cardFocus[1])}></div>
                </div>)}





              </div>
            )}
          </div>
          <div className='Comment-Section'>
            <span className='Comments'>Comments:</span>
            <Comments className='bigComm' userid={user.id} postid = {cardFocus[1].id}/>          </div>
          </div>
        ) : (
          <div>
            {posts.slice('').reverse().map((post) => (
              <div
                className="posts-in"
                key={post.id}
                
              >
                <img src={post.image} alt="location" onClick={() => focusCard(post)} />

                {post.userid === user.id ? (
                  <div className="buttons">
                    <div className="follow-button-wrap">
                      <div className="follow-button"></div>
                    </div>
                    {isLiked(post) !== undefined ? (
              <div className="like-button-wrap">
                  <div className="liked-button" onClick={()=>handleLike(post)}></div>
                </div>):
                
                
                (<div className="like-button-wrap">
                  <div className="like-button" onClick={()=>handleLike(post)}></div>
                </div>)}
                    <div
                      className="edit-button-wrap"
                      onClick={() => updatePost(post)}
                    >
                      <div className="edit-button"></div>
                    </div>
                    <div
                      className="del-button-wrap"
                      onClick={() => navDelete(post)}
                    >
                      <div className="del-button"></div>
                    </div>
                  </div>
                ) : (
                  <div className="buttons">
                    <div className="follow-button-wrap2">
                      <div className="follow-button"></div>
                    </div>
                    {isLiked(post) !== undefined ? (
              <div className="like-button-wrap2">
                  <div className="liked-button" onClick={()=>handleLike(post)}></div>
                </div>):
                
                
                (<div className="like-button-wrap2">
                  <div className="like-button" onClick={()=>handleLike(post)}></div>
                </div>)}
                  </div>
                )}

                <div className="posts-description">
                  {editpost[0] && editpost[1] === post.id ? (
                    <div className="edit-desc">
                      <textarea
                        onChange={handleChange}
                        name="description"
                        type="text"
                        placeholder="decription"
                        value={editdesc}
                        required
                      />
                      <button onClick={() => sendit(post)}>SEND IT</button>
                    </div>
                  ) : (
                    <p>{post.username}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    ) : (
      <div className="no-buddy">
        <h3> Please login to have access to our website.</h3>
        <button onClick={() => navigate("/login")}> Sign In</button>
        <button onClick={() => navigate("/createAccount")}> Register </button>
      </div>
    );
}

export default Feed