import { useEffect, useRef, useState } from "react";
import modalTopIcon from "../../../assets/images/setupicon5.svg";
import crossTop from "../../../assets/images/cross.svg";
import arrow_forward from "../../../assets/images/arrow_forward.svg";
import arrow_backward from "../../../assets/images/leftCaretIcon.svg";
import Loader from "../../shared/Loader";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Editor } from "@tinymce/tinymce-react";
import * as actionTypes from "../../../actions/types";
import { useDispatch, useSelector } from "react-redux";
import {
	createContractDocument,
	getContractDocuments,
	updateContractDocument,
} from "../../../actions/documentBuilderActions";

const CreateDocumentModal = (props) => {
	const selectableFields = [
		{ field: "name", type: "string", hasMandatoryField: false },
		{ field: "phone", type: "number", hasMandatoryField: false },
		{ field: "Email id", type: "string", hasMandatoryField: true },
		{ field: "Company name", type: "string", hasMandatoryField: true },
		{ field: "Emergency number", type: "string", hasMandatoryField: true },
		{ field: "Notes", type: "string", hasMandatoryField: true },
		{ field: "Contact type", type: "string", hasMandatoryField: true },
		{ field: "Date of birth", type: "string", hasMandatoryField: true },
		{ field: "Address 1", type: "string", hasMandatoryField: true },
		{ field: "Address 2", type: "string", hasMandatoryField: true },
		{ field: "State", type: "string", hasMandatoryField: true },
		{ field: "Zip", type: "string", hasMandatoryField: true },
		{ field: "Source", type: "string", hasMandatoryField: true },
		{ field: "Source details", type: "string", hasMandatoryField: true },
		{ field: "Mother name", type: "string", hasMandatoryField: true },
		{ field: "Father name", type: "string", hasMandatoryField: true },
		{ field: "Company", type: "string", hasMandatoryField: true },
		{ field: "Job role", type: "string", hasMandatoryField: true },
		{ field: "Status", type: "string", hasMandatoryField: true },
		{ field: "Phase", type: "string", hasMandatoryField: true },
		{ field: "Created by", type: "string", hasMandatoryField: true },
	];
	const [isLoader, setIsLoader] = useState(false);
	const [editableContractDocId, setEditableContractDocId] = useState("");
	const editorCreateRef = useRef(null);
	const [contractHeader, setContractHeader] = useState("");
	const [contractBody, setContractBody] = useState(null);
	const [selectedFields, setSelectedFields] = useState([
		{
			field: "name",
			type: "string",
			mandatory: true,
		},
		{
			field: "phone",
			type: "number",
			mandatory: true,
		},
		{
			field: "esign",
			type: "checkbox",
			mandatory: true,
		},
	]);
	const [contractCategory, setContractCategory] = useState("");
	const [contractTitle, setContractTitle] = useState("");
	const [mandatoryFieldsList, setMandatoryFieldsList] = useState([]);
	const [isReadyForNextStep, setIsReadyForNextStep] = useState(false);
	const [dirty, setDirty] = useState(false);
	const base_url = window.location.origin;
	const [errorClass, setErrorClass] = useState({
		header: "",
		headerMsg: "",
		body: "",
		bodyMsg: "",
		category: "",
		categoryMsg: "",
		title: "",
		titleMsg: "",
	});
	const [isEditing, setIsEditing] = useState(false);
	const dispatch = useDispatch();
	const createContractDocumentResponse = useSelector(
		(state) => state.documentBuilder.createContractDocumentResponse
	);
	const updateContractDocumentResponse = useSelector(
		(state) => state.documentBuilder.updateContractDocumentResponse
	);

	useEffect(() => {
		if (Object.keys(props.updateContractDocument).length) {
			const updateItem = props.updateContractDocument;
			console.log("Selected Contract Document", updateItem);
			setEditableContractDocId(updateItem?._id);
			setContractHeader(updateItem?.header);
			setContractBody(updateItem?.body);
			setSelectedFields(updateItem?.fields);
			setContractCategory(updateItem?.category_id);
			setContractTitle(updateItem?.title);
			setIsEditing(true);
		}

		return () => {
			setEditableContractDocId("");
			setContractHeader("");
			setContractBody(null);
			setSelectedFields([
				{
					field: "name",
					type: "string",
					mandatory: true,
				},
				{
					field: "phone",
					type: "number",
					mandatory: true,
				},
				{
					field: "esign",
					type: "checkbox",
					mandatory: true,
				},
			]);
			setContractCategory("");
			setContractTitle("");
			setIsEditing(false);
		};
	}, [props.updateContractDocument]);

	const handleChange = (e) => {
		const elemName = e.target.name;
		const elemValue = e.target.value;
		const regex = {
			numericRegex: /[^0-9.]/,
			alphaRegex: /[^a-zA-Z0-9- ]/,
		};
		switch (elemName) {
			case "contractHeader":
				if (!regex.alphaRegex.test(elemValue)) {
					setContractHeader(elemValue);
					setErrorClass((prevState) => ({
						...prevState,
						header: "",
						headerMsg: "",
					}));
				}
				break;
			case "category":
				if (!regex.alphaRegex.test(elemValue)) {
					setContractCategory(elemValue);
					setErrorClass((prevState) => ({
						...prevState,
						category: "",
						categoryMsg: "",
					}));
				}
				break;
			case "title":
				if (!regex.alphaRegex.test(elemValue)) {
					setContractTitle(elemValue);
					setErrorClass((prevState) => ({
						...prevState,
						title: "",
						titleMsg: "",
					}));
				}
				break;

			default:
				break;
		}
	};

	const handleOnEditorChange = (bodyData) => {
		setContractBody(bodyData);
		if (bodyData) {
			setErrorClass((prevState) => ({
				...prevState,
				body: "",
				bodyMsg: "",
			}));
		}
	};

	const onChangeSelectableField = (event) => {
		event.stopPropagation();
		const targetName = event.target.name;
		selectableFields.forEach((item) => {
			if (
				(item.field === targetName || targetName === "esign") &&
				selectedFields.length < 1
			) {
				setSelectedFields([
					{
						field: targetName,
						type: targetName === "esign" ? "checkbox" : item.type,
						mandatory:
							targetName === "name" ||
							targetName === "phone" ||
							targetName === "esign"
								? true
								: false,
					},
				]);
			} else if (
				(item.field === targetName || targetName === "esign") &&
				selectedFields.length > 0 &&
				selectedFields.every((element) => element.field !== targetName)
			) {
				setSelectedFields([
					...selectedFields,
					{
						field: targetName,
						type: targetName === "esign" ? "checkbox" : item.type,
						mandatory:
							targetName === "name" ||
							targetName === "phone" ||
							targetName === "esign"
								? true
								: false,
					},
				]);
			} else if (
				(item.field === targetName || targetName === "esign") &&
				selectedFields.length > 0 &&
				selectedFields.some((element) => element.field === targetName)
			) {
				setSelectedFields(
					selectedFields.filter((element) => element?.field !== targetName)
				);
			}
		});
	};

	const onChangeMandatoryCheck = (event) => {
		event.stopPropagation();
		const targetName = event.target.name;
		const targetCheckedState = event.target.checked;
		const copyOfSelectedFields = selectedFields;
		const targetIndex = copyOfSelectedFields.findIndex(
			(item) => item?.field === targetName
		);
		if (targetIndex > -1 && copyOfSelectedFields.length > 0) {
			copyOfSelectedFields[targetIndex].mandatory = targetCheckedState;
			!mandatoryFieldsList.includes(targetName)
				? setMandatoryFieldsList([...mandatoryFieldsList, targetName])
				: setMandatoryFieldsList(
						mandatoryFieldsList.filter((item) => item !== targetName)
				  );
		}
		setSelectedFields(copyOfSelectedFields);
	};

	const onClickNextStep = (event) => {
		event.preventDefault();
		if (!contractHeader) {
			setErrorClass((prevState) => {
				return {
					...prevState,
					header: "error",
					headerMsg: "Please enter contract header",
				};
			});
		}

		if (!contractBody) {
			setErrorClass((prevState) => ({
				...prevState,
				body: "error",
				bodyMsg: "Please enter contract body",
			}));
		}
		if (contractHeader && contractBody) setIsReadyForNextStep(true);
	};

	const createValidation = () => {
		let bool = true;
		if (!contractHeader) {
			bool = false;
			setErrorClass((prevState) => ({
				...prevState,
				header: "error",
				headerMsg: "Please enter contract header",
			}));
		}

		if (!contractBody) {
			bool = false;
			setErrorClass((prevState) => ({
				...prevState,
				body: "error",
				bodyMsg: "Please enter contract body",
			}));
		}

		if (!contractCategory) {
			bool = false;
			setErrorClass((prevState) => ({
				...prevState,
				category: "error",
				categoryMsg: "Please select a category",
			}));
		}

		if (!contractTitle) {
			bool = false;
			setErrorClass((prevState) => ({
				...prevState,
				title: "error",
				titleMsg: "Please enter contract title",
			}));
		}

		if (bool) {
			setErrorClass({
				header: "",
				headerMsg: "",
				body: "",
				bodyMsg: "",
				category: "",
				categoryMsg: "",
				title: "",
				titleMsg: "",
			});
		}
		return bool;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			if (createValidation()) {
				setIsLoader(true);
				props.closeContractDocModal("fetch");
				const data = {
					title: contractTitle,
					header: contractHeader,
					body: btoa(contractBody),
					fields: selectedFields,
					category_id: contractCategory,
				};
				editableContractDocId
					? dispatch(updateContractDocument(data, editableContractDocId))
					: dispatch(createContractDocument(data));
				dispatch(getContractDocuments());
			}
		} catch (e) {
			dispatch({
				type: actionTypes.SHOW_MESSAGE,
				message: e.message,
				typeMessage: "error",
			});
		}
	};

	useEffect(() => {
		setIsLoader(false);
		return () => {
			dispatch({
				type: "RESET_CREATE_CONTRACT_DOCUMENT_RESPONSE",
				data: null,
			});
		};
	}, [createContractDocumentResponse]);

	useEffect(() => {
		setIsLoader(false);
		return () => {
			dispatch({
				type: "RESET_UPDATE_CONTRACT_DOCUMENT_RESPONSE",
				data: null,
			});
		};
	}, [updateContractDocumentResponse]);

	return (
		<>
			<div className='modalBackdrop modalProductAdd'>
				<div
					className='dialogBg'
					onClick={props.closeContractDocModal}
				></div>
				{isLoader ? <Loader /> : ""}
				<div className='slickModalBody create-document-modal-body'>
					<div className='slickModalHeader'>
						<button
							className='topCross'
							onClick={props.closeContractDocModal}
						>
							<img
								src={crossTop}
								alt=''
							/>
						</button>
						<div className='circleForIcon'>
							<img
								src={modalTopIcon}
								alt=''
							/>
						</div>
						<h3>{isEditing ? "Edit" : "Create"} Document</h3>
						{!isEditing ? (
							<p>Choose a category to add a new product below</p>
						) : (
							""
						)}
					</div>
					<div className='modalForm'>
						<Scrollbars
							renderThumbVertical={(props) => (
								<div className='thumb-vertical' />
							)}
						>
							<form
								method='post'
								onSubmit={handleSubmit}
							>
								{!isReadyForNextStep && (
									<>
										<div className={"formControl " + errorClass.header}>
											<label>Header</label>
											<input
												type='text'
												placeholder='Contract header'
												name='contractHeader'
												onChange={handleChange}
												value={contractHeader}
												className='cmnFieldStyle'
											/>
											<span className='errorMsg'>{errorClass.headerMsg}</span>
										</div>
										<div className={"formControl " + errorClass.body}>
											<label>Body</label>
											<div
												className={
													errorClass.bodyMsg
														? "cmnFormField createNewEmailField error editor-width"
														: "cmnFormField createNewEmailField editor-width"
												}
											>
												<Editor
													apiKey='u8o9qjaz9gdqhefua3zs1lyixgg709tgzlqredwdnd0452z0'
													statusBar={true}
													onInit={(evt, editor) =>
														(editorCreateRef.current = editor)
													}
													onDirty={() => setDirty(true)}
													theme='advanced'
													onEditorChange={(newText) =>
														handleOnEditorChange(newText)
													}
													init={{
														height: "100%",
														menubar: false,
														plugins: [
															"advlist autolink lists link image charmap print preview anchor",
															"searchreplace visualblocks code fullscreen",
															"insertdatetime media table paste code help wordcount save autosave",
														],
														file_picker_types: "file image media",
														automatic_uploads: true,
														relative_urls: false,
														remove_script_host: false,
														document_base_url: base_url,

														toolbar: [
															"fontselect fontsizeselect h1 forecolor | bold italic underline | alignleft aligncenter alignright alignjustify | numlist bullist | image | link | table | code",
															"undo redo | help",
														],
														autosave_interval: "10s",
														save_enablewhendirty: true,
													}}
													value={contractBody}
												/>
												<span className='errorMsg'>{errorClass.bodyMsg}</span>
											</div>
										</div>
									</>
								)}
								{isReadyForNextStep && (
									<div className={`formControl`}>
										<div className='select-fields-control'>
											<label className='select-fields-label'>
												<span>Select fields</span>
												<span className='top-underline'></span>
											</label>
											{selectableFields.map((item, index) => (
												<div
													className='formRight addTaxProduct'
													key={index}
												>
													<label
														htmlFor={item.field + index}
														className='select-field-chekbox'
													>
														<div className='customCheckbox'>
															<input
																type='checkbox'
																id={item.field + index}
																name={item.field}
																onChange={(event) =>
																	onChangeSelectableField(event)
																}
																checked={selectedFields?.some(
																	(element) => element.field === item.field
																)}
															/>

															<span></span>
														</div>
														{item.field}
													</label>
													{item.hasMandatoryField && (
														<label
															htmlFor={item.field}
															className='mandatory-chekbox'
														>
															<div className='customCheckbox'>
																<input
																	type='checkbox'
																	id={item.field}
																	name={item.field}
																	onChange={(event) =>
																		onChangeMandatoryCheck(event)
																	}
																	checked={selectedFields?.some(
																		(element) =>
																			element.field === item.field &&
																			element.mandatory
																	)}
																/>

																<span></span>
															</div>
															<span>{"is mandatory?"}</span>
														</label>
													)}
												</div>
											))}
										</div>
										<div className='formRight e-sign-check'>
											<label htmlFor='esign'>
												<div className='customCheckbox'>
													<input
														type='checkbox'
														id='esign'
														name='esign'
														onChange={(event) => onChangeSelectableField(event)}
														checked={selectedFields?.some(
															(element) => element.field === "esign"
														)}
													/>
													<span></span>
												</div>
												E-Signature
											</label>
										</div>
										<span className='bottom-underline'></span>
										<div className='doc-builder-form-end'>
											<div className='select-doc-category'>
												<label>Select Category</label>
												<select
													name='category'
													onChange={handleChange}
													value={contractCategory}
												>
													{props?.categories?.map((cat, i) => {
														return (
															<option
																value={cat._id}
																defaultValue={
																	contractCategory === cat._id ? "selected" : ""
																}
																key={"category_" + i}
															>
																{cat.name}
															</option>
														);
													})}
												</select>
												<span className='errorMsg'>
													{errorClass.categoryMsg}
												</span>
											</div>
											<div
												className={
													"formControl doc-title-input " + errorClass.title
												}
											>
												<label>Title</label>
												<div className='formLeft preField doc-title-control'>
													<input
														type='text'
														name='title'
														placeholder='Contract title'
														onChange={handleChange}
														value={contractTitle}
														className='cmnFieldStyle'
													/>
													<span className='errorMsg'>
														{errorClass.titleMsg}
													</span>
												</div>
											</div>
										</div>
									</div>
								)}
								<div className='modalbtnHolder w-100'>
									{!isReadyForNextStep && (
										<button
											type='button'
											name='nextStep'
											className='saveNnewBtn'
											onClick={onClickNextStep}
										>
											<span>Next step</span>
											<img
												src={arrow_forward}
												alt=''
											/>
										</button>
									)}
									{isReadyForNextStep && (
										<>
											<button
												type='button'
												name='prevStep'
												className='saveNnewBtn prev-btn'
												onClick={() => setIsReadyForNextStep(false)}
											>
												<img
													className='vertically-center me-1'
													src={arrow_backward}
													alt=''
												/>
												<span className='vertically-center'>Previous step</span>
											</button>
											<button
												type='submit'
												name='saveNew'
												className='saveNnewBtn'
											>
												<span>{isEditing ? "Update" : "Save"}</span>
												<img
													src={arrow_forward}
													alt=''
												/>
											</button>
										</>
									)}
								</div>
							</form>
						</Scrollbars>
					</div>
				</div>
			</div>
		</>
	);
};

export default CreateDocumentModal;
