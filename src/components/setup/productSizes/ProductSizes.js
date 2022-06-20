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
import CreateProductSizeModal from "./CreateProductSizeModal";
import { ProductServices } from "../../../services/setup/ProductServices";
import FilterSizesModal from "./FilterSizesModal";
import { utils } from "../../../helpers";


const ProductSizes = () => {
    const [loading, setLoading] = useState(false);
    const [sizeList, setSizeList] = useState([]);
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


    const fetchProductSizes = async (param = null) => {
        try {
            setLoading(true);
            const category = decodeURIComponent(utils.getQueryVariable("category"));
            let response;
            if(category !== "false") {
                response = await CustomizationServices.fetchProductSizes(category);
            } else {
                response = await CustomizationServices.fetchProductSizes();
            }
            setSizeList(response.sizes);
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
        fetchProductSizes();
        fetchCatList();
        const close = (e) => {
            if(e.keyCode === 27){
                setListIndex(null);
            }
        }
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

    const deleteSizeHandel = (item) => {
        setDeleteConfirm(true);
        setDeletedId(item._id);
        setListIndex(null);
    };

    const deleteSize = async (param) => {
        if (param == "yes") {
            try {
                setLoading(true);
                let response = await CustomizationServices.deleteProductSize(deletedId);
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
                fetchProductSizes();
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
    };

    const selectFilterCat = (item) => {
        setFilterFormData([...filterFormData, item._id]);
        console.log(item);
    };

    const deselectFilterCat = (item) => {
    };
    
    const clearFilter = () => {
        utils.removeQueryParameter("category");
        setSelectedFilterCatList([]);
        setFilterFormData([]);
        fetchCatList();
        fetchProductSizes();
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
        fetchProductSizes();
    }

    return (
        <div className="dashInnerUI cz_AgeGroupPage">
            {loading && <Loader />}
            <div className="userListHead">
                <div className="listInfo">
                    <ul className="listPath">
                        <li>Setup</li>
                        <li>Customization</li>
                        <li>Product Sizes</li>
                    </ul>
                    <h2 className="inDashboardHeader">Product Sizes ({sizeList.length})</h2>
                    <p className="userListAbout">Lorem ipsum dolor sit amet. Semi headline should.</p>
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
            {sizeList.length > 0 ?
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
                                    Description
                                </div>
                                <div className="cell_xs">
                                    Product Category
                                </div>
                                <div className="cell_xs"></div>
                            </li>
                            {sizeList.map((item, index) => {
                                return (
                                    <li>
                                        <div className="cell_xl">
                                            <p><strong>{item.name}</strong></p>
                                        </div>
                                        <div className="cell_xl">
                                            <p>{item.desc ? item.desc : "--"}</p>
                                        </div>
                                        <div className="cell_xl">
                                            <p>{item.categoryName}</p>
                                        </div>
                                        <div className="cell_xl">
                                            <div className="info_3dot_icon" >
                                                <button className="btn" onClick={() => moreOptHandel (index)}>
                                                    <img src={info_3dot_icon} alt="" />
                                                </button>
                                            </div>
                                            {listIndex === index ? 
                                            <div className="dropdownOptions">
                                                <button className="btn btnEdit" onClick={() => editSize (item)}>
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.553 13.553" className="editIcon"><g transform="translate(0.75 0.75)"><path className="a" d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423" transform="translate(-2 -2.795)"></path><path className="a" d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z" transform="translate(-4.384 -2)"></path></g></svg>
                                                    </span>
                                                    Edit
                                                </button>
                                                <button className="btn btnDelete" onClick={() => deleteSizeHandel (item)}>
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
                        <h4>No Product Size Found</h4>
                        <p>No product size have been listed here yet</p>
                    </div>
                    <button className="creatUserBtn" onClick={openCreateSizeModal}>
                        <img className="plusIcon" src={plusIcon} alt=""/>
                        <span>Create the First Product Size</span>
                    </button>
                </div>
            </div>
            }
            {createSizeModal &&
            <CreateProductSizeModal 
            closeModal={closeCreateSizeModal} 
            fetchProductSizes={fetchProductSizes}
            loader={setLoading} 
            item={editSizeItem}
            fetchCatList={fetchCatList}
            />}

            {deleteConfirm && 
            <ConfirmBox 
            message="Are you sure, you want to delete this size?" 
            callback={deleteSize} 
            />}

            {filterModal &&
            <FilterSizesModal
            closeModal={closeFilterModal} 
            loader={setLoading} 
            fetchProductSizes={(param) => fetchProductSizes (param)} 
            fetchedCatList={fetchedCatList} 
            selectedFilterCat={(param) => selectFilterCat (param)} 
            deselectedFilterCat={(param) => deselectFilterCat (param)} 
            selectedFilterCatList={selectedFilterCatList} 
            filterFormData={filterFormData} 
            clearFilter={clearFilter}
            />
            }
        </div>
    )
};

export default ProductSizes;