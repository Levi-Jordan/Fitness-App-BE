import express from 'express';
import Nutrition from '../models/nutritionSchema.mjs'
import auth from '../middleware/auth.mjs';

const router = express.Router();

// Create
router.post('/', auth, async (req, res) => {
    // Specify Action
    try {
        const newNutrition = await Nutrition.create(req.body);
        res.status(201).json(newNutrition);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read
router.get('/', auth, async (req, res) => {
    // Specify Action
    try {
        const allNutrition = await Nutrition.find({});
        res.status(200).json(allNutrition);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update
router.put('/:id', auth, async (req, res) => {
    // Specify Action
    const editNutrition = await Nutrition.findByIdAndUpdate(req.params.id, req.body, { new: true });


    // Return Result
    res.json(editNutrition);
});

// Delete
router.delete('/:id', auth, async (req, res) => {
    // Specify Action
    const deleteNutrition = await Nutrition.findByIdAndDelete(req.params.id);

    // Return Result
    res.json(deleteNutrition);
});
export default router;