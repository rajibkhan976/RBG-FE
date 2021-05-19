import React from 'react';
import { NavLink } from "react-router-dom";

import white_arrow_right from "../../assets/images/white_arrow_right.svg";
import undraw_personal_settings_kihd from "../../assets/images/undraw_personal_settings_kihd.svg";
import SidebarLogo from "../../assets/images/sidebar-logo.png";

const InnerLeftMenu = () => {
    return (
        <div className="menuDetails">
            <figure className="logoSidebar">
                <img src={SidebarLogo} alt="" />
            </figure>
            <ul>
                <li>
                    <NavLink className="leftMenuInnerLink" to="/roles">
                        <div className="indicator"></div>
                        <div className="linkDetails">
                            <p className="linkHeading">Roles</p>
                            <span className="notificationNumber">10</span>
                            <br />
                            <p className="linkAbout">Manage user roles</p>
                        </div>
                        <img className="arrowIcon" src={white_arrow_right} alt="" />
                    </NavLink>
                </li>
                <li>
                    <NavLink className="leftMenuInnerLink" to="/groups">
                        <div className="indicator"></div>
                        <div className="linkDetails">
                            <p className="linkHeading">Groups</p>
                            <span className="notificationNumber">5</span>
                            <br />
                            <p className="linkAbout">Manage user groups</p>
                        </div>
                        <img className="arrowIcon" src={white_arrow_right} alt="" />
                    </NavLink>
                </li>
                <li>
                    <NavLink className="leftMenuInnerLink" to="/users">
                        <div className="indicator"></div>
                        <div className="linkDetails">
                            <p className="linkHeading">Users</p>
                            <span className="notificationNumber">48</span>
                            <br />
                            <p className="linkAbout">Manage users & sub-users</p>
                        </div>
                        <img className="arrowIcon" src={white_arrow_right} alt="" />
                    </NavLink>
                </li>
            </ul>
            <div className="linkImg">
                <img src={undraw_personal_settings_kihd} alt="" />
            </div>
        </div>
    )
}

export default InnerLeftMenu;
