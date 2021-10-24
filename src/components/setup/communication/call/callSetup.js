import React, {useEffect, useState, useRef} from "react";
import plus_icon from "../../../../assets/images/plus_icon.svg";
import info_3dot_icon from "../../../../assets/images/info_3dot_icon.svg";
import CallConfiguration from "./callConfiguration";
import {ContactService} from "../../../../services/contact/ContactServices";
import {CallSetupService} from "../../../../services/setup/callSetupServices";
import Loader from "../../../shared/Loader";
import {ErrorAlert, SuccessAlert} from "../../../shared/messages";
import orange_add_icon from "../../../../assets/images/orange_add_icon.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import upload_cloud_icon_small from "../../../../assets/images/upload_cloud_icon_small.svg";
import music_file_icon from "../../../../assets/images/music_file_icon.svg";
import file_done_icon from "../../../../assets/images/file_done_icon.svg";
import ringtone from "../../../../assets/images/ringtone.mp3";

const CallSetup = () => {
    const [configModalShow, setConfigModalShow] = useState(false);
    const [numberObj, setNumberObj] = useState({});
    const [configurationList, setConfigurationList] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [ringtoneDropdown, setRingtoneDropdown] = useState(false); // Ringtone dropdown state
    const [uploadRingSlide, setUploadRingSlide] = useState(false);
    const [uploadedFile, setUploadedFile] = useState("");
    const [uploadedFilePath, setUploadedFilePath] = useState("");
    const [fileUploadStatus, setFileUploadStatus] = useState();
    const [isSearching, setIsSearching] = useState(false);

    let ringtoneList = [
        {
            name: "Spring Charm",
            default: false,
            selected: true,
        },
        {
            name: "Sunrise View",
            default: true,
            selected: false,
        },
        {
            name: "By the Seaside",
            default: false,
            selected: false,
        },
        {
            name: "Chimes",
            default: false,
            selected: false,
        },
        {
            name: "Cosmic",
            default: true,
            selected: false,
        },
        {
            name: "Hill Side",
            default: false,
            selected: false,
        },
        {
            name: "Cherry",
            default: false,
            selected: false,
        },
    ];

    const [foundTrack, setFoundTrack] = useState(ringtoneList);
    const [searchKeyVal, setSearchKeyVal] = useState("");
    
    const filterTrack = (e) => {
        let keyword = e.target.value;
        setSearchKeyVal(keyword);
        if (keyword !== "") {
            const results = ringtoneList.filter((track) => {
                return track.name.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFoundTrack(results);
            setIsSearching(true);
        } else {
            setFoundTrack(ringtoneList);
            setIsSearching(false);
        }
    };

    const clearTrackSearch = () => {
        setSearchKeyVal("");
        setIsSearching(false);
        setFoundTrack(ringtoneList);
    }

    // let ringtone = new Audio(ringtone);

    // const playRingtone = () => {
    //     ringtone.play();
    // }
    const openConfigModal = () => {
        setConfigModalShow(true);
    }
  
    const closeConfigModal = () => {
        setConfigModalShow(false);
    }
    const fetchNumber = async () => {
        setIsLoader(true);
        try {
            const result = await CallSetupService.fetchNumber();
            console.log('dsfnjmsdjiisdjfhsdfh8')
            setNumberObj(result);
            setConfigurationList(result.config);
        } catch (e) {
            setErrorMsg('No number found. Please first buy a number then come again here.');
        } finally {
            setIsLoader(false);
        }
    }
    const handleCheck = (val, list) => {
        let exists = false;
        list.some((el) => {
            if (el.day.includes(val))
                exists = true;
        });
        return exists;
    }
    const getTimeSlot = (list) => {
      let start = "";
      let end = "";
        list.some((el) => {
            if (start === "") {
                start = el.startTime;
            } else {
                start = start < el.startTime ? start : el.startTime;
            }
            if (end === "") {
                end = el.endTime;
            } else {
                end = end > el.endTime ? end : el.endTime;
            }
        });
        return start + " - " + end;
    }
    useEffect(() => {
        fetchNumber();
    }, []);

    const gotoUpload = () => {
        setUploadRingSlide(true);
    }

    const backToToneList = () => {
        setUploadRingSlide(false);
    }

    const uploadRing = (e) => {
        console.log(e);
        let fullPath = e.target.value;
        if (fullPath) {
            let startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            let filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
            setUploadedFile(filename);
            setUploadedFilePath(fullPath);
        }
    }

    const uploadRingtone = () => {
        if (fileUploadStatus) {
            setRingtoneDropdown(false);
        }

        if (!fileUploadStatus || fileUploadStatus == undefined && uploadedFilePath !== "") {
            setFileUploadStatus(true);
        }
    }

    const ref = useRef();

    // Toggle ringtone dropdown
    const tglRingtoneDropdown = () => {
        setRingtoneDropdown(!ringtoneDropdown);
        if (!ringtoneDropdown) {
            setUploadRingSlide(false);
        }
    }

    // Check outside click for ringtone menue, close if clicked outside
    useEffect(() => {
        const checkClickOutside = (e) => {
            if(ringtoneDropdown && ref.current && !ref.current.contains(e.target)) {
                setRingtoneDropdown(false);
            }
        }

        document.addEventListener("click", checkClickOutside);
        return () => {
            document.removeEventListener("click", checkClickOutside);
        };
    });

    return(
        <div className="dashInnerUI">
            {isLoader ? <Loader /> : ''}
            {successMsg &&
            <SuccessAlert message={successMsg}></SuccessAlert>
            }
            {errorMsg &&
            <ErrorAlert message={errorMsg}></ErrorAlert>
            }
            <div class="userListHead">
                <div class="listInfo">
                    <ul class="listPath">
                        <li>Setup</li>
                        <li>Communication Setup</li>
                        <li>Call</li>
                    </ul>
                    <h2 class="inDashboardHeader">Call Setup</h2>
                    <p class="userListAbout">Lorem ipsum dolor sit amet. Semi headline should be here.</p>
                </div>
                { Object.keys(numberObj).length ?
                    <div class="listFeatures">
                        <button class="creatUserBtn" onClick={openConfigModal}>
                            <img class="plusIcon" src={plus_icon} alt=""/>
                            <span>Add a configur</span>
                        </button>
                    </div> : ""
                }
            </div>
            {
                Object.keys(numberObj).length ?
                <div className="userListBody callListingTable">
                    <div className="assignedNumberArea">
                        <h3>Assigned Phone Number</h3>
                        <p>{ numberObj.prefix + "-" + numberObj.nationalNumber + " [ " + numberObj.numberAlias + " ] "}</p>
                        <div className="ringToneArea" ref={ref}>
                            <button className="addRingBtn" onClick={tglRingtoneDropdown}>
                                <img src={orange_add_icon} alt="" /> Add Ringtone
                            </button>
                            { ringtoneDropdown ?
                                <div className="ringToneDropDown">
                                    <div className={uploadRingSlide ? "hide" : "ringtoneListSlide"}>
                                        <div className={isSearching ? "ringToneDropDownHead searchign" : "ringToneDropDownHead"}>
                                            <div className={ isSearching ? "searchRingTone searching" : "searchRingTone"}>
                                                <input type="text" value={searchKeyVal} placeholder="Search Ringtone" onChange={filterTrack} />
                                            </div>
                                            { isSearching ? <button className="clearSearchBtn" onClick={clearTrackSearch}></button> :
                                                <button className="addRingToneBtn" onClick={gotoUpload}></button> }
                                        </div>
                                        <div className="ringToneList">
                                            <ul className={ isSearching ? "filterResult" : ""}>
                                                {foundTrack && foundTrack.length > 0 ? (
                                                    foundTrack.map((track) => (
                                                        <li className={track.selected ? "selected" : ""}>
                                                            <button className="toneName">{track.name}</button>
                                                            <div className="toneAction">
                                                                {!track.default ? <button className="toneEdit"></button> : ""}
                                                                <button className="tonePlay"></button>
                                                            </div>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="noData">No results found!</li>
                                                )
                                                }
                                            </ul>
                                        </div>
                                        <div className="ringToneDropBottom">
                                            <button className="cmnBtn updateRingTone">
                                                <span>Update</span>
                                                <img src={arrow_forward} alt="" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className={uploadRingSlide ? "uploadRingSlide" : "hide"}>
                                        <div className="ringToneDropDownHead">
                                            <button className="backToToneList" onClick={backToToneList}>Add Ringtone</button>
                                        </div>
                                        <div className="ringUploadPlate">
                                            <h3 className={fileUploadStatus ? "success" : ""}>
                                                <figure>
                                                    <img
                                                        src={
                                                            uploadedFile === "" ? upload_cloud_icon_small :
                                                                (fileUploadStatus ? file_done_icon : music_file_icon)
                                                        }
                                                        alt=""
                                                    />
                                                </figure>
                                                {
                                                    uploadedFile === "" ? "Choose your ringtone" :
                                                        (fileUploadStatus ? "Congratulations" : uploadedFile)
                                                }
                                            </h3>
                                            <p className="fileUploadInfo">
                                                {
                                                    uploadedFilePath === "" ? "[Only MP3, WMA, AMR formats are supported] Maximum upload size is 5 MB" :
                                                        (fileUploadStatus ? "File successfully uploaded" : uploadedFilePath )
                                                }
                                            </p>
                                            <input type="file" className="importRingtone" onChange={uploadRing} />
                                        </div>
                                        <div className="ringToneDropBottom">
                                            <button className={ uploadedFile === "" ? "cmnBtn updateRingTone disabled" : "cmnBtn updateRingTone" } onClick={uploadRingtone} >
                                                <span>{ fileUploadStatus ? "Done" : "Upload" }</span>
                                                <img src={arrow_forward} alt="" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                : "" }
                        </div>
                    </div>
                    <h3 className="callListTabHeading">
                        Configurations
                    </h3>
                    <div className="listBody">
                        <ul className="tableListing">
                            <li className="listHeading">
                                <div className="userName">
                                    Name
                                </div>
                                <div>
                                    Scheduled Day (s)
                                </div>
                                <div className="scehTimeSlot">
                                    Scheduled Time Slot
                                </div>
                                <div>
                                    Status
                                </div>
                            </li>
                            {
                                configurationList.map((list) => {
                                    return (
                                        <li>
                                            <div className="userName">
                                                <button className="btn"><p>{list.name}</p></button>
                                            </div>
                                            <div>
                                                <ul className="weekDateList">
                                                    <li className={ handleCheck('sun', list.schedules) ? "weekDate active" : "weekDate"}>
                                                        <span>S</span>
                                                    </li>
                                                    <li className={ handleCheck('mon', list.schedules) ? "weekDate active" : "weekDate"}>
                                                        <span>M</span>
                                                    </li>
                                                    <li className={ handleCheck('tue', list.schedules) ? "weekDate active" : "weekDate"}>
                                                        <span>T</span>
                                                    </li>
                                                    <li className={ handleCheck('wed', list.schedules) ? "weekDate active" : "weekDate"}>
                                                        <span>W</span>
                                                    </li>
                                                    <li className={ handleCheck('thu', list.schedules) ? "weekDate active" : "weekDate"}>
                                                        <span>T</span>
                                                    </li>
                                                    <li className={ handleCheck('fri', list.schedules) ? "weekDate active" : "weekDate"}>
                                                        <span>F</span>
                                                    </li>
                                                    <li className={ handleCheck('sat', list.schedules) ? "weekDate active" : "weekDate"}>
                                                        <span>S</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="createDate">
                                                <button className="btn"><p>{ getTimeSlot(list.schedules)}</p></button>
                                            </div>
                                            <div className="createDate">
                                                <label className="toggleBtn active">
                                                    <input type="checkbox"/>
                                                    <span className="toggler"></span>
                                                </label>
                                                <div className="info_3dot_icon">
                                                    <button className="btn">
                                                        <img src={info_3dot_icon} alt=""/>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div> : ""
            }
            { configModalShow && <CallConfiguration closeModal={closeConfigModal}/> }
        </div>
    );
}

export default CallSetup;