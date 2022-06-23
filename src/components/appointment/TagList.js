import React, {useEffect, useRef, useState} from "react";
import Scrollbars from "react-custom-scrollbars-2";
import Loader from "../shared/Loader";
import {TagServices} from "../../services/setup/tagServices";
import * as actionTypes from "../../actions/types";
import {useDispatch} from "react-redux";

const TagList = (props) => {
    const scrollBodyTags = useRef(null);
    const searchInputTag = useRef(null);
    const dispatch = useDispatch();
    const [isScroll, setIsScroll] = useState(false);
    const [tagLoader, setTagLoader] = useState(false);
    const [tagList, setTagList] = useState([]);
    const [originalTagList, setOriginalTagList] = useState([]);
    const [tagTop, setTagTop] = useState(null);
    const [tagsPage, setTagsPage] = useState(1)
    const [searchedTag, setSearchedTag] = useState("");
    const [tagListToggle, setTagListToggle] = useState(props.tagListToggle);
    const [upcomingPagination, setUpcomingPagination ] = useState({});
    const titleAppRef = useRef(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const tagFilter = () => {
        // let matching = tagList.filter((tagItem) => appointmentData.tags.some(savedTags => tagItem._id === savedTags._id));
        let filtered = tagList.filter(
            (tagItem) =>
                tagItem.name.toLowerCase().indexOf(searchedTag.toLowerCase()) > -1
        );

        if (filtered.length > 0) {
            /* .filter((tagItem) => !appointmentData.tags.some(savedTags => tagItem._id === savedTags._id))*/
            return tagList.map((tagItem, i) => {
                    return (
                        <li
                            className="tagLi"
                            onClick={() => checkThisTag(tagItem, true)}
                            key={i}
                        >
                            {tagItem.name}
                        </li>
                    );
                });
        } else {
            return (
                <div className="noTagsFound">
                    <figure className="noTagFig">
                        <svg
                            width="57"
                            height="59"
                            viewBox="0 0 57 59"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <ellipse
                                cx="28.2959"
                                cy="31.3062"
                                rx="28.2959"
                                ry="27.6939"
                                fill="#FFE3AE"
                            />
                            <mask
                                id="mask0_7971_4030"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="3"
                                width="57"
                                height="56"
                            >
                                <ellipse
                                    cx="28.2959"
                                    cy="31.3062"
                                    rx="28.2959"
                                    ry="27.6939"
                                    fill="#FFEBC3"
                                />
                            </mask>
                            <g mask="url(#mask0_7971_4030)">
                                <ellipse
                                    cx="18.6642"
                                    cy="22.8776"
                                    rx="19.8673"
                                    ry="19.2653"
                                    fill="#FCDA9A"
                                />
                            </g>
                            <circle cx="19.5671" cy="19.5661" r="18.0612" fill="#D58445" />
                            <circle cx="18.6633" cy="18.6633" r="16.2551" fill="#F4EADE" />
                            <path
                                d="M19.5258 0C15.6639 0 11.8888 1.14517 8.67784 3.29068C5.46684 5.4362 2.96418 8.48571 1.48632 12.0536C0.00846002 15.6214 -0.378215 19.5474 0.375191 23.335C1.1286 27.1227 2.98824 30.6018 5.71897 33.3326C8.4497 36.0633 11.9289 37.9229 15.7165 38.6763C19.5041 39.4297 23.4301 39.0431 26.998 37.5652C30.5658 36.0874 33.6153 33.5847 35.7608 30.3737C37.9064 27.1627 39.0515 23.3876 39.0515 19.5258C39.045 14.3492 36.9857 9.38659 33.3253 5.72623C29.6649 2.06586 24.7023 0.00657617 19.5258 0ZM19.5258 35.5031C16.3657 35.5031 13.2767 34.5661 10.6492 32.8105C8.02175 31.0548 5.97389 28.5595 4.7646 25.64C3.55531 22.7206 3.2389 19.508 3.85539 16.4087C4.47188 13.3094 5.99358 10.4625 8.22806 8.22805C10.4625 5.99357 13.3094 4.47187 16.4087 3.85538C19.508 3.23889 22.7206 3.5553 25.64 4.76459C28.5595 5.97388 31.0549 8.02174 32.8105 10.6492C34.5661 13.2767 35.5031 16.3657 35.5031 19.5258C35.4988 23.7619 33.814 27.8232 30.8186 30.8186C27.8232 33.814 23.7619 35.4988 19.5258 35.5031Z"
                                fill="#B06328"
                            />
                            <path
                                d="M49.1858 46.6723L38.5434 36.0216C38.3803 35.8493 38.1843 35.7115 37.967 35.6162C37.7497 35.521 37.5156 35.4702 37.2783 35.467C37.0411 35.4637 36.8056 35.5081 36.5858 35.5974C36.366 35.6866 36.1663 35.8191 35.9986 35.9869C35.8308 36.1546 35.6984 36.3543 35.6091 36.5741C35.5198 36.7939 35.4754 37.0294 35.4787 37.2666C35.4819 37.5038 35.5327 37.738 35.6279 37.9553C35.7232 38.1726 35.861 38.3686 36.0333 38.5317L46.6868 49.1824C47.0226 49.5004 47.4693 49.6748 47.9318 49.6684C48.3942 49.6621 48.836 49.4756 49.163 49.1486C49.4901 48.8215 49.6766 48.3798 49.6829 47.9173C49.6892 47.4548 49.5148 47.0081 49.1969 46.6723H49.1858Z"
                                fill="#B06328"
                            />
                            <path
                                d="M16.8552 10.4285C23.3687 7.34776 19.2908 6.29618 16.1432 7.02077C11.7066 8.0421 8.26834 12.1508 7.06162 16.6544C6.45827 18.9061 7.13125 24.256 9.89305 18.2164C11.8589 13.9174 12.8668 12.3942 16.8552 10.4285Z"
                                fill="white"
                                stroke="white"
                            />
                        </svg>
                    </figure>
                    <p>Sorry! we couldn't find any match. You can create a new tag</p>
                    <h4>{searchedTag}</h4>
                    <footer className="w-100 d-flex f-justify-center" onClick={(e)=>createNewTag(e)}>
                        <button className="creatUserBtn">Create new tag</button>
                    </footer>
                </div>
            );
        }
    };
    const createNewTag = async (e) => {
        e.preventDefault();

        if(searchedTag.trim() !== ""){
            try {
                setIsScroll(true);
                let submitTag = await TagServices.saveTag({"name":searchedTag});
                setIsScroll(false);
                if(submitTag) {
                    searchInputTag.current.value = ""
                    setSearchedTag("");
                    checkThisTag({...submitTag}, true)
                    setTagListToggle(false);
                }
            } catch (e) {
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: e.message,
                    typeMessage: 'error'
                });
            } finally {
                fetchTags(tagsPage)
            }
        }
    }
    const checkThisTag = (tag, mode) => {
        props.selectTag(tag, mode);
        //let tagRemoved = tagList.filter(el => el._id !== tag._id);
        //setTagList(tagRemoved);
        setTagListToggle(false);
        setSearchedTag("");
    };
    const fetchTags = async (pageNumber, keyword) => {
        try {
            setIsScroll(true);
            setTagLoader(true);
            let result = await TagServices.fetchTags(pageNumber, keyword ? keyword : searchedTag);
            setIsScroll(false);
            let tags = result.tags;
            if (pageNumber === 1) {
                setOriginalTagList(tags);
                setTagList(tags);
            } else {
                setOriginalTagList([...originalTagList, ...tags]);
                setTagList([ ...tagList, ...tags]);
            }
            setUpcomingPagination(result.pagination);
        } catch (e) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        } finally {
            setTagLoader(false);
        }
    }
    const handleSearchTag = (e) => {
        let value = e.target.value
        value = value.trim();
        if (value !== searchedTag) {
            setSearchedTag(value);
            fetchTags(1, value);
        }
    }
    const upcomingTagPageNo = (element) => {
        if (!isScroll && upcomingPagination.totalPages >= upcomingPagination.currentPage) {
            if ((element.target.scrollHeight - element.target.scrollTop === element.target.clientHeight)) {
                if(upcomingPagination.currentPage < upcomingPagination.totalPages) {
                    fetchTags(upcomingPagination.currentPage + 1);
                }
            }
        }
    };
    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (
                tagListToggle &&
                titleAppRef.current &&
                !titleAppRef.current.contains(e.target)
            ) {
                setTagListToggle(false);
                setSearchedTag("");
            }
        };

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [tagListToggle]);
    useEffect(() =>{
        fetchTags(tagsPage);
    }, [])
    useEffect(() =>{
        setTagListToggle(props.tagListToggle);
    }, [props.tagListToggle])
    return (
        <>
            {tagListToggle ? <div className="tagLists" ref={titleAppRef} > {/* style={{top: tagTop - 15}}*/}
                <div className="searchTag cmnFormField">
                    <input
                        type="search"
                        placeholder="Search"
                        className="cmnFieldStyle"
                        ref={searchInputTag}
                        onChange={handleSearchTag}
                    />
                </div>
                <div className="genScrollBody f-1">
                    <Scrollbars renderThumbVertical={(props) => <div className="thumb-vertical"/>}
                                ref={scrollBodyTags} onScroll={upcomingTagPageNo}> {/**onScroll={appoPageList} */}
                        <ul className="listTags">
                            {tagFilter()}
                            {tagLoader ? <Loader/> : ""}
                        </ul>
                    </Scrollbars>
                </div>
            </div> : ""}

        </>
    );
};

export default TagList;
