import React, { memo, useState } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({ data }) => {
    const style = {

    }

    return (
        <React.Fragment>
            <Handle
                type="target"
                position="left"
                style={{ background: '#555', border: '4px solid #FFF' }}
            />
            <div style={style} className="actionNode">
                {/* {data.label} */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 22.8 22.99"
                    className="triggerTask"
                >
                    <g transform="translate(-62.56 -60.946)">
                        <path
                            className="a"
                            d="M85.36,80.563V67.895a3.538,3.538,0,0,0-3.675-3.373H80.678v-.2A3.537,3.537,0,0,0,77,60.946H66.235a3.538,3.538,0,0,0-3.675,3.373V76.988a3.538,3.538,0,0,0,3.675,3.373h1.007v.2a3.538,3.538,0,0,0,3.675,3.373H81.685A3.537,3.537,0,0,0,85.36,80.563Zm-5.033,2.269h-9.41a2.377,2.377,0,0,1-2.473-2.269V67.895a2.377,2.377,0,0,1,2.473-2.269H81.685a2.377,2.377,0,0,1,2.473,2.269V80.563a2.377,2.377,0,0,1-2.473,2.269H80.327Z"
                            transform="translate(0)"
                        />
                        <path
                            className="a"
                            d="M189.759,199.661h9.567a.478.478,0,0,0,0-.957h-9.567a.478.478,0,1,0,0,.957Z"
                            transform="translate(-119.253 -129.64)"
                        />
                        <path
                            className="a"
                            d="M223.046,254.319a.479.479,0,0,0,.479.478h8.965a.479.479,0,1,0,0-.957h-8.965A.479.479,0,0,0,223.046,254.319Z"
                            transform="translate(-151.028 -181.526)"
                        />
                        <path
                            className="a"
                            d="M198.64,309.464a.478.478,0,0,0-.478-.478h-8.4a.479.479,0,0,0,0,.957h8.4A.479.479,0,0,0,198.64,309.464Z"
                            transform="translate(-119.253 -233.422)"
                        />
                        <path
                            className="a"
                            d="M250.4,364.612a.479.479,0,0,0-.479-.478h-7.874a.478.478,0,1,0,0,.956h7.874A.479.479,0,0,0,250.4,364.612Z"
                            transform="translate(-168.463 -285.32)"
                        />
                    </g>
                </svg>
            </div>
            <Handle
                type="source"
                position="right"
                style={{ background: '#555', border: '4px solid #FFF' }}
            />
        </React.Fragment>
    );
});
