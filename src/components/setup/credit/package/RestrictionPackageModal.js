import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import cross_icon from "../../../../assets/images/cross_icon.svg";
import happyFaceIcon from "../../../../assets/images/happyFaceIcon.svg";
import brownArrow from "../../../../assets/images/brownArrow.svg";
import PackagePurchase from './PackagePurchase';
import { CreditManagementServices } from '../../../../services/setup/CreditManagementServices';
import Loader from '../../../shared/Loader';
import * as actionTypes from "../../../../actions/types";

const RestrictionPackageModal = (props) => {

    const [creditPackages, setCreditPackages] = useState([]);
    const [currentCreditPackageId, setcurrentCreditPackageId] = useState(null);
    const [isLoader, setIsLoader] = useState(false);
    let history = useHistory();
    const dispatch = useDispatch();


    const fetchPackages = async () => {
        try {
            setIsLoader(true);
            const response = await CreditManagementServices.fetchPackages();
            let filterPackages = response.packages.filter((el, index) => el.isFavourite === true)
            console.log('filter packages', filterPackages)
            if(filterPackages.length) {
                //Show only favourite packages
                setCreditPackages(filterPackages);
            } else {
                //Show first 3 packages
                const slicedPackages = response.packages.slice(0, 3);
                setCreditPackages(slicedPackages);
            }
            setcurrentCreditPackageId(response.currentPackageId)
        } catch (e) {
            console.log('Error in fetch credit packages', e);
        } finally {
            setIsLoader(false);
        }
    }

    useEffect(() => {
        fetchPackages();
    }, []);

    const explorePlans = () => {
        dispatch({
            type : actionTypes.HIDE_CREDIT_RESTRICTION,
        })
        history.push('/package-setup')
    }
    
    const closeModal = () => {
        dispatch({
            type : actionTypes.HIDE_CREDIT_RESTRICTION,
        })
    }

    return (
        <div className="cr_modalBase">
            <div className="cr_modalBase_Bg" onClick={() => props.closeModal()}></div>
            {isLoader ? <Loader /> : ""}
            <div className="cr_modal cr_restriction">
                <button className='cr_cross' onClick={closeModal} ><img src={cross_icon} alt="" /></button>
                <div className="cr_modalHead cr_centerHeadder">
                    <h2>Most Popular Packages <img src={happyFaceIcon} /></h2>
                </div>
                <div className="cr_modalBody">
                    <PackagePurchase packages={creditPackages}
                        currentCreditPackageId={currentCreditPackageId}
                        fetchPackages={fetchPackages}
                        isRestriction="true"
                    />
                    {creditPackages.length ? 
                    <div className='cr_btn_holder'>
                        <button className='cr_transparent_btn' onClick={explorePlans}>Explore More Plans <img alt="" src={brownArrow} /></button>
                    </div> : '' }
                </div>
            </div>
        </div>

    )
};

export default RestrictionPackageModal;