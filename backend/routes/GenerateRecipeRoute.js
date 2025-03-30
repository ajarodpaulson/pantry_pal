import express from 'express';
import groq from 'groq-sdk';

const groqClient = new groq.Groq({
    apiKey: "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", 
    dangerouslyAllowBrowser: true
  });

const router = express.Router();

router.post('/', async (req, res) => {
  const { ingredients, time, cuisine } = req.body;

  const prompt = `Here is a ${cuisine} recipe you can make in ${time} minutes using: ${ingredients.join(', ')}.\n\nEnjoy your meal!`;

  // Eventually you'll use these in a prompt
  console.log('Ingredients:', ingredients); // array of strings
  console.log('Time:', time);               // number (minutes)
  console.log('Cuisine:', cuisine);         // string

  try {
    // Send the prompt to Groq and get a response
    const botResponse = await groqClient.chat.completions.create({
        messages: [
            { role: 'system', content: 'You are a friendly recipe generator.'},
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
