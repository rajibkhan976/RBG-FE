import React, { useEffect, useState, useRef } from "react";
import arrowRightWhite from "../../../../assets/images/arrowRightWhite.svg";
import dot3White from "../../../../assets/images/info_3dot_white.svg";
import { ProductServices } from "../../../../services/setup/ProductServices";
import Loader from "../../../shared/Loader";

const CategoryListing = (props) => {
    const [categoryData, setCategoryData] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [category, setCategory] = useState({
        name: ""
    });
    
    const optionsToggleRef = useRef();
    const [option, setOption] = useState(null);
    const toogleActionList = (index) => {
        setOption(index !== option ? index : null);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

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
            setIsLoader(true);
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
        const regex = /[^a-zA-Z0-9 ]/;
        if (!regex.test(name)) {
            setCategory({ name: name });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const catData = { ...category };
            if (!catData.name.length) {
                props.errorMsg("Category name should not be empty");
            } else {
                setIsLoader(true);
                const res = await ProductServices.createCategory(catData);
                const newData = [...categoryData];
                newData.unshift(res);
                setCategoryData(newData);
                props.successMsg("Category created successfully");
                setCategory({ name: "" });
            }
        } catch (e) {
            props.errorMsg(e.message);
        } finally {
            setIsLoader(false);
        }
    }

    const ListCategories = () => {
        if (categoryData.length) {
            return (
                <>
                    <li><button className="bigListName">All Category</button></li>
                    {categoryData.map((cat, key) => {
                        return (
                            <React.Fragment key={key + "_category"}>
                                <li ref={optionsToggleRef} className={option === key ? "active" : ""}>
                                    <button className="smallListName">{cat.name}</button>
                                    <button className="showList" onClick={() => toogleActionList(key)}>
                                        <img src={dot3White} alt=""/>
                                    </button>
                                    <div class={option === key ? "listOpen dropdownOptions" : "listHide dropdownOptions"}>
                                        <button class="btn btnEdit">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.553 13.553" class="editIcon">
                                                    <g transform="translate(0.75 0.75)">
                                                        <path class="a" d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423" transform="translate(-2 -2.795)"></path>
                                                        <path class="a" d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z" transform="translate(-4.384 -2)"></path>
                                                    </g></svg>
                                            </span>Edit
                                        </button>
                                        <button class="btn btnDelete">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12.347" height="13.553" viewBox="0 0 12.347 13.553" class="deleteIcon">
                                                    <g transform="translate(0.75 0.75)">
                                                        <path class="a" transform="translate(-3 -3.589)"></path>
                                                        <path class="a" d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411" transform="translate(-3.795 -2)"></path>
                                                        <line class="a" y2="3" transform="translate(4.397 6.113)"></line>
                                                        <line class="a" y2="3" transform="translate(6.397 6.113)"></line>
                                                    </g>
                                                </svg>
                                            </span>Delete
                                        </button>
                                    </div>
                                </li>
                            </React.Fragment>
                        )
                    })}
                </>
            );
        } else {
            return <><li><a href="#">All Category</a><a></a></li></>;
        }

    }
    return (
        <>
            {isLoader ? <Loader /> : ''}
            <div className="productRightSetUpPanel">
                <h3 className="productListingHeader">Product Categories</h3>
                <div className="productSearchPanel">
                    <form method="post" onSubmit={handleSubmit}>
                        <input type="text" name="catname" onChange={handleChange} value={category.name} />
                        <button className="btn" type="submit">Add Category <img src={arrowRightWhite} alt="" /></button>
                    </form>
                </div>
                <ul className="ProCategoryListing">
                    <ListCategories />
                </ul>
            </div>

        </>
    );
}

export default CategoryListing;