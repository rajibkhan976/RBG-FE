/* eslint-disable default-case */

import upGraph from '../../../src/assets/images/upGraph2.svg';
import Dragable from '../../../src/assets/images/dragable.svg';
import arrowDown from '../../../src/assets/images/arrowDown.svg';
import contactDash from '../../../src/assets/images/contactDash.svg';
import mrrgIcon from '../../../src/assets/images/mrrIcon.svg';
import retentionIcon from '../../../src/assets/images/retentionIcon.svg';
import appointmentShowedIcon from '../../../src/assets/images/appointmentShowedIcon.svg';
import appointmentScheduledIcon from '../../../src/assets/images/appointmentScheduledIcon.svg';
import appointmentCancelledIcon from '../../../src/assets/images/appointmentCancelledIcon.svg';
import additionalRevenueIcon from '../../../src/assets/images/additionalRevenueIcon.svg';
import editings from '../../../src/assets/images/editings.svg';
import { useSelector, useDispatch } from 'react-redux';
import { DashboardServices } from '../../services/dashboard/DashboardServices';
import * as actionTypes from '../../actions/types';
import moment from 'moment';
import profits from '../../../src/assets/images/profits.svg';
import loss from '../../../src/assets/images/loss.svg';
import appDash from '../../../src/assets/images/appDash.svg';

import React, { useState, useEffect, useRef } from 'react';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const WidgetSortableListItem = SortableElement((props) => {
	// widget templates

	const arWidget = (widget, index) => {

		 

		return (
			<div
				className={
					props.isARloading
						? 'individualWidgwet emptyvalue'
						: 'individualWidgwet'
				}
			>
				<div className='widhetInfoWraper'>
					{!props.changeNameStatus.changeARevenueName ? (
						<div className='widgetIcon'>
							
							<figure className='dashFig'>
								{widget.id == 'additional-revenue' ? (
									<img src={additionalRevenueIcon} />
								) : (
									''
								)}

								<span></span>
							</figure>
							<div className='title'>
								<h3 className='firstChild'>{widget.name}</h3>
								<h3 className='secondChild'></h3>
								<span className='emptyheadingName'></span>
								<span class='emptyLoading topDashboardSelector'></span>
								<button
									className='editSpansDashboard'
									onClick={() => {
										props.editName(widget.id, widget.name, index);
									}}
								>
									<img src={editings} className='editings' />
								</button>
							</div>
							<figure>
								<img src={Dragable} className='dragable' />
							</figure>
						</div>
					) : (
						''
					)}

{props.changeNameStatus.changeARevenueName ? (
						<div className='widhetInfoWraperEdit'>
							<h4>Edit name</h4>
							<div className='goalsInputs'>
								<input
									type='text'
									placeholder='Ex. 100'
									max='5'
									maxLength={50}
									onChange={(e) =>
										props.updateWidgetName(e.target.value, index)
									}
									value={widget.name}
								></input>
								<button
									className='cancelGoals'
									onClick={() => {
										props.editName(widget.id, null, index);
									}}
								>
									Cancel
								</button>
								<button
									className='subitGoals'
									onClick={() => {
										props.saveName(widget.id, index);
									}}
									disabled={!!!widget.name}
								>
									Save
								</button>
							</div>
						</div>
					) :(
					<div className='formField w-100 dashboardWidgets formControl'>
						{props.selectMonthDropdown('Additional Revenue', index)}

						<select
							style={{
								backgroundImage: 'url(' + arrowDown + ')',
								marginLeft: 0,
								marginTop: 0,
								width: '70px',
								paddingLeft: '0px',
							}}
						>
							<option value=''>2022</option>
						</select>
					</div>
					)}
					<div className='previousRevenueWraper'>
						<figure className='statusFigure'>
							<img src={upGraph} />
							<span></span>
						</figure>
						<div className='previousRevenueInfo'>
							<h4 className='firstChild'>
								${props.additionalRevenueInfo.current_month_additional_revenue}
							</h4>
							<h4 className='secondChild'></h4>
							<p className='firstChild'>Collected Amount</p>
							<p className='secondChild'></p>
							<span
								className={
									props.additionalRevenueInfo.current_month_revenue_status ==
									false
										? 'previousonth '
										: props.additionalRevenueInfo
												.current_month_revenue_status == 'up'
										? 'previousMonth firstChild profits'
										: 'previousMonth firstChild loss'
								}
							>
								{props.additionalRevenueInfo.current_month_revenue_status ==
								false
									? ''
									: props.additionalRevenueInfo
											.current_month_revenue_growth_percentage + '%'}{' '}
								<img
									src={
										props.additionalRevenueInfo.current_month_revenue_status ==
										false
											? ''
											: props.additionalRevenueInfo
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
								${props.additionalRevenueInfo.previous_month_additional_revenue}
							</h4>
							<h4 className='secondChild'></h4>

							<p className='firstChild'>
								Projected Value -{' '}
								<span className='monthInformations'>
									{props.additionalRevenueInfo.previous_month},{' '}
									{props.additionalRevenueInfo.previous_year}
								</span>
							</p>
							<p className='secondChild'></p>
						</div>
					</div>
				</div>
			</div>
		);
	};
	const ashowedWidget = (widget, index) => {
		return (
			<div
				className={
					props.isAShowedLoading
						? 'individualWidgwet emptyvalue'
						: 'individualWidgwet'
				}
			>
				<div className='widhetInfoWraper'>
				{!props.changeNameStatus.changeAshowedName ? (

<div className='widgetIcon'>
<figure className='dashFig'>
	<img src={appointmentShowedIcon} />

	<span></span>
</figure>
<div className='title'>
	<h3 className='firstChild'>{widget.name}</h3>
	<h3 className='secondChild'></h3>
	<span className='emptyheadingName'></span>
	<span class='emptyLoading topDashboardSelector'></span>
	<button className='editSpansDashboard' 	onClick={() => {
										props.editName(widget.id, widget.name, index);
									}}>
		<img src={editings} className='editings' />
	</button>
</div>
<figure>
	<img src={Dragable} className='dragable' />
</figure>
</div>
					) : (
						''
					)}

{props.changeNameStatus.changeAshowedName ? (
						<div className='widhetInfoWraperEdit'>
							<h4>Edit name</h4>
							<div className='goalsInputs'>
								<input
									type='text'
									placeholder='Ex. 100'
									max='5'
									maxLength={50}
									onChange={(e) =>
										props.updateWidgetName(e.target.value, index)
									}
									value={widget.name}
								></input>
								<button
									className='cancelGoals'
									onClick={() => {
										props.editName(widget.id, null, index);
									}}
								>
									Cancel
								</button>
								<button
									className='subitGoals'
									onClick={() => {
										props.saveName(widget.id, index);
									}}
									disabled={!!!widget.name}
								>
									Save
								</button>
							</div>
						</div>
					) :(
					<div className='formField w-100 dashboardWidgets formControl'>
						{props.selectMonthDropdown('Appointments Showed', index)}

						<select
							style={{
								backgroundImage: 'url(' + arrowDown + ')',
								marginLeft: 0,
								marginTop: 0,
								width: '70px',
								paddingLeft: '0px',
							}}
						>
							<option value=''>2022</option>
						</select>
					</div>
					)}
					<div className='previousRevenueWraper'>
						<figure className='statusFigure'>
							<img src={appDash} />
							<span></span>
						</figure>
						<div className='previousRevenueInfo'>
							<h4 className='firstChild'>
								{props.appointmentsShowedInfo.total_appointments}
							</h4>
							<h4 className='secondChild'></h4>
							<p className='firstChild'>Appointments Showed</p>
							<p className='secondChild'></p>

							<span className='secondChild'></span>
						</div>
					</div>
					<div className='previousRevenueWraper secondRow'>
						<span className='emptyLoading'></span>
						<button
							className={
								props.setGoals.status ||
								props.appointmentsShowedInfo.progress != null
									? 'creatUserBtn hideThis'
									: 'creatUserBtn'
							}
							onClick={(e) => props.setGoal(e, widget.defaultSelectedMonth)}
						>
							<span>Set Goal</span>
						</button>
						{props.setGoals.status && (
							<>
								<div
									className={
										!props.setGoals.status
											? 'settingGoals hideThis'
											: 'settingGoals'
									}
								>
									<p className='settinggoalsP'>Set a Goal</p>
									<div className='goalsInputs'>
										<input
											type='number'
											placeholder='Ex. 100'
											max='5'
											onChange={(e) => props.handleGoalChange(e, index)}
											value={props.appointmentsShowedInfo.goal}
										></input>
										<button
											className='cancelGoals'
											onClick={(e) =>
												props.setGoal(e, widget.defaultSelectedMonth)
											}
										>
											Cancel
										</button>
										<button
											className='subitGoals'
											onClick={(e) =>
												props.saveGoalsFn(e, 'appointments-showed', index)
											}
											disabled={!!!props.appointmentsShowedInfo.goal}
										>
											Save
										</button>
									</div>
								</div>
							</>
						)}

						{!props.setGoals.status &&
							props.appointmentsShowedInfo.progress != null && (
								<>
									<div className='settingGoals'>
										<p className='settinggoalsP'>
											<b>{props.appointmentsShowedInfo.month} -</b> Active Goal
											<span className='editSpansDashboard'>
												{/* <img
															src={editings}
															onClick={(e)=>{setGoal(e)}}
															className='editings'
											
														/> */}
												<button
													className='editings'
													onClick={(e) => {
														props.setGoal(e, widget.defaultSelectedMonth);
													}}
												>
													<img src={editings} />
												</button>
											</span>
											<span className='goalSetRatio'>
												{props.appointmentsShowedInfo.total_appointments}
												<b></b> of <b>{props.appointmentsShowedInfo.goal}</b>
											</span>
										</p>

										{/* use w3-red class for red progress bar */}
										<div className='w3-light-grey'>
											<div
												className={
													props.appointmentsShowedInfo.progress?.status ==
													'down'
														? 'w3-red'
														: 'w3-green'
												}
												style={{
													height: '24px',
													width:
														props.appointmentsShowedInfo.progress?.percentage +
														'%',
												}}
											></div>
											<span className='percentValue'>
												{props.appointmentsShowedInfo.progress?.percentage +
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
	};
	const acWidget = (widget, index) => {
		return (
			<div
				className={
					props.isACloading
						? 'individualWidgwet emptyvalue'
						: 'individualWidgwet'
				}
			>
				<div className='widhetInfoWraper'>
					{!props.changeNameStatus.changeACancelledName ? (
						<div className='widgetIcon'>
							<figure className='dashFig'>
								<img src={appointmentCancelledIcon} />

								<span></span>
							</figure>
							<div className='title'>
								<h3 className='firstChild'>{widget.name}</h3>
								<h3 className='secondChild'></h3>
								<span className='emptyheadingName'></span>
								<span class='emptyLoading topDashboardSelector'></span>
								<button
									className='editSpansDashboard'
									onClick={() => {
										props.editName(widget.id, widget.name, index);
									}}
								>
									<img src={editings} className='editings' />
								</button>
							</div>
							<figure>
								<img src={Dragable} className='dragable' />
							</figure>
						</div>
					) : (
						''
					)}

{props.changeNameStatus.changeACancelledName ? (
						<div className='widhetInfoWraperEdit'>
							<h4>Edit name</h4>
							<div className='goalsInputs'>
								<input
									type='text'
									placeholder='Ex. 100'
									max='5'
									maxLength={50}
									onChange={(e) =>
										props.updateWidgetName(e.target.value, index)
									}
									value={widget.name}
								></input>
								<button
									className='cancelGoals'
									onClick={() => {
										props.editName(widget.id, null, index);
									}}
								>
									Cancel
								</button>
								<button
									className='subitGoals'
									onClick={() => {
										props.saveName(widget.id, index);
									}}
									disabled={!!!widget.name}
								>
									Save
								</button>
							</div>
						</div>
					) :(
					<div className='formField w-100 dashboardWidgets formControl'>
						{props.selectMonthDropdown('Appointments Cancelled', index)}

						<select
							style={{
								backgroundImage: 'url(' + arrowDown + ')',
								marginLeft: 0,
								marginTop: 0,
								width: '70px',
								paddingLeft: '0px',
							}}
						>
							<option value=''>2022</option>
						</select>
					</div>
					)}
					<div className='previousRevenueWraper'>
						<figure className='statusFigure'>
							<img src={appDash} />
							<span></span>
						</figure>
						<div className='previousRevenueInfo'>
							<h4 className='firstChild'>
								{props.appointmentsCancelledInfo.total_appointments}
							</h4>
							<h4 className='secondChild'></h4>
							<p className='firstChild'>Appointments Cancelled</p>
							<p className='secondChild'></p>

							<span className='secondChild'></span>
						</div>
					</div>
				</div>
			</div>
		);
	};
	const asWidget = (widget, index) => {
		return (
			<div
				className={
					props.isASLoading
						? 'individualWidgwet emptyvalue'
						: 'individualWidgwet'
				}
			>
					<div className='widhetInfoWraper'>
				{!props.changeNameStatus.changeAScheduledName ? (
					<div className='widgetIcon'>
					<figure className='dashFig'>
						{widget.id == 'mrr' ? (
							<img src={mrrgIcon} />
						) : widget.id == 'additional-revenue' ? (
							<img src={additionalRevenueIcon} />
						) : widget.id == 'appointments-canceled' ? (
							<img src={appointmentCancelledIcon} />
						) : widget.id == 'appointments-scheduled' ? (
							<img src={appointmentScheduledIcon} />
						) : widget.id == 'appointments-showed' ? (
							<img src={appointmentShowedIcon} />
						) : widget.id == 'new-contacts' ? (
							<img src={contactDash} />
						) : widget.id == 'retention' ? (
							<img src={retentionIcon} />
						) : (
							''
						)}

						<span></span>
					</figure>
					<div className='title'>
						<h3 className='firstChild'>{widget.name}</h3>
						<h3 className='secondChild'></h3>
						<span className='emptyheadingName'></span>
						<span class='emptyLoading topDashboardSelector'></span>
						<button className='editSpansDashboard' 	onClick={() => {
								props.editName(widget.id, widget.name, index);
							}}>
							<img src={editings} className='editings' />
						</button>
					</div>
					<figure>
						<img src={Dragable} className='dragable' />
					</figure>
				</div>
				) : (
					''
				)}

			
				
					{props.changeNameStatus.changeAScheduledName ? (
						<div className='widhetInfoWraperEdit'>
							<h4>Edit name</h4>
							<div className='goalsInputs'>
								<input
									type='text'
									placeholder='Ex. 100'
									max='5'
									maxLength={50}
									onChange={(e) =>
										props.updateWidgetName(e.target.value, index)
									}
									value={widget.name}
								></input>
								<button
									className='cancelGoals'
									onClick={() => {
										props.editName(widget.id, null, index);
									}}
								>
									Cancel
								</button>
								<button
									className='subitGoals'
									onClick={() => {
										props.saveName(widget.id, index);
									}}
									disabled={!!!widget.name}
								>
									Save
								</button>
							</div>
						</div>
					) :(
					<div className='formField w-100 dashboardWidgets formControl'>
						{props.onSelectDaysChange('Appointments_Scheduled')}

						<select
							style={{
								backgroundImage: 'url(' + arrowDown + ')',
								marginLeft: 0,
								marginTop: 0,
								width: '70px',
								paddingLeft: '0px',
							}}
						>
							<option value=''>2022</option>
						</select>
					</div>
					)}
					<div className='previousRevenueWraper'>
						<figure className='statusFigure'>
							<img src={appDash} />
							<span></span>
						</figure>
						<div className='previousRevenueInfo'>
							<h4 className='firstChild'>
								{props.appointmentsScheduledInfo.total_appointments}
							</h4>
							<h4 className='secondChild'></h4>
							<p className='firstChild'>Appointments Scheduled</p>
							<p className='secondChild'></p>

							<span className='secondChild'></span>
						</div>
					</div>
				</div>
			</div>
		);
	};
	const retentionWidget = (widget, index) => {
		return (
			<div
				className={
					props.isRetentionloading
						? 'individualWidgwet emptyvalue'
						: 'individualWidgwet'
				}
			>
				<div className='widhetInfoWraper'>
					{!props.changeNameStatus.changeRetentionName ? (
						<div className='widgetIcon'>
							<figure className='dashFig'>
								{widget.id == 'mrr' ? (
									<img src={mrrgIcon} />
								) : widget.id == 'additional-revenue' ? (
									<img src={additionalRevenueIcon} />
								) : widget.id == 'appointments-canceled' ? (
									<img src={appointmentCancelledIcon} />
								) : widget.id == 'appointments-scheduled' ? (
									<img src={appointmentScheduledIcon} />
								) : widget.id == 'appointments-showed' ? (
									<img src={appointmentShowedIcon} />
								) : widget.id == 'new-contacts' ? (
									<img src={contactDash} />
								) : widget.id == 'retention' ? (
									<img src={retentionIcon} />
								) : (
									''
								)}

								<span></span>
							</figure>
							<div className='title'>
								<h3 className='firstChild'>{widget.name}</h3>
								<h3 className='secondChild'></h3>
								<span className='emptyheadingName'></span>
								<span class='emptyLoading topDashboardSelector'></span>
								<button
									className='editSpansDashboard'
									onClick={() => {
										props.editName(widget.id, widget.name, index);
									}}
								>
									<img src={editings} className='editings' />
								</button>
							</div>
							<figure>
								<img src={Dragable} className='dragable' />
							</figure>
						</div>
					) : (
						''
					)}
{props.changeNameStatus.changeRetentionName ? (
						<div className='widhetInfoWraperEdit'>
							<h4>Edit name</h4>
							<div className='goalsInputs'>
								<input
									type='text'
									placeholder='Ex. 100'
									max='5'
									maxLength={50}
									onChange={(e) =>
										props.updateWidgetName(e.target.value, index)
									}
									value={widget.name}
								></input>
								<button
									className='cancelGoals'
									onClick={() => {
										props.editName(widget.id, null, index);
									}}
								>
									Cancel
								</button>
								<button
									className='subitGoals'
									onClick={() => {
										props.saveName(widget.id, index);
									}}
									disabled={!!!widget.name}
								>
									Save
								</button>
							</div>
						</div>
					) :(
					<div className='formField w-100 dashboardWidgets formControl'>
						{props.onSelectDaysChange('Retention', true)}

						<select
							style={{
								backgroundImage: 'url(' + arrowDown + ')',
								marginLeft: 0,
								marginTop: 0,
								width: '70px',
								paddingLeft: '0px',
							}}
						>
							<option value=''>2022</option>
						</select>
					</div>
					)}
					<div className='previousRevenueWraper'>
						<figure className='statusFigure'>
							<img src={appDash} />
							<span></span>
						</figure>
						<div className='previousRevenueInfo'>
							<h4 className='firstChild'>
								{props.retentionInfo.retention_percentage}%
							</h4>
							<h4 className='secondChild'></h4>
							<p className='firstChild'></p>
							<p className='secondChild'></p>

							<span className='secondChild'></span>
						</div>
					</div>
				</div>
			</div>
		);
	};
	const mrrgWidget = (widget, index) => {
		return (
			<div
				className={
					props.isMRRGLoading
						? 'individualWidgwet emptyvalue'
						: 'individualWidgwet'
				}
			>
				<div className='widhetInfoWraper'>
					{!props.changeNameStatus.changeMRRGrowthName ? (
						<div className='widgetIcon'>
							<figure className='dashFig'>
								{widget.id == 'mrr' ? <img src={mrrgIcon} /> : ''}

								<span></span>
							</figure>
							<div className='title'>
								<h3 className='firstChild'>{widget.name}</h3>
								<h3 className='secondChild'></h3>
								<span className='emptyheadingName'></span>
								<span class='emptyLoading topDashboardSelector'></span>
								<button
									className='editSpansDashboard'
									onClick={() => {
										props.editName(widget.id, widget.name, index);
									}}
								>
									<img src={editings} className='editings' />
								</button>
							</div>
							<figure>
								<img src={Dragable} className='dragable' />
							</figure>
						</div>
					) : (
						''
					)}

					{props.changeNameStatus.changeMRRGrowthName ? (
						<div className='widhetInfoWraperEdit'>
							<h4>Edit name</h4>
							<div className='goalsInputs'>
								<input
									type='text'
									placeholder='Ex. 100'
									max='5'
									maxLength={50}
									onChange={(e) =>
										props.updateWidgetName(e.target.value, index)
									}
									value={widget.name}
								></input>
								<button
									className='cancelGoals'
									onClick={() => {
										props.editName(widget.id, null, index);
									}}
								>
									Cancel
								</button>
								<button
									className='subitGoals'
									onClick={() => {
										props.saveName(widget.id, index);
									}}
									disabled={!!!widget.name}
								>
									Save
								</button>
							</div>
						</div>
					) : (
						<div className='formField w-100 dashboardWidgets formControl'>
							{props.selectMonthDropdown(
								'Monthly Recurring Revenue Growth',
								index
							)}
							{/* {justclick("fucker",index)} */}

							<select
								style={{
									backgroundImage: 'url(' + arrowDown + ')',
									marginLeft: 0,
									marginTop: 0,
									width: '70px',
									paddingLeft: '0px',
								}}
							>
								<option value=''>2022</option>
							</select>
						</div>
					)}
					{widget.id == 'mrr' ? (
						<div className='currentPreviousState'>
							<div className='previousRevenueWraper currentStatus'>
								<figure className='statusFigure'>
									<img src={upGraph} alt='' />
									<span></span>
								</figure>
								<div className='previousRevenueInfo'>
									<h4 className='firstChild'>
										${props.mRRGInfo.current_month_revenue}
									</h4>
									<h4 className='secondChild'></h4>
									<p className='firstChild'>Current month revenue</p>
									<p className='secondChild'></p>
								</div>
							</div>
							<div className='previousRevenueWraper previousStatus'>
								<div className='previousRevenueInfo'>
									<h4 className='firstChild'>
										${props.mRRGInfo.current_month_projected}
									</h4>
									<h4 className='secondChild'></h4>
									<p className='firstChild'>Projected Amount</p>
									<p className='secondChild'></p>
								</div>
							</div>
						</div>
					) : (
						''
					)}

					<div className='previousRevenueWraper secondRow'>
						<div className='previousRevenueInfo'>
							<h4 className='firstChild'>
								${props.mRRGInfo.previous_month_revenue}
							</h4>
							<h4 className='secondChild'></h4>

							<p className='firstChild'>
								Projected Value -{' '}
								<span className='monthInformations'>
									{props.mRRGInfo.previous_month},{' '}
									{props.mRRGInfo.previous_year}
								</span>
							</p>
							<p className='secondChild'></p>
						</div>
					</div>
				</div>
			</div>
		);
	};
	const ncWidget = (widget, index) => {
		return (
			<div
				className={
					props.isNCloading
						? 'individualWidgwet emptyvalue'
						: 'individualWidgwet'
				}
			>
				<div className='widhetInfoWraper'>
					{!props.changeNameStatus.changeNContactsName ? (
						<div className='widgetIcon'>
							<figure className='dashFig'>
								<img src={contactDash} />
								<span></span>
							</figure>
							<div className='title'>
								<h3 className='firstChild'>{widget.name}</h3>
								<h3 className='secondChild'></h3>
								<span className='emptyheadingName'></span>
								<span class='emptyLoading topDashboardSelector'></span>
								<button
									className='editSpansDashboard'
									onClick={() => {
										props.editName(widget.id, widget.name, index);
									}}
								>
									<img src={editings} className='editings' />
								</button>
							</div>
							<figure>
								<img src={Dragable} className='dragable' />
							</figure>
						</div>
					) : (
						''
					)}
					{props.changeNameStatus.changeNContactsName ? (
						<div className='widhetInfoWraperEdit'>
							<h4>Edit name</h4>
							<div className='goalsInputs'>
								<input
									type='text'
									placeholder='Ex. 100'
									max='5'
									maxLength={50}
									onChange={(e) =>
										props.updateWidgetName(e.target.value, index)
									}
									value={widget.name}
								></input>
								<button
									className='cancelGoals'
									onClick={() => {
										props.editName(widget.id, null, index);
									}}
								>
									Cancel
								</button>
								<button
									className='subitGoals'
									onClick={() => {
										props.saveName(widget.id, index);
									}}
									disabled={!!!widget.name}
								>
									Save
								</button>
							</div>
						</div>
					) : (
						<div className='formField w-100 dashboardWidgets formControl'>
							{props.onSelectDaysChange('New_Contacts')}

							<select
								style={{
									backgroundImage: 'url(' + arrowDown + ')',
									marginLeft: 0,
									marginTop: 0,
									width: '70px',
									paddingLeft: '0px',
								}}
							>
								<option value=''>2022</option>
							</select>
						</div>
					)}
					<div className='previousRevenueWraper'>
						<figure className='statusFigure'>
							<img src={appDash} />
							<span></span>
						</figure>
						<div className='previousRevenueInfo'>
							<h4 className='firstChild'>
								{props.newContactsInfo.total_new_contacts}
							</h4>
							<h4 className='secondChild'></h4>
							<p className='firstChild'>New Added Contacts</p>
							<p className='secondChild'></p>

							<span className='secondChild'></span>
						</div>
					</div>
				</div>
			</div>
		);
	};
	return (
		<div>
			{props.widget.id == 'mrr'
				? mrrgWidget(props.widget, props.i)
				: props.widget.id == 'additional-revenue'
				? arWidget(props.widget, props.i)
				: props.widget.id == 'appointments-scheduled'
				? asWidget(props.widget, props.i)
				: props.widget.id == 'new-contacts'
				? ncWidget(props.widget, props.i)
				: props.widget.id == 'appointments-showed'
				? ashowedWidget(props.widget, props.i)
				: props.widget.id == 'appointments-canceled'
				? acWidget(props.widget, props.i)
				: props.widget.id == 'retention'
				? retentionWidget(props.widget, props.i)
				: ''}
		</div>
	);
});

const DashboardSortableWidgetList = SortableContainer(
	({
		widgets,
		updateWidgetDefaultDate,
		loggedInUser,
		updateWidgetName,
		syncWithBackend,
	}) => {
		const dispatch = useDispatch();
		//widgetStates

		const [selectedDay, setSelectedDay] = useState({
			New_Contacts : '0',
			Appointments_Scheduled : '0',
			Retention : '30'
		})
		const [months, setMonths] = useState(moment.months());

		const [setGoals, setSetGoals] = useState({
			status: false,
		});

		const [ashowedSelectedMonth, setAShowedSelectedMonth] = useState(null);
		const [currentMonth, setUpdatedMonth] = useState(months[moment().month()]);
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
					setAShowedSelectedMonth(event.value);
					break;
				case 'Appointments Cancelled':
					fetchAppointmentsCancelledInfo(selectedMonthInNumber + 1);
					break;
			}
			updateWidgetDefaultDate(selectedMonthInNumber, index);
		};

		const selectMonthDropdown = (widgetName, index) => {
			console.log("default month",widgetName,widgets[index].defaultSelectedMonth)
			return (
				<select
					name={widgetName}
					value={widgets[index].defaultSelectedMonth}
					defaultValue={widgets[index].defaultSelectedMonth}
					onChange={(e) => onSelectMonth(e.target, index)}
					style={{
						backgroundImage: 'url(' + arrowDown + ')',
						marginTop: 0,
						width: '115px',
					}}
				>
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
		const onDayChange = (event, widgetname) => {
			let days = event.value;
			switch (widgetname) {
				case 'Appointments_Scheduled':
					setSelectedDay({...selectedDay,Appointments_Scheduled : days})
					fetchAppointmentsScheduledInfo(days);
					break;

				case 'New_Contacts':
					setSelectedDay({...selectedDay,New_Contacts : days})
					fetchNewContactsInfo(days);
					break;

				case 'Retention':
					setSelectedDay({...selectedDay,Retention : days})
					fetchRetentionInfo(days);
					break;
			}
		};

		const onSelectDaysChange = (wname, retention = false) => {
			console.log("selected day ",selectedDay[wname])
			if (!retention) {
				return (
					<select
						onChange={(e) => onDayChange(e.target, wname)}
						style={{
							backgroundImage: 'url(' + arrowDown + ')',
							marginTop: 0,
							width: '90px',
						}}
						value={selectedDay[wname]}
				
					>
						<option value='0'>Today</option>
						<option value='1'>Yesterday</option>
						<option value='7'>Last 7 Days</option>
						<option value='15'>Last 15 Days</option>
						<option value='30'>Last 30 Days</option>
						<option value='45'>Last 45 Days</option>
						<option value='90'>Last 90 Days</option>
					</select>
				);
			} else {
				return (
					<select
						onChange={(e) => onDayChange(e.target, wname)}
						style={{
							backgroundImage: 'url(' + arrowDown + ')',
							marginTop: 0,
							width: '125px',
						}}
						value={selectedDay[wname]}

					>
						<option value='30'>Last 30 Days</option>
						<option value='60'>Last 60 Days</option>
						<option value='90'>Last 90 Days</option>
						<option value='120'>Last 120 Days</option>
					</select>
				);
			}
		};
		const [mRRGInfo, setMRRGData] = useState({
			current_month_revenue: '0.00',
			current_month_projected: '0',
			previous_month_revenue: '0',
			current_month: currentMonth,
			current_year: '2022',
			previous_month: 'Jul',
			previous_year: '2022',
			to_date: '2022-08-31',
			from_date: '2022-07-01',
		});
		const [isMRRGLoading, setIsMRRGLoading] = useState(false);

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
		const [isARloading, setIsARloading] = useState(false);

		const [appointmentsScheduledInfo, setAppointments] = useState({
			total_appointments: 100,
			from_date: '2022-01-01',
			to_date: '2022-06-27',
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
		}); // const cancelEdit = (widgetId)=>{
		// 	switch(widgetId) {
		// 		case "additional-revenue" :
		// 			setChangeNameStaus({...changeNameStatus,changeARevenueName : false});
		// 		break

		// 		case "new-contacts":
		// 			setChangeNameStaus({...changeNameStatus,changeNContactsName: !changeNameStatus.changeNContactsName});
		// 		break

		// 		case "appointments-scheduled" :
		// 			setChangeNameStaus({...changeNameStatus,changeAScheduledName : false});
		// 		break

		// 		case "mrr" :
		// 			setChangeNameStaus({...changeNameStatus,changeMRRGrowthName : false});
		// 		break

		// 		case "retention" :
		// 			setChangeNameStaus({...changeNameStatus,changeRetentionName : false});
		// 		break

		// 		case "appointments-showed":
		// 			setChangeNameStaus({...changeNameStatus,changeAshowedName : false});
		// 		break

		// 		case"appointments-canceled":
		// 			setChangeNameStaus({...changeNameStatus,changeACancelledName : false});
		// 		break
		// 	}
		// }

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

		const editName = (widgetId, prevValue = null, index) => {
			switch (widgetId) {
				case 'additional-revenue':
					if (prevValue != null && prevValue.length) {
						localStorage.setItem(widgetId, prevValue);
					} else {
						let prevName = localStorage.getItem(widgetId);
						updateWidgetName(prevName, index);
					}

					setChangeNameStaus({
						...changeNameStatus,
						changeARevenueName: !changeNameStatus.changeARevenueName,
					});
					break;

				case 'new-contacts':
					if (prevValue != null && prevValue.length) {
						localStorage.setItem(widgetId, prevValue);
					} else {
						let prevName = localStorage.getItem(widgetId);
						updateWidgetName(prevName, index);
					}

					setChangeNameStaus({
						...changeNameStatus,
						changeNContactsName: !changeNameStatus.changeNContactsName,
					});

					break;

				case 'appointments-scheduled':
					if (prevValue != null && prevValue.length) {
						localStorage.setItem(widgetId, prevValue);
					} else {
						let prevName = localStorage.getItem(widgetId);
						updateWidgetName(prevName, index);
					}
					setChangeNameStaus({
						...changeNameStatus,
						changeAScheduledName: !changeNameStatus.changeAScheduledName,
					});
					break;

				case 'mrr':
					if (prevValue != null && prevValue.length) {
						localStorage.setItem(widgetId, prevValue);
					} else {
						let prevName = localStorage.getItem(widgetId);
						updateWidgetName(prevName, index);
					}
					setChangeNameStaus({
						...changeNameStatus,
						changeMRRGrowthName: !changeNameStatus.changeMRRGrowthName,
					});
					break;

				case 'retention':
					if (prevValue != null && prevValue.length) {
						localStorage.setItem(widgetId, prevValue);
					} else {
						let prevName = localStorage.getItem(widgetId);
						updateWidgetName(prevName, index);
					}
					setChangeNameStaus({
						...changeNameStatus,
						changeRetentionName: !changeNameStatus.changeRetentionName,
					});
					break;

				case 'appointments-showed':
					if (prevValue != null && prevValue.length) {
						localStorage.setItem(widgetId, prevValue);
					} else {
						let prevName = localStorage.getItem(widgetId);
						updateWidgetName(prevName, index);
					}
					setChangeNameStaus({
						...changeNameStatus,
						changeAshowedName: !changeNameStatus.changeAshowedName,
					});
					break;

				case 'appointments-canceled':
					if (prevValue != null && prevValue.length) {
						localStorage.setItem(widgetId, prevValue);
					} else {
						let prevName = localStorage.getItem(widgetId);
						updateWidgetName(prevName, index);
					}
					setChangeNameStaus({
						...changeNameStatus,
						changeACancelledName: !changeNameStatus.changeACancelledName,
					});
					break;
			}
		};

		const saveName = (widgetId) => {
			switch (widgetId) {
				case 'additional-revenue':
					setChangeNameStaus({
						...changeNameStatus,
						changeARevenueName: false,
					});
					break;

				case 'new-contacts':
					setChangeNameStaus({
						...changeNameStatus,
						changeNContactsName: false,
					});
					break;

				case 'appointments-scheduled':
					setChangeNameStaus({
						...changeNameStatus,
						changeAScheduledName: false,
					});
					break;

				case 'mrr':
					setChangeNameStaus({
						...changeNameStatus,
						changeMRRGrowthName: false,
					});
					break;

				case 'retention':
					setChangeNameStaus({
						...changeNameStatus,
						changeRetentionName: false,
					});
					break;

				case 'appointments-showed':
					setChangeNameStaus({ ...changeNameStatus, changeAshowedName: false });
					break;

				case 'appointments-canceled':
					setChangeNameStaus({
						...changeNameStatus,
						changeACancelledName: false,
					});
					break;
			}
			syncWithBackend(widgets);
		};
		const [changeNameStatus, setChangeNameStaus] = useState({
			changeNContactsName: false,
			changeARevenueName: false,
			changeAScheduledName: false,
			changeRetentionName: false,
			changeAshowedName: false,
			changeMRRGrowthName: false,
			changeACancelledName: false,
		});
		const [aShowedGoal, setAShowedGoal] = useState('');

		const [isASLoading, setIsASLoading] = useState(false);
		const [isAShowedLoading, setIsAShowedLoading] = useState(false);
		const [isACloading, setIsACLoading] = useState(false);
		const [isNCloading, setIsNCLoading] = useState(false);
		const [isRetentionloading, setIsRetentionLoading] = useState(false);
		const [saveGoals, setSaveGoals] = useState({
			status: false,
		});
		//helper functions to load widgetData set
		const fetchMRRGWidgetInfo = async (
			month = months.indexOf(currentMonth) + 1,
			year = '2022'
		) => {
			if (month > months.indexOf(currentMonth) + 1) {
				dispatch({
					type: actionTypes.SHOW_MESSAGE,
					message: `Invalid month request  (${
						months[month - 1]
					}). Requested month should not be greater than current month (${currentMonth})`,
					typeMessage: 'warning',
				});
				setMRRGData({
					current_month_revenue: '0.00',
					current_month_projected: '0',
					previous_month_revenue: '0',
					current_month: months[month - 1],
					current_year: '2022',
					previous_month: months[month - 2],
					previous_year: '2022',
					to_date: '2022-08-31',
					from_date: '2022-07-01',
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
					setMRRGData({ ...updatedData });
				}, 100);
			} else {
				dispatch({
					type: actionTypes.SHOW_MESSAGE,
					message: mRRGData,
					typeMessage: 'warning',
				});
				setMRRGData({
					current_month_revenue: '0.00',
					current_month_projected: '0',
					previous_month_revenue: '0',
					current_month: currentMonth,
					current_year: '2022',
					previous_month: 'Jul',
					previous_year: '2022',
					to_date: '2022-08-31',
					from_date: '2022-07-01',
				});
			}
			return true;
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
						month: 'Aug',
						year: '2022',
						from_date: '2022-08-01',
						to_date: '2022-08-31',
						goal: 0,
						progress: null,
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
						total_appointments: 10,
						month: 'Aug',
						year: '2022',
						from_date: '2022-08-01',
						to_date: '2022-08-31',
						goal: 34,
						progress: {
							status: 'down',
							value: 0.29,
							percentage: 29,
						},
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
				let newContactsData = await DashboardServices.fetchNewContacts(
					dayIndex
				);
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

		const setGoal = async (e, month) => {
			let providedMonth =
				month != undefined && month ? month : ashowedSelectedMonth;
			console.log(' providedMonth', providedMonth);
			setAShowedSelectedMonth(providedMonth);
			if (months.indexOf(providedMonth) > months.indexOf(currentMonth)) {
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

		const handleGoalChange = (event, index) => {
			// console.log('event length', event.target.value.length, event);
			if (event.target.value.length > 5) {
				return dispatch({
					type: actionTypes.SHOW_MESSAGE,
					message: 'Goal cannot be more than 5 digits',
					typeMessage: 'warning',
				});
			}

			setAppointmentsShowed({
				...appointmentsShowedInfo,
				goal: event.target.value,
			});
			// setAShowedGoal(event.target.value)
		};

		const saveGoalsFn = async (e, widgetName, index) => {
			e.preventDefault();
			// console.log("inputs",e,widgetName,index)
			let goal = appointmentsShowedInfo.goal;
			// console.log('goal%1', goal % 1, goal);
			if (goal <= 0 || goal % 1 != 0) {
				return dispatch({
					type: actionTypes.SHOW_MESSAGE,
					message:
						'Invalid goal request. Goal should be a non zero, positive and non decimal number',
					typeMessage: 'warning',
				});
			}
			setSetGoals({
				...setGoals,
				status: !setGoals.status,
			});
			// call the service api for setGoal
			let payload = {
				month: months.indexOf(ashowedSelectedMonth) + 1,
				year: 2022,
				widget_id: widgetName,
				goal: parseInt(goal),
			};
			// console.log('Final payload', payload);
			setIsAShowedLoading(true);
			let setGoal = await DashboardServices.setGoal(payload);

			setAppointmentsShowed({
				...appointmentsShowedInfo,
				goal: setGoal.data.goal,
				progress: setGoal.data.progress,
				month: setGoal.data.month,
			});
			setIsAShowedLoading(false);

			// console.log('set goal resp', setGoal);
		};

		const testClick = () => {
			alert('test');
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

		return (
			<>
				<div className='widgetWrapers'>
					{console.log('widgets', widgets)}
					{widgets.map((widget, index) => {
						if (widget.display) {
							return (
								<>
									{/* {console.log("widget isOrgOwner",widget.isOrganizationOwner,"loggedUser",loggedInUser)} */}
									<WidgetSortableListItem
										axis='xy'
										key={index}
										index={index}
										widget={widget}
										mRRGInfo={mRRGInfo}
										isMRRGLoading={isMRRGLoading}
										i={index}
										selectMonthDropdown={selectMonthDropdown}
										additionalRevenueInfo={additionalRevenueInfo}
										isARloading={isARloading}
										appointmentsScheduledInfo={appointmentsScheduledInfo}
										isASLoading={isASLoading}
										isAShowedLoading={isAShowedLoading}
										isACloading={isACloading}
										isNCloading={isNCloading}
										isRetentionloading={isRetentionloading}
										onSelectDaysChange={onSelectDaysChange}
										newContactsInfo={newContactsInfo}
										retentionInfo={retentionInfo}
										appointmentsCancelledInfo={appointmentsCancelledInfo}
										appointmentsShowedInfo={appointmentsShowedInfo}
										setGoal={setGoal}
										setGoals={setGoals}
										handleGoalChange={handleGoalChange}
										aShowedGoal={aShowedGoal}
										saveGoalsFn={saveGoalsFn}
										testClick={testClick}
										editName={editName}
										changeNameStatus={changeNameStatus}
										updateWidgetName={updateWidgetName}
										saveName={saveName}
									/>
								</>
							);
						}
					})}
				</div>
			</>
		);
	}
);

export default DashboardSortableWidgetList;
