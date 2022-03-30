import React from "react";
import weekly from "../../../../assets/images/weekly.svg";
import monthly from "../../../../assets/images/monthly.svg";

const Attendance = () => {
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
                <div className="listBody contactListingTable" style={{ 'width': '100%' }}>
                  <div className="tableHeader attendencePage">
                    <p>05-16-2021  -  05-22-2021</p>
                    <div className="displayInfosChange">
                      <span className="weeklySpan"><img src={weekly} /></span>
                      <span className="monthlylySpan"><img src={monthly} /></span>
                    </div>
                  </div>
                    
                    <ul className="tableListing appointment">
                      <li className="listHeading attendenceTables">
                          <div className="dataTableCell">Day</div>
                          <div className="dataTableCell">Check-in</div>
                          <div className="dataTableCell">Checked-in by</div>
                          
                      </li>


                      <li>
                          <div className="dataTableCell date"><button className="btn">Sun, 16</button></div>
                          <div className="dataTableCell email"><button className="btn times">11:32 AM</button></div>
                          <div className="dataTableCell date"><button className="btn">Self</button></div>
                          
                      </li>



                      <li>
                      <div className="dataTableCell date"><button className="btn">Mon, 17</button></div>
                      <div className="dataTableCell email"><button className="btn times">11:25 AM</button></div>
                          <div className="dataTableCell date"><button className="btn">Self</button></div>
                          
                      </li>

                      <li>
                          <div className="dataTableCell date"><button className="btn">Tue, 18</button></div>
                          <div className="dataTableCell email"><button className="btn times">11:45 AM</button></div>
                          <div className="dataTableCell date"><button className="btn">Staff - Alex</button></div>
                          
                      </li>


                    </ul>
                </div>
            </div>
      </div>
    </div>
  );
};

export default Attendance;
