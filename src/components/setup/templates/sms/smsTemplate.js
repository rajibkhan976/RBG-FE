import React, { useState, useEffect } from "react";


// import plus_icon from "../../../../assets/images/plus_icon.svg";
// import info_3dot_icon from "../../../../assets/images/info_3dot_icon.svg";
// import music_file_icon from "../../../../assets/images/music_file_icon.svg";
// import ringtone from "../../../../assets/images/ringtone.mp3";
// import AudioTemplateModal from "./audioTemplateModal";
// import { AudioServices } from "../../../../services/template/AudioServices";
// import { utils } from "../../../../helpers";
// import moment from "moment";
// import Pagination from "../../../shared/Pagination";
// import Loader from "../../../shared/Loader";
// import list_board_icon from "../../../../assets/images/list_board_icon.svg";
// import { bucketUrl } from "../../../../configuration/config";
// import { ErrorAlert, SuccessAlert } from "../../../shared/messages";
// import ConfirmBox from "../../../shared/confirmBox";

const SmsTemplate = () => {
 
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  const [option, setOption] = useState(null);
  

  /**
   * Handle options toggle
   */
  const toggleOptions = (index) => {
    setOption(index !== option ? index : null);
  };

 

  return (
    <div className="dashInnerUI audioListingPage">
      SMS Template
    </div>
  );
};

export default SmsTemplate;
