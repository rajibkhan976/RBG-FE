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
            <div style={style} className="actionNode  actionNodeSMS">
                {/* {data.label} */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.5 24.5" className="smsNode"><g transform="translate(-2.25 -5.25)"><line class="a" x2="7" transform="translate(18 22)"/><circle class="a" cx="7" cy="7" r="7" transform="translate(15 15)"/><path class="a" d="M21.9,25,25,22l-3.1-3"/><path class="a" d="M24,15.7V6H3V27H3a30.86,30.86,0,0,1,12-6"/><line class="b" x2="6" transform="translate(9 12)"/><line class="b" x2="3" transform="translate(9 16)"/></g></svg>
            </div>
            <Handle
                type="source"
                position="right"
                style={{ background: '#555', border: '4px solid #FFF' }}
            />
        </React.Fragment>
    );
});
