import DashboardRouting from "./DashboardRouting";
import LeftMenu from "../common/LeftMenu";
import HeaderDashboard from "../common/HeaderDashboard";
import SidebarLogo from '../assets/images/sidebar-logo.png'

function Dashboard(props) {
  return (
    <div className="mainComponent">
      <div className="dashboardBody d-flex f-align-center">
        <LeftMenu SidebarLogo={SidebarLogo} />
        <div className="dashMain">
          <HeaderDashboard />
          <DashboardRouting />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
