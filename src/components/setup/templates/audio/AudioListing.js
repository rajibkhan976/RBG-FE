import React, { useState, useEffect } from "react";
import Player from "../../../shared/Player";

import plus_icon from "../../../../assets/images/plus_icon.svg";
import info_3dot_icon from "../../../../assets/images/info_3dot_icon.svg";
import music_file_icon from "../../../../assets/images/music_file_icon.svg";
import ringtone from "../../../../assets/images/ringtone.mp3";
import AudioTemplateModal from "./audioTemplateModal";
import { AudioServices } from "../../../../services/template/AudioServices";
import { utils } from "../../../../helpers";
import moment from "moment";
import Pagination from "../../../shared/Pagination";
import Loader from "../../../shared/Loader";
import list_board_icon from "../../../../assets/images/list_board_icon.svg";
import { bucketUrl } from "../../../../configuration/config";
import { ErrorAlert, SuccessAlert } from "../../../shared/messages";
import ConfirmBox from "../../../shared/confirmBox";

const AudioListing = () => {
    document.title = "Audio Template";
    const [mobileActionOpt, setMobileActionOpt] = useState(false);
    const [audioModal, setAudioModal] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [audiosData, setAudiosData] = useState(null);
    const [paginationData, setPaginationData] = useState(
        {
            count: null,
            totalPages: null,
            currentPage: 1,
            limit: 10
        }
    );
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [audiosCount, setAudiosCount] = useState(0);
    const [preview, setPreview] = useState({
        title: null,
        track: null,
        active: null,
        trackName: null,
        description: null
    });
    const [editData, setEditData] = useState({
        title: null,
        active: null,
        trackName: null,
        description: null
    });
    const [isDeleted, setIsDeleted] = useState(false);
    const [isAlert, setIsAlert] = useState({
        show: false,
        id: null,
    });
    const [option, setOption] = useState(null);
    const [sortBy, setSortBy] = useState("");
    const [sortType, setSortType] = useState("asc");
    const messageDelay = 5000; // ms
    const [keyword, setKeyword] = useState(null);

    const toggleMobileActBtn = () => {
        setMobileActionOpt(!mobileActionOpt);
    };

    /**
     * Handle options toggle
     */
    const toggleOptions = (index) => {
        setOption(index !== option ? index : null);
    };

    const openModal = () => {
        setIsEdit(false);
        setAudioModal(true);
    };
    const closeModal = () => {
        setAudioModal(false);
    };

    useEffect(() => {
        fetchAudios();
    }, [])

    /**
     * If delete state is true
     * fetch audios again
     */
    useEffect(() => {
        if (isDeleted) {
            console.log('delete state changed', isDeleted);
            fetchAudios();
            setIsDeleted(false);
        }
    }, [isDeleted])

    /**
     * Auto hide success or error message
     */
    useEffect(() => {
        if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
        if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
    }, [successMsg, errorMsg])

    const getQueryParams = async () => {
        const keyword = utils.getQueryVariable('search');
        const srtBy = utils.getQueryVariable('sortBy');
        const srtType = utils.getQueryVariable('sortType');

        const queryParams = new URLSearchParams();

        console.log('search', keyword)
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
    }

    /**
     * Update keyword
     */
    const handleKeywordChange = (event) => {
        console.log(event.target.value);
        setKeyword(event.target.value);
    }

    /**
     * Trigger search when keyword is empty
     */
    useEffect(() => {
        if (keyword == "") {
            handleSearch({ preventDefault: () => { } })
        }
    }, [keyword])

    /**
     * Handle search functionality
     */
    const handleSearch = (event) => {
        event.preventDefault();

        utils.addQueryParameter('page', 1);
        if (keyword) {
            utils.addQueryParameter('search', keyword);
        } else {
            utils.removeQueryParameter('search');
        }
        fetchAudios();
    }

    /**
     * Function to fetch audios
     * @returns 
     */
    const fetchAudios = async () => {
        const pageId = utils.getQueryVariable('page');
        const queryParams = await getQueryParams();
        console.log('queryParams', queryParams.toString())
        try {
            setIsLoader(true);
            const result = await AudioServices.fetchAudios(pageId, queryParams);
            // .then((result) => {
            console.log('Audio template listing result', result.audios);
            if (result) {
                setAudiosData(result.audios);
                setAudiosCount(result.pagination.count);
                setPaginationData({
                    ...paginationData,
                    currentPage: result.pagination.currentPage,
                    totalPages: result.pagination.totalPages
                });
                if (result.audios && result.audios.length) {
                    //Set preview data
                    let audioURL = bucketUrl + result.audios[0].file;
                    console.log('audio url', audioURL);
                    setPreview((prevState) => {
                        return {
                            ...prevState,
                            title: result.audios[0].title,
                            description: result.audios[0].description,
                            track: new Audio(audioURL),
                            active: result.audios[0]._id,
                            trackName: result.audios[0].file
                        };
                    });
                }

            }
        } catch (e) {
            // setIsLoader(false);
            console.log("Error in audio template listing", e);
            setErrorMsg(e.message);
        } finally {
            setIsLoader(false);
        }
    }

    /**
     * Load preview
     */
    const loadPreview = (audioTemplate) => {
        console.log('load preview', audioTemplate);
        let audioURL = bucketUrl + audioTemplate.file;
        setPreview((prevState) => {
            return {
                ...prevState,
                title: audioTemplate.title,
                description: audioTemplate.description,
                track: new Audio(audioURL),
                active: audioTemplate._id,
                trackName: audioTemplate.file
            };
        });
    }

    /**
     * Preview edit
     */
    const previewEdit = (e) => {
        e.preventDefault();
        console.log('Edit from preview section', preview)
        if (preview.title) {
            setIsEdit(true);
            setAudioModal(true);
            setMobileActionOpt(!mobileActionOpt);
            setEditData((prevState) => {
                return {
                    ...prevState,
                    title: preview.title,
                    description: preview.description,
                    trackName: preview.trackName,
                    active: preview.active,
                };
            });
        }
    }

    /**
     * Preview delete
     */
    const previewDelete = (e) => {
        e.preventDefault();
        console.log('Delete from preview section', preview)
        if (preview.active) {
            setMobileActionOpt(!mobileActionOpt);
            setIsAlert({
                show: true,
                id: preview.active,
            });
        }
    }

    /**
     * Row delete
     */
    const deleteTemplateRow = (audioTemplate) => {
        console.log('Delete from row', audioTemplate)
        if (audioTemplate) {
            setOption(null);
            setIsAlert({
                show: true,
                id: audioTemplate,
            });
        }
    }

    /**
     * Edit template
     */
    const editTemplateRow = (audioTemplate) => {
        console.log('edit template row', audioTemplate);
        setIsEdit(true);
        setAudioModal(true);
        setOption(null);
        setEditData((prevState) => {
            return {
                ...prevState,
                title: audioTemplate.title,
                description: audioTemplate.description,
                active: audioTemplate._id,
                trackName: audioTemplate.file
            };
        });

    }

    /**
     * Delete template
     */
    const deleteTemplate = async (templateId, isConfirmed = null) => {
        console.log('Template to delete', templateId);
        try {
            if (isConfirmed == "yes" && templateId) {
                setIsLoader(true);
                /**
                 * Delete the group
                 */
                const result = await AudioServices.deleteTemplate(templateId);
                if (result) {
                    console.log('Audio template delete result', result);
                    setIsDeleted(true);
                    setSuccessMsg("Audio template deleted successfully");
                }
            } else {
                setIsAlert({
                    show: false,
                    id: null,
                });
            }
        } catch (e) {
            setErrorMsg(e.message);
        } finally {
            setIsLoader(false);
            setIsAlert({
                show: false,
                id: null,
            });
            setIsLoader(false);
        }
    }

    /**
     * Handle sorting
     * @param {*} field 
     */
    const handleSortBy = (field) => {
        // Set sort type
        let type = "asc"
        if (field == sortBy) {
            if (sortType == "asc") {
                type = "dsc";
            }
        }

        // Set state and Update query param
        setSortBy(field);
        setSortType(type);
        utils.addQueryParameter('sortBy', field);
        utils.addQueryParameter('sortType', type);

        // Fetch data
        fetchAudios();
    }

    return (
        <div className="dashInnerUI audioListingPage">
            {isLoader ? <Loader /> : ''}
            {console.log('is alert', isAlert)}
            {isAlert.show ? (
                <ConfirmBox
                    callback={(isConfirmed) => deleteTemplate(isAlert.id, isConfirmed)}
                />
            ) : (
                ""
            )}

            <div className="userListHead">
                <div className="listInfo">
                    <ul className="listPath">
                        <li>Setting</li>
                        <li>Templates</li>
                        <li>Audio Template</li>
                    </ul>
                    <h2 className="inDashboardHeader">Audio Template</h2>
                    <p className="userListAbout">Lorem ipsum dolor sit amet. Semi headline should be here.</p>
                </div>
                <div className="listFeatures">
                    <div className="searchBar searchbar2">
                        <form onSubmit={handleSearch}>
                            <input
                                type="search"
                                name="search"
                                placeholder="Search roles"
                                autoComplete="off"
                                onChange={handleKeywordChange}
                            />
                            <button className="searchIcon">
                            </button>
                        </form>
                    </div>
                    <button className="creatUserBtn" onClick={openModal}>
                        <img className="plusIcon" src={plus_icon} alt="" />
                        <span>Create an Audio Template</span>
                    </button>
                </div>
            </div>
            {successMsg &&
                <SuccessAlert message={successMsg}></SuccessAlert>
            }
            {errorMsg &&
                <ErrorAlert message={errorMsg}></ErrorAlert>
            }
            {audiosCount ?
                <React.Fragment>
                    <div className="userListBody audioListing">
                        <div className="listBody">
                            <ul className="tableListing">
                                <li className="listHeading userRole">
                                    <div className={"userName " + (sortBy == "title" ? "sort " + sortType : "")} onClick={() => handleSortBy("title")}>Title</div>
                                    <div className={"phoneNum assignedPeople " + (sortBy == "title" ? "sort " + sortType : "")} onClick={() => handleSortBy("description")}>Description</div>
                                    <div className={"createDate " + (sortBy == "createdAt" ? "sort " + sortType : "")} onClick={() => handleSortBy("createdAt")}>Created on</div>

                                </li>
                                {audiosData &&
                                    audiosData.map((elem, key) => {
                                        return (
                                            <React.Fragment key={key + "_audio"}>
                                                <li className={elem._id === preview.active ? "owerInfo userRole selectedRow" : "owerInfo userRole"}>
                                                    <div className="userName" onClick={() => loadPreview(elem)}>
                                                        <button className="btn">
                                                            <p>{elem.title}</p>
                                                        </button>
                                                    </div>
                                                    <div className="phoneNum" onClick={() => loadPreview(elem)}>
                                                        <button className="btn">{elem.description}</button>
                                                    </div>
                                                    <div className="createDate" onClick={() => loadPreview(elem)}>
                                                        <button className="btn">{moment(elem.createdAt).format("Do MMM YYYY")}</button>
                                                    </div>
                                                    <div className="listAction">
                                                        <div className="info_3dot_icon">
                                                            <button className="btn" onClick={() => {
                                                                toggleOptions(key);
                                                            }}>
                                                                <img src={info_3dot_icon} alt="" />
                                                            </button>
                                                        </div>
                                                        <div className={
                                                            option === key ? "dropdownOptions listOpen" : "listHide"
                                                        } >
                                                            <button className="btn btnEdit" onClick={() => {
                                                                editTemplateRow(elem);
                                                            }}>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.553 13.553" className="editIcon"><g transform="translate(0.75 0.75)"><path className="a" d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423" transform="translate(-2 -2.795)"></path><path className="a" d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z" transform="translate(-4.384 -2)"></path></g></svg>
                                                                </span>
                                                                Edit
                                                            </button>
                                                            <button className="btn btnDelete" onClick={() => {
                                                                deleteTemplateRow(elem._id);
                                                            }}>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.347" height="13.553" viewBox="0 0 12.347 13.553" className="deleteIcon"><g transform="translate(0.75 0.75)"><path className="a" transform="translate(-3 -3.589)"></path><path className="a" d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411" transform="translate(-3.795 -2)"></path><line className="a" y2="3" transform="translate(4.397 6.113)"></line><line className="a" y2="3" transform="translate(6.397 6.113)"></line></g></svg>
                                                                </span>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            </React.Fragment>
                                        );
                                    })}
                            </ul>
                            {audiosCount > paginationData.limit ?
                                <Pagination
                                    type="audios"
                                    paginationData={paginationData}
                                    dataCount={audiosCount}
                                    callback={fetchAudios} /> : ''
                            }
                        </div>
                        {preview.title ?
                            <div className="mobilePreview">
                                <div className="mobileTitle">
                                    <img src={music_file_icon} alt="" /> Listen Audio
                                </div>
                                <div className="mobile">
                                    <div className="mobileHead">
                                        <h3>{preview.title}</h3>
                                        <div className="moreBtn">
                                            <button className="btn" onClick={toggleMobileActBtn}>
                                                <img src={info_3dot_icon} alt="" />
                                            </button>
                                            <div className={mobileActionOpt ? "dropdownOptions listOpen" : "listHide"}>
                                                <button className="btn btnEdit" onClick={(e) => previewEdit(e)}>
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.553 13.553" className="editIcon"><g transform="translate(0.75 0.75)"><path className="a" d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423" transform="translate(-2 -2.795)"></path><path className="a" d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z" transform="translate(-4.384 -2)"></path></g></svg>
                                                    </span>
                                                    Edit
                                                </button>
                                                <button className="btn btnDelete" onClick={(e) => previewDelete(e)}>
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12.347" height="13.553" viewBox="0 0 12.347 13.553" className="deleteIcon"><g transform="translate(0.75 0.75)"><path className="a" transform="translate(-3 -3.589)"></path><path className="a" d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411" transform="translate(-3.795 -2)"></path><line className="a" y2="3" transform="translate(4.397 6.113)"></line><line className="a" y2="3" transform="translate(6.397 6.113)"></line></g></svg>
                                                    </span>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mobileBody">
                                        <div className="audioBox">
                                            <Player
                                                audioElement={preview.track}
                                                trackName={preview.title}
                                                preview={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="mobileFooter">
                                        <div className="mobileHomeButton"></div>
                                    </div>
                                </div>
                            </div>
                            : ''}
                    </div>
                </React.Fragment> :
                <React.Fragment>
                    <div className="createNew">
                        <span>
                            <img src={list_board_icon} alt="list_icon" />
                            <p>No audio template found!</p>
                        </span>
                    </div>
                </React.Fragment>
            }
            {audioModal && <AudioTemplateModal
                closeModal={closeModal}
                fetchAudios={fetchAudios}
                editData={editData}
                isEdit={isEdit} />
            }
        </div>
    );
}


export default AudioListing;