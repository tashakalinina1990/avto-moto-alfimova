import React, { useState } from 'react';
import { TABS } from '../../utils/const';
import TabSpecification from '../tab-specification/tab-specification';
import TabReview from '../tab-review/tab-review';
import TabContact from '../tab-contact/tab-contact';

const TabMenu = () => {
  const [activeTab, setActiveTab] = useState('Характеристики');
  const [specification, review, contact] = TABS;

  const handleButtonClick = (evt) => {
    evt.preventDefault();
    setActiveTab(evt.target.textContent);
  };

  return (
    <div className="block-tabs">
      <div className="block-tabs_nav">
        {TABS.map((name, index) =>
          <button
            key={`${index}-${name}`}
            onClick={handleButtonClick}
            className={name === activeTab ? 'block-tabs_nav-btn block-tabs_nav-btn--checked' : 'block-tabs_nav-btn'}>
            {name}
          </button>)}
      </div>
      <TabSpecification isActive={activeTab === specification ? true : false} />
      <TabReview isActive={activeTab === review ? true : false} />
      <TabContact isActive={activeTab === contact ? true : false} />
    </div>
  );
}

export default TabMenu;
