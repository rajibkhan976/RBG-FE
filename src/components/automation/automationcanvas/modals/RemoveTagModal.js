import React, { useEffect, useState, createRef, useRef } from 'react';
import closewhite24dp from "../../../../assets/images/close_white_24dp.svg";
import chevron_right_white_24dp from "../../../../assets/images/chevron_right_white_24dp.svg";
import Select, { components } from "react-select";
import { TagServices } from "../../../../services/setup/tagServices";
import * as actionTypes from "../../../../actions/types";
import { useDispatch } from "react-redux";
import Loader from "../../../shared/Loader";
import searchIcon from "../../../../assets/images/search-group.svg";
const RemoveTagModal = (props) => {
    const dispatch = useDispatch();
    const [selectedTag, setSelectedTag] = useState("");
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [closeMessage, setCloseMessage] = useState(false);
    const handleChangeFields = (e) => {
        setSelectedTag(e);
    }
    const [selectValue, setSelectValue] = useState('');
    const handleInputChange = (inputValue) => {
        setSelectValue(inputValue);
        setCloseMessage(true);
    }
    // const selectRef = React.useRef();
    const createOption = (value) => {
        // if (selectRef.current) {
        //     selectRef.current.focus();
        //   }
        let tag = {
            value: '0123456789',
            label: value,
        }
        setSelectedTag([...selectedTag, tag]);
        // setSelectValue('');
        setCloseMessage(false);
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
    }, []);
    const NoOptionsMessage = props => {
        return (
            <div>
                {closeMessage &&
                    <components.NoOptionsMessage {...props}>
                        <div className="noData">
                            <img src={searchIcon} />
                            <p>Sorry! we couldn’t find any match. you can create a new Tag</p>
                            <h3>"{selectValue}"</h3>
                            <button className="creatUserBtn" onClick={() => createOption(selectValue)}>+ Create Tag</button>
                        </div>
                    </components.NoOptionsMessage>
                }
            </div>

        );
    };
    return (
        <React.Fragment>
            <div className="automationModal filterModal">
                <div className="nodeSettingModal tagSettingModal">
                    <div className="formHead">
                        <div className="heading">
                            {/* <p>{props.tagModalType} Tag Settingss</p> */}
                            <p>Remove tags</p>
                        </div>
                        <div className="closeButton">
                            <button onClick={props.closeFilterModal}>
                                <img src={closewhite24dp} alt="Close Filter Modal" />
                            </button>
                        </div>
                    </div>
                    <div className="formBody">
                        {isLoading ? <Loader /> : ''}
                        <div className="formBodyContainer addTagFromContainer">
                            <div className="emailDetails">
                                <div className="inputField">
                                    <label htmlFor="delayTm">Select Tag</label>
                                    <div className="inFormField">
                                        <Select name="city"
                                            isMulti
                                            className="multiSelect"
                                            openMenuOnFocus={true}
                                            // ref={selectRef}
                                            value={selectedTag}
                                            onChange={(e) => handleChangeFields(e)}
                                            onInputChange={handleInputChange}
                                            options={options}
                                            isClearable={true}
                                            placeholder="Select a Tag"
                                            maxMenuHeight={215}
                                            components={{ NoOptionsMessage }}
                                        />
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
export default RemoveTagModal;