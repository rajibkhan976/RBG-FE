/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
/* eslint-disable jsx-a11y/alt-text */
import dashCal from '../../../src/assets/images/dashCal.svg';
import arrow1 from '../../assets/images/arrow1.svg';
import upGraph from '../../../src/assets/images/upGraph2.svg';
import chart from '../../../src/assets/images/chart.svg';
import dc from '../../../src/assets/images/dc.svg';
import DashboardImg from '../../assets/images/Dashboard.jpg';
import dashMain from '../../../src/assets/images/dashboardMain.svg';
import arrowLong from '../../assets/images/arrowLong.png';

import GoalSetModal from './goalSetModal';
import info_3dot_icon from '../../assets/images/info_3dot_icon.svg';
import month from '../../assets/images/month.svg';
import uparrow_icon_grey from '../../assets/images/uparrow_icon_grey.svg';
//import arrowLong from "../../assets/images/arrowLong.svg";
import filter from '../../assets/images/filter.svg';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actionTypes from '../../actions/types';
import {Link} from 'react-router-dom';
import DashboardControls from './DashboardControl';
import DashboardFooter from '../shared/FooterDashboard';
import Dash1 from '../../../src/assets/images/dash1.svg';
import calDash from '../../../src/assets/images/calDash.svg';
import contactDash from '../../../src/assets/images/contactDash.svg';
import Dragable from '../../../src/assets/images/dragable.svg';
import arrowDown from '../../../src/assets/images/arrowDown.svg';
import appDash from '../../../src/assets/images/appDash.svg';
import expandDashboard from '../../../src/assets/images/expandDashboard.svg';
import editings from '../../../src/assets/images/editings.svg';
import profits from '../../../src/assets/images/profits.svg';
import loss from '../../../src/assets/images/loss.svg';
import rights from '../../../src/assets/images/rights.svg';
import {DashboardServices} from '../../services/dashboard/DashboardServices';
import moment from 'moment';
// import GoalSetModal from "./goalSetModal";
import DashboardImg2 from '../../assets/images/Dashboard.png';
import Loader from '../shared/Loader';

const Dashboard = () => {
	const dispatch = useDispatch();

	const [months, setMonths] = useState(moment.months());

	const [mRRGInfo, setMRRGData] = useState({
		current_month_revenue: 0,
		current_month_projected: 0,
		last_month_revenue: 0,
	});

	const [appointmentsScheduledInfo, setAppointments] = useState({
		total_appointments: 100,
		from_date: '2022-01-01',
		to_date: '2022-06-27',
	});

	const [additionalRevenueInfo, setAdditionalRevenueInfo] = useState({
		current_month_additional_revenue: '0.00',
		current_month_revenue_growth_percentage: '0.00',
		current_month_revenue_status: false,
		current_month: 'Jan',
		current_year: '2022',
		previous_month: 'Dec',
		previous_year: '2021',
		from_date: '2021-12-01',
		to_date: '2022-01-31',
		previous_month_additional_revenue: '0.00',
	});

	const [appointmentsShowedInfo, setAppointmentsShowed] = useState({
		total_appointments: 0,
		month: 'Jun',
		year: '2022',
		from_date: '2022-06-01',
		to_date: '2022-06-30',
		goal: null,
		progress: {
			status: 'down',
			value: 0,
			percentage: 0,
		},
	});

	const [appointmentsCancelledInfo, setAppointmentsCancelled] = useState({
		total_appointments: 0,
		month: 'Jun',
		year: '2022',
		from_date: '2022-06-01',
		to_date: '2022-06-30',
	});

	const [newContactsInfo, setNewContacts] = useState({
		total_new_contacts: 0,
		from_date: '2022-05-10',
		to_date: '2022-06-29',
	});

	const [retentionInfo, setRetentionData] = useState({
		total_retained: '0%',
		retention_percentage: '0',
		retention_ratio: '0.00',
		n1: '0',
		n2: '0',
		from_date: '2022-03-09',
		to_date: '2022-07-07',
	});
	let defaultCustomizations = [
		{
			name: 'Monthly Recurring Revenue Growth',
			shouldDisplay: true,
			widgetFunc(index, widget) {
				return (
					<div
						className={
							widget.isMRRGLoading
								? 'individualWidgwet emptyvalue'
								: 'individualWidgwet'
						}>
						<div className='widhetInfoWraper'>
							<div className='widgetIcon'>
								<figure className='dashFig'>
									{/* <img src={Dash1} /> */}

									<svg
										width='25'
										height='24'
										viewBox='0 0 25 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M22.5 3H2.5C1.83696 3 1.20107 3.26339 0.732233 3.73223C0.263392 4.20107 0 4.83696 0 5.5V16.5C0 16.8315 0.131696 17.1495 0.366116 17.3839C0.600537 17.6183 0.918479 17.75 1.25 17.75C1.58152 17.75 1.89946 17.6183 2.13388 17.3839C2.3683 17.1495 2.5 16.8315 2.5 16.5V5.5H22.5V21.5H4.2625L8.75 17.0125L10.3625 18.6375C10.4787 18.7547 10.617 18.8477 10.7693 18.9111C10.9216 18.9746 11.085 19.0072 11.25 19.0072C11.415 19.0072 11.5784 18.9746 11.7307 18.9111C11.883 18.8477 12.0213 18.7547 12.1375 18.6375L17.5 12.2625V14.25C17.5 14.5815 17.6317 14.8995 17.8661 15.1339C18.1005 15.3683 18.4185 15.5 18.75 15.5C19.0815 15.5 19.3995 15.3683 19.6339 15.1339C19.8683 14.8995 20 14.5815 20 14.25V9.25C19.998 9.08665 19.9641 8.92528 19.9 8.775C19.7732 8.46956 19.5304 8.22684 19.225 8.1C19.0747 8.03595 18.9133 8.00198 18.75 8H13.75C13.4185 8 13.1005 8.1317 12.8661 8.36612C12.6317 8.60054 12.5 8.91848 12.5 9.25C12.5 9.58152 12.6317 9.89946 12.8661 10.1339C13.1005 10.3683 13.4185 10.5 13.75 10.5H15.7375L11.25 15.9875L9.6375 14.3625C9.5213 14.2453 9.38304 14.1523 9.23072 14.0889C9.0784 14.0254 8.91502 13.9928 8.75 13.9928C8.58498 13.9928 8.4216 14.0254 8.26928 14.0889C8.11696 14.1523 7.9787 14.2453 7.8625 14.3625L0.3625 21.8625C0.248699 21.9814 0.159493 22.1216 0.0999999 22.275C-0.0250226 22.5793 -0.0250226 22.9207 0.0999999 23.225C0.226844 23.5304 0.469563 23.7732 0.775 23.9C0.925278 23.9641 1.08665 23.998 1.25 24H22.5C23.163 24 23.7989 23.7366 24.2678 23.2678C24.7366 22.7989 25 22.163 25 21.5V5.5C25 4.83696 24.7366 4.20107 24.2678 3.73223C23.7989 3.26339 23.163 3 22.5 3Z'
											fill='#5182A6'
										/>
										<path
											d='M5.5 4V5.5H8.5V4H5.5ZM8.5 2C8.5 1.17157 7.82843 0.5 7 0.5C6.17157 0.5 5.5 1.17157 5.5 2H8.5ZM8.5 4V2H5.5V4H8.5Z'
											fill='#5182A6'
										/>
										<path
											d='M16.5 3V4.5H19.5V3H16.5ZM19.5 2C19.5 1.17157 18.8284 0.5 18 0.5C17.1716 0.5 16.5 1.17157 16.5 2H19.5ZM19.5 3V2H16.5V3H19.5Z'
											fill='#5182A6'
										/>
									</svg>

									<span></span>
								</figure>
								<h3 className='firstChild'>Monthly Recurring Revenue Growth</h3>
								<h3 className='secondChild'></h3>
								<span className='emptyheadingName'></span>
								<span class='emptyLoading topDashboardSelector'></span>
								{/* <span className='editSpansDashboard'>
									<img src={editings} className='editings' />
								</span>
								<figure>
									<img src={Dragable} className='dragable' />
								</figure> */}
							</div>
							<div className='formField w-100 dashboardWidgets formControl'>
								{selectMonthDropdown('Monthly Recurring Revenue Growth', index)}
								<select
									style={{
										backgroundImage: 'url(' + arrowDown + ')',
										marginLeft: 0,
										marginTop: 0,
										width: '70px',
										paddingLeft: '0px',
									}}>
									<option value=''>2022</option>
								</select>
							</div>

							<div className='currentPreviousState'>
								<div className='previousRevenueWraper currentStatus'>
									<figure className='statusFigure'>
										<img src={upGraph} alt='' />
										<span></span>
									</figure>
									<div className='previousRevenueInfo'>
										<h4 className='firstChild'>
											${widget.mRRGInfo.current_month_revenue}
										</h4>
										<h4 className='secondChild'></h4>
										<p className='firstChild'>Current month revenue</p>
										<p className='secondChild'></p>
									</div>
								</div>
								<div className='previousRevenueWraper previousStatus'>
									<div className='previousRevenueInfo'>
										<h4 className='firstChild'>
											${widget.mRRGInfo.current_month_projected}
										</h4>
										<h4 className='secondChild'></h4>
										<p className='firstChild'>Projected Amount</p>
										<p className='secondChild'></p>
									</div>
								</div>
							</div>

							<div className='previousRevenueWraper secondRow'>
								<div className='previousRevenueInfo'>
									<h4 className='firstChild'>
										${widget.mRRGInfo?.previous_month_revenue || 0}
									</h4>
									<h4 className='secondChild'></h4>
									<p>
										Projected Value -{''}
										<span className='monthInformations'>
											{widget.mRRGInfo?.previous_month},{' '}
											{widget.mRRGInfo.previous_year}
										</span>
									</p>
									<span class='emptyLoading secondP'></span>
								</div>
							</div>
						</div>
					</div>
				);
			},
			defaultSelectedMonth: months[moment().month()],
			isOrganizationOwner: true,
		},
		{
			name: 'Additional Revenue',
			shouldDisplay: true,
			isOrganizationOwner: true,
			defaultSelectedMonth: months[moment().month()],
			widgetFunc(index, widget) {
				return (
					<div
						className={
							widget.isARloading
								? 'individualWidgwet emptyvalue'
								: 'individualWidgwet'
						}>
						<div className='widhetInfoWraper'>
							<div className='widgetIcon'>
								<figure className='dashFig'>
									{/* <img src={Dash1} /> */}
									<svg
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M23.025 22.33H1.39V0.695C1.39 0.510675 1.31678 0.333899 1.18644 0.203561C1.0561 0.073223 0.879325 0 0.695 0C0.510675 0 0.333899 0.073223 0.203561 0.203561C0.073223 0.333899 0 0.510675 0 0.695L0 23.025C0.0013091 23.2089 0.0749524 23.3849 0.205008 23.515C0.335063 23.645 0.511079 23.7187 0.695 23.72H23.025C23.2093 23.72 23.3861 23.6468 23.5164 23.5164C23.6468 23.3861 23.72 23.2093 23.72 23.025C23.72 22.8407 23.6468 22.6639 23.5164 22.5336C23.3861 22.4032 23.2093 22.33 23.025 22.33Z'
											fill='#305671'
										/>
										<path
											d='M3.47527 15.288C3.29135 15.2893 3.11533 15.363 2.98528 15.493C2.85522 15.6231 2.78158 15.7991 2.78027 15.983V20.245C2.78158 20.4289 2.85522 20.6049 2.98528 20.735C3.11533 20.865 3.29135 20.9387 3.47527 20.94H6.30127C6.48519 20.9387 6.66121 20.865 6.79127 20.735C6.92132 20.6049 6.99497 20.4289 6.99628 20.245V15.983C6.99497 15.7991 6.92132 15.6231 6.79127 15.493C6.66121 15.363 6.48519 15.2893 6.30127 15.288H3.47527ZM5.60627 19.55H4.17027V16.678H5.60627V19.55Z'
											fill='#305671'
										/>
										<path
											d='M9.07977 12.509C8.89585 12.5103 8.71982 12.584 8.58977 12.714C8.45971 12.8441 8.38607 13.0201 8.38477 13.204V20.246C8.38607 20.4299 8.45971 20.6059 8.58977 20.736C8.71982 20.866 8.89585 20.9397 9.07977 20.941H11.8598C12.0437 20.9397 12.2197 20.866 12.3498 20.736C12.4798 20.6059 12.5535 20.4299 12.5548 20.246V13.204C12.5535 13.0201 12.4798 12.8441 12.3498 12.714C12.2197 12.584 12.0437 12.5103 11.8598 12.509H9.07977ZM11.1648 19.551H9.77477V13.899H11.1648V19.551Z'
											fill='#305671'
										/>
										<path
											d='M14.6403 9.729C14.4564 9.73031 14.2804 9.80395 14.1503 9.93401C14.0203 10.0641 13.9466 10.2401 13.9453 10.424V20.246C13.9466 20.4299 14.0203 20.6059 14.1503 20.736C14.2804 20.866 14.4564 20.9397 14.6403 20.941H17.4203C17.6042 20.9397 17.7803 20.866 17.9103 20.736C18.0404 20.6059 18.114 20.4299 18.1153 20.246V10.424C18.114 10.2401 18.0404 10.0641 17.9103 9.93401C17.7803 9.80395 17.6042 9.73031 17.4203 9.729H14.6403ZM16.7253 19.551H15.3353V11.119H16.7253V19.551Z'
											fill='#305671'
										/>
										<path
											d='M23.0249 6.94901H20.1989C20.015 6.95031 19.839 7.02395 19.7089 7.15401C19.5789 7.28406 19.5052 7.46009 19.5039 7.64401V20.244C19.5052 20.4279 19.5789 20.6039 19.7089 20.734C19.839 20.864 20.015 20.9377 20.1989 20.939H23.0249C23.2088 20.9377 23.3848 20.864 23.5149 20.734C23.6449 20.6039 23.7186 20.4279 23.7199 20.244V7.64401C23.7186 7.46009 23.6449 7.28406 23.5149 7.15401C23.3848 7.02395 23.2088 6.95031 23.0249 6.94901ZM22.3299 19.549H20.8939V8.339H22.3299V19.549Z'
											fill='#305671'
										/>
										<path
											d='M19.8883 5.49001C20.0533 5.57094 20.2436 5.58369 20.418 5.5255C20.5924 5.46731 20.7369 5.34285 20.8202 5.17902L22.2102 2.39902C22.2639 2.29299 22.2896 2.17495 22.2846 2.0562C22.2797 1.93745 22.2444 1.82195 22.1821 1.72073C22.1198 1.61952 22.0326 1.53596 21.9288 1.47806C21.825 1.42016 21.7081 1.38985 21.5892 1.39002H18.1142C17.9299 1.39002 17.7531 1.46324 17.6228 1.59358C17.4925 1.72391 17.4192 1.90069 17.4192 2.08502C17.4192 2.26934 17.4925 2.44612 17.6228 2.57645C17.7531 2.70679 17.9299 2.78001 18.1142 2.78001H18.8262L3.14625 11.202C3.06375 11.244 2.99048 11.3021 2.93073 11.3728C2.87099 11.4435 2.82597 11.5254 2.79832 11.6138C2.77067 11.7021 2.76095 11.7951 2.76973 11.8873C2.77851 11.9794 2.80562 12.0689 2.84945 12.1504C2.89328 12.232 2.95296 12.3039 3.02499 12.3621C3.09701 12.4202 3.17993 12.4634 3.26887 12.4891C3.35781 12.5148 3.45099 12.5224 3.54292 12.5116C3.63486 12.5007 3.72371 12.4717 3.80425 12.426L19.9832 3.73402L19.5732 4.55402C19.4914 4.71998 19.4785 4.91163 19.5375 5.08703C19.5966 5.26244 19.7227 5.40733 19.8883 5.49001Z'
											fill='#305671'
										/>
									</svg>

									<span></span>
								</figure>
								<h3 className='firstChild'>Additional Revenue</h3>
								<h3 className='secondChild'></h3>
								<span className='emptyheadingName'></span>
								<span class='emptyLoading topDashboardSelector'></span>
								{/* <span className='editSpansDashboard'>
									<img src={editings} className='editings' />
								</span>
								<figure>
									<img src={Dragable} className='dragable' />
								</figure> */}
							</div>
							<div className='formField w-100 dashboardWidgets formControl'>
								{selectMonthDropdown('Additional Revenue', index)}

								<select
									style={{
										backgroundImage: 'url(' + arrowDown + ')',
										marginLeft: 0,
										marginTop: 0,
										width: '70px',
										paddingLeft: '0px',
									}}>
									<option value=''>2022</option>
								</select>
							</div>

							<div className='previousRevenueWraper'>
								<figure className='statusFigure'>
									<img src={upGraph} />
									<span></span>
								</figure>
								<div className='previousRevenueInfo'>
									<h4 className='firstChild'>
										$
										{
											widget.additionalRevenueInfo
												.current_month_additional_revenue
										}
									</h4>
									<h4 className='secondChild'></h4>
									<p className='firstChild'>Collected Amount</p>
									<p className='secondChild'></p>
									<span
										className={
											widget.additionalRevenueInfo
												.current_month_revenue_status == false
												? 'previousonth '
												: widget.additionalRevenueInfo
														.current_month_revenue_status == 'up'
												? 'previousMonth firstChild profits'
												: 'previousMonth firstChild loss'
										}>
										{widget.additionalRevenueInfo
											.current_month_revenue_status == false
											? ''
											: widget.additionalRevenueInfo
													.current_month_revenue_growth_percentage + '%'}{' '}
										<img
											src={
												widget.additionalRevenueInfo
													.current_month_revenue_status == false
													? ''
													: widget.additionalRevenueInfo
															.current_month_revenue_status == 'up'
													? profits
													: loss
											}
											alt=''
										/>
									</span>
									<span className='secondChild'></span>
								</div>
							</div>

							<div className='previousRevenueWraper secondRow'>
								<div className='previousRevenueInfo'>
									<h4 className='firstChild'>
										$
										{
											widget.additionalRevenueInfo
												.previous_month_additional_revenue
										}
									</h4>
									<h4 className='secondChild'></h4>

									<p className='firstChild'>
										Projected Value -{' '}
										<span className='monthInformations'>
											{widget.additionalRevenueInfo.previous_month},{' '}
											{widget.additionalRevenueInfo.previous_year}
										</span>
									</p>
									<p className='secondChild'></p>
								</div>
							</div>
						</div>
					</div>
				);
			},
		},
		{
			name: 'Appointments Cancelled',
			shouldDisplay: true,
			isOrganizationOwner: false,
			defaultSelectedMonth: months[moment().month()],
			widgetFunc(index, widget) {
				return (
					<div
						className={
							widget.isACloading
								? 'individualWidgwet emptyvalue'
								: 'individualWidgwet'
						}>
						<div className='widhetInfoWraper'>
							<div className='widgetIcon'>
								<figure className='dashFig'>
									<svg
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M18.1901 10.628C18.7546 10.628 19.2123 10.2618 19.2123 9.81011C19.2123 9.35838 18.7546 8.99219 18.1901 8.99219C17.6256 8.99219 17.168 9.35838 17.168 9.81011C17.168 10.2618 17.6256 10.628 18.1901 10.628Z'
											fill='#5182A6'
										/>
										<path
											d='M20.2488 1.87661H19.0294V0.938556C19.0294 0.689901 18.9306 0.45143 18.7548 0.275605C18.579 0.099779 18.3405 0.00100113 18.0919 0.00100113C17.8432 0.00100113 17.6047 0.099779 17.4289 0.275605C17.2531 0.45143 17.1543 0.689901 17.1543 0.938556V1.87561H12.8895V0.938556C12.8895 0.689635 12.7906 0.45091 12.6146 0.274897C12.4386 0.0988833 12.1999 0 11.9509 0C11.702 0 11.4633 0.0988833 11.2873 0.274897C11.1113 0.45091 11.0124 0.689635 11.0124 0.938556V1.87561H6.79665V0.938556C6.79665 0.689901 6.69787 0.45143 6.52204 0.275605C6.34622 0.099779 6.10775 0.00100113 5.85909 0.00100113C5.61044 0.00100113 5.37197 0.099779 5.19614 0.275605C5.02031 0.45143 4.92154 0.689901 4.92154 0.938556V1.87561H3.74922C2.7551 1.87694 1.80209 2.2725 1.09923 2.97555C0.396374 3.67859 0.00105951 4.63171 0 5.62583L0 20.2503C0.00132438 21.2442 0.396755 22.1971 1.09958 22.8999C1.80241 23.6027 2.75527 23.9982 3.74922 23.9995H10.9203C11.1689 23.9995 11.4074 23.9007 11.5832 23.7249C11.7591 23.5491 11.8578 23.3106 11.8578 23.0619C11.8578 22.8133 11.7591 22.5748 11.5832 22.399C11.4074 22.2232 11.1689 22.1244 10.9203 22.1244H3.74922C3.25207 22.1239 2.77544 21.9261 2.4239 21.5746C2.07236 21.2231 1.87464 20.7464 1.87411 20.2493V5.62583C1.87464 5.12868 2.07236 4.65205 2.4239 4.30051C2.77544 3.94898 3.25207 3.75125 3.74922 3.75072H4.92054V4.68777C4.92054 4.93643 5.01931 5.1749 5.19514 5.35073C5.37096 5.52655 5.60944 5.62533 5.85809 5.62533C6.10675 5.62533 6.34522 5.52655 6.52104 5.35073C6.69687 5.1749 6.79565 4.93643 6.79565 4.68777V3.75072H11.0124V4.68777C11.0124 4.93643 11.1112 5.1749 11.287 5.35073C11.4628 5.52655 11.7013 5.62533 11.9499 5.62533C12.1986 5.62533 12.4371 5.52655 12.6129 5.35073C12.7887 5.1749 12.8875 4.93643 12.8875 4.68777V3.75072H17.1533V4.68777C17.1533 4.93643 17.2521 5.1749 17.4279 5.35073C17.6037 5.52655 17.8422 5.62533 18.0909 5.62533C18.3395 5.62533 18.578 5.52655 18.7538 5.35073C18.9296 5.1749 19.0284 4.93643 19.0284 4.68777V3.75072H20.2468C20.7444 3.75045 21.2218 3.94783 21.574 4.29945C21.9262 4.65107 22.1244 5.12816 22.1249 5.62583V10.9688C22.1249 11.2175 22.2237 11.456 22.3995 11.6318C22.5753 11.8076 22.8138 11.9064 23.0624 11.9064C23.3111 11.9064 23.5496 11.8076 23.7254 11.6318C23.9012 11.456 24 11.2175 24 10.9688V5.62583C23.9987 4.63154 23.603 3.67837 22.8997 2.97549C22.1964 2.2726 21.2431 1.87741 20.2488 1.87661Z'
											fill='#5182A6'
										/>
										<path
											d='M14.1022 10.628C14.6667 10.628 15.1244 10.2618 15.1244 9.81011C15.1244 9.35838 14.6667 8.99219 14.1022 8.99219C13.5377 8.99219 13.0801 9.35838 13.0801 9.81011C13.0801 10.2618 13.5377 10.628 14.1022 10.628Z'
											fill='#5182A6'
										/>
										<path
											d='M10.0143 14.7179C10.5789 14.7179 11.0365 14.3517 11.0365 13.9C11.0365 13.4482 10.5789 13.082 10.0143 13.082C9.44982 13.082 8.99219 13.4482 8.99219 13.9C8.99219 14.3517 9.44982 14.7179 10.0143 14.7179Z'
											fill='#5182A6'
										/>
										<path
											d='M5.92645 10.628C6.49096 10.628 6.9486 10.2618 6.9486 9.81011C6.9486 9.35838 6.49096 8.99219 5.92645 8.99219C5.36193 8.99219 4.9043 9.35838 4.9043 9.81011C4.9043 10.2618 5.36193 10.628 5.92645 10.628Z'
											fill='#5182A6'
										/>
										<path
											d='M5.92645 14.7179C6.49096 14.7179 6.9486 14.3517 6.9486 13.9C6.9486 13.4482 6.49096 13.082 5.92645 13.082C5.36193 13.082 4.9043 13.4482 4.9043 13.9C4.9043 14.3517 5.36193 14.7179 5.92645 14.7179Z'
											fill='#5182A6'
										/>
										<path
											d='M5.92645 18.8038C6.49096 18.8038 6.9486 18.4376 6.9486 17.9859C6.9486 17.5342 6.49096 17.168 5.92645 17.168C5.36193 17.168 4.9043 17.5342 4.9043 17.9859C4.9043 18.4376 5.36193 18.8038 5.92645 18.8038Z'
											fill='#5182A6'
										/>
										<path
											d='M10.0143 18.8038C10.5789 18.8038 11.0365 18.4376 11.0365 17.9859C11.0365 17.5342 10.5789 17.168 10.0143 17.168C9.44982 17.168 8.99219 17.5342 8.99219 17.9859C8.99219 18.4376 9.44982 18.8038 10.0143 18.8038Z'
											fill='#5182A6'
										/>
										<path
											d='M10.0143 10.628C10.5789 10.628 11.0365 10.2618 11.0365 9.81011C11.0365 9.35838 10.5789 8.99219 10.0143 8.99219C9.44982 8.99219 8.99219 9.35838 8.99219 9.81011C8.99219 10.2618 9.44982 10.628 10.0143 10.628Z'
											fill='#5182A6'
										/>
										<path
											d='M16 16L19.5 19.5M19.5 19.5L23 23M19.5 19.5L23 16M19.5 19.5L16 23'
											stroke='#5182A6'
											stroke-width='2'
											stroke-linecap='round'
											stroke-linejoin='round'
										/>
									</svg>
									<span></span>
								</figure>
								<h3 className='firstChild'>Appointments Cancelled </h3>
								<h3 className='secondChild'></h3>
								{/* <span className='editSpansDashboard'>
									<img src={editings} className='editings' />
								</span>
								<figure>
									<img src={Dragable} className='dragable' />
								</figure> */}
							</div>
							<div className='formField w-100 dashboardWidgets formControl'>
								{selectMonthDropdown('Appointments Cancelled', index)}
								<select
									style={{
										backgroundImage: 'url(' + arrowDown + ')',
										marginLeft: 0,
										marginTop: 0,
										width: '70px',
										paddingLeft: '0px',
									}}>
									<option value=''>2022</option>
								</select>
							</div>

							<div className='previousRevenueWraper'>
								<figure className='statusFigure'>
									<img src={appDash} />
									<span></span>
								</figure>
								<div className='previousRevenueInfo'>
									<h4 className='firstChild'>
										{widget.appointmentsCancelledInfo.total_appointments}
									</h4>
									<h4 className='secondChild'></h4>
									<p className='firstChild'>Appointments Cancelled </p>
									<p className='secondChild'></p>
								</div>
							</div>
						</div>
					</div>
				);
			},
		},
		{
			name: 'Appointments Scheduled',
			shouldDisplay: true,
			isOrganizationOwner: false,
			defaultSelectedMonth: months[moment().month()],
			widgetFunc(i, widget) {
				return (
					<div
						className={
							widget.isASLoading
								? 'individualWidgwet emptyvalue'
								: 'individualWidgwet'
						}>
						<div className='widhetInfoWraper'>
							<div className='widgetIcon'>
								<figure className='dashFig'>
									<svg
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M18.1901 10.628C18.7546 10.628 19.2123 10.2618 19.2123 9.81011C19.2123 9.35838 18.7546 8.99219 18.1901 8.99219C17.6256 8.99219 17.168 9.35838 17.168 9.81011C17.168 10.2618 17.6256 10.628 18.1901 10.628Z'
											fill='#5182A6'
										/>
										<path
											d='M20.2488 1.87661H19.0294V0.938556C19.0294 0.689901 18.9306 0.45143 18.7548 0.275605C18.579 0.099779 18.3405 0.00100113 18.0919 0.00100113C17.8432 0.00100113 17.6047 0.099779 17.4289 0.275605C17.2531 0.45143 17.1543 0.689901 17.1543 0.938556V1.87561H12.8895V0.938556C12.8895 0.689635 12.7906 0.45091 12.6146 0.274897C12.4386 0.0988833 12.1999 0 11.9509 0C11.702 0 11.4633 0.0988833 11.2873 0.274897C11.1113 0.45091 11.0124 0.689635 11.0124 0.938556V1.87561H6.79665V0.938556C6.79665 0.689901 6.69787 0.45143 6.52204 0.275605C6.34622 0.099779 6.10775 0.00100113 5.85909 0.00100113C5.61044 0.00100113 5.37197 0.099779 5.19614 0.275605C5.02031 0.45143 4.92154 0.689901 4.92154 0.938556V1.87561H3.74922C2.7551 1.87694 1.80209 2.2725 1.09923 2.97555C0.396374 3.67859 0.00105951 4.63171 0 5.62583L0 20.2503C0.00132438 21.2442 0.396755 22.1971 1.09958 22.8999C1.80241 23.6027 2.75527 23.9982 3.74922 23.9995H10.9203C11.1689 23.9995 11.4074 23.9007 11.5832 23.7249C11.7591 23.5491 11.8578 23.3106 11.8578 23.0619C11.8578 22.8133 11.7591 22.5748 11.5832 22.399C11.4074 22.2232 11.1689 22.1244 10.9203 22.1244H3.74922C3.25207 22.1239 2.77544 21.9261 2.4239 21.5746C2.07236 21.2231 1.87464 20.7464 1.87411 20.2493V5.62583C1.87464 5.12868 2.07236 4.65205 2.4239 4.30051C2.77544 3.94898 3.25207 3.75125 3.74922 3.75072H4.92054V4.68777C4.92054 4.93643 5.01931 5.1749 5.19514 5.35073C5.37096 5.52655 5.60944 5.62533 5.85809 5.62533C6.10675 5.62533 6.34522 5.52655 6.52104 5.35073C6.69687 5.1749 6.79565 4.93643 6.79565 4.68777V3.75072H11.0124V4.68777C11.0124 4.93643 11.1112 5.1749 11.287 5.35073C11.4628 5.52655 11.7013 5.62533 11.9499 5.62533C12.1986 5.62533 12.4371 5.52655 12.6129 5.35073C12.7887 5.1749 12.8875 4.93643 12.8875 4.68777V3.75072H17.1533V4.68777C17.1533 4.93643 17.2521 5.1749 17.4279 5.35073C17.6037 5.52655 17.8422 5.62533 18.0909 5.62533C18.3395 5.62533 18.578 5.52655 18.7538 5.35073C18.9296 5.1749 19.0284 4.93643 19.0284 4.68777V3.75072H20.2468C20.7444 3.75045 21.2218 3.94783 21.574 4.29945C21.9262 4.65107 22.1244 5.12816 22.1249 5.62583V10.9688C22.1249 11.2175 22.2237 11.456 22.3995 11.6318C22.5753 11.8076 22.8138 11.9064 23.0624 11.9064C23.3111 11.9064 23.5496 11.8076 23.7254 11.6318C23.9012 11.456 24 11.2175 24 10.9688V5.62583C23.9987 4.63154 23.603 3.67837 22.8997 2.97549C22.1964 2.2726 21.2431 1.87741 20.2488 1.87661Z'
											fill='#5182A6'
										/>
										<path
											d='M18.3276 12.6562C17.2059 12.6562 16.1094 12.9889 15.1768 13.612C14.2441 14.2352 13.5172 15.121 13.088 16.1573C12.6587 17.1936 12.5464 18.3339 12.7652 19.434C12.9841 20.5342 13.5242 21.5447 14.3174 22.3379C15.1105 23.131 16.1211 23.6712 17.2212 23.89C18.3213 24.1089 19.4617 23.9966 20.498 23.5673C21.5343 23.138 22.42 22.4111 23.0432 21.4785C23.6664 20.5458 23.999 19.4493 23.999 18.3276C23.9971 16.8241 23.399 15.3826 22.3358 14.3194C21.2727 13.2562 19.8312 12.6581 18.3276 12.6562ZM18.3276 22.1239C17.5768 22.1239 16.8428 21.9013 16.2185 21.4841C15.5943 21.067 15.1077 20.4741 14.8203 19.7804C14.533 19.0867 14.4578 18.3234 14.6043 17.587C14.7508 16.8506 15.1123 16.1742 15.6433 15.6433C16.1742 15.1123 16.8506 14.7508 17.587 14.6043C18.3234 14.4578 19.0867 14.533 19.7804 14.8203C20.4741 15.1077 21.067 15.5943 21.4841 16.2185C21.9013 16.8428 22.1239 17.5768 22.1239 18.3276C22.1218 19.3338 21.7212 20.2982 21.0097 21.0097C20.2982 21.7212 19.3338 22.1218 18.3276 22.1239Z'
											fill='#5182A6'
										/>
										<path
											d='M19.6872 17.3904H19.2657V16.4063C19.2657 16.1577 19.1669 15.9192 18.9911 15.7434C18.8153 15.5675 18.5768 15.4688 18.3282 15.4688C18.0795 15.4688 17.8411 15.5675 17.6652 15.7434C17.4894 15.9192 17.3906 16.1577 17.3906 16.4063V18.3285C17.3906 18.577 17.4893 18.8154 17.6651 18.9911C17.8408 19.1668 18.0792 19.2655 18.3277 19.2655H19.6872C19.9359 19.2655 20.1743 19.1668 20.3502 18.9909C20.526 18.8151 20.6248 18.5766 20.6248 18.328C20.6248 18.0793 20.526 17.8409 20.3502 17.665C20.1743 17.4892 19.9359 17.3904 19.6872 17.3904Z'
											fill='#5182A6'
										/>
										<path
											d='M14.1022 10.628C14.6667 10.628 15.1244 10.2618 15.1244 9.81011C15.1244 9.35838 14.6667 8.99219 14.1022 8.99219C13.5377 8.99219 13.0801 9.35838 13.0801 9.81011C13.0801 10.2618 13.5377 10.628 14.1022 10.628Z'
											fill='#5182A6'
										/>
										<path
											d='M10.0143 14.7179C10.5789 14.7179 11.0365 14.3517 11.0365 13.9C11.0365 13.4482 10.5789 13.082 10.0143 13.082C9.44982 13.082 8.99219 13.4482 8.99219 13.9C8.99219 14.3517 9.44982 14.7179 10.0143 14.7179Z'
											fill='#5182A6'
										/>
										<path
											d='M5.92645 10.628C6.49096 10.628 6.9486 10.2618 6.9486 9.81011C6.9486 9.35838 6.49096 8.99219 5.92645 8.99219C5.36193 8.99219 4.9043 9.35838 4.9043 9.81011C4.9043 10.2618 5.36193 10.628 5.92645 10.628Z'
											fill='#5182A6'
										/>
										<path
											d='M5.92645 14.7179C6.49096 14.7179 6.9486 14.3517 6.9486 13.9C6.9486 13.4482 6.49096 13.082 5.92645 13.082C5.36193 13.082 4.9043 13.4482 4.9043 13.9C4.9043 14.3517 5.36193 14.7179 5.92645 14.7179Z'
											fill='#5182A6'
										/>
										<path
											d='M5.92645 18.8038C6.49096 18.8038 6.9486 18.4376 6.9486 17.9859C6.9486 17.5342 6.49096 17.168 5.92645 17.168C5.36193 17.168 4.9043 17.5342 4.9043 17.9859C4.9043 18.4376 5.36193 18.8038 5.92645 18.8038Z'
											fill='#5182A6'
										/>
										<path
											d='M10.0143 18.8038C10.5789 18.8038 11.0365 18.4376 11.0365 17.9859C11.0365 17.5342 10.5789 17.168 10.0143 17.168C9.44982 17.168 8.99219 17.5342 8.99219 17.9859C8.99219 18.4376 9.44982 18.8038 10.0143 18.8038Z'
											fill='#5182A6'
										/>
										<path
											d='M10.0143 10.628C10.5789 10.628 11.0365 10.2618 11.0365 9.81011C11.0365 9.35838 10.5789 8.99219 10.0143 8.99219C9.44982 8.99219 8.99219 9.35838 8.99219 9.81011C8.99219 10.2618 9.44982 10.628 10.0143 10.628Z'
											fill='#5182A6'
										/>
									</svg>

									<span></span>
								</figure>
								<h3 className='firstChild'>Appointments Scheduled</h3>
								<h3 className='secondChild'></h3>
								{/* <span className='editSpansDashboard'>
									<img src={editings} className='editings' />
								</span>
								<figure>
									<img src={Dragable} className='dragable' />
								</figure> */}
							</div>
							<div className='formField w-100 dashboardWidgets formControl'>
								<select
									onChange={(e) => onDayChange(e.target, 'AS')}
									style={{
										backgroundImage: 'url(' + arrowDown + ')',
										marginTop: 0,
										width: '125px',
									}}>
									<option value='0'>Today</option>
									<option value='1'>Yesterday</option>
									<option value='7'>Last 7 Days</option>
									<option value='15'>Last 15 Days</option>
									<option value='30'>Last 30 Days</option>
									<option value='45'>Last 45 Days</option>
									<option value='90'>Last 90 Days</option>
								</select>
							</div>

							<div className='previousRevenueWraper'>
								<figure className='statusFigure'>
									<img src={appDash} />
									<span></span>
								</figure>
								<div className='previousRevenueInfo'>
									<h4 className='firstChild'>
										{widget.appointmentsScheduled.total_appointments}
									</h4>
									<h4 className='secondChild'></h4>
									<p className='firstChild'>Appointments Scheduled </p>
									<p className='secondChild'></p>
								</div>
							</div>

							{/* <div className='previousRevenueWraper secondRow'>
								<Link>
									View all 32 Appointments <img src={rights} alt='' />{' '}
								</Link>
							</div> */}
						</div>
					</div>
				);
			},
		},
		{
			name: 'Appointments Showed',
			shouldDisplay: true,
			defaultSelectedMonth: months[moment().month()],
			isOrganizationOwner: false,
			widgetFunc(index, widget) {
				return (
					// toogle the emptyValue class
					<div
						className={
							widget.isAShowedLoading
								? 'individualWidgwet emptyvalue'
								: 'individualWidgwet'
						}>
						{/* toogle the emptyValue class */}
						<div className='widhetInfoWraper'>
							<div className='widgetIcon'>
								<figure className='dashFig'>
									<svg
										width='25'
										height='25'
										viewBox='0 0 25 25'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M18.1901 10.628C18.7546 10.628 19.2123 10.2618 19.2123 9.81011C19.2123 9.35838 18.7546 8.99219 18.1901 8.99219C17.6256 8.99219 17.168 9.35838 17.168 9.81011C17.168 10.2618 17.6256 10.628 18.1901 10.628Z'
											fill='#5182A6'
										/>
										<path
											d='M20.2488 1.87661H19.0294V0.938556C19.0294 0.689901 18.9306 0.45143 18.7548 0.275605C18.579 0.099779 18.3405 0.00100113 18.0919 0.00100113C17.8432 0.00100113 17.6047 0.099779 17.4289 0.275605C17.2531 0.45143 17.1543 0.689901 17.1543 0.938556V1.87561H12.8895V0.938556C12.8895 0.689635 12.7906 0.45091 12.6146 0.274897C12.4386 0.0988833 12.1999 0 11.9509 0C11.702 0 11.4633 0.0988833 11.2873 0.274897C11.1113 0.45091 11.0124 0.689635 11.0124 0.938556V1.87561H6.79665V0.938556C6.79665 0.689901 6.69787 0.45143 6.52204 0.275605C6.34622 0.099779 6.10775 0.00100113 5.85909 0.00100113C5.61044 0.00100113 5.37197 0.099779 5.19614 0.275605C5.02031 0.45143 4.92154 0.689901 4.92154 0.938556V1.87561H3.74922C2.7551 1.87694 1.80209 2.2725 1.09923 2.97555C0.396374 3.67859 0.00105951 4.63171 0 5.62583L0 20.2503C0.00132438 21.2442 0.396755 22.1971 1.09958 22.8999C1.80241 23.6027 2.75527 23.9982 3.74922 23.9995H10.9203C11.1689 23.9995 11.4074 23.9007 11.5832 23.7249C11.7591 23.5491 11.8578 23.3106 11.8578 23.0619C11.8578 22.8133 11.7591 22.5748 11.5832 22.399C11.4074 22.2232 11.1689 22.1244 10.9203 22.1244H3.74922C3.25207 22.1239 2.77544 21.9261 2.4239 21.5746C2.07236 21.2231 1.87464 20.7464 1.87411 20.2493V5.62583C1.87464 5.12868 2.07236 4.65205 2.4239 4.30051C2.77544 3.94898 3.25207 3.75125 3.74922 3.75072H4.92054V4.68777C4.92054 4.93643 5.01931 5.1749 5.19514 5.35073C5.37096 5.52655 5.60944 5.62533 5.85809 5.62533C6.10675 5.62533 6.34522 5.52655 6.52104 5.35073C6.69687 5.1749 6.79565 4.93643 6.79565 4.68777V3.75072H11.0124V4.68777C11.0124 4.93643 11.1112 5.1749 11.287 5.35073C11.4628 5.52655 11.7013 5.62533 11.9499 5.62533C12.1986 5.62533 12.4371 5.52655 12.6129 5.35073C12.7887 5.1749 12.8875 4.93643 12.8875 4.68777V3.75072H17.1533V4.68777C17.1533 4.93643 17.2521 5.1749 17.4279 5.35073C17.6037 5.52655 17.8422 5.62533 18.0909 5.62533C18.3395 5.62533 18.578 5.52655 18.7538 5.35073C18.9296 5.1749 19.0284 4.93643 19.0284 4.68777V3.75072H20.2468C20.7444 3.75045 21.2218 3.94783 21.574 4.29945C21.9262 4.65107 22.1244 5.12816 22.1249 5.62583V10.9688C22.1249 11.2175 22.2237 11.456 22.3995 11.6318C22.5753 11.8076 22.8138 11.9064 23.0624 11.9064C23.3111 11.9064 23.5496 11.8076 23.7254 11.6318C23.9012 11.456 24 11.2175 24 10.9688V5.62583C23.9987 4.63154 23.603 3.67837 22.8997 2.97549C22.1964 2.2726 21.2431 1.87741 20.2488 1.87661Z'
											fill='#5182A6'
										/>
										<path
											d='M14.1022 10.628C14.6667 10.628 15.1244 10.2618 15.1244 9.81011C15.1244 9.35838 14.6667 8.99219 14.1022 8.99219C13.5377 8.99219 13.0801 9.35838 13.0801 9.81011C13.0801 10.2618 13.5377 10.628 14.1022 10.628Z'
											fill='#5182A6'
										/>
										<path
											d='M10.0143 14.7179C10.5789 14.7179 11.0365 14.3517 11.0365 13.9C11.0365 13.4482 10.5789 13.082 10.0143 13.082C9.44982 13.082 8.99219 13.4482 8.99219 13.9C8.99219 14.3517 9.44982 14.7179 10.0143 14.7179Z'
											fill='#5182A6'
										/>
										<path
											d='M5.92645 10.628C6.49096 10.628 6.9486 10.2618 6.9486 9.81011C6.9486 9.35838 6.49096 8.99219 5.92645 8.99219C5.36193 8.99219 4.9043 9.35838 4.9043 9.81011C4.9043 10.2618 5.36193 10.628 5.92645 10.628Z'
											fill='#5182A6'
										/>
										<path
											d='M5.92645 14.7179C6.49096 14.7179 6.9486 14.3517 6.9486 13.9C6.9486 13.4482 6.49096 13.082 5.92645 13.082C5.36193 13.082 4.9043 13.4482 4.9043 13.9C4.9043 14.3517 5.36193 14.7179 5.92645 14.7179Z'
											fill='#5182A6'
										/>
										<path
											d='M5.92645 18.8038C6.49096 18.8038 6.9486 18.4376 6.9486 17.9859C6.9486 17.5342 6.49096 17.168 5.92645 17.168C5.36193 17.168 4.9043 17.5342 4.9043 17.9859C4.9043 18.4376 5.36193 18.8038 5.92645 18.8038Z'
											fill='#5182A6'
										/>
										<path
											d='M10.0143 18.8038C10.5789 18.8038 11.0365 18.4376 11.0365 17.9859C11.0365 17.5342 10.5789 17.168 10.0143 17.168C9.44982 17.168 8.99219 17.5342 8.99219 17.9859C8.99219 18.4376 9.44982 18.8038 10.0143 18.8038Z'
											fill='#5182A6'
										/>
										<path
											d='M10.0143 10.628C10.5789 10.628 11.0365 10.2618 11.0365 9.81011C11.0365 9.35838 10.5789 8.99219 10.0143 8.99219C9.44982 8.99219 8.99219 9.35838 8.99219 9.81011C8.99219 10.2618 9.44982 10.628 10.0143 10.628Z'
											fill='#5182A6'
										/>
										<path
											d='M19.0488 20.5C16.9822 20.5 15.2988 18.8166 15.2988 16.75C15.2988 14.6834 16.9822 13 19.0488 13C21.1154 13 22.7988 14.6834 22.7988 16.75C22.7988 18.8166 21.1154 20.5 19.0488 20.5ZM19.0488 14.8818C18.0155 14.8818 17.1738 15.7235 17.1738 16.7568C17.1738 17.7901 18.0155 18.6318 19.0488 18.6318C20.0821 18.6318 20.9238 17.7901 20.9238 16.7568C20.9238 15.7235 20.0821 14.8818 19.0488 14.8818Z'
											fill='#5182A6'
										/>
										<path
											d='M24.0104 24.0096H22.0083C22.0083 22.3583 20.6639 21.0065 19.0052 21.0065C17.3466 21.0065 16.0021 22.351 16.0021 24.0096H14C14 21.2549 16.2432 19.0117 18.9979 19.0117C21.7526 19.0117 24.0104 21.2549 24.0104 24.0096Z'
											fill='#5182A6'
										/>
									</svg>
									<span></span>
								</figure>
								<h3 className='firstChild'>Appointments Showed</h3>
								<h3 className='secondChild'></h3>
								{/* <span className='editSpansDashboard'>
									<img src={editings} className='editings' />
								</span>
								<figure>
									<img src={Dragable} className='dragable' />
								</figure> */}
							</div>
							<div className='formField w-100 dashboardWidgets formControl'>
								{/* <select
									style={{
										backgroundImage: 'url(' + arrowDown + ')',
										marginTop: 0,
										width: '115px',
									}}
								>
									
								</select> */}
								{selectMonthDropdown('Appointments Showed', index)}
								<select
									style={{
										backgroundImage: 'url(' + arrowDown + ')',
										marginLeft: 0,
										marginTop: 0,
										width: '70px',
										paddingLeft: '0px',
									}}>
									<option value=''>2022</option>
								</select>
							</div>

							<div className='previousRevenueWraper'>
								<figure className='statusFigure'>
									<img src={appDash} />
									<span></span>
								</figure>
								<div className='previousRevenueInfo'>
									<h4 className='firstChild'>
										{widget.appointmentsShowedInfo.total_appointments}
									</h4>
									<h4 className='secondChild'></h4>
									<p className='firstChild'>Appointments Showed </p>
									<p className='secondChild'></p>
								</div>
							</div>

							<div className='previousRevenueWraper secondRow'>
							<span className="emptyLoading"></span>
								<button
									className={
										widget.setGoals.status ||
										widget.appointmentsShowedInfo.progress != null
											? 'creatUserBtn hideThis'
											: 'creatUserBtn'
									}
									onClick={(e) => widget.setGoalsFn(e,widget.defaultSelectedMonth)}>
									<span>Set Goal</span>
								</button>
								{widget.setGoals.status && (
									<>
										<div
											className={
												widget.saveGoals.status
													? 'settingGoals hideThis'
													: 'settingGoals'
											}>
											<p className='settinggoalsP'>Set a Goal</p>
											<div className='goalsInputs'>
												<input
													type='number'
													placeholder='Ex. 100'
													max='5'
													defaultValue={widget.appointmentsShowedInfo.goal}
													onChange={(e) => widget.handleGoalChange(e, index)}
													value={widget.goal}></input>
												<button
													className='cancelGoals'
													onClick={(e) => widget.setGoalsFn(e)}>
													Cancel
												</button>
												<button
													className='subitGoals'
													onClick={(e) =>
														widget.saveGoalsFn(e, 'appointments-showed', index)
													}
													disabled={!!!widget.goal}>
													Save
												</button>
											</div>
										</div>
									</>
								)}

								{!widget.setGoals.status &&
									widget.appointmentsShowedInfo.progress != null && (
										<>
											<div className='settingGoals'>
												<p className='settinggoalsP'>
													<b>{widget.defaultSelectedMonth} -</b> Active Goal
													<span className='editSpansDashboard'>
														<img
															src={editings}
															onClick={(e) => widget.setGoalsFn(e)}
															className='editings'
														/>
													</span>
													<span className='goalSetRatio'>
															{widget.appointmentsShowedInfo.total_appointments}
														<b>
														</b>{' '}
														of <b>{widget.appointmentsShowedInfo.goal}</b>
													</span>
												</p>

												{/* use w3-red class for red progress bar */}
												<div className='w3-light-grey'>
													<div
														className={widget.appointmentsShowedInfo.progress?.status == 'down'?'w3-red':'w3-green'}
														style={{
															height: '24px',
															width:
																widget.appointmentsShowedInfo.progress?.percentage + '%',
														}}></div>

													{/* <span
													className='percentValue'
													style={{
														left:
															(widget.goal / graphData.maxGoal) * 100 +
															'%',
													}}
												>
													{(widget.goal / graphData.maxGoal) * 100 + '%'}
												</span> */}

													<span className='percentValue'>
														{widget.appointmentsShowedInfo.progress?.percentage +
															'%'}
													</span>
												</div>
											</div>
										</>
									)}
							</div>
						</div>
					</div>
				);
			},
		},
		{
			name: 'New Contacts',
			shouldDisplay: true,
			defaultSelectedMonth: months[moment().month()],
			isOrganizationOwner: false,
			widgetFunc(index, widget) {
				return (
					<div
						className={
							widget.isNCloading
								? 'individualWidgwet emptyvalue'
								: 'individualWidgwet'
						}>
						<div className='widhetInfoWraper'>
							<div className='widgetIcon'>
								<figure className='dashFig'>
									<img src={contactDash} />
									<span></span>
								</figure>
								<h3 className='firstChild'>New Contacts</h3>
								<h3 className='secondChild'></h3>
								{/* <span className='editSpansDashboard'>
									<img src={editings} className='editings' />
								</span>
								<figure>
									<img src={Dragable} className='dragable' />
								</figure> */}
							</div>
							<div className='formField w-100 dashboardWidgets formControl'>
								<select
									style={{
										backgroundImage: 'url(' + arrowDown + ')',
										marginTop: 0,
										width: '125px',
									}}
									onChange={(e) => onDayChange(e.target, 'NC')}>
									<option value='0'>Today</option>
									<option value='1'>Yesterday</option>
									<option value='7'>Last 7 Days</option>
									<option value='15'>Last 15 Days</option>
									<option value='30'>Last 30 Days</option>
									<option value='45'>Last 45 Days</option>
									<option value='90'>Last 90 Days</option>
								</select>
							</div>

							<div className='previousRevenueWraper'>
								<figure className='statusFigure'>
									<img src={appDash} />
									<span></span>
								</figure>
								<div className='previousRevenueInfo'>
									<h4 className='firstChild'>
										{widget.newContactsInfo.total_new_contacts}
									</h4>
									<h4 className='secondChild'></h4>
									<p className='firstChild'>New Added Contacts</p>
									<p className='secondChild'></p>
								</div>
							</div>

							{/* <div className='previousRevenueWraper secondRow'>
								<Link>
									View all 32 Contacts <img src={rights} alt='' />{' '}
								</Link>
							</div> */}
						</div>
					</div>
				);
			},
		},
		{
			name: 'Retention',
			shouldDisplay: true,
			isOrganizationOwner: false,
			defaultSelectedMonth: months[moment().month()],
			widgetFunc(index, widget) {
				return (
					<div
						className={
							widget.isRetentionloading
								? 'individualWidgwet emptyvalue'
								: 'individualWidgwet'
						}>
						<div className='widhetInfoWraper'>
							<div className='widgetIcon'>
								<figure className='dashFig'>
									<svg
										width='30'
										height='32'
										viewBox='0 0 30 32'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M1.75 13.9996C1.75 20.7657 7.2345 26.2504 14 26.2504C14.7469 26.2504 16.1875 26.0535 16.1875 26.0535C16.1875 26.0535 16.4376 26.4527 16.625 26.6883C16.9239 27.0641 17.4908 27.5612 17.4908 27.5612C16.3748 27.8473 15.2053 28 14 28C6.26806 28 0 21.7317 0 13.9996C0 6.26782 6.26806 0 14 0C21.7319 0 28 6.26782 28 13.9996C28 17 27.5 20 24 23.5C23.482 23.1517 23.0976 22.4418 22.5 22.5C25.3298 20.4245 26.25 15.8747 26.25 13.9996C26.25 7.23385 20.7655 1.74962 14 1.74962C7.2345 1.74962 1.75 7.23385 1.75 13.9996Z'
											fill='#5182A6'
										/>
										<path
											fill-rule='evenodd'
											clip-rule='evenodd'
											d='M16.715 12.8216C17.3519 12.1491 17.7456 11.2442 17.7456 10.2451C17.7456 8.17471 16.0669 6.49609 13.9966 6.49609C11.9262 6.49609 10.2475 8.17471 10.2475 10.2451C10.2475 11.2442 10.6412 12.1491 11.2781 12.8211C9.54649 13.7799 8.37305 15.6235 8.37305 17.7426V18.4165V18.6799C8.37305 19.1977 8.79294 19.6176 9.3103 19.6176H9.66177H18.4194H18.6828C19.2002 19.6176 19.6201 19.1977 19.6201 18.6799V18.5046V17.7426C19.6201 15.6235 18.4466 13.7799 16.715 12.8216ZM13.9966 8.37013C15.0317 8.37013 15.8711 9.20944 15.8711 10.2451C15.8711 11.2803 15.0317 12.1196 13.9966 12.1196C12.9614 12.1196 12.1221 11.2803 12.1221 10.2451C12.1221 9.20944 12.9614 8.37013 13.9966 8.37013ZM10.2475 17.7426C10.2475 15.6723 11.9262 13.9936 13.9966 13.9936C16.0669 13.9936 17.7456 15.6723 17.7456 17.7426H10.2475Z'
											fill='#5182A6'
										/>
										<path
											d='M15.0112 29.9313L17.7 26.7232L14.237 24.068'
											stroke='#5182A6'
											stroke-width='1.8'
											stroke-linecap='round'
											stroke-linejoin='round'
										/>
									</svg>
									<span></span>
								</figure>
								<h3 className='firstChild'>Retention</h3>
								<h3 className='secondChild'></h3>
								{/* <span className='editSpansDashboard'>
									<img src={editings} className='editings' />
								</span>
								<figure>
									<img src={Dragable} className='dragable' />
								</figure> */}
							</div>
							<div className='formField w-100 dashboardWidgets formControl'>
								<select
									style={{
										backgroundImage: 'url(' + arrowDown + ')',
										marginTop: 0,
										width: '125px',
										paddingLeft: '7px',
									}}
									onChange={(e) => onDayChange(e.target, 'Retention')}>
									<option value='30'>Last 30 Days</option>
									<option value='60'>Last 60 Days</option>
									<option value='90'>Last 90 Days</option>
									<option value='120'>Last 120 Days</option>
								</select>
							</div>

							<div className='previousRevenueWraper'>
								<figure className='statusFigure'>
									<img src={appDash} />
									<span></span>
								</figure>
								<div className='previousRevenueInfo'>
									<h4 className='firstChild'>
										{widget.retentionInfo.retention_percentage}%
									</h4>
									<h4 className='secondChild'></h4>
									<p className='firstChild'>Retention</p>
									<p className='secondChild'></p>
								</div>
							</div>

							{/* <div className='previousRevenueWraper secondRow'>
								<Link>
									View all 32 Retentions <img src={rights} alt='' />{' '}
								</Link>
							</div> */}
						</div>
					</div>
				);
			},
		},
	];
	const [isModal, setIsModal] = useState(false);
	//Loaders
	const [isMRRGLoading, setIsMRRGLoading] = useState(false);
	const [isASLoading, setIsASLoading] = useState(false);
	const [isARloading, setIsARloading] = useState(false);
	const [isAShowedLoading, setIsAShowedLoading] = useState(false);
	const [isACloading, setIsACLoading] = useState(false);
	const [isNCloading, setIsNCLoading] = useState(false);
	const [isRetentionloading, setIsRetentionLoading] = useState(false);

	const [widgetCustomizationList, setUpdateWidgetControls] = useState(
		defaultCustomizations
	);

	const [currentMonth, setUpdatedMonth] = useState(months[moment().month()]);

	//on select month fetch the updated stats for the selected widgets
	const onSelectMonth = (event, index) => {
		let widgetName = event.name;
		let selectedMonthInNumber = months.indexOf(event.value);

		switch (widgetName) {
			case 'Monthly Recurring Revenue Growth':
				fetchMRRGWidgetInfo(selectedMonthInNumber + 1);
				break;
			case 'Additional Revenue':
				fetchAdditionalRevenueInfo(selectedMonthInNumber + 1);
				break;
			case 'Appointments Showed':
				fetchAppointmentsShowedInfo(selectedMonthInNumber + 1);
				break;
			case 'Appointments Cancelled':
				fetchAppointmentsCancelledInfo(selectedMonthInNumber + 1);
				break;
			case ' Showed':
				fetchAppointmentsShowedInfo(selectedMonthInNumber + 1);
				break;
		}
		setUpdateWidgetControls(
			[...widgetCustomizationList],
			(widgetCustomizationList[index].defaultSelectedMonth =
				months[selectedMonthInNumber])
		);

		console.log('lol', widgetCustomizationList[index]);
	};

	//Dynamic for ALL widgets
	const selectMonthDropdown = (widgetName, index) => {
		return (
			<select
				name={widgetName}
				value={widgetCustomizationList[index].defaultSelectedMonth}
				defaultValue={'default'}
				onChange={(e) => onSelectMonth(e.target, index)}
				style={{
					backgroundImage: 'url(' + arrowDown + ')',
					marginTop: 0,
					width: '115px',
				}}>
				{months.map((month, i) => {
					return (
						<option key={i} value={month}>
							{month}
						</option>
					);
				})}
			</select>
		);
	};
	// update widget control from Dashboard control
	const updateWidgetControl = (name) => {
		let updatedControls = widgetCustomizationList;
		updatedControls.map((w) => {
			if (w.name.toLocaleLowerCase() == name.toLocaleLowerCase()) {
				w.shouldDisplay = !w.shouldDisplay;
			}
		});
		localStorage.setItem(loggedInUser.email, JSON.stringify(updatedControls));
		setUpdateWidgetControls([...widgetCustomizationList], updatedControls);
	};

	const openModal = () => {
		setIsModal(true);
	};
	const hideModal = () => {
		setIsModal(false);
	};

	const [setGoals, setSetGoals] = useState({
		status: false,
	});

	const setGoalsFn = (e,month) => {
		console.log("MOnth",month)
		console.log("current month",currentMonth)
		if (months.indexOf(month) > months.indexOf(currentMonth)) {
			 return dispatch({
				type: actionTypes.SHOW_MESSAGE,
				message:
					'Invalid month request. Requested month should not be greater than current month',
				typeMessage: 'warning',
			});
		}
		setSetGoals({
			...setGoals,
			status: !setGoals.status,
		});
	};

	const [saveGoals, setSaveGoals] = useState({
		status: false,
	});

	const saveGoalsFn = async (e, widgetName, index) => {
		e.preventDefault();
		let goal = widgetCustomizationList[index].goal
		console.log('goal%1',goal%1,goal)
		if(goal <=0 || goal % 1 != 0){
			return dispatch({
				type: actionTypes.SHOW_MESSAGE,
				message: "Invalid goal request. Goal should be a non zero, positive and non decimal number",
				typeMessage: 'warning',
			});
			
		}
		setSetGoals({
			...setGoals,
			status: !setGoals.status,
		});
		// call the service api for setGoal
		let payload = {
			month:
				months.indexOf(widgetCustomizationList[index].defaultSelectedMonth) + 1,
			year: 2022,
			widget_id: widgetName,
			goal: parseInt(goal),
		};
		console.log('Final payload', payload);
		setIsAShowedLoading(true);
		let setGoal = await DashboardServices.setGoal(payload);


		setUpdateWidgetControls(
			[...widgetCustomizationList],
			(widgetCustomizationList[index].appointmentsShowedInfo.goal =
				setGoal.data.goal,
				widgetCustomizationList[index].appointmentsShowedInfo.progress = setGoal.data.progress)
		);
		setIsAShowedLoading(false);

		console.log('set goal resp', setGoal);
	};

	const [createButton, setCreateButton] = useState(null);
	const loggedInUser = useSelector((state) => state.user.data);

	const [prodFilterModalStatus, setProdFilterModalStatus] = useState(false);
	const [goal, setGoal] = useState('');
	const [option, setOption] = useState(null);
	const [isLoader, setIsLoader] = useState(false);
	const [openMonthDrop, setOpenMonthDrop] = useState(false);

	const handleGoalChange = (event, index) => {
		console.log('event length', event.target.value.length, event);
		if (event.target.value.length > 5) {
			return dispatch({
				type: actionTypes.SHOW_MESSAGE,
				message: 'Goal cannot be more than 5 digits',
				typeMessage: 'warning',
			});
		}
		// setGoal(event.target.value);
		setUpdateWidgetControls(
			[...widgetCustomizationList],
			(widgetCustomizationList[index].goal = event.target.value)
		);
		console.log('update goal change', widgetCustomizationList);
	};

	const onDayChange = (event, widgetname) => {
		let days = event.value;
		switch (widgetname) {
			case 'AS':
				fetchAppointmentsScheduledInfo(days);
				break;

			case 'NC':
				fetchNewContactsInfo(days);
				break;

			case 'Retention':
				fetchRetentionInfo(days);
				break;
		}
	};
	useEffect(() => {
		document.title = 'Red Belt Gym - Dashboard';
	});

	const toggleCreate = (e) => {
		setCreateButton(e);
	};
	const openFilterModal = () => {
		setProdFilterModalStatus(true);
	};

	const closeFilterModal = () => {
		setProdFilterModalStatus(false);
	};

	const toogleActionList = (index) => {
		setOption(index !== option ? index : null);
	};

	const openDropHanler = () => {
		setOpenMonthDrop(!openMonthDrop);
	};

	const [test, setTest] = useState(false);
	const [graphData, setGraphData] = useState({
		goalSet: 300,
		maxGoal: 1000,
	});

	// const graphData = {
	//   goalSet: 125,
	//   maxGoal: 1000
	// };

	const fetchMRRGWidgetInfo = async (
		month = months.indexOf(currentMonth) + 1,
		year = '2022'
	) => {
		if (month > months.indexOf(currentMonth) + 1) {
			dispatch({
				type: actionTypes.SHOW_MESSAGE,
				message:
					'Invalid month request. Requested month should not be greater than current month',
				typeMessage: 'warning',
			});
			setMRRGData({
				current_month_revenue: 0,
				current_month_projected: 0,
				last_month_revenue: 0,
			});
			return;
		}
		setIsMRRGLoading(true);
		let mRRGData = await DashboardServices.fetchMRRG(month, year);
		setIsMRRGLoading(false);
		if (mRRGData?.data) {
			let updatedData = mRRGData.data;
			setMRRGData({});
			setTimeout(() => {
				setMRRGData({...updatedData});
			}, 100);
		} else {
			dispatch({
				type: actionTypes.SHOW_MESSAGE,
				message: mRRGData,
				typeMessage: 'warning',
			});
			setMRRGData({
				current_month_revenue: 0,
				current_month_projected: 0,
				last_month_revenue: 0,
			});
		}
		return true;
	};

	const fetchAppointmentsScheduledInfo = async (dayIndex = 0) => {
		try {
			setIsASLoading(true);
			let appointmentsScheduledData =
				await DashboardServices.fetchAppointmentsScheduled(dayIndex);
			setIsASLoading(false);
			if (appointmentsScheduledData?.data) {
				setAppointments(appointmentsScheduledData.data);
			}
		} catch (error) {}
	};

	const fetchAdditionalRevenueInfo = async (month = 1, year = 2022) => {
		try {
			if (month > months.indexOf(currentMonth) + 1) {
				dispatch({
					type: actionTypes.SHOW_MESSAGE,
					message:
						'Invalid month request. Requested month should not be greater than current month',
					typeMessage: 'warning',
				});
				setAdditionalRevenueInfo({
					current_month_additional_revenue: '0.00',
					current_month_revenue_growth_percentage: '0.00',
					current_month_revenue_status: false,
					current_month: 'Jan',
					current_year: '2022',
					previous_month: 'Dec',
					previous_year: '2021',
					from_date: '2021-12-01',
					to_date: '2022-01-31',
					previous_month_additional_revenue: '0.00',
				});
				return;
			}
			setIsARloading(true);
			let additionalRevenuedata =
				await DashboardServices.fetchAdditionalRevenue(month, year);
			setIsARloading(false);

			if (additionalRevenuedata?.data) {
				setAdditionalRevenueInfo(additionalRevenuedata.data);
			} else {
				dispatch({
					type: actionTypes.SHOW_MESSAGE,
					message: additionalRevenuedata,
					typeMessage: 'warning',
				});

				setAdditionalRevenueInfo({
					current_month_additional_revenue: '0.00',
					current_month_revenue_growth_percentage: '0.00',
					current_month_revenue_status: false,
					current_month: 'Jan',
					current_year: '2022',
					previous_month: 'Dec',
					previous_year: '2021',
					from_date: '2021-12-01',
					to_date: '2022-01-31',
					previous_month_additional_revenue: '0.00',
				});
			}
		} catch (error) {}
	};

	const fetchAppointmentsShowedInfo = async (month = 1, year = 2022) => {
		try {
			if (month > months.indexOf(currentMonth) + 1) {
				dispatch({
					type: actionTypes.SHOW_MESSAGE,
					message:
						'Invalid month request. Requested month should not be greater than current month',
					typeMessage: 'warning',
				});
				setAppointmentsShowed({
					total_appointments: 0,
					month: 'Jun',
					year: '2022',
					from_date: '2022-06-01',
					to_date: '2022-06-30',
				});
				return;
			}
			setIsAShowedLoading(true);
			let fetchAppointmentsShowedData =
				await DashboardServices.fetchAppointmentsShowed(month, year);
			setIsAShowedLoading(false);
			if (fetchAppointmentsShowedData?.data) {
				setAppointmentsShowed(fetchAppointmentsShowedData.data);
			} else {
				dispatch({
					type: actionTypes.SHOW_MESSAGE,
					message: fetchAppointmentsShowedData,
					typeMessage: 'warning',
				});
				setAppointmentsShowed({
					total_appointments: 0,
					month: 'Jun',
					year: '2022',
					from_date: '2022-06-01',
					to_date: '2022-06-30',
				});
			}
		} catch (error) {}
	};

	const fetchAppointmentsCancelledInfo = async (month = 1, year = 2022) => {
		try {
			if (month > months.indexOf(currentMonth) + 1) {
				dispatch({
					type: actionTypes.SHOW_MESSAGE,
					message:
						'Invalid month request. Requested month should not be greater than current month',
					typeMessage: 'warning',
				});
				setAppointmentsCancelled({
					total_appointments: 0,
					month: 'Jun',
					year: '2022',
					from_date: '2022-06-01',
					to_date: '2022-06-30',
				});
				return;
			}
			setIsACLoading(true);
			let fetchAppointmentsCancelledData =
				await DashboardServices.fetchAppointmentsCanceled(month, year);
			setIsACLoading(false);
			if (fetchAppointmentsCancelledData?.data) {
				setAppointmentsCancelled(fetchAppointmentsCancelledData.data);
			} else {
				dispatch({
					type: actionTypes.SHOW_MESSAGE,
					message: fetchAppointmentsCancelledData,
					typeMessage: 'warning',
				});
				setAppointmentsCancelled({
					total_appointments: 0,
					month: 'Jun',
					year: '2022',
					from_date: '2022-06-01',
					to_date: '2022-06-30',
				});
			}
		} catch (error) {}
	};

	const fetchNewContactsInfo = async (dayIndex = 0) => {
		try {
			setIsNCLoading(true);
			let newContactsData = await DashboardServices.fetchNewContacts(dayIndex);
			setIsNCLoading(false);
			if (newContactsData?.data) {
				setNewContacts(newContactsData.data);
			}
		} catch (error) {}
	};

	const fetchRetentionInfo = async (dayIndex = 30) => {
		try {
			setIsRetentionLoading(true);
			let retentionData = await DashboardServices.fetchRetention(dayIndex);
			setIsRetentionLoading(false);
			if (retentionData?.data) {
				setRetentionData(retentionData.data);
			}
		} catch (error) {}
	};

	const loadPreSelectedDashboardWidgets = async () => {
		if (Object.keys(loggedInUser).length > 0) {
			// setTimeout(() => {
			setIsLoader(false);
			// },500)
		}
		let preSelectedData = JSON.parse(localStorage.getItem(loggedInUser.email));
		let currentWidgetCustomizationList = widgetCustomizationList;
		if (preSelectedData != undefined && preSelectedData.length > 0) {
			preSelectedData.map((x, i) => {
				if (x.name == currentWidgetCustomizationList[i].name) {
					currentWidgetCustomizationList[i].shouldDisplay = x.shouldDisplay;
				}
			});
			setUpdateWidgetControls(currentWidgetCustomizationList);
		}
	};

	useEffect(async () => {
		fetchMRRGWidgetInfo(months.indexOf(currentMonth) + 1);
		fetchAppointmentsScheduledInfo();
		fetchAdditionalRevenueInfo(months.indexOf(currentMonth) + 1);
		fetchAppointmentsShowedInfo(months.indexOf(currentMonth) + 1);
		fetchAppointmentsCancelledInfo(months.indexOf(currentMonth) + 1);
		fetchNewContactsInfo();
		fetchRetentionInfo();
	}, [true]);

	useEffect(async () => {
		setIsLoader(true);
		if (loggedInUser?.email) {
			loadPreSelectedDashboardWidgets();
		}
	}, [loggedInUser]);

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
							{/* <div className="arrowPoint">
      <img src={arrowLong} alt="" />
    </div> */}
						</div>
					) : (
						<div className='dashInnerUI'>
							<div className='mrrWraper'>
								<h2 className='inDashboardHeader'>Dashboard</h2>
								<p className='userListAbout'>Get a clear view of your task</p>
								<div
									className='expanDashboard'
									onClick={() => openFilterModal()}>
									<img src={expandDashboard} alt='' />
								</div>

								<div className='widgetWrapers'>
									{widgetCustomizationList.map((widget, i) => {
										widget.mRRGInfo = mRRGInfo;
										widget.isMRRGLoading = isMRRGLoading;
										widget.appointmentsScheduled = appointmentsScheduledInfo;
										widget.isASLoading = isASLoading;
										widget.additionalRevenueInfo = additionalRevenueInfo;
										widget.isARloading = isARloading;
										widget.appointmentsShowedInfo = appointmentsShowedInfo;
										widget.isAShowedLoading = isAShowedLoading;
										widget.appointmentsCancelledInfo =
											appointmentsCancelledInfo;
										widget.isACloading = isACloading;
										widget.newContactsInfo = newContactsInfo;
										widget.isNCloading = isNCloading;
										widget.retentionInfo = retentionInfo;
										widget.isRetentionloading = isRetentionloading;
										widget.setGoalsFn = setGoalsFn;
										widget.setGoals = setGoals;
										widget.handleGoalChange = handleGoalChange;
										// widget.goal = goal
										widget.saveGoalsFn = saveGoalsFn;
										widget.saveGoals = saveGoals;

										if (widget.shouldDisplay) {
											return (
												<>
													{widget.isOrganizationOwner &&
													loggedInUser?.isOrganizationOwner == true
														? widget.widgetFunc(i, widget)
														: ''}
													{widget.isOrganizationOwner != true
														? widget.widgetFunc(i, widget)
														: ''}
												</>
											);
										}
									})}
								</div>
								<DashboardFooter />
							</div>
							<div className='mrrContraolsWraper'>
								{prodFilterModalStatus === true && (
									<DashboardControls
										closeModal={closeFilterModal}
										updateWidgetControl={(e) => updateWidgetControl(e)}
										widgetList={widgetCustomizationList}
										loggedInUser={loggedInUser}
									/>
								)}
								{/* <GoalSetModal/> */}
							</div>
						</div>
					)}{' '}
				</>
			)}
		</>
	);
};

export default Dashboard;
