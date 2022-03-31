import React, { useEffect,useRef, useState } from "react";
import weekly from "../../../../assets/images/weekly.svg";
import monthly from "../../../../assets/images/monthly.svg";
import eyes from "../../../../assets/images/attendenceEye.svg";

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

const Attendance = () => {

  const [displayWeekly, setDisplayWeekly] = useState(true);

  const [displayMonthly, setDisplayMonthly] = useState(false);

  const displayWeeklyFn = () => {
    setDisplayWeekly(true);
    setDisplayMonthly(false);
  };

  const displayMonthlyFn = () => {
    setDisplayWeekly(false);
    setDisplayMonthly(true);
  };

  const [toggleAppView, setToggleAppView] = useState({
    status: false,
  });

  const toggleAppViewFn = (e) => {
    e.preventDefault();

    setToggleAppView({
      ...toggleAppView,
      status: !toggleAppView.status,      
    });
  };
  return (
    <div className="contactTabsInner appointmentPage attendencePage">
    <h3 className="headingTabInner">Attendance</h3>
      {/* <a className="orangeBtn clockinBtn" target="_blank" href="https://xd.adobe.com/view/1a813aee-7ec1-42ca-9093-051ac3823496-4fd2/screen/e557ffd3-ddb5-4ee1-b6b3-f1b5ff024137/?fullscreen">
        Attendance Screen
      </a> */}
      <div className="transHeader attendencePage">
        <p>Total Classes Attended</p>
        <h3>86</h3>
      </div>
      <div className="transBoday attendencePage">
      <div className="userListBody">
                <div className="listBody contactListingTable attendencePage" style={{ 'width': '100%', 'border-radius': '10px', 'overflow-x': 'hidden' }}>
                  <div className="tableHeader attendencePage">
                    <p>05-16-2021  -  05-22-2021</p>
                    <div className="displayInfosChange">
                      <span onClick={() => displayWeeklyFn()}  className={ displayWeekly.status ? "weeklySpan infoSpan active" : "weeklySpan infoSpan" }>
                        <img src={weekly} />
                      <span class="tooltiptextInfo">Weekly</span>
                      </span>
                      <span className="monthlySpan infoSpan" onClick={() => displayMonthlyFn()}><img src={monthly} />
                      <span class="tooltiptextInfo">Monthly</span>
                      </span>
                    </div>
                  </div>


                  {/* Display weekly listing attendence */}

                  {displayWeekly && (
                    
                    <ul className="tableListing appointment display">
                      <li className="listHeading attendenceTables">
                          <div className="dataTableCell days">Day</div>
                          <div className="dataTableCell checkIn">Check-in</div>
                          <div className="dataTableCell checkedInBy">Checked-in by</div>
                          
                      </li>


                      <li>
                          <div className="dataTableCell attendenceDate">Sun, 16</div>
                          <div className="dataTableCell attendenceTime"><span>11:32 AM</span></div>
                          <div className="dataTableCell attendedBy">Self</div>
                          
                      </li>



                      <li>
                          <div className="dataTableCell attendenceDate">Mon, 17</div>
                          <div className="dataTableCell attendenceTime"><span>11:32 AM</span></div>
                          <div className="dataTableCell attendedBy">Self</div>                    
                      </li>

                      <li>
                           <div className="dataTableCell attendenceDate">Tue, 18</div>
                          <div className="dataTableCell attendenceTime"><span>11:30 AM</span></div>
                          <div className="dataTableCell attendedBy">
                            <span className="eyeToolTips infoSpan">
                              <img src={eyes} />
                              <span class="tooltiptextInfo">Gave warning on the check-in issue</span>
                            </span>
                            Staff - Alex
                          </div>                          
                      </li>

                      <li>
                          <div className="dataTableCell attendenceDate">Wed, 19</div>
                          <div className="dataTableCell attendenceTime"><span>11:28 AM</span></div>
                          <div className="dataTableCell attendedBy">Self</div>                    
                      </li>

                      <li>
                          <div className="dataTableCell attendenceDate">Thu, 20</div>
                          <div className="dataTableCell attendenceTime"><span>11:32 AM</span></div>
                          <div className="dataTableCell attendedBy">Self</div>                    
                      </li>

                      <li>
                           <div className="dataTableCell attendenceDate">Fri, 21</div>
                          <div className="dataTableCell attendenceTime"><span>11:25 AM</span></div>
                          <div className="dataTableCell attendedBy">
                            <span className="eyeToolTips infoSpan">
                              <img src={eyes} />
                              <span class="tooltiptextInfo">Gave warning on the check-in issue</span>
                            </span>
                            Staff - Alena
                          </div>                          
                      </li>

                      <li>
                          <div className="dataTableCell attendenceDate">Sat, 22</div>
                          <div className="dataTableCell attendenceTime"><span>11:32 AM</span></div>
                          <div className="dataTableCell attendedBy">Self</div>                    
                      </li>
                    </ul>

                  )}

                    {/* Display Calender listing attendence */}

                  {displayMonthly && (

                    <div className="appointmentDataListing attendenceDataListing calenderViewOnly display">
                      <FullCalendar
                        plugins={[ dayGridPlugin ]}
                        initialView="dayGridMonth"
                      />
                    </div>
                    )}

                </div>
            </div>
      </div>
    </div>
  );
};

export default Attendance;
