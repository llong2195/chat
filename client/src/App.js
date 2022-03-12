import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import React, { useState } from 'react';
import { UserContext } from './UserContext';
import Chat from './components/chat/Chat';
import Home from './components/home/Home';
import Navbar from './components/layout/Navbar';

function App() {
  const [user, setUser] = useState(null);
  return (
    
    <BrowserRouter>
      <div className="App">
        <UserContext.Provider value={{ user, setUser }} >
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/chat/:room_id/:room_name" element={<Chat />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
