import arrow_forward from "../../assets/images/arrow_forward.svg";
import arrowDown from "../../assets/images/arrowDown.svg";

const Filter = (props) => {
  const closeSideMenu = (e) => {
    e.preventDefault();
    props.closeFilter(null);
  };

  return props.stateFilter === "user" ? (
    <div className="sideMenuOuter filterUserMenu">
      <div className="sideMenuInner">
        <button
          className="btn btn-closeSideMenu"
          onClick={(e) => closeSideMenu(e)}
        >
          <span></span>
          <span></span>
        </button>

        <div className="sideMenuBody">
          <form className="formBody">
            <div className="formField">
              <p>Select Group</p>
              <div className="inFormField">
                <select style={{ backgroundImage: "url(" + arrowDown + ")" }}>
                  <option value="null">Gym Staff</option>
                </select>
              </div>
            </div>
            <div className="createdDate">
              <p>Created on</p>
              <div className="createdDateFields">
                <div className="formField w-50">
                  <p>From</p>
                  <div className="inFormField">
                    <input type="date" name="" id="" placeholder="dd/mm/yyyy" />
                  </div>
                </div>
                <div className="formField w-50">
                  <p>To</p>
                  <div className="inFormField">
                    <input type="date" name="" id="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="selectStatus">
              <div className="formField">
                <p>Select Status</p>
                <div className="inFormField">
                  <select style={{ backgroundImage: "url(" + arrowDown + ")" }}>
                    <option value="null">Select Status</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="applyFilterBtn">
              <button className="saveNnewBtn">
                <span>Apply Filter</span>
                <img className="" src={arrow_forward} alt="" />
              </button>
              <button className="btn-link">Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : props.stateFilter === "groups" ? (
    <div className="sideMenuOuter filterGroupsMenu">
      <div className="sideMenuInner">
        <button
          className="btn btn-closeSideMenu"
          onClick={(e) => closeSideMenu(e)}
        >
          <span></span>
          <span></span>
        </button>

        <div className="sideMenuBody">
          <form className="formBody">Filter Body Groups</form>
        </div>
      </div>
    </div>
  ) : props.stateFilter === "roles" ? (
    <div className="sideMenuOuter filterRolesMenu">
      <div className="sideMenuInner">
        <button
          className="btn btn-closeSideMenu"
          onClick={(e) => closeSideMenu(e)}
        >
          <span></span>
          <span></span>
        </button>

        <div className="sideMenuBody">
          <form className="formBody">Filter Body Roles</form>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Filter;
