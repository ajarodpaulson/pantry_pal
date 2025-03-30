import './TimeSelectionPage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import InventoryButton from './InventoryButton';
import React, { useState, useEffect } from 'react';

function TimeSelectionPage() {
  const location = useLocation();
  const cuisine = location.state?.cuisine || 'No cuisine selected';
  console.log('Cuisine:', cuisine);

  const navigate = useNavigate();

  const handleInventoryClick = () => {
    navigate('/inventory'); // goes to inventory
  };

  // State for time selection
  const [selectedTime, setSelectedTime] = useState(30);

  // State for selected ingredients (checkboxes)
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // We’ll store ALL ingredient names from the backend here
  const [allIngredients, setAllIngredients] = useState([]);
  // Keep track of how many we want to show at a time
  const [displayCount, setDisplayCount] = useState(8);

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

  // Fetch all ingredients from backend (don’t slice here)
  useEffect(() => {
    fetch('http://localhost:3000/api/ingredients')
      .then((response) => response.json())
      .then((data) => {
        // data is an array of ingredient objects; map to get just the names
        const names = data.map(item => item.name);
        setAllIngredients(names);
      })
      .catch((error) => console.error('Error fetching ingredients:', error));
  }, []);

  // Create a slice of the full list, up to displayCount
  const visibleIngredients = allIngredients.slice(0, displayCount);
  // Add “Surprise me” at the end
  const displayedIngredients = [...visibleIngredients, 'Surprise me'];

  // “Show Me More” handler: increase displayCount by 9
  const handleShowMore = () => {
    setDisplayCount(prev => prev + 9);
  };

  // Handle changes to time dropdown
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  // Handle checkbox changes
  const handleIngredientChange = (ingredient) => {
    if (ingredient === 'Surprise me') {
      if (selectedIngredients.includes(ingredient)) {
        // Deselect it if already selected
        setSelectedIngredients([]);
      } else {
        // Otherwise, deselect any other ingredient and select only “Surprise me”
        setSelectedIngredients(['Surprise me']);
      }
    } else {
      let newSelections = [...selectedIngredients];
      // Remove “Surprise me” if present
      if (newSelections.includes('Surprise me')) {
        newSelections = newSelections.filter(item => item !== 'Surprise me');
      }
      // Toggle the clicked ingredient
      if (newSelections.includes(ingredient)) {
        newSelections = newSelections.filter(item => item !== ingredient);
      } else {
        newSelections.push(ingredient);
      }
      setSelectedIngredients(newSelections);
    }
  };

  // Generate recipe button click
  const handleGenerateRecipe = () => {
    const finalIngredients = selectedIngredients.includes('Surprise me')
      ? ['SurpriseMe']
      : selectedIngredients;

    console.log('Ingredients selected:', finalIngredients);
    console.log('Time selected (minutes):', selectedTime);
    console.log('Cuisine:', cuisine);

    const recipeRequest = {
      ingredients: finalIngredients,
      time: selectedTime,
      cuisineType: cuisine
    };

    fetch('http://localhost:3000/api/generaterecipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeRequest),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to generate recipe');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Generated recipe:', data);
        navigate('/results', { state: { recipe: data } });
      })
      .catch((error) => {
        console.error('Error generating recipe:', error);
      });
  };

  // Only enable “Generate Recipe!” if at least one ingredient is selected
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
        style={{
          fontSize: '2rem',
          padding: '0.5rem',
          marginBottom: '2rem',
          fontFamily: 'Dongle, sans-serif'
        }}
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

      {/* Show Me More button, only if we still have more ingredients left */}
      {displayCount < allIngredients.length && (
        <button
          onClick={handleShowMore}
          style={{
            display: 'block',
            margin: '1rem auto',
            fontSize: '1.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Show Me More
        </button>
      )}

      <button
        className="generate-button"
        onClick={handleGenerateRecipe}
        disabled={!isButtonActive}
        style={{
          display: 'inline-block',
          marginTop: '2rem',
          fontSize: '2rem',
          padding: '0.7rem 1.2rem',
          backgroundColor: isButtonActive ? '#FCA04E' : '#555',
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
