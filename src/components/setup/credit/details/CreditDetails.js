import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "../../../../actions/types";
import cd_walet_icon from "../../../../assets/images/cd_walet_icon.svg";
import cd_sms_icon from "../../../../assets/images/cd_sms_icon.svg";
import cd_call_icon from "../../../../assets/images/cd_call_icon.svg";
import { CreditManagementServices } from "../../../../services/setup/CreditManagementServices";
import moment from "moment";
import DatePicker from "react-datepicker";
import Loader from "../../../shared/Loader";
import { utils } from "../../../../helpers";
import Pagination from "../../../shared/Pagination";
import noRecords from "../../../../assets/images/noRecords.svg";
import filter from "../../../../assets/images/filter.svg";
import arrowRightWhite from "../../../../assets/images/arrowRightWhite.svg";
import cross from "../../../../assets/images/cross.svg";

const CreditDetails = () => {
	const dispatch = useDispatch();
	const [transactionList, setTransactionList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [logsCount, setLogsCount] = useState(0);
	const [sortBy, setSortBy] = useState("");
	const [sortType, setSortType] = useState("asc");
	const [filterModal, setFilterModal] = useState(false);
	const [filterService, setFilterService] = useState(null);
	const [selectedTo, setSelectedTo] = useState();
	const [selectedFrom, setSelectedFrom] = useState();
	const [today, setToday] = useState();
	const [date, setDate] = useState();
	const [date2, setDate2] = useState();
	const servicesName = {
		call: "Call",
		sms: "Sms",
		"point-credited": "Points Credited",
		"incoming-call": "Incoming Call",
		"auto-renewed": "Auto Renewed",
		"incoming-sms": "Incoming SMS",
		"notification-group-sms": "Notification Group SMS",
		"automation-sms": "Automation SMS",
		"gifted-points": "Gifted Points",
		bulksms: "Bulk Sms",
	};
	const timezone = useSelector((state) =>
		state.user?.data?.organizationTimezone
			? state.user.data.organizationTimezone
			: "UTC"
	);
	console.log(timezone);

	const loggedInUser = useSelector((store) => store.user.data);

	useEffect(() => {
		let isMounted = true;
		// Fetch data for socket update
		if (isMounted) {
			fetchTransaction();
		}

		return () => (isMounted = false);
	}, [loggedInUser]);

	const [paginationData, setPaginationData] = useState({
		count: null,
		totalPages: null,
		currentPage: 1,
		limit: 10,
	});

	const timezoneOffset = useSelector((state) =>
		state?.user?.data?.organizationTimezoneInfo?.utc_offset
			? state.user.data.organizationTimezoneInfo.utc_offset
			: null
	);

	useEffect(() => {
		console.log("credit details time zone", timezoneOffset);
	}, [timezoneOffset]);

	useEffect(() => {
		let localDateTime = moment().utc().format("YYYY-MM-DD HH:mm:ss");
		let timezoneDateTime = utils.convertUTCToTimezone(
			localDateTime,
			timezoneOffset
		);
		setToday(timezoneDateTime);
	}, [timezoneOffset]);

	const getQueryParams = async () => {
		const service = utils.getQueryVariable("service");
		const fromDt = utils.getQueryVariable("fromDate");
		const toDt = utils.getQueryVariable("toDate");
		const srtBy = utils.getQueryVariable("sortBy");
		const srtType = utils.getQueryVariable("sortType");
		const queryParams = new URLSearchParams();
		if (service) {
			queryParams.append("service", service);
		}
		if (fromDt) {
			// console.log(decodeURIComponent(fromDt).replaceAll("+"," "));
			// let fromDtConvert = utils.convertTimezoneToUTC(decodeURIComponent(fromDt).replaceAll("+"," ") + " " +"00:00:01", timezoneOffset);
			// console.log("fromDtConvert", fromDtConvert);
			queryParams.append(
				"fromDate",
				decodeURIComponent(fromDt).replaceAll("+", " ")
			);
		}
		if (toDt) {
			console.log(toDt);
			// const toDtConvert = utils.convertTimezoneToUTC(decodeURIComponent(toDt).replaceAll("+"," ") + " " + "24:00:00", timezoneOffset);
			queryParams.append(
				"toDate",
				decodeURIComponent(toDt).replaceAll("+", " ")
			);
		}
		if (srtBy) {
			queryParams.append("sortBy", srtBy);
		}
		if (srtType) {
			queryParams.append("sortType", srtType);
		}
		console.log("Total query perems", queryParams);
		return queryParams;
	};

	const handleSortBy = (field) => {
		// Set sort type
		let type = "asc";
		if (field == sortBy) {
			if (sortType == "asc") {
				type = "dsc";
			}
		}

		// Set state and Update query param
		setSortBy(field);
		setSortType(type);
		utils.addQueryParameter("sortBy", field);
		utils.addQueryParameter("sortType", type);

		// Fetch data
		fetchTransaction();
	};

	// const handleDateFileterChange = (dateDuration) => {
	//     console.log('date filter', dateDuration[0]);
	//     // let year = new Date(dateDuration[0]).getFullYear();
	//     // let month = ("0" + (new Date(dateDuration[0]).getMonth() + 1)).slice(-2);
	//     // let day = ("0" + new Date(dateDuration[0]).getDate()).slice(-2);
	//     // console.log(year, month, day);
	//     // console.log(new Date(dateDuration[0]));
	//     // console.clear();
	//     let fromDate = utils.convertTimezoneToUTC(new Date(dateDuration[0]).getFullYear() + "-" + ("0" + (new Date(dateDuration[0]).getMonth() + 1)).slice(-2) + "-" + ("0" + new Date(dateDuration[0]).getDate()).slice(-2) + " " + "00:00:01", timezoneOffset);
	//     let toDate = utils.convertTimezoneToUTC(new Date(dateDuration[1]).getFullYear() + "-" + ("0" + (new Date(dateDuration[1]).getMonth() + 1)).slice(-2) + "-" + ("0" + new Date(dateDuration[1]).getDate()).slice(-2) + " " + "00:00:01", timezoneOffset);
	//     console.log("From date", fromDate);
	//     console.log("To date", toDate);
	//     let replace01 = decodeURIComponent(fromDate.replaceAll("%3A", ":"));
	//     console.log(replace01);
	//     if (dateDuration && dateDuration.length) {
	//         utils.addQueryParameter('fromDate', moment(dateDuration[0]).format("YYYY-MM-DD"));
	//         utils.addQueryParameter('toDate', moment(dateDuration[1]).format("YYYY-MM-DD"));
	//         // utils.addQueryParameter('fromDate', fromDate);
	//         // utils.addQueryParameter('toDate', toDate);
	//         setFilterDate(dateDuration);
	//     }
	//     console.log("set filter", dateDuration);
	//     // Fetch data
	//     fetchTransaction();
	// }

	const handleFromChange = (val) => {
		setDate(val);
		if (val) {
			const yyyy = val.getFullYear();
			let mm = val.getMonth() + 1; // Months start at 0!
			let dd = val.getDate();
			if (dd < 10) dd = "0" + dd;
			if (mm < 10) mm = "0" + mm;
			let formattedDate = `${yyyy}-${mm}-${dd}`;
			setSelectedFrom(formattedDate);
			console.log(formattedDate);
			//utils.addQueryParameter('fromDate', formattedDate);
		} else {
			setSelectedFrom("");
		}
	};

	const handleToChange = (val) => {
		setDate2(val);
		if (val) {
			const yyyy = val.getFullYear();
			let mm = val.getMonth() + 1; // Months start at 0!
			let dd = val.getDate();
			if (dd < 10) dd = "0" + dd;
			if (mm < 10) mm = "0" + mm;
			let formattedDate = `${yyyy}-${mm}-${dd}`;
			setSelectedTo(formattedDate);
			//utils.addQueryParameter('toDate', formattedDate);
		} else {
			setSelectedTo("");
		}
	};

	//Handle pagination click
	const paginationCallbackHandle = useCallback(() => {
		fetchTransaction();
	}, []);

	const fetchTransaction = async (fetchedType) => {
		let queryParams = await getQueryParams();
		let pageId = utils.getQueryVariable("page");
		pageId =
			fetchedType == "selected"
				? 1 && utils.removeQueryParameter("page")
				: pageId
				? pageId
				: 1;
		try {
			setLoading(true);
			let response = await CreditManagementServices.fetchTransaction(
				pageId,
				queryParams
			);
			if (response) {
				setTransactionList(response.transactions);
				setLogsCount(response.pagination.count);
				setPaginationData({
					...paginationData,
					currentPage: response.pagination.currentPage,
					totalPages: response.pagination.totalPages,
				});
			}
			console.log("Credit transaction response:: ", response);
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	};

	const handleServiceChange = (e) => {
		console.log("service change", e.target.value);
		setFilterService(e.target.value);
	};

	const openFilter = () => {
		console.log(
			"Filterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
			new Date(
				moment(
					utils.convertUTCToTimezone(
						decodeURIComponent(utils.getQueryVariable("fromDate")).replaceAll(
							"+",
							" "
						),
						timezoneOffset
					)
				).format("MM/DD/YYYY")
			)
		);
		setFilterService(
			utils.getQueryVariable("service") ? utils.getQueryVariable("service") : ""
		);
		setSelectedTo(
			utils.getQueryVariable("toDate")
				? moment(
						utils.convertUTCToTimezone(
							decodeURIComponent(utils.getQueryVariable("toDate")).replaceAll(
								"+",
								" "
							),
							timezoneOffset
						)
				  ).format("MM/DD/YYYY")
				: ""
		);
		setSelectedFrom(
			utils.getQueryVariable("fromDate")
				? moment(
						utils.convertUTCToTimezone(
							decodeURIComponent(utils.getQueryVariable("fromDate")).replaceAll(
								"+",
								" "
							),
							timezoneOffset
						)
				  ).format("MM/DD/YYYY")
				: ""
		);
		setDate2(
			utils.getQueryVariable("toDate")
				? new Date(
						moment(
							utils.convertUTCToTimezone(
								decodeURIComponent(utils.getQueryVariable("toDate")).replaceAll(
									"+",
									" "
								),
								timezoneOffset
							)
						).format("MM/DD/YYYY")
				  )
				: ""
		);
		setDate(
			utils.getQueryVariable("fromDate")
				? new Date(
						moment(
							utils.convertUTCToTimezone(
								decodeURIComponent(
									utils.getQueryVariable("fromDate")
								).replaceAll("+", " "),
								timezoneOffset
							)
						).format("MM/DD/YYYY")
				  )
				: ""
		);

		setFilterModal(true);
	};

	const closeFilter = () => {
		setFilterModal(false);
	};

	const applyFilter = () => {
		console.log(
			"applyFilteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeerrrrrrrrr",
			selectedFrom,
			selectedTo
		);
		// let convertFrom = utils.convertTimezoneToUTC(selectedFrom + " " + "00:00:01", timezoneOffset);
		// let convertTo = utils.convertTimezoneToUTC(selectedTo + " " + "23:59:59", timezoneOffset);
		if (!filterService && !selectedFrom && !selectedTo) {
			dispatch({
				type: actionTypes.SHOW_MESSAGE,
				message: "Please select any filter first.",
				typeMessage: "error",
			});
		} else if (!selectedFrom && selectedTo) {
			utils.removeQueryParameter("fromDate");
			let convertTo = utils.convertTimezoneToUTC(
				selectedTo + " " + "23:59:59",
				timezoneOffset
			);
			utils.addQueryParameter("toDate", convertTo);

			if (filterService && filterService !== "all") {
				utils.addQueryParameter("service", filterService);
			} else {
				utils.removeQueryParameter("service");
			}
			fetchTransaction("selected");
			setFilterModal(false);
		} else if (selectedFrom && !selectedTo) {
			utils.removeQueryParameter("toDate");
			let convertFrom = utils.convertTimezoneToUTC(
				selectedFrom + " " + "00:00:01",
				timezoneOffset
			);
			utils.addQueryParameter("fromDate", convertFrom);

			if (filterService && filterService !== "all") {
				utils.addQueryParameter("service", filterService);
			} else {
				utils.removeQueryParameter("service");
			}
			fetchTransaction("selected");
			setFilterModal(false);
		} else if (selectedFrom && selectedTo) {
			let convertFrom = utils.convertTimezoneToUTC(
				selectedFrom + " " + "00:00:01",
				timezoneOffset
			);
			let convertTo = utils.convertTimezoneToUTC(
				selectedTo + " " + "23:59:59",
				timezoneOffset
			);
			utils.addQueryParameter("fromDate", convertFrom);
			utils.addQueryParameter("toDate", convertTo);

			if (filterService && filterService !== "all") {
				utils.addQueryParameter("service", filterService);
			} else {
				utils.removeQueryParameter("service");
			}
			fetchTransaction("selected");
			setFilterModal(false);
		} else {
			utils.removeQueryParameter("fromDate");
			utils.removeQueryParameter("toDate");

			if (filterService && filterService !== "all") {
				utils.addQueryParameter("service", filterService);
			} else {
				utils.removeQueryParameter("service");
			}
			fetchTransaction("selected");
			setFilterModal(false);
		}
	};

	const removeFilterParam = (param) => {
		switch (param) {
			case "service":
				utils.removeQueryParameter("service");
				setFilterService(null);
				fetchTransaction();
				break;
			case "fromDate":
				setDate(null);
				utils.removeQueryParameter("fromDate");
				if (utils.getQueryVariable("service")) {
					fetchTransaction("selected");
				} else {
					fetchTransaction();
				}
				break;
			case "toDate":
				setDate2(null);
				utils.removeQueryParameter("toDate");
				if (utils.getQueryVariable("service")) {
					fetchTransaction("selected");
				} else {
					fetchTransaction();
				}
				break;
			case "clear":
				utils.removeQueryParameter("service");
				utils.removeQueryParameter("fromDate");
				utils.removeQueryParameter("toDate");
				setFilterService(null);
				setSelectedFrom(null);
				setSelectedTo(null);
				setDate(null);
				setDate2(null);
				fetchTransaction();
		}
	};

	const clearFilter = () => {
		setFilterService("");
		setSelectedFrom(null);
		setSelectedTo(null);
		setDate(null);
		setDate2(null);
	};

	const creditListIcon = (item) => {
		switch (item.serviceSlug) {
			case "point-credited":
				return cd_walet_icon;
				break;
			case "auto-renewed":
				return cd_walet_icon;
				break;
			case "sms":
				return cd_sms_icon;
				break;
			case "bulksms":
				return cd_sms_icon;
				break;
			case "notification-group-sms":
				return cd_sms_icon;
				break;
			case "automation-sms":
				return cd_sms_icon;
				break;
			case "incoming-sms":
				return cd_sms_icon;
				break;
			default:
				return cd_call_icon;
		}
		fetchTransaction("selected");
	};

	return (
		<>
			{loading && <Loader />}
			<div className='cr_body ss'>
				<div className='userListHead'>
					<div className='listInfo'>
						<ul className='listPath'>
							<li>Setup</li>
							<li>Credit Management</li>
							<li>Credit Report</li>
						</ul>
						<h2 className='inDashboardHeader'>Credit Report</h2>
						<p className='userListAbout'>
							Credit history Report for your Organization
						</p>
					</div>
					<div className='cr_featureShowStat'>
						<h3>
							Credit Balance :{" "}
							<span>
								{" "}
								{loggedInUser
									? loggedInUser.credit
										? loggedInUser.credit.toLocaleString()
										: 0
									: 0}
							</span>
						</h3>
					</div>
					<div className='listFeatures'>
						<button
							class='saveNnewBtn appFilter expContactBtn communicationBtnfilter'
							onClick={openFilter}
						>
							Filter{" "}
							<img
								src={filter}
								alt=''
							/>
						</button>
					</div>
				</div>

				{utils.getQueryVariable("service") ||
				utils.getQueryVariable("fromDate") ||
				utils.getQueryVariable("toDate") ? (
					<div className='filterParam'>
						{utils.getQueryVariable("service") && (
							<div class='contactsTags'>
								<span class='pageInfo'>
									<strong>Filter by:</strong>{" "}
									{servicesName[utils.getQueryVariable("service")]}
								</span>
								<span
									class='crossTags'
									onClick={() => removeFilterParam("service")}
								>
									<img
										src={cross}
										alt=''
									/>
								</span>
							</div>
						)}
						{utils.getQueryVariable("fromDate") && (
							<div class='contactsTags'>
								<span class='pageInfo'>
									<strong>From date:</strong>{" "}
									{utils.convertUTCToTimezone(
										decodeURIComponent(
											utils.getQueryVariable("fromDate")
										).replaceAll("+", " "),
										timezoneOffset
									)}
								</span>
								<span
									class='crossTags'
									onClick={() => removeFilterParam("fromDate")}
								>
									<img
										src={cross}
										alt=''
									/>
								</span>
							</div>
						)}
						{utils.getQueryVariable("toDate") && (
							<div class='contactsTags'>
								<span class='pageInfo'>
									<strong>To date:</strong>{" "}
									{utils.convertUTCToTimezone(
										decodeURIComponent(
											utils.getQueryVariable("toDate")
										).replaceAll("+", " "),
										timezoneOffset
									)}
								</span>
								<span
									class='crossTags'
									onClick={() => removeFilterParam("toDate")}
								>
									<img
										src={cross}
										alt=''
									/>
								</span>
							</div>
						)}
						<div
							class='contactsTags clearAlls'
							onClick={() => removeFilterParam("clear")}
						>
							<span class='allDel'>Clear All</span>
						</div>
					</div>
				) : (
					""
				)}

				<div className='userListBody'>
					<div className='listBody cr_tableListing'>
						{transactionList.length ? (
							<ul className='tableListing'>
								<li className='listHeading '>
									<div
										className={
											"cr_td_head" +
											(sortBy == "crItems" ? "sort " + sortType : "")
										}
										onClick={() => handleSortBy("crItems")}
									>
										Credit Items
									</div>
									<div className='cr_td_head vacent'>Amount</div>
									<div className='cr_td_head vacent'>Transaction ID </div>
									<div
										className={
											"cr_td_head" +
											(sortBy == "date" ? "sort " + sortType : "")
										}
										onClick={() => handleSortBy("date")}
									>
										Date
									</div>
									<div
										className={
											"cr_td_head" +
											(sortBy == "time" ? "sort " + sortType : "")
										}
										onClick={() => handleSortBy("time")}
									>
										Time
									</div>
									<div className='cr_td_head vacent'>Credit/Debit</div>
								</li>
								{transactionList.map((item, index) => {
									return (
										<li key={"trx_" + index}>
											<div className='cr_successDetails'>
												{/* <img src={item.serviceSlug === "point-credited" || "auto-renewed" ? cd_walet_icon : (item.serviceSlug === "sms" || "bulksms" || "notification-group-sms" || "automation-sms" ? cd_sms_icon : cd_call_icon)} alt="" /> */}
												<img
													src={creditListIcon(item)}
													alt=''
												/>
												<div className='text'>
													<h3>{item.status}</h3>
													<p>
														<span>Service: </span> {item.service}
													</p>
												</div>
											</div>
											<div
												className={item.approved_amount ? "cr_amount" : "cr_td"}
											>
												{item.type === "credit" && item.approved_amount
													? "$" + item.approved_amount
													: "N/A"}
											</div>
											<div className='cr_td'>
												{item.type === "credit" && item.transaction_id
													? item.transaction_id
													: "N/A"}
											</div>
											<div className='cr_date'>
												{utils.convertUTCToTimezone(
													item.createdAt,
													timezoneOffset,
													"LL"
												)}
											</div>
											<div className='cr_date'>
												{utils.convertUTCToTimezone(
													item.createdAt,
													timezoneOffset,
													"hh:mm A"
												)}
												{utils
													.convertUTCToTimezone(
														utils.dateConversion(item.createdAt) +
															" " +
															item.createdAt.split(" ")[1],
														timezoneOffset
													)
													.split(" ")
													.splice(3, 4)
													.join(" ")}
											</div>
											<div className='cr_credit'>
												<span
													className={
														item.type === "credit" ? "greentxt" : "redtxt"
													}
												>
													{item.type === "credit"
														? "+" + item.credit
														: "-" + item.credit}
												</span>
											</div>
										</li>
									);
								})}
							</ul>
						) : (
							<div className='cr_noInfos'>
								<div className='noRecordsImgWraper'>
									<img
										src={noRecords}
										className='noRecords'
										alt=''
									/>
									<h4>No Records Found</h4>
									<p>No Records have been listed here yet</p>
								</div>
							</div>
						)}
					</div>
				</div>
				{logsCount > paginationData.limit ? (
					<Pagination
						type='creditTransaction'
						paginationData={paginationData}
						dataCount={logsCount}
						callback={paginationCallbackHandle}
					/>
				) : (
					""
				)}
			</div>

			{filterModal && (
				<div
					className='sideMenuOuter'
					id='import_Modal'
				>
					<div className='dialogBg'></div>
					<div className='sideMenuInner importModalContainer updateContainer'>
						<div className='sideMenuHeader'>
							<h3>Apply Filter</h3>
							<button
								className='btn btn-closeSideMenu'
								onClick={closeFilter}
							>
								<span></span>
								<span></span>
							</button>
						</div>
						<div className='importModalBody setFilter'>
							<div className='filterOfContactListing'>
								<div className='infoInputs appModal'>
									<ul>
										<li className='blockLi'>
											<div className='formField w-100 appModals formControl phasesSelection'>
												<label>Filter by</label>
												<select
													onChange={handleServiceChange}
													value={filterService}
												>
													<option value=''>Select a filter</option>
													<option value='call'>Call</option>
													<option value='sms'>SMS</option>
													<option value='point-credited'>
														Points Credited
													</option>
													<option value='incoming-call'>Incoming Call</option>
													<option value='auto-renewed'>Auto Renewed</option>
													<option value='incoming-sms'>Incoming SMS</option>
													<option value='notification-group-sms'>
														Notification Group SMS
													</option>
													<option value='automation-sms'>Automation SMS</option>
													<option value='bulksms'>Bulk SMS</option>
													<option value='gifted-points'>Gifted Points</option>
												</select>
											</div>
										</li>
										<li className='dateRangeHeading'>
											<p className='dateRange pTags'>Date Range</p>
										</li>
										<li className='halfDates dateRange'>
											<div className='formField w-50 appflex durationWraper'>
												<label>From</label>
												<div className='inFormField duration'>
													<DatePicker
														className='cmnFieldStyle'
														selected={selectedFrom ? date : ""}
														format='MM/dd/yyyy'
														dateFormat='MM/dd/yyyy'
														placeholderText='MM/DD/YYYY'
														onChange={(e) => handleFromChange(e)}
														maxDate={date2 ? date2 : new Date(today)}
													/>
												</div>
											</div>
											<div className='formField w-50 appflex durationWraper'>
												<label>To</label>
												{/* <div className={selectedFrom ? "inFormField duration" : "inFormField duration disabled"}> */}
												<div className='inFormField duration'>
													<DatePicker
														className='cmnFieldStyle'
														selected={selectedTo ? date2 : ""}
														format='MM/dd/yyyy'
														dateFormat='MM/dd/yyyy'
														placeholderText='MM/DD/YYYY'
														onChange={(e) => handleToChange(e)}
														minDate={date}
														maxDate={new Date(today)}
													/>
												</div>
											</div>
										</li>
										<li className='lastLiApp btnLi'>
											<div className='formField formControl w-50 appflex'>
												<button
													type='submit'
													className='saveNnewBtn'
													onClick={applyFilter}
												>
													<span>Apply Filter</span>
													<img
														src={arrowRightWhite}
														alt=''
													/>
												</button>
											</div>
											<div className='formField w-50 appflex clearFilterBtns'>
												<span
													className='clearFilter'
													onClick={clearFilter}
												>
													Clear
												</span>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CreditDetails;
