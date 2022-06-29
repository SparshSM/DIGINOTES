import React from 'react'

function Alert(props) {
    const capitalize = (word)=>{
      if(word==="damger"){ 
        word= "error"
      }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{position:"unset",float:"right",padding:"30px"}}>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
           <strong>{capitalize} {props.alert.msg} </strong>
        </div>}
        </div>
    )
}

export default Alert