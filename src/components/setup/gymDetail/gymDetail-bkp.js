import React, { useEffect, useState } from "react";
import { utils } from "../../../helpers";
import Loader from "../../shared/Loader";
import { ErrorAlert, SuccessAlert } from "../../shared/messages";
import profileAvatar from "../../../assets/images/camera.svg";
import arrowRightWhite from "../../../assets/images/arrowRightWhite.svg";
import listIcon from "../../../assets/images/list_icon.svg";
import dot3gray from "../../../assets/images/dot3gray.svg";
import edit_gym from "../../../assets/images/edit_gym.svg";
import gymLogo from "../../../assets/images/gymLogo.svg";
import AddHolidayModal from "./addHolidayModal";
import config from "../../../configuration/config";

import { GymDetailsServices } from "../../../services/gymDetails/GymDetailsServices";


const GymDetails = (props) => {
  document.title = "Red Belt Gym - Gym Details";
  const [isLoader, setIsLoader] = useState(false);
  const [gymData, setGymData] = useState([]);
  const [option, setOption] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [showEdtiForm, setShowEdtiForm] = useState(false);

  const [gymName, setGymName] = useState("");
  const [gymContact, setGymContact] = useState("");
  const [gymEmail, setGymEmail] = useState("");
  const [logo, setLogo] = useState({
    image: "",
    imageUrl: ""
  });
  const [gymTimeZone, setGymTimeZone] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [picture, setPicture] = useState("");
  const [imgData, setImgData] = useState("");
  const [popMsgerror, setPopMsgerror] = useState(false);
  const [popMsgsuccess, setPopMsgsuccess] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [gymImageUpload, setGymImageUpload] = useState("");
  const [image, setImage] = useState(null);
  const [gymProfilePicName, setGymProfilePicName] = useState(null);

  const [holidayData, setHolidayData] = useState([
    {
      date1: "15/08/2022",
      date2: "15/08/2022",
      day: "Sun",
      holiday: "Independence Day"
    },
    {
      date1: "15/08/2022",
      date2: "15/08/2022",
      day: "Sat",
      holiday: "Netaji Birthday"
    },
    {
      date1: "26/01/2022",
      date2: "26/01/2022",
      day: "Mon",
      holiday: "Republic Day"
    },
    {
      date1: "15/08/2022",
      date2: "17/08/2022",
      day: "Tue",
      holiday: "Gandhi Birthday"
    }
  ]);
  const [productData, setProductData] = useState({
    profile: "",
    gymName: "",
    gymContact: "",
    countryCode: "",
    number: "",
    email: "",
    gymTime: ""
  });
  const [basicinfoPhone, setBasicinfoPhone] = useState({
    countryCode: "US",
    dailCode: "+1",
    number: "",
    full_number: "",
    location: "None",
    country: "",
    carrier: "None",
    timezone: "America/New_York",
    is_valid: false
  });
  const [phoneCountryCode, setPhoneCountryCode] = useState([]);
  const countrycodeOpt = phoneCountryCode ? phoneCountryCode.map((el, key) => {
    return (
      <option value={el.code} data-dailcode={el.prefix} key={key} >{el.code} ({el.prefix})</option>
    )
  }
  ) : '';

  const fetchGymDetails = async () => {
    try {
      setIsLoader(true);
      const gymData = await GymDetailsServices.fetchGymDetail();
      console.log("Gym Details", gymData);
      setGymData(gymData);
    } catch (e) {
      console.log(e.message);
      setPopMsgerror(e.message);
      // Show error message from here
    } finally {
      setIsLoader(false);
    }
  }
  useEffect(() => {
    fetchGymDetails();
  }, []);

  const onChangePicture = e => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handelBasicinfoPhone = (event) => {
    const { name, value } = event.target;
    if (name === "countryCode") {
      const daileCodeindex = event.target[event.target.selectedIndex];
      let dailCode = daileCodeindex !== undefined ? daileCodeindex.getAttribute("data-dailcode") : "+1";
      setBasicinfoPhone(prevState => ({ ...prevState, dailCode: dailCode }));
      setBasicinfoPhone(prevState => ({ ...prevState, countryCode: value }));
    }
    if (name === "number") {
      let pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(event.target.value)) {
        return false;
      } else {
        setBasicinfoPhone(prevState => ({ ...prevState, number: value }));
      }
    }
  };


  const gymNamehandler = (e) => {
    setGymName(e.target.value);
  };
  const gymContacthandler = (e) => {
    setGymContact(e.target.value);
  };
  const handlePhoneNumberChange = (e) => {
    e.preventDefault();
    setPhoneNumber(e.target.value);
  };

  const gymEmailhandler = (e) => {
    setGymEmail(e.target.value);
    let emailValid;
    emailValid = gymEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (!emailValid) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };
  
  const gymTimeZonehandler = (e) => {
    setGymTimeZone(e.target.value);
  };

  const editGymDetailsHandler = (event) => {
    event.preventDefault();
    setShowEdtiForm(true);
  }
  // const validateField = (type = null) => {
  //   // let emailValid;
  //   // emailValid = gymEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  //   // if(!emailValid){
  //   //   console.log("jio kaka")
  //   // }
  // };
  const updateGymDetailHandler = (event) => {
    event.preventDefault();

    if (imgData !== "" && gymName !== "" && gymContact !== "" && gymEmail !== "" && gymTimeZone !== "") {
      // console.log("a",statusName,"b", statusDesc,"c", statusType);
      setPopMsgsuccess(true);
      setTimeout(() => {
        setShowEdtiForm(false);
      }, 2000);
    } else {
      //console.log("failed aslkjlsh");
      setPopMsgerror(true)
    };

  }
  const toggleOptions = (index) => {
    setOption(index !== option ? index : null);
  };
  const openAddHolidayModal = () => {
    setOpenModal(true);

  }
  const closeHolidayModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (popMsgsuccess) setTimeout(() => { setPopMsgsuccess("") }, 2000);
    if (popMsgerror) setTimeout(() => { setPopMsgerror("") }, 2000);

  }, [popMsgerror, popMsgsuccess]);


  const gymImageUploadHandler = (event) => {

    setGymImageUpload(event.target.files);
    console.log(event.target.files[0]);
  }

  const changeGymLogoHandler = (event) => {
    console.log("kuguhu")
    const files = event.target.files;
    if (files && files.length) {
      const reader = new FileReader();
      reader.onload = (read) => {
        // setLogo(read.target.result);
        GymDetailsServices.imageupload({
          file: read.target.result,
          name: files[0].name
        }).then((result) => {
          const avatar = result.data.publicUrl;
          //setCourseData({ ...courseData, image: result.data.originalKey, imageUrl: result.data.publicUrl });
          console.log(avatar);
        }).catch(err => {
          console.log('Profile pic error', err);

        });
      };
      reader.readAsDataURL(files[0]);
    }
    // let files = gymImageUpload;
    //     if (files && files.length) {

    //         let reader = new FileReader();
    //         reader.onload = async (r) => {
    //             setImage(r.target.result);
    //             /**
    //              * Make axios call
    //              */
    //              let logoUploadResponce = await GymDetailsServices.imageupload({
    //                 file: r.target.result,
    //                 name: files[0].name
    //             })
    //                 // .then((result) => {
    //                 //     console.log('Profile pic: ', result);
    //                 //     let avatar = config.bucketUrl + result.data.originalKey;
    //                 //     setImage(avatar);
    //                 //     setGymProfilePicName(result.data.originalKey);
    //                 // })
    //                 // .catch(err => {
    //                 //     console.log('Profile pic error', err);
    //                 // });

    //               console.log(logoUploadResponce);
    //         };
    //         reader.readAsDataURL(files[0]);
    //     }
  }

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files && files.length) {
      const reader = new FileReader();
      reader.onload = (read) => {
        GymDetailsServices.imageupload({
          file: read.target.result,
          name: files[0].name
        }).then((result) => {
          const avatar = result.data.publicUrl;
          setLogo({ image: result.data.originalKey, imageUrl: result.data.publicUrl });
          console.log(avatar);
        }).catch(err => {
          console.log('Profile pic error', err);
        });
      };
      reader.readAsDataURL(files[0]);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <>
      {(isLoader) ? <Loader/>: ''}
      <div className="dashInnerUI">
        <div class="userListHead">
          <div class="listInfo">
            <ul class="listPath">
              <li>Settings </li>
              <li> Gym Details</li>
            </ul>
            <h2 class="inDashboardHeader">
              Gym Details
            </h2>
            <p class="userListAbout">Lorem ipsum dolor sit amet. Semi headline should be here.</p>
          </div>
        </div>
        <div className="gymDetails">
          <div className="gymdetails_left">
            {!showEdtiForm &&
              <div className="showing_gym_data">
                <div className="gymName">
                  <div>
                    {/* <img src={(gymData?.gymDetails?.logo) ? "https://wrapperbucket.s3.us-east-1.amazonaws.com/"+ gymData?.gymDetails?.logo : gymLogo} alt=""/> */}
                    {logo.image ? <img src={logo.imageUrl} alt="" />
                      : <img src={profileAvatar} alt="" />}
                    <span>{(gymData?.gymDetails?.name) ? gymData?.gymDetails?.name : "-"}</span>
                    {/* <div class="w-100">
                      {gymImageUpload === ""? 
                       <div className="hideStylefile">
                         <input type="file" onChange={(e) => handleImageUpload(e)} /> <span>Change</span>
                       </div> :
                       <button onClick={changeGymLogoHandler}>Upload</button>
                      }
                    </div> */}
                  </div>
                  <button onClick={editGymDetailsHandler}><img src={edit_gym} alt="" /></button>
                </div>
                <div className="gymInfo full">
                  <p className="textType1">Contact Person</p>

                  <p className="textType2">{(gymData?.gymDetails?.contactPerson) ? gymData?.gymDetails?.contactPerson : "-"}</p>
                </div>
                <div className="d-flex">
                  <div className="gymInfo half">
                    <p className="textType1">Contact No.</p>
                    <p className="textType3">{(gymData?.gymDetails?.phone) ? gymData?.gymDetails?.phone : "-"}</p>
                  </div>
                  <div className="gymInfo half">
                    <p className="textType1">Contact Email</p>
                    <p className="textType4">{(gymData?.gymDetails?.contactEmail) ? gymData?.gymDetails?.contactEmail : "-"}</p>
                  </div>
                </div>
                {/* <div className="gymBreak">
                      <img src={coffee} alt=""/>
                      <div>
                      Break Time
                      <h3>45 min</h3>
                      </div>
                  </div> */}
                <div className="formControl timezone gymInfo">
                  <p className="textType1">Timezone</p>
                  <select disabled>
                    <option>{(gymData?.gymDetails?.timezone) ? gymData?.gymDetails?.timezone : "-"}</option>
                  </select>
                </div>
              </div>
            }
            {/* form section.................... */}
            {showEdtiForm &&
              <form method="post" onSubmit={handleSubmit}>
                <div className="formControl">

                  <div className="profile">
                    <div className="profileUpload">
                      <input type="file" onChange={(e) => handleImageUpload(e)} />
                      {/* <input type="file" 
                         name="profile" 
                         onChange={onChangePicture} 
                         defaultValue={productData.profile}
                      /> */}
                    </div>
                    <div className="profilePicture">
                      {logo.image ? <img src={logo.imageUrl} alt="" />
                        : <img src={profileAvatar} alt="" />}
                    </div>
                    <div className="profileText"> Gym Logo</div>
                  </div>
                </div>
                <div className="formControl">
                  <label>Gym/Organization Name</label>
                  <input
                    type="text"
                    placeholder="Ex. Fitbit"
                    name="gymName"
                    onChange={gymNamehandler}
                    defaultValue={productData.gymName}
                  />
                </div>
                <div className="formControl">
                  <label>Contact Person</label>
                  <input
                    type="text"
                    placeholder="Ex. Jon Doe"
                    name="gymContact"
                    onChange={gymContacthandler}
                    defaultValue={productData.gymContact}
                  />
                </div>
                <div className="formControl phone">
                  <label>Phone No</label>
                  <div className="cmnFormField">
                    <div className="countryCode cmnFieldStyle">
                      <div className="countryName">{basicinfoPhone.countryCode}</div>
                      <div className="daileCode">{basicinfoPhone.dailCode}</div>
                      <select className="selectCountry" name="countryCode" defaultValue={basicinfoPhone.countryCode} onChange={handelBasicinfoPhone}>
                        {countrycodeOpt}
                      </select>
                    </div>
                    <input type="phone" className="" name="number" placeholder="Eg. (555) 555-1234"
                      defaultValue={productData.number} onChange={handlePhoneNumberChange} />

                  </div>
                </div>
                <div className="formControl">
                  <label>Contact Email</label>
                  <input type="text" placeholder="Ex. admin@fitbit.come" name="email"
                    onChange={gymEmailhandler}
                    defaultValue={productData.email}
                  //onKeyUp={() => validateField()}
                  />
                  {emailError && <div className="errorMsg">Please Provide a proper Email address</div>}
                </div>
                {/* <div className="formControl breaktime">
                      <label>Break Time</label>
                      <input type="text" name=""/> <span>min</span>
                  </div> */}
                <div className="formControl timezone">
                  <label>Timezone</label>
                  <select onChange={gymTimeZonehandler} name="gymTime" defaultValue={productData.gymTime}>
                    <option>Select Timezone</option>
                    <option>IST - Asia/Kolkata (GMT+5:30)</option>
                    <option>GST -London</option>
                  </select>
                </div>
                {(popMsgerror === true) && <ErrorAlert message="Fill Up all the field" extraClass="addStatsPopMsg" />}

                {(popMsgsuccess === true) && <SuccessAlert message="You Successfully added a status" extraClass="addStatsPopMsg" />}
                <button className="common_blue_button" onClick={updateGymDetailHandler} type="submit">
                  Save <img alt="" src={arrowRightWhite} />
                </button>

              </form>

            }
          </div>
          <div className="gymdetails_right">
            {(holidayData.length === 0) &&
              <div className="emptyList">
                <div className="holidayListHeader">
                  <div>
                    <h3>Holiday List</h3>
                    <p>Explanatory text blurb here</p>
                  </div>
                </div>
                <div className="addInEmptySpace">
                  <img alt="" src={listIcon} />
                  <div>You haven’t created any holiday yet.</div>
                  <button className="common_blue_button" onClick={openAddHolidayModal}>
                    Add a Holiday <img alt="" src={arrowRightWhite} />
                  </button>
                </div>
              </div>
            }
            {(holidayData.length !== 0) &&
              <div className="holidayList">
                <div className="holidayListHeader">
                  <div>
                    <h3>Holiday List</h3>
                    <p>Explanatory text blurb here</p>
                  </div>
                  <div>
                    <button className="common_blue_button" onClick={openAddHolidayModal}>
                      Add a Holiday <img alt="" src={arrowRightWhite} />
                    </button>
                  </div>
                </div>
                <div className="gymHolidayList header">
                  <div className="cell">Start Date</div>
                  <div className="cell">End Date</div>
                  <div className="cell">Holiday</div>
                </div>
                {holidayData.map((elem, key) => {
                  return (
                    <div className="gymHolidayList">
                      <div className="cell">{elem.date1}</div>
                      <div className="cell">{elem.date2}</div>
                      <div className="cell">{elem.holiday}
                        <div className="sideEditOption">
                          <button onClick={() => {
                            toggleOptions(key);
                          }}>
                            <img src={dot3gray} alt="" />
                          </button>
                          <div className={
                            option === key
                              ? "dropdownOptions listOpen"
                              : "listHide"
                          }>
                            <button class="btn btnEdit">
                              <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.553 13.553" class="editIcon"><g transform="translate(0.75 0.75)"><path class="a" d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423" transform="translate(-2 -2.795)"></path><path class="a" d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z" transform="translate(-4.384 -2)"></path></g></svg>
                              </span>
                              Edit
                            </button>
                            <button class="btn btnDelete">
                              <span>
                                <svg class="deleteIcon" xmlns="http://www.w3.org/2000/svg" width="12.347" height="13.553" viewBox="0 0 12.347 13.553"><g transform="translate(0.75 0.75)"><path class="a" d="M3,6H13.847" transform="translate(-3 -3.589)"></path><path class="a" d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411" transform="translate(-3.795 -2)"></path><line class="a" y2="3" transform="translate(4.397 6.113)"></line><line class="a" y2="3" transform="translate(6.397 6.113)"></line></g></svg>
                              </span>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
                )}

              </div>
            }
          </div>
        </div>
      </div>
      {openModal && <AddHolidayModal closeAddHolidayModal={closeHolidayModal} />}
    </>
  );
};

export default GymDetails;
