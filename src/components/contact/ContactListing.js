import React from 'react';
import ContactHead from './ContactHead';
import owner_img_1 from '../../../src/assets/images/owner_img_1.png';




const ContactListing = (props) => {

    return (
        <div className="dashInnerUI">
            <ContactHead openImportContact={() => props.openModal()}></ContactHead>
            <div className="userListBody">
                <div className="listBody">
                    <ul className="tableListing">
                        <li className="listHeading">
                            <div className="userName">User Name</div>
                            <div className="userName">Company Name</div>
                            <div className="userName">Phone No</div>
                            <div className="userName">Email Id</div>
                            <div className="userName">Gender</div>
                            <div className="userName">Status</div>
                            <div className="userName">Phase</div>
                            <div className="userName">Created on</div>
                        </li>
                        <li>
                            <div className="userName dataTableCell">
                                <button className="btn">
                                    <img src={owner_img_1} alt="" />
                                    <p>User name</p>
                                </button>
                            </div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                        </li>
                        <li>
                            <div className="userName dataTableCell">
                                <button className="btn">
                                    <img src={owner_img_1} alt="" />
                                    <p>User name</p>
                                </button>
                            </div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                        </li>
                        <li>
                            <div className="userName dataTableCell">
                                <button className="btn">
                                    <img src={owner_img_1} alt="" />
                                    <p>User name</p>
                                </button>
                            </div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                        </li>
                        <li>
                            <div className="userName dataTableCell">
                                <button className="btn">
                                    <img src={owner_img_1} alt="" />
                                    <p>User name</p>
                                </button>
                            </div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                        </li>
                        <li>
                            <div className="userName dataTableCell">
                                <button className="btn">
                                    <img src={owner_img_1} alt="" />
                                    <p>User name</p>
                                </button>
                            </div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                        </li>
                        <li>
                            <div className="userName dataTableCell">
                                <button className="btn">
                                    <img src={owner_img_1} alt="" />
                                    <p>User name</p>
                                </button>
                            </div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                            <div className="dataTableCell"><button className="btn">Contact</button></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ContactListing;