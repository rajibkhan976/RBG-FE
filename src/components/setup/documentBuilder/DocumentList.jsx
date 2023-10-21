import React, { useEffect, useRef, useState } from "react";
import plus_icon from "../../../assets/images/plus_icon.svg";
import redirectIcon from "../../../assets/images/redirectIcon.svg";
import copyLinkIcon from "../../../assets/images/copyLinkIcon.svg";
import dot3White from "../../../assets/images/dot3gray.svg";
import noRecords from "../../../assets/images/noRecords.svg";
import Pagination from "../../shared/Pagination";
import ConfirmBox from "../../shared/confirmBox";
import { deleteContractDocument } from "../../../actions/documentBuilderActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DocumentList = (props) => {
	document.title = "Red Belt Gym - Documents";
	const [isConfirmed, setConfirmed] = useState({
		show: false,
		id: null,
	});
	const [option, setOption] = useState(null);
	const dispatch = useDispatch();
	const deleteContractDocumentResponse = useSelector(
		(state) => state.documentBuilder.deleteContractDocumentResponse
	);

	/****************************** FUNCTIONS START **********************************/
	const handleEdit = (contractDoc) => {
		setOption(null);
		props.openContractDocModal(true, contractDoc);
	};

	let deleteContractDocTimeout = useRef(null);

	const deleteContractDoc = (docID, isConfirmed = null) => {
		setOption(null);
		if (isConfirmed == null && docID) {
			console.log("Doc ID", docID);
			setConfirmed({
				show: true,
				id: docID,
			});
		} else if (isConfirmed === "cancel") {
			setConfirmed({
				show: false,
				id: null,
			});
		} else {
			props.handleSetIsLoader(true);
			setConfirmed({
				show: false,
				id: null,
			});
			dispatch(deleteContractDocument(docID));
			props.fetchContractDocuments();
		}
	};

	useEffect(() => {
		deleteContractDocTimeout.current = setTimeout(() => {
			props.handleSetIsLoader(false);
		}, 1000);
		return () => {
			clearTimeout(deleteContractDocTimeout.current);
			dispatch({
				type: "RESET_DELETE_CONTRACT_DOCUMENT_RESPONSE",
				data: null,
			});
		};
	}, [deleteContractDocumentResponse]);

	const toogleActionList = (index) => {
		setOption(index !== option ? index : null);
	};

	const base_url = window.location.origin;

	const handleCopyUrl = (urlPrefix) => {
		if (urlPrefix) {
			navigator.clipboard.writeText(`${base_url}${urlPrefix}`);
		}
	};

	console.log(props.contractDocument);
	console.log("Document Pagination", props.paginationData);

	return (
		<>
			{isConfirmed.show ? (
				<ConfirmBox
					callback={(confirmedMsg) =>
						deleteContractDoc(isConfirmed.id, confirmedMsg)
					}
				/>
			) : (
				""
			)}
			<div className='dashInnerUI productSteUp'>
				<div className='userListHead product'>
					<div className='listInfo'>
						<ul className='listPath'>
							<li>Settings </li>
							<li>Document Builder</li>
						</ul>
						<h2 className='inDashboardHeader'>
							Documents (
							{props.paginationData.count ? props.paginationData.count : 0})
						</h2>
						<p className='userListAbout'>Manage your documents</p>
					</div>
					<div className='listFeatures'>
						<button
							className='creatUserBtn'
							onClick={props.openContractDocModal}
						>
							<img
								className='plusIcon'
								src={plus_icon}
								alt=''
							/>
							<span>Create new</span>
						</button>
					</div>
				</div>
				<div className='productViewType d-flex'></div>
				<div className='productListBody'>
					<div className='productListing'>
						{props.contractDocument?.length ? (
							props.contractDocument?.map((elem, key) => {
								return (
									<React.Fragment key={key + "_documents"}>
										<div className='contract-doc-list'>
											<div className='contract-doc-left'>
												<div className='contract-doc-title'>{elem.title}</div>
											</div>
											<div className='contract-doc-right'>
												<div className='contract-doc-actions'>
													<Link
														className='doc-redirect-link'
														target='_blank'
														to={{
															pathname: `/document/${elem._id}`,
															// search: "?sort=name",
															// hash: "#the-hash",
															// state: { fromDashboard: true }
														}}
													>
														<img
															className='redirect-icon'
															src={redirectIcon}
															alt=''
														/>
													</Link>
													<img
														className='copy-link-icon'
														src={copyLinkIcon}
														alt=''
														onClick={() =>
															handleCopyUrl(`/document/${elem._id}`)
														}
													/>
													<img
														className='three-dot-icon'
														src={dot3White}
														alt=''
														onClick={() => toogleActionList(key)}
													/>
													<div
														className={
															option === key
																? "dropdownOptions listOpen"
																: "listHide"
														}
													>
														{" "}
														{/*//listHide class is to be replaced with listOpen to hide it */}
														<button
															className='btn btnEdit'
															onClick={() => handleEdit(elem)}
														>
															<span>
																<svg
																	xmlns='http://www.w3.org/2000/svg'
																	viewBox='0 0 13.553 13.553'
																	className='editIcon'
																>
																	<g transform='translate(0.75 0.75)'>
																		<path
																			className='a'
																			d='M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423'
																			transform='translate(-2 -2.795)'
																		></path>
																		<path
																			className='a'
																			d='M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z'
																			transform='translate(-4.384 -2)'
																		></path>
																	</g>
																</svg>
															</span>{" "}
															Edit
														</button>
														<button
															className='btn btnDelete'
															onClick={() => deleteContractDoc(elem._id)}
														>
															<span>
																<svg
																	className='deleteIcon'
																	xmlns='http://www.w3.org/2000/svg'
																	width='12.347'
																	height='13.553'
																	viewBox='0 0 12.347 13.553'
																>
																	<g transform='translate(0.75 0.75)'>
																		<path
																			className='a'
																			d='M3,6H13.847'
																			transform='translate(-3 -3.589)'
																		/>
																		<path
																			className='a'
																			d='M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411'
																			transform='translate(-3.795 -2)'
																		/>
																		<line
																			className='a'
																			y2='3'
																			transform='translate(4.397 6.113)'
																		/>
																		<line
																			className='a'
																			y2='3'
																			transform='translate(6.397 6.113)'
																		/>
																	</g>
																</svg>
															</span>
															Delete
														</button>
													</div>
												</div>
											</div>
										</div>
									</React.Fragment>
								);
							})
						) : (
							<div className='createNew noInfos'>
								<div className='noRecordsImgWraper'>
									<img
										src={noRecords}
										className='noRecords'
										alt=''
									/>
									<h4>No Document Builder Found</h4>
									<p>No Document Builder have been listed here yet</p>
								</div>
							</div>
						)}
					</div>
				</div>
				{props.paginationData.count > props.paginationData.limit ? (
					<Pagination
						paginationData={props.paginationData}
						dataCount={props.paginationData.count}
						callback={props.fetchContractDocuments}
					/>
				) : (
					""
				)}
			</div>
		</>
	);
};

export default DocumentList;
