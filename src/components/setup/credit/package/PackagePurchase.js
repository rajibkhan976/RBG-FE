import { useState } from 'react';
import { useSelector } from 'react-redux';
import { utils } from "../../../../helpers";
import { useLocation } from 'react-router-dom';
import PackagePaymentModal from "./PackagePaymentModal";
import PurchaseSuccess from './PurchaseSuccess';
import PurchaseFailed from './PurchaseFailed';
import noReconrsImg from "../../../../assets/images/noRecords.svg";
import { useDispatch } from 'react-redux';
import * as actionTypes from "../../../../actions/types";


const PackagePurchase = (props) => {
    const [closeModalCR, setCloseModalCR] = useState(false);
    const [sendPackageData, setSendPackageData] = useState(null);
    const [isPurchasedData, setIsPurchasedData] = useState(null);
    const [isPurchaseFailed, setIsPurchaseFailed] = useState(false);
    const [purchaseFailedMsg, setPurchaseFailedMsg] = useState(null);

    const loggedInUser = useSelector((state) => state.user.data);
    const dispatch = useDispatch();
    const openModalhandler = (selectedPackage) => {
        //Filter selected package
        setSendPackageData(selectedPackage);
        setCloseModalCR(true);
    }
    const closeModalhandler = () => {
        setCloseModalCR(false);
    }

    const paymentSuccessModalHandler = (data) => {
        console.log('success', data)
        setIsPurchasedData(data);
    }

    const paymentFailedModalHandler = (message) => {
        console.log('failed', message)
        setPurchaseFailedMsg(message)
        setIsPurchaseFailed(true);
        setCloseModalCR(false);
    }

    const closeSuccessModalhandler = () => {
        setIsPurchasedData(null);
    }

    const closeFailedModalhandler = () => {
        setIsPurchaseFailed(false);
    }

    return (
        <div className={props.isRestriction && JSON.parse(props.isRestriction) ? "cr_orgWoner" : "cr_body cr_orgWoner"}>
            <div className="userListHead">
                { typeof props.isRestriction === 'undefined' ?
                    <div className="listInfo">
                        <h2 className="inDashboardHeader">Credit Packages ({props.packages.length})</h2>
                        <p className="userListAbout">All available packages for your Organization</p>
                    </div> : ''}
            </div>
            {/* <Scrollbars renderThumbVertical={(props) => <div className="thumb-vertical" />} > */}
            {props.packages.length ?
                <div className={props.isRestriction && JSON.parse(props.isRestriction) ? "cr_packageBody no_scroll" : "cr_packageBody cr_orgWonerScroll"}>

                    {props.packages && props.packages.map((element, index) => {
                        return (
                            <div className={props.currentCreditPackageId === element._id ? "cr_packageCard active" : "cr_packageCard"} key={"packagesBuy_" + index}>
                                {element.discount ?
                                    <div className="cr_offerTag" title={element?.discount}>
                                        {utils.generateExcerpt(element?.discount)}
                                    </div>
                                    : ""}
                                <div className="cr_packageCardHead">
                                    <h2 title={element.name}>{utils.generateExcerpt(element.name)}</h2>
                                    <p className="cr_totalCredit">{element.credit.toLocaleString()}</p>
                                    <span>Credits</span>
                                </div>
                                <div className="cr_packageCardPriceSec">
                                    <p>${element.price.toFixed(2)}</p>
                                    {props.currentCreditPackageId !== element._id ?
                                        <button type="button" className="cr_buyNowBtn saveNnewBtn" onClick={() => {openModalhandler(element); dispatch({type: actionTypes.MODAL_COUNT_INCREMENT, area: 'firstEmail'})}}><span>BUY NOW</span></button>
                                        :
                                        <div className="cr_activePackageBtnArea">
                                            <div className="cr_activePackageBtnLbl">
                                                Current
                                            <span>Package</span>
                                            </div>
                                            <button type="button" className="cr_renewBtn" onClick={() => openModalhandler(element)}>RENEW</button>
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    })}

                </div> :

                <div className="noDataSec">
                    <img src={noReconrsImg} className="noRecords" alt="" />
                    <h2>No Package Found</h2>
                    <p>No package have been listed here yet</p>
                </div>
            }
            {/* </Scrollbars> */}
            {closeModalCR &&
                <PackagePaymentModal
                    package={sendPackageData}
                    closeModal={() => closeModalhandler()}
                    openPaymentSuccessModal={(data) => paymentSuccessModalHandler(data)}
                    openPaymentFailedModal={(message) => paymentFailedModalHandler(message)}
                    fetchPackages={() => props.fetchPackages()}
                />
            }
            {isPurchasedData &&
                <PurchaseSuccess
                    purchasedData={isPurchasedData}
                    closeModal={closeSuccessModalhandler}
                    fetchPackages={() => props.fetchPackages()}
                />
            }
            {isPurchaseFailed && <PurchaseFailed closeModal={closeFailedModalhandler} purchaseFailedMsg={purchaseFailedMsg}/>}
        </div>
    );
};

export default PackagePurchase;