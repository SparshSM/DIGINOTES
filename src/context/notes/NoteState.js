import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const prenotes = [

  ];
  const [notes, setNotes] = useState(prenotes);

  const getNotes = async () => {
  //API CALL
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token":
        localStorage.getItem('token'),
    }
  });
  const json = await response.json();
  setNotes(json);
}
  //ADD NOTE
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag})
      });
      const note = await response.json();
      setNotes(notes.concat(note));
  }
  //DELETE NOTE
  const delNote = async (id) => {
    //API
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        }
      });
      const json = await response.json();
      console.log(json);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //EDIT NOTE
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json);

    let updatednotes = JSON.parse(JSON.stringify(notes))
    //edit logic
    for (let i = 0; i < updatednotes.length; i++) {
      const ele = updatednotes[i];
      if (ele._id === id) {
        updatednotes[i].title = title;
        updatednotes[i].description = description;
        updatednotes[i].tag = tag;
        break;
      }
    }
    setNotes(updatednotes);
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, delNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
