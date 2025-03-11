const express = require('express');
const router = express.Router();
const { getUnits, addUnit, updateUnit, deleteUnit } = require('../controllers/unitController');

// Get all Unit
/**
 * @swagger
 * /v1/units:
 *   get:
 *     summary: Get All Units.
 *     description: Get all existing Units.
 *     tags: [Units]
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
    try {
        const units = await getUnits();
        return units.length > 0 ? res.status(200).json({ units }) : res.status(200).json({});
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create new Unit
/**
 * @swagger
 * /v1/units:
 *   post:
 *     summary: Create New Unit.
 *     description: Create a new unit.
 *     tags: [Units]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               unit_name:
 *                 type: string
 *                 example: sqft
 *     responses:
 *       '201':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
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
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update existing Unit
/**
 * @swagger
 * /v1/units:
 *   put:
 *     summary: Update Existing Unit.
 *     description: Update existing Unit by ID.
 *     tags: [Units]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               unit_id:
 *                 type: integer
 *                 example: 1
 *               unit_name:
 *                 type: string
 *                 example: sqft
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Unit not found
 *       '500':
 *         description: Internal server error
 */
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
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete existing Unit
/**
 * @swagger
 * /v1/units:
 *   delete:
 *     summary: Delete Existing Unit.
 *     description: Delete existing Unit by ID.
 *     tags: [Units]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               unit_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '204':
 *         description: A successful response
 *       '404':
 *         description: Unit not found
 *       '500':
 *         description: Internal server error
 */
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
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;