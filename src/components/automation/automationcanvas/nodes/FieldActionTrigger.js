import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({ data }) => {
    const style = {

    }
    console.log("data in trigger", data)
    return (
        <React.Fragment>
            <Handle
                type="source"
                position="right"
                style={{ background: '#555', top: '50%', border: '4px solid #FFF' }}
            />
            <div style={style} className="triggerNode triggerNodeFieldUpdate">
                {/* {data.label} */}
                <svg width="100" height="100" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.5 63C48.897 63 63 48.897 63 31.5C63 14.103 48.897 0 31.5 0C14.103 0 0 14.103 0 31.5C0 48.897 14.103 63 31.5 63Z" fill="#007EDB" />
                    <path d="M44.735 28.0291H19V20.7561C19.0005 20.3113 19.1775 19.8848 19.4921 19.5702C19.8066 19.2556 20.2331 19.0787 20.678 19.0781H43.057C43.5019 19.0787 43.9284 19.2556 44.2429 19.5702C44.5575 19.8848 44.7345 20.3113 44.735 20.7561V28.0291ZM20.119 26.9101H43.619V20.7561C43.619 20.6076 43.56 20.4652 43.455 20.3601C43.35 20.2551 43.2075 20.1961 43.059 20.1961H20.678C20.5295 20.1961 20.387 20.2551 20.282 20.3601C20.177 20.4652 20.118 20.6076 20.118 20.7561L20.119 26.9101ZM43.057 44.3941H20.678C20.2331 44.3936 19.8066 44.2166 19.4921 43.9021C19.1775 43.5875 19.0005 43.161 19 42.7161V29.8481H44.735V42.7151C44.7345 43.1603 44.5574 43.587 44.2426 43.9018C43.9279 44.2165 43.5011 44.3936 43.056 44.3941H43.057ZM20.119 30.9671V42.7151C20.119 42.8636 20.178 43.0061 20.283 43.1111C20.388 43.2161 20.5305 43.2751 20.679 43.2751H43.057C43.2055 43.2751 43.348 43.2161 43.453 43.1111C43.558 43.0061 43.617 42.8636 43.617 42.7151V30.9671H20.119Z" fill="white" stroke="white" stroke-width="0.3" />
                    <path d="M40.2601 25.2326C40.1733 25.2326 40.0877 25.2124 40.0101 25.1735C39.9325 25.1346 39.865 25.0781 39.8131 25.0086L38.1351 22.7706C38.046 22.6519 38.0077 22.5027 38.0286 22.3558C38.0495 22.2088 38.1279 22.0762 38.2466 21.9871C38.3653 21.898 38.5145 21.8597 38.6614 21.8806C38.8084 21.9015 38.941 21.9799 39.0301 22.0986L40.2611 23.7396L41.4921 22.0986C41.5812 21.9799 41.7138 21.9015 41.8608 21.8806C42.0077 21.8597 42.1569 21.898 42.2756 21.9871C42.3943 22.0762 42.4727 22.2088 42.4936 22.3558C42.5145 22.5027 42.4762 22.6519 42.3871 22.7706L40.7091 25.0086C40.657 25.0784 40.5892 25.135 40.5112 25.1739C40.4332 25.2128 40.3472 25.2329 40.2601 25.2326ZM32.1481 24.1136H23.1971C23.0528 24.1075 22.9164 24.0459 22.8165 23.9416C22.7166 23.8374 22.6608 23.6985 22.6608 23.5541C22.6608 23.4097 22.7166 23.2708 22.8165 23.1666C22.9164 23.0623 23.0528 23.0007 23.1971 22.9946H32.1481C32.2236 22.9914 32.2989 23.0035 32.3696 23.0302C32.4402 23.0569 32.5048 23.0976 32.5593 23.1499C32.6138 23.2021 32.6572 23.2649 32.6868 23.3343C32.7165 23.4038 32.7318 23.4786 32.7318 23.5541C32.7318 23.6296 32.7165 23.7044 32.6868 23.7739C32.6572 23.8433 32.6138 23.9061 32.5593 23.9584C32.5048 24.0106 32.4402 24.0513 32.3696 24.078C32.2989 24.1047 32.2236 24.1168 32.1481 24.1136ZM35.7851 34.8836H22.3571C22.2816 34.8868 22.2063 34.8747 22.1357 34.848C22.065 34.8213 22.0004 34.7806 21.9459 34.7284C21.8914 34.6761 21.848 34.6133 21.8184 34.5439C21.7887 34.4744 21.7734 34.3996 21.7734 34.3241C21.7734 34.2486 21.7887 34.1738 21.8184 34.1044C21.848 34.0349 21.8914 33.9721 21.9459 33.9198C22.0004 33.8676 22.065 33.8269 22.1357 33.8002C22.2063 33.7735 22.2816 33.7614 22.3571 33.7646H35.7841C35.9284 33.7707 36.0648 33.8323 36.1647 33.9366C36.2646 34.0408 36.3204 34.1797 36.3204 34.3241C36.3204 34.4685 36.2646 34.6074 36.1647 34.7116C36.0648 34.8159 35.9284 34.8775 35.7841 34.8836H35.7851ZM41.3801 40.4786H22.3571C22.2816 40.4818 22.2063 40.4697 22.1357 40.443C22.065 40.4163 22.0004 40.3756 21.9459 40.3234C21.8914 40.2711 21.848 40.2083 21.8184 40.1389C21.7887 40.0694 21.7734 39.9946 21.7734 39.9191C21.7734 39.8436 21.7887 39.7688 21.8184 39.6994C21.848 39.6299 21.8914 39.5671 21.9459 39.5148C22.0004 39.4626 22.065 39.4219 22.1357 39.3952C22.2063 39.3685 22.2816 39.3564 22.3571 39.3596H41.3791C41.5234 39.3657 41.6598 39.4273 41.7597 39.5316C41.8596 39.6358 41.9154 39.7747 41.9154 39.9191C41.9154 40.0635 41.8596 40.2024 41.7597 40.3066C41.6598 40.4109 41.5234 40.4725 41.3791 40.4786H41.3801Z" fill="white" stroke="white" stroke-width="0.3" />
                </svg>
            </div>
            <span className='autoTitle'>Contact</span>

            {data.metrics ?
                <span className='metric'>
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.46953 5.99636C8.70117 5.98803 7.94358 6.17743 7.26953 6.54636C7.79141 7.01616 8.22581 7.57481 8.55253 8.19636L8.61353 8.31836V9.66236H13.5005V8.43936C13.1216 7.6981 12.5439 7.07695 11.8319 6.64547C11.12 6.214 10.302 5.98924 9.46953 5.99636Z" fill="black" />
                        <path d="M9.5 4.5C10.8807 4.5 12 3.60457 12 2.5C12 1.39543 10.8807 0.5 9.5 0.5C8.11929 0.5 7 1.39543 7 2.5C7 3.60457 8.11929 4.5 9.5 4.5Z" fill="black" />
                        <path d="M1.833 2.638C1.83975 2.07306 2.06717 1.53317 2.46667 1.13367C2.86617 0.734167 3.40606 0.506748 3.971 0.5C4.53803 0.5 5.08184 0.725253 5.48279 1.12621C5.88375 1.52716 6.109 2.07097 6.109 2.638C6.109 3.20503 5.88375 3.74884 5.48279 4.14979C5.08184 4.55075 4.53803 4.776 3.971 4.776C3.40606 4.76925 2.86617 4.54183 2.46667 4.14233C2.06717 3.74283 1.83975 3.20294 1.833 2.638ZM3.971 6C3.14314 5.97512 2.32608 6.19297 1.62049 6.6267C0.914899 7.06043 0.351603 7.6911 0 8.441V9.663H7.941V8.441C7.58946 7.69126 7.02632 7.0607 6.32093 6.62698C5.61554 6.19326 4.7987 5.97532 3.971 6Z" fill="black" />
                    </svg>

                    <span className='metricText'>{data.metrics.success}</span>
                </span>
                : ""}
        </React.Fragment>
    );
});
