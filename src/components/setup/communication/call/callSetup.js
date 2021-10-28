import React, { useState, useRef, useEffect } from "react";
import CallConfiguration from "./callConfiguration";
import { RingtoneServices } from "../../../../services/setup/RingtoneServices";
import plus_icon from "../../../../assets/images/plus_icon.svg";
import info_3dot_icon from "../../../../assets/images/info_3dot_icon.svg";
import {ContactService} from "../../../../services/contact/ContactServices";
import {CallSetupService} from "../../../../services/setup/callSetupServices";
import {ErrorAlert, SuccessAlert} from "../../../shared/messages";
import orange_add_icon from "../../../../assets/images/orange_add_icon.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import upload_cloud_icon_small from "../../../../assets/images/upload_cloud_icon_small.svg";
import music_file_icon from "../../../../assets/images/music_file_icon.svg";
import file_done_icon from "../../../../assets/images/file_done_icon.svg";
import Loader from "../../../shared/Loader";

let ringtoneList = [];
let ringtone = new Audio();

const CallSetup = () => {
    const [configModalShow, setConfigModalShow] = useState(false);
    const [numberObj, setNumberObj] = useState({});
    const [configurationList, setConfigurationList] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [ringtoneDropdown, setRingtoneDropdown] = useState(false); // Ringtone dropdown state
    const [uploadRingSlide, setUploadRingSlide] = useState(false);
    const [choosedFile, setChoosedFile] = useState("");
    const [choosedFilePath, setChoosedFilePath] = useState("");
    const [fileUploadStatus, setFileUploadStatus] = useState();
    const [isSearching, setIsSearching] = useState(false);
    const [file, setFile] = useState({});
    const [ringtoneLoader, setRingtoneLoader] = useState(false);
    const [foundTrack, setFoundTrack] = useState([]);
    const [searchKeyVal, setSearchKeyVal] = useState("");
    const [ringtoneName, setRingtoneName] = useState("");
    const [newRingName, setNewRingName] = useState("");

    const ringtineListItem = useRef();

    const fetchRingtone = async () => {
        setRingtoneLoader(true);
        let ringtoneResponce = await RingtoneServices.fetchRingtone();
        setRingtoneLoader(false);
        ringtoneList = ringtoneResponce.ringtones;
        setFoundTrack(ringtoneList);
        console.log("ringtoneList__", ringtoneList);
    }

    
    
    const filterTrack = (e) => {
        let keyword = e.target.value;
        setSearchKeyVal(keyword);
        if (keyword !== "") {
            const results = ringtoneList.filter((track) => {
                return track.name.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFoundTrack(results);
            setIsSearching(true);
            console.log("ringtoneList__", ringtoneList);
        } else {
            setFoundTrack(ringtoneList);
            setIsSearching(false);
            console.log("ringtoneList__", ringtoneList);
        }
    };

    const clearTrackSearch = () => {
        setSearchKeyVal("");
        setIsSearching(false);
    }

    
    const playRingtone = (element) => {
        ringtone.pause();
        ringtone = new Audio(element.file);
        console.log("Playing >>> " + element.file, ringtone);
        ringtone.play();
    }

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

    const fileChose = (e) => {
        //console.log((e.target.files[0].size / 1024));
        let fullPath = e.target.value;
        if (fullPath) {
            let startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            let filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
                setRingtoneName(filename.split('.').slice(0, -1).join('.'));
            }
            setChoosedFile(filename);
            setChoosedFilePath(fullPath);
            setFile(e.target.files);
        }
    }

    const handelRingtoneName = (e) => {
        setRingtoneName(e.target.value);
    }

    const uploadRingtone = async () => {
        if (fileUploadStatus) {
            setFileUploadStatus(undefined);
            setUploadRingSlide(false);
            setChoosedFile("");
            setChoosedFilePath("");
            setFile({});
        }

        if (!fileUploadStatus || fileUploadStatus == undefined && choosedFilePath !== "") {
            setRingtoneLoader(true);
            let reader = new FileReader();
            reader.onload = async (r) => {
                let ringtoneResponce = await RingtoneServices.updateRingtone({
                    file: r.target.result,
                    name: ringtoneName
                });
                ringtoneList = ringtoneResponce.ringtones;
                setFoundTrack(ringtoneList);
                console.log(ringtoneResponce);
                setFileUploadStatus(true);
                setRingtoneName("");
                setRingtoneLoader(false);
            };
            reader.readAsDataURL(file[0]);
            
        }
    }

    const newTrackName = (e) => {
        setNewRingName(e.target.value);
    }

    const editRingtone = async (element) => {
        setRingtoneLoader(true);
        
        let ringtoneResponce = await RingtoneServices.updateRingtone({
            rintoneId: element._id,
            file: element.file,
            name: newRingName
        });
        setRingtoneLoader(false);
        ringtoneList = ringtoneResponce.ringtones;
        setFoundTrack(ringtoneList);
    };

    const deleteRingtone = async (element) => {
        setRingtoneLoader(true);
        let ringtoneResponce = await RingtoneServices.deleteRingtone(element._id);
        setRingtoneLoader(false);
        ringtoneList = ringtoneResponce.ringtones;
        setFoundTrack(ringtoneList);
    };

    const ref = useRef();

    // Toggle ringtone dropdown
    const tglRingtoneDropdown = () => {
        setRingtoneDropdown(!ringtoneDropdown);
        if (!ringtoneDropdown) {
            fetchRingtone();
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