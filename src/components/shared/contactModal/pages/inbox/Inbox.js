import React, { useEffect, useRef, useState } from "react";

import Loader from "../../../Loader";
import iconSmsOut from "../../../../../assets/images/iconSmsOut.svg";
import iconSmsIn from "../../../../../assets/images/iconSmsIn.svg";
import iconCallOut from "../../../../../assets/images/iconCallOut.svg";
import iconCallIn from "../../../../../assets/images/iconCallIn.svg";
import iconEmailOut from "../../../../../assets/images/iconEmailOut.svg";
import iconEmailIn from "../../../../../assets/images/iconEmailIn.svg";
import smallPh from "../../../../../assets/images/smallPh.svg";
import smalCalendar from "../../../../../assets/images/smalCalendar.svg";
import arrowDown from "../../../../../assets/images/arrowDown.svg";
import browsTextarea from "../../../../../assets/images/browsTextarea.svg";
import arrowRightWhite from "../../../../../assets/images/arrowRightWhite.svg";
import Player from "../../../Player";
import "../../../../../assets/css/communicationLog.css";
import OpenPanel from "./OpenPanel.js";
import {utils} from "../../../../../helpers";
import moment from "moment";
import {communicationLogServices} from  "../../../../../services/communicationLog/communicationLogServices";
import { Scrollbars } from "react-custom-scrollbars-2";
import EnlargeInbox from "./EnlargeInbox";

const Inbox = (props) => {
  const comLogRef = useRef();

  const [contactID, setContactID] = useState("");
  const [contactGenData, setContactgendata] = useState(props.contact);

  //fetchInboxLog
  const [contactLogData , setContactLogData] = useState([]);
  const [isLoaderScroll, setIsLoaderScroll] = useState(false);
	const [isScroll, setIsScroll] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [device, setDevice] = useState(props.device);
  useEffect(() => {
    setDevice(props.device);
  }, [props.device]);
  const [paginationData, setPaginationData] = useState({
		offset: 0, 
		limit: 10, 
		page: "1", 
		totalCount: null
    });

   const fetchInboxLogList = async (pageId) => {
     //let pageId  = 1;
     let contact_id = props.contactId;
	 	try {
	 		setIsLoader(true);

	 		setIsScroll(true);
      setIsLoaderScroll(true);
	 		const result = await communicationLogServices.fetchInboxLog(pageId, contact_id);
	 		if (result) {
				
	 			if (result.pagination.page == "1") {
	 				setContactLogData(result.data.logs);
	 		   // console.log("gggggggggggggggggggggggggggggggggggggggggggggggggg",contactLogData);

	 			} else {
	 				setContactLogData([...contactLogData, ...result.data.logs]);
	 			}
	 			        setPaginationData({
                       ...paginationData,
                       offset: result.pagination.offset, 
                     limit: result.pagination.limit, 
                     page: result.pagination.page, 
                     totalCount: result.pagination.totalCount
                   });
	 		}
	 		setIsScroll(false);

	 	} catch (e) {
	
	 	} finally {
	 	setIsLoader(false);
	 	setIsLoaderScroll(false);
	 	}
	 };
  
  //console.log( props.contactId);
  const [newEmailData, setnewEmailData] = useState([]);
  const [showEmailmodal, setShowEmailmodal] = useState(false);
  const [contentShowInModal, setContentShowInModal] = useState({
    message: "",
    subject: "",
    template: "",
    direction:"",
    type : "",
  });
  

  const emailplaceholdingData = (data)=>{
   // props.emailplaceholdingData(data) 
    var date = new Date();
    const keys = Object.keys(contactGenData);
    let subject = data.subject; 
    let template = utils.decodeHTML(data.template); 
    keys.map(el => {
      subject = subject.replaceAll('[' + el + ']', contactGenData && contactGenData[el] ? contactGenData[el] : "");
      subject = subject.replace(/  +/g, ' ');
      template = template.replaceAll('[' + el + ']', contactGenData && contactGenData[el] ? contactGenData[el] : "");
      template = template.replace(/  +/g, ' ');
    });
    setnewEmailData(current => [
      {
        ...newEmailData,
        log_type: "EMAIL",
        subject: subject,
        template: template,
        date:  moment( date).format('MMM Do YYYY h:mm A')
      }
      , ...current])
    //console.log("to add data in the list for email" , newEmailData);

  }
  const smsPlaceholdingData = (data)=>{
    var date = new Date();
    const keys = Object.keys(contactGenData);
    let body = data.body;
    keys.map(el => {
     // body = body.replace("[" + el + "]" , contactGenData && contactGenData[el] ? contactGenData[el] : "");

      body = body.replaceAll("[" + el + "]", contactGenData && contactGenData[el] ? contactGenData[el] : "");
      body = body.replace(/  +/g, ' ');
      console.log(body);
    });
    setnewEmailData(current => [
       {...newEmailData,
         log_type: "SMS",
         message: body,
         date:  moment( date).format('MMM Do YYYY h:mm A')
       }
       , ...current])
   }


 useEffect(() => {
  fetchInboxLogList(1);
  }, []); 

  const listPageNo = (e) => {

		if (!isScroll) {
		  let scrollHeight = e.target.scrollHeight;
		  let scrollTop = e.target.scrollTop;
		  //console.log("scrollHeightdddddddddddddddddddddddddd", scrollHeight, "scrollTopddddddddddddddddddd", scrollTop);

		  if (scrollTop > (scrollHeight / 2 )) {
        //if(contactLogData.length === 10){
          
          fetchInboxLogList( parseInt(paginationData.page) + 1 );
        //}
		  }
		}
	  };

  const showBigMail = (data, type, direction) =>{
    if(type === "SMS"){
      setContentShowInModal({
        ...contentShowInModal,
        message : data.message,
        direction :direction,
        type : type,
      })
      console.log(contentShowInModal);
    }else if(type === "EMAIL"){
      console.log(data.subject)
      console.log(data.template)
      setContentShowInModal({
        ...contentShowInModal,
        subject : data.subject,
        template : data.template,
        direction : direction,
        type : type,
      })
      console.log(contentShowInModal);

    }
    setShowEmailmodal(true)
  }
  const closeModal =(e) =>{
  //e.preventDefault();
    setShowEmailmodal(false)
    setContentShowInModal({
      ...contentShowInModal,
      message: "",
      subject: "",
      template: "",
      direction:"",
      type : "",
    })
  }
  
  const showBigMailStatic = (data, type) =>{
    if(type === "SMS"){
      setContentShowInModal({
        ...contentShowInModal,
        message : data.message,
        direction :"outbound",
        type : type,
      })
      console.log(contentShowInModal);
    }else if(type === "EMAIL"){
      console.log(data.subject)
      console.log(data.template)
      setContentShowInModal({
        ...contentShowInModal,
        subject : data.subject,
        template : data.template,
        direction :"outbound",
        type : type,
      })
      console.log(contentShowInModal);

    }
    setShowEmailmodal(true)
  }



  
  return (
    <>
    {isLoader ? <Loader/> :""} 
    

   
   <div className="contactTabsInner" >
   <Scrollbars renderThumbVertical={(props) => <div className="thumb-vertical" />} onScroll={listPageNo}> 
    <div className="inboxPage" ref={comLogRef} >
    {/* {
       ( newSmsData.length> 0)  ? 
       
        newSmsData.map((elem, key)=>{
        return(
          <div className="inboxChat outgoingChat" key={key}>
              <div className="msgTypeIcon">
                <img src={iconSmsOut}
                      alt=""/>
              </div>
              <div className="txtArea">
                {
                  <>
                  <h3>{elem.message}</h3>
                  
                  </>
                }               
                <div className="info">
                  <span><img src={smalCalendar}/>{ elem.date}</span>
                </div>
              </div>
            </div>
        )
       })
       :""
    }   */}
    {
       ( newEmailData.length> 0) &&
       
        newEmailData.map((elem, key)=>{
        return(
          <div className="inboxChat outgoingChat" key={key}>
              <div className="msgTypeIcon">
                <img src={elem.log_type === "EMAIL" ? iconEmailOut : iconSmsOut}
                      alt=""/>
              </div>
              <div className="txtArea">
                 <div className="areaOfText">
                {
                  elem.log_type === "EMAIL" ?
                  <>
                  <h3>Sub: {elem.subject}</h3>
                  <div className="emailBody" dangerouslySetInnerHTML={{__html :elem.template }}>
                   {/* {utils.decodeHTML(elem.template)} */}
                  </div>
                  </>
                 :
                  <h3>{elem.message}</h3>
                }
                </div>
                {
               ((elem.template) ? elem.template.length : "" )+
               ((elem.subject) ? elem.subject.length : "") > 250 ? <button onClick={()=>showBigMailStatic(elem, elem.log_type)} className="noBg">load more</button> :                
               elem?.message && elem.message.length > 250 ? <button onClick={()=>showBigMailStatic(elem.data, elem.log_type)}  className="noBg">load more</button> :
               ""

                }
                
                
                  <div className="info">
                    {/* <span><img src={smallPh}/>({elem.from}) SMS NUMBER.</span> */}
                    <span><img src={smalCalendar}/>{ elem.date}</span>
                  </div>
                
              </div>
            </div>
        )
       })
       
    }
    {contactLogData && contactLogData.length > 0 &&
        contactLogData.map((elem, key)=>{
          return(
            <div className={elem.direction === "inbound" ? "inboxChat incomingChat" : "inboxChat outgoingChat"}  key={key}>
              <div className="msgTypeIcon">
                <img src={elem.direction === "inbound" ? (elem.log_type === "SMS" ? iconSmsIn : iconEmailIn ) :  (elem.log_type === "SMS" ? iconSmsOut : iconEmailOut )}
                      alt=""/>
              </div>
              <div className="txtArea">
                <div className="areaOfText">
                {
                  elem.log_type === "SMS" ?
                  <h3>{elem.data.message}.</h3>
                  :
                  <>
                  <h3>Sub: {elem.data.subject}</h3>
                  <div className="emailBody" dangerouslySetInnerHTML={{__html: elem.data.template}}>
                   
                  </div>
                  </>
                }
               </div>
                {
               

               ((elem.data.template) ? elem.data.template.length : "" )+
               ((elem.data.subject) ? elem.data.subject.length : "") > 250 ? <button onClick={()=>showBigMail(elem.data, elem.log_type, elem.direction)} className="noBg">load more</button> :                
               elem.data?.message && elem.data.message.length > 250 ? <button onClick={()=>showBigMail(elem.data, elem.log_type, elem.direction)}  className="noBg">load more</button> :
               ""

                }
                <div className="info">
                  {/* <span><img src={smallPh}/>({elem.from}) SMS NUMBER.</span> */}
                  <span><img src={smalCalendar}/>{ moment(elem.updated_at).format('MMM Do YYYY h:mm A')}</span>
                </div>
              </div>
            </div>
          )
        })
  
      }
        {contactLogData && contactLogData.length === 0 && newEmailData.length === 0 &&
          <div className="appListsWrap">
          <div className="noDataFound">
            <span><span>This contact doesn’t have any communication yet</span></span>
          </div>
        </div>
        }
    </div>
  </Scrollbars> 
  


    

      </div>

     {/* ........... start editing panel........................... */}
     <OpenPanel
        device={device}
        contactGenData ={contactGenData}
        emailplaceholdingData = {(data)=>emailplaceholdingData(data)}
        smsPlaceholdingData = {(data)=>smsPlaceholdingData(data)}
     />
    {showEmailmodal &&
      <EnlargeInbox
      closeModal={closeModal}
      contentShowInModal = {contentShowInModal}
    />
    }  
     </>
  );
};

export default Inbox;
