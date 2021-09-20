import React, { useState, useLayoutEffect, useEffect } from "react";

import arrowForward from "../../../../assets/images/arrow_forward.svg";


const ProductFilter = (props) => {


    let thumbsize = 14;

    const Slider = ({ min, max }) => {
        const [avg, setAvg] = useState((min + max) / 2);
        const [minVal, setMinVal] = useState(avg);
        const [maxVal, setMaxVal] = useState(avg);
        
        const width = 300;
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
            }
        };
        
        useLayoutEffect(() => {
            setAvg((maxVal + minVal) / 2);
        }, [minVal, maxVal]);
        
        console.log(maxVal, avg, min, max, maxPercent);
        
        return (
            <div
            className="min-max-slider"
            data-legendnum="2"
            data-rangemin={min}
            data-rangemax={max}
            data-thumbsize={thumbsize}
            data-rangewidth={width}
            >
            <label htmlFor="min">Min ${minVal}</label>
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
            />
            <label htmlFor="max">Max ${maxVal}</label>
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
            />
            </div>
        );
    };


    return(
        <div class="sideMenuOuter filterUserMenu">
            <div class="sideMenuInner">
                <button class="btn btn-closeSideMenu" onClick={props.closeModal}><span></span><span></span></button>
                <div class="sideMenuHeader">
                    <h3 class="liteHeading">Apply Filter</h3>
                </div>
                <div class="sideMenuBody">
                    <form class="formBody">
                        <div class="aplyfilteCheck">
                            <p>Category</p>
                            
                            
                            <label>
                                <div className="customCheckbox">
                                    <input type="checkbox" />
                                    <span></span>
                                </div>
                                All
                            </label>
                            <label>
                                <div className="customCheckbox">
                                    <input type="checkbox" />
                                    <span></span>
                                </div>
                                Category One
                            </label>
                            <label>
                                <div className="customCheckbox">
                                    <input type="checkbox" />
                                    <span></span>
                                </div>
                                Category Two
                            </label>
                            <label>
                                <div className="customCheckbox">
                                    <input type="checkbox" />
                                    <span></span>
                                </div>
                                Category Three
                            </label>
                            <label>
                                <div className="customCheckbox">
                                    <input type="checkbox" />
                                    <span></span>
                                </div>
                                Category Four
                            </label>
                            <label>
                                <div className="customCheckbox">
                                    <input type="checkbox" />
                                    <span></span>
                                </div>
                                <div>Category Five</div>
                            </label>
                        
                        </div>
                        <div class="aplyfilteCheck">
                            <p>Size</p>
                            <label>
                                <div className="customCheckbox">
                                    <input type="checkbox" />
                                    <span></span>
                                </div>
                                All
                            </label>
                            <label>
                                <div className="customCheckbox">
                                    <input type="checkbox" />
                                    <span></span>
                                </div>
                                <div>XS</div>
                            </label>
                            <label>
                                <div className="customCheckbox">
                                    <input type="checkbox" />
                                    <span></span>
                                </div>
                                <div>S</div>
                            </label>
                            <label>
                                <div className="customCheckbox">
                                    <input type="checkbox" />
                                    <span></span>
                                </div>
                                <div>M</div>
                            </label>
                            <label>
                                <div className="customCheckbox">
                                    <input type="checkbox" />
                                    <span></span>
                                </div>
                                <div>L</div>
                            </label>
                            <label>
                                <div className="customCheckbox">
                                    <input type="checkbox" />
                                    <span></span>
                                </div>
                                <div>XL</div>
                            </label>
                            
                        </div>
                        <div class="aplyfilteCheck">
                            <p>Color</p>
                            <div className="chooseColor">
                                <input type="checkbox" className="gray"/>
                                <span></span>
                            </div>
                            <div className="chooseColor">
                                <input type="checkbox" className="red"/>
                                <span></span>
                            </div>
                            <div className="chooseColor">
                                <input type="checkbox" className="blue"/>
                                <span></span>
                            </div>   
                            
                        </div>
                        <div className="applySlider">
                            <p>Price</p>

                                <Slider min={300} max={3000} /> 
                        </div>
                        <div class="applyFilterBtn">
                            <button class="saveNnewBtn"><span>Apply Filter</span><img class="" src={arrowForward} alt=""/></button>
                            <button class="btn-link">Clear</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div> 
    );
}


export default ProductFilter;
