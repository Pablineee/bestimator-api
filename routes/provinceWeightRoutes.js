const express = require('express');
const router = express.Router();
const { getProvinceWeights, addProvinceWeight, updateProvinceWeight, deleteProvinceWeight } = require('../controllers/provinceWeightController');

// Get all Province Weights
/**
 * @swagger
 * /v1/province-weights:
 *   get:
 *     summary: Get All Province Weights.
 *     description: Get all existing Province Weights.
 *     tags: [Province Weights]
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
    try {
        const provinceWeights = await getProvinceWeights();
        return provinceWeights.length > 0 ? res.status(200).json({ provinceWeights }) : res.status(200).json({});
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create new Province Weight
/**
 * @swagger
 * /v1/province-weights:
 *   post:
 *     summary: Create New Province Weight.
 *     description: Create a new Province Weight.
 *     tags: [Province Weights]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               province:
 *                 type: string
 *                 example: on
 *               province_weight:
 *                 type: number
 *                 format: double
 *                 example: 0.9
 *               province_tax_rate:
 *                 type: float
 *                 format: double
 *                 example: 0.13
 *     responses:
 *       '201':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newProvinceWeight = await addProvinceWeight(data);
        return res.status(201).json({
            message: 'New Province Weight added successfully',
            data: newProvinceWeight,
        });
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update existing Province Weight
/**
 * @swagger
 * /v1/province-weights:
 *   put:
 *     summary: Update Existing Province Weight.
 *     description: Update existing Province Weight by ID.
 *     tags: [Province Weights]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               province_weight_id:
 *                 type: integer
 *                 example: 1
 *               province:
 *                 type: string
 *                 example: on
 *               province_weight:
 *                 type: number
 *                 format: double
 *                 example: 0.9
 *               province_tax_rate:
 *                 type: float
 *                 format: double
 *                 example: 0.13
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Province Weight not found
 *       '500':
 *         description: Internal server error
 */
router.put('/', async (req, res) => {
    try {
        const { province_weight_id } = req.body;
        const data = req.body;
        const updatedProvinceWeight = await updateProvinceWeight(province_weight_id, data);
        if (updatedProvinceWeight){
            return res.status(200).json({
                message: 'Province Weight updated successfully',
            });
        }
        return res.status(404).json({ error: 'Province Weight not found' });
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete existing Province Weight
/**
 * @swagger
 * /v1/province-weights:
 *   delete:
 *     summary: Delete Existing Province Weight.
 *     description: Delete existing Province Weight by ID.
 *     tags: [Province Weights]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               province_weight_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '204':
 *         description: A successful response
 *       '404':
 *         description: Province Weight not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/', async (req, res) => {
    try {
        const { province_weight_id } = req.body;
        const deletedProvinceWeight = await deleteProvinceWeight(province_weight_id);
        if (deletedProvinceWeight){
            return res.status(204).send();
        }
        return res.status(404).json({ error: 'Province Weight not found' });
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;