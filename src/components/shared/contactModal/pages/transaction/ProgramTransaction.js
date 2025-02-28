import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import aaroww from "../../../../../assets/images/arrow_forward.svg";
import info_icon from "../../../../../assets/images/infos.svg";
import bell from "../../../../../assets/images/bell.svg";
import Loader from "../../../../shared/Loader";
import { ProgramServices } from "../../../../../services/transaction/ProgramServices";
import { utils } from "../../../../../helpers";
import DownPayments from "./DownPayments";
import moment from "moment";
import AddCourseModal from "../../../../setup/course/src/addCourseModal";
import { CourseServices } from "../../../../../services/setup/CourseServices";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

const ProgramTransaction = (props) => {
  const [startDate, setStartDate] = useState();
  const [payLaterDate, setPayLaterDate] = useState();
  const [calenderMinDate, setCalenderMinDate] = useState();
  const [isLoader, setIsLoader] = useState(false);

  const [isAddPogramModal, setIsAddPogramModal] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  const [chooseCategory, setChooseCategory] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [programList, setProgramList] = useState([]);

  const [contractData, setContractData] = useState({
    contact: props.contactId,
    billingId: "",
    courseName: "",
    courseIndex: "",
    courseImage: "",
    amount: "",
    duration: "",
    durationInterval: "Year",
    payment_type: "onetime",
    billing_cycle: "Yearly",
    courseStart: "",
    numberOfPayments: 1,
    paymentDate: moment().format("YYYY-MM-DD"),
    minPaymentDate: moment().add(1, "days").format("YYYY-MM-DD"),
    firstBillingTime: false,
    auto_renew: 0,
    isPayNow: 1,
    default_transaction: "online",
    nextDueDate: "",
    isDownPayment: false,
    downPayments: []
  });

  const [formErrors, setFormErrors] = useState({
    courseName: "",
    courseStart: "",
    duration: "",
    amount: "",
    billing_cycle: ""
  });

  const timezoneOffset = useSelector((state)=> (state?.user?.data?.organizationTimezoneInfo.utc_offset) ? state?.user?.data?.organizationTimezoneInfo.utc_offset:null);


  useEffect(() => {
      let localDateTime = moment().utc().format("YYYY-MM-DD HH:mm:ss");
      let timezoneDateTime = utils.convertUTCToTimezone(localDateTime ,timezoneOffset, "YYYY-MM-DD");
      let tomorrowDate = moment().add(1, 'days').utc().format("YYYY-MM-DD HH:mm:ss");
      let tomorrowsDateConverted = utils.convertUTCToTimezone(tomorrowDate ,timezoneOffset, "YYYY-MM-DD");
      setCalenderMinDate(timezoneDateTime);
      setPayLaterDate(new Date(tomorrowsDateConverted))
      setStartDate(null);
  }, []);

  const getLatestClone = () => JSON.parse(JSON.stringify(contractData));
  const addDownPaymentsRef = useRef();

  //Open add program modal
  const openAddPogramModal = (e) => {
    e.preventDefault();
    setIsAddPogramModal(true);
  }

  const closeAddCourseModal = (param) => {
    setIsAddPogramModal(false);
    if (param === "fetch") {
      fetchPrograms(true);
    }
  }

  const fetchCategories = async () => {
    try {
      const hasPermission = utils.hasPermission("course", "read");
      if (!hasPermission) throw new Error("You do not have permission");
      const result = await CourseServices.fetchCategory();
      if (result.length) {
        setCategoryData(result);
      }
    } catch (e) {
    }
  };

  const chooseCategoryFn = () => {
    setChooseCategory(!chooseCategory);
  };

  const selectProgram = (item, index) => {
    let durationArray = item.duration.split(" ");
    console.table(durationArray);
    setContractData({
      ...contractData,
      courseName: item.name,
      courseIndex: index,
      courseImage: item.image,
      duration: durationArray[0],
      durationInterval: durationArray[1],
      billing_cycle: durationArray[1] == "week" ? "weekly" : (durationArray[1] == "month" ? "monthly" : "yearly"),
      payment_type: item.payment_type,
      amount: item.fees
    });
    setSelectedProgram(item);
    setChooseCategory(false);
  };

  //Update current program state
  useEffect(() => {
    if (props.programContractData) {
      setSelectedProgram({ name: props.programContractData.courseName })
      setContractData(props.programContractData);
    }
  }, [props.programContractData])

  //Fetch programs
  useEffect(() => {
    fetchPrograms();
    //Fetch course categories
    fetchCategories();
  }, []);


  useEffect(() => {
  }, [contractData]);


  
  const fetchPrograms = async (isNewProgram = false) => {
    try {
      setIsLoader(true);
      const pageId = utils.getQueryVariable('page');
      const queryParams = new URLSearchParams();
      const fetchProgram = await ProgramServices.fetchPrograms();
      if (fetchProgram.courses.length) {
        setProgramList(fetchProgram.courses);
        //Select first if created new program
        if(isNewProgram){
          selectProgram(fetchProgram.courses[0], 0)
        }
      }
    } catch (e) {
    } finally {
      setIsLoader(false);
    }
  }

  //Down payments call back function
  const downPaymentsCallbackFn = (dataFromChild) => {
    let clone = getLatestClone();
    if (dataFromChild.isDownPayment) {
      clone.downPayments = dataFromChild.downPaymentElems;
    } else {
      clone.downPayments = [];
    }
    clone.isDownPayment = dataFromChild.isDownPayment;
    setContractData(clone);
  };

  //Validate down payment cards
  const validatDownPaymentsFn = () => {
    return addDownPaymentsRef.current.validate();
  };

  //Duration change
  const handleDurationChange = (e) => {
    e.preventDefault();
    setContractData({ ...contractData, duration: e.target.value });
  }

  //Duration interval change
  const handelDurationIntervalChange = (e) => {
    const durationInterval = e.target.value;
    const cycle = durationInterval == "week" ? "weekly" : (durationInterval == "month" ? "monthly" : "yearly");
    setContractData(prevState => {
      return {
        ...prevState,
        durationInterval: durationInterval,
        billing_cycle: cycle
      }
    })
  }

  //Payment type change
  const handelPaymentTypeChange = (e) => {
    e.preventDefault();
    setContractData({ ...contractData, payment_type: e.target.value });
  }
  
  //Payment type change
  const handelBillingCycleChange = (e) => {
    setContractData(prevState => {
      return { 
        ...prevState, 
        billing_cycle: e.target.value
      }
    });
  }

  //Tuition amount change
  const handleTutionAmountChange = (e) => {
    e.preventDefault();
    setContractData({ ...contractData, amount: e.target.value });
  }

  //Payment mode change
  const handelPaymentModeChange = (e) => {
    e.preventDefault();
    setContractData({ ...contractData, default_transaction: e.target.value });
  }

  const handelFirstBillingDateToggle = (e) => {
    if (e.target.checked) {
      setContractData({ ...contractData, firstBillingTime: e.target.checked, paymentDate: moment().add(1, "days").format("YYYY-MM-DD"), isPayNow: 0 });
    } else {
      setContractData({ ...contractData, firstBillingTime: e.target.checked, paymentDate: moment().format("YYYY-MM-DD"), isPayNow: 1 });
    }
  }

  //First billing date change
  // const handelFirstBillingDateChange = (e) => {
  //   e.preventDefault();
  //   console.log('first billing date change', e.target.value);
  //   setContractData({ ...contractData, paymentDate: e.target.value, isPayNow: 0 });
  // }

  const handelFirstBillingDateChange = (val) => {
    if (val) {
      const yyyy = val.getFullYear();
      let mm = val.getMonth() + 1; // Months start at 0!
      let dd = val.getDate();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      let formattedDate = `${yyyy}-${mm}-${dd}`;
      setPayLaterDate(val);
      setContractData({ ...contractData, paymentDate: formattedDate, isPayNow: 0  });
    }
  }

  //Program start date change
  // const handelProgramStartDateChange = (e) => {
  //   e.preventDefault();
  //   console.log('Program start date change', e.target.value);
  //   setContractData({ ...contractData, courseStart: e.target.value });
  // }

  const handelProgramStartDateChange = (val) => {
    if (val) {
      const yyyy = val.getFullYear();
      let mm = val.getMonth() + 1; // Months start at 0!
      let dd = val.getDate();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      let formattedDate = `${yyyy}-${mm}-${dd}`;
      setStartDate(val);
      setContractData({ ...contractData, courseStart: formattedDate });
    }
  }

  //Auto renew 
  const handelAutoRenewChange = (e) => {
    setContractData({ ...contractData, auto_renew: e.target.checked ? 1 : 0 });
  }


  //Count no of payments
  useEffect(() => {
    if (contractData.duration) {
      let nextDueDate = "";
      let noOfPayments = 1;
      if (contractData.payment_type === 'recurring') {
        nextDueDate = utils.getNextDueDate(contractData.paymentDate, 1, contractData.billing_cycle)
        /**
         * Example
         * duration : 6 years
         * billing cycle : monthly
         */
        if (contractData.durationInterval === 'year') {
          if (contractData.billing_cycle === 'monthly') {
            noOfPayments = contractData.duration * 12;
          } else if (contractData.billing_cycle === 'weekly') {
            noOfPayments = contractData.duration * 52;
          } else {
            noOfPayments = contractData.duration * 1;
          }
        } else {
          noOfPayments = contractData.duration * 1;
        }

      } else if (!contractData.firstBillingTime && contractData.payment_type === 'onetime') {
        nextDueDate = ""
      }
      setContractData(prevState => {
        return { 
          ...prevState, 
          nextDueDate: nextDueDate, 
          numberOfPayments: noOfPayments 
        }
      });
    }
  }, [
    contractData.duration,
    contractData.durationInterval,
    contractData.billing_cycle,
    contractData.payment_type,
    contractData.firstBillingTime,
    contractData.paymentDate
  ]);


  //Continue to buy
  const continueToBuy = (e) => {
    e.preventDefault();
    //return false;
    let formErrorsCopy = formErrors;
    let isError = false;

    //Validate down payments
    if (contractData.isDownPayment) {
      let validateDP = validatDownPaymentsFn();
      if (!validateDP) {
        isError = true;
      }
    }

    //Program name
    if (!contractData.courseName) {
      isError = true;
      formErrorsCopy.courseName = "Please select a program."
    }

    //Duration
    let threeDigit = /^\d{0,3}$/;
    if (!contractData.duration) {
      isError = true;
      formErrorsCopy.duration = "Please provide the program duration."
    } else if (isNaN(contractData.duration)) {
      isError = true;
      formErrorsCopy.duration = "Numeric value required"
    } else if (contractData.duration <= 0) {
      isError = true;
      formErrorsCopy.duration = "Please provide a valid duraion"
    } else if (!threeDigit.test(contractData.duration)) {
      isError = true;
      formErrorsCopy.duration = "Please provide 3 digit"
    }

    //Duration interval
    // if (contractData.durationInterval === 'month' &&
    //   contractData.billing_cycle === 'yearly' &&
    //   contractData.payment_type === 'recurring') {
    //   isError = true;
    //   formErrorsCopy.billing_cycle = "Please modify billing cycle"
    // }

    // if (contractData.durationInterval === 'month' &&
    //   contractData.billing_cycle === 'yearly' &&
    //   contractData.payment_type === 'onetime') {
    //   isError = true;
    //   formErrorsCopy.billing_cycle = "Please modify billing cycle"
    // }

    //Tuition amount
    let regex = /^\d{0,5}(\.\d{1,2})?$/;
    if (!contractData.amount) {
      isError = true;
      formErrorsCopy.amount = "Please provide the program tuition fee."
    } else if (isNaN(contractData.amount)) {
      isError = true;
      formErrorsCopy.amount = "Numeric value required"
    } else if (contractData.amount <= 0) {
      isError = true;
      formErrorsCopy.amount = "Tuition fee can't be zero."
    } else if (!regex.test(contractData.amount)) {
      isError = true;
      formErrorsCopy.amount = "Tuition fee can't be more than 2 decimal places."
    }

    //Program/Course start date
    if (!contractData.courseStart) {
      isError = true;
      formErrorsCopy.courseStart = "Please select program start date."
    }

    if (isError) {
      //Show errors
      setFormErrors({
        courseName: formErrorsCopy.courseName,
        courseStart: formErrorsCopy.courseStart,
        duration: formErrorsCopy.duration,
        amount: formErrorsCopy.amount,
        billing_cycle: formErrorsCopy.billing_cycle
      });

      setTimeout(
        () => setFormErrors({
          ...formErrors,
          courseName: "",
          courseStart: "",
          duration: "",
          amount: "",
          billing_cycle: ""
        }),
        4000
      );
    } else {
      //Redirect to contract overview
      props.contractOverviewFn(e, contractData);
    }
  }


  return (
    <React.Fragment>
      <form>
        <div className="transaction_form products forProducts">

          <div className="formsection gap">

            <div className="cmnFormRow">
              <label className="labelWithInfo">
                <span className="labelHeading">Select Program</span>
                {/*<span className="infoSpan">
                  <img src={info_icon} alt="" />
                  <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                </span>*/}
              </label>

              <div
                className={chooseCategory
                  ? "cmnFormField programsTransaction listActive"
                  : (formErrors.courseName ? "cmnFormField programsTransaction errorField" : "cmnFormField programsTransaction")
                }

              >
                <span
                  className="cmnFieldStyle selectProg"

                  //onChange={(e)=>props.toggleContactListFn(e)}
                  onClick={chooseCategoryFn}
                >
                  {selectedProgram ? selectedProgram.name : "Select a program"}
                </span>
                {chooseCategory && (
                  // {props.toggleContactList.status && (
                  <React.Fragment>
                    <div className="contactListItems">
                      <button
                        className="btn"
                        onClick={(e) => openAddPogramModal(e)}
                      >+ Add New Program</button>

                      <ul>
                      {isLoader ? <Loader /> : ''}
                        {programList.length ? programList.map((item, index) => {
                          return (
                            <li onClick={() => selectProgram(item, index)} key={index} className={contractData.courseIndex == index ? "active" : ""}>{item.name}</li>
                          )
                        }) : !isLoader ? <li>No data!</li> : ''
                        }
                      </ul>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
          <div className="formsection gap">
            <label className="labelWithInfo">
              <span className="labelHeading">Duration</span>
              {/*<span className="infoSpan">
                <img src={info_icon} alt="" />
                <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
              </span>*/}
            </label>
            <span className={(formErrors.duration ? "leftSecTransaction errorField" : "leftSecTransaction")}>
              <input type="text" className="cmnFieldStyle" onChange={handleDurationChange} value={contractData.duration} />
            </span>
            <span className="rightSecTransaction">
              <select className="selectBox" name="duration_interval" value={contractData.durationInterval} onChange={handelDurationIntervalChange}>
              <option value="week">Week(s)</option>
                <option value="month">Month(s)</option>
                <option value="year">Year(s)</option>
              </select>
            </span>
          </div>


          <div className="formsection gap">

            <span className="leftSecTransaction">

              <label className="labelWithInfo">
                <span className="labelHeading">Payment Type</span>
                {/*<span className="infoSpan">
                  <img src={info_icon} />
                  <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                </span>*/}
              </label>
              <select className="selectBox" name="paymentType" value={contractData.payment_type} onChange={handelPaymentTypeChange}>
                <option value="onetime">Onetime</option>
                <option value="recurring">Recurring</option>
              </select>
            </span>
            <span className={formErrors.billing_cycle ? "rightSecTransaction errorField" : "rightSecTransaction"}>
              <label className="labelWithInfo">
                <span className="labelHeading">Billing Cycle</span>
                {/*<span className="infoSpan">
                  <img src={props.info_icon} />
                  <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                </span>*/}
              </label>
              <select className="selectBox" name="billingCycle" value={contractData.billing_cycle} onChange={handelBillingCycleChange} 
              disabled={contractData.payment_type === 'onetime' || contractData.durationInterval === 'week' || contractData.durationInterval === 'month' }>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </span>
          </div>
          <div className="formsection gap">
            <div className="cmnFormCol">
              <label className='labelWithInfo'>
                <span className="labelHeading">Tuition Amount</span>
                {/*<span className="infoSpan">
                  <img src={info_icon} alt="" />
                  <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                </span>*/}
              </label>
              <div className={(formErrors.amount ? "cmnFormField preField errorField" : "cmnFormField preField")}>
                <div className='unitAmount'>
                  $
                </div>
                <input type="text" className="cmnFieldStyle" value={contractData.amount} onChange={handleTutionAmountChange} />
              </div>
            </div>
            <div className="cmnFormCol">
              <label className='labelWithInfo'>
                <span className="labelHeading">Payment Mode</span>
                {/*<span className="infoSpan">
                  <img src={info_icon} alt="" />
                  <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                </span>*/}
              </label>

              <div className='cmnFormField'>
                <select className='selectBox' name="paymentMode" value={contractData.default_transaction} onChange={handelPaymentModeChange}>
                  <option value="online" defaultValue={contractData?.default_transaction}>Online</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
            </div>
          </div>

          <div className="formsection gap">

            <div className="leftSecTransaction billWraper">
              <label className="labelWithInfo firstBillTimeWraper">
                {/* <span className="labelHeading">First Billing Date</span> */}
                <label className="labelWithInfo paymentTime firstBillTime programBillings">
                  <span className="labelHeading">I want to Pay Later</span>
                  <label
                    className={contractData.firstBillingTime ? "toggleBtn active" : "toggleBtn"
                    }
                  >
                    <input
                      type="checkbox"
                      name="check-communication"
                      onChange={handelFirstBillingDateToggle}
                      checked={contractData.firstBillingTime}
                    />
                    <span className="toggler"></span>
                  </label>
                </label>
                {/* <span className="infoSpan">
                <img src={info_icon} alt="" />
                <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
              </span> */}
              </label>
              <div className={contractData.firstBillingTime ? "paymentNow" : "paymentNow display"} >
                <p>1st Billing Date <span>Now</span></p>
              </div>
              <div className={contractData.firstBillingTime ? "paymentNow display" : "paymentNow"} >
                <DatePicker 
                  className="cmnFieldStyle"
                  selected={payLaterDate}
                  format="MM/dd/yyyy"
                  dateFormat="MM/dd/yyyy"
                  placeholderText="MM/DD/YYYY"
                  onChange={(e) => handelFirstBillingDateChange(e)} 
                  minDate={new Date(moment(calenderMinDate).add(1, "days"))}
                />
              </div>
            </div>
            <div className={formErrors.courseStart ? "rightSecTransaction errorField" : "rightSecTransaction"}>

              <label className="labelWithInfo">
                <span className="labelHeading">Program Start Date</span>
                {/*<span className="infoSpan">
                  <img src={info_icon} alt="" />
                  <span className="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                </span>*/}
              </label>
              {/* <input type="date" 
                name="programStartDate" 
                placeholder="mm/dd/yyyy" 
                onChange={handelProgramStartDateChange} 
                className="programStartDate cmnFieldStyle" 
                defaultValue={contractData.courseStart} 
              /> */}
              <DatePicker 
                  className="cmnFieldStyle"
                  selected={startDate}
                  format="MM/dd/yyyy"
                  dateFormat="MM/dd/yyyy"
                  placeholderText="MM/DD/YYYY"
                  onChange={(e) => handelProgramStartDateChange(e)} 
                  minDate={new Date(calenderMinDate)}
              />
            </div>
          </div>
          <div className="formsection gap autoRenew">
            <span className="labelWithInfo">
              <label><div className="customCheckbox"><input type="checkbox" name="autoRenew" onChange={handelAutoRenewChange} checked={contractData.auto_renew} /><span></span></div>Auto Renewal</label>
              <span className="infoSpan">
                <img src={info_icon} alt="" />
                <span className="tooltiptextInfo">Recurring payment will continue irrespective of duration of the program until it's cancelled.</span>
              </span>
            </span>
          </div>
          <div className="formsection gap autoRenew">
            {contractData.nextDueDate ?
              <div className="autoRenewDate">
                <img src={bell} alt="" />
                <p>Next Payment Due Date <span className="renewDate">{contractData.nextDueDate}</span></p>
              </div>
              : ''
            }

          </div>
        </div>

        <DownPayments
          downPaymentsCallback={downPaymentsCallbackFn}
          ref={addDownPaymentsRef}
          contractData={contractData}
        />
        {/* <button className={props.courseSelected ? "saveNnewBtn" : "saveNnewBtn disabled"} onClick={props.buyCourse}>Buy <img src={aaroww} alt="" /></button> */}

        <div className="continueBuy">
          <button className="saveNnewBtn" onClick={(e) => continueToBuy(e)}>Continue to Buy <img src={aaroww} alt="" /></button>
        </div>
      </form>

      {isAddPogramModal &&
        <AddCourseModal
          closeCourseModal={(param) => closeAddCourseModal(param)}
          retriveCourses={() => fetchPrograms()}
          retrieveCategories={fetchCategories}
          categories={categoryData}
          editCourseItem=""
          inProgramTransation="yes"
        />
      }
    </React.Fragment>
  );
};

export default ProgramTransaction;