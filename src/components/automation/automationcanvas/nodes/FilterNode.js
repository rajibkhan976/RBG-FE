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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.144 22.317" className="filterBuilder"><path className="a" d="M3.228,7.558,12.462,18.3v8.516l5.677-3.785V18.3L27.374,7.558A.945.945,0,0,0,26.643,6H3.959A.945.945,0,0,0,3.228,7.558Z" transform="translate(-2.229 -5.25)"></path></svg>
      </div>
      <Handle
        type="source"
        position="right"
        style={{ background: '#555', border: '4px solid #FFF' }}
      />
    </React.Fragment>
  );
});
