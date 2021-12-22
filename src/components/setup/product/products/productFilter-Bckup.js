import React, { useState, useLayoutEffect, useEffect } from "react";
import arrowForward from "../../../../assets/images/arrow_forward.svg";
import { utils } from "../../../../helpers";
import Loader2 from "../../../shared/Loader2";


const ProductFilter = (props) => {
    const thumbsize = 14;
    const [colorSize, setColorSize] = useState({
        colors: [],
        sizes: []
    });
    const [categories, setCategories] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    useEffect(() => {
        // setColorSize(props.getcolorSize);
        const { colors, sizes } = props.getcolorSize;
        const newColor = Object.assign(...colors.map(c => ({ [c.label]: false })));
        const newSize = Object.assign(...sizes.map(s => ({ [s.size]: false })));
        console.log(newColor);
        console.log(newSize);
        setCategories(props.categories);
    }, []);

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
                left: (Math.floor(maxVal) / max * 100) + "%"
            },
            minPos: {
                left: (Math.floor(minVal) / max * 100) + "%"
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

    const handleApplyFilter = (e) => {

    };

    const handleResetFilter = (e) => {

    }


    return (
        <>
            <div class="sideMenuOuter filterUserMenu">
                <div class="sideMenuInner">
                    <button class="btn btn-closeSideMenu" onClick={props.closeModal}><span></span><span></span></button>
                    <div class="sideMenuHeader">
                        <h3 class="liteHeading">Apply Filter</h3>
                    </div>
                    <div class="sideMenuBody">
                        <form class="formBody" onSubmit={handleApplyFilter}>
                            <div class="aplyfilteCheck">
                                <p>Category</p>
                                {categories.map((cat, key) => {
                                    return (
                                        <React.Fragment>
                                            <label>
                                                <div className="customCheckbox">
                                                    <input type="checkbox"
                                                        name="categories"
                                                        value={cat._id}
                                                    />
                                                    <span></span>
                                                </div>
                                                {cat.name} ({(cat.productCount ? cat.productCount : 0)})
                                            </label>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                            <div class="aplyfilteCheck">
                                <p>Size</p>
                                {colorSize.sizes.map((size, key) => {
                                    return (
                                        <React.Fragment>
                                            <label>
                                                <div className="customCheckbox">
                                                    <input type="checkbox"
                                                        name="sizes"
                                                        value={size.size}
                                                    />
                                                    <span></span>
                                                </div>
                                                {size.size}
                                            </label>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                            <div class="aplyfilteCheck">
                                <p>Color</p>
                                {colorSize.colors.map((color, key) => {
                                    return (
                                        <React.Fragment>
                                            <label>
                                                <div className="customCheckbox">
                                                    <input type="checkbox"
                                                        name="colors"
                                                        value={color.label}
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
                                    maxval={maxPrice} />
                            </div>
                            <div class="applyFilterBtn">
                                <button class="saveNnewBtn" type="submit"><span>Apply Filter</span><img class="" src={arrowForward} alt="" /></button>
                                <button class="btn-link" type="button" onClick={handleResetFilter}>Clear</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}


export default ProductFilter;
