import React, { useEffect, useState } from "react";

import Loader from "../../Loader";
import { ContactService } from "../../../../services/contact/ContactServices";

import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import updown from "../../../../assets/images/updown.png";
import icon_trans from "../../../../assets/images/icon_trans.svg";
import icon_dependent from "../../../../assets/images/dependent.svg";
import appointmentImg from "../../../../assets/images/appointments.svg";
import tags from "../../../../assets/images/tags.svg";
import crossWhite from "../../../../assets/images/cross_w.svg";
import successApp from "../../../../assets/images/successApp.svg";
import dot3gray from "../../../../assets/images/dot3gray.svg";
import cross from "../../../../assets/images/cross.svg";
import setupIcon from "../../../../assets/images/setupicon8.svg";
import Scrollbars from "react-custom-scrollbars-2";

const Appointment = (props) => {
  const [isLoader, setIsLoader] = useState(false);
  const [phoneCountryCode, setPhoneCountryCode] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [communication, setCommunication] = useState(false);
  const [addDependentModal, setAddDependentModal] = useState(false);
  const [toggleContactList, setToggleContactList] = useState({
    status: false,
    listContent: [],
  });

  const [toggleTagList, setToggleTagList] = useState({
    status: false,
  });

  const [toggleTagList1, setToggleTagList1] = useState({
    status: false,
  });

  const [toggleTagList2, setToggleTagList2] = useState({
    status: false,
  });

    const [toggleTagList3, setToggleTagList3] = useState({
    status: false,
  });




  const [toggleTagSuccess, setToggleTagSuccess] = useState({
    status: false,
    listTagSuccess: [],
  });

  const fetchCountry = async () => {
    let conntryResponse = await ContactService.fetchCountry();
    setPhoneCountryCode(conntryResponse);
  };

  const addDependentModalFn = () => {
    setAddDependentModal(true);
  };

  const toggleContactListFn = (e) => {
    e.preventDefault();

    let contactListOp = toggleContactList;

    setToggleContactList({
      ...toggleContactList,
      status: !toggleContactList.status,
    });
  };



const toggleTagListFn = (e) => {
    e.preventDefault();

    let contactTagOp = toggleTagList;

    setToggleTagList({
      ...toggleTagList,
      status: !toggleTagList.status,
    });
  };



  const toggleTagList1Fn = (e) => {
    e.preventDefault();

    let contactTagOp = toggleTagList1;

    setToggleTagList1({
      ...toggleTagList1,
      status: !toggleTagList1.status,
    });
  };


  const toggleTagList2Fn = (e) => {
    e.preventDefault();

    let contactTagOp = toggleTagList2;

    setToggleTagList2({
      ...toggleTagList2,
      status: !toggleTagList2.status,
    });
  };



  const toggleTagList3Fn = (e) => {
    e.preventDefault();

    let contactTagOp = toggleTagList3;

    setToggleTagList3({
      ...toggleTagList3,
      status: !toggleTagList3.status,
    });
  };



  const toggleTagSuccessFn = (e) => {
    e.preventDefault();

    let contactTagSuccessOp = toggleTagSuccess;

    setToggleTagSuccess({
      ...toggleTagSuccess,
      status: !toggleTagSuccess.status,
    });
  };


  const closeModal = () => {
    setAddDependentModal(false);
    setCommunication(false);
  };

  useEffect(() => {
    fetchCountry();
  }, [phoneCountryCode]);

  return (
    <>
     <div className="contactTabsInner">
        <h3 className="headingTabInner">Appointment</h3>
        
          <div className="transHeader">
            <button className="saveNnewBtn" onClick={() => addDependentModalFn()}>
              Add an Appointment <img src={arrow_forward} alt="" />
            </button>
            <span>* Explanatory text blurb should be here.</span>

            <div className="noDataFound appointmentTab">
              <span>
                <span>This contact doesn’t have a appointment yet.</span>
              </span>
            </div>
          </div>
       
        
      </div>

      {addDependentModal && (
        <div className="modalDependent modalBackdrop">
          {isLoader ? <Loader /> : ""}
          <div className="slickModalBody">


          
            
            <div className={
                        toggleTagSuccess.status
                          ? "modalForm appointmentForm setappointment successApp"
                          : "modalForm appointmentForm setappointment"
                      }
                      >
               <Scrollbars
                renderThumbVertical={(props) => (
                  <div className="thumb-vertical appModalScroll" />
                )}
              > 
                <form method="post" className={
                        toggleTagSuccess.status
                          ? "dsiplay none"
                          : "dsiplay"
                      }
                    >
                    <div className="slickModalHeader">
		              <button className="topCross setApp" onClick={() => closeModal(false)}>
		                <img src={cross} alt="" />
		              </button>
		              <div className="circleForIcon">
		                <img src={appointmentImg} alt="" />
		              </div>
		              <h3>Set an Appointment</h3>
		            </div>

                  <div className="cmnFormRow">
                    <div className="cmnFieldName d-flex f-justify-between">
                      Agenda
                      
                    </div>
                    <div
                      className={
                        toggleContactList.status
                          ? "cmnFormField listActive"
                          : "cmnFormField"
                      }
                    >

                    <span className="inputTagArea">
                      <input className="cmnFieldStyle createAppointment" type="text" placeholder="Eg. Martial Art Course Demo"/>
                      <span className="tagSection" onClick={(e) => toggleContactListFn(e)} ><img src={tags} alt="" /></span>
                      {toggleContactList.status && (
                      	<>
                      <span className="tagLists">
                      	<ul className="">
                      		<li className={
                        toggleTagList.status
                          ? "tagLi sellected"
                          : "tagLi"
                      } onClick={(e) => toggleTagListFn(e)}>Hot Lead <span>+</span></li>

                      			<li className={
                        toggleTagList1.status
                          ? "tagLi sellected"
                          : "tagLi"
                      } onClick={(e) => toggleTagList1Fn(e)}>New Active <span>+</span></li>
								<li className={
                        toggleTagList2.status
                          ? "tagLi sellected"
                          : "tagLi"
                      } onClick={(e) => toggleTagList2Fn(e)}>Cold Lead <span>+</span></li>
								<li className={
                        toggleTagList3.status
                          ? "tagLi sellected"
                          : "tagLi"
                      } onClick={(e) => toggleTagList3Fn(e)}>In Stage <span>+</span></li>
							
                      
                      	</ul>
                      </span>
                      </>
                      )}
                      </span>
					            {toggleTagList.status && (
                      	<>
                          <span className="indTags">Hot Leads <span className="closeTag" onClick={(e) => toggleTagListFn(e)}><img src={crossWhite} alt="" /></span></span>
                        </>
                      )}  

                      {toggleTagList1.status && (
                      	<>
                          <span className="indTags">New Active <span className="closeTag" onClick={(e) => toggleTagList1Fn(e)}><img src={crossWhite} alt="" /></span></span>
                        </>
                      )}  

                      {toggleTagList2.status && (
                      	<>
                          <span className="indTags">Cold Leads <span className="closeTag" onClick={(e) => toggleTagList2Fn(e)}><img src={crossWhite} alt="" /></span></span>
                        </>
                      )}  

                      {toggleTagList3.status && (
                      	<>
                          <span className="indTags">In Stage <span className="closeTag" onClick={(e) => toggleTagList3Fn(e)}><img src={crossWhite} alt="" /></span></span>
                        </>
                      )}  

                      
                    </div>
                  </div>
                  <div className="cmnFormRow">
                    <div className="cmnFormCol">
                      <div className="cmnFieldName">Choose a date</div>
                      <div className="cmnFormField">
                        <input
                          className="cmnFieldStyle"
                          type="date"
                          placeholder="dd/mm/yyyy"
                        />
                      </div>
                    </div>
                    <div className="cmnFormColquater">
                      <div className="cmnFieldName">From</div>
	                      <div className="cmnFormField">
	                        <input
	                          className="cmnFieldStyle"
	                          type="time"
	                          placeholder="Select"/>
	                      </div>
                    </div>
                    <div className="cmnFormColquater">
                      <div className="cmnFieldName">To</div>
	                      <div className="cmnFormField">
	                        <input
	                          className="cmnFieldStyle"
	                          type="time"
	                          placeholder="Select"/>
	                      </div>
                    </div>
                  </div>

                   <div className="modalbtnHolder w-100">
                    <button onClick={(e) => toggleTagSuccessFn(e)} className="saveDependent saveNnewBtn">
                      Set Appointment <img src={arrow_forward} alt="" />
                    </button>
                  </div>
</form>


<div>

                    </div>




                    {toggleTagSuccess.status && (
                      	<>
	                      <div className="slickModalHeader appSuccess">
				              <button className="topCross setApp" onClick={() => closeModal(false)}>
				                <img src={cross} alt="" />
				              </button>
				              <div className="circleForIcon">
				                <img src={successApp} alt="" />
				              </div>
				              <h3 className="appSuccessH">Great</h3>
				              <p className="appSuccessP">Appointment created successfully</p>
			              </div>
	                    </>
                    )}  

                 
                  

                  

                 
                
               </Scrollbars> 
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Appointment;
