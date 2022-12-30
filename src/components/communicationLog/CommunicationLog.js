
import React, {useState, useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actionTypes from '../../actions/types';
import {Link} from 'react-router-dom';
import CommunicationLogHeader from './CommunicationLogHeader';

import info_3dot_icon from "../../assets/images/info_3dot_icon.svg";
import outgoing from "../../assets/images/outgoing.svg";
import missedcall from "../../assets/images/missedcall.svg";
import outgoing_SMS from "../../assets/images/outgoing_SMS.svg";
import incoming_SMS from "../../assets/images/incoming_SMS.svg";
import outgoing_Mail from "../../assets/images/outgoing_Mail.svg";
import incoming_Mail from "../../assets/images/incoming_Mail.svg";
import voice_Mail from "../../assets/images/voice_Mail.svg"; 
import messenger from "../../assets/images/messenger.svg";
import inArrow from "../../assets/images/inArrow.svg"; 
import outArrow from "../../assets/images/outArrow.svg";
import circle_play_icon from "../../assets/images/circle_play_icon.svg";
import cross from "../../assets/images/cross.svg";
import CommunicationLogFilter from "./CommunicationLogFilter";
import {communicationLogServices} from  "../../services/communicationLog/communicationLogServices";
import Loader from "../shared/Loader";
import {utils} from "../../helpers";
import moment from "moment";
import Pagination from "../shared/Pagination";
import { Scrollbars } from "react-custom-scrollbars-2";



const CommunicationLog = (props) => {
    const dispatch = useDispatch();

	const [isFilter, setIsFilter] = useState(false);
  	const [isLoader, setIsLoader] = useState(false);
  	const [logList, setLogList] = useState([]);
	const [paginationData, setPaginationData] = useState({
		offset: 0, 
		limit: 10, 
		page: "1", 
		totalCount: null
    });
  
	const [isLoaderScroll, setIsLoaderScroll] = useState(false);
	const [isScroll, setIsScroll] = useState(false);

    const comLogRef = useRef();
	const [isSearchOn, setIsSearchOn] = useState(false);
	const [isFilteringOn, setIsFilteringOn] = useState(false);
    const [selectDirection, setSelectDirection] = useState("");
    const [selectType, setSelectType] = useState("");
	const [selectTodate, setSelectTodate] = useState("");
    const [selectFromdate, setSelectFromdate] = useState("");
    



    const hideFilter = () => {
        setIsFilter(false);
    }
	const showFilter = () => {
        setIsFilter(true);
    }
	console.log("isScrollvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv", isScroll);



	const fetchCommunicationLogList = async (pageId) => {
		const queryParams = await getQueryParams();
		//let contactID = props.contactId;
		try {
			setIsLoader(true);
			setIsScroll(true);
      		setIsLoaderScroll(true);
			const result = await communicationLogServices.fetchCommLog(pageId, queryParams);
			if (result) {
				//setLogList(result.data);
			    //console.log("gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",logList);
				if (result.pagination.page == "1") {
					setLogList(result.data);
				  } else {
					setLogList([...logList, ...result.data]);
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
	const getQueryParams = async () => {
        const keyword = utils.getQueryVariable("search");
        const type = utils.getQueryVariable("type");
        const direction = utils.getQueryVariable("direction");
        const toDate = utils.getQueryVariable("toDate");
        const fromDate = utils.getQueryVariable("fromDate");

        const queryParams = new URLSearchParams();
        if (keyword) {
            queryParams.append("search", decodeURIComponent(keyword.replaceAll("+", " ")));
        }
		if (type) {
            queryParams.append("type", type);
        }
        if (direction) {
            queryParams.append("direction", direction);
        }
		if (fromDate) {
            let fromDateUrl = new Date(fromDate + " 00:00:00 UTC");
            queryParams.append("fromDate",  fromDateUrl.toISOString());
        }
		if (toDate) {
			let toDateUrl = new Date(toDate + " 23:59:59 UTC");
            queryParams.append("toDate", toDateUrl.toISOString());
        }
        return queryParams;
    };

	
	const listPageNo = (e) => {

		if (!isScroll) {
		  let scrollHeight = e.target.scrollHeight;
		  let scrollTop = e.target.scrollTop;
			console.log("scrollHeightdddddddddddddddddddddddddd", scrollHeight, "scrollTopddddddddddddddddddd", scrollTop);

		  if (scrollTop > (scrollHeight / 5)) {
			if(logList.length === 10){
				
				fetchCommunicationLogList( parseInt(paginationData.page) + 1 );
			}
		  }
		}
	  };



	  useEffect(() => {
		fetchCommunicationLogList(1);	
	  }, []); 

  

 
    const clickOnSearch = (data) =>{
		setIsSearchOn(data)
	}
	const clickedOnFilter = (data) =>{
		setIsFilteringOn(data);
	}
    
 	 useEffect(() => {
         if (isSearchOn) {
             fetchCommunicationLogList(1);
         }
     }, [isSearchOn]);


    useEffect(() => {
        if (isFilteringOn) {
            fetchCommunicationLogList(1);
        }
    }, [isFilteringOn]);


    useEffect(() => {
        const type = utils.getQueryVariable("type");
		setSelectType(type);

        console.log("type",selectType);
    },[utils.getQueryVariable("type")]);

	useEffect(() => {
        const direction = utils.getQueryVariable("direction");
		setSelectDirection(direction);

        console.log("direction",selectDirection);
    },[utils.getQueryVariable("direction")]);

	useEffect(() => {
        const toDate = utils.getQueryVariable("toDate");
		setSelectTodate(toDate);
    },[utils.getQueryVariable("toDate")]);

	useEffect(() => {
        const fromDate = utils.getQueryVariable("fromDate");
		setSelectFromdate(fromDate);
    },[utils.getQueryVariable("fromDate")]);


    
	const removeType = () =>{
		utils.removeQueryParameter('type');
		fetchCommunicationLogList(1);
	}
	const removeDirection = () =>{
		utils.removeQueryParameter('direction');
		fetchCommunicationLogList(1);
	}
	const removeTodate = () =>{
		utils.removeQueryParameter('toDate');
		fetchCommunicationLogList(1);
	}
	const removeFromdate = () =>{
		utils.removeQueryParameter('fromDate');
		fetchCommunicationLogList(1);
	}
	const removeAllFilter = () =>{
		utils.removeQueryParameter('fromDate');
		utils.removeQueryParameter('toDate');
		utils.removeQueryParameter('direction');
		utils.removeQueryParameter('type');

		fetchCommunicationLogList(1);
	}
	
	const openContactModal = (elem) => {
		dispatch({
			type: actionTypes.CONTACTS_MODAL_ID,
			contact_modal_id: {
				"id": elem.contact_id,
				 "page": 9
			},
		});
		setTimeout(() => {
			dispatch({
				type: actionTypes.CONTACTS_MODAL_ID,
				contact_modal_id: {
					"id": elem.contact_id,
				},
			}, 100);
		})
	}

	return (
	  <>
	  {isLoader ? <Loader/> :""}
	  	<CommunicationLogHeader showFilter={showFilter} 
		   //countCommLog={paginationData.totalCount} 
		   clickOnSearch={(data)=>clickOnSearch(data)}
		/>
		
		{ (selectDirection  || selectType || selectFromdate || selectTodate) &&
			<div className='filterCommunication'>
				{selectDirection && 
				    <div class="contactsTags">
					     <span class="pageInfo">Direction : {selectDirection==="outbound"? "Outgoing" :"Incoming"}</span>
						 <span class="crossTags" onClick={removeDirection}><img src={cross} alt=""/></span>
					</div>}
				{selectType && 
				    <div class="contactsTags">
					     <span class="pageInfo">Type : {selectType}</span>
						 <span class="crossTags" onClick={removeType}><img src={cross} alt=""/></span>
					</div>}

				{selectFromdate &&
					<div class="contactsTags">
					     <span class="pageInfo">From date : { moment(decodeURIComponent(selectFromdate.replaceAll(":","%3A"))).format('YYYY-MM-DD')}</span>
						 <span class="crossTags" onClick={removeFromdate}><img src={cross} alt=""/></span>
					</div>
				}	 
				{selectTodate &&
					<div class="contactsTags">
					     <span class="pageInfo">To date : {moment(decodeURIComponent(selectTodate.replaceAll(":","%3A"))).format('YYYY-MM-DD')}</span>
						 <span class="crossTags" onClick={removeTodate}><img src={cross} alt=""/></span>
					</div>
				}
				<div class="contactsTags clearAlls"  onClick={removeAllFilter}><span class="allDel">Clear All</span></div>
			</div>
		 }  
		 
		<div className='communicationList'>
			<div class="userListBody">
			    <div class="listBody" style={{}}>
				<Scrollbars renderThumbVertical={(props) => <div className="thumb-vertical" />} onScroll={listPageNo}>
					<ul class="tableListing noHeader" ref={comLogRef} >
						{ 
						 (logList && logList.length > 0) ? 
							logList.map((elem,key) => {
								const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
								const newdate = new Date(elem.updated_at);
								const dateForamt = month[newdate.getMonth()] +" " + newdate.getDate() + ",  "  + newdate.getFullYear();
								const startDate = moment(elem.updated_at).format('h:mm A');
								return(
									<li className='space' key={key}>
										<div className='iconType'>
											<div className={elem.log_type === "SMS" ? 'roundIconBase violet' : elem.log_type === "EMAIL" ? 'roundIconBase blue' : 'roundIconBase '}>
											<img src={
												elem.log_type === "SMS" ? (elem.direction === "outbound" ? outgoing_SMS : incoming_SMS):
												elem.log_type === "EMAIL" ? (elem.direction === "outbound" ? outgoing_Mail : incoming_Mail): ""
											} alt=""/>
											</div>
										</div>
										<div className='nameCommunication' 
										  onClick={() => openContactModal(elem)}
										  >
											<span class="comLogText">{elem.direction === "outbound"? "To" : "From"}: {elem.contact_name} {elem.alias_ref && "(" + elem.alias_ref + ")"}</span>
										</div>
										<div>
											<span class="comLogText"><img src={elem.direction === "outbound"? outArrow : inArrow} alt=""/> {elem.direction === "outbound"? "Outgoing" : "Incoming"}</span>
										</div>
										<div className='detailCommunication'>
											{/* <span class="comLogText"><span className='skytext'>{elem.gym_account_name} </span>
											<span className='doomed'>{elem.direction === "outbound" ? "Send" : "Received"} </span> 
											{elem.log_type === "SMS" ? "a " + elem.log_type : "an " + elem.log_type} <span className='doomed'>from</span> {elem.from} {elem.log_type === "SMS" ? elem.data.message : elem.log_type === "EMAIL" ? elem.data.subject: ""}
											</span> */}
											{elem.direction === "outbound" ? 
											   <>
											   <span class="comLogText">
												   <span className='skytext'>{elem.gym_account_name} </span> send {elem.log_type === "SMS" ? "a " + elem.log_type : "an " + elem.log_type} 
												   <span className='doomed'> "{elem.log_type === "SMS" ? elem.data.message : elem.log_type === "EMAIL" ? elem.data.subject: ""}"</span>
											   </span>
											   </>
												:
												<span class="comLogText">
												  Received  {elem.log_type === "SMS" ? "a " + elem.log_type : "an " + elem.log_type} <span className='doomed'>from</span> {elem.from} 
												  <span className='doomed'> "{elem.log_type === "SMS" ? elem.data.message : elem.log_type === "EMAIL" ? elem.data.subject: ""}"</span>
											    </span>
										    }



										</div>
										<div className='dateCommunication'>
											<span class="comLogText"><span class="doomed">{dateForamt} {startDate}</span></span>
										</div>
									
									</li>

								)														
							})

						 :
						   <div className="appListsWrap">
								<div className="noDataFound">
									<span><span>No communication happened so far</span></span>
								</div>
							</div>
					  	}		
					</ul>
					</Scrollbars>
					
				</div>
			</div>
		</div>
		{ isFilter &&
              
		   <CommunicationLogFilter 
		     hideFilter={hideFilter} 
		     clickedOnFilter={(data)=>clickedOnFilter(data)}
			//applyFilter={()=>applyFilter()}
			 //filterSection={(data)=> filter(data)}
		   />
        }
	  </>
	);
};

export default CommunicationLog;
