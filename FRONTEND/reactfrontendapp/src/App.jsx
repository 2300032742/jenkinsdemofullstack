// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { BrowserRouter } from "react-router-dom"
import NavBar from './book/NavBar';


function App() {
  
  return (
      <div>
        <BrowserRouter>
          <NavBar/>
        </BrowserRouter>
      </div>
      
  )
}

export default App