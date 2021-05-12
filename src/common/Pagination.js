const DashboardPagination = () => {
    return(
        <>
            <div className="paginationOuter">
                <ul>
                    <li>
                        <button className="btn paginationBtn">
                            &#60;
                        </button>
                    </li>
                    <li>
                        <button className="btn paginationBtn active">
                            1
                        </button>
                    </li>
                    <li>
                        <button className="btn paginationBtn">
                            2
                        </button>
                    </li>
                    <li>
                        <button className="btn paginationBtn">
                            3
                        </button>
                    </li>
                    <li>
                        <button className="btn paginationBtn">
                            4
                        </button>
                    </li>
                    <li>
                        <button className="btn paginationBtn">
                            5
                        </button>
                    </li>
                    <li>
                        <button className="btn paginationBtn">
                            ...
                        </button>
                    </li>
                    <li>
                        <button className="btn paginationBtn">
                            &#62;
                        </button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default DashboardPagination;