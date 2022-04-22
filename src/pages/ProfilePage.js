import React, { useEffect, useState } from "react";
import { UserPost, PostEdit, PostDelete,LikePost } from "../services/PostServices";
import { useNavigate } from "react-router-dom";
import Comments from "../components/Comments";
import "../style/profile.css";
// import "../style/main.css"
// import "../style/Feed.css"
import { Link } from "react-router-dom";
import { BsGearFill }  from 'react-icons/bs';

const ProfilePage = ({ user, authenticated }) => {
  let navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [editpost, editPost] = useState([false, 1]);
  const [editdesc, setDesc] = useState("");
  const [cardFocus,setCardFocus] = useState([false,{}])


  const navDelete = (post) => {
    navigate(`../post/${post.id}`);
    delPost(post);
  };
  const delPost = async (post) => {
    const sendload = {
      ...post,
    };
    console.log(sendload);
    const payload = await PostDelete(sendload);
    console.log(payload);
    console.log("deletepost");
  };
  const updatePost = (post) => {
    editPost([!editpost[0], post.id]);
    setDesc(post.description);
  };
  const handleChange = (e) => {
    setDesc(e.target.value);
  };
  const sendit = async (post) => {
    const sendload = {
      ...post,
      description: editdesc,
    };
    console.log(sendload);
    const payload = await PostEdit(sendload);
    console.log(payload);
  };

  const focusCard= (post) =>{
    setCardFocus([true,post])
  }
  const handleLike = (post) =>{
    let likedPost = {
      postid:post.id,
      userid:user.id
    }
    LikePost(likedPost)
  }

  useEffect(() => {
    const handlePosts = async () => {
      const data = await UserPost(user.id);
      setPosts(data);
    };
    handlePosts();
  }, []);

  return user && authenticated && posts ? (
    <div>
      <div className="container">
        <div className="profile">
          <img className="profile-image" src={user.image} alt="profile-pic" />
            <Link to="/edit">
              <button className="btn profile-edit-btn"> Edit Button <BsGearFill /></button>
            </Link>
          <div className="profile-user-settings">
            <h1 className="profile-user-name"> {user.username} </h1>
          </div>
          <div className="profile-stats">
            <ul>
              <li>
                <span className="profile-stat-count">164</span> posts
              </li>
              <li>
                <span className="profile-stat-count">18.8k</span> followers
              </li>
              <li>
                <span className="profile-stat-count">206</span> following
              </li>
            </ul>
          </div>
          <div className="profile-bio">
            <div>
              <span className="profile-real-name">
                {user.firstname} {user.lastname} 
              </span>
              <div className="bio">
              {user.bio}
              </div>

                {console.log('This is the bio' + ' ' + user.bio)}
        
            </div>
          </div>
        </div>
      </div>

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
        <div className="like-button-wrap">
          <div className="like-button" onClick={()=>handleLike(cardFocus[1])}></div>
        </div>
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
          <div className="follow-button" onClick={()=>handleLike(cardFocus[1])}></div>
        </div>
        <div className="like-button-wrap2">
          <div className="like-button"></div>
        </div>
      </div>
    )}
    
    <Comments className='bigComm' postid = {cardFocus[1].id}/>

  </div>

  </div>
) : (
  <div>
    {posts.reverse().map((post) => (
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
            <div className="like-button-wrap">
              <div className="like-button" onClick={()=>handleLike(post)}></div>
            </div>
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
            <div className="like-button-wrap2">
              <div className="like-button" onClick={()=>handleLike(post)}></div>
            </div>
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
    </div>
  ) : (
    <div className="no-buddy">
      <h3> Please login to have access to our website.</h3>
      <button onClick={() => navigate("/login")}> Sign In</button>
      <button onClick={() => navigate("/createAccount")}> Register </button>
    </div>
  );
};


export default ProfilePage;