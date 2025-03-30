import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ResultPage.css';

function parseRecipe(rawString) {
  // Define header keys
  const titleKey = "Title:";
  const recipeInfoKey = "Recipe Information:";
  const ingredientsKey = "Ingredients:";
  const instructionsKey = "Instructions:";

  // Find indices of headers
  const titleIndex = rawString.indexOf(titleKey);
  const recipeInfoIndex = rawString.indexOf(recipeInfoKey);
  const ingredientsIndex = rawString.indexOf(ingredientsKey);
  const instructionsIndex = rawString.indexOf(instructionsKey);

  // If any header is missing, log error and return null.
  if (
    titleIndex === -1 ||
    recipeInfoIndex === -1 ||
    ingredientsIndex === -1 ||
    instructionsIndex === -1
  ) {
    console.error("Missing one or more required keys in the raw string.");
    return null;
  }

  // Extract each section by slicing between header indices.
  const title = rawString
    .substring(titleIndex + titleKey.length, recipeInfoIndex)
    .trim()
    .replace(/,$/, '');

  const recipeInfo = rawString
    .substring(recipeInfoIndex + recipeInfoKey.length, ingredientsIndex)
    .trim()
    .replace(/,$/, '');

  const ingredientsStr = rawString
    .substring(ingredientsIndex + ingredientsKey.length, instructionsIndex)
    .trim()
    .replace(/,$/, '');
  
  let ingredients = [];
  if (ingredientsStr.includes(',')) {
    ingredients = ingredientsStr.split(',').map(ing => ing.trim()).filter(Boolean);
  } else {
    ingredients = [ingredientsStr];
  }

  const instructionsStr = rawString
    .substring(instructionsIndex + instructionsKey.length)
    .trim();

  // Split instructions on newlines and remove any leading step number and punctuation (e.g., "1. ")
  let instructions = instructionsStr
    .split('\n')
    .map(instr => instr.trim())
    .filter(instr => instr !== '')
    .map(instr => instr.replace(/^\d+\.\s*/, '')); // Remove leading numbers like "1. "

  return { title, recipeInfo, ingredients, instructions };
}

const ResultPage = () => {
  const location = useLocation();
  // Expect the raw recipe string from state; if recipeData is an object, use its "data" property.
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
      <div className="text-container">
        <section className="recipe-info">
          <h2>Recipe Information</h2>
          <p>{parsedRecipe.recipeInfo}</p>
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
    </div>
  );
};

export default ResultPage;
