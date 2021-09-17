import React, { useEffect, useState } from "react";
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
                    <li><a href="#">All Category</a><a></a></li>
                    {categoryData.map((cat, key) => {
                        return (
                            <React.Fragment key={key + "_category"}>
                                <li><a href="#">{cat.name}</a>
                                    <a href="#"><img src={dot3White} alt="" /></a></li>
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