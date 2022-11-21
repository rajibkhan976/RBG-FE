import { useEffect, useState, useRef } from "react";
import {useDispatch} from "react-redux";
import * as actionTypes from "../../../actions/types";
import { CustomizationServices } from "../../../services/setup/CustomizationServices";
import Loader from "../../shared/Loader";
import { ProductServices } from "../../../services/setup/ProductServices";
import plusIcon from "../../../assets/images/plus_icon.svg";
import tagIconDark from "../../../assets/images/tagIconDark.svg";
import crossIcon from "../../../assets/images/cross.svg";
import arrowForwardIcon from "../../../assets/images/arrow_forward.svg";
import sizeIcon from "../../../assets/images/size_icon.svg";
import noData_search_icon from "../../../assets/images/noData_search_icon.svg";


const CreateProductSizeModal = (props) => {
    const [fetchedCatList, setFetchedCatList] = useState([]);
    const [catList, setCatList] = useState([]);
    const [selectedCat, setSelectedCat] = useState([]);
    const [catListIsOpen, setCatListIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: props.item ? props.item.name : "",
        category: props.item ? [props.item.categoryId] : [],
        desc: props.item ? props.item.desc : ""
    });
    const [formError, setFormError] = useState({
        name: null,
        category: null,
    });
    const [catSearchKey, setCatSearchKey] = useState("");

    const ref = useRef();
    const dispatch = useDispatch();

    const fetchCatList = async () => {
        try {
            props.loader(true);
            const response = await ProductServices.fetchCategory();
            setFetchedCatList(response);
            setCatList(response);
        } catch (e) {
            dispatch({ 
                type: actionTypes.SHOW_MESSAGE, 
                message: e.message, 
                typeMessage: 'error' 
            });
        } finally {
            props.loader(false);
        }
    };

    const sizeNameHandel = (e) => {
        let val = e.target.value;
        if(/^\s/.test(val)){
            val = '';
        } else {
            val = e.target.value;
        }
        setFormData({...formData, name: val});
        validate.name(val);
    };

    const descriptionHandel = (e) => {
        let val = e.target.value;
        setFormData({...formData, desc: val});
    };

    const selectCat = (item, index) => {
        setSelectedCat([...selectedCat, item]);
        setFormData({...formData, category: [...formData.category, item._id]});
        for (var i =0; i < catList.length; i++) {
            if (catList[i]._id === item._id) {
                catList[i].selected = true;
            }
        }
        setFormError({...formError, category: null});
    }

    const deselectCat = (item) => {
        setSelectedCat([...selectedCat.filter(cat => cat._id !== item._id)]);
        setFormData({...formData, category: [...formData.category.filter(id => item._id !== id)]});
        for (var i =0; i < catList.length; i++) {
            if (catList[i]._id === item._id) {
                catList[i].selected = false;
            }
        }
        validate.category(selectedCat - 1);
    }

    const openCatListHandel = () => {
        if (!props.item) {
            setCatListIsOpen(true);
            document.getElementById("cz_catSearchBox").focus();
        }
    };

    const searchCatHandel = (e) => {
        let val = e.target.value;
        if(/^\s/.test(val)){
            val = '';
        } else {
            val = e.target.value;
            setCatSearchKey(val);
        }
        val.toLowerCase();
        if(val == "") {
            setCatList(fetchedCatList);
        } else {
            setCatList(fetchedCatList.filter(cat => cat.name.toLowerCase().includes(val)));
        }
    }

    const createCategory = async (e) => {
        try {
            props.loader(true);
            let payload = {
                name: catSearchKey
            }
            let response = await ProductServices.createCategory(payload);
            response.selected = true;
            setCatList([...fetchedCatList, response]);
            setFetchedCatList([...fetchedCatList, response]);
            setSelectedCat([...selectedCat, response]);
            setFormData({...formData, category: [...formData.category, response._id]});
            console.log("after adding new cat ", catList, selectedCat, fetchedCatList, formData.category);

            dispatch({
                type: actionTypes.SHOW_MESSAGE, 
                message: "New category created successfully", 
                typeMessage: 'success'
            });
        } catch (e) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE, 
                message: e.message, 
                typeMessage: 'error'
            });
        } finally {
            setFormError({...formError, category: null});
            props.loader(false);
            setCatSearchKey("");
            props.fetchCatList();
        }
    };

    useEffect(() => {
        const checkClickOutside = (e) => {
            if(typeof option != "object" && ref.current && !ref.current.contains(e.target)) {
                setCatListIsOpen(false);
                setCatSearchKey("");
                
            }  
        }
  
        document.addEventListener("click", checkClickOutside);
        return () => {
            document.removeEventListener("click", checkClickOutside);
        };
    });

    useEffect(() => {
        fetchCatList();
    }, []);
    
    const closeModal = () => {
        for (var i = 0; i < catList.length; i++) {
            if(catList[i].selected) {
                catList[i].selected = false;
            }
        }
        props.closeModal();
    };

    const validate = {
        category: function (val) {
            if (val.length > 0) {
                setFormError({...formError, category: null});
            } else {
                setFormError(prevState => ({...prevState, category: "Please select category"}));
            }
        },

        name: function (val) {
            if (val == "") {
                setFormError(prevState => ({...prevState, name: "Please enter size name"}));
            } else {
                setFormError({...formError, name: null});
            }
        },

        validateForm: function () {
            if (formData.category.length > 0 && formData.name) {
                return true;
            } else {
                return false;
            }
        }
    };

    const saveSize = async (param) => {
        console.log("On submit form data: ", formData);
        validate.category(formData.category);
        validate.name(formData.name);

        if (validate.validateForm()) {
            try {
                if (props.item) {
                    let payload = {
                        name: formData.name,
                        desc: formData.desc
                    }
                    props.loader(true);
                    const response = await CustomizationServices.editProductSize(payload, props.item._id);
                    props.fetchProductSizes();
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE, 
                        message: response.message, 
                        typeMessage: 'success'
                    });
                } else {
                    props.loader(true);
                    const response = await CustomizationServices.createProductSize(formData);
                    props.fetchProductSizes();
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE, 
                        message: "New size created successfully", 
                        typeMessage: 'success'
                    });
                }
            } catch (e) {
                dispatch({
                    type: actionTypes.SHOW_MESSAGE, 
                    message: e.message, 
                    typeMessage: 'error'
                });
            } finally {
                props.loader(false);
                if (param) {
                    closeModal();
                    setFormData({
                        ...formData,
                        name: "",
                        category: [],
                        desc: ""
                    });
                } else {
                    setFormData({
                        ...formData,
                        name: "",
                        desc: ""
                    });
                }
            }
        }
    };

    return (
        <div className="modalBackdrop cz_addTagModal">
            <div className="modalBackdropBg" onClick={closeModal}></div>
            <div className="slickModalBody">
                <div className="slickModalHeader">
                    <button className="topCross" onClick={closeModal}>
                        <img src={crossIcon} alt="" />
                    </button>
                    <div className="circleForIcon">
                        <img src={sizeIcon} alt="" />
                    </div>
                    <h3>{props.item ? "Edit Size" : "Add new Size"}</h3>
                    <p>Please enter below information to {props.item ? "Edit" : "Add a new"} Size</p>
                </div>
                <div className="modalForm">
                    <form action="">
                        <div className={formError.category ? "cmnFormRow errorField" : "cmnFormRow"}>
                            <lable className="cmnFieldName">Category <span className="mandatory">*</span></lable>
                            <div className="cz_selectCategory cmnFieldStyle" ref={ref} onClick={openCatListHandel}>
                                <div className="cz_categorySelectSec">
                                    <div className="cz_selectedCatList">
                                        {console.log(props.item)}
                                        <ul>
                                            {selectedCat.length ? selectedCat.map((item, index) => {
                                                return (
                                                    <li key={"selectedCat_" + index}>
                                                        <div className="cz_selectedCat">
                                                            {item.name}
                                                            <button type="button" className="cz_removeCat" onClick={() => deselectCat (item)}></button>
                                                        </div>
                                                    </li>
                                                )
                                            }) : (props.item ? 
                                                <li>
                                                    <div className="cz_selectedCat">
                                                        {props.item.categoryName}
                                                    </div>
                                                </li>
                                                : "")}
                                            <li className={!catListIsOpen ? "hide" : ""}>
                                                <input type="text" id="cz_catSearchBox" value={catSearchKey} onChange={searchCatHandel} />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {catListIsOpen ?
                                <div className="cz_categoryList">
                                    {catList.length ?
                                    <ul>
                                        {catList.map((item, index) => {
                                            return (
                                                <li key={"cat_" + index} onClick={() => selectCat (item, index)} className={item.selected ? "disabled" : ""}>{item.name}</li>
                                            )
                                        })}
                                    </ul>
                                    : (catSearchKey ? 
                                    <div className="cz_noSearchData">
                                        <figure>
                                            <img src={noData_search_icon} alt="" />
                                        </figure>
                                        <p>
                                            Sorry! we couldn't find any match.<br />You can create a new Product Category
                                        </p>
                                        <div className="cr_searchedKey">“{catSearchKey}”</div>
                                        <button type="button" className="creatUserBtn" onClick={createCategory}>
                                            <img className="plusIcon" src={plusIcon} alt="" />
                                            <span>Create Category</span>
                                        </button>
                                    </div>
                                    : "")
                                    }
                                </div>
                                : ""}
                            </div>
                            {formError.category ? <div className="errorMsg">{formError.category}</div> : ""}
                        </div>

                        <div className={formError.name ? "cmnFormRow errorField" : "cmnFormRow"}>
                            <lable className="cmnFieldName">Size Name <span className="mandatory">*</span></lable>
                            <input type="text" className="cmnFieldStyle" onChange={sizeNameHandel} value={formData.name} />
                            {formError.name ? <div className="errorMsg">{formError.name}</div> : ""}
                        </div>

                        <div className="cmnFormRow">
                            <label className="cmnFieldName">Description</label>
                            <textarea className="cmnFieldStyle" cols="30" rows="10" onChange={descriptionHandel} value={formData.desc}></textarea>
                        </div>
                        
                        <div className="btnGroup centered">
                            <button type="button" className="cmnBtn" onClick={() => saveSize (true)}>
                                <span>Save</span> 
                                <img src={arrowForwardIcon} alt="" />
                            </button>
                            {props.item ? "" :
                            <button type="button" className="cmnBtn" onClick={() => saveSize (false)}>
                                <span>Save & New</span>
                                <img src={arrowForwardIcon} alt="" />
                            </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default CreateProductSizeModal;