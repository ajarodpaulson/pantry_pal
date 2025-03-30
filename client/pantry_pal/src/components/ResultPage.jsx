import React, { useState, useEffect } from 'react';
import './ResultPage.css';

// A helper function to parse a raw recipe string into an object.
function parseRecipe(rawString) {
  const recipe = {};
  // Split the raw string by line breaks; remove empty lines
  const lines = rawString.split('\n').map(line => line.trim()).filter(line => line !== '');
  
  lines.forEach(line => {
    // Find the first colon (":") that separates the key and value
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return; // Skip lines without a colon

    // Extract the key and value
    const key = line.substring(0, colonIndex).trim().toLowerCase(); // lower-case keys
    const value = line.substring(colonIndex + 1).trim();
    
    // For keys that represent lists, split the value by the pipe ("|") character
    if (key === 'ingredients' || key === 'instructions') {
      recipe[key] = value.split('|').map(item => item.trim());
    } else {
      recipe[key] = value;
    }
  });
  
  return recipe;
}

// Sample raw recipe string without Notes (and no subtitle header if not needed)
const sampleRawRecipe = `
Title: Sample Recipe Title
PrepTime: 30 minutes
CookTime: 45 minutes
Servings: 4
Difficulty: Medium
Ingredients: 1 cup ingredient A | 2 cups ingredient B | 1 tbsp ingredient C
Instructions: Step 1: Preheat the oven. | Step 2: Mix the ingredients. | Step 3: Bake for 30 minutes.
`;

// Default recipe object without notes
const defaultRecipe = {
  title: "Sample Recipe Title",
  subtitle: "",  // leave subtitle empty if not used
  prepTime: "30 minutes",
  cookTime: "45 minutes",
  servings: "4",
  difficulty: "Medium",
  ingredients: [
    "1 cup ingredient A",
    "2 cups ingredient B",
    "1 tbsp ingredient C"
  ],
  instructions: [
    "Step 1: Preheat the oven.",
    "Step 2: Mix the ingredients.",
    "Step 3: Bake for 30 minutes."
  ]
};

const ResultPage = ({ recipe }) => {
  // currentRecipe holds the recipe to display; start with the prop or fallback to defaultRecipe
  const [currentRecipe, setCurrentRecipe] = useState(recipe || defaultRecipe);
  
  // Simulate fetching a raw recipe string and parsing it.
  useEffect(() => {
    const parsedData = parseRecipe(sampleRawRecipe);
    const formattedRecipe = {
      title: parsedData['title'] || defaultRecipe.title,
      subtitle: parsedData['subtitle'] || defaultRecipe.subtitle,
      prepTime: parsedData['preptime'] || defaultRecipe.prepTime,
      cookTime: parsedData['cooktime'] || defaultRecipe.cookTime,
      servings: parsedData['servings'] || defaultRecipe.servings,
      difficulty: parsedData['difficulty'] || defaultRecipe.difficulty,
      ingredients: parsedData['ingredients'] || defaultRecipe.ingredients,
      instructions: parsedData['instructions'] || defaultRecipe.instructions,
    };
    setCurrentRecipe(formattedRecipe);
  }, []); // Empty dependency array means this effect runs once when the component mounts
  
  return (
    <div className="recipe-display">
      {/* Header Section */}
      <header className="recipe-header">
        <h1 className="recipe-title">{currentRecipe.title}</h1>
        {currentRecipe.subtitle && (
          <p className="recipe-subtitle">{currentRecipe.subtitle}</p>
        )}
      </header>

      {/* Recipe Information Section */}
      <section className="recipe-info">
        <h2>Recipe Information</h2>
        <ul>
          {currentRecipe.prepTime && <li>Prep Time: {currentRecipe.prepTime}</li>}
          {currentRecipe.cookTime && <li>Cook Time: {currentRecipe.cookTime}</li>}
          {currentRecipe.servings && <li>Servings: {currentRecipe.servings}</li>}
          {currentRecipe.difficulty && <li>Difficulty: {currentRecipe.difficulty}</li>}
        </ul>
      </section>

      {/* Ingredients Section */}
      <section className="recipe-ingredients">
        <h2>Ingredients</h2>
        <ul>
          {currentRecipe.ingredients && currentRecipe.ingredients.length > 0 ? (
            currentRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))
          ) : (
            <li>No ingredients provided.</li>
          )}
        </ul>
      </section>

      {/* Instructions Section */}
      <section className="recipe-instructions">
        <h2>Instructions</h2>
        <ol>
          {currentRecipe.instructions && currentRecipe.instructions.length > 0 ? (
            currentRecipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
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
