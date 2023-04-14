import React, { useEffect, useState, useReducer , useRef} from "react";
import { ContactService } from "../../services/contact/ContactServices";
import lineUser from "../../assets/images/lineUser.svg";
import makeCall from "../../assets/images/makeACall.svg";
import makeCall2 from "../../assets/images/calliconbig.svg";
import whiteCross from "../../assets/images/cross_white.svg";
import hand from "../../assets/images/hand.svg";
import searchicon from "../../assets/images/search_icon.svg";
import iconBrowse from "../../assets/images/icon_browse_keywords.svg";
import modalReducer from "../../reducers/modalReducer";
import {useDispatch, useSelector} from 'react-redux';
import {DependentServices} from "../../services/contact/DependentServices";
import cross from "../../assets/images/cross.svg";
import updown from "../../assets/images/updown.png";

const initialDependentState = {
  name: "",
  contactId: "",
};

const CallModal = (props) => {
  
  const fetchCountry = async () => {
    let conntryResponse = await ContactService.fetchCountry();
    setPhoneCountryCode(conntryResponse);
    console.log(conntryResponse, "country");
};
const contactSelect = useRef(null)

useEffect(() => {
    fetchCountry();
}, []);
const dispatch = useDispatch();
const [phoneCountryCode, setPhoneCountryCode] = useState([]);
const [number, setNumber] = useState([]);
const countrycodeOpt = phoneCountryCode ? phoneCountryCode.map((el, key) => {
      return (
          <option value={el.code} data-dailcode={el.prefix} key={key} >{el.code} ({el.prefix})</option>
      )
  }) : '';
  const [basicinfoMobilePhone, setBasicinfoMobilePhone] = useState({
      countryCode: "USA",
      dailCode: "+1",
      number: "1234567890"
  });
  const handelBasicinfoMobilePhon = (event) => {
    const {name, value} = event.target;
    if(name == "countryCode"){
        const daileCodeindex = event.target[event.target.selectedIndex];
        let dailCode = daileCodeindex != undefined ? daileCodeindex.getAttribute("data-dailcode") : "+1";
        setBasicinfoMobilePhone(prevState => ({...prevState, dailCode: dailCode}));
    }
    
    setBasicinfoMobilePhone(prevState => ({...prevState, [name]: value}));

};
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

const [isDisabled, setIsDisabled] = useState(false);
const [processing, setProcessing] = useState(false);

const [dependant, setDependant] = useState({
    ...initialDependentState,
});

const fetchContacts = async () => {
  let response = await ContactService.fetchUsers()
  console.log(response);
}
const [callSuggetion, setCallSuggetion] = useState(false);
const [contactOptions, setContactOptions] = useState(false)


const closeCallSugession = () =>{
  setCallSuggetion(false)
}
const [keywordSuggesion, setKeywordSuggesion] = useState(false);
const openKeywordSuggesionHandler = () =>{
  setKeywordSuggesion(true)
}
const closekeywordSuggesion = () =>{
  setKeywordSuggesion(false)
}
const [wasStat, setWasStat] = useState(false);
const togggerBtn = () =>{
  setWasStat(!wasStat);
}
const [openOtherPart, setOpenOtherPart] = useState(false);
const showNextPartHandler = () =>{
  setOpenOtherPart(true);
}
const hideNextPartHandler = () =>{
  setOpenOtherPart(false);
}
const makeCall = () => {
  console.log("dasdasdasdasdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss", basicinfoMobilePhone)
    props.makeOutgoingCall(basicinfoMobilePhone.dailCode + basicinfoMobilePhone.phone);
    props.callModalOff();
}
  let zIndexCall = useSelector((state) => state.modal.zIndexCall);
  console.log("Initial State in header", zIndexCall);


//choose from contact
// const openCallSuggestionHandler = (e) =>{
//   setNumber(e.target.value);
//   //setCallSuggetion(true)
// }
const openCallSuggestionHandler = (e) =>{
    console.log("event e.target.value ::: ", e.target.value, e.target.value.trim());
    const regexOfNumber = /^[0-9]{0,25}$/im
 
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
    setBasicinfoMobilePhone({
      ...basicinfoMobilePhone,
      phone: e.target.value
    })
    setEditMsgObj({
      ...editMsgObj,
      to: basicinfoMobilePhone.dailCode + e.target.value
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

  setBasicinfoMobilePhone({
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

  setBasicinfoMobilePhone({
    ...basicinfoMobilePhone,
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








 return(
    <div className="sideMenuOuter" style={{zIndex: zIndexCall}}>
    <div className="dialogBg" onClick={props.callModalOff}></div>
    <div className="sideMenuInner makeCall">
      <div className="modal_call_header">
       <button className="btn btn_empty" onClick={props.callModalOff}><img src={whiteCross} alt=""/></button>
        <h3>Make a call</h3>
        <p>Enter number to Call</p>
        <div className="numberForCall">
          <form className="cont">
            <div className="leftSide">
                <div className="countryCode cmnFieldStyle">
                    <div className="countryName">{basicinfoMobilePhone.countryCode}</div>
                    <div className="daileCode">{basicinfoMobilePhone.dailCode}</div>
                    <select className="selectCountry" name="countryCode" 
                       defaultValue={basicinfoMobilePhone.countryCode} 
                       onChange={handelBasicinfoMobilePhon}>
                        {countrycodeOpt}
                    </select>
                </div>
            </div>
            <div className="rightSide">
              <input type="text" 
               value={basicinfoMobilePhone.phone}
               placeholder="Eg. 5555551234" onChange={openCallSuggestionHandler}/>
            </div>
            
          </form>
        </div>
      </div>
      <div className="modalMakeCallBody">
        <div className="numberFromContact text-right">
        <button
             className="btn linkType"
             onClick={(e) => setContactOptions(!contactOptions)}
           >
             <img src={lineUser} alt="" /> {contactOptions ? "Close Contact Search" : "Choose from Contacts"}
           </button>
        </div>

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
        <div className="makeCallForm">
 
            {/* <div className="slice">
              <label>Select Call Type</label>
              <div className="radioPlace">
                <label>
                  <div className="circleRadio">
                      <input type="radio" name="name1" onChange={showNextPartHandler} defaultChecked={openOtherPart}/>
                      <span></span>
                  </div>
                  Pre-Recorded Call
                </label>
              </div>
              <div className="radioPlace">
                <label>
                  <div className="circleRadio">
                      <input type="radio" name="name1" onChange={hideNextPartHandler} defaultChecked={!openOtherPart}/>
                      <span></span>
                  </div>
                  Browser Call
                </label>
              </div>
            </div>
              {openOtherPart && <div className="openOnChecked"> 
                <div className="slice">
                  <label>Select Record Type</label>
                  <div className="radioPlace">
                    <label>
                      <div className="circleRadio">
                          <input type="radio" name="name2"/>
                          <span></span>
                      </div>
                      Upload Audio
                    </label>
                  </div>
                  <div className="radioPlace">
                    <label>
                      <div className="circleRadio">
                          <input type="radio" name="name2"/>
                          <span></span>
                      </div>
                      Select from recordings
                    </label>
                  </div>
                  <div className="radioPlace">
                    <label>
                      <div className="circleRadio">
                          <input type="radio" name="name2"/>
                          <span></span>
                      </div>
                      Record new
                    </label>
                  </div>
                  <div className="space20">
                    Upload Audio File
                  </div>
                  <div className="upload">
                    <input type="file" />
                    <span>Choose File</span>
                  </div>
                </div>
                <div className="slice">
                  <label className="widthAuto">Also Send SMS </label>
                  <label
                    className={
                      wasStat ? "toggleBtn active" : "toggleBtn"
                      }
                    >
                    <input
                      type="checkbox"
                      onChange={togggerBtn}
                    />
                    <span className="toggler"></span>
                  </label>
                  <p className="space10">Message</p>
                  <small>153/0 SMS - One message contains 153 chatracters max (SMS count can be changed if you are using keyword variable e.g. [fname])</small>  
                  <textarea></textarea>
                  <button className="browseKeywords" onClick={setKeywordSuggesion}><img src={iconBrowse} alt=""/></button>
                  {keywordSuggesion && 
                    <div className="keywordBox">
                    <div className="searchKeyword">
                        <div className="searchKeyBox">
                            <input type="text" />
                        </div>
                        <div className="cancelKeySearch">
                            <button onClick={closekeywordSuggesion}></button>
                        </div>
                        </div>
                        <div className="keywordList">
                            <ul>
                                <li><button>First Name</button></li>
                                <li><button>Last Name</button></li>
                                <li><button>Address</button></li>
                                <li><button>City</button></li>  
                                <li><button>Country</button></li>
                            </ul>
                        </div>
                    </div>
                  }
                  
                </div>
              </div> 
             } */}
                <div className="text-center">
                  <button className="makeAcallBtn" onClick={makeCall} ><img src={makeCall2} alt=""/></button>
                </div>
                <div className="text-center"><div className="callSugession">Tap <img src={hand} alt=""/> to start call</div></div>
              
        </div>
     
      </div>
    </div>
  </div>

   )
};


export default CallModal;