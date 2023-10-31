import { Route } from "react-router-dom";
import InnerLeftMenu from "../../shared/InnerLeftMenu";
import DashboardFooter from "../../shared/FooterDashboard";
import DocumentBuilder from "./DocumentBuilder";

const DocumentBuilderRouter = (props) => {
	return (
		<>
			<InnerLeftMenu
				toggleLeftSubMenu={props.toggleLeftSubMenu}
				routeMenu='setup'
			/>
			<div className='dashboardElComponent'>
				<div className='dashInnerStructure'>
					<Route
						path='/document-builder'
						component={DocumentBuilder}
					/>
					<DashboardFooter />
				</div>
			</div>
		</>
	);
};

export default DocumentBuilderRouter;
