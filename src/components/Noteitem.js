import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import "./Notecard.css";

const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const {delNote} = context;
  const {note, updateNote}=props;
  var ndate = new Date(note.date);
    return (
    <div className='col-md-3 my-3'>
        <div className="card notes">
        <div className="card-header">{note.title}
        <span className="card-text px-2 review-text ml-2 rounded" style={{float:"right"}}>{note.tag}</span> 
        </div>
        <div className="card-body">
          <p className="card-text px-2 review-text ml-2 rounded">{note.description}</p> 
          <i className="fa-solid fa-trash-can mx-2" onClick={()=>{delNote(note._id);props.showAlert("Note Deleted Successfully","success")}}></i>
          <i className="fa-solid fa-file-pen mx-2" onClick={()=>{updateNote(note)}}></i>
        </div>
        <div className="card-footer"> Last Edited: {ndate.toLocaleTimeString()}</div>
      </div>
        </div>
  )
}

export default Noteitem