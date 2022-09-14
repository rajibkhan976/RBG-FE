import React, { useState, useEffect, useRef } from 'react';
import drag from '../../../src/assets/images/drag.svg';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const DashboardControls = (props) => {
	const ref = useRef()
	const onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}
		console.log(props)
		let sorting = {
			oldIndex : result.source.index,
			newIndex : result.destination.index
		}
		props.onSortEnd(sorting)
		console.log("reorderin", result)
	}
	const loadWidgetControls = (provided) => {
		if (props.widgetList.length > 0) {
			return props.widgetList.map((widget, i) => {
				return (
					<Draggable key={widget.id} draggableId={widget.id} index={i}>
						{(provided, snapshot) => (
							<>
								{widget.isOrganizationOwner &&
								props.loggedInUser?.isOrganizationOwner == true ? (
									<li ref={provided.innerRef}
										{...provided.draggableProps}
										key={i}>
										<label>
											<div className='customCheckbox'>
												<input
													type='checkbox'
													defaultChecked={widget.display}
													onClick={() => props.updateWidgetControl(widget.name)}
												/>
												<span></span>
											</div>

											<span>{widget.name}</span>
											<img {...provided.dragHandleProps} src={drag} className='dragImg' />
										</label>
									</li>
								) : (
									''
								)}

								{widget.isOrganizationOwner != true ? (
									<li ref={provided.innerRef}
										{...provided.draggableProps}
										key={i}>
										<label>
											<div className='customCheckbox'>
												<input
													type='checkbox'
													defaultChecked={widget.display}
													onClick={() => props.updateWidgetControl(widget.name)}
												/>
												<span></span>
											</div>

											<span>{widget.name}</span>
											<img {...provided.dragHandleProps} src={drag} className='dragImg' />
										</label>
									</li>
								) : (
									''
								)}
							</>
						)}
					</Draggable>
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
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="dropPlate">
							{(provided) => {
								return (
									<ul ref={provided.innerRef}>{loadWidgetControls(provided)}

										{provided.placeholder}
									</ul>
								)
							}}
						</Droppable>

					</DragDropContext>
				</div>
			</div>
		</>
	)

};
export default DashboardControls;
