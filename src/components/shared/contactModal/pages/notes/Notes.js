import React, { useEffect, useRef, useState } from "react";

import arrow_forward from "../../../../../assets/images/arrow_forward.svg";
import note from "../../../../../assets/images/note.svg";
import AddNotesModal from "./addNotesModal"
import Loader from "../../../Loader";
import {NoteServices} from "../../../../../services/NoteServices";
import {utils} from "../../../../../helpers";
import momentTZ from "moment-timezone";


const Notes = (props) => {

  const [displayModal, setDisplayModal] = useState(false);
  const [contactID, setContactID] = useState("");
  const [listNote, setListNote] = useState([]);
 
  const [isLoader, setIsLoader] = useState(false);
  const [updateListNote, setUpdateListNote] = useState(false);


  const openAddNoteModal = (e) => {
    e.preventDefault(); 
    setDisplayModal(true)
  }
  const closeAddNoteModal = (e) => {
    setDisplayModal(false)
  }
  const getQueryParams = async () => {
    return new URLSearchParams();
};
  const fetchAllNoteList = async () => {
    const pageId = "all";
    const queryParams = await getQueryParams();
    let contactID = props.contactId;
    console.log(contactID);
    try {
        setIsLoader(true);
        const result = await NoteServices.fetchNoteList(contactID ,pageId, queryParams);
        if (result) {
          setListNote(result.notes);
          console.log(listNote);
        }
    } catch (e) {

    } finally {
        setIsLoader(false);
    }
};
useEffect(async () => {
  await fetchAllNoteList();
}, []);

const updateList = (value) =>{
  setUpdateListNote(value);
  console.log("updateListNote 1", updateListNote)
}
if(updateListNote === true){
  setTimeout(async () => {
    await fetchAllNoteList() 
}, 50);
setTimeout(() => {
  setUpdateListNote(false)        
}, 500);
  console.log("updateListNote 2", updateListNote)
}

  return (
    <>
    {isLoader && <Loader/>}
    <div className="contactTabsInner notes">
      <div className="modalcont_header">
        <div className="w-100">
          <h3 className="headingTabInner">Notes</h3>
          <div className="notesHeaders"> 
            <button className="saveNnewBtn" onClick={openAddNoteModal}>Add a Note <img src={arrow_forward} alt=""/></button>
            <p className="subheadingTabInner"> Manage notes for this contact.</p> 
          </div> 
        </div>    
      </div>
      <div className="modalNoteBody">
        <div className="notesListing">
          <div className="notesListingHeader d-flex">
            <div className="cell desc">Description</div>
            <div className="cell creBy">Created by</div>
            <div className="cell creOn">Created on</div>
          </div>
          <div className="notesListingBodyOuter">
            {
              listNote && listNote.length > 0 ?
                listNote.map((elem ,key)=>{
                  const newdate = new Date(elem.createdAt);
                  const dateForamt = newdate.getDate()+"/"+(newdate.getMonth() + 1)+"/"+newdate.getFullYear();
                 

                  return(
                    <div className="notesListingBody d-flex">
                      <div className="cell desc">
                        <span className="icon"><img src={note} alt=""/></span>
                        <p>{elem.note}</p>
                      </div>
                      <div className="cell creBy">{elem.createdBy}</div>
                      <div className="cell creOn">{dateForamt}</div>
                    </div>
                  )
                })
              : 
                <div className="appListsWrap">
                  <div className="noDataFound">
                    <span><span>This contact doesn’t have any Note yet.</span></span>
                  </div>
                </div>
            }
            


          
          </div>
         
          
          
        </div>
      </div>
    </div>
    {displayModal && 
       <AddNotesModal closeAddNoteModal={closeAddNoteModal} contactId={props.contactId} updateList={(val)=>updateList(val)}/>
    }
    </>
  )
      
}

export default Notes;
