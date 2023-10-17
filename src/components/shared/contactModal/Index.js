import React, { useState, useEffect, useRef } from "react";
import Overview from "./pages/Overview";
import Attendance from "./pages/Attendance";
import Transaction from "./pages/Transaction";
import TransactionChoose from "./pages/TransactionChoose";
import Loader from "../Loader";
import Billing from "./pages/Billing";
import Dependents from "./pages/Dependents";
import Appointment from "./pages/Appointment";
import Automation from "./pages/Automation";
import Notes from "./pages/notes/Notes";
import Documents from "./pages/documents/Documents";
import Inbox from "./pages/inbox/Inbox";
import { Step, Steps } from "react-step-builder";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../../actions/types";
import { ContactService } from "../../../services/contact/ContactServices";
import cross_white from "../../../assets/images/cross_white.svg";
import camera_icon from "../../../assets/images/camera_icon.svg";
import owner_img_1 from "../../../assets/images/owner_img_1.png";
import phone_call_icon_white from "../../../assets/images/phone_call_icon_white.svg";
import email_icon_white from "../../../assets/images/email_icon_white.svg";
import tag_icon_white from "../../../assets/images/tag_icon_white.svg";
import dependent_white from "../../../assets/images/dependent.svg";
import menuArrow1 from "../../../assets/images/cal_arrow1.svg";
import menuArrow2 from "../../../assets/images/cal_arrow2.svg";
import popIn from "../../../assets/images/popIn.svg";
import popOut from "../../../assets/images/popOut.svg";
import env from "../../../configuration/env";
import { uploadFile } from "react-s3";
import TagList from "../../appointment/TagList";
import ShowContactTagModal from "../showContactTagModal";

const ContactModal = (props) => {
	const scrollRefSide = useRef();

	// const ActionBtn = (actionBtn) =>{
	//        return (

	//        )
	// }
	const Navigation = (navigation) => {
		return (
			<div className='outertabMenu'>
				<button
					className='tabMenuLeft'
					onClick={menuLeftPressHandler}
				>
					<img src={menuArrow1} />
				</button>

				<div
					className='contactModalStepLinks'
					ref={scrollRefSide}
				>
					{/* <div className={navigation.current == 8 ? (menuShift ? "innertabMenu toRight": "innertabMenu" ): "innertabMenu"} id="menuScroller" > */}
					<div className={menuShift ? "innertabMenu toRight" : "innertabMenu"}>
						<button
							className={navigation.current == 1 ? "active nNav" : "nNav"}
							onClick={() => navigation.jump(1)}
						>
							Overview
						</button>
						{contactData.dnc ? (
							""
						) : (
							<button
								className={navigation.current == 10 ? "active nNav" : "nNav"}
								onClick={() => navigation.jump(10)}
								disabled={props.contactId ? false : true}
							>
								Inbox
							</button>
						)}
						<button
							className={navigation.current == 2 ? "active nNav" : "nNav"}
							onClick={() => navigation.jump(2)}
							disabled={props.contactId ? false : true}
						>
							Attendance
						</button>
						<button
							className={navigation.current == 3 ? "active nNav" : "nNav"}
							onClick={() => navigation.jump(3)}
							disabled={props.contactId ? false : true}
						>
							Appointment
						</button>

						<button
							className={navigation.current == 7 ? "active nNav" : "nNav"}
							onClick={() => navigation.jump(7)}
							disabled={props.contactId ? false : true}
						>
							Automation
						</button>

						{contactData && !contactData.isDependent ? (
							<>
								<button
									className={navigation.current == 4 ? "active nNav" : "nNav"}
									onClick={() => navigation.jump(4)}
									disabled={props.contactId ? false : true}
								>
									Transaction
								</button>
								<button
									className={navigation.current == 5 ? "active nNav" : "nNav"}
									onClick={() => navigation.jump(5)}
									disabled={props.contactId ? false : true}
								>
									Billing
								</button>
								<button
									className={navigation.current == 6 ? "active nNav" : "nNav"}
									onClick={() => navigation.jump(6)}
									disabled={props.contactId ? false : true}
								>
									Dependents
								</button>
							</>
						) : (
							""
						)}
						<button
							className={navigation.current == 8 ? "active nNav" : "nNav"}
							onClick={() => navigation.jump(8)}
							disabled={props.contactId ? false : true}
						>
							Notes
						</button>
						<button
							className={navigation.current == 9 ? "active nNav" : "nNav"}
							onClick={() => navigation.jump(9)}
							disabled={props.contactId ? false : true}
						>
							Documents
						</button>
						{/* {contactData && !contactData.isDependent ?
                   <>
                   <button className="noFill" onClick={showExtraMenuHandler}><img src={threedot}/></button>  
                    {showExtraMenu && <div className="extraTabMenu">
                        <button className={navigation.current == 8 ? "active nNav" : "nNav"} 
                                            onClick={() =>{ navigation.jump(8);setShowExtraMenu(false)}}
                                disabled={props.contactId ? false : true}>Notes
                        </button>
                        
                    </div>}
                    </>   
                :
                    <>
                    <button className={navigation.current == 8 ? "active nNav" : "nNav"} onClick={() => navigation.jump(8)}
                        disabled={props.contactId ? false : true}>Notes
                    </button> 
                    </>
                } */}
					</div>
					{/* {
                     navigation.current == 8 &&
                        scrollRefSide.current.scrollLeft += 0
                    console.log(scrollRefSide.current);
                } */}
				</div>
				<button
					className='tabMenuRight'
					onClick={menuRightPressHandler}
				>
					<img src={menuArrow2} />
				</button>
			</div>
		);
	};
	const [showExtraMenu, setShowExtraMenu] = useState(false);

	const showExtraMenuHandler = (e) => {
		e.preventDefault();
		setShowExtraMenu(!showExtraMenu);
	};

	const config = {
		navigation: {
			component: Navigation,
			location: "before",
		},
		// },
		// actionBtn : {
		//     component: ActionBtn,
		//     location: "after"
		// }
	};
	const [stickeyHeadStatus, setStickeyHeadStatus] = useState(false);
	const [contactName, setContactName] = useState("");
	const [isLoader, setIsLoader] = useState(false);
	const [contactData, setContactData] = useState({
		firstName: "",
		lastName: "",
	});
	const [showBottomPart, setShowBottomPart] = useState(false);

	const [ltv, setLtv] = useState("Calculating...");
	const [image, setImage] = useState("");
	const inputFile = useRef(null);
	const dispatch = useDispatch();
	const closeContactModal = () => {
		console.log("here in close contact modal");
		dispatch({
			type: actionTypes.CONTACTS_MODAL_ID,
			contact_modal_id: "",
		});
	};
	const openContactModal = (id) => {
		dispatch({
			type: actionTypes.CONTACTS_MODAL_ID,
			contact_modal_id: {
				id: id,
				page: 5,
			},
		});
		setTimeout(() => {
			dispatch(
				{
					type: actionTypes.CONTACTS_MODAL_ID,
					contact_modal_id: {
						id: id,
					},
				},
				100
			);
		});
	};
	const [device, setDevice] = useState(props.device);
	useEffect(() => {
		console.log("device222222", device);
		setDevice(props.device);
	}, [props.device]);
	//const [showContactTag, setShowContactTag] = useState(false);
	const [tagListToggle, setTagListToggle] = useState(false);

	const [tagList, setTagList] = useState([]);
	const [openModal, setOpenModal] = useState(false);

	const [menuShift, setMenuShift] = useState(null);

	const formScroll = (formScrollStatus) => {
		setStickeyHeadStatus(formScrollStatus);
	};

	const menuLeftPressHandler = (e) => {
		e.preventDefault();
		scrollRefSide.current.scrollLeft -= 50;
		setMenuShift(false);
	};
	const menuRightPressHandler = (e) => {
		e.preventDefault();
		scrollRefSide.current.scrollLeft += 50;
		setMenuShift(true);
	};

	const getContactDetails = (contact) => {
		if (contact && contact.contact) {
			setContactData(contact.contact);
			let firstName = contact.contact.firstName
				? contact.contact.firstName
				: "";
			let lastName = contact.contact.lastName ? contact.contact.lastName : "";
			setContactName(firstName + " " + lastName);
			setTagList(contact.contact.tags ? contact.contact.tags : []);
			if (contact.contact.profilePic) {
				setImage(contact.contact.profilePic);
			} else {
				setImage(owner_img_1);
			}
			const ltvVal = Number(contact.contact.ltv);
			setLtv(ltvVal.toFixed(2));
		}
	};
	const [goToTransactionClicked, setGoToTransactionClicked] = useState(false);
	const goToTransactionHandler = () => {
		setGoToTransactionClicked(true);
	};
	const backToTransListHandler = () => {
		setGoToTransactionClicked(false);
	};

	/**
	 * Upload profile picture
	 * @param {*} event
	 */
	const handelChangeContactImage = (event) => {
		inputFile.current.click();
	};
	const getRandomFileName = () => {
		let timestamp = new Date().toISOString().replace(/[-:.]/g, "");
		let random = ("" + Math.random()).substring(2, 8);
		return timestamp + random;
	};
	const uploadImage = (event) => {
		let file = event.target.files[0];
		let allowedExtension = [
			"image/jpeg",
			"image/jpg",
			"image/png",
			"image/gif",
			"image/bmp",
		];
		let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
		if (
			file &&
			allowedExtension.indexOf(file.type) > -1 &&
			file.size < 5000000
		) {
			let newFileName = getRandomFileName() + "." + extension;
			const config = {
				bucketName: env.REACT_APP_BUCKET_NAME,
				region: env.REACT_APP_REGION,
				accessKeyId: env.REACT_APP_ACCESS_ID,
				secretAccessKey: env.REACT_APP_ACCESS_KEY,
			};
			setIsLoader(true);
			let oldFileName = file.name;
			Object.defineProperty(file, "name", {
				writable: true,
				value: newFileName,
			});
			uploadFile(file, config)
				.then(async (data) => {
					// setIsLoader(false);
					await ContactService.uploadProfilePic({
						contactId: props.contactId,
						file: data.location,
					});
					setImage(data.location);
				})
				.catch((err) => {
					setIsLoader(false);
				})
				.finally(() => {
					setIsLoader(false);
				});
		}
	};
	//Open guardian contact modal
	const openGuardianContactModal = (id) => {
		dispatch({
			type: actionTypes.CONTACTS_MODAL_ID,
			contact_modal_id: "",
		});
		setTimeout(() => {
			dispatch({
				type: actionTypes.CONTACTS_MODAL_ID,
				contact_modal_id: id,
			});
		}, 300);
	};

	const addContactTag = (e) => {
		setTagListToggle(!tagListToggle);
	};

	const selectTag = async (tag, mode) => {
		try {
			setIsLoader(true);
			let payload = {
				tag: tag,
			};
			let contact = await ContactService.applyRemoveTag(
				props.contactId,
				payload,
				"apply"
			);
			setIsLoader(false);
			setTagListToggle(false);
			setTagList([...tagList, tag]);
			console.log("tagList", tagList, contact);
		} catch (e) {
			setIsLoader(false);
			dispatch({
				type: actionTypes.SHOW_MESSAGE,
				message: e.message,
				typeMessage: "error",
			});
		}
	};
	const openContactTagModal = () => {
		setOpenModal(true);
	};
	const closeModalHandler = () => {
		setOpenModal(false);
	};
	const removeTag = async (tagId) => {
		try {
			setIsLoader(true);
			let payload = {
				tag: {
					_id: tagId,
				},
			};
			let contact = await ContactService.applyRemoveTag(
				props.contactId,
				payload,
				"remove"
			);
			setIsLoader(false);
			let filteredTags = tagList.filter((el) => el._id !== tagId);
			setTagList(filteredTags);
			console.log("tagList", tagList, contact);
		} catch (e) {
			setIsLoader(false);
			dispatch({
				type: actionTypes.SHOW_MESSAGE,
				message: e.message,
				typeMessage: "error",
			});
		}
	};
	// console.log("config.navigation.component.jump(9)config.navigation.component.jump(9)", config.navigation.jump(9));

	// const { prev, next, jump } = useSteps();
	return (
		<>
			<div className='modal contactModal'>
				{isLoader ? <Loader /> : ""}
				<div className='modalContainer'>
					<div
						className={
							stickeyHeadStatus
								? "contactModalHeader stickey newBg"
								: "contactModalHeader newBg"
						}
					>
						<div className='contactModalHeaderTopSec spaceFixing'>
							<div className='contactModalTopLeft'>
								<div className='userImageWrap'>
									<span className='userImage'>
										<img
											src={image}
											alt=''
										/>
									</span>
									<input
										type='file'
										id='file'
										ref={inputFile}
										onChange={uploadImage}
										style={{ display: "none" }}
									/>
									<button
										className='editUserImg'
										onClick={handelChangeContactImage}
									>
										<img
											src={camera_icon}
											alt=''
										/>
									</button>
								</div>
								<div
									className='userName'
									title={contactName}
								>
									{contactName.length > 20
										? contactName.substring(0, 20) + "..."
										: contactName}
								</div>
							</div>
							<div className='contactModalTopRight'>
								{!showBottomPart && (
									<div className='actionBtns'>
										{contactData && contactData.email && (
											<button
												className='roundBlue'
												//onClick={() => actionBtn.jump(9)}
											>
												{" "}
												<img
													src={email_icon_white}
													alt=''
												/>
												<span className='tooltiptextInfo'>
													{contactData.email.slice(0, 40) +
														(contactData.email.length > 40 ? "..." : "")}
												</span>
											</button>
										)}
										{contactData &&
											contactData.phone &&
											contactData.phone.number && (
												<button
													className='roundBlue'
													//onClick={() => openContactModal(contactData._id)}
													//onClick={() => actionBtn.jump(9)}
												>
													<img
														src={phone_call_icon_white}
														alt=''
													/>
													<span className='tooltiptextInfo'>
														{contactData.phone &&
														contactData.phone.dailCode &&
														contactData.phone.number
															? contactData.phone.dailCode +
															  "-" +
															  contactData.phone.number.slice(0, 12) +
															  (contactData.phone.number.length > 12
																	? "..."
																	: "")
															: ""}
													</span>
												</button>
											)}
									</div>
								)}
								{contactData.isDependent ? (
									!showBottomPart ? (
										<div
											className='userDependents'
											onClick={() =>
												openGuardianContactModal(contactData.guardianInfo._id)
											}
										>
											<img
												src={dependent_white}
												alt=''
											/>
											<span>
												Guardian -{" "}
												{contactData.guardianInfo.firstName +
													" " +
													contactData.guardianInfo.lastName}
											</span>
										</div>
									) : (
										""
									)
								) : (
									<div className='ltValue'>
										<header>Life Time Value :</header>
										<span>USD {ltv}</span>
									</div>
								)}
								{showBottomPart && (
									<button
										className='noBg pop'
										onClick={() => setShowBottomPart(false)}
									>
										<img
											src={popIn}
											alt=''
										/>
									</button>
								)}
								{!showBottomPart && (
									<button
										className='noBg pop'
										onClick={() => setShowBottomPart(true)}
									>
										<img
											src={popOut}
											alt=''
										/>
									</button>
								)}
								<button
									className='closeModal'
									onClick={() => closeContactModal()}
								>
									<img
										src={cross_white}
										alt=''
									/>
								</button>
							</div>
						</div>
						{props.contactId !== 0 && showBottomPart && (
							<div className='contactModalHeaderBottomSec spaceFixing'>
								<div className='bottomLeftArea'>
									{contactData &&
									contactData.isDependent &&
									contactData.guardianInfo ? (
										<div
											className='userDependents'
											onClick={() =>
												openGuardianContactModal(contactData.guardianInfo._id)
											}
										>
											<img
												src={dependent_white}
												alt=''
											/>
											<span>
												Guardian -{" "}
												{contactData.guardianInfo.firstName +
													" " +
													contactData.guardianInfo.lastName}
											</span>
										</div>
									) : (
										""
									)}
									<div className='userContacts'>
										{contactData &&
											contactData.phone &&
											contactData.phone.number && (
												<div className='userPhone'>
													<img
														src={phone_call_icon_white}
														alt=''
													/>
													<span>
														{contactData.phone &&
														contactData.phone.dailCode &&
														contactData.phone.number
															? contactData.phone.dailCode +
															  "-" +
															  contactData.phone.number
															: ""}
													</span>
												</div>
											)}
										{contactData && contactData.email && (
											<div className='userEmail overviewModal'>
												<img
													src={email_icon_white}
													alt=''
												/>
												<a className='mailToEmail'>{contactData.email}</a>
											</div>
										)}
									</div>
									{/* <div className="clockinArea">
                                        <button className="clockinBtn orangeBtn">
                                            <img src={histroy_icon_white} alt=""/> Check-in
                                        </button>
                                        <p className="logTime">Last attended 19 hrs ago</p>
                                    </div> */}
								</div>
								{
									<div className='bottomRightArea'>
										{/* <div className="bottomRightAreaCol firstCol">
                                        {(contactData && contactData.jobRole) &&
                                            <div className="userInfoCell jobRole">
                                                <span className="cellInfoIcon">
                                                    <img src={user_icon_white} alt=""/>
                                                </span>
                                                <span className="infoCellTxt">{contactData.jobRole}</span>
                                            </div>
                                        }
                                        {(contactData && contactData.contactType) &&
                                            <div className="userInfoCell prospect">
                                            <span className="cellInfoIcon">
                                                <img src={battery_icon_white} alt=""/>
                                            </span>
                                                <span className="infoCellTxt">{ contactData.contactType }</span>
                                            </div>
                                        }
                                    </div> */}
										<div className='bottomRightAreaCol tags'>
											{tagList.length ? (
												<div className='userInfoCell'>
													<span className='cellInfoIcon'>
														<img
															src={tag_icon_white}
															alt=''
														/>
													</span>
													<span
														className='infoCellTxt'
														onClick={openContactTagModal}
													>
														{0 < tagList.length &&
															tagList.map(
																(tag, key) =>
																	key <= 2 && (
																		<span key={key}>
																			{tag.name}
																			{key < tagList.length - 1 && key < 2 && (
																				<>,</>
																			)}{" "}
																		</span>
																	)
															)}
													</span>
													{tagList.length > 3 && (
														<button
															className='extraTagNumber noBg'
															onClick={() => openContactTagModal()}
														>
															+{tagList.length - 3}
														</button>
													)}
												</div>
											) : (
												""
											)}

											<div className='userInfoCell'>
												<button
													className='addNewTag '
													onClick={addContactTag}
												>
													+ Add Tag
												</button>
												{tagListToggle && (
													<>
														<TagList
															tagListToggle={tagListToggle}
															selectTag={selectTag}
														/>
													</>
												)}
											</div>
										</div>
									</div>
								}
							</div>
						)}
					</div>
					<div className='tabBarArea'>
						<Steps config={config}>
							<Step
								title='Overview'
								component={Overview}
								getContactDetails={getContactDetails}
								closeContactModal={closeContactModal}
								contactId={props.contactId}
								formScroll={(formScrollStatus) => formScroll(formScrollStatus)}
								page={props.page}
							/>
							<Step
								title='Attendance'
								component={Attendance}
								contactId={props.contactId}
							/>
							<Step
								title='Appointment'
								component={Appointment}
								contactId={props.contactId}
							/>
							<Step
								title='Transaction'
								contactId={props.contactId}
								contact={contactData}
								backToTransList={backToTransListHandler}
								goToTransaction={goToTransactionHandler}
								component={
									goToTransactionClicked ? TransactionChoose : Transaction
								}
							/>

							<Step
								title='Billing'
								component={Billing}
								contact={contactData}
								contactId={props.contactId}
							/>
							<Step
								title='Dependents'
								component={Dependents}
								contactId={props.contactId}
							/>

							<Step
								title='Automation'
								component={Automation}
								contactId={props.contactId}
							/>
							<Step
								title='Note'
								component={Notes}
								contactId={props.contactId}
							/>
							<Step
								title='Documents'
								component={Documents}
								contactId={props.contactId}
								contact={contactData}
								device={device}
							/>
							<Step
								title='Inbox'
								component={Inbox}
								contactId={props.contactId}
								contact={contactData}
								device={device}
							/>
						</Steps>
					</div>
				</div>
				<div
					className='modalOverlay'
					onClick={closeContactModal}
				></div>
			</div>
			{openModal && (
				<ShowContactTagModal
					closeModal={closeModalHandler}
					removeTag={removeTag}
					tagList={tagList}
				/>
			)}
		</>
	);
};

export default ContactModal;
