import React, { useEffect, useRef, useState } from "react";
import { ContactService } from "../../services/contact/ContactServices";
import lineUser from "../../assets/images/lineUser.svg";
import whiteCross from "../../assets/images/cross_white.svg";
import browse_keywords from "../../assets/images/icon_browse_keywords.svg";
import arrow_forward from "../../assets/images/arrow_forward.svg";
import cross from "../../assets/images/cross.svg";
import updown from "../../assets/images/updown.png";
import { utils } from "../../helpers";
import { SMSServices } from "../../services/template/SMSServices";
import {DependentServices} from "../../services/contact/DependentServices";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../actions/types";
import env from "../../configuration/env";
import { uploadFile } from "react-s3";
import Loader from "./Loader";


const initialDependentState = {
  name: "",
  contactId: "",
};

const SmsModal = (props) => {
  const dispatch = useDispatch();
  const contactSelect = useRef(null)
  const inputFile = useRef(null)
  const messageTextbox = useRef(null)
  const [isLoader, setIsLoader] = useState(false)
  const [imgLoader, setImgLoader] = useState(false)
  const [smsTemplates, setSMSTemplates] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [errorMsg, setErrorMsg] = useState("");
  const [keywordSuggesion, setKeywordSuggesion] = useState(false);
  const [smsTags, setSmsTags] = useState([])
  const [searchTagString, setSearchTagString] = useState("")
  const [contacts, setContacts] = useState([])
  const [isDisabled, setIsDisabled] = useState(false);
  const [contactOptions, setContactOptions] = useState(false)
  const [image, setImage] = useState("");
  const [processing, setProcessing] = useState(false);
  const [globalSMSErrors, setAppointmentErrors] = useState({
      agenda: "",
      date: "",
      toTime: "",
      fromTime: "",
      contactId: "",
  });
  const [toggleContactList, setToggleContactList] = useState({
      status: false,
      contacts: [],
      isCross: false,
  });
  const [editMsgObj, setEditMsgObj] = useState({
    to: "",
    body: "",
    mediaUrl: ""
  });
  const [errorObj, setErrorObj] = useState({
    to: "",
    body: ""
  })
  const [basicPhone, setBasicPhone] = useState({
      countryCode: "USA",
      dailCode: "+1",
      number: "",
      phone: ""
  });
  let zIndexSms = useSelector((state) => state.modal.zIndexSms);
  console.log("Initial State in header",zIndexSms);
  // let zIndexCall = useSelector((state) => state.modal.zIndexCall);
  // console.log("Initial State in header", zIndexCall);




  const fetchCountry = async () => {
    let conntryResponse = await ContactService.fetchCountry();
    setPhoneCountryCode(conntryResponse);
    console.log(conntryResponse, "country");
  };
  const [dependant, setDependant] = useState({
      ...initialDependentState,
  });

  const fetchContacts = async () => {
    let response = await ContactService.fetchUsers()
    console.log(response);
  }

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

  const getQueryParams = async () => {
    const keyword = utils.getQueryVariable("search");
    const srtBy = utils.getQueryVariable("sortBy");
    const srtType = utils.getQueryVariable("sortType");

    const queryParams = new URLSearchParams();

    // console.log("search", keyword);
    if (keyword) {
      queryParams.append("search", keyword);
    }
    if (srtBy) {
      queryParams.append("sortBy", srtBy);
    }
    if (srtType) {
      queryParams.append("sortType", srtType);
    }
    return queryParams;
  };

  const fetchSMS = async () => {
    let pageId = utils.getQueryVariable("page") || 1;
    let queryParams = await getQueryParams();
    try {
      setIsLoader(true);
      const result = await SMSServices.fetchSms(pageId, queryParams);
      if (result) {
        setSMSTemplates(result.templates);
      }
    } catch (e) {
      setIsLoader(false);
      console.log("Error in SMS template listing", e);
      setErrorMsg(e.message);
    } finally {
      setIsLoader(false);
    }
  };

  const [phoneCountryCode, setPhoneCountryCode] = useState([]);
  const [number, setNumber] = useState([]);

  const countrycodeOpt = phoneCountryCode ? phoneCountryCode.map((el, key) => {
      return (
          <option value={el.code} data-dailcode={el.prefix} key={key} >{el.code} ({el.prefix})</option>
      )
  }) : '';
  const handelBasicinfoMobilePhon = (event) => {
    const {name, value} = event.target;

    if(name == "countryCode"){
        const daileCodeindex = event.target[event.target.selectedIndex];
        let dailCode = daileCodeindex != undefined ? daileCodeindex.getAttribute("data-dailcode") : "+1";
        setBasicPhone(prevState => ({...prevState, dailCode: dailCode}));
        console.log("{...prevState, [name]: value}", daileCodeindex);
    }
    
    setBasicPhone(prevState => ({...prevState, [name]: value}));
};

const openSmsSuggestionHandler = (e) =>{
  console.log("event e.target.value ::: ", e.target.value, e.target.value.trim());
  const regexOfNumber = /^[0-9]{0,25}$/im
  // if(e.target.value.trim() === "") {
  //   setErrorObj({
  //     ...errorObj,
  //     to: "Please provide a contact number"
  //   });
  //   return;
  // }else 
  if(!e.target.value.match(regexOfNumber)){
    // setErrorObj({
    //   ...errorObj,
    //   to: "Please enter a valid contact number"
    // });
    return;
  }
  else {
    setErrorObj({
      ...errorObj,
      to: ""
    })
  }
  setNumber(e.target.value);
  setBasicPhone({
    ...basicPhone,
    phone: e.target.value
  })
  setEditMsgObj({
    ...editMsgObj,
    to: basicPhone.dailCode + e.target.value
  })
  setContactOptions(false)
  setToggleContactList({
    status: false,
    contacts: [],
    isCross: false,
  });
  setDependant({
    ...initialDependentState,
  })
}

const selectTemplate = (e) => {
  if(e.target.value != "null") {
    setSelectedTemplate(smsTemplates.filter(tmp => tmp._id == e.target.value)[0])
    setEditMsgObj({
      ...editMsgObj,
      body: smsTemplates.filter(tmp => tmp._id == e.target.value)[0].message.trimStart().trimEnd()
    })

    setErrorObj({
      ...errorObj,
      body: ""
    })
  } else {
    setSelectedTemplate(null)
    setEditMsgObj({
      to: "",
      body: ""
    })
  }
}

const setMessageObj = (e) => {
  if(e.target.value.trim() != "") {
    setErrorObj({
      ...errorObj,
      body: ""
    })
  }
  else {
    setErrorObj({
      ...errorObj,
      body: "Please fill up sms body before sending."
    })
  }
  let editText = e.target.value;
  setEditMsgObj({
    ...editMsgObj,
    body: editText
  })
}

// ADD Keyword to Edit SMS template
const addKeywordEdit = (e) => {
  e.preventDefault();
  let textBox = messageTextbox.current;
  let cursorStart = textBox.selectionStart;
  let cursorEnd = textBox.selectionEnd;
  let textValue = textBox.value;

  // console.log();

  try {
    setErrorObj({
      ...errorObj,
      body: ""
    })
    if (cursorStart || cursorStart == "0") {
      // console.log("VIA CURSOR");
      var startToText = "";
      // console.log(textBox.selectionStart);
      textBox.value =
        textBox.value.substring(0, cursorStart) +
        "[" +
        e.target.textContent +
        "]" +
        textBox.value.substring(cursorEnd, textValue.length);

      setEditMsgObj({
        ...editMsgObj,
        body: textBox.value,
      });

      // console.log("editMsgObj", editMsgObj, textBox.value);

      startToText =
        textBox.value.substring(0, cursorStart) +
        "[" +
        e.target.textContent +
        "]";
      textBox.focus();
      textBox.setSelectionRange(
        startToText.length + 1,
        startToText.length + 1
      );
      // console.log(startToText.length);
    } else {
      // console.log("VIA END POINT");

      textBox.value = textBox.value + "[" + e.target.textContent + "]";
      setEditMsgObj({
        ...editMsgObj,
        body: textBox.value,
      });
      textBox.focus();
    }
  } catch (err) {
    // console.log(err);
  }
};

const submitMessage = async (e) => {
  e.preventDefault()

  console.log(editMsgObj);

  let errorObjPlaceholder = {...errorObj}

  if(editMsgObj.body.trim() == ""){
    errorObjPlaceholder.body = "Please fill up sms body before sending."
    console.log(errorObjPlaceholder);
  }
  if(editMsgObj.to.trim() == "" || basicPhone.phone.trim() == "") {
    errorObjPlaceholder.to = "Please provide a valid number before sending."
    console.log(errorObjPlaceholder);
  }

  if((editMsgObj.to.trim() != "" && basicPhone.phone.trim() != "") && editMsgObj.body.trim() != "") {
    setIsLoader(true)

    let editMsgObjPlaceholder = {...editMsgObj}
        editMsgObjPlaceholder.to = basicPhone.dailCode + basicPhone.phone
        editMsgObjPlaceholder.body = editMsgObjPlaceholder.body.trimStart().trimEnd()

    try {
      const result = await SMSServices.sendSMS(editMsgObjPlaceholder) //TRIM THE LAST AND FIRST SPACE
      
      if(result) {
        console.log(editMsgObjPlaceholder);
        setIsLoader(false)
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: `SMS sent to ${editMsgObjPlaceholder.to}`,
          typeMessage: 'success'
        });

        errorObjPlaceholder.to = ""
        errorObjPlaceholder.body = ""
        props.smsModalOff()
      }
    } catch (error) {
      console.log("error", error.message);
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: error.message,
        typeMessage: 'error'
      });
      setIsLoader(false)
    } finally {
      setIsLoader(false)
    }
  }

  setErrorObj(errorObjPlaceholder)
}

useEffect(()=>{
  console.log("errorObj", errorObj);
},[errorObj])

const handelChangeContactImage = (event) => {
  inputFile.current.click();
}
const getRandomFileName = () => {
  let timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  let random = ("" + Math.random()).substring(2, 8);
  return timestamp + random;
}

const getBase64 = file => {
  return new Promise(resolve => {
    let baseURL = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};

const uploadImage = (event) => {
  setImgLoader(true)
  let file = event.target.files[0];
  let allowedExtension = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  let extension = file.name.substring(file.name.lastIndexOf('.') + 1);

  if (file && (allowedExtension.indexOf(file.type) > -1) && file.size < 5000000) {
      let newFileName = getRandomFileName() + '.' + extension;
      Object.defineProperty(file, 'name', {
          writable: true,
          value: newFileName
      });
      getBase64(file).then(async result => {
        if(result){
          const res = await SMSServices.uploadImage({
            file: result
          })

            if(res) {
              setEditMsgObj({
                ...editMsgObj,
                mediaUrl: res.originalUrl
              })
              setImgLoader(false);
          }
        }
      }).catch(err => {
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: err,
          typeMessage: 'error'
        });
      })
  }
  if(file.size > 5000000) {
    inputFile.current.value = ""
    dispatch({
      type: actionTypes.SHOW_MESSAGE,
      message: "File size should be less than 5mb",
      typeMessage: 'error'
    });
    setImgLoader(false);
  }
  if(allowedExtension.indexOf(file.type) == -1) {
    inputFile.current.value = ""
    dispatch({
      type: actionTypes.SHOW_MESSAGE,
      message: "Only image formats (jpeg, jpg, png, gif) allowed.",
      typeMessage: 'error'
    });
    setImgLoader(false);
  }
}

const handleContactName = async (e) => {
    e.preventDefault();

    if (e.target.value.trim() !== "") {
      
    }
    //Set dependant name
    setDependant({...dependant, name: e.target.value});

    //Name character limit
    if (e.target.value.length >= 30) {
        //Length 30 char limit
        console.log("char checking");
        setIsDisabled(true);
    }
    //Name special character checking
    let isSpecialCharacterformat = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (isSpecialCharacterformat.test(e.target.value)) {
        console.log("Special checkig");
        
        setIsDisabled(true);
    }
    if (
        e.target.value.length >= 3 &&
        e.target.value.length <= 30 &&
        !isSpecialCharacterformat.test(e.target.value)
    ) {
        try {
            setProcessing(true);
            let operationMethod = "searchContacts";
            let payload = {
                guardianId: 0,
                keyword: e.target.value,
            };
            await DependentServices[operationMethod](payload).then((result) => {
                setToggleContactList({
                    ...toggleContactList,
                    contacts: result.contacts,
                    status: true,
                });
                // if (result && result.contacts.length) {
                // }
            });
        } catch (e) {
            console.log("Error in contact search: ", e);
        } finally {
            setProcessing(false);
            setIsDisabled(false);
        }
    }

    if(e.target.value.trim() == "") {
        setToggleContactList({
            status: false,
            contacts: [],
            isCross: false,
        });
    }
}
const resetContactName = (e) => {
    e.preventDefault();
    
    setDependant({name: "", contactId: ""});
    
    setToggleContactList({
        ...toggleContactList,
        status: false,
        contacts: [],
        isCross: false,
    });
    setEditMsgObj({
      ...editMsgObj,
      to: ""
    })

    setBasicPhone({
      countryCode: "USA",
      dailCode: "+1",
      number: "",
      phone: ""
    })
};
const handleContactSelect = (e, contact) => {
  // console.log(contact.phone.number);
    setEditMsgObj({
      ...editMsgObj,
      to: contact.phone.full_number
    })

    setBasicPhone({
      ...basicPhone,
      dailCode: contact.phone.dailCode,
      countryCode: contact.phone.countryCode,
      phone: contact.phone.number
    })
    
    setDependant({
        name: contact.firstName + " " + (contact.lastName ? contact.lastName : ""),
        contactId: contact._id,
    });
    
    setToggleContactList({
        ...toggleContactList,
        status: false,
        contacts: [],
        isCross: true,
    });

    setContactOptions(false)
    
    setErrorObj({
      ...errorObj,
      to: ""
    })
};

useEffect(() => {
    fetchCountry();
    fetchSMS()
    fetchSMSTags()
    fetchContacts()
}, []);

function useOutsideAlerter(ref) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setKeywordSuggesion(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}


const keywordRef = useRef(null);
  
useOutsideAlerter(keywordRef);  


 return (
   <div className="sideMenuOuter" style={{zIndex: zIndexSms}}>
    <div className="dialogBg" onClick={props.smsModalOff}></div>
     {isLoader ? <Loader /> : ""}

     <div className="sideMenuInner smsGlobal">
      
       <div className="modal_call_header">
         <button className="btn btn_empty" onClick={props.smsModalOff}>
           <img src={whiteCross} alt="" />
         </button>
         <h3>Send an SMS</h3>
         <p>Enter number to SMS</p>
         <div
           className={
             errorObj?.to?.trim() != ""
               ? "numberForCall error"
               : "numberForCall"
           }
         >
           <form className="cont">
             <div className="leftSide">
               <div className="countryCode cmnFieldStyle">
                 <div className="countryName">{basicPhone.countryCode}</div>
                 <div className="daileCode">{basicPhone.dailCode}</div>
                 <select
                   className="selectCountry"
                   name="countryCode"
                   defaultValue={basicPhone.countryCode}
                   onChange={handelBasicinfoMobilePhon}
                 >
                   {countrycodeOpt}
                 </select>
               </div>
             </div>
             <div className="rightSide">
               <input
                 type="text"
                 placeholder="Eg. 12345678"
                 value={basicPhone.phone}
                 onChange={(e)=>openSmsSuggestionHandler(e)}
                 readOnly={contactOptions}
               />
               {console.log("basicPhone", basicPhone)}
             </div>
             {errorObj?.to?.trim() != "" ? (
               <p className="errorMsg">{errorObj.to}</p>
             ) : (
               ""
             )}
           </form>
         </div>
       </div>
       <div className="modalMakeSmsBody">
         <p className="numberFromContact text-right">
           <button
             className="btn linkType"
             onClick={(e) => setContactOptions(!contactOptions)}
           >
             <img src={lineUser} alt="" /> {contactOptions ? "Close Contact Search" : "Choose from Contacts"}
           </button>
         </p>

         {contactOptions && (
           <div className="getContactsforMsg" ref={contactSelect}>
             <div
               className={
                 toggleContactList.status
                   ? `cmnFormField listActive`
                   : `cmnFormField`
               }
             >
               <input
                 className={processing ? "cmnFieldStyle loading" : "cmnFieldStyle"}
                 type="text"
                 style={{
                   backgroundImage: toggleContactList.status
                     ? `url(${updown})`
                     : "",
                 }}
                 placeholder="Eg. Name"
                 onChange={(e) => handleContactName(e)}
                 value={dependant.name ? dependant.name : ""}
                 disabled={toggleContactList.isCross}
               />
               {toggleContactList.isCross ? (
                 <button
                   className="btn crossContact"
                   onClick={(e) => resetContactName(e)}
                 >
                   <img src={cross} alt="cross" />
                 </button>
               ) : (
                 ""
               )}
               {toggleContactList.status && (
                 <>
                 {/* .filter(contactItem => contactItem.phone && contactItem.phone.number.trim() != "") */}
                 {toggleContactList.contacts.filter(contactItem => contactItem.phone && contactItem.phone.number.trim() != "").length > 0 ? (
                   <div className="contactListItems">
                     <ul>
                         {toggleContactList.contacts.filter(contactItem => contactItem.phone && contactItem.phone.number.trim() != "").map((contact) => (
                           <li
                             key={contact._id}
                             data-id={contact._id}
                             onClick={(e) => {
                               handleContactSelect(e, contact);
                             }}
                             className="appContact"
                           >
                             <figure
                               style={{
                                 backgroundColor: `rgb(${Math.floor(
                                   Math.random() * 256
                                 )},${Math.floor(
                                   Math.random() * 256
                                 )},${Math.floor(Math.random() * 256)})`,
                               }}
                             >
                               {console.log(
                                 `rgb(${Math.floor(
                                   Math.random() * 256
                                 )},${Math.floor(
                                   Math.random() * 256
                                 )},${Math.floor(Math.random() * 256)})`
                               )}
                               {contact.firstName ? contact.firstName[0] : ""}
                               {contact.lastName ? contact.lastName[0] : ""}
                             </figure>
                             <p>
                               <span>
                                 {(contact.firstName ? contact.firstName : "") +
                                   " " +
                                   (contact.lastName ? contact.lastName : "")}
                               </span>
                               {contact.email ? (
                                 <small>{contact.email}</small>
                               ) : (
                                 ""
                               )}
                             </p>
                           </li>
                         ))}
                     </ul>
                   </div>
                   ) : (
                     <div className="noContactFound">No Contact Found</div>
                   )}
                 </>
               )}
             </div>
           </div>
         )}
         <div className="makeSmsForm">
           <div className="slice">
             <label>Create a Message</label>
             <p>
               {editMsgObj?.body?.length > 0 ? editMsgObj?.body?.length : 0}/160
               SMS - One message contains 160 chatracters max (SMS count can be
               changed if you are using keyword variable e.g. [fname])
             </p>
           </div>

           <form onSubmit={submitMessage}>
             <div className="slice">
               <label>
                 SMS Templates <span>(Optional)</span>
               </label>

               <div className="cmnFormField">
                 <select
                   type="text"
                   className="cmnFieldStyle btnSelect"
                   value={selectedTemplate ? selectedTemplate._id : "null"}
                   onChange={(e) => selectTemplate(e)}
                 >
                   <option value="null">Select Template</option>
                   {smsTemplates &&
                     smsTemplates.map((template, i) => (
                       <option value={template._id} key={"option-" + i}>
                         {template.title}
                       </option>
                     ))}
                 </select>
               </div>

               <div
                 className={
                   errorObj?.body.trim() != ""
                     ? "cmnFormField error"
                     : "cmnFormField"
                 }
               >
                 <textarea
                   className="cmnFieldStyle"
                   value={editMsgObj?.body}
                   onChange={(e) => setMessageObj(e)}
                   ref={messageTextbox}
                 ></textarea>
                 <button
                   className="btn browseKeywords"
                   style={{
                     marginRight: "0",
                     padding: "0",
                   }}
                   onClick={(e) => {
                     e.preventDefault();
                     setKeywordSuggesion(true);
                   }}
                 >
                   <img src={browse_keywords} alt="keywords" />
                 </button>

                 {keywordSuggesion && (
                   <div className="keywordBox" ref={keywordRef}>
                     <div className="searchKeyword">
                       <div className="searchKeyBox">
                         <input
                           type="text"
                           onChange={(e) => setSearchTagString(e.target.value)}
                         />
                       </div>
                       <div className="cancelKeySearch">
                         <button
                           onClick={() => setKeywordSuggesion(false)}
                         ></button>
                       </div>
                     </div>
                     <div className="keywordList">
                       <ul>
                         {smsTags
                           .filter(
                            (smsTag) =>
                                smsTag.id.toLowerCase().indexOf(searchTagString) >= 0 
                                && smsTag.id !== "tags"
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
                                   addKeywordEdit(e, tagItem.id)
                                 }
                               >
                                 {tagItem.id}
                               </button>
                             </li>
                           ))}
                       </ul>
                     </div>
                   </div>
                 )}
                 {errorObj?.body.trim() != "" ? (
                   <p className="errorMsg">{errorObj.body}</p>
                 ) : (
                   ""
                 )}
               </div>
             </div>

             <div className="slice">
               <label>Upload file to send this message as MMS</label>
               <div
                 className={`cmnFormField upload cmnFieldStyle ${
                   imgLoader ? "loading" : ""
                 }`}
               >
                 <input
                   type="file"
                   id="file"
                   ref={inputFile}
                   onChange={uploadImage}
                 />
                 <span>Choose File</span>
               </div>
             </div>

             <div className="slice text-center">
               <button className="cmnBtn" disabled={imgLoader}>
                 Send SMS <img src={arrow_forward} alt="" />
               </button>
             </div>
           </form>
         </div>
       </div>
     </div>
   </div>
 );
};


export default SmsModal;