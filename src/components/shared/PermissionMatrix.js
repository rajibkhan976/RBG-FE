import React, { useState } from "react";

const PermissionMatrix = () => {
  const [isChecked, setIsChecked] = useState([
    {
      authentication: {
        all: false,
        read: false,
        add: false,
        update: false,
        delete: false,
        import: false,
        export: false,
      },
    },
  ]);

  /**
   * Handle authentication checkbox
   */
  const handleChange = (entity, action) => {
    console.log(entity, action);
    const updatedCheckedState = isChecked.map((item, index) =>
      // index === position ? !item : item
      console.log(item, index)
    );

    //setCheckedState(updatedCheckedState);
    //setIsAuthenticationChecked(!isAuthenticationChecked);
  };

  const MoreOptions = () => {
    return (
      <ul class="optionMoreInput">
        <li>
          <span>Roles</span>
          <span>
            <label className="checkCutsom">
              <input type="checkbox" />
              <span></span>
            </label>
          </span>
          <span>
            <label className="checkCutsom">
              <input type="checkbox" />
              <span></span>
            </label>
          </span>
          <span>
            <label className="checkCutsom">
              <input type="checkbox" />
              <span></span>
            </label>
          </span>
          <span>
            <label className="checkCutsom">
              <input type="checkbox" />
              <span></span>
            </label>
          </span>
          <span>
            <label className="checkCutsom">
              <input type="checkbox" />
              <span></span>
            </label>
          </span>
          <span>
            <label className="checkCutsom">
              <input type="checkbox" />
              <span></span>
            </label>
          </span>
        </li>
        <li>
          <span>Groups</span>
          <span>
            <label className="checkCutsom">
              <input type="checkbox" />
              <span></span>
            </label>
          </span>
          <span>
            <label className="checkCutsom">
              <input type="checkbox" />
              <span></span>
            </label>
          </span>
          <span>
            <label className="checkCutsom">
              <input type="checkbox" />
              <span></span>
            </label>
          </span>
          <span>
            <label className="checkCutsom">
              <input type="checkbox" />
              <span></span>
            </label>
          </span>
          <span>
            <label className="checkCutsom">
              <input type="checkbox" />
              <span></span>
            </label>
          </span>
          <span>
            <label className="checkCutsom">
              <input type="checkbox" />
              <span></span>
            </label>
          </span>
        </li>
        <li>
          <span>Users</span>
          <span>
            <label className="checkCutsom">
              <input type="checkbox" />
              <span></span>
            </label>
          </span>
          <span>
            <label className="checkCutsom">
              <input type="checkbox" />
              <span></span>
            </label>
          </span>
          <span>
            <label className="checkCutsom">
              <input type="checkbox" />
              <span></span>
            </label>
          </span>
          <span>
            <label className="checkCutsom">
              <input type="checkbox" />
              <span></span>
            </label>
          </span>
          <span>
            <label className="checkCutsom">
              <input type="checkbox" />
              <span></span>
            </label>
          </span>
          <span>
            <label className="checkCutsom">
              <input type="checkbox" />
              <span></span>
            </label>
          </span>
        </li>
      </ul>
    );
  };

  const showMore = (e) => {
    e.preventDefault(e);
    if (e.target.textContent === "+") {
      e.target.textContent = "-";
      e.target
        .closest(".inputCheckBox")
        .querySelectorAll(".optionMoreInput")[0]
        .classList.add("show");
    } else {
      e.target.textContent = "+";
      e.target
        .closest(".inputCheckBox")
        .querySelectorAll(".optionMoreInput")[0]
        .classList.remove("show");
    }
  };

  return (
    <>
      <div className="permission">
        <p className="permissionHead clearfix">
          Manage permissions
          <label className="checkCutsom">
            <input type="checkbox" />
            <span></span>
            <em>All Data</em>
          </label>
        </p>
        <div className="InputsContainer">
          <ul>
            <li className="inputsContainerHead">
              <p>
                Entity <button className="btn-link">Select All</button>
              </p>
              <p>Read</p>
              <p>Add</p>
              <p>Update</p>
              <p>Delete</p>
              <p>Import</p>
              <p>Export</p>
            </li>
            <li className="inputCheckBox">
              <span>
                <label className="checkCutsom">
                  <input
                    type="checkbox"
                    // checked={isChecked.authentication.all}
                    onChange={() => handleChange("authentication", "all")}
                  />
                  <span></span>
                </label>
                <p>
                  <button className="triggerMore" onClick={(e) => showMore(e)}>
                    +
                  </button>
                  Authentication
                </p>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" />
                  <span></span>
                </label>
              </span>
              <MoreOptions />
            </li>
            <li className="inputCheckBox">
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
                <p>
                  <button className="triggerMore" onClick={(e) => showMore(e)}>
                    +
                  </button>
                  Contacts
                </p>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <MoreOptions />
            </li>
            <li className="inputCheckBox">
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
                <p>
                  <button className="triggerMore" onClick={(e) => showMore(e)}>
                    +
                  </button>
                  Automations
                </p>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <MoreOptions />
            </li>
            <li className="inputCheckBox">
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
                <p>
                  <button className="triggerMore" onClick={(e) => showMore(e)}>
                    +
                  </button>
                  Communication
                </p>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <MoreOptions />
            </li>
            <li className="inputCheckBox">
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
                <p>
                  <button className="triggerMore" onClick={(e) => showMore(e)}>
                    +
                  </button>
                  Appointments
                </p>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <MoreOptions />
            </li>
            <li className="inputCheckBox">
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
                <p>
                  <button className="triggerMore" onClick={(e) => showMore(e)}>
                    +
                  </button>
                  Products
                </p>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <MoreOptions />
            </li>
            <li className="inputCheckBox">
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
                <p>
                  <button className="triggerMore" onClick={(e) => showMore(e)}>
                    +
                  </button>
                  Waiver
                </p>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <MoreOptions />
            </li>
            <li className="inputCheckBox">
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
                <p>
                  <button className="triggerMore" onClick={(e) => showMore(e)}>
                    +
                  </button>
                  Billing
                </p>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <MoreOptions />
            </li>
            <li className="inputCheckBox">
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
                <p>
                  <button className="triggerMore" onClick={(e) => showMore(e)}>
                    +
                  </button>
                  Reports
                </p>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <MoreOptions />
            </li>
            <li className="inputCheckBox">
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
                <p>
                  <button className="triggerMore" onClick={(e) => showMore(e)}>
                    +
                  </button>
                  Data Administration
                </p>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <span>
                <label className="checkCutsom">
                  <input type="checkbox" name="" id="" />
                  <span></span>
                </label>
              </span>
              <MoreOptions />
            </li>
          </ul>
        </div>
        <p className="staredInfo">
          * You can customize permissions for this user based on your need.
        </p>
        <div className="newGroupName">
          <div className="formField w-50">
            <p>Create a new group with the new permissions *</p>
            <div className="inFormField">
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter a new group name"
              />
            </div>
          </div>
        </div>
        <div className="enableNotification">
          <label>
            <input type="checkbox" name="" id="" />
            <span>Notify users by mail on adding them to this group </span>
          </label>
        </div>
      </div>
    </>
  );
};

export default PermissionMatrix;
