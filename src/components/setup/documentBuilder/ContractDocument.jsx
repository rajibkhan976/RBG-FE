import { useEffect, useRef, useState } from "react";
import arrow_forward from "../../../assets/images/arrow_forward.svg";
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
	const [basicinfoMobilePhone, setBasicinfoMobilePhone] = useState({
		countryCode: "US",
		dailCode: "+1",
		number: "1234567890",
	});
	const [phoneCountryCode, setPhoneCountryCode] = useState([]);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [eSignRef, setESignRef] = useState(null);
	const [signUrl, setSignUrl] = useState("");
	const [ipAddress, setIpAddress] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [formErrors, setFormErrors] = useState({
		firstName: "",
		lastName: "",
		phoneNumber: "",
		email: "",
		roleId: "",
		groupId: "",
		orgName: "",
		orgEmail: "",
		orgDescription: "",
		groupName: "",
		associationName: "",
		associationEmail: "",
		associationDescription: "",
		permission: "",
	});

	const docId = props?.location?.pathname?.substring(
		props?.location?.pathname?.lastIndexOf("/") + 1,
		props?.location?.pathname?.length
	);

	const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

	let deviceInfo = null;
	if (window.navigator.userAgent.indexOf("Windows") !== -1)
		deviceInfo = "windows";
	if (window.navigator.userAgent.indexOf("Mac") !== -1) deviceInfo = "Mac/iOS";
	if (window.navigator.userAgent.indexOf("X11") !== -1) deviceInfo = "unix";
	if (window.navigator.userAgent.indexOf("Linux") !== -1) deviceInfo = "linux";

	useEffect(() => {
		if (docId) dispatch(getContractDocumentById(docId));
		fetchCountry();
		fetch(`https://geolocation-db.com/json/`)
			.then((response) => response.json())
			.then((result) => setIpAddress(result.IPv4));
	}, []);

	const fetchCountry = async () => {
		let conntryResponse = await ContactService.fetchCountry();
		setPhoneCountryCode(conntryResponse);
		console.log("country");
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
		if (!pattern.test(event.target.value)) {
			setPhoneNumber("");
		} else {
			setPhoneNumber(event.target.value);
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
			eSignRef?.getTrimmedCanvas()?.toDataURL("text/plain")?.split(",")[1]
		);
	};

	const handleSignContractDocument = (event) => {
		if (
			contractDocument &&
			docId &&
			ipAddress &&
			deviceInfo &&
			name &&
			phoneNumber &&
			email &&
			email.match(emailRegex) &&
			signUrl
		) {
			setIsLoading(true);
			const payload = {
				document_id: docId,
				ipaddress: ipAddress,
				device_info: deviceInfo,
				form_values: {
					name: name,
					email: email,
					phone: parseInt(phoneNumber),
				},
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
		}
		return () => {
			dispatch({
				type: "RESET_SIGN_CONTRACT_DOCUMENT_RESPONSE",
				data: null,
			});
			setName("");
			setPhoneNumber("");
			setEmail("");
			eSignRef?.clear();
			clearTimeout(signContractTimeout);
		};
	}, [signContractDocumentResponse]);

	if (isLoggedIn() === false) {
		return <Redirect to='/login' />;
	}

	return (
		<>
			{contractDocument && docBody.current && !isLoading ? (
				<div className='contract-doc-container'>
					<p className='contract-title'>{contractDocument?.title}</p>
					<div
						className='contract-body'
						dangerouslySetInnerHTML={docBody.current}
					/>
					<div className='contract-form'>
						<div className='contract-form-mandatory-fields'>
							<div className={"formControl name-field"}>
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
							</div>
							<div
								className={
									formErrors.phoneNumber
										? "formField w-50 phone-field error"
										: "formField w-50"
								}
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
								{formErrors.phoneNumber ? (
									<span className='errorMsg'>{formErrors.phoneNumber}</span>
								) : (
									""
								)}
							</div>
						</div>
						<div className='contract-form-mandatory-fields'>
							<div
								className={
									formErrors.email
										? "formField w-50 email-field error"
										: "formField w-50 email-field"
								}
							>
								<p>
									Email <span className='mandatory'>*</span>
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
								{formErrors.email ? (
									<span className='errorMsg'>{formErrors.email}</span>
								) : (
									""
								)}
							</div>
						</div>
						<ESignatureField
							handleSetESignCanvasRef={setESignRef}
							handleSetSignUrl={handleSetSignUrl}
						/>
						<button
							type='submit'
							name='saveNew'
							className='contract-form-btn'
							onClick={handleSignContractDocument}
						>
							<span>{"Save"}</span>
							<img
								src={arrow_forward}
								alt=''
							/>
						</button>
					</div>
				</div>
			) : (
				<Loader />
			)}
		</>
	);
};

export default ContractDocument;
