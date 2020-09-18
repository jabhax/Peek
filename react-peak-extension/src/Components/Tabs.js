import React from 'react';
import Tab from './Tab';


function Tabs({ tabs }) {
  return (
    <div className='Tabs'>
      <h3>Tabs Component</h3>
      <div>
          { tabs.map(tab => <Tab key={ tab.id } tab={ tab }/>) }
      </div>
    </div>
  );
}

export default Tabs;
