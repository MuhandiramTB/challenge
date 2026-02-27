import { useState, useRef, useEffect, useId } from "react";

interface DropdownItem {
  value: string;
  label: string;
}

interface DropdownProps {
  items: DropdownItem[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export function Dropdown({
  items,
  value,
  onChange,
  placeholder = "Select...",
  label,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const safeItems = Array.isArray(items) ? items : [];

  const selectedItem = safeItems.find((item) => item.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // When opening, set highlighted index to current value or 0
  useEffect(() => {
    if (isOpen) {
      const idx = safeItems.findIndex((item) => item.value === value);
      setHighlightedIndex(idx >= 0 ? idx : 0);
    } else {
      setHighlightedIndex(-1);
    }
  }, [isOpen, value, safeItems]);

  const handleSelect = (itemValue: string) => {
    onChange?.(itemValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (isOpen && highlightedIndex >= 0 && safeItems[highlightedIndex]) {
        handleSelect(safeItems[highlightedIndex].value);
      } else {
        setIsOpen(!isOpen);
      }
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (isOpen) {
        setHighlightedIndex((i) =>
          i < safeItems.length - 1 ? i + 1 : 0
        );
      } else {
        setIsOpen(true);
      }
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (isOpen) {
        setHighlightedIndex((i) =>
          i > 0 ? i - 1 : safeItems.length - 1
        );
      } else {
        setIsOpen(true);
      }
    }
  };

  return (
    <div className="dropdown" ref={ref}>
      {label && (
        <span id={labelId} className="dropdown-label">
          {label}
        </span>
      )}
      <div
        className={`dropdown-trigger ${isOpen ? "dropdown-open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="dropdown-listbox"
        aria-labelledby={label ? labelId : undefined}
        aria-activedescendant={isOpen && highlightedIndex >= 0 ? `dropdown-option-${highlightedIndex}` : undefined}
        tabIndex={0}
      >
        {selectedItem ? selectedItem.label : placeholder}
      </div>
      {isOpen && (
        <ul id="dropdown-listbox" className="dropdown-menu" role="listbox">
          {safeItems.map((item, index) => (
            <li
              key={item.value}
              id={`dropdown-option-${index}`}
              className={`dropdown-item ${item.value === value ? "dropdown-item-selected" : ""} ${index === highlightedIndex ? "dropdown-item-highlighted" : ""}`}
              onClick={() => handleSelect(item.value)}
              role="option"
              aria-selected={item.value === value}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
