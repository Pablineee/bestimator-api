const express = require('express');
const router = express.Router();
const { getUnits, addUnit, updateUnit, deleteUnit } = require('../controllers/unitController');

// Get all Unit
router.get('/', async (req, res) => {
    try {
        const units = await getUnits();
        return units.length > 0 ? res.status(200).json({ units }) : res.status(200).json({});
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(501).json({ error: 'Internal Server Error' });
    }
});

// Create new Unit
router.post('/', async (req, res) => {
    try {
        const { unit_name } = req.body;
        const newUnit = await addUnit(unit_name);
        return res.status(201).json({
            message: 'New Unit added successfully',
            data: newUnit,
        });
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(501).json({ error: 'Internal Server Error' });
    }
});

// Update existing Unit
router.put('/', async (req, res) => {
    try {
        const { unit_id, unit_name } = req.body;
        const updatedUnit = await updateUnit(unit_id, unit_name);
        if (updatedUnit){
            return res.status(200).json({
                message: 'Unit updated successfully',
            });
        }
        return res.status(404).json({ error: 'Unit not found' });
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(501).json({ error: 'Internal Server Error' });
    }
});

// Delete existing Unit
router.delete('/', async (req, res) => {
    try {
        const { unit_id } = req.body;
        const unitDeleted = await deleteUnit(unit_id);
        if (unitDeleted){
            return res.status(204).send();
        }
        return res.status(404).json({ error: 'Unit not found' });
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(501).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;