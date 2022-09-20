import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({ data }) => {
    return (
        <React.Fragment>
            <Handle
                type="source"
                position="right"
                style={{ background: '#555', top: '50%', border: '4px solid #FFF' }}
            />
            <div className="triggerNode triggerNodeAppointment">
                {/* {data.label} */}
                <svg width="100" height="100" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.5 63C48.897 63 63 48.897 63 31.5C63 14.103 48.897 0 31.5 0C14.103 0 0 14.103 0 31.5C0 48.897 14.103 63 31.5 63Z" fill="#5570C9"/>
                    <path d="M42 21H21.001V41.999H42V21Z" stroke="#C1CDE2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M25.5289 28.7891H23.043V31.275H25.5289V28.7891Z" stroke="#C1CDE2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M32.5182 28.7891H30.0322V31.275H32.5182V28.7891Z" stroke="#C1CDE2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M39.5065 28.7891H37.0205V31.275H39.5065V28.7891Z" stroke="#C1CDE2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M25.5289 35.6797H23.043V38.1656H25.5289V35.6797Z" stroke="#C1CDE2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M32.5182 35.6797H30.0322V38.1656H32.5182V35.6797Z" stroke="#C1CDE2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M39.5065 35.6797H37.0205V38.1656H39.5065V35.6797Z" stroke="#C1CDE2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M42 25H21V42H42V25Z" stroke="#C1CDE2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <span className='autoTitle'>Appointment</span>

            {data.metrics ?
                <span className='metric'>
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.46953 5.99636C8.70117 5.98803 7.94358 6.17743 7.26953 6.54636C7.79141 7.01616 8.22581 7.57481 8.55253 8.19636L8.61353 8.31836V9.66236H13.5005V8.43936C13.1216 7.6981 12.5439 7.07695 11.8319 6.64547C11.12 6.214 10.302 5.98924 9.46953 5.99636Z" fill="black"/>
                      <path d="M9.5 4.5C10.8807 4.5 12 3.60457 12 2.5C12 1.39543 10.8807 0.5 9.5 0.5C8.11929 0.5 7 1.39543 7 2.5C7 3.60457 8.11929 4.5 9.5 4.5Z" fill="black"/>
                      <path d="M1.833 2.638C1.83975 2.07306 2.06717 1.53317 2.46667 1.13367C2.86617 0.734167 3.40606 0.506748 3.971 0.5C4.53803 0.5 5.08184 0.725253 5.48279 1.12621C5.88375 1.52716 6.109 2.07097 6.109 2.638C6.109 3.20503 5.88375 3.74884 5.48279 4.14979C5.08184 4.55075 4.53803 4.776 3.971 4.776C3.40606 4.76925 2.86617 4.54183 2.46667 4.14233C2.06717 3.74283 1.83975 3.20294 1.833 2.638ZM3.971 6C3.14314 5.97512 2.32608 6.19297 1.62049 6.6267C0.914899 7.06043 0.351603 7.6911 0 8.441V9.663H7.941V8.441C7.58946 7.69126 7.02632 7.0607 6.32093 6.62698C5.61554 6.19326 4.7987 5.97532 3.971 6Z" fill="black"/>
                    </svg>

                    <span className='metricText'>{data.metrics.success}</span>
                </span>
                : ""}
        </React.Fragment>
    );
});
