import React, {useState, useEffect} from 'react';
import drag from '../../../src/assets/images/drag.svg';
import line_chart from '../../../src/assets/images/line-chart.svg';

const DashboardControls = (props) => {
	const loadWidgetControls = () => {
		if (props.widgetList.length > 0) {
			return props.widgetList.map((widget, i) => {
				return (
					<>
						{widget.isOrganizationOwner &&
						props.loggedInUser?.isOrganizationOwner == true ? (
							<li key={i}>
								<label>
									<div className='customCheckbox'>
										<input
											type='checkbox'
											defaultChecked={widget.shouldDisplay}
											onClick={() => props.updateWidgetControl(widget.name)}
										/>
										<span></span>
									</div>

									<span>{widget.name}</span>
									{/* <img src={drag} className='dragImg' /> */}
								</label>
							</li>
						) : (
							''
						)}

						{widget.isOrganizationOwner != true ? (
							<li key={i}>
								<label>
									<div className='customCheckbox'>
										<input
											type='checkbox'
											defaultChecked={widget.shouldDisplay}
											onClick={() => props.updateWidgetControl(widget.name)}
										/>
										<span></span>
									</div>

									<span>{widget.name}</span>
									{/* <img src={drag} className='dragImg' /> */}
								</label>
							</li>
						) : (
							''
						)}
					</>
				);
			});
		} else {
			return 'No customizations found';
		}
	};
	return (
		<>
			<div className='sideMenuOuter filterUserMenu'>
				<div className='sideMenuInner dashboardSideBar'>
					<button className='btn btn-closeSideMenu' onClick={props.closeModal}>
						<span></span>
						<span></span>
					</button>
					<div className='sideMenuHeader'>
						<h3>Widget Customization</h3>
						{/* <p>Lorem ipsum dolor sit amet.</p> */}
					</div>
					<ul>{loadWidgetControls()}</ul>
				</div>
			</div>
		</>
	);
};
export default DashboardControls;
