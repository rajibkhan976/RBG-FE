import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import EditorComponent from "./editor/Editor";
import React, {useEffect, useState} from "react";
import {EmailServices} from "../../../../services/setup/EmailServices";
import * as actionTypes from "../../../../actions/types";
import {useDispatch} from "react-redux";
import Loader from "../../../shared/Loader";
import ConfirmBox from "../../../shared/confirmBox";

const Preview = (props) => {
    const dispatch = useDispatch();
    const [isLoader, setIsLoader] = useState(false);
    const [callList, setCallList] = useState(false);
    const [emailObj, setEmailObj] = useState({
        "_id": "",
        "title": "",
        "subject": "",
        "template": ""
    });
    //const [payload, setPayload] = useState({});
    const [deleteConfirmBox, setDeleteConfirmBox] = useState(false);
    const [deletedId, setDeletedId] = useState("");


    const deleteTemplate = async (deletedId) => {
        try {
            setIsLoader(true);
            let result = await EmailServices.emailTemplateDelete(deletedId);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: result.message,
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

    const editTemplate = async (payload, deletedId) => {
        try {
            setIsLoader(true);
            let result = await EmailServices.templateEmailUpdate(payload, deletedId);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: result.message,
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
    useEffect(() => {
        setEmailObj(props.selectedEmail)
    }, [props])


   
   let payload = {};
   const saveEditedData = (childdata) => {
     console.log("payload...................",childdata);

    payload ={
        "title": childdata.title, 
        "subject": childdata.subject,
        "template": childdata.template
    }
   }
  
   const saveTemplate = async () =>{
    console.log("payload3333333333333333333...................",payload);
    await editTemplate(payload, emailObj._id);
    //setCallList(true);
    props.updateList(true);
   }

//    const deleteTemplateHandler = async (dlEmailData) => {
//         await deleteTemplate(dlEmailData);
//         //setCallList(true);
//         props.updateList(true);
//     };



    const deleteTemplateHandler = (edlEmailData) => {
        setDeleteConfirmBox(true);
        setDeletedId(edlEmailData);
     };
    
      const deleteConfirm = async (response) => {
        if (response === "yes") {
          console.log(response);
         await deleteTemplate(deletedId);
        } 
        setDeleteConfirmBox(false);
        props.updateList(true);
    
      };
    





    return (
        <>
        {deleteConfirmBox && <ConfirmBox message="Are you sure, you want to delete this Template?" callback={deleteConfirm} />}
        <div className="previewSpaceTemplate">
            <div className="headspaceTemplate d-flex">
                <figure>
                    <svg
                        width="24"
                        height="18"
                        viewBox="0 0 24 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1 9C1 9 5 1 12 1C19 1 23 9 23 9C23 9 19 17 12 17C5 17 1 9 1 9Z"
                            stroke="#305671"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M11.5779 12C13.2347 12 14.5779 10.6569 14.5779 9C14.5779 7.34315 13.2347 6 11.5779 6C9.92103 6 8.57788 7.34315 8.57788 9C8.57788 10.6569 9.92103 12 11.5779 12Z"
                            stroke="#305671"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </figure>
                <span>Email Preview</span>
            </div>
            <div className="templateOuter d-flex">
                { isLoader? <Loader /> : ""}
                {
                    emailObj && emailObj._id ?
                        <>
                            {/*<div className="deletingPan">
                                <button className="noBg" onClick={()=>deleteTemplateHandler(emailObj._id)}><img src={info_3dot_icon}/></button>
                            </div>*/}
                            <div className="templateBody">
                                <EditorComponent createNew={false} initialData={emailObj} editorToPreview={(newData)=>saveEditedData(newData)}/>
                            </div>
                            <div className="cmnFormRow">
                                <div className="actionButtonsTemplateEdit">
                                    
                                    <button class="cmnBtn" onClick={saveTemplate}>Save Template <img src={arrow_forward} alt=""/></button>
                                    <button class="cmnBtn delete" onClick={()=>deleteTemplateHandler(emailObj._id)}>Delete Template <img src={arrow_forward} alt=""/></button>
                                </div>
                            </div>
                        </>
                        :
                        <div className="templateBody"
                               style={{
                                   display: "flex",
                                   alignItems: "center",
                                   justifyContent: "center",
                                   color: "rgb(155, 174, 188)"
                               }}> 
                            <p style={{
                                width: "211px",
                                fontSize: "13px",
                                lineHeight: "19px",
                                textAlign: "center",
                                color: "rgb(155, 174, 188)"
                            }}>Please select an Email Template to view the preview</p>
                        </div>
                }
            </div>
            
        </div>
        </>
    )
}

export default Preview;