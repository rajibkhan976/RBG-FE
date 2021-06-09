import React, { useState } from 'react';
import { RoleServices } from "../../services/authentication/RoleServices";
import { UserServices } from "../../services/authentication/UserServices";
import { utils } from "../../helpers";


const Pagination = (props) => {

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const paginationHandleClick = (event) => {
    let currentPage = Number(event.target.value);

    /**
     * Add query parameter
     */
    utils.addQueryParameter('page', currentPage);

    /**
     * Get page id from URL
     */
    let pageId = utils.getQueryVariable('page');
    let keyword = utils.getQueryVariable('search');

    /**
     * Make axios call
     */
    //if(currentPage !== props.paginationData.totalPages){
    getPaginatedData(props.type, pageId, keyword);
    //}
  }

  /**
   * Get paginated data
   * @param {*} type 
   */
  const getPaginatedData = (type, pageId, keyword) => {
    switch (type) {
      case "role":
        fetchPaginatedRoles(pageId, keyword);
        break;
      case "user":
        fetchPaginatedUsers(pageId, keyword);
        break;
      default:
      // code block
    }
  }

  const fetchPaginatedRoles = async (page, keyword) => {
    try {
      await RoleServices.fetchRoles(page, keyword)
        .then((result) => {
          console.log('Role listing result paginated', result.roles);
          if (result) {
            broadcastToParent(result);
          }
        })
        .catch((error) => {
          console.log("Role listing error", error);
        });
    } catch (e) {
      console.log("Error in Role listing", e);
    }
  }

  const fetchPaginatedUsers = async (page, keyword) => {
    try {
      await UserServices.fetchUsers(page, keyword)
        .then((result) => {
          console.log('User listing result paginated', result.users);
          if (result) {
            broadcastToParent(result);
          }
        })
        .catch((error) => {
          console.log("User listing error", error);
        });
    } catch (e) {
      console.log("Error in User listing", e);
    }
  }

  /**
   * Display page numbers
   */
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.dataCount / props.paginationData.limit); i++) {
    pageNumbers.push(i);
  }

  /**
   * Render page numbers
   */
  const renderPageNumbers = pageNumbers.map(number => {

    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
        >
          <button className={props.paginationData.currentPage === number ? "btn paginationBtn active" : "btn paginationBtn"} value={number} onClick={paginationHandleClick}>{number}</button>
        </li>
      );
    }

  });

  /**
   * Send the data to parent component
   * @param {*} data
   */
  const broadcastToParent = (data) => {
    props.getData(data);
  };

  /**
   * Previous button click
   */
  const preClickHandle = () => {
    let currentPageId = props.paginationData.currentPage;
    let keyword = utils.getQueryVariable('search');
    let newPage = Number(currentPageId) - 1;
    if (newPage > 0) {
      /**
       * Add new page id to URL
       */
      utils.addQueryParameter('page', newPage);
      getPaginatedData(props.type, newPage, keyword);

      /**
       * Update page numbers
       */
      if ((currentPageId - 1) % pageNumberLimit === 0) {
        setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
    }

  }

  /**
   * Next button click
   */
  const nextClickHandle = () => {
    let currentPageId = props.paginationData.currentPage;
    let keyword = utils.getQueryVariable('search');
    let newPage = Number(currentPageId) + 1;
    if (newPage <= props.paginationData.totalPages) {
      /**
       * Add new page id to URL
       */
      utils.addQueryParameter('page', newPage);
      getPaginatedData(props.type, newPage, keyword);
    }
    /**
     * Update page numbers
     */
    if (currentPageId + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  }

  /**
   * Triple dots for increment
   */
  let pageIncrementBtn = null;
  if (pageNumbers.length > maxPageNumberLimit) {
    pageIncrementBtn = <li className='btn' onClick={nextClickHandle}> &hellip; </li>;
  }
  /**
   * Triple dots for decrement
   */
  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li className='btn' onClick={preClickHandle}> &hellip; </li>;
  }


  return (
    <>
      <div className="paginationOuter">
        <ul>
          <li>
            <button className="btn paginationBtn" onClick={preClickHandle}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 492">
                <path
                  d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12    C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084    c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864    l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"
                  fill="#305671"
                />
              </svg>
            </button>
          </li>
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}
          <li>
            <button className="btn paginationBtn" onClick={nextClickHandle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 492.004 492.004"
              >
                <path
                  d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"
                  fill="#305671"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Pagination;
