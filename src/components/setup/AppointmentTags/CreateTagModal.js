import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../../actions/types";
import tagIconDark from "../../../assets/images/tagIconDark.svg";
import crossIcon from "../../../assets/images/cross.svg";
import arrowForwardIcon from "../../../assets/images/arrow_forward.svg";
import { saveTag, getTagListData } from "../../../actions/TagActions";

const CreateTagModal = (props) => {
	const [newTagName, setNewTagName] = useState("");
	const [formErrorMsg, setFormErrorMsg] = useState(false);

	const dispatch = useDispatch();

	const tagNameHandel = (e) => {
		let val = e.target.value;
		if (/^\s/.test(val)) {
			val = "";
		} else {
			val = e.target.value;
		}
		val.toLowerCase();
		if (val.length < 51) {
			setNewTagName(val);
		}
	};

	const createTag = (param) => {
		if (newTagName !== "") {
			try {
				let payload = { name: newTagName };
				dispatch(saveTag(payload));
				dispatch(getTagListData("all"));
				props.fetchTags();
			} catch (e) {
				dispatch({
					type: actionTypes.SHOW_MESSAGE,
					message: e.message,
					typeMessage: "error",
				});
			} finally {
				setNewTagName("");
				if (!param) {
					props.closeModal();
				}
			}
		} else {
			setFormErrorMsg(true);
		}
	};

	return (
		<div className='modalBackdrop cz_addTagModal'>
			<div
				className='modalBackdropBg'
				onClick={props.closeModal}
			></div>
			<div className='slickModalBody'>
				<div className='slickModalHeader'>
					<button
						className='topCross'
						onClick={props.closeModal}
					>
						<img
							src={crossIcon}
							alt=''
						/>
					</button>
					<div className='circleForIcon'>
						<img
							src={tagIconDark}
							alt=''
						/>
					</div>
					<h3>Add a Tag</h3>
					<p>Please enter below information to Add a new Tag</p>
				</div>
				<div className='modalForm'>
					<form action=''>
						<div
							className={formErrorMsg ? "cmnFormRow errorField" : "cmnFormRow"}
						>
							<lable className='cmnFieldName'>Tag Name</lable>
							<input
								type='text'
								className='cmnFieldStyle'
								value={newTagName}
								onChange={tagNameHandel}
							/>
							{formErrorMsg ? (
								<div className='errorMsg'>Plese enter a tag name</div>
							) : (
								""
							)}
						</div>
						<div className='btnGroup centered'>
							<button
								type='button'
								className='cmnBtn'
								onClick={() => createTag(false)}
							>
								<span>Save</span>
								<img
									src={arrowForwardIcon}
									alt=''
								/>
							</button>
							<button
								type='button'
								className='cmnBtn'
								onClick={() => createTag(true)}
							>
								<span>Save & New</span>
								<img
									src={arrowForwardIcon}
									alt=''
								/>
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateTagModal;
