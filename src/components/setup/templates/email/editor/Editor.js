import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ErrorAlert, SuccessAlert, WarningAlert } from "../../../../shared/messages";
import browse_keywords from "../../../../../assets/images/icon_browse_keywords.svg";

const EditorComponent = (props) => {
  const [dirty, setDirty] = useState(false)
  const [emailHeader, setEmailHeader] = useState("")
  const [max, setMax] = useState(false)
  const [warningMsg, setWarningMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [keywordSuggesion, setKeywordSuggesion] = useState(false);
  const [keywordTextSuggesion, setKeywordTextSuggesion] = useState(false);
  const [editMail, setEditMail] = useState({
    title: "",
    header: "",
    message: ""
  })

  let initialValue = (props.initialData ? props.initialData.message : "Type here...");
  const [value, setValue] = useState("");
  const [createdValue, setCreatedValue] = useState("");
  const editorRef = useRef(null);
  const editorCreateRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
    }
  };

  // save edited data as email content
  const editedEmail = (mailValue) => {
    setValue(mailValue)
  }
  // save edited data as email content

  // save new data as email content
  const createEmail = (createValue) => {
    setCreatedValue(createValue.trim() !== "" && createValue);
    props.createdEmailTemplate(createValue)
  }
  // save new data as email content

  useEffect(()=>{}, [value, createdValue])

  // save edited email template
  const saveTemplate = (e) => {
    e.preventDefault()
    let headerInput = document.getElementById("editTemplateHeader").value;
    
    if(headerInput.length  !== 0 && value.trim().length !== 0) {
      console.log(props.initialData.header === headerInput, headerInput.trim().length === 0, props.initialData.message.length === 0)
      props.editedEmailTemplate(value.trim() !== "" ? value : props.initialData.message, headerInput.trim() !== "" ? headerInput : props.initialData.header)
      editorRef.current.setDirty(false);
      setDirty(false)
      props.setActiveEmail(null)
    }
    else {
      if(headerInput.length === 0) {
        setErrorMsg("Header cannot remain empty!")
        setTimeout(() => {
          setErrorMsg("")
        }, 5000);
      }
      else if(value.trim().length === 0) {
        setErrorMsg("Email body cannot remain empty!")
        setTimeout(() => {
          setErrorMsg("")
        }, 5000);
      }
    }
  }
  // save edited email template

  // add keywords to edit email header
  const editKeywordEmail = (e) => {
    e.preventDefault()
    // console.log(e.target);
    let subjectEditInput = document.getElementById("editTemplateHeader");
    let cursorStart = subjectEditInput.selectionStart;
    let cursorEnd = subjectEditInput.selectionEnd;
    let textValue = subjectEditInput.value;

    try {
        if (cursorStart || cursorStart == "0"
        ) {
            var startToText = "";
            subjectEditInput.value =
            subjectEditInput.value.substring(0, cursorStart) +
            " [" +
            e.target.textContent +
            "] " +
            subjectEditInput.value.substring(cursorEnd, textValue.length);

            setEditMail({
              ...editMail,
              header: subjectEditInput.value
            })

            startToText =
            subjectEditInput.value.substring(0, cursorStart) +
              "[" +
              e.target.textContent +
              "]";

            subjectEditInput.focus();
            subjectEditInput.setSelectionRange(
              startToText.length + 1,
              startToText.length + 1
            );

            // console.log(subjectEditInput, cursorStart, cursorEnd, textValue);
        }
        else {
          subjectEditInput.value = subjectEditInput.value + " [" + e.target.textContent + "] ";

          setEditMail({
            ...editMail,
            header: subjectEditInput.value
          })
          subjectEditInput.focus();
        }
    } catch(err) {
      setErrorMsg(err)
      setTimeout(() => {
        setErrorMsg("")
      }, 5000);
    }
  }
  // add keywords to edit email header


  // add keywords to edit email template
  const editKeywordTextEmail = (e) => {
    e.preventDefault();
    let iframeEdit = document.querySelector("#editTextArea iframe");
    let iframeEditBody = (iframeEdit.contentDocument || iframeEdit.contentWindow.document).body;

    let doc = iframeEditBody.ownerDocument || iframeEditBody.document;
    let win = doc.defaultView || doc.parentWindow;
    let sel, range;

    if (win.getSelection) {
        sel = win.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(" [" +e.target.textContent +"] "));
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = " [" +e.target.textContent +"] ";
    }
  }
  // add keywords to edit email template

  // add keywords to create email template  
  const createKeywordTextEmail = (e) => {
    e.preventDefault();
    let iframeEdit = document.querySelector("#createTextArea iframe");
    let iframeEditBody = (iframeEdit.contentDocument || iframeEdit.contentWindow.document).body;

    let doc = iframeEditBody.ownerDocument || iframeEditBody.document;
    let win = doc.defaultView || doc.parentWindow;
    let sel, range;

    if (win.getSelection) {
        sel = win.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(" [" +e.target.textContent +"] "));
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = " [" +e.target.textContent +"] ";
    }
  }
  // add keywords to create email template

  useEffect(()=>{
    setEmailHeader(props.initialData.header)
  }, [props.initialData.header])

  return (
    <>
    {successMsg && <SuccessAlert message={successMsg}></SuccessAlert>}
    {errorMsg && <ErrorAlert message={errorMsg}></ErrorAlert>}
    {warningMsg && <WarningAlert message={warningMsg}></WarningAlert>}

    {props.createNew ? <>
      <div className={max ? "editorEmailShell h-100 maximize" : "editorEmailShell h-100"} id="createTextArea">
        {max && <h6>Email Body</h6>}
          <Editor
              apiKey="91qkaw0vhg0xwousdvvdhjztavstam75oa7th9v5rkrbd31v"
              onInit={(evt, editor) => (editorCreateRef.current = editor)}
              onDirty={() => setDirty(true)}
              theme="advanced"
              onEditorChange={(newText) => createEmail(newText)}
              init={{
                height: "100%",
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount save autosave",
                ],
                relative_urls: false,
                toolbar: [
                  "fontselect fontsizeselect h1 forecolor | bold italic underline | alignleft aligncenter alignright alignjustify | numlist bullist | image | link | table | code",
                  "undo redo | help",
                ],
                autosave_interval: "10s",
                save_enablewhendirty: true,
              }}
          />
          <div className="createEmailButtons">
            <button
                className="inlinle-btn browseKeywords createBrowseKeywords"
                style={{
                  marginRight: "0",
                  padding: "0",
                }}
                onClick={(e) => 
                  {
                    setKeywordSuggesion(false)
                    setKeywordTextSuggesion(!keywordTextSuggesion)
                    e.preventDefault()
                  }
                }
              >
                <img src={browse_keywords} alt="keywords" />
              </button>

              {keywordTextSuggesion &&  <div className="keywordBox keywordsCreateText">
                <div className="searchKeyword">
                  <div className="searchKeyBox">
                    <input type="text" />
                  </div>
                  <div className="cancelKeySearch">
                    <button
                      onClick={() => setKeywordTextSuggesion(false)}
                    ></button>
                  </div>
                </div>
                <div className="keywordList">
                  <ul>
                    <li>
                      <button onClick={(e) => createKeywordTextEmail(e)}>
                        First Name
                      </button>
                    </li>
                    <li>
                      <button onClick={(e) => createKeywordTextEmail(e)}>
                        Last Name
                      </button>
                    </li>
                    <li>
                      <button onClick={(e) => createKeywordTextEmail(e)}>
                        Address
                      </button>
                    </li>
                    <li>
                      <button onClick={(e) => createKeywordTextEmail(e)}>
                        City
                      </button>
                    </li>
                    <li>
                      <button onClick={(e) => createKeywordTextEmail(e)}>
                        Country
                      </button>
                    </li>
                  </ul>
                </div>
              </div>}
            {/* <button 
              className="inlinle-btn btnSave"
              onClick={(e)=>createSave(e)}
            >
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
            </button> */}
            <button
              className="inlinle-btn btnMaximize"
              onClick={(e)=>{
                e.preventDefault()
                setMax(!max)
              }}
            >
              {max ? 
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3047 11.949L3.35469 1.99902H6.80469V0.499023H0.804688V6.49902H2.30469V3.04902L12.2547 12.999H8.80469V14.499H14.8047V8.49902H13.3047V11.949Z" fill="#305671"/>
              </svg> : 
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 15.45L2.55 1.5H6V0H0V6H1.5V2.55L15.45 16.5H12V18H18V12H16.5V15.45ZM12 0V1.5H15.525L10.8 6.225L11.85 7.275L16.5 2.625V6H18V0H12ZM6.225 10.725L1.5 15.45V12H0V18H6V16.5H2.625L7.35 11.775L6.225 10.725Z" fill="#305671"/>
              </svg>
              }
            </button>
          </div>
        </div>
      </> :
      <form
        style={{
          position: "relative",
        }}
        className="h-100"
        method="post"
        id="formEditor"
      >
        <div className="cmnFormRow">
        {/* {console.log("props.initialData.header", props.initialData.header)} */}
          <div className="cmnFormField">
            <input className="headerEmail  btnPadding cmnFieldStyle" defaultValue={props.initialData.header === emailHeader ? props.initialData.header : emailHeader} id="editTemplateHeader" />

            <button
              className="btn browseKeywords"
              style={{
                marginRight: "0",
                padding: "0",
              }}
              onClick={(e) => 
                {
                  setKeywordSuggesion(true)
                  setKeywordTextSuggesion(false)
                  e.preventDefault()
                }
              }
            >
              <img src={browse_keywords} alt="keywords" />
            </button>
            {keywordSuggesion &&  <div className="keywordBox">
              <div className="searchKeyword">
                <div className="searchKeyBox">
                  <input type="text" />
                </div>
                <div className="cancelKeySearch">
                  <button
                    onClick={() => setKeywordSuggesion(false)}
                  ></button>
                </div>
              </div>
              <div className="keywordList">
                <ul>
                  <li>
                    <button onClick={(e) => editKeywordEmail(e)}>
                      First Name
                    </button>
                  </li>
                  <li>
                    <button onClick={(e) => editKeywordEmail(e)}>
                      Last Name
                    </button>
                  </li>
                  <li>
                    <button onClick={(e) => editKeywordEmail(e)}>
                      Address
                    </button>
                  </li>
                  <li>
                    <button onClick={(e) => editKeywordEmail(e)}>
                      City
                    </button>
                  </li>
                  <li>
                    <button onClick={(e) => editKeywordEmail(e)}>
                      Country
                    </button>
                  </li>
                </ul>
              </div>
            </div>}
          </div>
        </div>
        <div className="cmnFormRow f-1" id="editTextArea">
          <Editor
            apiKey="91qkaw0vhg0xwousdvvdhjztavstam75oa7th9v5rkrbd31v"
            onInit={(evt, editor) => (editorRef.current = editor)}
            onDirty={() => setDirty(true)}
            theme="advanced"
            initialValue={initialValue}
            onEditorChange={(newText) => editedEmail(newText)}
            init={{
              height: "100%",
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount save autosave",
              ],
              relative_urls: false,
              toolbar: [
                "fontselect fontsizeselect h1 forecolor | bold italic underline | alignleft aligncenter alignright alignjustify | numlist bullist | image | link | table | code",
                "undo redo | help",
              ],
              autosave_interval: "10s",
              save_enablewhendirty: true,
            }}
          />


            <button
              className="inlinle-btn browseKeywords editBrowseKeywords"
              style={{
                marginRight: "0",
                padding: "0",
              }}
              onClick={(e) => 
                {
                  setKeywordSuggesion(false)
                  setKeywordTextSuggesion(!keywordTextSuggesion)
                  e.preventDefault()
                }
              }
            >
              <img src={browse_keywords} alt="keywords" />
            </button>

            {keywordTextSuggesion &&  <div className="keywordBox keywordsEditText">
              <div className="searchKeyword">
                <div className="searchKeyBox">
                  <input type="text" />
                </div>
                <div className="cancelKeySearch">
                  <button
                    onClick={() => setKeywordTextSuggesion(false)}
                  ></button>
                </div>
              </div>
              <div className="keywordList">
                <ul>
                  <li>
                    <button onClick={(e) => editKeywordTextEmail(e)}>
                      First Name
                    </button>
                  </li>
                  <li>
                    <button onClick={(e) => editKeywordTextEmail(e)}>
                      Last Name
                    </button>
                  </li>
                  <li>
                    <button onClick={(e) => editKeywordTextEmail(e)}>
                      Address
                    </button>
                  </li>
                  <li>
                    <button onClick={(e) => editKeywordTextEmail(e)}>
                      City
                    </button>
                  </li>
                  <li>
                    <button onClick={(e) => editKeywordTextEmail(e)}>
                      Country
                    </button>
                  </li>
                </ul>
              </div>
            </div>}


          <button 
            className="btn btnSave"
            onClick={(e)=>saveTemplate(e)}
          >
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
        </div>
      </form>}
    </>
  );
};

export default EditorComponent;
