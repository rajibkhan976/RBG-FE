import React, { useEffect, useState, useRef, useMemo } from "react";

import { Steps, Step } from "react-step-builder";

import arrowDown from "../../../assets/images/arrowDown.svg";
import arrowRightWhite from "../../../assets/images/arrowRightWhite.svg";
import { PhasesServices } from "../../../services/contact/phasesServices";
import Loader from "../../shared/Loader";
import { ContactService } from "../../../services/contact/ContactServices";
import { utils } from "../../../helpers";
import * as actionTypes from "../../../actions/types";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "../../../assets/css/customizations.css";
import cressIcon from "../../../assets/images/white_cross_roundedCorner.svg";
import { CustomizationServices } from "../../../services/setup/CustomizationServices";
import { CourseServices } from "../../../services/setup/CourseServices"
import { stringify, parse } from 'qs';
import cross from "../../../../src/assets/images/cross.svg"

import useDebounce from "../../../helpers/useDebounce";
function ImportFilter(props) {
    const ref = useRef();
    const [date, setDate] = useState();
    const [date2, setDate2] = useState();
    const [today, setToday] = useState();
    const [isLoader, setIsLoader] = useState(false);
    const [phases, setPhases] = useState([]);
    const [status, setStatus] = useState([]);
    const [source, setSource] = useState([]);
    const [createdBy, setCreatedBy] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedPhase, setSelectedPhase] = useState("");
    const [selectedSource, setSelectedSource] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedTo, setSelectedTo] = useState("");
    const [selectedFrom, setSelectedFrom] = useState("");
    
    // program
    // const [program, setProgram] = useState([]);
    // const [selectedProgram, setSelectedProgram] = useState("");


    // Tags state
    const [tagIsOpen, setTagIsOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagsData, setTagsData] = useState([]);
    const [searchTag, setSearchTags] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    // Tags api call
    const fetchTags = async () => {
        setIsLoader(true);
        // console.clear();
        console.log("fetch tag api is calling ==============================");
        try {
            let response = await CustomizationServices.fetchTags();
            setTagsData(response.tags);
            setSearchResult(response.tags)
            // console.log("Tag Data", tagsData)
            setIsLoader(false);
        } catch (e) {
            dispatch({ 
                type: actionTypes.SHOW_MESSAGE, 
                message: e.message, 
                typeMessage: 'error' 
            });
            setIsLoader(false);
        } finally {
            setIsLoader(false);
        }
    };
    useEffect(()=>{
        fetchTags();
    },[]);

    // Tags open
    const openTagHandel = () => {
        setTagIsOpen(true);
        // let filteChecked = selectedTags.some((item)=> item.checked);
        // console.log(filteChecked);
        // if(filteChecked){
            // setTagsData(selectedTags);
        // }
        // console.log(tagsData, selectedTags);
    }

    // Tags selected
    const selectedTagHandeler = (event, item, index) => {
        let selectedArray = [...tagsData];
        // console.log("Selected Array", tagsData);
        if (event.target.checked) {
            // selectedArray[index].checked = event.target.checked;
            selectedArray = tagsData.map((item)=> item._id === event.target.value ? {...item, checked: true} : item);
            // setSelectedTags(selectedArray);
            console.log("Selected array", selectedArray);
            setSearchTags("");
        } else {
            // selectedArray[index].checked = false;
            // selectedArray.splice(selectedArray.map((item)=> item._id).indexOf(event.target.value), 1);
            selectedArray = tagsData.map((item)=> item._id === event.target.value ? {...item, checked: false} : item);
            setSearchTags("");
            // selectedArray.splice(selectedArray.findIndex(a => a.id == event.target.value) , 1)
            // console.log("Removed Array", selectedArray);
        }
        setSelectedTags(selectedArray);
        setTagsData(selectedArray);
        setSearchResult(selectedArray)
        // console.log("Selected Tags", selectedTags)
    }


    // Tags deselect
    const deselectTag = (selectItem, index) => {
        const newDeselectState = selectedTags.map((item)=>{
            console.log(selectItem._id, item._id);
            if(item._id == selectItem._id){
                return {...item, checked: false}
            }
            return item
        });
        console.log("After deselect tag", newDeselectState);
        setTagsData(newDeselectState);
        setSelectedTags(newDeselectState);
        setSearchResult(newDeselectState)
        setTagIsOpen(false);
    }
    
    // Tags ref
    useEffect(() => {
        const checkClickOutside = (e) => {
            if(typeof option != "object" && ref.current && !ref.current.contains(e.target)) {
                setTagIsOpen(false);  
            }  
        }
        document.addEventListener("click", checkClickOutside);
        return () => {
            document.removeEventListener("click", checkClickOutside);
        };
    });

    // Tag search
    const tagSearchHandeler = (event)=>{
        console.clear();
        setIsLoader(false);
        // event.preventDefault();
        setSearchTags(event);
        if(!event) return setSearchResult(tagsData);
            // console.log("Search field is there");
        let filterData = tagsData.filter((item)=> item.name.toLowerCase().includes(event.trim()));
        setSearchResult(filterData)
    }
    // tag close handeler
    const tagCloseHandeler = ()=>{
        setSearchTags("");
        setTagIsOpen(false);
        setSearchResult(tagsData);
    }

    // Program fetch
    const getQueryParams = async () => {
        const catID = utils.getQueryVariable('catID');
        const colors = utils.getQueryVariable('colors');
        const sizes = utils.getQueryVariable('sizes');
        const fromPrice = utils.getQueryVariable('fromPriceProduct');
        const toPrice = utils.getQueryVariable('toPriceProduct');
        const queryParams = new URLSearchParams();
        if (catID && catID !== "all" && catID !== "false") {
          queryParams.append("catID", catID);
        }
        if (colors) {
          queryParams.append("colors", colors);
        }
        if (sizes) {
          queryParams.append("sizes", sizes);
        }
        if (fromPrice) {
          queryParams.append("fromPrice", fromPrice);
        }
        if (toPrice) {
          queryParams.append("toPrice", toPrice);
        }
        return queryParams;
    }
    const fetchCourses = async (showLoader = true) => {
        const pageId = utils.getQueryVariable('page') || 1;
        const queryParams = await getQueryParams();
        try {
          /************ PERMISSION CHECKING (FRONTEND) *******************/
          const hasPermission = utils.hasPermission("course", "read");
          if (!hasPermission) throw new Error("You do not have permission");
          /************ PERMISSION CHECKING (FRONTEND) *******************/
          if (showLoader) setIsLoader(true);
          const result = await CourseServices.fetchCourses(pageId, queryParams);
          if (result) {
            console.log("Program Data", result.courses);
            // setProgram(result.courses);
            // setPaginationData({
            //   ...paginationData,
            //   count: result.pagination.count,
            //   currentPage: result.pagination.currentPage,
            //   totalPages: result.pagination.totalPages
            // });
          }
        } catch (e) {
          // setErrorMsg(e.message);
          dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: e.message,
            typeMessage: 'error'
          })
        } finally {
          setIsLoader(false);
        }
      };
      useEffect(()=>{
        // fetchCourses();
      },[])
      
    // const handleProgramChange = (event) => {
    //     console.log(event.target.value);
    //     setSelectedProgram(event.target.value);        
    // }






    const dispatch = useDispatch();
    const fetchPhases = async () => {
        setIsLoader(true);
        let data = await ContactService.fetchFilters();
        // console.log("Data ===========>", data);
        setIsLoader(false);
        setPhases(data.phase);
        setSource(data.source);
        setCreatedBy(data.createdBy);
    }
    const handlePhaseChange = (event) => {
        // console.log(event.target.value);
        setSelectedPhase(event.target.value);
        if (event.target.value) {
            let searchResultPhases = phases.find(ele => ele._id === event.target.value);
            setStatus(searchResultPhases.statuses);
            // console.log(searchResultPhases.statuses);
        } else {
            setStatus([]);
        }
    }
    const timezoneOffset = useSelector((state) => (state?.user?.data?.organizationTimezoneInfo?.utc_offset) ? state.user.data.organizationTimezoneInfo.utc_offset : null);
    useEffect(() => {
        let localDateTime = moment().utc().format("YYYY-MM-DD HH:mm:ss");
        let timezoneDateTime = utils.convertUTCToTimezone(localDateTime, timezoneOffset);
        setToday(timezoneDateTime);
    }, [timezoneOffset]);
    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    }
    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
    }
    
    const setEndDate = (val) => {
        if (val) {
            const yyyy = val.getFullYear();
            let mm = val.getMonth() + 1; // Months start at 0!
            let dd = val.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            let formattedDate = `${yyyy}-${mm}-${dd}`;
            setSelectedTo(formattedDate);
        } else {
            setSelectedTo("");
        }
        console.log(val);
        setDate2(val);
    }
    const setStartDate = (val) => {
        if (val) {
            const yyyy = val.getFullYear();
            let mm = val.getMonth() + 1; // Months start at 0!
            let dd = val.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            let formattedDate = `${yyyy}-${mm}-${dd}`;
            setSelectedFrom(formattedDate);
        } else {
            setSelectedFrom("");
        }
        setDate(val);
    }
    const handleSourceChange = (event) => {
        setSelectedSource(event.target.value);
    }
    const closeFilter = () => {
        props.hideFilter();
    }
    const applyFilter = () => {
        let filterTagsData = [];
        selectedTags.map((item)=>{
            if(item.checked){
                return filterTagsData.push(item._id);
            }
        });
        // console.log("Filter Tags data", filterTagsData);

        if (selectedUser) {
            utils.addQueryParameter('createdBy', selectedUser);
        } else {
            utils.removeQueryParameter('createdBy')
        }
        if (selectedFrom) {
            console.log("Selected From", selectedFrom);
            let convertFrom = utils.convertTimezoneToUTC(selectedFrom + " " + "00:00:01", timezoneOffset);
            utils.addQueryParameter('fromDate', convertFrom);
        } else {
            utils.removeQueryParameter('fromDate')
        }
        if (selectedTo) {
            console.log("Selected To", selectedTo);
            let convertTo = utils.convertTimezoneToUTC(selectedTo + " " + "23:59:59", timezoneOffset);
            utils.addQueryParameter('toDate', convertTo);
        } else {
            utils.removeQueryParameter('toDate')
        }
        if (selectedSource) {
            utils.addQueryParameter('source', selectedSource);
        } else {
            utils.removeQueryParameter('source')
        }
        if (selectedStatus) {
            utils.addQueryParameter('status', selectedStatus);
        } else {
            utils.removeQueryParameter('status')
        }
        if (selectedPhase) {
            utils.addQueryParameter('phase', selectedPhase);
        }
        else {
            utils.removeQueryParameter('phase')
        }
        // if (selectedProgram) {
        //     utils.addQueryParameter('program', selectedProgram);
        // }
        // else {
        //     utils.removeQueryParameter('program')
        // }
        if(filterTagsData.length > 0){
            utils.addQueryParameter('tags', filterTagsData);
        }
        else{
            utils.removeQueryParameter('tags');
        }
        if (selectedUser || selectedFrom || selectedTo || selectedSource || selectedStatus || selectedPhase || filterTagsData.length > 0 ) {
            props.applyFilter();
        } else {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: 'Please select any filter first.',
                typeMessage: 'error'
            });
        }
    }
    const clearFilter = () => {
        setSelectedTo("");
        setSelectedPhase("");
        setSelectedFrom("");
        setSelectedSource("");
        setSelectedUser("");
        setSelectedStatus("");
        setDate("");
        setDate2("");
        // setSelectedProgram("");
        utils.removeQueryParameter('import');
        utils.removeQueryParameter('page');
        utils.removeQueryParameter('status');
        utils.removeQueryParameter('phase');
        utils.removeQueryParameter('source');
        utils.removeQueryParameter('createdBy');
        utils.removeQueryParameter('fromDate');
        utils.removeQueryParameter('toDate');
        utils.removeQueryParameter('program');
        utils.removeQueryParameter('tags');
        let removeCheckedArray = tagsData.map((item)=>{
            return {...item, checked : false}
        });
        console.log(removeCheckedArray);
        setTagsData(removeCheckedArray);
        setSelectedTags(removeCheckedArray);
        setSearchResult(removeCheckedArray);
    }
    useEffect(() => {
        if (phases.length && selectedPhase !== "") {
            let searchResultPhases = phases.find(ele => ele._id === selectedPhase);
            if (searchResultPhases) {
                setStatus(searchResultPhases.statuses);
            }
        }
    }, [phases]);
    useEffect(() => {
        fetchPhases();
        const status = utils.getQueryVariable('status');
        if (status) {
            setSelectedStatus(status ? status : "");
        }
        const phase = utils.getQueryVariable('phase');
        if (phase) {
            setSelectedPhase(phase ? phase : "");
        }
        const user = utils.getQueryVariable('createdBy');
        if (user) {
            setSelectedUser(user ? user : "");
        }
        const fromDate = utils.getQueryVariable('fromDate');
        if (fromDate) {
            let formateFormDate = decodeURIComponent(fromDate.replaceAll("+", " ")).trim();
            console.log("From Date", moment(formateFormDate).format("YYYY-MM-DD HH:MM:ss"));
            let timeZoneConversation = utils.convertUTCToTimezone(moment(String(formateFormDate).trim()).format("YYYY-MM-DD HH:mm:ss"),timezoneOffset);
            console.log("From date UTC to local timezone convert----------------", timeZoneConversation);
            setSelectedFrom(fromDate ? moment(new Date(timeZoneConversation)).format("YYYY-MM-DD") : "");
            // setDate(moment(formateFormDate, "DD-MM-YYYY").add("days", 1)._d);
            setDate(new Date(timeZoneConversation));
        }

        const toDate = utils.getQueryVariable('toDate');
        if (toDate) {
            let formateToDate = decodeURIComponent(toDate.replaceAll("+", " ")).trim();
            // console.log("To Date", formateToDate);
            let timeZoneConversation = utils.convertUTCToTimezone(moment(formateToDate).format("YYYY-MM-DD HH:MM:ss"), timezoneOffset);
            setSelectedTo(toDate ? moment(new Date(timeZoneConversation)).format("YYYY-MM-DD") : "");
            setDate2(new Date(timeZoneConversation));            
        }


        const source = utils.getQueryVariable('source');
        if (source) {
            setSelectedSource(source ? decodeURIComponent(source.replaceAll("+", " ")) : "");
        }
        // const program = utils.getQueryVariable('program');
        // if (program) {
        //     setSelectedProgram(program ? program : "");
        // }
        const tags = utils.getQueryVariable('tags');
        if (tags && tagsData ) {
            let selectTagData = tags ? decodeURIComponent(tags.replaceAll("+", " ")) : "";
            console.log(selectTagData, tagsData)
            // let filterTagData = tagsData.filter((item)=>{
            //     return selectTagData.split(",").some((ele)=>{
            //         if(item._id === ele){
            //             return item;
            //         }
            //         // return item;
            //     });
            // }).map((item, index)=>{
            //     return {...item, checked: true}
            // });

            const filterTagData = tagsData.filter((item)=>{
                if(selectTagData.split(",").some(ele=> ele === item._id)){
                    item.checked = true;
                }
                return item;
            });
            setSelectedTags(filterTagData);
            console.log("Filter data", filterTagData, selectedTags);
            // console.log("Api tag data", tagsData);
        }
    }, [tagsData.length === 0]);
    return (
        <>
        {/* {console.log("Page render")} */}
            <div className="sideMenuOuter" id="import_Modal">
                <div className="dialogBg" onClick={() => closeFilter()}></div>
                <div className="sideMenuInner importModalContainer updateContainer">
                    {isLoader ? <Loader /> : ''}
                    <div className="sideMenuHeader">
                        <h3>Apply Filter</h3>
                        <button className="btn btn-closeSideMenu" onClick={() => closeFilter()}>
                            <span></span><span></span></button>
                    </div>
                    <div className="importModalBody setFilter">
                        <div className="filterOfContactListing filteringNew">
                            <div className="infoInputs appModal">
                                <ul>
                                    <li className="blockLi">
                                        <div className="formField w-100 appModals formControl phasesSelection">
                                            <label>Phase</label>
                                            <select value={selectedPhase} onChange={handlePhaseChange}
                                                style={{
                                                    backgroundImage: "url(" + arrowDown + ")",
                                                }}>
                                                <option value="">Select a Phase</option>
                                                {
                                                    phases.map(ele => {
                                                        if (ele.statuses.length && ele.statuses[0]._id !== undefined) {
                                                            return (<option value={ele._id} key={ele._id}>{ele.name}</option>)
                                                        }
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="formField w-100 appModals formControl statusSelection">
                                            <label>Status</label>
                                            <select value={selectedStatus} onChange={handleStatusChange}
                                                style={{
                                                    backgroundImage: "url(" + arrowDown + ")",
                                                }}>
                                                <option value="">Select a Status</option>
                                                {
                                                    status.map(ele => {
                                                        if (ele._id !== undefined) {
                                                            return (<option value={ele._id} key={ele._id}>{ele.name}</option>)
                                                        }
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="formField w-100 appModals formControl">
                                            <label>Source</label>
                                            <select value={selectedSource} onChange={handleSourceChange}
                                                style={{
                                                    backgroundImage: "url(" + arrowDown + ")",
                                                }}>
                                                <option value="">Select</option>
                                                {
                                                    source.map(ele => {
                                                        return (<option value={ele._id} key={ele._id}>{ele._id}</option>)
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="formField w-100 appModals formControl creationSelection">
                                            <label>Created by</label>
                                            <select value={selectedUser} onChange={handleUserChange}
                                                style={{
                                                    backgroundImage: "url(" + arrowDown + ")",
                                                }}>
                                                <option value="">Select</option>
                                                {
                                                    createdBy.map(ele => {
                                                        return (<option value={ele.id} key={ele._id}>{ele._id}</option>)
                                                    })
                                                }
                                            </select>
                                        </div>
                                        {/* <div className="formField w-100 appModals formControl creationSelection">
                                            <label>Program</label>
                                            <select value={selectedProgram} onChange={handleProgramChange}
                                                style={{ backgroundImage: "url(" + arrowDown + ")", }}>
                                                <option value="">Select</option>
                                                {
                                                    program.length > 0 && program.map(ele => {
                                                        return (<option value={ele._id} key={ele._id}>{ele?.name}</option>)
                                                    })
                                                }
                                            </select>
                                        </div> */}
                                        <div className="formField w-100 appModals formControl creationSelection tagSelection" >
                                            <label>Tags</label>
                                            <div className="cz_tagList" ref={ref}>
                                                <ul>
                                                    {/* {console.log("HTML Tag data", selectedTags)} */}
                                                    {
                                                        selectedTags.length > 0 && selectedTags.filter((item)=> item.checked).map((item, index)=>{
                                                            return(
                                                                <li key={index} className="cz_tag">{item?.name}
                                                                    <button type="button" onClick={() => deselectTag(item, index)}><img
                                                                        src={cressIcon} alt=""/></button>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                            <div ref={ref}>
                                                <div className={tagIsOpen ? "cz_selectCategory cmnFieldStyle focus" : "cz_selectCategory cmnFieldStyle"} >
                                                    <div className="cz_categorySelectSec">
                                                        <div onClick={openTagHandel}>
                                                            <input type="text" placeholder="Select" value={searchTag} id="cz_catSearchBox" onChange={(e)=>tagSearchHandeler(e.target.value.toLowerCase())} />
                                                            {/* <input type="text" placeholder="Select" id="cz_catSearchBox" onClick={openTagHandel}  /> */}
                                                        </div>
                                                        {
                                                            tagIsOpen && <button className="closeTags" onClick={tagCloseHandeler}><img src={cross} alt="" /></button>
                                                        }
                                                    </div>
                                                </div>
                                            { tagIsOpen && 
                                                    <div className="cz_categoryList">
                                                        {
                                                            <ul>
                                                                <p>Select</p>
                                                                {
                                                                    searchResult && searchResult.length > 0 ? searchResult.map((item, index) => {
                                                                        return (
                                                                            <li key={item._id}>
                                                                                <div className="sendEmail">
                                                                                    
                                                                                    <label className="tagsCustomCheckBox">
                                                                                        <input type="checkbox" value={item?._id} checked={item.checked} onClick={(e) => { selectedTagHandeler(e, item, index) }} />
                                                                                        <span className="checkmark"></span>
                                                                                        {item?.name}
                                                                                    </label>
                                                                                </div>
                                                                            </li>
                                                                        )
                                                                    })
                                                                : 
                                                                <div className="noTagData">
                                                                    <p>No tags found</p>
                                                                </div> 
                                                                }
                                                                
                                                            </ul>
                                                    }
                                                    </div> 
                                            }
                                            </div>
                                            
                                        </div>
                                    </li>
                                    <li className="dateRangeHeading"><p className="dateRange pTags">Created on</p></li>
                                    <li className="halfDates">
                                        <div className="formField w-50 appflex durationWraper">
                                            {/* {selectedFrom} */}
                                            <label>From</label>
                                            <div className="inFormField duration">
                                                <DatePicker
                                                    className="cmnFieldStyle"
                                                    selected={date}
                                                    defaultDate={today ? new Date(today) : ""}
                                                    format="MM/dd/yyyy"
                                                    dateFormat="MM/dd/yyyy"
                                                    placeholderText="MM/DD/YYYY"
                                                    onChange={(e) => setStartDate(e)}
                                                    maxDate={new Date(today)}
                                                />
                                            </div>
                                        </div>
                                        <div className="formField w-50 appflex durationWraper">
                                            <label>To</label>
                                            <div className="inFormField duration">
                                                <DatePicker
                                                    className="cmnFieldStyle"
                                                    selected={date2}
                                                    defaultDate={today ? new Date(today) : ""}
                                                    format="MM/dd/yyyy"
                                                    dateFormat="MM/dd/yyyy"
                                                    placeholderText="MM/DD/YYYY"
                                                    onChange={(e) => setEndDate(e)}
                                                    minDate={new Date(date)}
                                                    maxDate={new Date(today)}
                                                    // value={date2}
                                                />
                                            </div>
                                        </div>
                                    </li>

                                    <li className="lastLiApp">
                                        <div className="formField formControl w-100 appflex saveBtn">
                                            <button type="button" className="saveNnewBtn" onClick={applyFilter}><span>Apply Filter</span><img
                                                src={arrowRightWhite} alt="" /></button>
                                        </div>
                                        <div className="formField w-50 appflex clearFilterBtns">
                                            <span className="clearFilter" onClick={clearFilter}>Clear</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default React.memo(ImportFilter);