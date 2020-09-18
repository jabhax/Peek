import React from 'react';

function Tab({ title, id, icon, previewCapture }) {
  return (
    <div className='Tab'>
      <h5>Tab Comp</h5>
      <p>{ title }</p>
      <p>{ id }</p>
      <p>{ icon }</p>
      <p>{ previewCapture }</p>
    </div>
  );
}

export default Tab;
