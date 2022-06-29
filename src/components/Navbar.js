import React from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'

const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate (); 
    const logout=()=>{
      localStorage.removeItem('token');
      navigate("/")
    }
  return (

    <nav className= {`navbar navbar-expand-lg ${location.pathname === "/mynotes" ? "navback":"navback2" }`}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><img src={require('./logo1.png')} alt="logo" width={"100px"} height={"30px"} /> </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={ `nav-link ${location.pathname === "/mynotes" ? "active":"" }`} to="/mynotes">NOTES</Link>
        </li>
      </ul>
      {!localStorage.getItem('token')? <div> <Link className="btn btn-outline-primary mx-1" to="/login" role="button">Login</Link>
      <Link className="btn btn-outline-primary mx-1" to="/signup" role="button">Signup</Link></div>: <button onClick={logout} className="btn btn-outline-primary mx-1">Logout</button>}
    </div>
  </div>
</nav>
  )
}

export default Navbar