import { useState, ReactNode } from "react";

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultIndex?: number;
  onChange?: (index: number) => void;
}

export function Tabs({ tabs, defaultIndex = 0, onChange }: TabsProps) {
  const clampedIndex = Math.min(
    Math.max(0, defaultIndex),
    Math.max(0, tabs.length - 1)
  );
  const [activeIndex, setActiveIndex] = useState(clampedIndex);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    onChange?.(index);
  };

  return (
    <div className="tabs">
      <div className="tabs-list" role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${index === activeIndex ? "tab-active" : ""}`}
            onClick={() => handleTabClick(index)}
            role="tab"
            aria-selected={index === activeIndex}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-panel" role="tabpanel">
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
}
