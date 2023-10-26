import { useEffect, useRef, useState } from "react";
import arrow_forward from "../../../assets/images/arrow_forward.svg";
import arrowDown from "../../../assets/images/arrowDown.svg";
import Loader from "../../shared/Loader";
import ESignatureField from "./ESignatureField";
import { ContactService } from "../../../services/contact/ContactServices";
import {
	getContractDocumentById,
	signContractDocument,
} from "../../../actions/documentBuilderActions";
import { isLoggedIn } from "../../../services/authentication/AuthServices";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ContractDocument = (props) => {
	const dispatch = useDispatch();
	const contractDocument = useSelector(
		(state) => state.documentBuilder.contractDocument
	);
	const signContractDocumentResponse = useSelector(
		(state) => state.documentBuilder.signContractDocumentResponse
	);
	const docBody = useRef(null);
	const [name, setName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [emergencyNumber, setEmergencyNumber] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [contactType, setContactType] = useState("");
	const [dob, setDob] = useState(null);
	const [addressOne, setAddressOne] = useState("");
	const [addressTwo, setAddressTwo] = useState("");
	const [state, setState] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [source, setSource] = useState("");
	const [sourceDetails, setSourceDetails] = useState("");
	const [motherName, setMotherName] = useState("");
	const [fatherName, setFatherName] = useState("");
	const [company, setCompany] = useState("");
	const [jobRole, setJobRole] = useState("");
	const [createdBy, setCreatedBy] = useState("");
	const [phase, setPhase] = useState("");
	const [status, setStatus] = useState("");
	const [notes, setNotes] = useState("");
	const [signUrl, setSignUrl] = useState("");
	const [eSignRef, setESignRef] = useState(null);
	const [ipAddress, setIpAddress] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [basicinfoMobilePhone, setBasicinfoMobilePhone] = useState({
		countryCode: "US",
		dailCode: "+1",
		number: "1234567890",
	});
	const [phoneCountryCode, setPhoneCountryCode] = useState([]);
	const [formErrors, setFormErrors] = useState({
		name: "",
		phoneNumber: "",
		email: "",
		emergencyNumber: "",
		companyName: "",
		contactType: "",
		dob: "",
		addressOne: "",
		addressTwo: "",
		state: "",
		zipCode: "",
		source: "",
		sourceDetails: "",
		motherName: "",
		fatherName: "",
		company: "",
		jobRole: "",
		createdBy: "",
		notes: "",
		signUrl: "",
	});

	console.log(formErrors);

	const docId = props?.match?.params?.id;

	const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

	let deviceInfo = null;
	if (window.navigator.userAgent.indexOf("Windows") !== -1)
		deviceInfo = "windows";
	if (window.navigator.userAgent.indexOf("Mac") !== -1) deviceInfo = "Mac/iOS";
	if (window.navigator.userAgent.indexOf("X11") !== -1) deviceInfo = "unix";
	if (window.navigator.userAgent.indexOf("Linux") !== -1) deviceInfo = "linux";

	const contactFilterData = useRef(null);
	let contactSources = null;
	let contactPhases = null;
	let contactStatus = null;
	let contactCreatedBy = null;

	useEffect(() => {
		if (docId) dispatch(getContractDocumentById(docId));
		fetchCountry();
		fetch(`https://geolocation-db.com/json/`)
			.then((response) => response.json())
			.then((result) => setIpAddress(result.IPv4));

		if (localStorage.getItem("contactFilterData")) {
			contactFilterData.current = JSON.parse(
				localStorage.getItem("contactFilterData")
			);
			localStorage.removeItem("contactFilterData");
		}
	}, []);

	const fetchCountry = async () => {
		let conntryResponse = await ContactService.fetchCountry();
		setPhoneCountryCode(conntryResponse);
	};

	useEffect(() => {
		if (contractDocument) {
			docBody.current = {
				__html: window.atob(contractDocument?.body),
			};
		}
	}, [contractDocument]);

	const countrycodeOpt = phoneCountryCode
		? phoneCountryCode.map((el, key) => {
				return (
					<option
						value={el.code}
						data-dailcode={el.prefix}
						key={key}
					>
						{el.code} ({el.prefix})
					</option>
				);
		  })
		: "";

	const handlePhoneNumberChange = (event) => {
		event.preventDefault();
		let pattern = new RegExp(/^[0-9\b]+$/);
		if (
			pattern.test(event.target.value) &&
			event.target.name === "phoneNumber"
		) {
			setPhoneNumber(event.target.value);
		}
		if (
			pattern.test(event.target.value) &&
			event.target.name === "emergencyNumber"
		) {
			setEmergencyNumber(event.target.value);
		}
	};

	const handelBasicinfoMobilePhon = (event) => {
		const { name, value } = event.target;
		if (name === "countryCode") {
			const daileCodeindex = event.target[event.target.selectedIndex];
			let dailCode =
				daileCodeindex !== undefined
					? daileCodeindex.getAttribute("data-dailcode")
					: "+1";
			setBasicinfoMobilePhone((prevState) => ({
				...prevState,
				dailCode: dailCode,
			}));
		}
		setBasicinfoMobilePhone((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleChangeInputControl = (event) => {
		const regex = {
			numericRegex: /[^0-9.]/,
			alphaRegex: /[^a-zA-Z0-9- ]/,
		};
		if (
			event.target.name === "name" &&
			!regex.alphaRegex.test(event.target.value.trim())
		) {
			setName(event.target.value.trim());
		} else if (
			event.target.name === "companyName" &&
			!regex.alphaRegex.test(event.target.value.trim())
		) {
			setCompanyName(event.target.value.trim());
		} else if (
			event.target.name === "contactType" &&
			!regex.alphaRegex.test(event.target.value.trim())
		) {
			setContactType(event.target.value.trim());
		} else if (
			event.target.name === "addressOne" &&
			!regex.alphaRegex.test(event.target.value.trim())
		) {
			setAddressOne(event.target.value.trim());
		} else if (
			event.target.name === "addresstwo" &&
			!regex.alphaRegex.test(event.target.value.trim())
		) {
			setAddressTwo(event.target.value.trim());
		} else if (
			event.target.name === "state" &&
			!regex.alphaRegex.test(event.target.value.trim())
		) {
			setState(event.target.value.trim());
		} else if (
			event.target.name === "zipCode" &&
			!regex.alphaRegex.test(event.target.value.trim())
		) {
			setZipCode(event.target.value.trim());
		} else if (
			event.target.name === "source" &&
			!regex.alphaRegex.test(event.target.value.trim())
		) {
			setSource(event.target.value.trim());
		} else if (
			event.target.name === "sourceDetails" &&
			!regex.alphaRegex.test(event.target.value.trim())
		) {
			setSourceDetails(event.target.value.trim());
		} else if (
			event.target.name === "motherName" &&
			!regex.alphaRegex.test(event.target.value.trim())
		) {
			setMotherName(event.target.value.trim());
		} else if (
			event.target.name === "fatherName" &&
			!regex.alphaRegex.test(event.target.value.trim())
		) {
			setFatherName(event.target.value.trim());
		} else if (
			event.target.name === "company" &&
			!regex.alphaRegex.test(event.target.value.trim())
		) {
			setCompany(event.target.value.trim());
		} else if (
			event.target.name === "jobRole" &&
			!regex.alphaRegex.test(event.target.value.trim())
		) {
			setJobRole(event.target.value.trim());
		} else if (
			event.target.name === "createdBy" &&
			!regex.alphaRegex.test(event.target.value.trim())
		) {
			setCreatedBy(event.target.value.trim());
		} else if (
			event.target.name === "notes" &&
			!regex.alphaRegex.test(event.target.value.trim())
		) {
			setNotes(event.target.value.trim());
		}
	};

	const handleEmailChange = (event) => {
		event.preventDefault();
		let emailAddress = event.target.value;
		let emailValid = emailAddress.match(emailRegex);
		if (emailValid) {
			setFormErrors({
				...formErrors,
				email: "",
			});
		} else {
			setFormErrors({
				...formErrors,
				email: "Invalid email address",
			});
		}
		setEmail(event.target.value);
	};

	const handleSetSignUrl = () => {
		setSignUrl(
			eSignRef?.getTrimmedCanvas()?.toDataURL("image/png")?.split(",")[1]
		);
	};

	const validateInput = () => {
		let bool = true;
		if (!name) {
			bool = false;
			setFormErrors((prevState) => ({
				...prevState,
				name: "Please enter name",
			}));
		}

		if (!phoneNumber) {
			bool = false;
			setFormErrors((prevState) => ({
				...prevState,
				phoneNumber: "Please enter phone number",
			}));
		}

		if (!email) {
			bool = false;
			setFormErrors((prevState) => ({
				...prevState,
				email: "Please enter email",
			}));
		}

		if (!signUrl) {
			bool = false;
			setFormErrors((prevState) => ({
				...prevState,
				signUrl: "Please enter signature",
			}));
		}

		if (
			!companyName &&
			contractDocument?.fields?.find((item) => item?.field === "companyName")
				?.mandatory
		) {
			bool = false;
			setFormErrors((prevState) => ({
				...prevState,
				companyName: "Please enter company name",
			}));
		}

		if (
			!emergencyNumber &&
			contractDocument?.fields?.find(
				(item) => item?.field === "emergencyNumber"
			)?.mandatory
		) {
			bool = false;
			setFormErrors((prevState) => ({
				...prevState,
				emergencyNumber: "Please enter emergency number",
			}));
		}

		if (
			!notes &&
			contractDocument?.fields?.find((item) => item?.field === "notes")
				?.mandatory
		) {
			bool = false;
			setFormErrors((prevState) => ({
				...prevState,
				notes: "Please enter notes",
			}));
		}

		if (
			!contactType &&
			contractDocument?.fields?.find((item) => item?.field === "contactType")
				?.mandatory
		) {
			bool = false;
			setFormErrors((prevState) => ({
				...prevState,
				contactType: "Please enter contact type",
			}));
		}

		if (
			!dob &&
			contractDocument?.fields?.find((item) => item?.field === "dob")?.mandatory
		) {
			bool = false;
			setFormErrors((prevState) => ({
				...prevState,
				dob: "Please enter date of birth",
			}));
		}

		if (
			!addressOne &&
			contractDocument?.fields?.find((item) => item?.field === "addressOne")
				?.mandatory
		) {
			bool = false;
			setFormErrors((prevState) => ({
				...prevState,
				addressOne: "Please enter address",
			}));
		}

		if (
			!addressTwo &&
			contractDocument?.fields?.find((item) => item?.field === "addressTwo")
				?.mandatory
		) {
			bool = false;
			setFormErrors((prevState) => ({
				...prevState,
				addressTwo: "Please enter address",
			}));
		}

		if (
			!state &&
			contractDocument?.fields?.find((item) => item?.field === "state")
				?.mandatory
		) {
			bool = false;
			setFormErrors((prevState) => ({
				...prevState,
				state: "Please enter state",
			}));
		}

		if (
			!zipCode &&
			contractDocument?.fields?.find((item) => item?.field === "zipCode")
				?.mandatory
		) {
			bool = false;
			setFormErrors((prevState) => ({
				...prevState,
				zipCode: "Please enter zip",
			}));
		}

		if (
			!source &&
			contractDocument?.fields?.find((item) => item?.field === "source")
				?.mandatory
		) {
			bool = false;
			setFormErrors((prevState) => ({
				...prevState,
				source: "Please select source",
			}));
		}

		if (
			!sourceDetails &&
			contractDocument?.fields?.find((item) => item?.field === "sourceDetails")
				?.mandatory
		) {
			bool = false;
			setFormErrors((prevState) => ({
				...prevState,
				sourceDetails: "Please enter source details",
			}));
		}

		if (
			!motherName &&
			contractDocument?.fields?.find((item) => item?.field === "motherName")
				?.mandatory
		) {
			bool = false;
			setFormErrors((prevState) => ({
				...prevState,
				motherName: "Please enter mother's name",
			}));
		}

		if (
			!fatherName &&
			contractDocument?.fields?.find((item) => item?.field === "fatherName")
				?.mandatory
		) {
			bool = false;
			setFormErrors((prevState) => ({
				...prevState,
				fatherName: "Please enter father's name",
			}));
		}

		if (
			!company &&
			contractDocument?.fields?.find((item) => item?.field === "fatherName")
				?.mandatory
		) {
			bool = false;
			setFormErrors((prevState) => ({
				...prevState,
				company: "Please enter company",
			}));
		}

		if (
			!jobRole &&
			contractDocument?.fields?.find((item) => item?.field === "jobRole")
				?.mandatory
		) {
			bool = false;
			setFormErrors((prevState) => ({
				...prevState,
				jobRole: "Please enter job role",
			}));
		}

		if (
			!status &&
			contractDocument?.fields?.find((item) => item?.field === "status")
				?.mandatory
		) {
			bool = false;
			setFormErrors((prevState) => ({
				...prevState,
				status: "Please select status",
			}));
		}

		if (
			!phase &&
			contractDocument?.fields?.find((item) => item?.field === "phase")
				?.mandatory
		) {
			bool = false;
			setFormErrors((prevState) => ({
				...prevState,
				phase: "Please select phase",
			}));
		}

		if (
			!createdBy &&
			contractDocument?.fields?.find((item) => item?.field === "createdBy")
				?.mandatory
		) {
			bool = false;
			setFormErrors((prevState) => ({
				...prevState,
				createdBy: "Please select created by",
			}));
		}

		if (bool) {
			setFormErrors({
				name: "",
				phoneNumber: "",
				email: "",
				emergencyNumber: "",
				companyName: "",
				contactType: "",
				dob: "",
				addressOne: "",
				addressTwo: "",
				state: "",
				zipCode: "",
				source: "",
				sourceDetails: "",
				motherName: "",
				fatherName: "",
				company: "",
				jobRole: "",
				createdBy: "",
				notes: "",
				signUrl: "",
			});
		}
		return bool;
	};

	const handleFormValues = () => {
		let formData = null;
		if (validateInput()) {
			formData = {
				name: name,
				email: email,
				phone: parseInt(phoneNumber),
			};
			if (companyName) {
				Object.assign(formData, { companyName: companyName });
			}
			if (emergencyNumber) {
				Object.assign(formData, { emergencyNumber: emergencyNumber });
			}
			if (notes) {
				Object.assign(formData, { notes: notes });
			}
			if (contactType) {
				Object.assign(formData, { contactType: contactType });
			}
			if (dob) {
				Object.assign(formData, { dob: dob });
			}
			if (addressOne) {
				Object.assign(formData, { addressOne: addressOne });
			}
			if (addressTwo) {
				Object.assign(formData, { addressTwo: addressTwo });
			}
			if (state) {
				Object.assign(formData, { state: state });
			}
			if (zipCode) {
				Object.assign(formData, { zipCode: zipCode });
			}
			if (source) {
				Object.assign(formData, { source: source });
			}
			if (sourceDetails) {
				Object.assign(formData, { sourceDetails: sourceDetails });
			}
			if (motherName) {
				Object.assign(formData, { motherName: motherName });
			}
			if (fatherName) {
				Object.assign(formData, { fatherName: fatherName });
			}
			if (company) {
				Object.assign(formData, { company: company });
			}
			if (jobRole) {
				Object.assign(formData, { jobRole: jobRole });
			}
			if (status) {
				Object.assign(formData, { status: status });
			}
			if (phase) {
				Object.assign(formData, { phase: phase });
			}
			if (createdBy) {
				Object.assign(formData, { createdBy: createdBy });
			}
		}
		return formData;
	};

	const handleSignContractDocument = (event) => {
		if (
			contractDocument &&
			docId &&
			ipAddress &&
			deviceInfo &&
			handleFormValues()
		) {
			setIsLoading(true);
			const payload = {
				document_id: docId,
				ipaddress: ipAddress,
				device_info: deviceInfo,
				form_values: handleFormValues(),
				sign_url: signUrl,
				signed_doc_url: contractDocument?.body,
			};
			dispatch(signContractDocument(payload));
		}
	};

	useEffect(() => {
		const signContractTimeout = setTimeout(() => setIsLoading(false), 1000);
		if (signContractDocumentResponse) {
			dispatch({
				type: "SHOW_MESSAGE",
				message: signContractDocumentResponse?.message,
				typeMessage: "success",
			});
			props.history.push({
				pathname: "/",
			});
		}
		return () => {
			dispatch({
				type: "RESET_SIGN_CONTRACT_DOCUMENT_RESPONSE",
				data: null,
			});
			setName("");
			setPhoneNumber("");
			setEmail("");
			setAddressOne("");
			setAddressTwo("");
			setCompany("");
			setCompanyName("");
			setContactType("");
			setCreatedBy("");
			setDob("");
			setEmergencyNumber("");
			setFatherName("");
			setIpAddress("");
			setJobRole("");
			setMotherName("");
			setPhase("");
			setSignUrl("");
			setSource("");
			setSourceDetails("");
			setState("");
			setStatus("");
			setZipCode("");
			eSignRef?.clear();
			clearTimeout(signContractTimeout);
		};
	}, [signContractDocumentResponse]);

	contactSources = contactFilterData?.current?.source;
	contactPhases = contactFilterData?.current?.phase;
	contactCreatedBy = contactFilterData?.current?.createdBy;

	const handlePhaseChange = (event) => {
		setPhase(event.target.value);
		if (event.target.value) {
			let searchResultPhases = contactPhases.find(
				(ele) => ele._id === event.target.value
			);
			contactStatus = searchResultPhases.statuses;
		} else {
			contactStatus = null;
		}
	};

	const handleStatusChange = (event) => {
		setStatus(event.target.value);
	};

	const handleSourceChange = (event) => {
		setSource(event.target.value);
	};

	const handleUserChange = (event) => {
		setCreatedBy(event.target.value);
	};

	if (isLoggedIn() === false) {
		return <Redirect to='/login' />;
	}

	return (
		<>
			{contractDocument && docBody.current && !isLoading ? (
				<div className='contract-doc-container'>
					<p className='contract-title'>
						{contractDocument ? contractDocument?.header : ""}
					</p>
					<div
						className='contract-body'
						dangerouslySetInnerHTML={docBody.current}
					/>
					<div className='contract-form'>
						<div className='contract-form-mandatory-fields'>
							<div
								className={`formControl name-field ${
									formErrors.name ? "error" : ""
								}`}
							>
								<label>
									Name <span className='mandatory'>*</span>
								</label>
								<input
									type='text'
									placeholder='Eg. Steve Martyns'
									name='name'
									className='cmnFieldStyle'
									value={name}
									onChange={handleChangeInputControl}
								/>
								{formErrors.name && (
									<span className='errorMsg'>{formErrors.name}</span>
								)}
							</div>
							<div
								className={`formField phone-field text-field ${
									formErrors.phoneNumber ? "error" : ""
								}`}
							>
								<p>
									Phone No <span className='mandatory'>*</span>
								</p>
								<div className='inFormField countryCodeField'>
									<div className='countryCode cmnFieldStyle'>
										<div className='countryName'>
											{basicinfoMobilePhone.countryCode}
										</div>
										<div className='daileCode'>
											{basicinfoMobilePhone.dailCode}
										</div>
										<select
											className='selectCountry'
											name='countryCode'
											defaultValue={basicinfoMobilePhone.countryCode}
											onChange={handelBasicinfoMobilePhon}
										>
											{countrycodeOpt}
										</select>
									</div>
									<input
										type='text'
										name='phoneNumber'
										placeholder='Eg. (555) 555-1234'
										value={phoneNumber}
										onChange={handlePhoneNumberChange}
										className='cmnFieldStyle'
									/>
								</div>
								{formErrors.phoneNumber && (
									<span className='errorMsg'>{formErrors.phoneNumber}</span>
								)}
							</div>
						</div>
						<div className='contract-form-mandatory-fields'>
							<div
								className={`formField email-field ${
									formErrors.email ? "error" : ""
								}`}
							>
								<p>
									Enter Email Address <span className='mandatory'>*</span>
								</p>
								<div className='inFormField'>
									<input
										type='text'
										name='email'
										placeholder='Adam.smith@domain.com'
										value={email}
										onChange={handleEmailChange}
									/>
								</div>
								{formErrors.email && (
									<span className='errorMsg'>{formErrors.email}</span>
								)}
							</div>
							{contractDocument?.fields?.some(
								(item) => item?.field === "emergencyNumber"
							) && (
								<div
									className={`formField text-field phone-field ${
										formErrors.emergencyNumber ? "error" : ""
									}`}
								>
									<p>
										Enter Emergency No{" "}
										{contractDocument?.fields?.find(
											(item) => item?.field === "emergencyNumber"
										)?.mandatory && <span className='mandatory'>*</span>}
									</p>
									<div className='inFormField countryCodeField'>
										<div className='countryCode cmnFieldStyle'>
											<div className='countryName'>
												{basicinfoMobilePhone.countryCode}
											</div>
											<div className='daileCode'>
												{basicinfoMobilePhone.dailCode}
											</div>
											<select
												className='selectCountry'
												name='countryCode'
												defaultValue={basicinfoMobilePhone.countryCode}
												onChange={handelBasicinfoMobilePhon}
											>
												{countrycodeOpt}
											</select>
										</div>
										<input
											type='text'
											name='emergencyNumber'
											placeholder='Eg. (555) 555-1234'
											value={emergencyNumber}
											onChange={handlePhoneNumberChange}
											className='cmnFieldStyle'
										/>
									</div>
									{formErrors.emergencyNumber && (
										<span className='errorMsg'>
											{formErrors.emergencyNumber}
										</span>
									)}
								</div>
							)}
						</div>
					</div>
					<div className='contract-form-mandatory-fields'>
						{contractDocument?.fields?.some(
							(item) => item?.field === "companyName"
						) && (
							<div
								className={`formControl formField name-field ${
									formErrors.companyName ? "error" : ""
								}`}
							>
								<label>
									Company name{" "}
									{contractDocument?.fields?.find(
										(item) => item?.field === "companyName"
									)?.mandatory && <span className='mandatory'>*</span>}
								</label>
								<input
									type='text'
									placeholder='Eg. Steve Martyns'
									name='companyName'
									className='cmnFieldStyle'
									value={companyName}
									onChange={handleChangeInputControl}
								/>
								{formErrors.companyName && (
									<span className='errorMsg'>{formErrors.companyName}</span>
								)}
							</div>
						)}
						{contractDocument?.fields?.some(
							(item) => item?.field === "contactType"
						) && (
							<div
								className={`formControl formField text-field ${
									formErrors.contactType ? "error" : ""
								}`}
							>
								<label>
									Contact type{" "}
									{contractDocument?.fields?.find(
										(item) => item?.field === "contactType"
									)?.mandatory && <span className='mandatory'>*</span>}
								</label>
								<input
									type='text'
									placeholder='Eg. Steve Martyns'
									name='contactType'
									className='cmnFieldStyle'
									value={contactType}
									onChange={handleChangeInputControl}
								/>
								{formErrors.contactType && (
									<span className='errorMsg'>{formErrors.contactType}</span>
								)}
							</div>
						)}
					</div>
					<div className='contract-form-mandatory-fields'>
						{contractDocument?.fields?.some(
							(item) => item?.field === "dob"
						) && (
							<div
								className={`cmnFormCol name-field formField ${
									formErrors.dob ? "error" : ""
								}`}
							>
								<div className='cmnFieldName'>
									Date of birth
									{contractDocument?.fields?.find(
										(item) => item?.field === "dob"
									)?.mandatory && <span className='mandatory'>*</span>}
								</div>
								<div className='cmnFormField'>
									<DatePicker
										className='cmnFieldStyle date-field'
										selected={dob ? new Date(dob) : ""}
										format='MM/dd/yyyy'
										dateFormat='MM/dd/yyyy'
										placeholderText='MM/DD/YYYY'
										onChange={(e) => setDob(e)}
									/>
								</div>
								{formErrors.dob.trim() !== "" && (
									<p className='errorMsg'>{formErrors.dob}</p>
								)}
							</div>
						)}
						{contractDocument?.fields?.some(
							(item) => item?.field === "addressOne"
						) && (
							<div
								className={`formControl formField text-field ${
									formErrors.addressOne ? "error" : ""
								}`}
							>
								<label>
									Address 1{" "}
									{contractDocument?.fields?.find(
										(item) => item?.field === "addressOne"
									)?.mandatory && <span className='mandatory'>*</span>}
								</label>
								<input
									type='text'
									placeholder='Eg. Steve Martyns'
									name='addressOne'
									className='cmnFieldStyle'
									value={addressOne}
									onChange={handleChangeInputControl}
								/>
								{formErrors.addressOne && (
									<span className='errorMsg'>{formErrors.addressOne}</span>
								)}
							</div>
						)}
					</div>
					<div className='contract-form-mandatory-fields'>
						{contractDocument?.fields?.some(
							(item) => item?.field === "addressTwo"
						) && (
							<div
								className={`formControl formField name-field ${
									formErrors.addressTwo ? "error" : ""
								}`}
							>
								<label>
									Address 2{" "}
									{contractDocument?.fields?.find(
										(item) => item?.field === "addressTwo"
									)?.mandatory && <span className='mandatory'>*</span>}
								</label>
								<input
									type='text'
									placeholder='Eg. Steve Martyns'
									name='addressTwo'
									className='cmnFieldStyle'
									value={addressTwo}
									onChange={handleChangeInputControl}
								/>
								{formErrors.addressTwo && (
									<span className='errorMsg'>{formErrors.addressTwo}</span>
								)}
							</div>
						)}
						{contractDocument?.fields?.some(
							(item) => item?.field === "state"
						) && (
							<div
								className={`formControl formField text-field ${
									formErrors.state ? "error" : ""
								}`}
							>
								<label>
									State{" "}
									{contractDocument?.fields?.find(
										(item) => item?.field === "state"
									)?.mandatory && <span className='mandatory'>*</span>}
								</label>
								<input
									type='text'
									placeholder='Eg. Steve Martyns'
									name='state'
									className='cmnFieldStyle'
									value={state}
									onChange={handleChangeInputControl}
								/>
								{formErrors.state && (
									<span className='errorMsg'>{formErrors.state}</span>
								)}
							</div>
						)}
					</div>
					<div className='contract-form-mandatory-fields'>
						{contractDocument?.fields?.some(
							(item) => item?.field === "zipCode"
						) && (
							<div
								className={`formControl formField name-field ${
									formErrors.zipCode ? "error" : ""
								}`}
							>
								<label>
									Zip{" "}
									{contractDocument?.fields?.find(
										(item) => item?.field === "zipCode"
									)?.mandatory && <span className='mandatory'>*</span>}
								</label>
								<input
									type='text'
									placeholder='Eg. Steve Martyns'
									name='zipCode'
									className='cmnFieldStyle'
									value={zipCode}
									onChange={handleChangeInputControl}
								/>
								{formErrors.zipCode && (
									<span className='errorMsg'>{formErrors.zipCode}</span>
								)}
							</div>
						)}
						{contractDocument?.fields?.some(
							(item) => item?.field === "jobRole"
						) && (
							<div
								className={`formControl formField text-field ${
									formErrors.jobRole ? "error" : ""
								}`}
							>
								<label>
									Job role{" "}
									{contractDocument?.fields?.find(
										(item) => item?.field === "jobRole"
									)?.mandatory && <span className='mandatory'>*</span>}
								</label>
								<input
									type='text'
									placeholder='Eg. Steve Martyns'
									name='jobRole'
									className='cmnFieldStyle'
									value={jobRole}
									onChange={handleChangeInputControl}
								/>
								{formErrors.jobRole && (
									<span className='errorMsg'>{formErrors.jobRole}</span>
								)}
							</div>
						)}
					</div>
					<div className='contract-form-mandatory-fields'>
						{contractDocument?.fields?.some(
							(item) => item?.field === "source"
						) && (
							<div
								className={`formField w-100 formControl name-field ${
									formErrors.source ? "error" : ""
								}`}
							>
								<label>
									Source{" "}
									{contractDocument?.fields?.find(
										(item) => item?.field === "source"
									)?.mandatory && <span className='mandatory'>*</span>}
								</label>
								<select
									value={source}
									onChange={handleSourceChange}
									style={{
										backgroundImage: "url(" + arrowDown + ")",
									}}
								>
									<option value=''>Select</option>
									{contactSources?.map((ele) => {
										return (
											<option
												value={ele._id}
												key={ele._id}
											>
												{ele._id}
											</option>
										);
									})}
								</select>
								{formErrors.source && (
									<span className='errorMsg'>{formErrors.source}</span>
								)}
							</div>
						)}
						{contractDocument?.fields?.some(
							(item) => item?.field === "createdBy"
						) && (
							<div
								className={`formField formControl text-field ${
									formErrors.createdBy ? "error" : ""
								}`}
							>
								<label>
									Created by{" "}
									{contractDocument?.fields?.find(
										(item) => item?.field === "createdBy"
									)?.mandatory && <span className='mandatory'>*</span>}
								</label>
								<select
									value={createdBy}
									onChange={handleUserChange}
									style={{
										backgroundImage: "url(" + arrowDown + ")",
									}}
								>
									<option value=''>Select</option>
									{contactCreatedBy?.map((ele) => {
										return (
											<option
												value={ele.id}
												key={ele._id}
											>
												{ele._id}
											</option>
										);
									})}
								</select>
								{formErrors.createdBy && (
									<span className='errorMsg'>{formErrors.createdBy}</span>
								)}
							</div>
						)}
					</div>
					<div className='contract-form-mandatory-fields'>
						{contractDocument?.fields?.some(
							(item) => item?.field === "sourceDetails"
						) && (
							<div
								className={`formControl formField name-field ${
									formErrors.sourceDetails ? "error" : ""
								}`}
							>
								<label>
									Source details{" "}
									{contractDocument?.fields?.find(
										(item) => item?.field === "sourceDetails"
									)?.mandatory && <span className='mandatory'>*</span>}
								</label>
								<input
									type='text'
									placeholder='Eg. Steve Martyns'
									name='sourceDetails'
									className='cmnFieldStyle'
									value={sourceDetails}
									onChange={handleChangeInputControl}
								/>
								{formErrors.sourceDetails && (
									<span className='errorMsg'>{formErrors.sourceDetails}</span>
								)}
							</div>
						)}
						{contractDocument?.fields?.some(
							(item) => item?.field === "motherName"
						) && (
							<div
								className={`formControl formField text-field ${
									formErrors.motherName ? "error" : ""
								}`}
							>
								<label>
									Mother name{" "}
									{contractDocument?.fields?.find(
										(item) => item?.field === "motherName"
									)?.mandatory && <span className='mandatory'>*</span>}
								</label>
								<input
									type='text'
									placeholder='Eg. Steve Martyns'
									name='motherName'
									className='cmnFieldStyle'
									value={motherName}
									onChange={handleChangeInputControl}
								/>
								{formErrors.motherName && (
									<span className='errorMsg'>{formErrors.motherName}</span>
								)}
							</div>
						)}
					</div>
					<div className='contract-form-mandatory-fields'>
						{contractDocument?.fields?.some(
							(item) => item?.field === "fatherName"
						) && (
							<div
								className={`formControl formField name-field ${
									formErrors.fatherName ? "error" : ""
								}`}
							>
								<label>
									Father name{" "}
									{contractDocument?.fields?.find(
										(item) => item?.field === "fatherName"
									)?.mandatory && <span className='mandatory'>*</span>}
								</label>
								<input
									type='text'
									placeholder='Eg. Steve Martyns'
									name='fatherName'
									className='cmnFieldStyle'
									value={fatherName}
									onChange={handleChangeInputControl}
								/>
								{formErrors.fatherName && (
									<span className='errorMsg'>{formErrors.fatherName}</span>
								)}
							</div>
						)}
						{contractDocument?.fields?.some(
							(item) => item?.field === "company"
						) && (
							<div
								className={`formControl formField text-field ${
									formErrors.company ? "error" : ""
								}`}
							>
								<label>
									Company{" "}
									{contractDocument?.fields?.find(
										(item) => item?.field === "company"
									)?.mandatory && <span className='mandatory'>*</span>}
								</label>
								<input
									type='text'
									placeholder='Eg. Steve Martyns'
									name='company'
									className='cmnFieldStyle'
									value={company}
									onChange={handleChangeInputControl}
								/>
								{formErrors.company && (
									<span className='errorMsg'>{formErrors.company}</span>
								)}
							</div>
						)}
					</div>
					<div className='contract-form-mandatory-fields'>
						{contractDocument?.fields?.some(
							(item) => item?.field === "phase"
						) && (
							<div
								className={`formField formControl phasesSelection name-field ${
									formErrors.phase ? "error" : ""
								}`}
							>
								<label>
									Phase{" "}
									{contractDocument?.fields?.find(
										(item) => item?.field === "phase"
									)?.mandatory && <span className='mandatory'>*</span>}
								</label>
								<select
									value={phase}
									onChange={handlePhaseChange}
									style={{
										backgroundImage: "url(" + arrowDown + ")",
									}}
								>
									<option value=''>Select a Phase</option>
									{contactPhases?.map((ele) => {
										if (ele.statuses.length && ele.statuses[0]._id) {
											return (
												<option
													value={ele._id}
													key={ele._id}
												>
													{ele.name}
												</option>
											);
										}
									})}
								</select>
								{formErrors.phase && (
									<span className='errorMsg'>{formErrors.phase}</span>
								)}
							</div>
						)}
						{contractDocument?.fields?.some(
							(item) => item?.field === "phase"
						) &&
							contractDocument?.fields?.some(
								(item) => item?.field === "status"
							) && (
								<div
									className={`formField formControl statusSelection text-field ${
										formErrors.status ? "error" : ""
									}`}
								>
									<label>
										Status{" "}
										{contractDocument?.fields?.find(
											(item) => item?.field === "status"
										)?.mandatory && <span className='mandatory'>*</span>}
									</label>
									<select
										value={status}
										onChange={handleStatusChange}
										style={{
											backgroundImage: "url(" + arrowDown + ")",
										}}
									>
										<option value=''>Select a Status</option>
										{contactStatus?.map((ele) => {
											if (ele._id) {
												return (
													<option
														value={ele._id}
														key={ele._id}
													>
														{ele.name}
													</option>
												);
											}
										})}
									</select>
									{formErrors.status && (
										<span className='errorMsg'>{formErrors.status}</span>
									)}
								</div>
							)}
					</div>
					{contractDocument?.fields?.some(
						(item) => item?.field === "notes"
					) && (
						<div
							className={`formField w-65 ${formErrors.notes ? "error" : ""}`}
						>
							<p>
								Notes{" "}
								{contractDocument?.fields?.find(
									(item) => item?.field === "notes"
								)?.mandatory && <span className='mandatory'>*</span>}
							</p>
							<div className='inFormField'>
								<textarea
									name='notes'
									placeholder='Its a great organization'
									defaultValue={notes}
									onChange={handleChangeInputControl}
								></textarea>
							</div>
							{formErrors.notes && (
								<span className='errorMsg'>{formErrors.notes}</span>
							)}
						</div>
					)}
					<div className='e-sign-field'>
						<ESignatureField
							handleSetESignCanvasRef={setESignRef}
							handleSetSignUrl={handleSetSignUrl}
						/>
						{formErrors.signUrl && (
							<span className='errorMsg'>{formErrors.signUrl}</span>
						)}
					</div>
					<button
						type='submit'
						name='saveNew'
						className='contract-form-btn'
						onClick={handleSignContractDocument}
					>
						{"Save"}
						<img
							className='arrow-forward-icon'
							src={arrow_forward}
							alt=''
						/>
					</button>
				</div>
			) : (
				<Loader />
			)}
		</>
	);
};

export default ContractDocument;
