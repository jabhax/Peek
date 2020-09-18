import React from 'react';

const Scroll = (props) => {
  let scrollStyle = { overflowY: 'scroll', height: '600px', width: '800px' };
  return (<div style={ scrollStyle }>{ props.children }</div>);
}

export default Scroll;
