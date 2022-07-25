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
            <div style={style} className="actionNode  actionNodeStatusPhase">
                {/* {data.label} */}
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M84.127 0H15.873C7.10659 0 0 7.10659 0 15.873V84.127C0 92.8934 7.10659 100 15.873 100H84.127C92.8934 100 100 92.8934 100 84.127V15.873C100 7.10659 92.8934 0 84.127 0Z" fill="#FF9CA4"/>
                    <path d="M34.9159 65.0822C26.8614 57.0277 26.8614 43.9686 34.9159 35.9141M64.0842 35.9141C72.1387 43.9686 72.1387 57.0277 64.0842 65.0822M41.3977 58.6004C36.923 54.1257 36.923 46.8705 41.3977 42.3959M57.6022 42.3959C62.0771 46.8705 62.0771 54.1257 57.6022 58.6004M51.7917 50.498C51.7917 51.7637 50.7657 52.7897 49.5 52.7897C48.2343 52.7897 47.2083 51.7637 47.2083 50.498C47.2083 49.2326 48.2343 48.2064 49.5 48.2064C50.7657 48.2064 51.7917 49.2326 51.7917 50.498Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
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
