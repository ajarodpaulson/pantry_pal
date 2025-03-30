import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CuisineSelectionPage.css';

function CuisineSelectionPage() {
  const navigate = useNavigate();
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [isOther, setIsOther] = useState(false);
  const [otherValue, setOtherValue] = useState('');

  // Called when a user clicks one of the cuisine buttons
  const handleCuisineClick = (cuisine) => {
    if (cuisine === 'Other') {
      setIsOther(true);
      setSelectedCuisine(''); // clear any previously selected standard cuisine
    } else {
      setIsOther(false);
      setSelectedCuisine(cuisine);
    }
  };

  // checks to see if next button should be active
  const isNextActive = selectedCuisine !== '' || (isOther && otherValue.trim() !== '');
  // Optionally, navigate after the user picks or enters custom cuisine
  const navigateToNextPage = () => {
    const finalChoice = isOther ? otherValue : selectedCuisine;
    console.log('Cuisine choice:', finalChoice);

    // TODO: store in global state, context, or pass as route param
    // e.g. navigate(`/time?cuisine=${encodeURIComponent(finalChoice)}`)

    navigate('/time'); // go to time selection page
  };

  return (
    <div className="cuisine-container">
      <h1 className="title">What type of cuisine do you want to cook today?</h1>


      <div className="cuisine-grid">
        <button
          className={`cuisine-btn ${selectedCuisine === 'Japanese' ? 'active' : ''}`}
          onClick={() => handleCuisineClick('Japanese')}
        >
          Japanese
        </button>

        <button
          className={`cuisine-btn ${selectedCuisine === 'Italian' ? 'active' : ''}`}
          onClick={() => handleCuisineClick('Italian')}
        >
          Italian
        </button>
        <button
          className={`cuisine-btn ${selectedCuisine === 'Chinese' ? 'active' : ''}`}
          onClick={() => handleCuisineClick('Chinese')}
        >
          Chinese
        </button>

        <button
          className={`cuisine-btn ${selectedCuisine === 'Thai' ? 'active' : ''}`}
          onClick={() => handleCuisineClick('Thai')}
        >
          Thai
        </button>

        <button
          className={`cuisine-btn ${selectedCuisine === 'French' ? 'active' : ''}`}
          onClick={() => handleCuisineClick('French')}
        >
          French
        </button>

        <button
          className={`cuisine-btn ${selectedCuisine === 'Mexican' ? 'active' : ''}`}
          onClick={() => handleCuisineClick('Mexican')}
        >
          Mexican
        </button>

        <button
          className={`cuisine-btn ${selectedCuisine === 'Greek' ? 'active' : ''}`}
          onClick={() => handleCuisineClick('Greek')}
        >
          Greek
        </button>

        <button
          className={`cuisine-btn ${selectedCuisine === 'Korean' ? 'active' : ''}`}
          onClick={() => handleCuisineClick('Korean')}
        >
          Korean
        </button>

        <button
          className={`cuisine-btn ${isOther ? 'active' : ''}`}
          onClick={() => handleCuisineClick('Other')}
        >
          Other
        </button>

      </div>

      {isOther && (
        <div className="other-input">
          <label>Please specify: </label>
          <input
            type="text"
            value={otherValue}
            onChange={(e) => setOtherValue(e.target.value)}
            placeholder="Enter custom cuisine"
          />
        </div>
      )}

      <button
        className={`next-button ${isNextActive ? 'active' : ''}`}
        onClick={navigateToNextPage}
        disabled={!isNextActive}
      >
        Next
      </button>
    </div>
  );
}

export default CuisineSelectionPage;
