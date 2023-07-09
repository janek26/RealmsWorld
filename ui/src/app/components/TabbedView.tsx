"use client";
import React, { useState } from "react";
//import "./TabbedView.css";

interface TabInfo {
  name: string;
  component: React.ReactNode;
}

interface TabbedViewProps {
  tabs: TabInfo[];
  initialActiveTab: string;
}

const TabbedView: React.FC<TabbedViewProps> = ({ tabs, initialActiveTab }) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const activeComponent = tabs.find((tab) => tab.name === activeTab)?.component;

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <div className="tab-container flex mt-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => handleTabChange(tab.name)}
            className={`tab-button px-4 py-2 mr-1 border-b-4 border-transparent rounded-t font-semibold transition-all ${
              activeTab === tab.name
                ? "active bg-slate-800 text-white"
                : "inactive bg-gray-300 text-black border-gray-400 hover:bg-gray-400"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      {activeComponent}
    </div>
  );
};

export default TabbedView;
