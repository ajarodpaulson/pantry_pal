import React from 'react';
import { useLocation } from 'react-router-dom';
import './ResultPage.css';

const ResultPage = () => {
  const location = useLocation();
  const recipeData = location.state?.recipe || 'No recipe selected';

  // If recipeData is an object, stringify it with formatting
  const recipeString =
    typeof recipeData === 'object'
      ? JSON.stringify(recipeData, null, 2)
      : recipeData;

  return (
    <div className="recipe-display">
      <h1>Recipe</h1>
      <div>
        {recipeString.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ResultPage;
