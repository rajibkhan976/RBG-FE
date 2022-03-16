import moment from "moment";

const DashboardFooter = () => {
    return(
        <>
            <div className="dashboardFooter">
                <p>© { moment().format('YYYY') } <a href="https://www.redbeltgym.com">Red Belt Gym</a>, Inc. All rights reserved</p>
            </div>
        </>
    )
}

export default DashboardFooter;