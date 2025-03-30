import React from 'react';
import './InventoryButton.css';

const InventoryButton = ({ onClick }) => {
  return (
    <button className="inventory-button" onClick={onClick}>
      Inventory
    </button>
  );
};

export default InventoryButton;
