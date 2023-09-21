import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "../../../actions/types";
import plusIcon from "../../../assets/images/plus_icon.svg";
import cressIcon from "../../../assets/images/white_cross_roundedCorner.svg";
import noRecords from "../../../assets/images/noRecords.svg";
import Loader from "../../shared/Loader";
import CreateTagModal from "./CreateTagModal";
import ConfirmBox from "../../shared/confirmBox";
import { getTagListData, removeTag } from "../../../actions/TagActions";

const AppointmentTags = (props) => {
	const [tagList, setTaglist] = useState([]);
	const [createTagModal, setCreateTagModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [deleteConfirm, setDeleteConfirm] = useState(false);
	const [deleteTagId, setDeleteTagId] = useState(null);

	const dispatch = useDispatch();
	const tagListData = useSelector((state) => state.tag.tagListData);
	const deletedTag = useSelector((state) => state.tag.deletedTag);
	const serviceError = useSelector((state) => state.tag.serviceError);

	const fetchTags = () => {
		setLoading(true);
		dispatch(getTagListData("all"));
	};

	useEffect(() => {
		fetchTags();
	}, []);

	useEffect(() => {
		if (tagListData && tagListData.tags) {
			setTaglist(tagListData.tags);
			setLoading(false);
		}
	}, [tagListData]);

	const openCreateTagModal = () => {
		setCreateTagModal(true);
	};

	const closeModal = () => {
		setCreateTagModal(false);
	};

	const popupLoader = (status) => {
		setLoading(status);
	};

	const deleteTagHandel = (item) => {
		setDeleteConfirm(true);
		setDeleteTagId(item._id);
	};

	const deleteTag = (param) => {
		if (param?.toLowerCase() === "yes") {
			setLoading(true);
			dispatch(removeTag(deleteTagId));
		} else {
			setDeleteConfirm(false);
			setDeleteTagId(null);
		}
	};

	useEffect(() => {
		if (deletedTag) {
			dispatch({
				type: actionTypes.SHOW_MESSAGE,
				message: deletedTag.message,
				typeMessage: "success",
			});
			setDeleteConfirm(false);
			setDeleteTagId(null);
			fetchTags();
			setLoading(false);
		}
	}, [deletedTag]);

	useEffect(() => {
		if (serviceError) {
			setDeleteConfirm(false);
			setDeleteTagId(null);
			setLoading(false);
		}
		return () => {
			dispatch({
				type: actionTypes.TAG_SERVICE_REQUEST_FAILED,
				data: false,
			});
		};
	}, [serviceError]);

	return (
		<div className='dashInnerUI cz_tagPage'>
			{loading ? (
				<Loader />
			) : (
				<>
					<div className='userListHead'>
						<div className='listInfo'>
							<ul className='listPath'>
								<li>Setup</li>
								<li>Customization</li>
								<li>Tags</li>
							</ul>
							<h2 className='inDashboardHeader'>Tags ({tagList?.length})</h2>
							<p className='userListAbout'>
								Lorem ipsum dolor sit amet. Semi headline should.
							</p>
						</div>
						<div className='listFeatures'>
							<button
								className='creatUserBtn'
								onClick={openCreateTagModal}
							>
								<img
									className='plusIcon'
									src={plusIcon}
									alt=''
								/>
								<span>Create</span>
							</button>
						</div>
					</div>
					<div className='cz_body'>
						{tagList?.length > 0 ? (
							<ul className='cz_tagList'>
								{tagList?.map((item, index) => {
									return (
										<li
											className='cz_tag'
											key={"tag_" + index}
										>
											{item.name}
											<button
												type='button'
												onClick={() => deleteTagHandel(item)}
											>
												<img
													src={cressIcon}
													alt=''
												/>
											</button>
										</li>
									);
								})}
							</ul>
						) : (
							<div className='createNew noInfos cz_noRecord'>
								<div className='noRecordsImgWraper'>
									<img
										src={noRecords}
										className='noRecords'
										alt=''
									/>
									<h4>No Tags Found</h4>
									<p>No appointment tags have been listed here yet</p>
								</div>
								<button
									className='creatUserBtn'
									onClick={openCreateTagModal}
								>
									<img
										className='plusIcon'
										src={plusIcon}
										alt=''
									/>
									<span>Create the First Tag</span>
								</button>
							</div>
						)}
					</div>
					{createTagModal && (
						<CreateTagModal
							closeModal={closeModal}
							loader={popupLoader}
							fetchTags={fetchTags}
						/>
					)}
					{deleteConfirm && (
						<ConfirmBox
							message='Once you delete this tag, this will be deleted from associated products. Are you sure, you want to delete?'
							callback={deleteTag}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default AppointmentTags;
