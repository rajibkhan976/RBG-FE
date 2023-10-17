import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardFooter from "../../shared/FooterDashboard";

import InnerLeftMenu from "../../shared/InnerLeftMenu";
import CreditSetup from "./usage/UsageSetup";
import PackageSetup from "./package/PackageSetup";
import CreditDetails from "./details/CreditDetails";

const CreditRoutes = (props) => {
	const loggedInUser = useSelector((store) => store.user.data);

	return (
		<>
			<InnerLeftMenu
				toggleLeftSubMenu={props.toggleLeftSubMenu}
				routeMenu='setup'
			/>
			<div className='dashboardElComponent'>
				<div className='dashInnerStructure'>
					<Route
						path='/package-setup'
						component={PackageSetup}
					/>
					<Route
						path='/usage-setup'
						component={CreditSetup}
					/>
					<Route
						path='/credit-details'
						component={CreditDetails}
					/>
					<DashboardFooter />
				</div>
			</div>
		</>
	);
};

export default CreditRoutes;
