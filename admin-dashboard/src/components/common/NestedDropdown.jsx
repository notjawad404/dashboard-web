import React, { useState } from 'react';

const NestedDropdown = () => {
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [nestedMenu, setNestedMenu] = useState(null);

  const mainItems = [
    { id: 1, label: 'Claim', subItems: ['Subitem 1-1', 'Subitem 1-2'] },
    { id: 2, label: 'Item 2', subItems: ['Subitem 2-1', 'Subitem 2-2'] },
    { id: 3, label: 'Item 3', subItems: [] },
  ];

  const handleMainClick = (id) => {
    setNestedMenu(nestedMenu === id ? null : id);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsMainOpen(!isMainOpen)}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Claim
      </button>

      {isMainOpen && (
        <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {mainItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => handleMainClick(item.id)}
                  className="flex justify-between w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                >
                  {item.label}
                  {item.subItems.length > 0 && (
                    <span className="ml-2 text-gray-400">▼</span>
                  )}
                </button>
                {nestedMenu === item.id && (
                  <div className="ml-4 bg-gray-100 rounded-md">
                    {item.subItems.map((subItem, index) => (
                      <button
                        key={index}
                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-200"
                      >
                        {subItem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NestedDropdown;
