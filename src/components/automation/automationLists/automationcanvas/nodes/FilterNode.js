import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

export default memo(({ data }) => {
  const style = {
    height: 110,
    width: 110,
    border: '3px solid #df42c5',
    background: "#1a1c21",
    color: "#df42c5",
    borderRadius: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px'
  };
  return (
    <React.Fragment>
      <Handle
        type="target"
        position="left"
        style={{ background: '#555', border: '4px solid #FFF' }}
      />
      <div style={style}>
        {data.label}
      </div>
      <Handle
        type="source"
        position="right"
        style={{ background: '#555', border: '4px solid #FFF' }}
      />
    </React.Fragment>
  );
});
