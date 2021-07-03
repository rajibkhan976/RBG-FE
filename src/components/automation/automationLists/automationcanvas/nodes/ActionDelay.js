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
            <div style={style} className="actionNode actionNodeDelay">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.679 26.985" class="triggerDelay"><path class="a" d="M18.587,13.181a10.2,10.2,0,0,0,5-8.886,1.132,1.132,0,0,0,1.087-1.123V2.632A1.132,1.132,0,0,0,23.547,1.5H6.632A1.132,1.132,0,0,0,5.5,2.632v.539A1.123,1.123,0,0,0,6.55,4.286a10.158,10.158,0,0,0,5.1,8.941,1.68,1.68,0,0,1,.858,1.516v.174a1.653,1.653,0,0,1-.913,1.452,10.119,10.119,0,0,0-5.032,8.85,1.123,1.123,0,0,0-1.059,1.1v.539a1.132,1.132,0,0,0,1.132,1.132H23.547a1.132,1.132,0,0,0,1.132-1.132v-.539a1.132,1.132,0,0,0-1.087-1.123,10.137,10.137,0,0,0-5-8.822,1.653,1.653,0,0,1-.913-1.443v-.3A1.653,1.653,0,0,1,18.587,13.181ZM6.413,3.171V2.632a.219.219,0,0,1,.219-.219H23.547a.219.219,0,0,1,.219.219v.539a.219.219,0,0,1-.219.219H6.632a.219.219,0,0,1-.219-.219ZM23.766,26.314v.539a.219.219,0,0,1-.219.219H6.632a.219.219,0,0,1-.219-.219v-.539a.219.219,0,0,1,.219-.219H23.547a.219.219,0,0,1,.219.219Zm-5.6-9.133a9.215,9.215,0,0,1,4.566,8.01H7.454a9.206,9.206,0,0,1,4.566-8.019,2.566,2.566,0,0,0,1.416-2.256v-.174a2.566,2.566,0,0,0-1.361-2.311,9.242,9.242,0,0,1-4.566-8.11H22.688A9.288,9.288,0,0,1,18.122,12.4a2.566,2.566,0,0,0-1.4,2.247v.283a2.566,2.566,0,0,0,1.443,2.247Z" transform="translate(-5.25 -1.25)"/></svg>
            </div>
            <Handle
                type="source"
                position="right"
                style={{ background: '#555', border: '4px solid #FFF' }}
            />
        </React.Fragment>
    );
});
