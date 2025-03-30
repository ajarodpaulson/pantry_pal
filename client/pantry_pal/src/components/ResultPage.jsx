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

  // Extract text for each section using substring and trim any trailing commas.
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

  const instructionsStr = rawString
    .substring(instructionsIndex + instructionsKey.length)
    .trim()
    .replace(/,$/, '');

  // Try to split ingredients into an array.
  // If the ingredients string contains commas, assume they are delimiters.
  let ingredients;
  if (ingredientsStr.includes(',')) {
    ingredients = ingredientsStr.split(',').map(ing => ing.trim()).filter(Boolean);
  } else {
    // Otherwise, if ingredients are space-separated, split on two or more spaces.
    ingredients = ingredientsStr.split(/\s{2,}/).map(ing => ing.trim()).filter(Boolean);
    if (ingredients.length === 0) ingredients = [ingredientsStr];
  }

  // Similarly, for instructions, try to split on periods.
  let instructions;
  if (instructionsStr.includes('.')) {
    instructions = instructionsStr.split('.').map(instr => instr.trim()).filter(Boolean);
  } else {
    instructions = [instructionsStr];
  }

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
  );
};

export default ResultPage;
