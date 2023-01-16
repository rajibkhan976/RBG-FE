import React, { useEffect, useRef, useState, useCallback } from "react";

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
import {useChatScroll, useDataLoader} from 'use-chat-scroll'
import EnlargeInbox from "./EnlargeInbox";

const Inbox = (props) => {
  const comLogRef = useRef();

  const [contactID, setContactID] = useState("");
  const [contactGenData, setContactgendata] = useState(props.contact);

  //fetchInboxLog
  const [contactLogData , setContactLogData] = useState([]);
 // const [isLoaderScroll, setIsLoaderScroll] = useState(false);
	const [isScroll, setIsScroll] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [device, setDevice] = useState(props.device);
  const [scrolledPosition, setScrolledPosition] = useState(null);
  const [clientHeight, setClientHeight] = useState(null);
  const [scrolledTop, setScrolledTop] = useState(null);
  const [scrolledHeight, setScrolledHeight] = useState(null);

  useEffect(() => {
    setDevice(props.device);
  }, [props.device]);

  const [paginationData, setPaginationData] = useState({
		offset: 0, 
		limit: 10, 
		page: "1", 
		totalCount: null
    });

  const [newEmailData, setnewEmailData] = useState([]);
  const [showEmailmodal, setShowEmailmodal] = useState(false);
  const [contentShowInModal, setContentShowInModal] = useState({
    message: "",
    subject: "",
    template: "",
      direction:"",
      type : "",
    });
   const fetchInboxLogList = async (pageId) => {
     //let pageId  = 1;
     let contact_id = props.contactId;
	 	try {
	 		setIsLoader(true);

	 		setIsScroll(true);
     // setIsLoaderScroll(true);
	 		const result = await communicationLogServices.fetchInboxLog(pageId, contact_id);
				
      if (result.pagination.page == "1") {
        setContactLogData(result.data.logs);
       // console.log("page 1", result.data.logs);

      } else {
        setContactLogData([...contactLogData, ...result.data.logs]);
        console.log("page", result.pagination.page);

      }
      setPaginationData({
        ...paginationData,
        offset: result.pagination.offset, 
        limit: result.pagination.limit, 
        page: result.pagination.page, 
        totalCount: result.pagination.totalCount
      });
      setScrolledPosition(comLogRef.current.scrollHeight);
      console.log("Scrolled position: ", scrolledPosition);
      if (result.pagination.page == "1") {
        comLogRef.current.scrollTop = comLogRef.current.scrollHeight - comLogRef.current.clientHeight;
        console.log("scroll data: ", comLogRef.current.scrollTop);
      } else {
          comLogRef.current.scrollTop  = ( comLogRef.current.scrollHeight - scrolledPosition ) + 260;
          console.log("scroll data: ", comLogRef.current.scrollTop);
      }

	 	} catch (e) {
	
	 	} finally {
      
      
      setIsScroll(false);
	 	setIsLoader(false);
	 	//setIsLoaderScroll(false);
	 	}
	 };
  
  //console.log( props.contactId);

  

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
    comLogRef.current.scrollTop = comLogRef.current.scrollHeight - comLogRef.current.clientHeight
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
       comLogRef.current.scrollTop = comLogRef.current.scrollHeight - comLogRef.current.clientHeight
   }


 useEffect(() => {
  fetchInboxLogList(1);
  }, []); 


  
  const showBigMail = (data, type, direction) =>{
    if(type === "SMS"){
      console.log(data.message);
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
   // console.log("jhhhhhhhhhhhhhhhhhhhhhhhhhh", data);
    console.log(data);

    if(type === "SMS"){
      setContentShowInModal({
        ...contentShowInModal,
        message : data,
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

  // const listPageNo = (e) => {
	// 	//
	// 	  let scrollHeight = comLogRef.current.scrollHeight;
	// 	  let scrollTop = comLogRef.current.scrollTop;
	// 	  console.log("scrollHeightdddddddddddddddddddddddddd", scrollHeight, "scrollTopddddddddddddddddddd", comLogRef);

	// 	  if (scrollTop < 260 ) {
  //       //if(contactLogData.length === 10){
  //         if (isScroll) {       
  //         fetchInboxLogList( parseInt(paginationData.page) + 1 );
  //         }
  //       //}
	// 	  }
	// 	//}
	//  };


  const scrollHandel = (inboxDiv) => {
    
    if(!isScroll) {
      setClientHeight(comLogRef.current?.clientHeight);
      setScrolledHeight(comLogRef.current?.scrollHeight)
      setScrolledTop(comLogRef.current?.scrollTop)
      console.log("scrolledTop: ", scrolledTop  , "scrolledHeight"   , scrolledHeight, "clientHeight", clientHeight );

        if(comLogRef.current.scrollTop <  260) {
          
          if(paginationData.totalCount <= paginationData.page*10 ){
            console.log ("No more data found")
          }else{
            fetchInboxLogList( parseInt(paginationData.page) + 1 );
          }
        }
      
      
    }
    
  }
  // const loader = useDataLoader(scrollHandel, contactLogData, setContactLogData);
  // useChatScroll(comLogRef, contactLogData, loader);
  // useEffect(() => {
  //   const inboxDiv = comLogRef.current;
  //   inboxDiv.addEventListener("scroll", scrollHandel);
  // }, [ scrollHandel]); 
 


const goToListBottom = (e) =>{
  comLogRef.current.scrollTop = comLogRef.current.scrollHeight - comLogRef.current.clientHeight ;

}

 

  return (
    <>
    {isLoader ? <Loader/> :""} 
    

   
   <div className="contactTabsInner" >
   
    <div className="inboxPage" ref={comLogRef} style={{height: "100%", width: "100%"}} onScroll={scrollHandel}>
  
    {
    (scrolledHeight> 2500 && 
      scrolledTop <= scrolledHeight - clientHeight - 800 )
      ?
      
     <button className="goData" onClick={goToListBottom}>Jump to latest Messages <img src={arrowDown}/> </button> 
      : ""
    }
    {contactLogData && contactLogData.length > 0 &&
      <div className="noMoredata">This contact has no more communication </div>
    }
    {contactLogData && contactLogData.length > 0 &&
        contactLogData.slice(0).reverse().map((elem, key)=>{
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
                  <h3>{elem.data?.message}.</h3>
                  : 
                  <>
                  <h3>Sub: {elem.data?.subject}</h3>
                  <div className="emailBody" dangerouslySetInnerHTML={{__html: elem.data?.template}}>
                   
                  </div>
                  </>
                }
               </div>
                {
               
               
               ((elem.data?.template) ? utils.decodeHTML(elem.data?.template).trim().length : "" )+
               ((elem.data?.subject) ? elem.data?.subject.trim().length : "") > 280 ? <button onClick={()=>showBigMail(elem.data, elem.log_type, elem.direction)} className="noBg">load more</button> :                
               elem.data?.message && elem.data?.message.trim().length > 280 ? <button onClick={()=>showBigMail(elem.data, elem.log_type, elem.direction)}  className="noBg">load more</button> :
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
      {
       ( newEmailData.length> 0) &&
       
        newEmailData.slice(0).reverse().map((elem, key)=>{
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
               ((elem.template) ? utils.decodeHTML(elem.template).trim().length : "" ) +
               ((elem.subject) ? elem.subject.trim().length : "") > 280 ? <button onClick={()=>showBigMailStatic(elem, elem.log_type)} className="noBg">load more</button> :                
               elem?.message && elem.message.trim().length > 280 ? <button onClick={()=>showBigMailStatic(elem.message, elem.log_type)}  className="noBg">load more</button> :
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
   
        {contactLogData && contactLogData.length === 0 && newEmailData.length === 0 &&
          <div className="appListsWrap">
          <div className="noDataFound">
            <span><span>This contact doesn’t have any communication yet</span></span>
          </div>
        </div>
        }
    </div>
  
  


    

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
