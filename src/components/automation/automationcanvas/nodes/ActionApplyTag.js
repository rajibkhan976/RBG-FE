import React, { memo, useState } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({ data }) => {
    return (
        <React.Fragment>
            <Handle
                type="target"
                position="left"
                style={{ background: '#555', border: '4px solid #FFF' }}
            />
            <div className="actionNode actionNodeDelay">
                <svg width="100" height="100" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M53 0H10C4.47715 0 0 4.47715 0 10V53C0 58.5228 4.47715 63 10 63H53C58.5228 63 63 58.5228 63 53V10C63 4.47715 58.5228 0 53 0Z" fill="#2157AF"/>
                    <path d="M37.5 44C33.916 44 31 41.084 31 37.5C31 33.916 33.916 31 37.5 31C41.084 31 44 33.916 44 37.5C44 41.084 41.084 44 37.5 44ZM37.5 32C34.467 32 32 34.467 32 37.5C32 40.533 34.467 43 37.5 43C40.533 43 43 40.533 43 37.5C43 34.467 40.533 32 37.5 32Z" fill="#8EB6F7" stroke="#8EB6F7" stroke-width="0.4"/>
                    <path d="M37.5 41C37.224 41 37 40.776 37 40.5V34.5C37 34.224 37.224 34 37.5 34C37.776 34 38 34.224 38 34.5V40.5C38 40.776 37.776 41 37.5 41Z" fill="#8EB6F7" stroke="#8EB6F7" stroke-width="0.4"/>
                    <path d="M40.5 38H34.5C34.224 38 34 37.776 34 37.5C34 37.224 34.224 37 34.5 37H40.5C40.776 37 41 37.224 41 37.5C41 37.776 40.776 38 40.5 38Z" fill="#8EB6F7" stroke="#8EB6F7" stroke-width="0.4"/>
                    <path d="M29.5 44C28.826 44 28.198 43.737 27.732 43.259L20.736 36.263C20.263 35.802 20 35.174 20 34.5C20 33.86 20.252 33.234 20.691 32.782L31.96 21.093C32.627 20.389 33.531 20 34.5 20H41.5C42.878 20 44 21.122 44 22.5V29.5C44 29.933 43.921 30.356 43.759 30.794C43.663 31.053 43.375 31.187 43.116 31.089C42.857 30.993 42.725 30.705 42.821 30.446C42.941 30.122 43 29.813 43 29.5V22.5C43 21.673 42.327 21 41.5 21H34.5C33.808 21 33.162 21.278 32.683 21.784L21.41 33.477C21.149 33.746 21 34.118 21 34.5C21 34.902 21.156 35.276 21.439 35.552L28.443 42.556C28.916 43.041 29.709 43.136 30.272 42.777C30.506 42.629 30.814 42.698 30.962 42.932C31.11 43.165 31.041 43.474 30.807 43.622C30.418 43.87 29.966 44 29.5 44Z" fill="#8EB6F7" stroke="#8EB6F7" stroke-width="0.4"/>
                    <path d="M39 27C37.897 27 37 26.103 37 25C37 23.897 37.897 23 39 23C40.103 23 41 23.897 41 25C41 26.103 40.103 27 39 27ZM39 24C38.449 24 38 24.449 38 25C38 25.551 38.449 26 39 26C39.551 26 40 25.551 40 25C40 24.449 39.551 24 39 24Z" fill="#8EB6F7" stroke="#8EB6F7" stroke-width="0.4"/>
                </svg>
            </div>
            <Handle
                type="source"
                position="right"
                style={{ background: '#555', border: '4px solid #FFF' }}
            />
            <span className='autoTitle'>Add Tags</span>
            { data.metrics ?
                <span className='metric'>
                 <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.46953 5.99636C8.70117 5.98803 7.94358 6.17743 7.26953 6.54636C7.79141 7.01616 8.22581 7.57481 8.55253 8.19636L8.61353 8.31836V9.66236H13.5005V8.43936C13.1216 7.6981 12.5439 7.07695 11.8319 6.64547C11.12 6.214 10.302 5.98924 9.46953 5.99636Z" fill="black"/>
                      <path d="M9.5 4.5C10.8807 4.5 12 3.60457 12 2.5C12 1.39543 10.8807 0.5 9.5 0.5C8.11929 0.5 7 1.39543 7 2.5C7 3.60457 8.11929 4.5 9.5 4.5Z" fill="black"/>
                      <path d="M1.833 2.638C1.83975 2.07306 2.06717 1.53317 2.46667 1.13367C2.86617 0.734167 3.40606 0.506748 3.971 0.5C4.53803 0.5 5.08184 0.725253 5.48279 1.12621C5.88375 1.52716 6.109 2.07097 6.109 2.638C6.109 3.20503 5.88375 3.74884 5.48279 4.14979C5.08184 4.55075 4.53803 4.776 3.971 4.776C3.40606 4.76925 2.86617 4.54183 2.46667 4.14233C2.06717 3.74283 1.83975 3.20294 1.833 2.638ZM3.971 6C3.14314 5.97512 2.32608 6.19297 1.62049 6.6267C0.914899 7.06043 0.351603 7.6911 0 8.441V9.663H7.941V8.441C7.58946 7.69126 7.02632 7.0607 6.32093 6.62698C5.61554 6.19326 4.7987 5.97532 3.971 6Z" fill="black"/>
                 </svg>

                 <span>{data.metrics.success}</span>
               </span>
                : ""}
        </React.Fragment>
    );
});
