import React from 'react'
import Notes from './Notes'
import "./Notecard.css";

const Home = (props) => {
  const {showAlert} = props; 
  return (
  <>
<div className='homecss' >
    <Notes showAlert={showAlert} />
</div>
    </>

  )
}

export default Home