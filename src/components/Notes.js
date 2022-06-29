import React, { useContext, useEffect, useState, useRef } from "react";
import NoteContext from "../context/notes/NoteContext";
import Addnote from "./Addnote";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refclose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    edtitle: "",
    eddescription: "",
    edtag: "",
  });

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({
      id: currentnote._id,
      edtitle: currentnote.title,
      eddescription: currentnote.description,
      edtag: currentnote.tag,
    });
  };
  const handleclick = () => {
    editNote(note.id, note.edtitle, note.eddescription, note.edtag);
    refclose.current.click();
    props.showAlert("Note Updated Successfully", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

    return (
      <>
      <Addnote showAlert={props.showAlert} />
      <button
        type="button"
        ref={ref}
        className="btn d-none"
        data-bs-toggle="modal"
        data-bs-target="#editnotemodal">
        edit note
      </button>
      <div
        className="modal fade"
        id="editnotemodal"
        tabIndex="-1"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editnotemodalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="edtitle" className="form-label">
                    TITLE
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    minLength={3}
                    required
                    id="edtitle"
                    value={note.edtitle}
                    name="edtitle"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eddescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    minLength={5}
                    required
                    id="eddescription"
                    value={note.eddescription}
                    name="eddescription"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edtag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    minLength={3}
                    required
                    id="edtag"
                    value={note.edtag}
                    name="edtag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refclose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.edtitle.length < 5 ||
                  note.eddescription.length < 5 ||
                  note.edtag.length < 3
                }
                type="button"
                className="btn btn-primary"
                onClick={handleclick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container row" style={{paddingLeft:"20px"}}>
        <h1 style={{fontFamily:"'Tapestry', cursive"}}>MY NOTES</h1>
        <div className="mx-2">
          {notes.length === 0 && <h5 className="mt-2" style={{fontFamily:"'Tapestry', cursive"}} >NOTES YOU ADD APPEAR HERE!!</h5>}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem
              key={note._id}
              updateNote={updateNote}
              showAlert={props.showAlert}
              note={note}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
