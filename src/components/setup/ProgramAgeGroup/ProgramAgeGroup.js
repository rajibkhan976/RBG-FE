import { useState, useEffect, useRef } from "react";
import {useDispatch} from "react-redux";
import * as actionTypes from "../../../actions/types";
import Loader from "../../shared/Loader";
import plusIcon from "../../../assets/images/plus_icon.svg";
import noRecords from "../../../assets/images/noRecords.svg";
import info_3dot_icon from "../../../assets/images/info_3dot_icon.svg";
import CreateAgeGroupModal from "./CreateAgeGroupModal";
import { CustomizationServices } from "../../../services/setup/CustomizationServices";
import ConfirmBox from "../../shared/confirmBox";



const ProgramAgeGroup = () => {

    const [addAgeGroupModal, setAddAgeGroupModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ageGroupList, setAgeGroupList] = useState([]);
    const [listIndex, setListIndex] = useState(null);
    const [editGroupVal, setEditGroupVal] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [deletedGroupId, setDeletedGroupId] = useState(null);

    const ref = useRef();

    useEffect(() => {
        const checkClickOutside = (e) => {
            if(typeof option != "object" && ref.current && !ref.current.contains(e.target)) {
                setListIndex(null);
            }  
        }
  
        document.addEventListener("click", checkClickOutside);
        return () => {
            document.removeEventListener("click", checkClickOutside);
        };
    });

    const dispatch = useDispatch();

    const fetchAgeGroup = async () => {
        try {
            setLoading(true);
            let response = await CustomizationServices.fetchAgeGroup();
            setAgeGroupList(response.agegroups);
        } catch (e) {
            dispatch({ 
                type: actionTypes.SHOW_MESSAGE, 
                message: e.message, 
                typeMessage: 'error' 
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgeGroup();

        const close = (e) => {
            if(e.keyCode === 27){
                setListIndex(null);
            }
        }
        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close);
    }, []);

    const openAddAgeGroupModal = () => {
        setAddAgeGroupModal(true);
    };

    const closeAddAgeGroupModal = () => {
        setAddAgeGroupModal(false);
        setEditGroupVal(null);
    }

    const popupLoader = (param) => {
        setLoading(param);
    };

    const moreOptHandel = (param) => {
        setListIndex(listIndex == param ? null : param);
    };

    const editGroup = (item) => {
        setAddAgeGroupModal(true);
        setEditGroupVal(item);
    };

    const deleteAgeGroupHandel = (item) => {
        setDeleteConfirm(true);
        setDeletedGroupId(item._id);
    };

    const deleteAgeGroup = async (param) => {
        if (param == "yes") {
            try {
                setLoading(true);
                let response = await CustomizationServices.deleteAgeGroup(deletedGroupId);
                console.log(response);
                dispatch({ 
                    type: actionTypes.SHOW_MESSAGE, 
                    message: response.message, 
                    typeMessage: 'success' 
                });
            } catch (e) {
                dispatch({ 
                    type: actionTypes.SHOW_MESSAGE, 
                    message: e.message, 
                    typeMessage: 'error' 
                });
            } finally {
                setDeleteConfirm(false);
                setDeletedGroupId(null);
                setLoading(false);
                fetchAgeGroup();
            }
        } else {
            setDeleteConfirm(false);
            setDeletedGroupId(null);
        }
    };


    return (
        <div className="dashInnerUI cz_AgeGroupPage">
            {loading && <Loader />}
            <div className="userListHead">
                <div className="listInfo">
                    <ul className="listPath">
                        <li>Setup</li>
                        <li>Customization</li>
                        <li>Program Age Groups</li>
                    </ul>
                    <h2 className="inDashboardHeader">Program Age Groups ({ageGroupList.length})</h2>
                    <p className="userListAbout">Lorem ipsum dolor sit amet. Semi headline should.</p>
                </div>
                <div className="listFeatures">
                    <button className="creatUserBtn" onClick={openAddAgeGroupModal}>
                        <img className="plusIcon" src={plusIcon} alt="" /><span>Create</span>
                    </button>
                </div>
            </div>
            {ageGroupList.length > 0 ?
            <div className="cz_listBody">
                <div className="userListBody">
                    <div className="listBody">
                        <ul className="tableListing" ref={ref}>
                            <li className="listHeading">
                                <div className="cell_xs">
                                    Age Group Name
                                </div>
                                <div className="cell_xs">
                                    Age Range
                                </div>
                                <div className="cell_xs"></div>
                            </li>
                            {ageGroupList.map((item, index) => {
                                return (
                                    <li key={"ageGroup_" + index}>
                                        <div className="cell_xl">
                                            <p>{item.name}</p>
                                        </div>
                                        <div className="cell_xl">
                                            <p>
                                                <span className={item.min === "above" || item.min === "below" ? "cz_lite" : ""}>{item.min}</span>
                                                {item.max === "above" || item.max === "below" || item.min === "above" || item.min === "below" ? " " : " - "}
                                                <span className={item.max === "above" || item.max === "below" ? "cz_lite" : ""}>{item.max}</span>
                                            </p>
                                        </div>
                                        <div className="cell_xs">
                                            <div className="info_3dot_icon" >
                                                <button className="btn" onClick={() => moreOptHandel (index)}>
                                                    <img src={info_3dot_icon} alt="" />
                                                </button>
                                            </div>
                                            {listIndex === index ? 
                                            <div className="dropdownOptions listOpen">
                                                <button className="btn btnEdit" onClick={() => editGroup (item)}>
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.553 13.553" className="editIcon"><g transform="translate(0.75 0.75)"><path className="a" d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423" transform="translate(-2 -2.795)"></path><path className="a" d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z" transform="translate(-4.384 -2)"></path></g></svg>
                                                    </span>
                                                    Edit
                                                </button>
                                                <button className="btn btnDelete" onClick={()=> deleteAgeGroupHandel (item)}>
                                                    <span>
                                                        <svg className="deleteIcon" xmlns="http://www.w3.org/2000/svg" width="12.347" height="13.553" viewBox="0 0 12.347 13.553"><g transform="translate(0.75 0.75)"><path className="a" d="M3,6H13.847" transform="translate(-3 -3.589)"></path><path className="a" d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411" transform="translate(-3.795 -2)"></path><line className="a" y2="3" transform="translate(4.397 6.113)"></line><line className="a" y2="3" transform="translate(6.397 6.113)"></line></g></svg>
                                                    </span>
                                                    Delete
                                                </button>
                                            </div>
                                            : "" }
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            :
            <div className="cz_body">
                <div className="createNew noInfos cz_noRecord">
                    <div className="noRecordsImgWraper">
                        <img src={noRecords} className="noRecords" alt=""/>
                        <h4>No Age Group Found</h4>
                        <p>No age group have been listed here yet</p>
                    </div>
                    <button className="creatUserBtn" onClick={openAddAgeGroupModal}>
                        <img className="plusIcon" src={plusIcon} alt=""/>
                        <span>Create the First Age Group</span>
                    </button>
                </div>
            </div>
            }
            {addAgeGroupModal && 
            <CreateAgeGroupModal 
                closeModal={closeAddAgeGroupModal} 
                loader={popupLoader} 
                fetchAgeGroup={fetchAgeGroup} 
                item={editGroupVal} 
            />}
            {deleteConfirm && 
            <ConfirmBox 
            message="Once you delete this one, this will be deleted from associated programs. Are you sure you want to delete?" 
            callback={deleteAgeGroup} 
            />}
        </div>
    )
};

export default ProgramAgeGroup;