const express = require('express');
const router = express.Router();
const {
  getEstimates,
  getEstimateById,
  createEstimate,
  updateEstimate,
  deleteEstimate
} = require('../controllers/estimateController');

// Get all Estimates
/**
 * @swagger
 * /v1/estimates:
 *   get:
 *     summary: Get all estimates
 *     tags: [Estimates]
 *     responses:
 *       200:
 *         description: A successful response
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
  try {
    const estimates = await getEstimates();
    return res.status(200).json({ estimates });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get Estimate by ID
/**
 * @swagger
 * /v1/estimates/{estimate_id}:
 *   get:
 *     summary: Get a single estimate by ID
 *     tags: [Estimates]
 *     parameters:
 *       - in: path
 *         name: estimate_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the estimate
 *     responses:
 *       200:
 *         description: A successful response
 *       404:
 *         description: Estimate not found
 *       500:
 *         description: Internal server error
 */
router.get('/:estimate_id', async (req, res) => {
  try {
    const { estimate_id } = req.params;
    const estimate = await getEstimateById(estimate_id);
    if (!estimate) {
      return res.status(404).json({ error: 'Estimate not found' });
    }
    return res.status(200).json(estimate);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create Estimate
/**
 * @swagger
 * /v1/estimates:
 *   post:
 *     summary: Create a new estimate
 *     tags: [Estimates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               client_id:
 *                 type: string
 *               job_type_id:
 *                 type: integer
 *               province_weight_id:
 *                 type: integer
 *               costs:
 *                 type: object
 *               additional_costs:
 *                 type: object
 *               status:
 *                 type: string
 *               notes:
 *                 type: string
 *               valid_until:
 *                 type: string
 *                 format: date
 *               total_cost:
 *                 type: number
 *               materials:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     material_id:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     initial_unit_cost:
 *                       type: number
 *                     current_unit_cost:
 *                       type: number
 *                     total_cost:
 *                       type: number
 *     responses:
 *       201:
 *         description: A successful response
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newEstimate = await createEstimate(data);
    return res.status(201).json({
      message: 'Estimate created successfully',
      data: newEstimate,
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
});

// Update Estimate
/**
 * @swagger
 * /v1/estimates/{estimate_id}:
 *   put:
 *     summary: Update an existing estimate
 *     tags: [Estimates]
 *     parameters:
 *       - in: path
 *         name: estimate_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the estimate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Fields to update
 *     responses:
 *       200:
 *         description: A successful response
 *       404:
 *         description: Estimate not found
 *       500:
 *         description: Internal server error
 */
router.put('/:estimate_id', async (req, res) => {
  try {
    const { estimate_id } = req.params;
    const data = req.body;
    const updatedEstimate = await updateEstimate(estimate_id, data);
    if (!updatedEstimate) {
      return res.status(404).json({ error: 'Estimate not found' });
    }
    return res.status(200).json({
      message: 'Estimate updated successfully',
      data: updatedEstimate,
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete Estimate
/**
 * @swagger
 * /v1/estimates/{estimate_id}:
 *   delete:
 *     summary: Delete an estimate
 *     tags: [Estimates]
 *     parameters:
 *       - in: path
 *         name: estimate_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the estimate
 *     responses:
 *       200:
 *         description: A successful response
 *       404:
 *         description: Estimate not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:estimate_id', async (req, res) => {
  try {
    const { estimate_id } = req.params;
    const deleted = await deleteEstimate(estimate_id);
    if (!deleted) {
      return res.status(404).json({ error: 'Estimate not found' });
    }
    return res.status(200).json({ message: 'Estimate deleted successfully' });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;