// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// // routes

// const PostDeets = (props) => {
//   let { id } = useParams();
 
//   const [selectedPost, setPost] = useState({});

//   useEffect(() => {
//     const chosenPost = props.post.find((post) => post.id === id);
//     setPost(chosenPost);
//     console.log(chosenPost);
//   }, []);

//   return selectedPost ? (
//     <div className="detail">
//       <div className="detail-header">
//         <img src={selectedPost.image} alt={selectedPost.description} />
//         <div
//           style={{
//             minWidth: "30em",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <h1>{selectedPost.userid}</h1>
//         </div>
//       </div>
//       <div className="info-wrapper">
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <p>{selectedPost.description}</p>
          
//         </div>
      
//       </div>
//     </div>
//   ) : null;
// };

// export default PostDeets;
