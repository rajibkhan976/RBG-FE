import { Route } from "react-router-dom";
import InnerLeftMenu from "../../shared/InnerLeftMenu";
import DashboardFooter from "../../shared/FooterDashboard";
import Products from "./products";

const ProductRouter = (props) => {
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
						path='/products'
						component={Products}
					/>
					<DashboardFooter />
				</div>
			</div>
		</>
	);
};

export default ProductRouter;
