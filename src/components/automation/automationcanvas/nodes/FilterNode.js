import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

export default memo(({ data }) => {
  const style = {
    
  };
  return (
    <React.Fragment>
      <Handle
        type="target"
        position="left"
        style={{ background: '#555', border: '4px solid #FFF' }}
      />
      <div style={style} className="filterNode">
        {/* {data.label} */}
          <svg width="100" height="100" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40.406 0C43.0581 3.59695e-05 45.6017 1.05363 47.477 2.929L60.071 15.523C61.9464 17.3983 63 19.9418 63 22.594V40.406C63 43.0581 61.9464 45.6017 60.071 47.477L47.477 60.071C45.6017 61.9464 43.0581 63 40.406 63H22.594C19.9418 63 17.3983 61.9464 15.523 60.071L2.929 47.477C1.05363 45.6017 3.59695e-05 43.0581 0 40.406L0 22.594C3.59695e-05 19.9418 1.05363 17.3983 2.929 15.523L15.523 2.929C17.3983 1.05363 19.9418 3.59695e-05 22.594 0L40.406 0Z" fill="#305671"/>
              <path d="M19.427 23.6518L28.661 34.3938V42.9098L34.338 39.1248V34.3938L43.573 23.6518C43.6908 23.5137 43.7663 23.3446 43.7905 23.1647C43.8146 22.9847 43.7865 22.8017 43.7094 22.6374C43.6323 22.473 43.5095 22.3344 43.3557 22.238C43.2019 22.1416 43.0235 22.0915 42.842 22.0938H20.158C19.9765 22.0915 19.7982 22.1416 19.6444 22.238C19.4906 22.3344 19.3678 22.473 19.2907 22.6374C19.2136 22.8017 19.1854 22.9847 19.2096 23.1647C19.2338 23.3446 19.3093 23.5137 19.427 23.6518V23.6518Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
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
