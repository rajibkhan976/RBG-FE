import { useEffect, useState } from "react";
import {useDispatch} from "react-redux";
import * as actionTypes from "../../../actions/types";
import plusIcon from "../../../assets/images/plus_icon.svg";
import cressIcon from "../../../assets/images/white_cross_roundedCorner.svg";
import noRecords from "../../../assets/images/noRecords.svg";
import { CustomizationServices } from "../../../services/setup/CustomizationServices";
import Loader from "../../shared/Loader";
import CreateTagModal from "./CreateTagModal";
import ConfirmBox from "../../shared/confirmBox";


const AppointmentTags = (props) => {

    const [tagList, setTaglist] = useState([]);
    const [createTagModal, setCreateTagModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [deleteTagId, setDeleteTagId] = useState(null);

    const dispatch = useDispatch();
    
    const fetchTags = async () => {
        try {
            setLoading(true);
            let response = await CustomizationServices.fetchTags();
            setTaglist(response.tags);
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
        fetchTags();
    }, []);

    const openCreateTagModal = () => {
        setCreateTagModal(true);
    };

    const closeModal = () => {
        setCreateTagModal(false);
    }

    const popupLoader = (param) => {
        setLoading(param);
    };

    const deleteTagHandel = (item) => {
        setDeleteConfirm(true);
        setDeleteTagId(item._id);
    };

    const deleteTag = async (param) => {
        if (param == "yes") {
            try {
                setLoading(true);
                let response = await CustomizationServices.deleteTag(deleteTagId);
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
                setDeleteTagId(null);
                setLoading(false);
                fetchTags();
            }
        } else {
            setDeleteConfirm(false);
            setDeleteTagId(null);
        }
    };


    return (
        <div className="dashInnerUI cz_tagPage">
            {loading && <Loader />}
            <div className="userListHead">
                <div className="listInfo">
                    <ul className="listPath">
                        <li>Setup</li>
                        <li>Customization</li>
                        <li>Tags</li>
                    </ul>
                    <h2 className="inDashboardHeader">Tags ({tagList.length})</h2>
                    <p className="userListAbout">Lorem ipsum dolor sit amet. Semi headline should.</p>
                </div>
                <div className="listFeatures">
                    <button className="creatUserBtn" onClick={openCreateTagModal}>
                        <img className="plusIcon" src={plusIcon} alt="" /><span>Create</span>
                    </button>
                </div>
            </div>
            <div className="cz_body">
                {tagList.length > 0 ?
                <ul className="cz_tagList">
                    {tagList.map((item, index) => {
                        return (
                            <li className="cz_tag" key={"tag_" + index}>
                                {item.name}
                                <button type="button" onClick={() => deleteTagHandel (item)}><img src={cressIcon} alt="" /></button>
                            </li>
                        )})
                    }
                </ul>
                :
                <div className="createNew noInfos cz_noRecord">
                    <div className="noRecordsImgWraper">
                        <img src={noRecords} className="noRecords" alt=""/>
                        <h4>No Tags Found</h4>
                        <p>No appointment tags have been listed here yet</p>
                    </div>
                    <button className="creatUserBtn" onClick={openCreateTagModal}>
                        <img className="plusIcon" src={plusIcon} alt=""/>
                        <span>Create the First Tag</span>
                    </button>
                </div>
                }
            </div>
            {createTagModal && <CreateTagModal closeModal={closeModal} loader={popupLoader} fetchTags={fetchTags} />}
            {deleteConfirm && <ConfirmBox message="Once you delete this tag, this will be deleted from associated products. Are you sure, you want to delete?" callback={deleteTag} />}
        </div>
    )
}


export default AppointmentTags;