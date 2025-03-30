import React from 'react';
import './ResultPage.css'; // Import your CSS file for styling

// Create a default recipe with placeholder values
const defaultRecipe = {
  title: "Sample Recipe Title",
  subtitle: "Delicious Recipe Subtitle",
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
    "Step 3: Bake for 30 minutes.",
    "Step 1: Preheat the oven.",
    "Step 2: Mix the ingredients.",
    "Step 3: Bake for 30 minutes.",
    "Step 1: Preheat the oven.",
    "Step 2: Mix the ingredients.",
    "Step 3: Bake for 30 minutes.",
    "Step 1: Preheat the oven.",
    "Step 2: Mix the ingredients.",
    "Step 3: Bake for 30 minutes."
  ],
  notes: "These are sample notes for the recipe. Replace this with your own notes."
};

const ResultPage = ({ recipe }) => {
  // Use the provided recipe or fallback to the defaultRecipe if undefined
  const currentRecipe = recipe || defaultRecipe;

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

      {/* Notes Section */}
      {currentRecipe.notes && (
        <section className="recipe-notes">
          <h2>Notes</h2>
          <p>{currentRecipe.notes}</p>
        </section>
      )}
    </div>
  );
};

export default ResultPage;
