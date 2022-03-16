import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import Chat from './components/chat/Chat';
import Home from './components/home/Home';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {

    const verifyUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/verify`, {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        console.log(data);
        if (data._id) {
          setUser(data);
        }
        console.log('user app :', user);
        console.log('userContext', user);
      } catch (error) {
        console.log('err', error);
      }
    }
    verifyUser();
  }, [])

  return (

    <BrowserRouter>
      <div className="App">
        <UserContext.Provider value={{ user, setUser }} >
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/chat/:room_id/:room_name" element={<Chat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
