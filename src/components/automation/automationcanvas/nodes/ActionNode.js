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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.663 18.539" className="triggerAction"><g transform="translate(-0.15 -4.15)"><path className="a" d="M11.716,21.839H1V5H23.963v7.654"></path><path className="a" d="M1,5l11.481,8.42L23.963,5"></path><path className="a" d="M25,18l3.062,3.062L25,24.123" transform="translate(-5.63 -3.049)"></path><line className="a" x1="7" transform="translate(15 18)"></line></g></svg>
            </div>
            <Handle
                type="source"
                position="right"
                style={{ background: '#555', border: '4px solid #FFF' }}
            />
        </React.Fragment>
    );
});
