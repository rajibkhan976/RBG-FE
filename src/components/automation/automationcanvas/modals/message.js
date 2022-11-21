import React, {memo, useRef, useState} from 'react';
import closewhite24dp from "../../../../assets/images/close_white_24dp.svg";
import chevron_right_white_24dp from "../../../../assets/images/chevron_right_white_24dp.svg";
import browse_keywords from "../../../../assets/images/icon_browse_keywords.svg";

const Message = (props) => {
    const messageTextbox = useRef(null)
    const [keywordSuggesion, setKeywordSuggesion] = useState(false);
    const [searchTagString, setSearchTagString] = useState("");
    const [smsTags, setSmsTags] = useState([]);
    // ADD Keyword to Edit SMS template
    const addKeywordEdit = (e) => {
        e.preventDefault();
        let textBox = messageTextbox.current;
        let cursorStart = textBox.selectionStart;
        let cursorEnd = textBox.selectionEnd;
        let textValue = textBox.value;
        let startPosition = 0;
        if (cursorStart || cursorStart === "0") {
            textValue = textValue.substring(0, cursorStart) + " [" + e.target.textContent + "] " + textValue.substring(cursorEnd, textValue.length);
            startPosition = textValue.substring(0, cursorStart) + " [" + e.target.textContent + "] ";
            console.log(cursorEnd, cursorStart, startPosition.length)
        } else {
            textValue = textValue + " [" + e.target.textContent + "] ";
            startPosition = textValue + " [" + e.target.textContent + "] ";
        }
        props.handleBodyChangeTags(textValue);
        setTimeout(() => {
            textBox.setSelectionRange(startPosition.length, startPosition.length);
        }, 100)
    };

    return (
        <React.Fragment>
            <div className="automationModal filterModal">
            <div className='automationModalBg' onClick={props.closeFilterModal}></div>
                <div className="nodeSettingModal">
                    <div className="formHead">
                        <div className="heading">
                            <p>Message Settings</p>
                        </div>
                        <div className="closeButton">
                            <button onClick={props.closeFilterModal}>
                                <img src={closewhite24dp} alt="Close Filter Modal" />
                            </button>
                        </div>
                    </div>
                    <div className="formBody">
                        <div className="formBodyContainer">
                            <div className="emailDetails">
                                <div className="inputField">
                                    <label htmlFor="">Body</label>
                                    <div className="inFormField">
                                        <textarea className={`${props.bodyError}`} name="messageBody"
                                                  onChange={props.handleBodyChange}
                                                  value={props.body} ref={messageTextbox}>{props.body}</textarea>
                                        <button
                                            className="btn browseKeywords browseKeywordsSMS"
                                            style={{
                                                marginRight: "0",
                                                padding: "0",
                                                bottom: "3"
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setKeywordSuggesion(true);
                                            }}
                                        >
                                            <img src={browse_keywords} alt="keywords" />
                                        </button>
                                        {keywordSuggesion && (
                                            <div className="keywordBox">
                                                <div className="searchKeyword">
                                                    <div className="searchKeyBox">
                                                        <input
                                                            type="text"
                                                            onChange={(e) => setSearchTagString(e.target.value)}
                                                        />
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
                                                        {Object.keys(props.messageData).length ? (
                                                            Object.keys(props.messageData).filter(el => el !== 'status' && el !== 'phase' && el !== 'tags' && el !== 'dadPhone' && el !== 'momPhone').filter(el => el.indexOf(searchTagString) >= 0).map((value, key) => (
                                                                <li key={"keyField" + key}>
                                                                    <button
                                                                        onClick={(e) =>
                                                                            addKeywordEdit(e, value)
                                                                        }
                                                                    >
                                                                        {value}
                                                                    </button>
                                                                </li>
                                                            ))
                                                        ) : ""}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="saveButton">
                                <button onClick={props.saveMessage}>Save <img src={chevron_right_white_24dp} alt="" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Message;
