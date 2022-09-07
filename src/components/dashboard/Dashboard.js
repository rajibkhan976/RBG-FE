/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
/* eslint-disable jsx-a11y/alt-text */

import upGraph from '../../../src/assets/images/upGraph2.svg';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actionTypes from '../../actions/types';
import DashboardControls from './DashboardControl';
import DashboardFooter from '../shared/FooterDashboard';
import contactDash from '../../../src/assets/images/contactDash.svg';
import Dragable from '../../../src/assets/images/dragable.svg';
import arrowDown from '../../../src/assets/images/arrowDown.svg';
import appDash from '../../../src/assets/images/appDash.svg';
import expandDashboard from '../../../src/assets/images/expandDashboard.svg';
import editings from '../../../src/assets/images/editings.svg';
import profits from '../../../src/assets/images/profits.svg';
import loss from '../../../src/assets/images/loss.svg';
import { DashboardServices } from '../../services/dashboard/DashboardServices';
import moment from 'moment';
import DashboardImg2 from '../../assets/images/Dashboard.png';
import Loader from '../shared/Loader';
import DashboardSortableWidgetList from './DashboardSortableWidgetList';
import { arrayMove } from 'react-sortable-hoc';
const Dashboard = () => {


	const dispatch = useDispatch();

	const [months, setMonths] = useState(moment.months());

	const [appointmentsScheduledInfo, setAppointments] = useState({
		total_appointments: 100,
		from_date: '2022-01-01',
		to_date: '2022-06-27',
	});

	// let defaultCustomizations = [
	// 	{
	// 		"id": "mrr",
	// 		name: 'Monthly Recurring Revenue Growth',
	// 		shouldDisplay: true,
	// 		defaultSelectedMonth: months[moment().month()],
	// 		isOrganizationOwner: true,
	// 	},
	// 	{
	// 		"id": "additional-revenue",
	// 		name: 'Additional Revenue',
	// 		shouldDisplay: true,
	// 		isOrganizationOwner: true,
	// 		defaultSelectedMonth: months[moment().month()],
	// 	},
	// 	{
	// 		"id": "appointments-canceled",
	// 		name: 'Appointments Cancelled',
	// 		shouldDisplay: true,
	// 		isOrganizationOwner: false,
	// 		defaultSelectedMonth: months[moment().month()],
	// 	},
	// 	{
	// 		"id": "appointments-scheduled",
	// 		name: 'Appointments Scheduled',
	// 		shouldDisplay: true,
	// 		isOrganizationOwner: false,
	// 		defaultSelectedMonth: months[moment().month()],
	// 	},
	// 	{
	// 		"id": "appointments-showed",
	// 		name: 'Appointments Showed',
	// 		shouldDisplay: true,
	// 		defaultSelectedMonth: months[moment().month()],
	// 		isOrganizationOwner: false,
	// 	},
	// 	{
	// 		"id": "new-contacts",
	// 		name: 'New Contacts',
	// 		shouldDisplay: true,
	// 		defaultSelectedMonth: months[moment().month()],
	// 		isOrganizationOwner: false,
	// 	},
	// 	{
	// 		"id": "retention",
	// 		name: 'Retention',
	// 		shouldDisplay: true,
	// 		isOrganizationOwner: false,
	// 		defaultSelectedMonth: months[moment().month()],
	// 	},
	// ];

	let defaultCustomizations = [
		{
			"id": "mrr",
			"name": "Monthly Recurring Revenue Growth",
			"display": true,
			"option": {
				"month": "8",
				"year": "2022"
			},
			"defaultSelectedMonth": "August"
		},
		{
			"id": "additional-revenue",
			"name": "Additional Revenue",
			"display": true,
			"option": {
				"month": "8",
				"year": "2022"
			},
			"defaultSelectedMonth": "August"
		},
		{
			"id": "new-contacts",
			"name": "New Contacts",
			"display": true,
			"option": {
				"days": 0
			},
			"defaultSelectedMonth": "August"
		},
		{
			"id": "appointments-scheduled",
			"name": "Appointments Scheduled",
			"display": true,
			"option": {
				"days": 0
			},
			"defaultSelectedMonth": "August"
		},
		{
			"id": "appointments-showed",
			"name": "Appointments Showed",
			"display": true,
			"option": {
				"month": "8",
				"year": "2022"
			},
			"defaultSelectedMonth": "August"
		},
		{
			"id": "appointments-canceled",
			"name": "Appointments Cancelled",
			"display": true,
			"option": {
				"month": "8",
				"year": "2022"
			},
			"defaultSelectedMonth": "August"
		},
		{
			"id": "retention",
			"name": "Retention",
			"display": true,
			"option": {
				"days": 60
			},
			"defaultSelectedMonth": "August"
		}
	]


	const [widgetCustomizationList, setUpdateWidgetControls] = useState(
		defaultCustomizations
	);



	const updateWidgetDefaultDate = (selectedMonthInNumber, index) => {
		console.log("udpated month",	selectedMonthInNumber,index)
		setUpdateWidgetControls(
			[...widgetCustomizationList],
			(widgetCustomizationList[index].defaultSelectedMonth =
				months[selectedMonthInNumber])
		);
	}

	const updateWidgetName = (name,index) =>{
		setUpdateWidgetControls(
			[...widgetCustomizationList],
			(widgetCustomizationList[index].name =name)
		);
	}

	// update widget control from Dashboard control
	const updateWidgetControl = (name) => {
		let updatedControls = widgetCustomizationList;
		updatedControls.map((w) => {
			if (w.name.toLocaleLowerCase() == name.toLocaleLowerCase()) {
				w.display = !w.display;
			}
		});
		setUpdateWidgetControls([...widgetCustomizationList], updatedControls);
		if(localStorage.getItem(loggedInUser.email)!=undefined && localStorage.getItem(loggedInUser.email)){
			clearInterval(localStorage.getItem(loggedInUser.email))
		}
		let syncInterval = setTimeout(async()=>{
			let setData = await DashboardServices.setWidgetsPostion(updatedControls)
			console.log("synced after 30 seconds")
		},30000)
		localStorage.setItem(loggedInUser.email, syncInterval)
		localStorage.setItem(loggedInUser.email+'_widgetsPosition',JSON.stringify(updatedControls))

	};





	const loggedInUser = useSelector((state) => state.user.data);

	const [prodFilterModalStatus, setProdFilterModalStatus] = useState(false);
	const [isLoader, setIsLoader] = useState(false);

	const [email ,setEmail] = useState(null);

	useEffect(() => {
		document.title = 'Red Belt Gym - Dashboard';
	});

	const openFilterModal = () => {
		setProdFilterModalStatus(true);
	};

	const closeFilterModal = () => {
		setProdFilterModalStatus(false);
	};




	const loadPreSelectedDashboardWidgets = async () => {
		let dashboardCustomizations = await DashboardServices.fetchWidgetsPostion()
		setIsLoader(false);

		let dashboardPositions = dashboardCustomizations.data.widget_details
		if(dashboardPositions.length){
			dashboardPositions.map((x=>{
				x.defaultSelectedMonth =  months[moment().month()]
			}))
			console.log("finallly",dashboardPositions)
			setUpdateWidgetControls(dashboardPositions)
		}
	};


	useEffect(async () => {
		setIsLoader(true);
		let test = await DashboardServices.fetchWidgetsPostion()
		console.log("Backend dashboarfd",test.data.widget_details)
		if (loggedInUser?.email) {
			setEmail(loggedInUser.email)
			loadPreSelectedDashboardWidgets();
		}
	}, [loggedInUser]);


	const storeInfoToBackend  = (loggedInUser) => {
		let updatedWidgetList =  localStorage.getItem(loggedInUser?.email+'_widgetsPosition')
		console.log("updatedWidfwrliar",updatedWidgetList,updatedWidgetList!='undefined'  && updatedWidgetList!=null)
		if(updatedWidgetList!='undefined' && updatedWidgetList!=null){

			DashboardServices.setWidgetsPostion(JSON.parse(updatedWidgetList))
			localStorage.setItem(loggedInUser.email+'_widgetsPosition',undefined)
		}
	}
	//Component will un mount hook - Save any changes made to Dashboard to backend before moving to other Tabs
	useEffect( ()=>{
		return  function cleanup(){
			storeInfoToBackend(loggedInUser)
		}
	},[loggedInUser])
	const syncWithBackend = (widgetsInfo) => {
		if(localStorage.getItem(loggedInUser.email)!=undefined && localStorage.getItem(loggedInUser.email)){

			clearInterval(localStorage.getItem(loggedInUser.email))
		}
		let syncInterval  = setTimeout(async()=>{
			let setData = await DashboardServices.setWidgetsPostion(widgetsInfo)
			console.log("synced after 30 seconds")
		},30000)
		localStorage.setItem(loggedInUser.email, syncInterval)
		localStorage.setItem(loggedInUser.email+'_widgetsPosition',JSON.stringify(widgetsInfo))
	}
	const onSortEnd = async ({ oldIndex, newIndex }) => {
		console.log('Sorting...');

		if(JSON.stringify(widgetCustomizationList) === JSON.stringify(arrayMove(widgetCustomizationList, oldIndex, newIndex))){
			console.log("same to same")
		}else{
			setUpdateWidgetControls(
				arrayMove(widgetCustomizationList, oldIndex, newIndex)
			);
			console.log("Syncing started",widgetCustomizationList)
			syncWithBackend(arrayMove(widgetCustomizationList, oldIndex, newIndex))

		}
		// setItems(arrayMove(items, oldIndex, newIndex));
	};


	return (
		<>
			{isLoader ? (
				<Loader />
			) : (
				<>
					{' '}
					{loggedInUser?.isOrganizationOwner == null &&
					loggedInUser?.isAssociationOwner == null ? (
						<div className='dashboardWraperImg'>
							<img src={DashboardImg2} className='dashboardimg' alt='' />

						</div>
					) : (
						<div className='dashInnerUI'>
							<div className='mrrWraper'>
								<h2 className='inDashboardHeader'>Dashboard</h2>
								<p className='userListAbout'>Get a clear view of your task</p>
								<div
									className='expanDashboard'
									onClick={() => openFilterModal()}
								>
									<img src={expandDashboard} alt='' />

								</div>

								<DashboardSortableWidgetList
									axis={'xy'}
									widgets={widgetCustomizationList}
									updateWidgetDefaultDate={updateWidgetDefaultDate}
									updateWidgetName={updateWidgetName}
									onSortEnd={onSortEnd}
									syncWithBackend={syncWithBackend}
									loggedInUser={loggedInUser}
								/>
								<DashboardFooter />
							</div>
							<div className='mrrContraolsWraper'>
								{prodFilterModalStatus === true && (
									<DashboardControls
										closeModal={closeFilterModal}
										updateWidgetControl={(e) => updateWidgetControl(e)}
										widgetList={widgetCustomizationList}
										loggedInUser={loggedInUser}
										onSortEnd={onSortEnd}
									/>
								)}
							</div>
						</div>
					)}{' '}
				</>
			)}
		</>
	);
};

export default Dashboard;