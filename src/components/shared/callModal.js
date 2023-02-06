import React, { useEffect, useState, useReducer } from "react";
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




const CallModal = (props) => {
  
  const fetchCountry = async () => {
    let conntryResponse = await ContactService.fetchCountry();
    setPhoneCountryCode(conntryResponse);
    console.log(conntryResponse, "country");
};

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

const [callSuggetion, setCallSuggetion] = useState(false);
const openCallSuggestionHandler = (e) =>{
  setNumber(e.target.value);
  //setCallSuggetion(true)
}
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
    props.makeOutgoingCall(basicinfoMobilePhone.dailCode + number);
    props.callModalOff();
}
  let zIndexCall = useSelector((state) => state.modal.zIndexCall);
  console.log("Initial State in header", zIndexCall);


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
                    <select className="selectCountry" name="countryCode" defaultValue={basicinfoMobilePhone.countryCode} onChange={handelBasicinfoMobilePhon}>
                        {countrycodeOpt}
                    </select>
                </div>
            </div>
            <div className="rightSide">
              <input type="text" placeholder="Eg. 5555551234" onChange={openCallSuggestionHandler}/>
            </div>
            {/* {callSuggetion && 
                <div className="callSuggessionBox">
                  <div className="searchCall">
                    <img src={searchicon} alt=""/>
                    <input type="search"/>
                    <div className="cancelKeySearch">
                        <button onClick={closeCallSugession}></button>
                    </div>
                  </div>
                  <ul>
                  <li><button>
                          <div className="profilePic">SE</div>
                          <div className="profileName">Sabbir Mustaque</div>
                          <div className="number">+1 222 333 4444</div>
                      </button></li>
                      <li><button>
                          <div className="profilePic">SE</div>
                          <div className="profileName">Sabbir Mustaque</div>
                          <div className="number">+1 222 333 4444</div>
                      </button></li>
                      <li><button>
                          <div className="profilePic">SE</div>
                          <div className="profileName">Sabbir Mustaque</div>
                          <div className="number">+1 222 333 4444</div>
                      </button></li>
                      <li><button>
                          <div className="profilePic">SE</div>
                          <div className="profileName">Sabbir Mustaque</div>
                          <div className="number">+1 222 333 4444</div>
                      </button></li>
                      <li><button>
                          <div className="profilePic">SE</div>
                          <div className="profileName">Sabbir Mustaque</div>
                          <div className="number">+1 222 333 4444</div>
                      </button></li>
                      <li><button>
                          <div className="profilePic">SE</div>
                          <div className="profileName">Sabbir Mustaque</div>
                          <div className="number">+1 222 333 4444</div>
                      </button></li>
                  </ul>
                </div>
            } */}
          </form>
        </div>
      </div>
      <div className="modalMakeCallBody">
        {/* <div className="text-right"><a href="javascript:void(0)" className="linkType">
          <img src={lineUser} alt=""/> Choose from Contacts</a>
        </div> */}
        <div className="makeCallForm">
 
            <div className="slice">
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
             }
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