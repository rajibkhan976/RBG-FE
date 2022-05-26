import React, { useState, useEffect } from 'react';
import { CustomizationServices } from '../../../services/setup/CustomizationServices';
import greenTick from "../../../assets/images/greenTick.svg";
import greyTick from "../../../assets/images/greyTick.svg";
import redCross from "../../../assets/images/redCross.svg";
import greyEdit from "../../../assets/images/greyEdit.svg";
import { useDispatch } from 'react-redux';
import * as actionTypes from '../../../actions/types';
import Loader from '../../shared/Loader';

const Tax = () => {
    const [taxShow, setTaxShow] = useState(false);
    const [taxData, setTaxData] = useState({
        tax: "",
        editAccess: false
    });
    const [defaultTaxData, setDefaultTaxData] = useState({
        tax: "",
        editAccess: false
    });
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        fetchSaleTax();
    }, []);

    const fetchSaleTax = async () => {
        try {
            setLoading(true)
            const saleTaxData = await CustomizationServices.fetchTax();
            setTaxData(saleTaxData);
            setDefaultTaxData(saleTaxData);
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

    const taxAmountHandle = (e) => {
        console.log(e.target.value);
        const { value } = e.target;
        const reg = /^\d+(\.\d{1,2})?$/;
        console.log("Regex", reg.test(value))
        const isValid = value !== "" && reg.test(value) && value < 100;
        console.log('isValid', isValid)
        if(!isValid) {
            setShowError("Please enter a valid number");
        } else {
            setShowError("");
        }
        setTaxData(prevState => ({ ...prevState, tax: value }));
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(showError !== "") return false;
        try {
            setLoading(true);
            const payload = {
                "tax": taxData.tax
            };
            const res = await CustomizationServices.updateTax(payload);
            setDefaultTaxData(taxData);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: res.message,
                typeMessage: 'success'
            });
            // setSuccessMsg(res.message);
        } catch (e) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
            // setErrorMsg(e.message);
        } finally {
            setLoading(false);
            setTaxShow(false)
        }
    };

    const cancelEdit = () => {
        setTaxShow(false);
        setTaxData(defaultTaxData);
        setShowError("")
    }

    return (
        <div className='ps_merchantSetup'>
            {loading ? <Loader /> : ""}
            <form onSubmit={handleSubmit}>
                <div className='ps_header'>
                    <h3>Tax Setup</h3>
                    <div className='ps_editPan'>
                        {taxShow && <>
                            <button className='round edit' type='submit' disabled={showError !== "" ? true : false}><img src={showError !== "" ? greyTick : greenTick} alt="" /></button>
                            <button className='round delete' type='button' onClick={cancelEdit}><img src={redCross} alt="" /></button>
                        </>}
                        {!taxShow && <button className='round change' type='button' onClick={(e) => {e.preventDefault(); setTaxShow(true);}}><img src={greyEdit} alt="" /></button>}
                    </div>
                </div>
                <div className='ps_formbody'>
                    <div className='ps_form'>
                        <div className='half'>
                            <label>Tax</label>
                            {taxShow &&
                                <div className='ps_inputPercent'>
                                    <input
                                        type="number"
                                        name="tax"
                                        onChange={taxAmountHandle}
                                        value={taxData.tax}
                                        className={showError !== "" ? "error" : ""}
                                    />
                                    <span className='ps_floatLast'>%</span>
                                    <div className="errorMsg">{showError}</div>
                                </div>
                            }
                            {!taxShow &&
                                <div className='ps_text2'>{taxData.tax}%</div>
                            }
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default Tax;
