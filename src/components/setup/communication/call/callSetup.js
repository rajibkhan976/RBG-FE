import React from "react";

import plus_icon from "../../../../assets/images/plus_icon.svg";
import info_3dot_icon from "../../../../assets/images/info_3dot_icon.svg";


const CallSetup = () => {
    return(
        <div className="dashInnerUI">
            <div class="userListHead">
                <div class="listInfo">
                    <ul class="listPath">
                        <li>Setup</li>
                        <li>Communication Setup</li>
                        <li>Call</li>
                    </ul>
                    <h2 class="inDashboardHeader">Call Setup</h2>
                    <p class="userListAbout">Lorem ipsum dolor sit amet. Semi headline should be here.</p>
                </div>
                <div class="listFeatures">
                    <button class="creatUserBtn">
                        <img class="plusIcon" src={plus_icon} alt="" />
                        <span>Add a configur</span>
                    </button>
                </div>
            </div>
            <div className="userListBody callListingTable">
                <div className="assignedNumberArea">
                    <h3>Assigned Phone Number</h3>
                    <p>+1-2162386318 [ (216) 238-6318 ]</p>
                </div>
                <h3 className="callListTabHeading">
                    Configurations
                </h3>
                <div className="listBody">
                    <ul className="tableListing">
                        <li className="listHeading">
                            <div className="userName">
                                Name
                            </div>
                            <div>
                                Scheduled Day (s)
                            </div>
                            <div className="scehTimeSlot">
                                Scheduled Time Slot
                            </div>
                            <div>
                                Status
                            </div>
                        </li>
                        <li>
                            <div className="userName">
                                <button className="btn"><p>My sample config one</p></button>
                            </div>
                            <div>
                                <ul className="weekDateList">
                                    <li className="weekDate active">
                                        <span>S</span>
                                    </li>
                                    <li className="weekDate">
                                        <span>M</span>
                                    </li>
                                    <li className="weekDate">
                                        <span>T</span>
                                    </li>
                                    <li className="weekDate">
                                        <span>W</span>
                                    </li>
                                    <li className="weekDate">
                                        <span>T</span>
                                    </li>
                                    <li className="weekDate">
                                        <span>F</span>
                                    </li>
                                    <li className="weekDate active">
                                        <span>S</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="createDate">
                                <button className="btn"><p>19:00 - 23:00</p></button>
                            </div>
                            <div className="createDate">
                                <label class="toggleBtn active">
                                    <input type="checkbox" />
                                    <span class="toggler"></span>
                                </label>
                                <div class="info_3dot_icon">
                                    <button class="btn">
                                        <img src={info_3dot_icon} alt="" />
                                    </button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="userName">
                                <button className="btn"><p>My sample config one</p></button>
                            </div>
                            <div>
                                <ul className="weekDateList">
                                    <li className="weekDate active">
                                        <span>S</span>
                                    </li>
                                    <li className="weekDate">
                                        <span>M</span>
                                    </li>
                                    <li className="weekDate">
                                        <span>T</span>
                                    </li>
                                    <li className="weekDate">
                                        <span>W</span>
                                    </li>
                                    <li className="weekDate">
                                        <span>T</span>
                                    </li>
                                    <li className="weekDate">
                                        <span>F</span>
                                    </li>
                                    <li className="weekDate active">
                                        <span>S</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="createDate">
                                <button className="btn"><p>19:00 - 23:00</p></button>
                            </div>
                            <div className="createDate">
                                <label class="toggleBtn active">
                                    <input type="checkbox" />
                                    <span class="toggler"></span>
                                </label>
                                <div class="info_3dot_icon">
                                    <button class="btn">
                                        <img src={info_3dot_icon} alt="" />
                                    </button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="userName">
                                <button className="btn"><p>My sample config one</p></button>
                            </div>
                            <div>
                                <ul className="weekDateList">
                                    <li className="weekDate active">
                                        <span>S</span>
                                    </li>
                                    <li className="weekDate">
                                        <span>M</span>
                                    </li>
                                    <li className="weekDate">
                                        <span>T</span>
                                    </li>
                                    <li className="weekDate">
                                        <span>W</span>
                                    </li>
                                    <li className="weekDate">
                                        <span>T</span>
                                    </li>
                                    <li className="weekDate">
                                        <span>F</span>
                                    </li>
                                    <li className="weekDate active">
                                        <span>S</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="createDate">
                                <button className="btn"><p>19:00 - 23:00</p></button>
                            </div>
                            <div className="createDate">
                                <label class="toggleBtn active">
                                    <input type="checkbox" />
                                    <span class="toggler"></span>
                                </label>
                                <div class="info_3dot_icon">
                                    <button class="btn">
                                        <img src={info_3dot_icon} alt="" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CallSetup;