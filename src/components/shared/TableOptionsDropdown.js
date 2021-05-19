const TableOptionsDropdown = (props) => {
  return (
    <>
      {(props.dropdownType === "rolesDropdown" ||
      props.dropdownType === "groupsDropdown" ||
      props.dropdownType === "usersDropdown") && (
        <div
          className="dropdownOptions"
          style={{
            top: props.dropdownPos === "top" ? "auto" : "100%",
            bottom: props.dropdownPos === "top" ? "100%" : "auto",
          }}
        >
          <button className="btn btnEdit">
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
                  />
                  <path
                    className="a"
                    d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z"
                    transform="translate(-4.384 -2)"
                  />
                </g>
              </svg>
            </span>
            Edit
          </button>
          <button className="btn btnDelete">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12.347"
                height="13.553"
                viewBox="0 0 12.347 13.553"
                className="deleteIcon"
              >
                <g transform="translate(0.75 0.75)">
                  <path className="a" transform="translate(-3 -3.589)" />
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
      )}
      {props.dropdownType === "automationDropdown" && (
        <div
          className="dropdownOptions"
          style={{
            top: props.dropdownPos === "top" ? "auto" : "100%",
            bottom: props.dropdownPos === "top" ? "100%" : "auto",
          }}
        >
          <button className="btn btnClone">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 13.398 13.398"
                className="cloneIcon"
              >
                <path
                  class="a"
                  d="M12.441,12.2V4.067a.243.243,0,0,0-.239-.239H4.067a.243.243,0,0,0-.239.239V12.2a.243.243,0,0,0,.239.239H12.2a.243.243,0,0,0,.239-.239ZM13.4,4.067V12.2a1.2,1.2,0,0,1-1.2,1.2H4.067a1.2,1.2,0,0,1-1.2-1.2V4.067a1.2,1.2,0,0,1,1.2-1.2H12.2a1.2,1.2,0,0,1,1.2,1.2ZM10.527,1.2v1.2H9.57V1.2A.243.243,0,0,0,9.331.957H1.2A.243.243,0,0,0,.957,1.2V9.331A.243.243,0,0,0,1.2,9.57h1.2v.957H1.2a1.152,1.152,0,0,1-.845-.351A1.152,1.152,0,0,1,0,9.331V1.2A1.152,1.152,0,0,1,.351.351,1.152,1.152,0,0,1,1.2,0H9.331a1.152,1.152,0,0,1,.845.351A1.152,1.152,0,0,1,10.527,1.2Z"
                />
              </svg>
            </span>
            Clone
          </button>
          <button className="btn btnEdit">
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
                  />
                  <path
                    className="a"
                    d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z"
                    transform="translate(-4.384 -2)"
                  />
                </g>
              </svg>
            </span>
            Edit
          </button>
          <button className="btn btnDelete">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12.347"
                height="13.553"
                viewBox="0 0 12.347 13.553"
                className="deleteIcon"
              >
                <g transform="translate(0.75 0.75)">
                  <path className="a" transform="translate(-3 -3.589)" />
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
      )}
    </>
  );
};
export default TableOptionsDropdown;
