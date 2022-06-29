import {React,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import "./Home.css";
const About = () => {
  let navigate = useNavigate (); 
  useEffect(() => {
    if (localStorage.getItem("token")) {
    document.getElementById("buttons").style.visibility = "hidden";
    document.getElementById("buttons2").style.visibility = "hidden";
    } else {
      document.getElementById("buttons").style.visibility = "";
      document.getElementById("buttons2").style.visibility = "";
      navigate("/")
    }
    // eslint-disable-next-line
  }, []);
  return (
  <>
  <div className='homeabt'>
  <div className='container-fluid'>
    <h1 className='text-center' style={{fontFamily:"'Lobster', cursive",float:"left",paddingTop:"10px"}}>SAY NO TO PEN AND PAPER <br/><br/> GET RID OF WRITING NOTES<br/><br/> HERE AND THERE,<br/><br/>ACCESS YOUR NOTES FROM <br/><br/>ANYWHERE WITH<br/><br/> DIGINOTES </h1>
  </div>
  <div className='text-center'>
 <img className='mt-5'  src={require('./note2.png')} alt="logo" width={"220px"} height={"300px"} /> <br/><br/>
 </div> 
 <div style={{display:"flex",flexDirection:"column",marginLeft:"auto",marginRight:"auto",width:"40%"}}>
 <Link id='buttons' className="btn btn-outline-primary mt-3 mb-5" to="/signup" role="button">Signup</Link>
 <Link id='buttons2' className="btn btn-outline-primary mb-5" to="/login" role="button">Login</Link>
 </div>
 </div>
  </>
  )
}

export default About;