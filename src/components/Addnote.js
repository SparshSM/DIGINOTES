import React, { useContext } from 'react'
import { useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import "./Notecard.css";

const Addnote = (props) => {
    const context = useContext(NoteContext);
    const {addNote} = context;
   const [note, setNote] = useState({title : "",description:"",tag:""})
    const handleclick =(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title : "",description:"",tag:""})
        props.showAlert("Note Added Successfully","success")

    }
   const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
   }

    return (
    <div className='container'>
    <h1 className='addh1' style={{fontFamily:"'Tapestry', cursive",paddingTop:"10px"}}>ADD NOTES</h1>
    <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label addlabel" >TITLE</label>
    <input type="text" style={{width:"50%"}} className="form-control" minLength={3} value={note.title} required id="title" name='title' aria-describedby="emailHelp" onChange={onChange} />
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label addlabel">Description</label>
    <textarea className="form-control" rows={4} style={{width:"50%",background:"transparent",border:"none",outline: "none",borderBottom:"1px solid white"}} minLength={5} value={note.description} required id="description" name='description' onChange={onChange}></textarea>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label addlabel">Tag</label>
    <input type="text" style={{width:"50%"}} className="form-control" minLength={3} value={note.tag} required id="tag" name='tag' onChange={onChange} />
  </div>
  <button disabled={note.title.length<3 || note.description.length<5 || note.tag.length<3} type="submit" style={{width:"50%",color:"white"}} className="btn btn-outline-primary mb-4 mt-4" onClick={handleclick}>ADD NOTE</button>
</form></div>
  )
}

export default Addnote