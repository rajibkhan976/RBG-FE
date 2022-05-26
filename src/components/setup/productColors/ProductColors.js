import { useState, useEffect, useRef } from "react";
import {useDispatch} from "react-redux";
import * as actionTypes from "../../../actions/types";
import Loader from "../../shared/Loader";
import plusIcon from "../../../assets/images/plus_icon.svg";
import filter_icon from "../../../assets/images/filter_icon.svg";
import crossIcon from "../../../assets/images/cross.svg";
import { CustomizationServices } from "../../../services/setup/CustomizationServices";
import ConfirmBox from "../../shared/confirmBox";
import noRecords from "../../../assets/images/noRecords.svg";
import info_3dot_icon from "../../../assets/images/info_3dot_icon.svg";
import CreateProductColorModal from "./CreateProductColorModal";
import { ProductServices } from "../../../services/setup/ProductServices";
import FilterColorModal from "./FilterColorModal";
import { utils } from "../../../helpers";


const ProductColors = () => {
    const [loading, setLoading] = useState(false);
    const [colorList, setColorList] = useState([]);
    const [createSizeModal, setCreateSizeModal] = useState(false);
    const [listIndex, setListIndex] = useState(null);
    const [editSizeItem, setEditSizeItem] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [deletedId, setDeletedId] = useState(null);
    const [filterModal, setFilterModal] = useState(false);
    const [fetchedCatList, setFetchedCatList] = useState([]);
    const [selectedFilterCatList, setSelectedFilterCatList] = useState([]);
    const [filterFormData, setFilterFormData] = useState([]);
    const [afterFilterCats, setAfterFilterCats] = useState([]);
    
    const dispatch = useDispatch();
    const ref = useRef();

    const fetchProductColors = async (param = null) => {
        try {
            setLoading(true);
            const category = decodeURIComponent(utils.getQueryVariable("category"));
            let response;
            if(category !== "false") {
                response = await CustomizationServices.fetchProductColors(category);
            } else {
                response = await CustomizationServices.fetchProductColors();
            }
            setColorList(response.colors);
        } catch (e) {
            dispatch({ 
                type: actionTypes.SHOW_MESSAGE, 
                message: e.message, 
                typeMessage: 'error' 
            });
        } finally {
            setLoading(false);
            setFilterModal(false);
        }
    };

    useEffect(() => {
        const category = decodeURIComponent(utils.getQueryVariable("category"));
        console.log("Category",category)
        if(category !== "false") {
            console.clear();
            setSelectedFilterCatList(category.split(","));
        } else {
            setSelectedFilterCatList([]);
        }
        // setSelectedCat(category.split(","));
    },[utils.getQueryVariable("category")]);

    const fetchCatList = async () => {
        try {
            setLoading(true);
            const response = await ProductServices.fetchCategory();
            setFetchedCatList(response);
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
        setLoading(true);
        fetchProductColors();
        fetchCatList();
        const close = (e) => {
            if(e.keyCode === 27){
                setListIndex(null);
            }
        }
        setLoading(false);
        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close);
    }, []);

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

    const openCreateSizeModal = () => {
        setCreateSizeModal(true);
    };

    const closeCreateSizeModal = () => {
        setCreateSizeModal(false);
        setEditSizeItem(null);
    };

    const moreOptHandel = (param) => {
        setListIndex(listIndex == param ? null : param);
    };

    const editSize = (item) => {
        setEditSizeItem(item);
        openCreateSizeModal();
        setListIndex(null);
    };

    const deleteColorHandle = (item) => {
        setDeleteConfirm(true);
        setDeletedId(item._id);
        setListIndex(null);
    };

    const deleteColor = async (param) => {
        if (param == "yes") {
            try {
                setLoading(true);
                let response = await CustomizationServices.deleteProductColor(deletedId);
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
                setDeletedId(null);
                setLoading(false);
                fetchProductColors();
                fetchCatList();
            }
        } else {
            setDeleteConfirm(false);
            setDeletedId(null);
        }
    };

    const openFilterModal = () => {
        setFilterModal(true);
    };

    const closeFilterModal = () => {
        setFilterModal(false);
        // setSelectedFilterCatList(afterFilterCats);
    };

    const selectFilterCat = (item) => {
        // setSelectedFilterCatList([...selectedFilterCatList, item]);
        setFilterFormData([...filterFormData, item._id]);
        console.log(item);
    };

    const deselectFilterCat = (item) => {
        // setSelectedFilterCatList([...selectedFilterCatList.filter(cat => cat._id !== item._id)]);
    };
    
    const clearFilter = () => {
        utils.removeQueryParameter("category");
        setSelectedFilterCatList([]);
        setFilterFormData([]);
        fetchCatList();
        fetchProductColors();
    };

    const deselectCat = (item) => {
        const selected = [...selectedFilterCatList];
        // console.log(selectedFilterCatList)
        const filterData = selected.filter(el => el !== item._id);
        console.log(filterData);
        setSelectedFilterCatList(filterData);
        utils.removeQueryParameter("category");
        if(filterData.length) {
            utils.addQueryParameter("category", filterData.toString());
        } else {
            utils.removeQueryParameter("category");
        }
        fetchProductColors();
    }

    return (
        <div className="dashInnerUI cz_AgeGroupPage cz_ColorProduct">
            {loading && <Loader />}
            <div className="userListHead">
                <div className="listInfo">
                    <ul className="listPath">
                        <li>Setup</li>
                        <li>Customization</li>
                        <li>Product Colors</li>
                    </ul>
                    <h2 className="inDashboardHeader">Product Colors ({colorList.length})</h2>
                    <p className="userListAbout">Manage your product colors.</p>
                </div>
                <div className="listFeatures">
                    <button type="button" className="btn btn-filter" onClick={openFilterModal}>
                        <img className="filterIcon" src={filter_icon} alt="Filter" />
                    </button>
                    <button className="creatUserBtn" onClick={openCreateSizeModal}>
                        <img className="plusIcon" src={plusIcon} alt="" /><span>Create</span>
                    </button>
                </div>
            </div>
            {colorList.length > 0 ?
            <div className="cz_listBody">
                {selectedFilterCatList.length > 0 ?
                <div className="cz_filteredCat">
                    <p>Product Category :  </p>
                    <ul>
                    {fetchedCatList.filter(el => selectedFilterCatList.includes(el._id)).map((cat, index) => {
                        return (
                                <li key={"selectedCat_" + index}>
                                <span>{cat.name}</span>
                                <button className="cz_removeFilterCat" onClick={() => deselectCat(cat)}>
                                    <img src={crossIcon} alt="X" />
                                </button>
                            </li>
                        )
                    })}
                    </ul>
                    <button type="button" className="cz_clearFilter" onClick={clearFilter}>Clear all</button>
                </div>
                : ""}
                <div className="userListBody">
                    <div className="listBody">
                        <ul className="tableListing" ref={ref}>
                            <li className="listHeading">
                                <div className="cell_xs">
                                    Name
                                </div>
                                <div className="cell_xs">
                                    Color
                                </div>
                                <div className="cell_xs">
                                    Product Category
                                </div>
                                <div className="cell_xs"></div>
                            </li>
                            {colorList.map((item, index) => {
                                return (
                                    <li key={"colorlist"+index}>
                                        <div className="cell_xl">
                                            <p><strong>{item.name}</strong></p>
                                        </div>
                                        <div className="cell_xl">
                                            <p><span className="colorFigure" style={{
                                                backgroundColor: item.colorcode
                                            }}></span> {item.colorcode ? item.colorcode : "--"}</p>
                                        </div>
                                        <div className="cell_xl">
                                            <p>{item.categoryName}</p>
                                        </div>
                                        <div className="text-right">
                                            <button className="btn btnDelete" onClick={() => deleteColorHandle (item)}>
                                                <span>
                                                    <svg className="deleteIcon" xmlns="http://www.w3.org/2000/svg" width="12.347" height="13.553" viewBox="0 0 12.347 13.553"><g transform="translate(0.75 0.75)"><path className="a" d="M3,6H13.847" transform="translate(-3 -3.589)"></path><path className="a" d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411" transform="translate(-3.795 -2)"></path><line className="a" y2="3" transform="translate(4.397 6.113)"></line><line className="a" y2="3" transform="translate(6.397 6.113)"></line></g></svg>
                                                </span>
                                            </button>
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
                        <h4>No Product Color Found</h4>
                        <p>No product colors have been listed here yet</p>
                    </div>
                    <button className="creatUserBtn" onClick={openCreateSizeModal}>
                        <img className="plusIcon" src={plusIcon} alt=""/>
                        <span>Create First Product Color</span>
                    </button>
                </div>
            </div>
            }
            {createSizeModal &&
            <CreateProductColorModal 
            closeModal={closeCreateSizeModal} 
            fetchProductColors={fetchProductColors}
            loader={setLoading} 
            item={editSizeItem}
            fetchCatList={fetchCatList}
            />}

            {deleteConfirm && 
            <ConfirmBox 
            message="Once you delete this one, this will be deleted from associated products. Are you sure you want to delete?" 
            callback={deleteColor} 
            />}

            {filterModal &&
            <FilterColorModal
            closeModal={closeFilterModal} 
            loader={setLoading} 
            fetchProductColors={(param) => fetchProductColors (param)} 
            fetchedCatList={fetchedCatList} 
            filterFormData={filterFormData} 
            />
            }
        </div>
    )
};

export default ProductColors;