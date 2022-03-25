import React, { useState, useLayoutEffect, useEffect } from "react";
import arrowForward from "../../../../assets/images/arrow_forward.svg";
import { utils } from "../../../../helpers";
import Loader2 from "../../../shared/Loader2";


const ProductFilter = (props) => {
    const thumbsize = 2;
    const [isLoader, setIsLoader] = useState(false);
    const [colorSize, setColorSize] = useState({
        colors: [],
        sizes: []
    });
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [filterData, setFilterData] = useState({
        categories: [],
        colors: [],
        sizes: [],
        fromPriceProduct: "0",
        toPriceProduct: "0"
    });

    useEffect(() => {
        setColorSize(props.getcolorSize);
        setDefaultParams();
    }, []);

    

    const setDefaultParams = () => {
        const data = {
            categories: [],
            colors: [],
            sizes: [],
            fromPriceProduct: "0",
            toPriceProduct: "0"
        };
        const catID = decodeURIComponent(utils.getQueryVariable('catID'));
        const colors = decodeURIComponent(utils.getQueryVariable('colors'));
        const sizes = decodeURIComponent(utils.getQueryVariable('sizes'));
        const fromPriceProduct = decodeURIComponent(utils.getQueryVariable('fromPriceProduct'));
        const toPriceProduct = decodeURIComponent(utils.getQueryVariable('toPriceProduct'));
        // console.log(typeof catID);
        if (catID && catID !== "false") {
            data.categories = catID.split(",");
        }
        if (colors && colors !== "false") {
            data.colors = colors.split(",");
        }
        if (sizes && sizes !== "false") {
            data.sizes = sizes.split(",");
        }
        if (fromPriceProduct && fromPriceProduct !== "false") {
            data.fromPriceProduct = fromPriceProduct.toString();
            setMinPrice(fromPriceProduct.toString());
        }
        if (toPriceProduct && toPriceProduct !== "false") {
            data.toPriceProduct = toPriceProduct.toString();
            setMaxPrice(toPriceProduct.toString());
        }
        setFilterData(data);
    }

    const Slider = ({ min, max, minval, maxval }) => {
        const [avg, setAvg] = useState((min + max) / 2);
        const [minVal, setMinVal] = useState(parseInt(minval));
        const [maxVal, setMaxVal] = useState(parseInt(maxval));

        const width = 400;
        const minWidth =
            thumbsize + ((avg - min) / (max - min)) * (width - 2 * thumbsize);
        const minPercent = ((minVal - min) / (avg - min)) * 100;
        const maxPercent = ((maxVal - avg) / (max - avg)) * 100;
        const styles = {
            min: {
                width: minWidth,
                left: 0,
                "--minRangePercent": `${minPercent}%`
            },
            max: {
                width: thumbsize + ((max - avg) / (max - min)) * (width - 2 * thumbsize),
                left: minWidth,
                "--maxRangePercent": `${maxPercent}%`
            },
            maxPos: {
                left: (Math.floor(maxVal)/max*100 )+ "%"
              },
              minPos: {
                  left: (Math.floor(minVal)/max*100 )+ "%"
                }
        };

        useLayoutEffect(() => {
            setAvg((maxVal + minVal) / 2);
        }, [minVal, maxVal]);

        // console.log(maxVal, avg, min, max, maxPercent, width);
        const setMin = () => {
            // console.log(e.target.value);
            setMinPrice(minVal);
        }
        const setMax = () => {
            setMaxPrice(Math.floor(maxVal));
        }
        return (
            <div
                className="min-max-slider"
                data-legendnum="2"
                data-rangemin={min}
                data-rangemax={max}
                data-thumbsize={thumbsize}
                data-rangewidth={width}
            >
                <label htmlFor="min" className="minValSlider" style={styles.minPos}>${Math.floor(minVal)}</label>
                <input
                    id="min"
                    className="min"
                    style={styles.min}
                    name="min"
                    type="range"
                    step="1"
                    min={min}
                    max={avg}
                    value={minVal}
                    onChange={({ target }) => setMinVal(Number(target.value))}
                    onBlur={setMin}
                />
                <label htmlFor="max" className="maxValSlider" style={styles.maxPos}>${Math.floor(maxVal)}</label>
                <input
                    id="max"
                    className="max"
                    style={styles.max}
                    name="max"
                    type="range"
                    step="1"
                    min={avg}
                    max={max}
                    value={maxVal}
                    onChange={({ target }) => setMaxVal(Number(target.value))}
                    onBlur={setMax}
                />
            </div>
        );
    };

    const handleColorCheckbox = (e) => {
        // e.preventDefault();
        // console.log("In handle Checkbox", filterData);
        const colorName = e.target.value;
        let choosenColors = [...filterData.colors];
        if (choosenColors.indexOf(colorName) === -1) {
            choosenColors.push(colorName);
        } else {
            choosenColors = choosenColors.filter(colorlabel => colorlabel !== colorName);
        }
        console.log(choosenColors);
        setFilterData({ ...filterData, colors: choosenColors });
    };

    const handleSizeCheckbox = (e) => {
        // e.preventDefault();
        const sizeLabel = e.target.value;
        let choosenSizes = [...filterData.sizes];
        if (choosenSizes.indexOf(sizeLabel) === -1) {
            choosenSizes.push(sizeLabel);
        } else {
            choosenSizes = choosenSizes.filter(sizeName => sizeName !== sizeLabel);
        }
        console.log("Choosen Sizes", choosenSizes);
        setFilterData({ ...filterData, sizes: choosenSizes });
        console.log("Sizes", filterData);
    }

    const handleCategoryCheckbox = (e) => {
        // e.preventDefault();
        const catID = e.target.value;
        let choosenCategories = [...filterData.categories];
        if (choosenCategories.indexOf(catID) === -1) {
            choosenCategories.push(catID);
        } else {
            choosenCategories = choosenCategories.filter(categoryID => categoryID !== catID);
        }
        console.log("Choosen Category", choosenCategories);
        setFilterData({ ...filterData, categories: choosenCategories });
    }

    const handleApplyFilter = (e) => {
        // e.preventDefault();
        // handleResetFilter(e, false);
        const data = { ...filterData, fromPriceProduct: minPrice.toString(), toPriceProduct: maxPrice.toString() };
        if (data.categories.length) {
            utils.addQueryParameter("catID", data.categories.join(",").toString());
        } else {
            utils.removeQueryParameter("catID");
        }
        if (data.colors.length) {
            utils.addQueryParameter("colors", data.colors.join(",").toString());
        } else {
            utils.removeQueryParameter("colors");
        }
        if (data.sizes.length) {
            utils.addQueryParameter("sizes", data.sizes.join(",").toString());
        } else {
            utils.removeQueryParameter("sizes");
        }
        // if (data.fromPriceProduct !== "0") {
        //     utils.addQueryParameter("fromPriceProduct", data.fromPriceProduct.toString());
        // } else {
        //     utils.removeQueryParameter("fromPriceProduct");
        // }
        if (data.toPriceProduct !== "0") {
            utils.addQueryParameter("fromPriceProduct", data.fromPriceProduct.toString());
            utils.addQueryParameter("toPriceProduct", data.toPriceProduct.toString());
        } else {
            utils.removeQueryParameter("fromPriceProduct");
            utils.removeQueryParameter("toPriceProduct");
        }
        // console.log(data);
        props.getProduct();
        props.closeModal();
        // props.setFilteredData(data)
    }

    const handleResetFilter = (event) => {
        // event.preventDefault();
        utils.removeQueryParameter('catID');
        utils.removeQueryParameter('colors');
        utils.removeQueryParameter('sizes');
        utils.removeQueryParameter('fromPriceProduct');
        utils.removeQueryParameter('toPriceProduct');
        setFilterData({
            categories: [],
            colors: [],
            sizes: [],
            fromPriceProduct: "0",
            toPriceProduct: "0"
        });
        props.getProduct();
        props.closeModal();
        // props.setFilteredData(null)
    }

    return (
        <>
            <div className="sideMenuOuter filterUserMenu">
                {isLoader ? <Loader2 /> : ''}
                <div className="sideMenuInner">
                    <button className="btn btn-closeSideMenu" onClick={props.closeModal}><span></span><span></span></button>
                    <div className="sideMenuHeader">
                        <h3 className="liteHeading">Apply Filter</h3>
                    </div>
                    <div className="sideMenuBody">
                        <form className="formBody" onSubmit={handleApplyFilter}>
                            <div className="aplyfilteCheck">
                                <p>Category</p>
                                {props.categories.map((cat, key) => {
                                    return (
                                        <React.Fragment key={"categories_"+key}>
                                            <label>
                                                <div className="customCheckbox">
                                                    <input type="checkbox"
                                                        name="categories"
                                                        value={cat._id}
                                                        onChange={handleCategoryCheckbox}
                                                        checked={filterData.categories.includes(cat._id)}
                                                    />
                                                    <span></span>
                                                </div>
                                                {cat.name} ({(cat.productCount ? cat.productCount : 0)})
                                            </label>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                            <div className="aplyfilteCheck">
                                <p>Size</p>
                                {colorSize.sizes.map((size, key) => {
                                    return (
                                        <React.Fragment key={"sizes_"+key}>
                                            <label>
                                                <div className="customCheckbox">
                                                    <input type="checkbox"
                                                        name="sizes"
                                                        defaultValue={size.size}
                                                        onChange={handleSizeCheckbox}
                                                        defaultChecked={filterData.sizes.includes(size.size)}
                                                    />
                                                    <span></span>
                                                </div>
                                                {size.size}
                                            </label>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                            <div className="aplyfilteCheck">
                                <p>Color</p>
                                {colorSize.colors.map((color, key) => {
                                    return (
                                        <React.Fragment key={"color_"+key}>
                                            <label>
                                                <div className="customCheckbox">
                                                    <input type="checkbox"
                                                        name="colors"
                                                        defaultValue={color.label}
                                                        onChange={handleColorCheckbox}
                                                        defaultChecked={filterData.colors.includes(color.label)}
                                                    />
                                                    <span></span>
                                                </div>
                                                {color.label.toUpperCase()}
                                            </label>
                                        </React.Fragment>
                                    )
                                })}

                            </div>
                            <div className="applySlider">
                                <p>Price</p>
                                <Slider min={0} max={500} 
                                minval={minPrice} 
                                maxval={maxPrice}/>
                            </div>
                            <div className="applyFilterBtn">
                                <button className="saveNnewBtn" type="submit"><span>Apply Filter</span><img className="" src={arrowForward} alt="" /></button>
                                <button className="btn-link" type="button" onClick={handleResetFilter}>Clear</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}


export default ProductFilter;
