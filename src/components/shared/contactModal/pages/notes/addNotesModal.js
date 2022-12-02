import React, { useEffect, useState } from "react";

import Loader from "../../../Loader";

import arrowRightWhite from "../../../../../assets/images/arrowRightWhite.svg";
import crossTop from "../../../../../assets/images/cross.svg";
import note from "../../../../../assets/images/note.svg";
import {NoteServices} from "../../../../../services/NoteServices";
import * as actionTypes from "../../../../../actions/types";
import { utils } from "../../../../../helpers";
import {useDispatch} from "react-redux";



const AddNotesModal = (props) => {
  const dispatch = useDispatch();
  const [isLoader, setIsLoader] = useState(false);
  const [noteAdd, setNoteAdd] = useState("");
  const [noteAddError, setNoteAddError] = useState("");

  const createNewNote= async (payload) =>{  
    try { 
      setIsLoader(true);
        let result = await NoteServices.addNote(payload);  
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: "Note created successfully",
          typeMessage: 'success'
        });   
    } catch (e) {
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: e.message,
        typeMessage: 'error'
      });
    } finally {
      setIsLoader(false);
    }
};
  const notetexthandler = (e) =>{
    setNoteAdd(e.target.value)
  }
  const saveNote = (e) => {
    e.preventDefault();

    if(noteAdd === ""){
      setNoteAddError("Please add some Note")
    } else{
      setNoteAddError("");

      let payload ={
        note: noteAdd,
        "contactId": props.contactId,
      }
      createNewNote(payload);
      props.updateList(true);
      props.closeAddNoteModal();
    }
  }

  return (
    <>     
      {isLoader && <Loader/>}

      <div className="modalBackdrop addNote">  
        <div className="modalBackdropBg" onClick={props.closeAddNoteModal}></div>
        <div className="slickModalBody">
        
          <div className="slickModalHeader">
            <button className="topCross" onClick={props.closeAddNoteModal}><img src={crossTop} alt="" /></button>
            <div className="circleForIcon"><img src={note} alt="" /></div>
            <h3>Add Note</h3>
            <p className="gap1">Please enter notes for this contact</p>
          </div>
          <div className="modalForm auto">
            <form >    
           
              <div className="formControl">
                <label>Note </label>
                <textarea 
                  value ={noteAdd} 
                  onChange={notetexthandler}
                  placeholder='Write your note here'
                  >
                  </textarea>
                <div className="errorMsg">{noteAddError}</div>
              </div>
              <div className="modalbtnHolder">
                  <button type="button"
                    onClick={saveNote}
                    className="saveNnewBtn"><span>Save Note </span><img src={arrowRightWhite} alt="" 
                  /></button>
               </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNotesModal;
