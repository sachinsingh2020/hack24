import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import HomePage from "./Pages/HomePage";
import ExplorePage from "./Pages/ExplorePage";
import LikesPage from "./Pages/LikesPage";
import SlideBar from './components/SlideBar';
import Footer from './components/Footer';
import Login from './components/Login'
import { ProtectedRoute } from 'protected-route-react';
import AllProjects from './Pages/AllProjects';
import { useDispatch, useSelector } from 'react-redux';
import ProjectPage from './Pages/ProjectPage';
import UploadPage from './Pages/UploadPage';
import toast, { Toaster } from 'react-hot-toast';



const App = () => {
  const { isAuthenticated } = useSelector(state => state.user);
  console.log({ isAuthenticated })

  const dispatch = useDispatch();

  return (

    <div
      className='flex text-white'>

      <SlideBar />

      <div className='max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1'>
        <Routes>
          <Route path='/' element={<Login />} />


          <Route exact path='/home' element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              redirect="/"
            >
              <HomePage />
            </ProtectedRoute>} />
          <Route path="/home" element={<HomePage />} />

          <Route exact path='/' element={
            <ProtectedRoute
              isAuthenticated={!isAuthenticated}
              redirect="/home"
            >
              <Login />
            </ProtectedRoute>} />

          <Route exact path='/explore' element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              redirect="/"
            >
              <ExplorePage />
            </ProtectedRoute>} />


          <Route exact path='/likes' element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              redirect="/"
            >
              <LikesPage />
            </ProtectedRoute>} />


          <Route exact path='/allprojects' element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              redirect="/"
            >
              <AllProjects />
            </ProtectedRoute>} />

          <Route exact path='/project/:projectId' element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              redirect="/"
            >
              <ProjectPage />
            </ProtectedRoute>} />

          <Route exact path='/upload' element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              redirect="/"
            >
              <UploadPage />
            </ProtectedRoute>} />


        </Routes>
      </div>

      <Toaster />

    </div>


  )
}

export default App

// Sachin 