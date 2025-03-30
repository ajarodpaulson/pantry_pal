import React, { useState, useEffect } from 'react';
import './IngredientPage.css'; // Import external CSS
import { useNavigate } from 'react-router-dom';

const IngredientPage = () => {

  const navigate = useNavigate();
  // ingredients list
  const [ingredients, setIngredients] = useState([]);

  // for adding and deleting ingredients
  const [ingredientName, setIngredientName] = useState('');
  // Simulated fetch effect (replace with your backend fetch later)
  useEffect(() => {
    fetch('http://localhost:3000/api/ingredients')
      .then((response) => response.json())
      .then((data) => setIngredients(data))
      .catch((error) => console.error('Error fetching ingredients:', error));

  }, []);

  // Add ingredient to database
    const handleAddIngredient = () => {
      if (!ingredientName.trim()) return; // ignore empty input

      const newIngredient = { name: ingredientName, quantity: 0 };
      fetch('http://localhost:3000/api/ingredients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIngredient),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to add ingredient');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Added ingredient:', data);
          // Refetch ingredients to refresh list
          return fetch('http://localhost:3000/api/ingredients');
        })
        .then((res) => res.json())
        .then((updated) => {
          setIngredients(updated);
          setIngredientName(''); // clear the input
        })
        .catch((error) => console.error('Error adding ingredient:', error));
    };

    // Delete ingredient by name
    const handleDeleteIngredient = () => {
      if (!ingredientName.trim()) return; // ignore empty input

      // Here, we assume your DELETE route supports something like:
      // DELETE /api/ingredients?name=ingredientName
      // Adjust to match your actual back-end logic.
      fetch(`http://localhost:3000/api/ingredients?name=${encodeURIComponent(ingredientName)}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete ingredient');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Deleted ingredient:', data);
          // Refetch ingredients to refresh list
          return fetch('http://localhost:3000/api/ingredients');
        })
        .then((res) => res.json())
        .then((updated) => {
          setIngredients(updated);
          setIngredientName(''); // clear the input
        })
        .catch((error) => console.error('Error deleting ingredient:', error));
    };
  // Update an ingredient's quantity (positive for add, negative for remove)
  const handleUpdateQuantity = (id, changeAmount) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) => {
          const newQuantity = ingredient.quantity || 0;
        if (newQuantity + changeAmount < 0) {
            return ingredient._id === id
              ? { ...ingredient, quantity: 0}
              : ingredient
            }
        return ingredient._id === id
          ? { ...ingredient, quantity: newQuantity + changeAmount }
          : ingredient
      })
    );
  };
  const handleReturn = () => {
          navigate('/'); // Adjust the route as needed
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
        <span className="ingredient-quantity">Quantity: {ingredient.quantity || 0}</span>
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

      <button className="return-button" onClick={handleReturn}>
              Return
      </button>

      <h1>Ingredients</h1>

      <div className="ingredient-controls">
        <input
          type="text"
          placeholder="Enter ingredient name"
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
        />
        <button onClick={handleAddIngredient}>Add Ingredient</button>
        <button onClick={handleDeleteIngredient}>Delete Ingredient</button>
      </div>

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
