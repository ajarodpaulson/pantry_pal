import React, { useState, useEffect } from 'react';
import './IngriedientPage.css'; // Import external CSS

const IngredientPage = () => {
  // Placeholder ingredients
  const [ingredients, setIngredients] = useState([
    { _id: '1', name: 'Placeholder Ingredient 1', quantity: 0 },
    { _id: '2', name: 'Placeholder Ingredient 2', quantity: 0 },
    { _id: '3', name: 'Placeholder Ingredient 3', quantity: 0 },
    { _id: '4', name: 'Placeholder Ingredient 4', quantity: 0 },
    { _id: '5', name: 'Placeholder Ingredient 5', quantity: 0 },
  ]);

  // Simulated fetch effect (replace with your backend fetch later)
  useEffect(() => {
    // For now, we're using placeholder data
    // When ready, uncomment and update the following:
    /*
    fetch('http://localhost:5000/api/ingredients')
      .then((response) => response.json())
      .then((data) => setIngredients(data))
      .catch((error) => console.error('Error fetching ingredients:', error));
    */
  }, []);

  // Update an ingredient's quantity (positive for add, negative for remove)
  const handleUpdateQuantity = (id, changeAmount) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient._id === id
          ? { ...ingredient, quantity: ingredient.quantity + changeAmount }
          : ingredient
      )
    );
  };

  // Component for each ingredient row
  const IngredientItem = ({ ingredient, onUpdateQuantity }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAdd = () => {
      const amount = parseInt(inputValue, 10);
      if (!isNaN(amount)) {
        onUpdateQuantity(ingredient._id, amount);
        setInputValue('');
      }
    };

    const handleRemove = () => {
      const amount = parseInt(inputValue, 10);
      if (!isNaN(amount)) {
        onUpdateQuantity(ingredient._id, -amount);
        setInputValue('');
      }
    };

    return (
      <li className="ingredient-item">
        <span className="ingredient-name">{ingredient.name}</span>
        <span className="ingredient-quantity">Quantity: {ingredient.quantity}</span>
        <input
          type="number"
          className="ingredient-input"
          placeholder="Amount"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="add-button" onClick={handleAdd}>Add</button>
        <button className="remove-button" onClick={handleRemove}>Remove</button>
      </li>
    );
  };

  return (
    <div className="ingredient-page">
      <h1>Ingredients</h1>
      <ul className="ingredient-list">
        {ingredients.map((ingredient) => (
          <IngredientItem
            key={ingredient._id}
            ingredient={ingredient}
            onUpdateQuantity={handleUpdateQuantity}
          />
        ))}
      </ul>
    </div>
  );
};

export default IngredientPage;
