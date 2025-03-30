import React, { useState } from 'react';
import './TimeSelectionPage.css';
import { useNavigate } from 'react-router-dom'
import InventoryButton from './InventoryButton';

// import { useNavigate } from 'react-router-dom'; // if you want to navigate to another page

function TimeSelectionPage() {

  const navigate = useNavigate();

  const handleInventoryClick = () => {
      navigate('/inventory'); // adjust the route as needed
  };

  // State for time selection
  const [selectedTime, setSelectedTime] = useState(30);

  // State for selected ingredients (checkboxes)
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // Example half-hour increments (plus a "3+ hours" option)
  const timeOptions = [
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' },
    { value: 120, label: '2 hours' },
    { value: 150, label: '2.5 hours' },
    { value: 180, label: '3 hours' },
    { value: 9999, label: '3+ hours' }
  ];

  // Example inventory items - replace with your real data
  const inventory = [
    'Eggs', 'Milk', 'Cheese', 'Chicken', 'Broccoli',
    'Onions', 'Garlic', 'Mushrooms'
  ];

  // We add a "Surprise me" as the 9th item
  const displayedIngredients = [...inventory, 'Surprise me'];


  // Handle changes to time dropdown
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  // Handle checkbox changes
  const handleIngredientChange = (ingredient) => {
    if (ingredient === 'Surprise me') {
      // When "Surprise me" is clicked:
      if (selectedIngredients.includes(ingredient)) {
        // Deselect it if already selected
        setSelectedIngredients([]);
      } else {
        // Otherwise, deselect any other ingredient and select only "Surprise me"
        setSelectedIngredients(['Surprise me']);
      }
    } else {
      // For any other ingredient, if "Surprise me" is selected, remove it first
      let newSelections = [...selectedIngredients];
      if (newSelections.includes('Surprise me')) {
        newSelections = newSelections.filter(item => item !== 'Surprise me');
      }
      if (newSelections.includes(ingredient)) {
        // Deselect ingredient if already selected
        newSelections = newSelections.filter(item => item !== ingredient);
      } else {
        // Otherwise, add ingredient
        newSelections.push(ingredient);
      }
      setSelectedIngredients(newSelections);
    }
  };


  // Generate recipe button click
  const handleGenerateRecipe = () => {
    console.log('Time selected (minutes):', selectedTime);
    console.log('Ingredients selected:', selectedIngredients);

    // TODO: Possibly call your backend with fetch/axios
    // fetch('/api/generate-recipe', { ... })

    // Or navigate to a results page:
    // navigate('/results', { state: { time: selectedTime, ingredients: selectedIngredients } });
  };

  // Determine if the Generate Recipe button should be active
  const isButtonActive = selectedIngredients.length > 0;

  return (
    <div className="time-ingredients-container" style={{ textAlign: 'center', padding: '2rem' }}>

      <InventoryButton onClick={handleInventoryClick} />
      <h1 style={{ marginBottom: '4rem' }}>
        How much time do you have to cook today?
      </h1>

      {/* Time Selection Dropdown */}
      <select
        value={selectedTime}
        onChange={handleTimeChange}
        style={{ fontSize: '1rem', padding: '0.5rem', marginBottom: '2rem' }}
      >
        {timeOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <h2 style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        What ingredients do you want to use today?
      </h2>

      <div className="ingredients-grid">
        {displayedIngredients.map((ingredient) => (
          <label className="ingredient-label" key={ingredient}>
            <input
              type="checkbox"
              checked={selectedIngredients.includes(ingredient)}
              onChange={() => handleIngredientChange(ingredient)}
            />
            {ingredient}
          </label>
        ))}
      </div>


     <button
        onClick={handleGenerateRecipe}
        disabled={!isButtonActive}
        style={{
          display: 'inline-block',
          marginTop: '2rem',
          fontSize: '1rem',
          padding: '0.7rem 1.2rem',
          backgroundColor: isButtonActive ? '#4caf50' : '#555',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: isButtonActive ? 'pointer' : 'not-allowed'
        }}
      >
        Generate Recipe!
      </button>
    </div>
  );
}

export default TimeSelectionPage;
