import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";

import plus_icon from "../../../../assets/images/plus_icon.svg";
import right_icon from "../../../../assets/images/right.svg";
import browse_keywords from "../../../../assets/images/icon_browse_keywords.svg";
import info_3dot_icon from "../../../../assets/images/info_3dot_icon.svg";
import Loader from "../../../shared/Loader"
import cross from "../../../../assets/images/cross.svg";
import sms_template from "../../../../assets/images/sms-template.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import list_board_icon from "../../../../assets/images/list_board_icon.svg";
import { utils } from "../../../../helpers";
import Pagination from "../../../shared/Pagination";
import ConfirmBox from "../../../shared/confirmBox"
import {
  ErrorAlert,
  SuccessAlert,
  WarningAlert,
} from "../../../shared/messages";
import * as actionTypes from "../../../../actions/types";

import { SMSServices } from "../../../../services/template/SMSServices";
import Scrollbars from "react-custom-scrollbars-2";

const SmsTemplate = (props) => {
  const dispatch = useDispatch();
  const prevMessageBlock = useRef(null)
  const nextMessageBlock = useRef(null)
  const [isLoader, setIsLoader] = useState(false);
  const [addSMSLoader, setAddSMSLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [warningMsg, setWarningMsg] = useState("");
  const [keyword, setKeyword] = useState(null);
  // const [option, setOption] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [sortType, setSortType] = useState("asc");
  const [smsModal, setSMSModal] = useState(false);
  const [smsCount, setSMSCount] = useState(0);
  const [smsPaginate, setSMSPaginate] = useState(null)
  const smsListingBody = useRef(null)
  const [paginationData, setPaginationData] = useState({
    count: null,
    totalPages: null,
    currentPage: 1,
    limit: 10,
  });
  const [smsTemplates, setSMSTemplates] = useState([]);
  const [smsTags, setSmsTags] = useState([])
  const [searchTagString, setSearchTagString] = useState("")
  const [editOption, setEditOption] = useState(null)
  const [activeMessage, setActiveMessage] = useState(null);
  const [editState, setEditstate] = useState(false);
  const [keywordSuggesion, setKeywordSuggesion] = useState(false);
  const [editMsgObj, setEditMsgObj] = useState({});
  const [addMsgObj, setAddMsgObj] = useState({
    title: "",
    message: "",
  });
  const [titleLimit, setTitleLimit] = useState(0);
  // const [messageLimit, setMessageLimit] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const createTemplateTitle = useRef(null);
  const createTemplateMessage = useRef(null);
  const createTemplateForm = useRef(null);
  const messageTextbox = useRef(null);
  const templateTitle = useRef(null);
  const getQueryParams = async () => {
    const keyword = utils.getQueryVariable("search");
    const srtBy = utils.getQueryVariable("sortBy");
    const srtType = utils.getQueryVariable("sortType");

    const queryParams = new URLSearchParams();

    // console.log("search", keyword);
    if (keyword) {
      queryParams.append("search", keyword);
    }
    if (srtBy) {
      queryParams.append("sortBy", srtBy);
    }
    if (srtType) {
      queryParams.append("sortType", srtType);
    }
    return queryParams;
  };

  const fetchSMS = useCallback(async () => {
    let pageId = utils.getQueryVariable("page") || 1;
    let queryParams = await getQueryParams();
    try {
      setIsLoader(true);
      const result = await SMSServices.fetchSms(pageId, queryParams);
      if (result) {
        setSMSTemplates(result.templates);
        setSMSCount(result.pagination.count);
        setPaginationData({
          ...paginationData,
          currentPage: result.pagination.currentPage,
          totalPages: result.pagination.totalPages,
        });
      }
    } catch (e) {
      setIsLoader(false);
      console.log("Error in SMS template listing", e);
      setErrorMsg(e.message);
    } finally {
      setIsLoader(false);
    }
  }, []);

  const fetchSMSTags = async () => {
    try {
      const result = await SMSServices.fetchSMSTags()
      if(result) {
        // console.log("result", result);
        setSmsTags(result)
      }
    } catch (error) {
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: error.message,
        typeMessage: 'error'
      });
    } finally {
      addSMSLoader ? setAddSMSLoader(false) : setAddSMSLoader(false)
    }
  }

  const [hasError, setHasError] = useState(false);

  const [errorState, setErrorState] = useState({
    header: "",
    message: "",
  });

  /**
   * Update keyword
   */
  const handleKeywordChange = (event) => {
    // console.log(event.target.value);
    setKeyword(event.target.value);
  };

  /**
   * Trigger search when keyword is empty
   */
  useEffect(() => {
    if (keyword == "") {
      handleSearch({ preventDefault: () => {} });
    }
  }, [keyword]);

  /**
   * Handle options toggle
   */
  const toggleOptions = (index) => {
    setEditOption(index !== editOption ? index : null);
  };

  /**
   * Handle search functionality
   */
  const handleSearch = (event) => {
    event.preventDefault();

    utils.addQueryParameter("page", 1);
    if (keyword) {
      utils.addQueryParameter("search", keyword);
    } else {
      utils.removeQueryParameter("search");
    }
  };

  const openModal = () => {
    setAddSMSLoader(true)
    fetchSMSTags()
    setIsEdit(false);
    setSMSModal(true);

    setActiveMessage(null);
    setEditMsgObj();

    setHasError(false);
    setErrorState({
      title: "",
      message: "",
    });
  };

  const handleSortBy = (field) => {
    // Set sort type
    let type = "asc";
    if (field == sortBy) {
      if (sortType == "asc") {
        type = "dsc";
      }
    }

    // Set state and Update query param
    setSortBy(field);
    setSortType(type);
    utils.addQueryParameter("sortBy", field);
    utils.addQueryParameter("sortType", type);
    fetchSMS()
  };

  const getThisMessage = (message, i) => {
    paginateSMS(160, message.message)
    setEditOption(null)
    setActiveMessage(
      activeMessage == null ? message._id : activeMessage == message._id ? null : message._id
    );
    setEditMsgObj(activeMessage === null ? message : activeMessage == message._id ? {} : message);
    setEditstate(false);
    setErrorState({
      title: "",
      message: "",
    });
    fetchSMSTags();
  };

  // ADD Keyword to Edit SMS template
  const addKeywordEdit = (e) => {
    e.preventDefault();
    let textBox = messageTextbox.current;
    let cursorStart = textBox.selectionStart;
    let cursorEnd = textBox.selectionEnd;
    let textValue = textBox.value;

    // console.log();

    try {
      if (cursorStart || cursorStart == "0") {
        // console.log("VIA CURSOR");
        var startToText = "";
        // console.log(textBox.selectionStart);
        textBox.value =
          textBox.value.substring(0, cursorStart) +
          " [" +
          e.target.textContent +
          "] " +
          textBox.value.substring(cursorEnd, textValue.length);

        setEditMsgObj({
          ...editMsgObj,
          message: textBox.value,
        });

        // console.log("editMsgObj", editMsgObj, textBox.value);

        startToText =
          textBox.value.substring(0, cursorStart) +
          "[" +
          e.target.textContent +
          "]";
        textBox.focus();
        textBox.setSelectionRange(
          startToText.length + 1,
          startToText.length + 1
        );
        // console.log(startToText.length);
      } else {
        // console.log("VIA END POINT");

        textBox.value = textBox.value + " [" + e.target.textContent + "] ";
        setEditMsgObj({
          ...editMsgObj,
          message: textBox.value,
        });
        textBox.focus();
      }

      setHasError(false)
      setErrorState({
        ...errorState,
        message: ""
      })
    } catch (err) {
      // console.log(err);
    }
  };

  // Add edit template message onchange
  const editTemplateMessage = (e) => {

    if(messageTextbox.current.value.trim().length !== 0) {
      setEditMsgObj({
        ...editMsgObj,
        message: e.target.value,
      });
      setHasError(false)
      setErrorState({
        ...errorState,
        message: "",
      });
    } else {
      setHasError(true);

      setErrorState({
        ...errorState,
        message: "Message cannot be blank!",
      });
    }
    // console.log("editMsgObj", editMsgObj);
  };

  // Add edit template title onchange
  const editTemplateTitle = (e) => {
    // if (titleLimit < 23) {
    //   setAddMsgObj({
    //     ...addMsgObj,
    //     title: createTemplateTitle.current.value,
    //   })
    //   setErrorState({
    //     ...errorState,
    //     title: "",
    //   });
    // } else {
    //   e.target.value = e.target.value.slice(0, 23);
    // }
    if(templateTitle.current.value.trim().length !== 0) {
      console.log("titleLimit", titleLimit);
      if (titleLimit < 23) {
        setEditMsgObj({
          ...editMsgObj,
          title: e.target.value,
        });

        setHasError(false);
        setErrorState({
          ...errorState,
          title: "",
        });
      }
      else {
        setHasError(true);  
        setErrorState({
          ...errorState,
          title: "Title cannot be more than 22 characters.",
        });
          e.target.value = e.target.value.slice(0, 23);
      }
      setTitleLimit(e.target.value.length)
    } else {
      setHasError(true);

      setErrorState({
        ...errorState,
        title: "Title cannot be blank!",
      });
    }
  };

  // Save edit template
  const saveEditstate = async (e) => {
    e.preventDefault();
    console.log("editMsgObj, activeMessage", editMsgObj, activeMessage);
    if (
      templateTitle.current.value.trim().length !== 0 &&
      messageTextbox.current.value.trim().length !== 0
    ) {
      setIsLoader(true);
      try {
        // console.log("editMsgObj", editMsgObj);
        const result = await SMSServices.editTemplate(editMsgObj, activeMessage);
        // console.log("result EDIT::::", result);

        if(result) {
          setKeywordSuggesion(false);
          
          setEditMsgObj();
          setActiveMessage(null)

          setSMSTemplates(prevTemplates => prevTemplates.map(el => 
            el._id === editMsgObj._id ?
            editMsgObj : el
          ));

          setEditstate(false);

          setHasError(false);
          setErrorState({
            title: "",
            message: "",
          });
          setIsLoader(false);
        }
      } catch (error) {
        setIsLoader(true);
      }
    } else {
      setHasError(true);

      setErrorState({
        title: templateTitle.current.value.trim().length === 0 ? "Title cannot be blank!" : "",
        message: messageTextbox.current.value.trim().length === 0 ?"Message cannot be blank!" : "",
      });
    }
  };

  const closeModal = () => {
    setSMSModal(false);

    setActiveMessage(null);
    setEditMsgObj();

    setHasError(false);
    setErrorState({
      title: "",
      message: "",
    });
    setAddMsgObj({
      title: "",
      message: "",
    });
  };

  // ADD Keyword to New SMS template
  const addThisTag = (e) => {
    e.preventDefault()
    // let compareText = " ["+e.target.textContent+"] ";
    // console.log("message", messageLimit);
    let addTextarea = createTemplateMessage.current;
    let cursorStart = addTextarea.selectionStart;
    let cursorEnd = addTextarea.selectionEnd;
    let textValue = addTextarea.value;
    
    // if(compareText.length <= (159 - parseInt(messageLimit))) {
      // console.log("parseInt(messageLimit) + parseInt(compareText)", parseInt(messageLimit), compareText.toString().length)
      try {
        // setMessageLimit(parseInt(messageLimit) + parseInt(compareText.toString().length))
        if (cursorStart || cursorStart == "0") {
          var startToText = "";

          addTextarea.value =
            addTextarea.value.substring(0, cursorStart) +
            " [" +
            e.target.textContent +
            "] " +
            addTextarea.value.substring(cursorEnd, textValue.length);

          setAddMsgObj({
            ...addMsgObj,
            message: addTextarea.value,
          });

          startToText =
            addTextarea.value.substring(0, cursorStart) +
            "[" +
            e.target.textContent +
            "]";
          addTextarea.focus();
          addTextarea.setSelectionRange(
            startToText.length + 1,
            startToText.length + 1
          );
        } else {
          addTextarea.value =
            addTextarea.value + " [" + e.target.textContent + "] ";
          setAddMsgObj({
            ...addMsgObj,
            message: addTextarea.value,
          });
          addTextarea.focus();
        }
      } catch (err) {
        // console.log(err);
      } finally {
        setErrorState({
          ...errorMsg,
          message: "",
        });
      }
    // }
  };

  // Add new template message onchange
  const addTemplateTitle = (e) => {
    if(createTemplateTitle.current.value.trim().length !== 0) {
      if (titleLimit < 23) {
        setAddMsgObj({
          ...addMsgObj,
          title: createTemplateTitle.current.value,
        })
        setErrorState({
          ...errorState,
          title: "",
        });
      } else {
        e.target.value = e.target.value.slice(0, 23);
      }
      setTitleLimit(e.target.value.length)
    }
    else {
      setErrorState({
        ...errorState,
        title: "Title cannot be blank!",
      });
    }
  };

  // Add new template title onchange
  const addTemplateMessage = (e) => {
    if(createTemplateMessage.current.value.trim().length !== 0) {
      // if (messageLimit <= 159) {
        setAddMsgObj({
          ...addMsgObj,
          message: e.target.value,
        });
        setErrorState({
          ...errorState,
          message: "",
        });
        console.log("e.target.value.length", e.target.value.length);
      // } else {
      //   e.target.value = e.target.value.slice(0, 159);
      // }
      // setMessageLimit(e.target.value.length)
    } else {
      setErrorState({
        ...errorState,
        message: "Text cannot be blank",
      });
    }
  };

  // Save new template function
  const saveMessage = async (e) => {
    setIsLoader(true)
    let copyTemplate = smsTemplates;
    if (
      createTemplateTitle.current.value.trim().length !== 0 &&
      createTemplateMessage.current.value.trim().length !== 0
    ) {
      try {
        const result = await SMSServices.createTemplate(addMsgObj);
        
        if(result){
          copyTemplate = [result, ...copyTemplate];
    
          setSMSTemplates(copyTemplate);
    
          setAddMsgObj({
            title: "",
            message: "",
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoader(false)
      }
    } else {
      setIsLoader(false)
      setErrorMsg("Some information missing!");
      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
    }
  };

  // Save new template and close modal
  const saveandNew = (e) => {
    e.preventDefault();
    // console.log(titleLimit, messageLimit);
    try {
      if (titleLimit <= 23 && addMsgObj &&
        addMsgObj.title.trim().length !== 0 &&
        addMsgObj.message.trim().length !== 0
      ) {
        // console.log("here");
        setIsLoader(true);
        saveMessage(e.target);
        createTemplateForm.current.reset();

        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: 'SMS template saved!',
          typeMessage: 'success'
        });

        setAddMsgObj({
          title: "",
          message: "",
        });
        fetchSMS()
      } else {
        if(titleLimit > 23) {
          setHasError(true);
          setErrorState({
            ...errorState,
            title: "Title cannot be more than 23 characters!",
          });
        }
        // if(messageLimit > 159) {
        //   setHasError(true);
        //   setErrorState({
        //     ...errorState,
        //     message: "Message cannot be more than 159 characters!",
        //   });
        // }
        if (addMsgObj && addMsgObj.title.trim().length === 0) {
          // console.log(addMsgObj);
          setHasError(true);
          setErrorState({
            ...errorState,
            title: "Title cannot be blank!",
          });
        }
        if (addMsgObj && addMsgObj.message.trim().length === 0) {
          // console.log(addMsgObj);
          setHasError(true);
          setErrorState({
            ...errorState,
            message: "Message cannot be blank!",
          });
        }
        if (addMsgObj && 
          addMsgObj.title.trim().length === 0 &&
          addMsgObj.message.trim().length === 0
        ) {
          // console.log(addMsgObj);
          setHasError(true);
          setErrorState({
            title: "Title cannot be blank!",
            message: "Message cannot be blank!",
          });
        }
      }
    } catch (err) {
      // console.log(err);
    } finally {
      setIsLoader(false);
      
    }
  };

  // Save new template and reset form
  const saveSMSTemplate = (e) => {
    e.preventDefault();
    try {
      // console.log("addMsgObj",  addMsgObj.title.trim().length !== 0 &&
      // addMsgObj.message.trim().length !== 0);
      if (titleLimit <= 23 && addMsgObj &&
        addMsgObj.title.trim().length !== 0 &&
        addMsgObj.message.trim().length !== 0
      ) {
        setIsLoader(true);
        saveMessage(e.target);
        createTemplateForm.current.reset();
        closeModal(false);

        setIsLoader(false);

        setHasError(false);
        setErrorState({
          title: "",
          message: "",
        });
      
        dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: 'SMS Template created successfully!',
            typeMessage: 'success'
        });
        setAddMsgObj({
          title: "",
          message: "",
        });
        fetchSMS()
      } else {
        if(titleLimit > 23) {
          setHasError(true);
          setErrorState({
            ...errorState,
            title: "Title cannot be more than 23 characters!",
          });
        }
        // if(messageLimit > 159) {
        //   setHasError(true);
        //   setErrorState({
        //     ...errorState,
        //     message: "Message cannot be more than 159 characters!",
        //   });
        // }
        if (addMsgObj && addMsgObj.title.trim().length === 0) {
          // console.log(addMsgObj.title);
          setHasError(true);
          setErrorState({
            ...errorState,
            title: "Title cannot be blank!",
          });
        }
        if (addMsgObj && addMsgObj.message.trim().length === 0) {
          // console.log(addMsgObj.message);
          setHasError(true);
          setErrorState({
            ...errorState,
            message: "Message cannot be blank!",
          });
        }
        if (addMsgObj && 
          addMsgObj.title.trim().length === 0 &&
          addMsgObj.message.trim().length === 0
        ) {
          // console.log(addMsgObj);
          setHasError(true);
          setErrorState({
            title: "Title cannot be blank!",
            message: "Message cannot be blank!",
          });
        }
      }
    } catch (err) {
      setErrorMsg(err);
      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
    } finally {
    }
  };

  const deleteSMS = async (smsId) => {
    setIsLoader(true)
    let copyTemplates = [...smsTemplates];

    try {
      const result = await SMSServices.deleteTemplate(smsId)
      if(result) {
        copyTemplates = copyTemplates.filter(msg => msg._id !== smsId);
        console.log("copyTemplates", copyTemplates);
        setSMSTemplates(copyTemplates)
        dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: 'SMS Template deleted successfully!',
            typeMessage: 'success'
        });
        fetchSMS()
      }
    } catch (error) {
      dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: error.message,
          typeMessage: 'error'
      });
    } finally {
      setIsLoader(false)
    }
  }

  const confirmMessageDelete = (messageConfirmation) => {
    if(messageConfirmation == "yes") {
      try{
        deleteSMS(deleteId)
        setEditOption(null)
        setDeleteConfirm(false)
      } catch (error) {
        dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: error.message,
            typeMessage: 'error'
        });
      }
    }
    if(messageConfirmation == "cancel") {
      setDeleteId(null)
      setDeleteConfirm(false)
      setEditOption(null)
    }
  }

  const paginateSMS = (n,str) => {
    let arr = str?.split(' ');
    let result=[]
    let subStr=arr[0]
    let textObjects = []

    for(let i = 1; i < arr.length; i++){
        let word = arr[i]
        if(subStr.length + word.length + 1 <= n){
            subStr = subStr + ' ' + word
        }
        else{
            result.push(subStr);
            subStr = word
        }
    }
    if(subStr.length){
      result.push(subStr)
    }

    setSMSPaginate({
      pages: result.length,
      textObjects: result,
      selected: 0
    })
    console.log("result", result);
    // return result
}

  // const paginateSMS = (data) => {
  //   let messageClone = data.message;
  //   let pagesSMS = messageClone.length / 160 > 0 ? parseInt(messageClone.length / 160) : 0;
  //   let textObjects = []

  //   if(pagesSMS > 0) {
  //     let startIndex = 0;
  //     let lastIndex = 160;

  //     for (let index = 0; index <= pagesSMS; index++) {
  //       console.log(startIndex, lastIndex);
  //       let textItem = {}
  //           textItem.pageId = index;
  //           textItem.selected = index == 0 ? true : false
            
  //           textItem.content = messageClone.slice(
  //             startIndex,
  //             lastIndex == 160
  //               ? messageClone.slice(0, 160).lastIndexOf(" ") < 160
  //                 ? messageClone.slice(0, 160).lastIndexOf(" ")
  //                 : lastIndex
  //               : messageClone.slice(startIndex, lastIndex).lastIndexOf(" ") < lastIndex ? messageClone.slice(startIndex, lastIndex).lastIndexOf(" ") : lastIndex
  //           );
        
  //       startIndex = lastIndex == 160 ? (messageClone.slice(0,160).lastIndexOf(" ") < 160 ? parseInt(startIndex) + messageClone.slice(0,160).lastIndexOf(" ") : parseInt(startIndex) + 160) : parseInt(startIndex) + 160;

  //       lastIndex = lastIndex == 160 ? messageClone.slice(0,160).lastIndexOf(" ") < 160 ? parseInt(lastIndex) + messageClone.slice(0,160).lastIndexOf(" ") : parseInt(lastIndex) + 160 : parseInt(lastIndex) + 160;

  //       textObjects = [...textObjects, textItem]
  //     }
      
  //     setSMSPaginate({
  //       pages: pagesSMS,
  //       textObjects: textObjects
  //     })
  //   }
  //   else {
  //     setSMSPaginate(null)
  //   }
  // }

  const changeSMSBlock = (e) => {
    e.preventDefault();
    let smsPaginatePlaceholder = {...smsPaginate}
    const activePage = smsPaginatePlaceholder.selected;

    if(e.target == prevMessageBlock.current){
      smsPaginatePlaceholder.selected = activePage - 1
    }
    if(e.target == nextMessageBlock.current) {
      smsPaginatePlaceholder.selected = activePage + 1
    }

    setSMSPaginate(smsPaginatePlaceholder)
  }

  useEffect(()=>{
    console.log("paginate", smsPaginate);
  }, [smsPaginate])

  useEffect(() => {
    setSortBy(utils.getQueryVariable("sortBy"));
    setSortType(utils.getQueryVariable("sortType"));
    fetchSMS()
  }, []);

  return (
    <div className="dashInnerUI smsListingPage">
      {isLoader ? <Loader /> : ""}

      <div className="userListHead">
        <div className="listInfo">
          <ul className="listPath">
            <li>Setting</li>
            <li>Templates</li>
            <li>SMS Template</li>
          </ul>
          <h2 className="inDashboardHeader">SMS Template</h2>
          <p className="userListAbout">Set SMS communication templates</p>
        </div>
        <div className="listFeatures">
          <div className="searchBar searchbar2">
            <form onSubmit={handleSearch}>
              <input
                type="search"
                name="search"
                placeholder="Search SMS Templates"
                autoComplete="off"
                onChange={handleKeywordChange}
              />
              <button className="searchIcon"></button>
            </form>
          </div>
          <button className="creatUserBtn" onClick={openModal}>
            <img className="plusIcon" src={plus_icon} alt="" />
            <span>Create SMS Template</span>
          </button>
        </div>
      </div>
      {successMsg && <SuccessAlert message={successMsg}></SuccessAlert>}
      {errorMsg && <ErrorAlert message={errorMsg}></ErrorAlert>}
      {warningMsg && <WarningAlert message={warningMsg}></WarningAlert>}

      <div className="userListBody smsListing d-flex">
        <div className="smsListingBody d-flex f-column">
          <div className="listBody f-1" ref={smsListingBody}>
            {smsTemplates && smsTemplates.length > 0 ? 
              <ul className="tableListing">
                <li className="listHeading">
                  <div
                    className={
                      "messageTitle " +
                      (sortBy == "title" ? "sort " + sortType : "")
                    }
                    onClick={() => handleSortBy("title")}
                  >
                    Title
                  </div>
                  <div
                    className={
                      "messageDeet " +
                      (sortBy == "message" ? "sort " + sortType : "")
                    }
                    onClick={() => handleSortBy("message")}
                  >
                    Message
                  </div>
                  <div className="optionMessage">
                    
                  </div>
                </li>
                {smsTemplates &&
                  smsTemplates.filter(sms => keyword != null ? ((sms.message.includes(keyword.trim()) || sms.title.includes(keyword.trim())) ? sms : '') : sms).map((sms, i) => (
                    <li
                      key={"smsTemplate-" + i}
                      className={activeMessage === sms._id ? "active" : ""}
                    >
                      <div className="messageTitle"
                        onClick={() => {
                          getThisMessage(sms, i);
                          setKeywordSuggesion(false);
                        }}
                      >{sms.title}</div>
                      <div className="messageDeet"
                        onClick={() => {
                          getThisMessage(sms, i)
                          setKeywordSuggesion(false);
                        }}
                      >{sms.message.length <= 150 ? sms.message : sms.message.substring(0, 150)+"..."}</div>
                      <div className="optionMessage">
                        <button
                            className="btn"
                            onClick={() => {
                                toggleOptions(sms._id);
                            }}
                        >
                            <img src={info_3dot_icon} alt="" />
                        </button>
                        <div
                            className={
                              sms._id === editOption ? "dropdownOptions listOpen bumberLists" : "listHide"
                            }
                        >
                            <button className="btn "
                            onClick={(e) => {
                              e.preventDefault()
                              setDeleteId(sms._id)
                              setDeleteConfirm(true);
                              setActiveMessage(null);
                            }}>
                                <span>
                                  <svg
                                    className="deleteIcon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12.347"
                                    height="13.553"
                                    viewBox="0 0 12.347 13.553"
                                  >
                                    <g transform="translate(0.75 0.75)">
                                      <path
                                        className="a"
                                        d="M3,6H13.847"
                                        transform="translate(-3 -3.589)"
                                      />
                                      <path
                                        className="a"
                                        d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411"
                                        transform="translate(-3.795 -2)"
                                      />
                                      <line
                                        className="a"
                                        y2="3"
                                        transform="translate(4.397 6.113)"
                                      />
                                      <line
                                        className="a"
                                        y2="3"
                                        transform="translate(6.397 6.113)"
                                      />
                                    </g>
                                  </svg>
                                </span>
                                Delete
                            </button>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul> : <div className="createNew">
                  <span>
                      <img src={list_board_icon} alt="" />
                      <p>No SMS Template found!</p>
                  </span>
              </div>
                  }                 

                {smsTemplates?.length>0 && smsTemplates.filter(sms => keyword != null ? ((sms.message.includes(keyword.trim()) || sms.title.includes(keyword.trim())) ? sms : '') : sms).length == 0 && 
                <div className="createNew nosearchFound">
                  <span>
                    <img src={list_board_icon} alt="" />
                    <p>No SMS Template found!</p>
                  </span>
                </div>
                }
            </div>
          {/* <Pagination /> */}
          {/* PAGINATION UI FOR SHOW */}     
          {smsCount > paginationData.limit ? 
            <Pagination
                type="sms-template"
                paginationData={paginationData}
                dataCount={smsCount}
                callback={fetchSMS}
            /> : 
            ''
          }
          {/* PAGINATION UI FOR SHOW */}
        </div>

        <div className="previewSpaceTemplate">
          <div className="headspaceTemplate d-flex">
            <figure>
              <svg
                width="24"
                height="18"
                viewBox="0 0 24 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 9C1 9 5 1 12 1C19 1 23 9 23 9C23 9 19 17 12 17C5 17 1 9 1 9Z"
                  stroke="#305671"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.5779 12C13.2347 12 14.5779 10.6569 14.5779 9C14.5779 7.34315 13.2347 6 11.5779 6C9.92103 6 8.57788 7.34315 8.57788 9C8.57788 10.6569 9.92103 12 11.5779 12Z"
                  stroke="#305671"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </figure>
            <span>SMS Preview</span>
          </div>
          <div className="templateOuter d-flex">
            <div
              className={
                !smsTemplates || smsTemplates < 0
                  ? "templateBody d-flex"
                  : "templateBody"
              }
              style={{
                display: activeMessage === null && "flex",
                flexDirection: activeMessage === null && "column",
                justifyContent: activeMessage === null && "center",
                alignItems: activeMessage === null && "center",
              }}
            >
              {activeMessage === null && (
                <p
                  style={{
                    width: "191px",
                    fontSize: "13px",
                    lineHeight: "19px",
                    textAlign: "center",
                    color: "#9BAEBC",
                  }}
                >
                  Please select an SMS Template to view the preview
                </p>
              )}

              {activeMessage && activeMessage !== null && (
                <div className="templateInner">
                  <header
                    className={
                      hasError && errorState.title !== ""
                        ? "templateHeader error"
                        : "templateHeader"
                    }
                  >
                    {!editState && <p>{smsTemplates.filter(sms => sms._id === activeMessage)[0].title}</p>}
                    {editState && (
                      <div className="cmnFormRow">
                        <div className="cmnFormField">
                          <input
                            readOnly={editState === true ? false : true}
                            defaultValue={smsTemplates.filter(sms => sms._id === activeMessage)[0].title}
                            onChange={(e) => editTemplateTitle(e)}
                            id="templateTitle"
                            ref={templateTitle}
                            tabIndex="1"
                            className="cmnFieldStyle"
                          />
                        </div>
                        {hasError && errorState.title && (
                          <span className="errorMsg">
                          {errorState.title}
                          </span>
                        )}
                      </div>
                    )}

                    {!editState && (
                      <button
                        className="btn"
                        onClick={() => setEditstate(!editState)}
                      >
                        <svg
                          width="14"
                          height="15"
                          viewBox="0 0 14 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.7938 9.10271V12.3207C11.7938 12.6403 11.6668 12.9468 11.4408 13.1728C11.2149 13.3988 10.9084 13.5257 10.5888 13.5257H2.15178C1.83219 13.5257 1.52569 13.3988 1.29971 13.1728C1.07373 12.9468 0.946777 12.6403 0.946777 12.3207V3.88371C0.946777 3.56413 1.07373 3.25763 1.29971 3.03165C1.52569 2.80567 1.83219 2.67871 2.15178 2.67871H5.36978"
                            stroke="#9BAEBC"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10.5888 1.47363L12.9998 3.88463L6.97381 9.91063H4.56281V7.49963L10.5888 1.47363Z"
                            stroke="#9BAEBC"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    )}

                    {editState && (
                      <button disabled={hasError} className="btn" onClick={(e) => saveEditstate(e)}>
                        <svg
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.5 16H1.5C1.36739 16 1.24021 15.9473 1.14645 15.8536C1.05268 15.7598 1 15.6326 1 15.5V1.50001C1 1.3674 1.05268 1.24022 1.14645 1.14645C1.24021 1.05269 1.36739 1.00001 1.5 1.00001H11.5C11.5658 0.999628 11.631 1.01224 11.692 1.03712C11.7529 1.06201 11.8083 1.09867 11.855 1.14501L14.855 4.14501C14.9013 4.19173 14.938 4.24714 14.9629 4.30806C14.9878 4.36897 15.0004 4.43421 15 4.50001V15.5C15 15.6326 14.9473 15.7598 14.8536 15.8536C14.7598 15.9473 14.6326 16 14.5 16ZM2 15H14V4.70001L11.3 2.00001H2V15Z"
                            fill="#305671"
                            stroke="#305671"
                            strokeWidth="0.5"
                          />
                          <path
                            d="M10.1521 4.84172H4.88806C4.8219 4.84521 4.7557 4.83552 4.69331 4.81321C4.63092 4.7909 4.57359 4.75641 4.52465 4.71175C4.47571 4.66709 4.43613 4.61314 4.40822 4.55305C4.38031 4.49296 4.36462 4.42793 4.36206 4.36172V1.47972C4.36462 1.41351 4.38031 1.34847 4.40822 1.28838C4.43613 1.22829 4.47571 1.17435 4.52465 1.12969C4.57359 1.08503 4.63092 1.05054 4.69331 1.02823C4.7557 1.00591 4.8219 0.996225 4.88806 0.999719H10.1521C10.2182 0.996225 10.2844 1.00591 10.3468 1.02823C10.4092 1.05054 10.4665 1.08503 10.5155 1.12969C10.5644 1.17435 10.604 1.22829 10.6319 1.28838C10.6598 1.34847 10.6755 1.41351 10.6781 1.47972V4.36172C10.6755 4.42793 10.6598 4.49296 10.6319 4.55305C10.604 4.61314 10.5644 4.66709 10.5155 4.71175C10.4665 4.75641 10.4092 4.7909 10.3468 4.81321C10.2844 4.83552 10.2182 4.84521 10.1521 4.84172ZM5.41506 3.88172H9.62606V1.95972H5.41506V3.88172Z"
                            fill="#305671"
                            stroke="#305671"
                            strokeWidth="0.5"
                          />
                          <path
                            d="M11.6031 12.9205H4.3961C4.26415 12.9245 4.13595 12.8762 4.03947 12.7861C3.94299 12.696 3.88606 12.5714 3.8811 12.4395V7.63946C3.8858 7.50736 3.94261 7.3825 4.03912 7.29217C4.13563 7.20185 4.26398 7.15341 4.3961 7.15746H11.6041C11.7359 7.15341 11.8639 7.20157 11.9604 7.29146C12.0569 7.38136 12.1139 7.50572 12.1191 7.63746V12.4375C12.1147 12.5699 12.0578 12.6952 11.9611 12.7858C11.8643 12.8763 11.7356 12.9248 11.6031 12.9205ZM4.9111 11.9575H11.0891V8.11746H4.9111V11.9575Z"
                            fill="#305671"
                            stroke="#305671"
                            strokeWidth="0.5"
                          />
                        </svg>
                      </button>
                    )}
                    {/* {hasError && errorState.title && (
                      <span className="errorMsg">
                        Please give some SMS title.
                      </span>
                    )} */}
                  </header>
                  <div
                    className={
                      hasError && errorState.message !== ""
                        ? "bodyEditTemplate error"
                        : "bodyEditTemplate"
                    }
                    style={{
                      paddingBottom: !editState && "15px"
                    }}
                  >
                    {editState === false ? (
                      <div className="textView">
                        {/* {smsTemplates.filter(sms => sms._id === activeMessage)[0].message} */}
                        {smsPaginate?.pages && smsPaginate.textObjects[smsPaginate.selected]}
                      </div>
                    ) : (
                      <div className="cmnFormRow f-1 d-flex f-column">
                        <div className="cmnFormField f-1">
                          <textarea
                            readOnly={editState === true ? false : true}
                            defaultValue={smsTemplates.filter(sms => sms._id === activeMessage)[0].message}
                            onChange={(e) => editTemplateMessage(e)}
                            id="messageTextbox"
                            ref={messageTextbox}
                            tabIndex="2"
                            className="cmnFieldStyle"
                          ></textarea>
                        </div>
                        {hasError && errorState.message && (
                          <span className="errorMsg">
                            {errorState.message}
                          </span>
                        )}
                      </div>
                    )}
                    {keywordSuggesion && (
                      <div className="keywordBox">
                        <div className="searchKeyword">
                          <div className="searchKeyBox">
                            <input type="text" onChange={e => setSearchTagString(e.target.value)} />
                          </div>
                          <div className="cancelKeySearch">
                            <button
                              onClick={() => {
                                  setKeywordSuggesion(false)
                                  setSearchTagString("")
                                }}
                            ></button>
                          </div>
                        </div>
                        <div className="keywordList">
                          <ul>
                              {
                                smsTags.filter(smsTag => smsTag.id.indexOf(searchTagString) >= 0).map((tagItem, i) =>  (
                                  <li key={"keyField"+i}>
                                    <button onClick={(e) => addKeywordEdit(e, tagItem.id)}>
                                      {tagItem.id}
                                    </button>
                                  </li>
                                ))
                              }
                          </ul>
                        </div>
                      </div>
                    )}
                    {/* {hasError && errorState.title && (
                      <span className="errorMsg">
                        Please give some SMS content.
                      </span>
                    )} */}
                  </div>
                  <footer
                    className="editPageFooter d-flex"
                    style={{
                      backgroundColor: editState && "#fff",
                    }}
                  >
                    {smsPaginate?.pages ? 
                      <>
                        {smsPaginate && smsPaginate.selected != 0 ? <button 
                          className="btn"
                          ref={prevMessageBlock}
                          onClick={(e)=>changeSMSBlock(e)}
                        >
                          <img
                            src={right_icon}
                            alt="next"
                            style={{
                              transform: "scaleX(-1)",
                            }}
                          />
                        </button> : ""}
                        <span>Page {smsPaginate && parseInt(smsPaginate.selected)+1} of {(smsPaginate && smsPaginate.pages) ? parseInt(smsPaginate.pages) : ""}</span>
                          {console.log("smsPaginate.selected", smsPaginate.selected, "smsPaginate.pages", smsPaginate.pages)}
                        {(smsPaginate && smsPaginate.selected != smsPaginate.pages - 1) ? <button 
                          className="btn"
                          ref={nextMessageBlock}
                          onClick={(e)=>changeSMSBlock(e)}
                        >
                          <img src={right_icon} alt="next" />
                        </button> : ""}
                      </>
                      : ""
                    }
                    {editState && (
                      <button
                        className="btn browseKeywords"
                        style={{
                          marginRight: "0",
                          padding: "0",
                        }}
                        onClick={() => setKeywordSuggesion(true)}
                      >
                        <img src={browse_keywords} alt="keywords" />
                      </button>
                    )}
                  </footer>
                </div>
              )}
            </div>
            <div className="templateFooter"></div>
          </div>
        </div>
      </div>
      {smsModal && (
        <div className="modalDependent modalBackdrop">
        {addSMSLoader ? <Loader /> : ""}
        <div className="slickModalBody">
          <div className="slickModalHeader">
            <button className="topCross" onClick={() => closeModal(false)}>
              <img src={cross} alt="" />
            </button>
            <div className="circleForIcon">
              <img src={sms_template} alt="" />
            </div>
            <h3>Add an SMS Template</h3>
            <p>Fill out below details to create a new SMS Template</p>
          </div>
          <div className="modalForm">
            <Scrollbars
              renderThumbVertical={(props) => (
                <div className="thumb-vertical" />
              )}
            >
              <form method="post" ref={createTemplateForm}>
                <div
                  className={
                    hasError && errorState.title !== ""
                      ? "cmnFormRow error"
                      : "cmnFormRow"
                  }
                >
                  <label className="cmnFieldName d-flex f-justify-between">
                    Enter Template Title
                  </label>
                  <div className="cmnFormField">
                    <input
                      className="cmnFieldStyle"
                      placeholder="Title..."
                      id="newTemplateTitle"
                      ref={createTemplateTitle}
                      onChange={(e) => addTemplateTitle(e)}
                    />
                  </div>
                  {hasError && errorState.title !== "" && (
                    <span className="errorMsg">
                      {errorState.title}
                    </span>
                  )}
                </div>
                <div
                  className={
                    hasError && errorState.message !== ""
                      ? "cmnFormRow error"
                      : "cmnFormRow"
                  }
                >
                  <label className="cmnFieldName d-flex f-justify-between">
                    Message
                  </label>
                  <div className="cmnFormField">
                    <textarea
                      className="cmnFieldStyle"
                      placeholder="Message"
                      id="newTemplateMessage"
                      ref={createTemplateMessage}
                      onChange={(e) => addTemplateMessage(e)}
                    ></textarea>
                  </div>
                  {hasError && errorState.message !== "" && (
                    <span className="errorMsg">
                      {errorState.message}
                    </span>
                  )}
                  <div className="smsTagsTemplate">  
                  {/* .filter(smsTag => smsTag.id.indexOf(searchTagString) >= 0)                   */}
                    {
                      smsTags.map((tagItem, i) =>  (
                        <button key={"tagItem-"+i} className="tagsSMSCreate" onClick={(e) => addThisTag(e, tagItem.id)}>
                          {tagItem.id}
                        </button>
                      ))
                    }
                  </div>
                </div>

                <div className="modalbtnHolder w-100">
                  <button
                    className=" saveNnewBtn"
                    onClick={(e) => saveSMSTemplate(e)}
                  >
                    Save <img src={arrow_forward} alt="" />
                  </button>
                  <button
                    className=" saveNnewBtn"
                    onClick={(e) => saveandNew(e)}
                  >
                    Save & New <img src={arrow_forward} alt="" />
                  </button>
                </div>
              </form>
            </Scrollbars>
          </div>
        </div>
      </div>
      )}
      {deleteConfirm && 
        <ConfirmBox 
          callback={confirmMessageDelete} 
        />
      }
    </div>
  );
};

export default SmsTemplate;
