import React, { useEffect, useState } from "react";
import closewhite24dp from "../../../../assets/images/close_white_24dp.svg";
import chevron_right_white_24dp from "../../../../assets/images/chevron_right_white_24dp.svg";
import Select from "react-select";
import * as actionTypes from "../../../../actions/types";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../shared/Loader";
import { getTagListData } from "../../../../actions/TagActions";

const RemoveTagModal = (props) => {
	const dispatch = useDispatch();
	const tagListData = useSelector((state) => state.tag.tagListData);
	const [selectedTag, setSelectedTag] = useState("");
	const [options, setOptions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [closeMessage, setCloseMessage] = useState(false);
	const handleChangeFields = (e) => {
		setSelectedTag(e);
	};
	const [selectValue, setSelectValue] = useState("");
	const handleInputChange = (inputValue) => {
		setSelectValue(inputValue);
		setCloseMessage(true);
	};

	const fetchTags = () => {
		setIsLoading(true);
		try {
			dispatch(getTagListData("all"));
			setIsLoading(false);
		} catch (e) {
			setIsLoading(false);
			dispatch({
				type: actionTypes.SHOW_MESSAGE,
				message: e.message,
				typeMessage: "error",
			});
		}
	};

	useEffect(() => {
		if (tagListData && tagListData.tags) {
			setIsLoading(false);
			let options = [];
			tagListData.tags.forEach((value) => {
				options.push({
					value: value._id,
					label: value.name,
				});
			});
			setOptions(options);
		}
	}, [tagListData]);

	const saveTag = () => {
		if (selectedTag && selectedTag.length && selectedTag.value !== "") {
			props.saveTag(props.elem.id, selectedTag);
		} else {
			dispatch({
				type: actionTypes.SHOW_MESSAGE,
				message: "Please select a tag.",
				typeMessage: "error",
			});
		}
	};

	useEffect(() => {
		if (props.elem && props.elem.data && props.elem.data.tag) {
			setSelectedTag(props.elem.data.tag);
		}
		fetchTags();
	}, []);

	return (
		<>
			<div className='automationModal filterModal tagModal'>
				<div
					className='automationModalBg'
					onClick={props.closeFilterModal}
				></div>
				<div className='nodeSettingModal tagSettingModal notOverlap'>
					<div className='formHead'>
						<div className='heading'>
							{/* <p>{props.tagModalType} Tag Settingss</p> */}
							<p>Remove tags</p>
						</div>
						<div className='closeButton'>
							<button onClick={props.closeFilterModal}>
								<img
									src={closewhite24dp}
									alt='Close Filter Modal'
								/>
							</button>
						</div>
					</div>
					<div className='formBody'>
						{isLoading ? <Loader /> : ""}
						<div className='formBodyContainer addTagFromContainer'>
							<div className='emailDetails'>
								<div className='inputField'>
									<label htmlFor='delayTm'>Select Tag</label>
									<div className='inFormField'>
										<Select
											name='city'
											isMulti
											className='multiSelect'
											openMenuOnFocus={true}
											// ref={selectRef}
											value={selectedTag}
											onChange={(e) => handleChangeFields(e)}
											onInputChange={handleInputChange}
											options={options}
											isClearable={true}
											placeholder='Select a Tag'
											maxMenuHeight={215}
										/>
									</div>
								</div>
							</div>
							<div className='saveButton'>
								<button onClick={saveTag}>
									Save{" "}
									<img
										src={chevron_right_white_24dp}
										alt=''
									/>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default RemoveTagModal;
