import React from 'react';
import Marketplace from './pages/Marketplace';
import Splash from './pages/Splash';
import Nav from './components/Nav';
import Profile from './pages/Profile';
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route
} from 'react-router-dom';

const App = () =>{
  return(
    <div>
      <HashRouter>
        <Nav />
        <Routes>
          <Route path="/market" element={<Marketplace />} />
          <Route path="/" element={<Splash />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </HashRouter>
    </div>
)}

export default App;