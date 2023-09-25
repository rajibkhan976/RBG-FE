import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getOrganizationsList,
	sendCreditGiftPoint,
} from "../../../../actions/creditActions";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import MultiSelector from "../../../shared/customFormControl/multiselect/MultiSelector";

const GiftPackageDrawer = (props) => {
	const { toggleDrawer, toggleLoader, handleToggleDrawer } = props;
	const [selectedOrganizations, setSelectedOrganizations] = useState([]);
	const [giftPoints, setGiftPoints] = useState("");
	const [searchKey, setSearchKey] = useState("");
	const [selectOrgErrorMsg, setSelectOrgErrorMsg] = useState("");
	const [giftPointErrorMsg, setGiftPointErrorMsg] = useState("");
	const [organizationsList, setOrganizationsList] = useState([]);
	const dispatch = useDispatch();
	const organizationListData = useSelector(
		(state) => state.credit.organizationListData
	);
	const sentGiftPointResponse = useSelector(
		(state) => state.credit.sentGiftPointResponse
	);

	useEffect(() => {
		dispatch(getOrganizationsList("all"));
	}, []);

	useEffect(() => {
		if (organizationListData && organizationListData.organizations) {
			setOrganizationsList([
				{ value: "all", label: "Select all" },
				...organizationListData?.organizations?.map((organization) => {
					return { value: organization?._id, label: organization?.name };
				}),
			]);
		}
	}, [organizationListData]);

	const closeDrawer = (e) => {
		handleToggleDrawer(false);
		setSelectOrgErrorMsg("");
		setGiftPointErrorMsg("");
	};

	const sendGiftPackage = () => {
		let payload = null;
		if (!(selectedOrganizations?.length > 0)) {
			setSelectOrgErrorMsg("Please select organization(s)");
		}
		if (
			!giftPoints ||
			parseInt(giftPoints) < 1 ||
			isNaN(parseInt(giftPoints))
		) {
			setGiftPointErrorMsg("Please enter points");
		}
		if (
			selectedOrganizations?.length > 0 &&
			giftPoints &&
			parseInt(giftPoints) > 0 &&
			!isNaN(parseInt(giftPoints))
		) {
			payload = {
				giftedPoints: parseInt(giftPoints),
				organizations: selectedOrganizations
					?.filter((item) => item?.value?.toLowerCase() !== "all")
					?.map((item) => item?.value),
				updateAll: false,
			};
			dispatch(sendCreditGiftPoint(payload));
			toggleLoader(true);
			handleToggleDrawer(false);
			setSelectedOrganizations([]);
			setGiftPoints("");
		}
	};

	useEffect(() => {
		if (sentGiftPointResponse) {
			toggleLoader(false);
			sentGiftPointResponse === "Error"
				? dispatch({
						type: "SHOW_MESSAGE",
						message: "Gift Points sending failed",
						typeMessage: "error",
				  })
				: dispatch({
						type: "SHOW_MESSAGE",
						message: "Gift Points sent successfully",
						typeMessage: "success",
				  });
		}
		return () => {
			dispatch({
				type: "RESET_SEND_CREDIT_GIFT_POINT_RESPONSE",
				data: null,
			});
		};
	}, [sentGiftPointResponse]);

	const onChangeSelectOrganizations = (value) => {
		if (
			value &&
			value?.toLowerCase() !== "all" &&
			selectedOrganizations?.every(
				(organization) => organization?.value !== value
			)
		) {
			setSelectedOrganizations([
				...selectedOrganizations,
				organizationsList?.find(
					(organization) => organization?.value === value
				),
			]);
		} else if (
			value &&
			value?.toLowerCase() !== "all" &&
			selectedOrganizations?.some(
				(organization) => organization?.value === value
			)
		) {
			setSelectedOrganizations(
				selectedOrganizations?.filter(
					(organization) =>
						organization?.value !== value &&
						organization?.value?.toLowerCase() !== "all"
				)
			);
		} else if (value && value?.toLowerCase() === "all") {
			if (
				selectedOrganizations?.some(
					(organization) => organization?.value?.toLowerCase() === "all"
				)
			) {
				setSelectedOrganizations([]);
			} else {
				setSelectedOrganizations(organizationsList);
			}
		} else if (!value) {
			setSelectedOrganizations([]);
		}
	};

	const onChangeGiftPoint = (event) => {
		if (!isNaN(parseInt(event.target.value?.trim()))) {
			setGiftPoints(parseInt(event.target.value?.trim()));
		} else {
			setGiftPoints("");
		}
	};

	useEffect(() => {
		if (
			searchKey?.trim() &&
			organizationListData &&
			Array.isArray(organizationListData.organizations) &&
			organizationListData.organizations.some(
				(organization) =>
					organization?.name
						?.toLowerCase()
						?.indexOf(searchKey?.trim()?.toLowerCase()) !== -1
			)
		) {
			const organizationList = organizationListData.organizations?.map(
				(element) => {
					return { value: element?._id, label: element?.name };
				}
			);
			setOrganizationsList([
				{ value: "all", label: "Select all" },
				...organizationList?.filter(
					(organization) =>
						organization?.label
							?.toLowerCase()
							?.includes(searchKey?.trim()?.toLowerCase()) &&
						organization?.value?.toLowerCase() !== "all"
				),
			]);
		} else if (
			searchKey?.trim() &&
			organizationListData &&
			Array.isArray(organizationListData.organizations) &&
			!organizationListData.organizations?.some(
				(organization) =>
					organization?.name
						?.toLowerCase()
						?.indexOf(searchKey?.trim()?.toLowerCase()) !== -1
			)
		) {
			setOrganizationsList([]);
		} else if (
			organizationListData &&
			Array.isArray(organizationListData.organizations)
		) {
			setOrganizationsList([
				{ value: "all", label: "Select all" },
				...organizationListData?.organizations?.map((organization) => {
					return { value: organization?._id, label: organization?.name };
				}),
			]);
		}
	}, [searchKey]);

	useEffect(() => {
		if (selectedOrganizations?.length > 0) {
			setSelectOrgErrorMsg("");
		}
	}, [selectedOrganizations]);

	useEffect(() => {
		if (
			giftPoints &&
			!isNaN(parseInt(giftPoints)) &&
			parseInt(giftPoints) > 0
		) {
			setGiftPointErrorMsg("");
		}
	}, [giftPoints]);

	const setSelectionInfo = () => {
		const selectionCount =
			selectedOrganizations?.length === organizationsList?.length
				? selectedOrganizations?.length - 1
				: selectedOrganizations?.length;
		return `${selectionCount} Organization${
			selectionCount > 1 ? "s" : ""
		} Selected`;
	};

	return (
		<>
			{toggleDrawer && (
				<div className='sideMenuOuter filterUserMenu gift-pkg-drawer'>
					<div className='sideMenuInner'>
						<div className='sideMenuHeader'>
							<h3 className='liteHeading'>Send Gift Points</h3>
							<button
								className='btn btn-closeSideMenu gift-pkg-modal-close-btn'
								onClick={(e) => closeDrawer(e)}
							>
								<span></span>
								<span></span>
							</button>
						</div>
						<div className='sideMenuBody gift-pkg-drawer-body'>
							<MultiSelector
								className='multi-select-height'
								clearControlLabel={"Clear all"}
								errorMsg={selectOrgErrorMsg}
								handleSetSearchKey={setSearchKey}
								isRequired
								items={organizationsList}
								label={"Select Organization(s)"}
								placeholder={"Select"}
								searchKey={searchKey}
								selectionInfo={
									selectedOrganizations?.length > 0 && setSelectionInfo()
								}
								selectedItems={selectedOrganizations}
								setSelectedItems={onChangeSelectOrganizations}
							/>
							<div className='formField'>
								<p>
									Enter Gift Points <span className='required'>*</span>
								</p>
								<div
									className={
										`${giftPointErrorMsg ? "gift-point-control-err" : ""}` +
										" inFormField"
									}
								>
									<input
										type='text'
										onChange={onChangeGiftPoint}
										value={giftPoints}
										maxLength={"4"}
										pattern='[0-9]{4}'
									/>
								</div>
								{giftPointErrorMsg && (
									<span className='gift-point-err-msg'>
										{giftPointErrorMsg}
									</span>
								)}
							</div>
						</div>
						<div className='d-flex justify-content-center'>
							<button
								className='saveNnewBtn'
								onClick={sendGiftPackage}
							>
								<span>Send Now</span>
								<img
									className=''
									src={arrow_forward}
									alt=''
								/>
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default GiftPackageDrawer;
