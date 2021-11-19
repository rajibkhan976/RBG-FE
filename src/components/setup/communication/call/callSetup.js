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
import ConfirmBox from "../../../shared/confirmBox";
import { utils } from "../../../../helpers";

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
    const [selectedRingtone, setSelectedRingtone] = useState("");
    const [selectedConf, setSelectedConf] = useState([]);
    const [option, setOption] = useState(null);
    const [isAlert, setIsAlert] = useState({
        show: false,
        el: null,
    });
    const messageDelay = 5000; // ms
    const [sortBy, setSortBy] = useState("");
    const [sortType, setSortType] = useState("asc");

    const ringtineListItem = useRef();

    const fetchRingtone = async () => {
        setRingtoneLoader(true);
        let ringtoneResponce = await RingtoneServices.fetchRingtone();
        setRingtoneLoader(false);
        ringtoneList = ringtoneResponce.ringtones;
        setFoundTrack(ringtoneList);
        console.log("ringtoneList__", ringtoneList);
    }

    const toggleOptions = (index) => {
        setOption(index !== option ? index : null);
    };
    
     /**
     * Auto hide success or error message
     */
      useEffect(() => {
        if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
        if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
    }, [successMsg, errorMsg])

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
        fetchNumber();
    }
    const fetchNumber = async () => {
        setIsLoader(true);
        try {
            const queryParams = new URLSearchParams();
            const srtBy = utils.getQueryVariable('sortBy');
            const srtType = utils.getQueryVariable('sortType');

            if (srtBy && srtType) {
                queryParams.append("sortBy", srtBy);
                queryParams.append("sortType", srtType);
            }

            const result = await CallSetupService.fetchNumber(queryParams);
            setNumberObj(result);
            setSelectedRingtone(result.ringtone);
            setConfigurationList(result.config);
        } catch (e) {
            setErrorMsg('No number found. Please contact to support.');
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
            if(typeof option != "object" && ref.current && !ref.current.contains(e.target)) {
                setOption(null);
            }  
        }

        document.addEventListener("click", checkClickOutside);
        return () => {
            document.removeEventListener("click", checkClickOutside);
        };
    });

    // Delete config
    const deleteConfig = async (config, isConfirmed = false) => {
        setOption(null);
        if (config && !isConfirmed) {
            setIsAlert({
                show: true,
                el: config,
            });
        } else if (config && isConfirmed == "yes") {
            // delete
            console.log("Delete config", isConfirmed);
            setIsLoader(true);

            try {
                // Delete from db
                await CallSetupService.deleteCallConfig(config._id);

                // Delete from current list
                let delIndex = configurationList.indexOf(config);
                configurationList.splice(delIndex, 1);;
                setConfigurationList([...configurationList]);

                setSuccessMsg("Configuration deleted successfully");
            } catch (e) {
                setErrorMsg("Unable to delete the configuration");
            }
            setIsAlert({
                show: false,
                el: null,
            });
            setIsLoader(false);
        } else {
            setIsAlert({
                show: false,
                el: null,
            });
        }
    }

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
        fetchNumber()
    }

    const statusToogle = async (ev, id, key) => {
        ev.preventDefault();
        console.log("Status tog");
        try {
            configurationList[key].status =  configurationList[key].status == "active" ? "inactive" : "active";
            setConfigurationList([...configurationList]);
            setIsLoader(true);
            await CallSetupService.callConfigToggleStatus(id);
            setIsLoader(false);
            
            setSuccessMsg("Status has been changed successfully");
        } catch (e) {
            setIsLoader(false);
            configurationList[key].status =  configurationList[key].status == "active" ? "inactive" : "active";
            setConfigurationList([...configurationList]);
            setErrorMsg(e.message);
        }
       
    }

    return(
        <div className="dashInnerUI">
            {isLoader ? <Loader /> : ''}
            {successMsg &&
            <SuccessAlert message={successMsg}></SuccessAlert>
            }
            {errorMsg &&
            <ErrorAlert message={errorMsg}></ErrorAlert>
            }
            {isAlert.show &&
                <ConfirmBox
                    message={() => {
                        return configurationList.length == 13 ? 
                        "Are you sure, you want to delete? if you delete all the configurations then system will use the system default configuration which is only call response receive call" : ""
                    }}
                    callback={(isConfirmed) => deleteConfig(isAlert.el, isConfirmed)}
                />
            }
            <div className="userListHead">
                <div className="listInfo">
                    <ul className="listPath">
                        <li>Setup</li>
                        <li>Communication Setup</li>
                        <li>Call</li>
                    </ul>
                    <h2 className="inDashboardHeader">Call Setup</h2>
                    <p className="userListAbout">Lorem ipsum dolor sit amet. Semi headline should be here.</p>
                </div>
                { Object.keys(numberObj).length ?
                    <div className="listFeatures">
                        <button className="creatUserBtn" onClick={openConfigModal}>
                            <img className="plusIcon" src={plus_icon} alt=""/>
                            <span>Add a configuration</span>
                        </button>
                    </div> : ""
                }
            </div>
            {
                Object.keys(numberObj).length ?
                <div className="userListBody callListingTable">
                    <div className="assignedNumberArea">
                        <h3>Assigned Phone Number</h3>
                        <p>{ "+" + numberObj.prefix + "-" + numberObj.nationalNumber + " [ " + numberObj.numberAlias + " ] "}</p>
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
                                                        <li className={element._id === selectedRingtone ? "selected" : ""}>
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
                                <div
                                    className={"userName " + (sortBy == "name" ? "sort " + sortType : "")}
                                    onClick={() => handleSortBy("name")}>
                                    Name
                                </div>
                                <div>
                                    Scheduled Day (s)
                                </div>
                                <div 
                                    className={(sortBy == "name" ? "sort " + sortType : "")}
                                    onClick={() => handleSortBy("status")}>
                                    Status
                                </div>
                            </li>
                            {
                                configurationList.map((list, key) => {
                                    return (
                                        <li key={key}>
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
                                                <label className={"toggleBtn " + list.status }  >
                                                    <input type="checkbox" onChange={ (e) => { statusToogle(e, list._id, key) }}/>
                                                    <span className="toggler"></span>
                                                </label>
                                                <div className="info_3dot_icon">
                                                    <button className="btn"
                                                        onClick={() => {
                                                            toggleOptions(key);
                                                        }}>
                                                        <img src={info_3dot_icon} alt=""/>
                                                    </button>
                                                </div>
                                                <React.Fragment key={key + "_fragment"}>
                                                    <div
                                                        className={
                                                            option === key ? "dropdownOptions listOpen" : "listHide"
                                                        }
                                                    >
                                                        <button className="btn btnEdit">
                                                            <span>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 13.553 13.553"
                                                                    className="editIcon"
                                                                >
                                                                    <g transform="translate(0.75 0.75)">
                                                                        <path
                                                                            className="a"
                                                                            d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423"
                                                                            transform="translate(-2 -2.795)"
                                                                        />
                                                                        <path
                                                                            className="a"
                                                                            d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z"
                                                                            transform="translate(-4.384 -2)"
                                                                        />
                                                                    </g>
                                                                </svg>
                                                            </span>
                                                            Edit
                                                        </button>
                                                        <button className="btn btnDelete"
                                                           onClick={() => deleteConfig(list)}>
                                                            <span>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="12.347"
                                                                    height="13.553"
                                                                    viewBox="0 0 12.347 13.553"
                                                                    className="deleteIcon"
                                                                >
                                                                    <g transform="translate(0.75 0.75)">
                                                                        <path className="a" transform="translate(-3 -3.589)" />
                                                                        <path
                                                                            className="a"
                                                                            d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411"
                                                                            transform="translate(-3.795 -2)"
                                                                        />
                                                                        <line
                                                                            className="a"
                                                                            y2="3"
                                                                            transform="translate(4.397 6.113)"
                                                                        />
                                                                        <line
                                                                            className="a"
                                                                            y2="3"
                                                                            transform="translate(6.397 6.113)"
                                                                        />
                                                                    </g>
                                                                </svg>
                                                            </span>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </React.Fragment>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div> : ""
            }
            { configModalShow && <CallConfiguration openModal={openConfigModal} closeModal={closeConfigModal} numberId={numberObj._id} conf={selectedConf}/> }
        </div>
    );
}

export default CallSetup;