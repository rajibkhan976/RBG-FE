import AppointmentGlobal from "./AppointmentGlobal";
import DashboardFooter from "../shared/FooterDashboard";

const AppointmentGlobalRouting = () => {
	return (
		<>
			<div className='dashboardElComponent'>
				<div className='dashInnerStructure appointmentGlobalPage'>
					<AppointmentGlobal />
					<DashboardFooter />
				</div>
			</div>
		</>
	);
};

export default AppointmentGlobalRouting;
