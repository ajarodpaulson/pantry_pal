import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, default: 0 }, // Quantity of the ingredient
    unit: { type: String, default: "kg" }       // Unit of measure (e.g., grams, cups, etc.)
});

const Ingredient = mongoose.model("Ingredient", IngredientSchema);
export default Ingredient;