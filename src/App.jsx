import React from 'react'
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './component/home'

const App = () => {
  return (
    <div className=''>
        <ToastContainer />
      <Home/>
    </div>
  )
}

export default App