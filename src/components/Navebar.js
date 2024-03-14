import React,{useEffect} from 'react'
import {Link , useLocation} from "react-router-dom"



const Navebar = () => {
  let location= useLocation();
  useEffect(() =>{
    console.log(location.pathname);
  },[location]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Notebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"? "active": ""}`}aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} to="/about">About</Link>
        </li>
       
        
      </ul>
      <form className='form-inline my-2 my-lg-0'>
  
< Link className='btn btn-primary mx-2' to="/login" role="button">login</Link> 
< Link className='btn btn-primary mx-2' to="/signup" role="button">signup</Link>  
  
  
</form>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navebar

