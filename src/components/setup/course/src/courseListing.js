import React, { useState } from "react";
import plus_icon from "../../../../assets/images/plus_icon.svg";
import percentTag from "../../../../assets/images/percentage_icon.png";
import list_board_icon from "../../../../assets/images/list_board_icon.svg";
import proImg1 from "../../../../assets/images/proImg1.png";
import listView from "../../../../assets/images/listView.svg";
import dot3White from "../../../../assets/images/dot3gray.svg";
import { CourseServices } from "../../../../services/setup/CourseServices";
import Pagination from "../../../shared/Pagination";
import ConfirmBox from "../../../shared/confirmBox";

const CourseListing = (props) => {
  // const [prodFilterModalStatus, setProdFilterModalStatus] = useState(false);
  const [isConfirmed, setConfirmed] = useState({
    show: false,
    id: null,
  });
  const [option, setOption] = useState(null);
  const [colorDropdown, setColorDropdown] = useState(null);

  /****************************** FUNCTIONS START **********************************/
  const handleEdit = (product) => {
    setOption(null);
    props.openCourseModal(true, product);
  };

  const deleteCourse = async (courseID, isConfirmed = null) => {
    setOption(null);
    if (isConfirmed == null && courseID) {
      console.log("Course ID", courseID);
      setConfirmed({
        show: true,
        id: courseID,
      });
    } else if (isConfirmed === "cancel") {
      setConfirmed({
        show: false,
        id: null,
      });
    } else {
      setConfirmed({
        show: false,
        id: null,
      });
      props.deleteCourse(courseID);
    }
  };

  const toogleActionList = (index) => {
    setOption(index !== option ? index : null);
  };

  const toogleColorList = (index) => {
    setColorDropdown(index !== colorDropdown ? index : null);
  };

  const ShowColors = (prop) => {
    // let html = "<p>Color</p>";
    let html = "";
    prop.colors.map((color, index) => {
      if (index + 1 < 3) {
        html += `<span style="background-color: ${color.colorcode}"></span>`;
      } else {
        if (index + 1 === 4) {
          html += `<div className="colorpaletContainer">
                    <button className="dropIt">+${prop.colors.length - 3}</button>
                    <div className="colorPalet">`;
        }
        html += `<span style="background-color: ${color.colorcode}"></span>`;
        if (index + 1 === prop.colors.length) {
          html += `</div></div>`;
        }
      }
    });
    return (
      <div className="chooseColor" dangerouslySetInnerHTML={{ __html: html }} />
    );
  };

  /****************************** FUNCTIONS START **********************************/
  return (
    <>
      {isConfirmed.show ? (
        <ConfirmBox
          callback={(confirmedMsg) =>
            deleteCourse(isConfirmed.id, confirmedMsg)
          }
        />
      ) : (
        ""
      )}
      <div className="dashInnerUI productSteUp">
        <div className="userListHead product">
          <div className="listInfo">
            <ul className="listPath">
              <li>Settings </li>
              <li>Pragrams</li>
            </ul>
            <h2 className="inDashboardHeader">
              Programs (
              {props.paginationData.count ? props.paginationData.count : 0})
            </h2>
            <p className="userListAbout">Manage your programs</p>
          </div>
          <div className="listFeatures">
            <button className="creatUserBtn" onClick={props.openCourseModal}>
              <img className="plusIcon" src={plus_icon} alt="" />
              <span>Add a Program</span>
            </button>
          </div>
        </div>
        {/* <div className="productViewType">
          <button className="btn" onClick={() => props.openFilterModal()}>
            <img src={listView} alt="filter" />
          </button>
        </div> */}
        <div className="productListBody">
          <div className="CourseListing">
            {props.courseData.length ? (
              props.courseData.map((elem, key) => {
                return (
                  <React.Fragment key={key + "_products"}>
                    <div className="productList">
                      <div className="productListLeft">
                        <div className="proImage">
                          {/* 👇 Conditional Image populate if the image is not uploaded show dummy image */}
                          {elem.image ? (
                            <img
                              src={
                                "https://wrapperbucket.s3.us-east-1.amazonaws.com/" +
                                elem.image
                              }
                              alt=""
                            />
                          ) : (
                            <img src={proImg1} alt="" />
                          )}
                        </div>
                        <div className="proInfo">
                          <p>
                            <a href="javascript:void(0)">{elem.name}</a> (
                            <strong>Age Group:</strong> {elem.ageGroup})
                          </p>
                          <div className="d-flex">
                            <h3>${elem.fees.toFixed(2)}</h3>
                            {/* {elem.tax ? (
                              <span>
                                <img
                                  className="gap_icon"
                                  src={percentTag}
                                  alt=""
                                />
                                {elem.taxPercent}% Sales Tax Applicable
                              </span>
                            ) : (
                              ""
                            )} */}
                          </div>
                        </div>
                      </div>
                      <div className="productListRight">
                        <div className="courseListing_container">
                          <div className="courseListingText1">
                            <p>Duration : </p>
                            <span> {elem.duration.toUpperCase()}</span>
                          </div>
                          <div className="courseListingText1">
                            <p>Billing Cycle : </p>
                            <span className="active">
                              {" "}
                              {(elem.payment_type.toLowerCase() === "recurring") ? elem.billing_cycle.toUpperCase() : 'NA'}
                            </span>
                          </div>
                        </div>
                        <div className="courseListingText1 stAlone">
                          <p>Payment Type : </p>
                          <span> {elem.payment_type.toUpperCase()}</span>
                        </div>
                        <div className="sideEditOption">
                          <button
                            className="showList"
                            onClick={() => toogleActionList(key)}
                          >
                            <img src={dot3White} alt="" />
                          </button>
                          <div
                            className={
                              option === key
                                ? "dropdownOptions listOpen"
                                : "listHide"
                            }
                          >
                            {" "}
                            {/*//listHide class is to be replaced with listOpen to hide it */}
                            <button
                              className="btn btnEdit"
                              onClick={() => handleEdit(elem)}
                            >
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 13.553 13.553"
                                  className="editIcon"
                                >
                                  <g transform="translate(0.75 0.75)">
                                    <path
                                      className="a"
                                      d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423"
                                      transform="translate(-2 -2.795)"
                                    ></path>
                                    <path
                                      className="a"
                                      d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z"
                                      transform="translate(-4.384 -2)"
                                    ></path>
                                  </g>
                                </svg>
                              </span>{" "}
                              Edit
                            </button>
                            <button
                              className="btn btnDelete"
                              onClick={() => deleteCourse(elem._id)}
                            >
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
                      </div>
                    </div>
                  </React.Fragment>
                );
              })
            ) : (
              <div className="createNew">
                <span>
                  <img src={list_board_icon} alt="" />
                  <p>No Program found!</p>
                </span>
              </div>
            )}
          </div>
        </div>
        {props.paginationData.count > props.paginationData.limit ? (
          <Pagination
            paginationData={props.paginationData}
            dataCount={props.paginationData.count}
            callback={props.fetchCourses}
          />
        ) : (
          ""
        )}
      </div>

      {/* {prodFilterModalStatus && <ProductFilter closeModal={closeFilterModal} />} */}

      {/* {openModal && <AddProductModal closeAddProductModal={(param) => closeProductModal(param)}
                editProductItem={updateProduct}></AddProductModal>} */}
    </>
  );
};

export default CourseListing;
