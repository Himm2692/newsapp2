import React, { useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

const App = ()=> {
  const [progress,setProgress] = useState(0)
  const setprogress =()=>{
  setProgress(progress)
  }
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Routes>
        <Route exact path="/" element={<News setProgress={setprogress} key="general" pageSize = {5} country="in" category = "general" style="style"/>}/>
        <Route exact path="/business" element={<News setProgress={setprogress} key="business" pageSize = {5} country="in" category = "business"/>}/>
        <Route exact path="/entertainment"element={<News setProgress={setprogress} key="entertainment" pageSize = {5} country="in" category = "entertainment"/>}/>
        <Route exact path="/general" element={<News setProgress={setprogress} key="general" pageSize = {5} country="in" category = "general"/>}/>
        <Route exact path="/health" element={<News setProgress={setprogress} key="health" pageSize = {5} country="in" category = "health"/>}/>
        <Route exact path="/science" element={<News setProgress={setprogress} key="science" pageSize = {5} country="in" category = "science"/>}/>
        <Route exact path="/sports" element={<News setProgress={setprogress} key="sports" pageSize = {5} country="in" category = "sports"/>}/>
        <Route exact path="/technology"element={<News setProgress={setprogress} key="technology" pageSize = {5} country="in" category = "technology"/>}/>
        </Routes>
       </Router>
      </div>  
    )
  
}

export default App

