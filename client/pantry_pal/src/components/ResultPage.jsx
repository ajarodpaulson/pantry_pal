import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ResultPage.css';

// Updated parseRecipe function using regex
function parseRecipe(rawString) {
  // 1. Extract the title: assume the first markdown bold text is the title.
  const titleMatch = rawString.match(/\*\*(.*?)\*\*/);
  const title = titleMatch ? titleMatch[1].trim() : "Untitled Recipe";

  // 2. Extract Ingredients:
  // This regex finds the section after "Ingredients:" that contains one or more lines starting with a dash.
  const ingredientsRegex = /Ingredients:\s*((?:- .+\n?)+)/i;
  let ingredients = [];
  const ingredientsMatch = rawString.match(ingredientsRegex);
  if (ingredientsMatch) {
    ingredients = ingredientsMatch[1]
      .split('\n')
      .map(line => line.replace(/^- /, '').trim())
      .filter(Boolean);
  }

  // 3. Extract Instructions:
  // This regex finds the section after "Instructions:" that contains one or more numbered steps.
  const instructionsRegex = /Instructions:\s*((?:\d+\..+\n?)+)/i;
  let instructions = [];
  const instructionsMatch = rawString.match(instructionsRegex);
  if (instructionsMatch) {
    instructions = instructionsMatch[1]
      .split('\n')
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .filter(Boolean);
  }

  // 4. Extract Recipe Information:
  const recipeInfo = {};
  const prepTimeMatch = rawString.match(/Prep Time:\s*(.+)/i);
  if (prepTimeMatch) recipeInfo.prepTime = prepTimeMatch[1].trim();
  const cookTimeMatch = rawString.match(/Cook Time:\s*(.+)/i);
  if (cookTimeMatch) recipeInfo.cookTime = cookTimeMatch[1].trim();
  const totalTimeMatch = rawString.match(/Total Time:\s*(.+)/i);
  if (totalTimeMatch) recipeInfo.totalTime = totalTimeMatch[1].trim();

  return { title, recipeInfo, ingredients, instructions };
}

const ResultPage = () => {
  const location = useLocation();
  // Expect the raw recipe string in the "data" property if recipeData is an object.
  const recipeData = location.state?.recipe;
  const rawString = typeof recipeData === 'object' ? recipeData.data : recipeData;

  const [parsedRecipe, setParsedRecipe] = useState(null);

  useEffect(() => {
    if (rawString) {
      const result = parseRecipe(rawString);
      setParsedRecipe(result);
    }
  }, [rawString]);

  if (!parsedRecipe) {
    return <div>No recipe provided.</div>;
  }

  return (
    <div className="recipe-display">
      <h1>{parsedRecipe.title}</h1>
      
      <section className="recipe-info">
        <h2>Recipe Information</h2>
        <ul>
          {parsedRecipe.recipeInfo.prepTime && <li>Prep Time: {parsedRecipe.recipeInfo.prepTime}</li>}
          {parsedRecipe.recipeInfo.cookTime && <li>Cook Time: {parsedRecipe.recipeInfo.cookTime}</li>}
          {parsedRecipe.recipeInfo.totalTime && <li>Total Time: {parsedRecipe.recipeInfo.totalTime}</li>}
        </ul>
      </section>

      <section className="recipe-ingredients">
        <h2>Ingredients</h2>
        <ul>
          {parsedRecipe.ingredients.length > 0 ? (
            parsedRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))
          ) : (
            <li>No ingredients provided.</li>
          )}
        </ul>
      </section>

      <section className="recipe-instructions">
        <h2>Instructions</h2>
        <ol>
          {parsedRecipe.instructions.length > 0 ? (
            parsedRecipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))
          ) : (
            <li>No instructions provided.</li>
          )}
        </ol>
      </section>
    </div>
  );
};

export default ResultPage;
