import React from 'react';
import { NAV_TABS, TabItem } from '../../data/portfolioData.ts';

interface TabBarProps {
  activeTab: string;
  onTabClick?: (id: string) => void;
}

export const TabBar = ({ activeTab, onTabClick }: TabBarProps) => {
  const handleClick = (id: string) => {
    onTabClick?.(id);
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="tabbar" aria-label="Main Navigation">
      {NAV_TABS.map((tab: TabItem) => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => handleClick(tab.id)}
          type="button"
          aria-current={activeTab === tab.id ? 'page' : undefined}
        >
          <span>{tab.label}</span>
        </button>
      ))}
      <div className="tab-fill" />
      <div className="brand-mark">limitless-v</div>
    </nav>
  );
};
