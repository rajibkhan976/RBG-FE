import { useState } from "react";
import arrowRightWhite from "../../assets/images/arrowRightWhite.svg";
import crossTop from "../../assets/images/cross.svg";
import tagIcon from "../../assets/images/tagIcon.svg";
import cross_w from "../../assets/images/cross_w.svg";
import { useSelector, useDispatch } from 'react-redux';

const ShowContactTagModal = (props) => {
	const [tagList, setTagList] = useState(props.tagList);
	console.log("tagList", props.tagList);

	const deleteTag = (tagId) => {
		let filteredTags = tagList.filter((el) => el._id !== tagId);
		console.log(filteredTags, tagId);
		setTagList(filteredTags);
		props.removeTag(tagId);
	};
	let zIndexBody = useSelector((state) => state.modal.zIndexBody);
	return (
		<>
			<div className='modalBackdrop modalAddholiday' style={{zIndex: 101}}>
				<div className='slickModalBody'>
					<div className='slickModalHeader'>
						<button
							className='topCross'
							onClick={props.closeModal}
						>
							<img
								src={crossTop}
								alt=''
							/>
						</button>
						<div className='circleForIcon'>
							<img
								src={tagIcon}
								alt=''
							/>
						</div>
						<h3>Tags</h3>
						<p>Please hover on a tag to remove.</p>
					</div>
					<div className='modalForm auto'>
						<div className='tagContainer'>
							{tagList.length > 0 &&
								tagList.map((tag, key) => (
									<span
										key={key}
										class='indTags'
									>
										<span class='labelSelected'>{tag.name}</span>
										<span
											class='closeTag'
											onClick={() => deleteTag(tag._id)}
										>
											<img
												src={cross_w}
												alt=''
											/>
										</span>
									</span>
								))}
						</div>
						<div className='modalbtnHolder'>
							<button
								type='button'
								onClick={props.closeModal}
								className='saveNnewBtn'
							>
								<span>Close</span>
								<img
									src={arrowRightWhite}
									alt={arrowRightWhite}
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ShowContactTagModal;
