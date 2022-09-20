import React, {useEffect, useState} from 'react';
import closewhite24dp from "../../../../assets/images/close_white_24dp.svg";
import chevron_right_white_24dp from "../../../../assets/images/chevron_right_white_24dp.svg";
import Select from "react-select";
import {TagServices} from "../../../../services/setup/tagServices";
import * as actionTypes from "../../../../actions/types";
import {useDispatch} from "react-redux";
import Loader from "../../../shared/Loader";

const TagModal = (props) => {
    const dispatch = useDispatch();
    const [selectedTag, setSelectedTag] = useState("");
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const handleChangeFields = (e) => {
        setSelectedTag(e);
    }

    const fetchTags = async () => {
        try {
            setIsLoading(true);
            let result = await TagServices.fetchTags('all');
            setIsLoading(false);
            let options = [];
            await result.tags.forEach((value) => {
                options.push({
                    value: value._id,
                    label: value.name
                })
            });
            setOptions(options);
        } catch (e) {
            setIsLoading(false);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        }

    }
    const saveTag = () => {
        if (selectedTag && selectedTag.value !== "") {
            props.saveTag(props.elem.id, selectedTag);
        } else {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: "Please select a tag.",
                typeMessage: 'error'
            });
        }
    }
    useEffect(() => {
        if (props.elem && props.elem.data && props.elem.data.tag) {
            setSelectedTag(props.elem.data.tag);
        }
        fetchTags();
    }, [])
    return (
        <React.Fragment>
            <div className="automationModal filterModal">
                <div className="nodeSettingModal tagSettingModal">
                    <div className="formHead">
                        <div className="heading">
                            <p>{props.tagModalType} Tag Settings</p>
                        </div>
                        <div className="closeButton">
                            <button onClick={props.closeFilterModal}>
                                <img src={closewhite24dp} alt="Close Filter Modal" />
                            </button>
                        </div>
                    </div>
                    <div className="formBody">
                        {isLoading ? <Loader /> : ''}
                        <div className="formBodyContainer">
                            <div className="emailDetails">
                                <div className="inputField">
                                    <label htmlFor="delayTm">Select Tag</label>
                                    <div className="inFormField">
                                        <Select name="city" value={selectedTag} onChange={(e) =>handleChangeFields(e)}
                                                options={options}  isClearable={true} placeholder="Select a Tag" maxMenuHeight={150}/>
                                    </div>
                                </div>
                            </div>
                            <div className="saveButton">
                                <button onClick={saveTag}>Save <img src={chevron_right_white_24dp} alt="" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default TagModal;