import React, { useEffect, useState, useRef } from "react";
import arrowRightWhite from "../../../../assets/images/arrowRightWhite.svg";
import dot3White from "../../../../assets/images/info_3dot_white.svg";
import { utils } from "../../../../helpers";
import { ProductServices } from "../../../../services/setup/ProductServices";
import ConfirmBox from "../../../shared/confirmBox";
import Loader from "../../../shared/Loader";
import cross from "../../../../assets/images/cross.svg";

const CategoryListing = (props) => {
    const [categoryData, setCategoryData] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [category, setCategory] = useState({
        name: "",
        id: null,
        btnName: "Add Category",
        showCross: false
    });
    const [isConfirmed, setConfirmed] = useState({
        show: false,
        id: null,
    });
    const optionsToggleRef = useRef();
    const [option, setOption] = useState(null);
    const toogleActionList = (index) => {
        setOption(index !== option ? index : null);
    }

    // useEffect(() => {
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     }
    // }, []);

    /**
     * Handle outside click
     */
    const handleClickOutside = (event) => {
        if (optionsToggleRef.current.contains(event.target)) {
            //console.log('// inside click');
            return;
        }
        // console.log('// outside click');
        setOption(null);
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        /************ PERMISSION CHECKING (FRONTEND) *******************/
        // const readPermission = (Object.keys(permissions).length) ? await permissions.actions.includes("read") : false;
        // console.log("Permission", permissions);
        /************ PERMISSION CHECKING (FRONTEND) *******************/
        try {
            if (!isLoader) setIsLoader(true);
            /************ PERMISSION CHECKING (FRONTEND) *******************/
            // if (readPermission === false && env.ACTIVE_PERMISSION_CHECKING === 1) {
            //     throw new Error(responses.permissions.role.read);
            // }
            /************ PERMISSION CHECKING (FRONTEND) *******************/
            const result = await ProductServices.fetchCategory();
            if (result.length) {
                setCategoryData(result);
                console.log("CategoryData", categoryData);
            } else {
                // setErrorMsg("No categories found");
                props.successMsg("No categories found");
            }
        } catch (e) {
            props.errorMsg(e.message);
        } finally {
            setIsLoader(false);
        }
    }

    const handleChange = (e) => {
        const name = e.target.value;
        const regex = /[^a-zA-Z0-9- ]/;
        if (!regex.test(name)) {
            setCategory({ ...category, name: name, showCross: true });
        }

        if (!name.length && !category.id) setCategory({ name: "", id: null, btnName: "Add Category", showCross: false});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let catData = { name: category.name };
            if (!catData.name.length) {
                props.errorMsg("Category name should not be empty");
            } else {
                setIsLoader(true);
                if(category.id) {
                    catData = {...catData, id: category.id };
                    const res = await ProductServices.editCategory(catData);
                    props.successMsg("Category updated successfully");
                } else {
                    const res = await ProductServices.createCategory(catData);
                    props.successMsg("Category created successfully");
                }
                
            }
        } catch (e) {
            props.errorMsg(e.message);
        } finally {
            setIsLoader(false);
            setCategory({
                name: "",
                id: null,
                btnName: "Add Category",
                showCross: false
            });
            await fetchCategories()
        }
    }

    const editCategory = (category) => {
        setOption(null);
        console.log("Edit Triggered", category);
        setCategory({ name: category.name, id: category._id, btnName: "Update", showCross: true });
    }

    const deleteCategory = async (catID, isConfirmed = null) => {
        setOption(null);
        if (isConfirmed == null && catID) {
            console.log("Category ID", catID);
            setConfirmed({
                show: true,
                id: catID
            });
        } else if (isConfirmed === "cancel") {
            setConfirmed({
                show: false,
                id: null
            });
        } else {
            try {
                setIsLoader(true);
                const result = await ProductServices.deleteCategory(catID);
                if (result) {
                    props.successMsg(result);
                } else {
                    props.errorMsg("Error deleting category. Please try again.");
                }
            } catch (e) {
                props.errorMsg(e.message);
            } finally {
                // setIsLoader(false);
                setConfirmed({
                    show: false,
                    id: null
                });
                await fetchCategories();
            }
        }
    };

    const handleCategoryClick = (catID) => {
        if(catID) {
            utils.addQueryParameter("catID", catID);
        } else {
            utils.removeQueryParameter("catID");
        }
        props.getProduct();
    }

    return (
        <>
            {isLoader ? <Loader /> : ''}
            {isConfirmed.show ? (
                <ConfirmBox
                    callback={(confirmedMsg) => deleteCategory(isConfirmed.id, confirmedMsg)}
                />
            ) : (
                ""
            )}
            <div className="productRightSetUpPanel">
                <h3 className="productListingHeader">Product Categories</h3>
                <div className="productSearchPanel">
                    <form method="post" onSubmit={handleSubmit}>
                        {category.showCross ? <button className="deleteIt" onClick={() => setCategory({...category, name: "", id: null, btnName: "Add Category", showCross: false })}><img src={cross} alt="" /></button>: ''}
                        <input type="text" name="catname" onChange={handleChange} value={category.name} />
                        <button className="btn" type="submit">{category.btnName}<img src={arrowRightWhite} alt="" /></button>
                    </form>
                </div>
                <ul className="ProCategoryListing">
                    <li>
                        <button className="bigListName" onClick={() => handleCategoryClick(false)}>All Categories</button>
                    </li>
                    {categoryData.map((elem, key) => {
                        return (
                            <React.Fragment key={key + "_category"}>
                                <li ref={optionsToggleRef} className={option === key ? "active" : ""} key={elem._id}>
                                    <button className={elem.slug === "uncategorized" ? "smallListName" : "bigListName"} onClick={() => handleCategoryClick(elem._id)}>{elem.name} ({(elem.productCount) ? elem.productCount : 0})</button>
                                    {(elem.slug !== "uncategorized")?
                                    <button className="showList" onClick={() => toogleActionList(key)}>
                                        <img src={dot3White} alt="" />
                                    </button>
                                    : ''}
                                    <React.Fragment key={key + "_fragment"}>
                                        <div className={option === key ? "dropdownOptions listOpen" : "listHide"}>
                                            <button className="btn btnEdit" onClick={() => { editCategory(elem); }}>
                                                <span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 13.553 13.553"
                                                        className="editIcon">
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
                                            <button className="btn btnDelete" onClick={() => deleteCategory(elem._id)}>
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
                                </li>
                            </React.Fragment>
                        )
                    })}
                </ul>
            </div>

        </>
    );
}

export default CategoryListing;