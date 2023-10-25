import React, { useEffect, useState } from "react";
import moment from "moment";
import Loader from "../../../Loader";
import sortIcon from "../../../../../assets/images/sortIcon.svg";
import redirectIcon from "../../../../../assets/images/redirectIcon.svg";
import noRecords from "../../../../../assets/images/noRecords.svg";
import {
	getContractDocumentsByContactId,
	getContractDocumentsByContactIdAndContractId,
	getDocumentCategory,
} from "../../../../../actions/documentBuilderActions";
import { useDispatch, useSelector } from "react-redux";

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
	const contactsContractDocument = useSelector(
		(state) => state.documentBuilder.contactsContractDocument
	);

	useEffect(() => {
		dispatch(getDocumentCategory());
	}, []);

	useEffect(() => {
		if (contactId) {
			dispatch(getContractDocumentsByContactId(contactId));
		}
	}, [contactId]);

	const handleDownloadContractDoc = (contactId, contractId) => {
		dispatch(
			getContractDocumentsByContactIdAndContractId(contactId, contractId)
		);
	};

	useEffect(() => {
		if (
			contactsContractDocument &&
			Array.isArray(contactsContractDocument) &&
			contactsContractDocument.length > 0
		) {
			window.open(contactsContractDocument[0]?.signed_doc_url, "_blank");
		}
	}, [contactsContractDocument]);

	if (!contactsContractDocumentsData) {
		return <Loader />;
	}

	return (
		<div className='contact-documents'>
			<h2 className='contact-documents-header'>
				Documents (
				{contactsContractDocumentsData
					? contactsContractDocumentsData.length
					: 0}
				)
			</h2>
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
			<div className='innerMenuScroll'>
				{contactsContractDocumentsData.length > 0 ? (
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
											<img
												className='redirect-icon'
												src={redirectIcon}
												alt=''
												onClick={() =>
													handleDownloadContractDoc(elem?.contact_id, elem?._id)
												}
											/>
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
		</div>
	);
};

export default Documents;
