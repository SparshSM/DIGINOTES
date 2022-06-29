import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className="bg-dark text-center text-white">
  <div className="container p-4 pb-0">
    <section className="mb-4">
          <a className="btn btn-outline-light btn-floating m-1" href="https://www.facebook.com/sparsh.mehra01/" role="button"
        ><i className="fab fa-facebook-f"></i
      ></a>

    
      <a className="btn btn-outline-light btn-floating m-1" href="https://twitter.com/SparshMehra8" role="button"
        ><i className="fab fa-twitter"></i
      ></a>


      <a className="btn btn-outline-light btn-floating m-1" href="mailto:sparshmehra2001@gmail.com" role="button"
        ><i className="fas fa-envelope"></i
      ></a>

      
      <a className="btn btn-outline-light btn-floating m-1" href="https://instagram.com/sparsh.01_?igshid=YmMyMTA2M2Y=" role="button"
        ><i className="fab fa-instagram"></i
      ></a>

      
      <a className="btn btn-outline-light btn-floating m-1" href="https://www.linkedin.com/in/sparsh-mehra/" role="button"
        ><i className="fab fa-linkedin-in"></i
      ></a>

      <a className="btn btn-outline-light btn-floating m-1" href="https://github.com/SparshSM" role="button"
        ><i className="fab fa-github"></i
      ></a>
    </section>
  </div>
  <div className="p-3 pb-5" style={{backgroundColor:"rgba(0, 0, 0, 0.2)"}}>
    <h6 style={{float:"left"}}> © 2022 <img src={require('./logo.png')} alt="logo" width={"140px"} height={"40px"} /></h6>
    <h6 style={{float:"right"}}>Developed By: Sparsh Mehra</h6>
  </div>
</footer>
    </>
  )
}

export default Footer