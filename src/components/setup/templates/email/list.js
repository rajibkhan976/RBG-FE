import Pagination from "../../../shared/Pagination"; 
import React, {useEffect, useState} from "react";
import {utils} from "../../../../helpers";
import {EmailServices} from "../../../../services/setup/EmailServices";
import Loader from "../../../shared/Loader";
import noRecords from "../../../../assets/images/noRecords.svg";
import plus_icon from "../../../../assets/images/plus_icon.svg";

const List = (props) => {
    const [sortType, setSortType] = useState("asc");
    const [sortBy, setSortBy] = useState("");
    const [emailTempData, setEmailTempData] = useState([]);
    const [activeEmail, setActiveEmail] = useState(null);
    const [paginationData, setPaginationData] = useState({
        count: null,
        totalPages: null,
        currentPage: 1,
        limit: 10
    });
    const fetchTemplateList = async () => {

        try {
            props.setIsLoader(true);
            props.selectedEmail(null);
            setActiveEmail(null);
            const pageId = utils.getQueryVariable('page') || 1;
            const queryParams = await getQueryParams();
            const result = await EmailServices.fetchEmailTemplateList(pageId, queryParams);
            if (result) {
                setEmailTempData(result);
                //props.selectedEmail(result.templates[0]);
                setPaginationData({
                    ...paginationData,
                    count: result.pagination.count,
                    currentPage: result.pagination.currentPage,
                    totalPages: result.pagination.totalPages
                });
            }
        } catch (e) {

        } finally {
            props.setIsLoader(false);
        }
    };
    const getQueryParams = async () => {
        const keyword = utils.getQueryVariable("search");
        const srtBy = utils.getQueryVariable("sortBy");
        const srtType = utils.getQueryVariable("sortType");

        const queryParams = new URLSearchParams();
        if (keyword) {
            queryParams.append("search", decodeURIComponent(keyword.replaceAll("+", " ")));
        }
        if (srtBy) {
            queryParams.append("sortBy", srtBy);
        }
        if (srtType) {
            queryParams.append("sortType", srtType);
        }
        return queryParams;
    };
    const handleSortBy = async (field) => {
        // Set sort type
        let type = "asc";
        if (field === sortBy) {
            if (sortType === "asc") {
                type = "dsc";
            }
        }

        // Set state and Update query param
        setSortBy(field); 
        setSortType(type);
        utils.addQueryParameter("sortBy", field);
        utils.addQueryParameter("sortType", type);
        setTimeout(async () => {
            await fetchTemplateList()
        }, 50);
    };
    
    // useEffect(() => {
    //     setActiveEmail(0);
    // },[])

    const getThisEmail = (email, i) => {
        setActiveEmail(activeEmail === null ? i : activeEmail === i ? null : i);
        props.selectedEmail(email);
    }
    const stringToHTML = (str) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(str, 'text/html');
        let dataHTML = "";

        for(let i = 0; i < doc.body.childNodes.length; i++){
            dataHTML += doc.body.childNodes[i].textContent
        }
        return (dataHTML.length < 100 ? dataHTML : dataHTML.substring(0, 100)+"...");
    }
    useEffect(async () => {
        await fetchTemplateList();
        setSortBy(utils.getQueryVariable("sortBy"));
        setSortType(utils.getQueryVariable("sortType"));
    }, []);
    useEffect(() => {
        if (props.clickOnSearch) {
            fetchTemplateList();
        }
    }, [props.clickOnSearch]);

    // useEffect(() => {        
    //     console.log("props.updatelistOnList ", props.updatelistOnList);
    //      fetchTemplateList();
    // }, [ ]);  
    if(props.updatelistOnList === true){
        setTimeout(async () => {
            await fetchTemplateList() 
        }, 50);
        setTimeout(() => {
          props.changeUpdatelistOnList(undefined)         
        }, 500);
    }
    

    return (
        <div className="emailListingBody d-flex f-column">
            {
                emailTempData && emailTempData.templates && emailTempData.templates.length ?
                    <>
                        <div className="listBody f-1">
                            <ul className="tableListing">
                                <li className="listHeading userRole">
                                    <div
                                        className={
                                            "messageTitle " +
                                            (sortBy === "title" ? "sort " + sortType : "")
                                        }
                                        onClick={() => handleSortBy("title")}
                                    >
                                        Title
                                    </div>
                                    <div
                                        className={
                                            "messageDeet " +
                                            (sortBy === "subject" ? "sort " + sortType : "")
                                        }
                                        onClick={() => handleSortBy("subject")}
                                    >
                                        Subject
                                    </div>
                                </li>
                                {emailTempData.templates &&
                                    emailTempData.templates.length > 0 &&
                                    emailTempData.templates.map((emailData, i) => (
                                        <li
                                            key={i}
                                            onClick={(e)=>getThisEmail(emailData, i)}
                                            //className={(!activeEmail && i === 0) ? "active":(activeEmail === i) ? "active" : ""}
                                            className={(activeEmail === i) ? "active" : ""}
                                        > 
                                            <div className="messageTitle">{emailData.title}</div>
                                            <div className="messageDeet">
                                                <p className="messageHeader">
                                                {emailData.subject}
                                                </p>
                                                <div className="dataMessageEmail" dangerouslySetInnerHTML={{__html: stringToHTML(Buffer.from(emailData.template, 'base64').toString())}} />
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        {paginationData.count > paginationData.limit ? (
                            <Pagination
                                paginationData={paginationData}
                                dataCount={paginationData.count}
                                callback = {fetchTemplateList}
                            />
                        ) : (
                            ""
                        )}
                    </> :
                    <div className="createNew noInfos">
                        <div className="noRecordsImgWraper">
                            <img src={noRecords} className="noRecords" alt=""/>
                            <h4>No Template Found { console.log(emailTempData) }</h4>
                            <p>No template have been listed here yet</p>
                        </div>
                    </div>
            }

        </div>
    )
}

export default List;