import React, { memo, useState } from 'react';
import closewhite24dp from "../../../../assets/images/close_white_24dp.svg";
import edit_grey from "../../../../assets/images/edit_grey.svg";
import trashIcon from "../../../../assets/images/iconfinder_trash-2_2561228.svg";
import whiteAddIcon from "../../../../assets/images/add_white_24dp.svg";
import whiteSlash from "../../../../assets/images/remove_white_24dp.svg";
import chevron_right_white_24dp from "../../../../assets/images/chevron_right_white_24dp.svg";

const Filter = (props) => {
    return (
        <React.Fragment>
            <div className="automationModal filterModal">
                <div className='automationModalBg' onClick={props.closeFilterModal}></div>
                <div className="nodeSettingModal filterSetting">
                    <div className="formHead">
                        <div className="heading">
                            <p>Filter Settings</p>
                        </div>
                        <div className="closeButton">
                            <button className="closeFilterModal" onClick={props.closeFilterModal}>
                                <img src={closewhite24dp} alt="" />
                            </button>
                        </div>
                    </div>
                    <div className="formBody">
                        <div className="formBodyContainer">
                            <div className="nameArea">
                                <div className="editRules">
                                    <p>Edit Rules</p>
                                </div>
                            </div>
                            <div className="formFieldsArea">
                                <label htmlFor="">Only continue if</label>
                                <div className="formFields">
                                    {props.filterConditions.length ? (props.filterConditions.map((value, index) => {
                                        return (
                                            <>
                                                {index > 0 ?
                                                    <div className="addFormFieldsButton orButton">
                                                        <button>
                                                            <span className="addFields"><img src={whiteSlash} alt="" /></span>
                                                            or
                                                        </button>
                                                    </div>
                                                    : ""}
                                                {
                                                    value.conditions.length ? value.conditions.map((con) => {
                                                        return (
                                                            <>
                                                                <div className={`formFields1`}>
                                                                    <div className={`inputField field_1`}>
                                                                        <select name="" id="" value={con.field} onChange={(e) => props.handelFilterFieldChange('field', value.index, con.and, e)}>
                                                                            <option value="">Please Select</option>
                                                                            {Object.keys(props.filterData).length ? (
                                                                                Object.keys(props.filterData).map((value, key) => (
                                                                                    <option value={value} data-fieldType={props.filterData[value]}>{value}</option>
                                                                                ))
                                                                            ) : ""
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                    <div className="inputField field_2">
                                                                        {(() => {
                                                                            if (con.filedValue === 'number') {
                                                                                return (
                                                                                    <select name="" id="" value={con.condition} onChange={(e) => props.handelFilterFieldChange('condition', value.index, con.and, e)}>
                                                                                        <option value="">Please Select</option>
                                                                                        <option value="NumericEquals"> =</option>
                                                                                        <option value="NumericGreaterThan"> </option>
                                                                                        <option value="NumericGreaterThanEquals"> = </option>
                                                                                        <option value="NumericLessThan"> &#60; </option>
                                                                                        <option value="NumericLessThanEquals"> &#60;= </option>
                                                                                    </select>
                                                                                )
                                                                            } else{
                                                                                return (
                                                                                    <select name="" id="" value={con.condition} onChange={(e) => props.handelFilterFieldChange('condition', value.index, con.and, e)}>
                                                                                        <option value="">Please Select</option>
                                                                                        <option value="StringEquals"> = </option>
                                                                                    </select>
                                                                                )
                                                                            }
                                                                        })()}
                                                                    </div>
                                                                    <div className="inputField field_3">
                                                                        {(() => {
                                                                            if (con.field === "tags") {
                                                                                return (
                                                                                    <select name="" id="" value={con.value} onChange={(e) => props.handelFilterFieldChange('value', value.index, con.and, e)} >
                                                                                        <option value="">Select tag</option>
                                                                                        {props.tags.map((item, index) => {
                                                                                            return (
                                                                                                <option value={item._id}>{item.name}</option>
                                                                                            )})
                                                                                        }
                                                                                    </select>
                                                                                )
                                                                            } else if (con.field === "status") {
                                                                                return (
                                                                                    <select name="" id="" value={con.value} onChange={(e) => props.handelFilterFieldChange('value', value.index, con.and, e)} >
                                                                                        <option value="">Select status</option>
                                                                                        {props.statusList.map((item, index) => {
                                                                                            return (
                                                                                                <option value={item._id}>{item.name} ({item.phaseDetails.name})</option>
                                                                                            )})
                                                                                        }
                                                                                    </select>
                                                                                )
                                                                            } else if (con.field === "phase") {
                                                                                return (
                                                                                    <select name="" id="" value={con.value} onChange={(e) => props.handelFilterFieldChange('value', value.index, con.and, e)} >
                                                                                        <option value="">Select phase</option>
                                                                                        {props.phaseList.map((item, index) => {
                                                                                            return (
                                                                                                <option value={item._id}>{item.name}</option>
                                                                                            )})
                                                                                        }
                                                                                    </select>
                                                                                )
                                                                            } else if (con.field === "gender") {
                                                                                return (
                                                                                    <select name="" id="" value={con.value} onChange={(e) => props.handelFilterFieldChange('value', value.index, con.and, e)} >
                                                                                        <option value="">Select gender</option>
                                                                                        <option value="male">Male</option>
                                                                                        <option value="female">Female</option>
                                                                                        <option value="others">Others</option>
                                                                                    </select>
                                                                                )
                                                                            } else {
                                                                                return (
                                                                                    <input type={con.filedValue ? con.filedValue : "text"} name="" id="" value={con.value} onChange={(e) => props.handelFilterFieldChange('value', value.index, con.and, e)} />
                                                                                )
                                                                            }
                                                                        })()}
                                                                    </div>
                                                                    {
                                                                        (con.and === 1 && value.index === 0) ?
                                                                            "" :
                                                                            <div className="deleteButton">
                                                                                <button onClick={() => props.deleteNodeFiler(con, value.index)}><img src={trashIcon} alt="" /></button>
                                                                            </div>
                                                                    }
                                                                </div>
                                                            </>
                                                        )
                                                    }) : ""
                                                }
                                                <div className="addFormFieldsButton">
                                                    <button onClick={() => props.addAnd(index)}>
                                                        <span className="addFields"><img src={whiteAddIcon} alt="" /></span>
                                                        And
                                                    </button>
                                                </div>
                                            </>
                                        )
                                    })) : ""}
                                    <div className="addOrButton">
                                        <div className="addFormFieldsButton orButton">
                                            <button onClick={() => props.addOr()}>
                                                <span className="addFields"><img src={whiteSlash} alt="" /></span>
                                                or
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="saveButton updateButton">
                                <button onClick={props.updateFilterData}>Update <img src={chevron_right_white_24dp} alt="" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Filter;