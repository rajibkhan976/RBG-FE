import InnerLeftMenu from "../shared/InnerLeftMenu";
import Dashboard from "./Dashboard";

const DashboardRouting = (props) => {
	return (
		<>
			<InnerLeftMenu routeMenu='dashboard' />
			<div className='dashboardElComponent'>
				<div className='dashInnerStructure dashboardPage'>
					<Dashboard />
				</div>
			</div>
		</>
	);
};

export default DashboardRouting;
