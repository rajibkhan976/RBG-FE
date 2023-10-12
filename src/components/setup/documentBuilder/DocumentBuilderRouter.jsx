import { Route } from "react-router-dom";
import InnerLeftMenu from "../../shared/InnerLeftMenu";
import DashboardFooter from "../../shared/FooterDashboard";
import DocumentBuilder from "./DocumentBuilder";

const DocumentBuilderRouter = (props) => {
	const renderID = (randomID) => {
		console.log("Random ID", randomID);
	};
	return (
		<>
			<InnerLeftMenu
				toggleLeftSubMenu={props.toggleLeftSubMenu}
				routeMenu='setup'
				reRender={(id) => renderID(id)}
			/>
			<div className='dashboardElComponent'>
				{/* <HeaderDashboard toggleCreate={(e) => props.toggleCreate(e)} /> */}
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
