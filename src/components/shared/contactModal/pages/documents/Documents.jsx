import React, { useEffect, useState } from "react";
import Loader from "../../../Loader";
import sortIcon from "../../../../../assets/images/sortIcon.svg";
import redirectIcon from "../../../../../assets/images/redirectIcon.svg";
import noRecords from "../../../../../assets/images/noRecords.svg";
import {
	getContractDocumentsByContactId,
	getDocumentCategory,
} from "../../../../../actions/documentBuilderActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { Scrollbars } from "react-custom-scrollbars-2";

const Documents = (props) => {
	const { contactId } = props;
	const dispatch = useDispatch();
	const [sortDesc, setSortDesc] = useState(false);
	const contactsContractDocumentsData = useSelector(
		(state) => state.documentBuilder.contactsContractDocumentsData
	);
	const documentCategories = useSelector(
		(state) => state.documentBuilder.documentCategories
	);

	useEffect(() => {
		dispatch(getDocumentCategory());
	}, []);

	useEffect(() => {
		if (contactId) {
			dispatch(getContractDocumentsByContactId(contactId));
		}
	}, [contactId]);

	console.log(contactsContractDocumentsData);
	console.log(documentCategories);

	return (
		<div className='contact-documents'>
			<h2 className='contact-documents-header'>
				Documents (
				{contactsContractDocumentsData
					? contactsContractDocumentsData.length
					: 0}
				)
			</h2>
			<Scrollbars
				renderThumbVertical={(props) => <div className='thumb-vertical' />}
			>
				<div className='innerScroll'>
					<div className='contact-documents-list-header'>
						<div className='contract-doc-title list-header-col'>Title</div>
						<div className='contract-doc-title list-header-col'>Category</div>
						<div className='contract-doc-title list-header-col'>
							Date & Time
							<img
								className='sort-icon'
								src={sortIcon}
								alt={sortIcon}
								onClick={() => setSortDesc(!sortDesc)}
							/>
						</div>
						<div className='contract-doc-title list-header-col contract-doc-actions'>
							Action
						</div>
					</div>
					{!contactsContractDocumentsData ? (
						<Loader />
					) : contactsContractDocumentsData.length > 0 ? (
						contactsContractDocumentsData
							?.sort((a, b) => {
								const dateA = a.timestamp;
								const dateB = b.timestamp;
								if (sortDesc) {
									if (dateA < dateB) {
										return 1;
									}
									if (dateA > dateB) {
										return -1;
									}
								} else {
									if (dateA < dateB) {
										return -1;
									}
									if (dateA > dateB) {
										return 1;
									}
								}

								return 0;
							})
							?.map((elem, key) => (
								<React.Fragment key={key + "_documents"}>
									<div className='contacts-contract-doc-list'>
										<div className='contract-doc-list-item'>
											<div className='contract-doc-title'>
												{elem?.document?.title}
											</div>
										</div>
										<div className='contract-doc-list-item'>
											<div className='contract-doc-title'>
												{
													documentCategories?.find(
														(item) => item?._id === elem?.document?.category_id
													)?.name
												}
											</div>
										</div>
										<div className='contract-doc-list-item'>
											<div className='contract-doc-title'>
												{moment(elem?.timestamp).format("MMM DD, YYYY h:mm A")}
											</div>
										</div>
										<div className='contract-doc-list-item contract-doc-list-action'>
											<div className='contract-doc-actions doc-redirect-icon'>
												<Link
													className='doc-redirect-link'
													target='_blank'
													to={{
														pathname: `/document`,
														search: `?contactId=${elem?.contact_id}&contractId=${elem?.document_id}`,
													}}
												>
													<img
														className='redirect-icon'
														src={redirectIcon}
														alt=''
													/>
												</Link>
											</div>
										</div>
									</div>
								</React.Fragment>
							))
					) : (
						<div className='contact-documents-norecord'>
							<div className='no-records-content'>
								<img
									src={noRecords}
									className='noRecords'
									alt=''
								/>
								<h4 className='no-doc-txt'>No Document Builder Found</h4>
								<p className='no-doc-subtxt'>
									No Document Builder have been listed here yet
								</p>
							</div>
						</div>
					)}
				</div>
			</Scrollbars>
		</div>
	);
};

export default Documents;
