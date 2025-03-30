import express from 'express';
import groq from 'groq-sdk';
import Ingredient from '../models/Ingredient.js'; // Import the ingredient model

const groqClient = new groq.Groq({
    apiKey: "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", 
    dangerouslyAllowBrowser: true
  });

const router = express.Router();

router.post('/', async (req, res) => {
  let { ingredients, time, cuisineType } = req.body;

  let prompt;

  if (ingredients.includes('SurpriseMe')) {
    const allIngredients = await Ingredient.find();
    const ingredientNames = allIngredients.map(ing => ing.name);
    const randomSelection = ingredientNames.sort(() => 0.5 - Math.random()).slice(0, 5); 
    console.log(allIngredients);
    prompt = `Surprise me with any one healthy recipe with ${randomSelection.join(', ')}. You must still use the same ${cuisineType} and ${time} in minutes provided.`;
  } else {
    prompt = `Follow the prompts carefully. Your output should be a parsable JSON like string. It should be formatted
    with Title, Recipe Information, Ingredients, and Instructions. Do not add any formating elements like line break. I should be able to 
    parse Header: body, next header: next body, and so forth. You need to follow the regional cuisine strictly. The recipes you recommend should only be from
    this culinary region. Here is what you need to do with the rules I outlined: healthy ${cuisineType} recipe you can make in ${time} minutes using:
    ${ingredients.join(', ')}.\n\n`;    
  }

  // Eventually you'll use these in a prompt
  console.log('Ingredients:', ingredients); // array of strings
  console.log('Time:', time);               // number (minutes)
  console.log('Cuisine:', cuisineType);         // string

  try {
    // Send the prompt to Groq and get a response
    const botResponse = await groqClient.chat.completions.create({
        messages: [
            { role: 'system', content: 'Your name is ReciPy. Introduce yourself. You are a friendly recipe generator.'},
            { role: 'user', content: prompt }
        ],
        model: "llama-3.3-70b-versatile"
    });

    console.log('Groq Response:', botResponse);

    // Send back Groq's response to the frontend
    res.json({
      message: 'Recipe generated successfully',
      data: botResponse.choices[0]?.message?.content || 'No response from Groq',
    });

  } catch (error) {
    console.error('Error communicating with Groq:', error);
    res.status(500).json({ 
        message: 'Something went wrong',
        error: error.message });
  }
});

export default router;
