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
    const [nowPlaying, setNowPlaying] = useState();
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [nowEditing, setNowEditing] = useState();

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
        setFoundTrack(ringtoneList);
        setIsSearching(false);
    }

    
    const playRingtone = (element) => {
        if (element._id === nowPlaying) {
            if (isAudioPlaying) {
                ringtone.pause();
                setIsAudioPlaying(false);
            } else {
                ringtone.play();
                setIsAudioPlaying(true);
            }
        } else {
            ringtone.pause();
            ringtone = new Audio(element.file);
            console.log("Playing >>> " + element.file, ringtone);
            ringtone.play();
            setNowPlaying(element._id);
            setIsAudioPlaying(true);
        }

        ringtone.onended = () => {
            setIsAudioPlaying(false);
        }
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

    const editTrack = (element) => {
        setNowEditing(element._id);
        setNewRingName(element.name);
    }

    const newTrackName = (e) => {
        setNewRingName(e.target.value);
    }

    const cancelName = () => {
        setNowEditing("");
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
        setNowEditing("");
    };

    const deleteRingtone = async (element) => {
        setRingtoneLoader(true);
        let ringtoneResponce = await RingtoneServices.deleteRingtone(element._id);
        setRingtoneLoader(false);
        ringtoneList = ringtoneResponce.ringtones;
        setFoundTrack(ringtoneList);
        setNowEditing("");
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
                                <img src={orange_add_icon} alt=""/> Ringtone Setup
                            </button>
                            {ringtoneDropdown ?
                                <div className="ringToneDropDown">
                                    {ringtoneLoader && <Loader/>}
                                    <div className={uploadRingSlide ? "hide" : "ringtoneListSlide"}>
                                        <div
                                            className={isSearching ? "ringToneDropDownHead searchign" : "ringToneDropDownHead"}>
                                            <div
                                                className={isSearching ? "searchRingTone searching" : "searchRingTone"}>
                                                <input type="text" value={searchKeyVal} placeholder="Search Ringtone"
                                                       onChange={filterTrack}/>
                                            </div>
                                            {isSearching ? <button className="clearSearchBtn"
                                                                   onClick={clearTrackSearch}></button> :
                                                <button className="addRingToneBtn" onClick={gotoUpload}></button>}
                                        </div>
                                        <div className="ringToneList">
                                            <ul className={isSearching ? "filterResult" : ""}>
                                                {foundTrack && foundTrack.length > 0 ? (
                                                    foundTrack.map((element, key) => (
                                                        <li className={element.selected ? "selected" : ""}>
                                                            {nowEditing === element._id ?
                                                                <>
                                                                    <input type="text" className="toneNameEdit"
                                                                           value={newRingName} onChange={newTrackName}/>
                                                                    <div className="toneAction">
                                                                        {newRingName === element.name ?
                                                                            <button className="cancelName"
                                                                                    onClick={() => cancelName(element)}></button>
                                                                            :
                                                                            <button className="saveName"
                                                                                    onClick={() => editRingtone(element)}></button>
                                                                        }

                                                                        <button className="deleteTrack"
                                                                                onClick={() => deleteRingtone(element)}></button>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    <button className="toneName">{element.name}</button>
                                                                    <div className="toneAction">
                                                                        {!element.default ? <button className="toneEdit"
                                                                                                    onClick={() => editTrack(element)}></button> : ""}
                                                                        <button
                                                                            className={nowPlaying === element._id && isAudioPlaying ? "tonePause" : "tonePlay"}
                                                                            ref={ringtineListItem}
                                                                            onClick={() => playRingtone(element)}></button>
                                                                    </div>
                                                                </>
                                                            }


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
                                                <img src={arrow_forward} alt=""/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className={uploadRingSlide ? "uploadRingSlide" : "hide"}>
                                        <div className="ringToneDropDownHead">
                                            <button className="backToToneList" onClick={backToToneList}>Add Ringtone
                                            </button>
                                        </div>
                                        <div
                                            className={fileUploadStatus ? "ringUploadPlate successScreen" : "ringUploadPlate"}>
                                            <h3 className={fileUploadStatus ? "success" : ""}>
                                                <figure>
                                                    <img
                                                        src={
                                                            choosedFile === "" ? upload_cloud_icon_small :
                                                                (fileUploadStatus ? file_done_icon : music_file_icon)
                                                        }
                                                        alt=""
                                                    />
                                                </figure>
                                                {
                                                    choosedFile === "" ? "Choose your ringtone" :
                                                        (fileUploadStatus ? "Congratulations" : choosedFile)
                                                }
                                            </h3>
                                            <p className="fileUploadInfo">
                                                {
                                                    choosedFilePath === "" ? "[Only MP3, WMA, AMR formats are supported] Maximum upload size is 5 MB" :
                                                        (fileUploadStatus ? "File successfully uploaded" : choosedFilePath)
                                                }
                                            </p>
                                            <input type="file" accept=".mp3, .wma, .amr" className="importRingtone"
                                                   id="choseRingtone" onChange={fileChose}/>
                                        </div>
                                        {!fileUploadStatus ?
                                            <div className="ringtoneName">
                                                <div className="cmnFormRow">
                                                    <div className="cmnFieldName">Ringtone Name</div>
                                                    <div className="cmnFormField">
                                                        <input type="text" className="cmnFieldStyle"
                                                               onChange={handelRingtoneName} value={ringtoneName}/>
                                                    </div>
                                                </div>
                                            </div>
                                            : ""}
                                        <div className="ringToneDropBottom">
                                            <button
                                                className={choosedFile === "" ? "cmnBtn updateRingTone disabled" : "cmnBtn updateRingTone"}
                                                onClick={uploadRingtone}>
                                                <span>{fileUploadStatus ? "Done" : "Upload"}</span>
                                                <img src={arrow_forward} alt=""/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                : ""}
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