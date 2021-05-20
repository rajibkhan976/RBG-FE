import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({ data }) => {
    const style = {
        height: 115,
        width: 115,
        borderRadius: 100,
        border: "3px solid #12ace0",
        background: "#1a1c21",
        color: "#12ace0",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px'
    }
    return (
        <React.Fragment>
            <Handle
                type="source"
                position="right"
                style={{ background: '#555', top: '50%', border: '4px solid #FFF' }}
            />
            <div style={style}>
                {data.label}
            </div>
        </React.Fragment>
    );
});
