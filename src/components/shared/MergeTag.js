import React, { useEffect, useRef, useState } from "react";
import { SMSServices } from "../../services/template/SMSServices";

import LoaderImg from "../../assets/images/loader.gif";
import * as actionTypes from "../../actions/types";
import { useDispatch, useSelector } from "react-redux";


const MergeTag = (props) => {
  const dispatch = useDispatch();

  const [smsTags, setSmsTags] = useState([])

  const [searchTagString, setSearchTagString] = useState("");

  const fetchSMSTags = async () => {
    try {
      const result = await SMSServices.fetchSMSTags()
      if(result) {
        // console.log("result", result);
        setSmsTags(result)
      }
    } catch (error) {
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: error.message,
        typeMessage: 'error'
      });
    }
  }
 const addingMergeField = (e,item) =>{
  e.preventDefault();
  item = " [" + item + "] "

  props.addfeild(e,item)
 }
  useEffect(() => {
    fetchSMSTags()
  }, []);

  return (
    <>
       <div className="mergeFields">
            <ul> 
                {smsTags
                    .filter(
                        (smsTag) =>                            
                            smsTag.id !== "tags"
                            && smsTag.id !== "phone" 
                            && smsTag.id !== "mobile" 
                            && smsTag.id !== "momCellPhone" 
                            && smsTag.id !== "dadCellPhone"
                            && smsTag.id !== "createdBy"
                            && smsTag.id !== "createdAt"
                            && smsTag.id !== "statusName"
                            && smsTag.id !== "phaseName"
                            && smsTag.id !== "contactType"
                            && smsTag.id !== "ageGroup"
                            && smsTag.id !== "sourceDetail"
                            && smsTag.id !== "onTrial"
                    )
                    .map((tagItem, i) => (
                        <li key={"keyField" + i}>
                            <button
                                 onClick={(e) =>
                                  addingMergeField(e, tagItem.alias !== "" ? tagItem.alias : tagItem.id )
                                }
                            >
                                {tagItem.id}
                            </button>
                            
                        </li>
                    ))}
            </ul>
        </div>
    </>
  );
};
export default MergeTag;
