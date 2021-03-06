import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import './App.css';
import './style/main.css'
import React, { useState, useEffect } from 'react';
import NewAccount from './pages/NewAccount'
import Login from './pages/Login'
import Feed from './pages/Feed'
import CreatePost from './pages/CreatePost'
import { CheckSession } from './services/auth'
import Profile from './pages/ProfilePage';
import EditUser from './pages/EditUser'
// import axios from 'axios'
// import PostDetails from './pages/PostDetails'


function App() {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState({
    firstname:'',
    lastname:'',
    email:'',
    image:'',
    username:'',
    // bio:'',
    id:NaN
  })

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
    toggleAuthenticated(true)
  }


  const handleLogOut = () =>{
    setUser(null)
  }

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  },[])

 

  return (
    <Router>
      <Nav authenticated={authenticated} user = {user} handleLogOut = {handleLogOut}/>
      <main >
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/createAccount" exact element={<NewAccount/>} />
        <Route path="/login" exact element={<Login setUser={setUser} toggleAuthenticated={toggleAuthenticated} />} />
        <Route path="/createPost" exact element={<CreatePost user={user} authenticated={authenticated}/>} />
        <Route path="/feed" exact element={<Feed user={user} authenticated={authenticated} />} />
        <Route path="/edit" exact element={<EditUser user={user} setUser={setUser}  authenticated={authenticated} />} />
        <Route path="/profile" exact element={<Profile user={user} authenticated={authenticated} />} />
      </Routes>
      </main>
      {/* <footer className='footer'>About Us</footer> */}

   </Router>
  );
}

export default App;
