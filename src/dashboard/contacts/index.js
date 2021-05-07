import SidebarLogo from "../../assets/images/sidebar-logo.png";

function ContactsComponent(props) {
  return (
    <div className="dashboardElComponent">
      <div className="menuDetails">
        <figure className="logoSidebar">
          <img src={SidebarLogo} alt="" />
        </figure>
        Contacts Component
      </div>
    </div>
  );
}

export default ContactsComponent;
