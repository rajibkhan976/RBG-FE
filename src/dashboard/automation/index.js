import SidebarLogo from "../../assets/images/sidebar-logo.png";

function Automation(props) {
  return (
    <div className="dashboardElComponent">
      <div className="menuDetails">
        <figure className="logoSidebar">
          <img src={SidebarLogo} alt="" />
        </figure>
        Automation Component
      </div>
    </div>
  );
}

export default Automation;
