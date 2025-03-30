import express from 'express';
import Ingredient from '../models/Ingredient.js';
// const express = require('express');
const router = express.Router();
// const Ingredient = require('../models/Ingredient');

// GET route to fetch all ingredients
router.get("/", async (req, res) => {
    try {
      // Retrieve all ingredients from the database
      const ingredients = await Ingredient.find(); // Ingredient is the model you defined earlier
  
      // If there are ingredients, return them as a JSON response
      res.json(ingredients);
    } catch (error) {
      // If there's an error, send a 500 error response with the error message
      res.status(500).json({ message: "Error fetching ingredients", error });
    }
  });

router.post("/", async (req, res) => {
  const { name, quantity } = req.body;
  try {
    // Normalize the ingredient name (e.g., trim spaces and lowercase) for consistency
    const normalizedName = name.trim().toLowerCase();

    // Check if the ingredient already exists
    const existingIngredient = await Ingredient.findOne({ name: normalizedName });
    if (existingIngredient) {
      return res.status(400).json({ message: "Ingredient already exists" });
    }

    // Create and save the new ingredient
    const newIngredient = new Ingredient({
      name: normalizedName,
      quantity: quantity || 0,
    });
    await newIngredient.save();

    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(500).json({ message: "Error adding ingredient", error });
  }
});

  
router.delete("/", async (req, res) => {
  const { name } = req.query; // Extract the ingredient name from the query parameter
  try {
    const deletedIngredient = await Ingredient.findOneAndDelete({ name });
    if (!deletedIngredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }
    res.status(200).json({ message: "Ingredient deleted successfully", deletedIngredient });
  } catch (error) {
    res.status(500).json({ message: "Error deleting ingredient", error });
  }
});

  export default router;
  


  