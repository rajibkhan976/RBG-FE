import { useEffect, useRef, useState } from "react";
import {useDispatch} from "react-redux";
import * as actionTypes from "../../../actions/types";
import tagIconDark from "../../../assets/images/tagIconDark.svg";
import crossIcon from "../../../assets/images/cross.svg";
import arrowForwardIcon from "../../../assets/images/arrow_forward.svg";
import ageAgeGroupIcon from "../../../assets/images/age_group_icon.svg";
import { CustomizationServices } from "../../../services/setup/CustomizationServices";
import Loader from "../../shared/Loader";



const CreateAgeGroupModal = (props) => {
    const dispatch = useDispatch();
    const [maxAgeArr, setMaxAgeArr] = useState();
    const [formData, setFormData] = useState({
        name: props.item?.name,
        min: props.item?.min,
        max: props.item?.max
    });
    const [formFieldError, setFormFieldError] = useState({
        name: "",
        min: "",
        max: ""
    });
    const [formValid, setFormValid] = useState(false);

    console.log("Props", props);

    const groupOpt = (age) => {
        let arr = [];
        for (var i = 1; i < 61; i++) {
            if (age == "below") {
                arr.push(i);
            } else {
                if (age < i) {
                    arr.push(i);
                }
            }
        }
        setMaxAgeArr(arr);
    };

    const groupNameHandel = (e) => {
        let val = e.target.value;
        if(/^\s/.test(val)){
            val = '';
        } else {
            val = e.target.value;
        }
        setFormData({...formData, name: val});
        validate.name(val);
    };

    const minHandel = (e) => {
        let val = e.target.value;
        setFormData({...formData, min: val});
        validate.min(val);
        groupOpt(val);
    };

    const maxHandel = (e) => {
        setFormData({...formData, max: e.target.value});
        validate.max(e.target.value);
    };

    useEffect(() => {
        groupOpt(props.item ? props.item.min : "");
    }, []);

    const validate = {
        name: (val) => {
            if(val === "" || typeof val === 'undefined') {
                setFormFieldError(prevState => ({...prevState, name: "Please enter an age group name"}));
                return false;
            } else {
                setFormFieldError({...formFieldError, name: ""});
                return true;
            }
        },
        min: (val) => {
            if(val === "" || typeof val === 'undefined') {
                setFormFieldError(prevState => ({...prevState, min: "Please select min age"}));
                return false;
            } else {
                setFormFieldError({...formFieldError, min: ""});
                return true;
            }
        },
        max: (val) => {
            if(val === "" || typeof val === 'undefined') {
                setFormFieldError(prevState => ({...prevState, max: "Please select max age"}));
                return false;
            } else {
                setFormFieldError({...formFieldError, max: ""});
                return true;
            }
        },
        validateForm : (data) => {
            let bool = true;
            if(!validate.name(data.name) || !validate.min(data.min) || !validate.max(data.max)){
                bool = false;
            } else {
                bool = true;
            }
            return bool;
        }
    }
    

    const createGroup = async (param) => {
        const isValidFormData = validate.validateForm(formData);
        console.log("Form valid?", isValidFormData);
        if (isValidFormData) {
            props.loader(true);
            try {
                if (props.item) {
                    await CustomizationServices.editAgeGroup(formData, props.item._id);
                    dispatch({ 
                        type: actionTypes.SHOW_MESSAGE, 
                        message: "Age group edited successfully" , 
                        typeMessage: 'success' 
                    });
                } else {
                    await CustomizationServices.createAgeGroup(formData);
                    dispatch({ 
                        type: actionTypes.SHOW_MESSAGE, 
                        message: "Age group created successfully" , 
                        typeMessage: 'success' 
                    });
                }
                props.loader(false);
                if(param) {
                    props.closeModal();
                }
                setFormData({...FormData, name: "", min: "", max: ""});
            } catch (e) {
                dispatch({ 
                    type: actionTypes.SHOW_MESSAGE, 
                    message: e.message, 
                    typeMessage: 'error' 
                });
            } finally {
                props.fetchAgeGroup();
            }
        }
    };


    return (
        <div className="modalBackdrop cz_addTagModal">
            <div className="modalBackdropBg" onClick={props.closeModal}></div>
            <div className="slickModalBody">
                <div className="slickModalHeader">
                    <button className="topCross" onClick={props.closeModal}>
                        <img src={crossIcon} alt="" />
                    </button>
                    <div className="circleForIcon">
                        <img src={ageAgeGroupIcon} alt="" />
                    </div>
                    <h3>Add a New Age Group</h3>
                    <p>Please enter below information to Add a new Age Group</p>
                </div>
                <div className="modalForm">
                    <form action="">
                        <div className={formFieldError.name ? "cmnFormRow errorField" : "cmnFormRow"}>
                            <lable className="cmnFieldName">Age Group Name</lable>
                            <input type="text" className="cmnFieldStyle" name="name" value={formData.name} onChange={groupNameHandel} />
                            {formFieldError.name ? <div className="errorMsg">{formFieldError.name}</div> : ""}
                        </div>
                        <div className="cmnFieldName cz_block">Age Range</div>
                        <div className="cmnFormRow">
                            <div className={formFieldError.min ? "cmnFormCol errorField" : "cmnFormCol"}>
                                <label className="cmnFieldName">Min</label>
                                <select className="cmnFieldStyle" value={formData.min} onChange={minHandel}>
                                    <option value="">Select age</option>
                                    <option value="below">Below</option>
                                    {Array.from({length: 60}, (_, i) => i + 1).map((list, key) => {
                                        return (
                                            <option key={"minage_"+key} value={list}>{list}</option>
                                        )
                                    })}
                                </select>
                                {formFieldError.min ? <div className="errorMsg">{formFieldError.min}</div> : ""}
                            </div>
                            <div className={(formData.min) ? (formFieldError.max) ? "cmnFormCol errorField":"cmnFormCol" : "cmnFormCol disabled"}>
                                <label className="cmnFieldName">Max</label>
                                <select className="cmnFieldStyle" 
                                value={formData.max} 
                                onChange={maxHandel}>
                                    <option value="">Select age</option>
                                    {formData.min !== "below" ? <option value="above">Above</option> : ""}
                                    {maxAgeArr?.map((val, key) => {
                                        return (
                                            <option key={"max_"+key} value={val}>{val}</option>
                                        )
                                    })}
                                </select>
                                {formFieldError.max ? <div className="errorMsg">{formFieldError.max}</div> : ""}
                            </div>
                        </div>
                        <div className="btnGroup centered">
                            <button type="button" className="cmnBtn" onClick={() => createGroup (true)}>
                                <span>Save</span> 
                                <img src={arrowForwardIcon} alt="" />
                            </button>
                            {!props.item ?
                            <button type="button" className="cmnBtn" onClick={() => createGroup (false)}>
                                <span>Save & New</span>
                                <img src={arrowForwardIcon} alt="" />
                            </button>
                            : "" }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default CreateAgeGroupModal;