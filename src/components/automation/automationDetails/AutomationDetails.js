import { lazy, Suspense, useEffect, useState } from "react";
import ListHeader from "../automation-shared/ListHeader";
import Loader from "../../shared/Loader";
import noRecords from '../../../assets/images/noRecords.svg';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {utils} from "../../../helpers";
import {AutomationServices} from "../../../services/automation/AutomationServices";
import * as actionTypes from "../../../actions/types";
import AutomationOverview from "./AutomationOverview";
const AutomationHistory = lazy(() => import("./AutomationHistory"))

function AutomationDetails(props) {
    const [automationObject, setAutomationObject] = useState({});
    const [automationDetails, setAutomationDetails] = useState({});
    const [automationId, setAutomationId] = useState("");
    const [stateTabDetails, setStateTabDetails] = useState("history");
    const [isLoading, setIsLoading] = useState(false);
    const [automationHistory, setAutomationHistory] = useState([]);
    const [completedAutomation, setCompletedAutomation] = useState(0);
    const [totalAutomation, setTotalAutomation] = useState(0);
    const [paginationData, setPaginationData] = useState({});
    const timezone = useSelector((state) => (state.user?.data?.organizationTimezone) ? state.user.data.organizationTimezone : "UTC");
    const dispatch = useDispatch();
    const id = useParams();

    const fetchHistory = async (newAutomationId = "") => {
      console.log("Called Fetch History");
      const pageId =  utils.getQueryVariable('page') || 1 ;
      console.log("Page ID",pageId);
        try {
          
            if (newAutomationId) {
                setAutomationId(newAutomationId)
            }
            if (automationId) {
                setIsLoading(true);
                
                const queryParams = await getQueryParams() || null;
                const res = await AutomationServices.fetchHistory(automationId, pageId, queryParams);
                setAutomationHistory(res.data);
                setAutomationDetails(res.automationDetails);
                setPaginationData(res.pagination);
                const resCount = await AutomationServices.fetchHistoryCount(automationId);
                setCompletedAutomation(resCount.statusCount);
                setTotalAutomation(resCount.totalCount);
            }
        } catch (e) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(async () => {
        await fetchHistory();
    }, [automationId]);

    const getQueryParams = async () => {
        const from = utils.getQueryVariable('fromDate');
        const to = utils.getQueryVariable('toDate');
        const status = utils.getQueryVariable('status');
        const queryParams = new URLSearchParams();
        if (from) {
           // queryParams.append("fromDate", from);
            queryParams.append("fromDate", decodeURIComponent(from).replaceAll("+", " "));

        }
        if (to) {
           // queryParams.append("toDate", to);
            queryParams.append("toDate", decodeURIComponent(to).replaceAll("+", " "));

        }
        if (status) {
            queryParams.append("status", status);
        }
        return queryParams;
    }
    const changeTabAutomation = (e) => {
        setStateTabDetails(e);
    };
    const changeIsLoading = (value) => {
      setIsLoading(value);
    }
    useEffect(() => {
        if (id && id.automationId) {
            setAutomationId(id.automationId);
        }
    }, [id]);

    return (
        <>
            <div className="dashInnerUI dashboardInnerDetails">
                {isLoading ? <Loader /> : ''}
                <ListHeader
                    autoName={automationDetails?.name}
                    createdBy={automationDetails?.created_by_user?.firstName + ' ' + automationDetails.created_by_user?.lastName}
                    createdOn={automationDetails?.automationElement?.createdAt}
                />
                <div className="tabDetailsList">
                    <ul>
                        <li>
                            <button
                                className={
                                    stateTabDetails === "history"
                                        ? "btn btnTab active"
                                        : "btn btnTab"
                                }
                                onClick={() => changeTabAutomation("history")}
                            >
                                History
                            </button>
                        </li>
                        <li>
                            <button
                                className={
                                    stateTabDetails === "overview"
                                        ? "btn btnTab active"
                                        : "btn btnTab"
                                }
                                onClick={() => changeTabAutomation("overview")}
                            >
                                Overview
                            </button>
                        </li>
                    </ul>

                    <div className="statsDetails">
                        <div className="progressBar">
                            <div className="bar">
                                <div
                                    className="fill"
                                    style={{
                                        width:
                                            (completedAutomation / totalAutomation) * 100+"%"
                                    }}
                                ></div>
                            </div>
                            <div className="barValInfo">
                                <span>{completedAutomation}</span> &nbsp; out of{" "} &nbsp;
                                <span>{totalAutomation}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="userListBody autoDetailsTab">
                    <div className="tabBody tabBodyDetails">
                        {stateTabDetails === "overview" ? (
                            <AutomationOverview 
                                payload={automationDetails.blueprint}
                                automationId={automationId}/>
                        ) : (
                            <AutomationHistory key="automationhistories" fetchHistory={fetchHistory} automationId={automationId} automationDetails={automationDetails}
                                               automationHistory={automationHistory} paginationData={paginationData} timezone={timezone} changeIsLoading={changeIsLoading}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AutomationDetails;
