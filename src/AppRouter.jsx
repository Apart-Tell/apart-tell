import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Explore from './pages/explore/Explore'
import About from './pages/about us/About'
import Login from './pages/login/Login'
import Register from './pages/registration/Register'

function AppRouter (){
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/explore' element={<Explore/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter