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
                    <path d="M53 0H10C4.47715 0 0 4.47715 0 10V53C0 58.5228 4.47715 63 10 63H53C58.5228 63 63 58.5228 63 53V10C63 4.47715 58.5228 0 53 0Z" fill="#ED707A" />
                    <path d="M37.1 18L22 31.3H30.55L24.717 44.033L40.443 27.913H32.013L37.1 18Z" stroke="#FFE1E4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <Handle
                type="source"
                position="right"
                style={{ background: '#555', border: '4px solid #FFF' }}
            />
            <span className='autoTitle'>Automation</span>
            {data.metrics ?
                <span className='metric'>
                    <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M53 0H10C4.47715 0 0 4.47715 0 10V53C0 58.5228 4.47715 63 10 63H53C58.5228 63 63 58.5228 63 53V10C63 4.47715 58.5228 0 53 0Z" fill="#ED707A" />
                        <path d="M37.1 18L22 31.3H30.55L24.717 44.033L40.443 27.913H32.013L37.1 18Z" stroke="#FFE1E4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <span>{data.metrics.success}</span>
                </span>
                : ""}
        </React.Fragment>
    );
});
