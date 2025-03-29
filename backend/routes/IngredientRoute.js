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

// POST route to add a new ingredient
router.post("/", async (req, res) => {
    const { name } = req.body;  // Extract name and quantity from the request body
  
    try {
      // Create a new ingredient object
      const newIngredient = new Ingredient({
        name
      });
  
      // Save the new ingredient to the database
      await newIngredient.save();
  
      // Respond with the newly added ingredient
      res.status(201).json(newIngredient); // 201 is the HTTP status code for created resources
    } catch (error) {
      // If there's an error
      res.status(500).json({ message: "Error adding ingredient", error });
    }
  });
  
// DELETE route to remove an ingredient by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params; // Extract the ingredient ID from the URL parameter
  
    try {
      // Find the ingredient by its ID and delete it
      const ingredient = await Ingredient.findByIdAndDelete(id);
  
      if (!ingredient) {
        // If no ingredient is found, send a 404 (Not Found) response
        return res.status(404).json({ message: "Ingredient not found" });
      }
  
      // Respond with a success message
      res.status(200).json({ message: "Ingredient deleted successfully" });
    } catch (error) {
      // If there's an error (e.g., invalid ID format), send a 500 error
      res.status(500).json({ message: "Error deleting ingredient", error });
    }
  });

  export default router;
  


  