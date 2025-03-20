const express = require('express');
const router = express.Router();
const { getMaterials, getMaterialById, addMaterial, updateMaterial, deleteMaterial } = require('../controllers/materialController');

// Get all Materials
/**
 * @swagger
 * /v1/materials:
 *   get:
 *     summary: Get All Materials.
 *     description: Get all existing Materials.
 *     tags: [Materials]
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
    try {
        const materials = await getMaterials();
        return materials.length > 0 ? res.status(200).json({ materials }) : res.status(200).json({});
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get Material by ID
/**
 * @swagger
 * /v1/materials/{material_id}:
 *   get:
 *     summary: Get Material by ID
 *     description: Retrieve a specific material by its ID.
 *     tags: [Materials]
 *     parameters:
 *       - in: path
 *         name: material_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the material.
 *     responses:
 *       200:
 *         description: A successful response
 *       404:
 *         description: Material not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:material_id', async (req, res) => {
    try {
        const { material_id } = req.params;
        const material = await getMaterialById(material_id);
        if (!material) {
            return res.status(404).json({ error: 'Material not found' });
        }
        return res.status(200).json(material);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create new Material
/**
 * @swagger
 * /v1/materials:
 *   post:
 *     summary: Create a new material
 *     description: Add a new material to the database.
 *     tags: [Materials]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: "1234567890"
 *               name:
 *                 type: string
 *                 example: "Eggshell Paint"
 *               product_title:
 *                 type: string
 *                 example: "Sherwin-Williams Paint 3.79L"
 *               job_type_id:
 *                 type: integer
 *                 example: 1
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 25.99
 *               unit_id:
 *                 type: integer
 *                 example: 3
 *               image_url:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://example.ca/image_0.jpg", "https://example.ca/image_1.jpg"]
 *               rating:
 *                 type: number
 *                 format: float
 *                 example: 4.5
 *               product_url:
 *                 type: string
 *                 example: "https://homedepot.ca/product/12345"
 *               coverage:
 *                 type: number
 *                 format: float
 *                 example: 100.0
 *     responses:
 *       201:
 *         description: A successful response
 *       500:
 *         description: Internal server error.
 */
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMaterial = await addMaterial(data);
        return res.status(201).json({
            message: 'New Material added successfully',
            data: newMaterial,
        });
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update existing Material
/**
 * @swagger
 * /v1/materials/{material_id}:
 *   put:
 *     summary: Update an existing material
 *     description: Modify the details of an existing material by its ID.
 *     tags: [Materials]
 *     parameters:
 *       - in: path
 *         name: material_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the material.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: "12345"
 *               name:
 *                 type: string
 *                 example: "Premium Paint"
 *               product_title:
 *                 type: string
 *                 example: "Sherwin-Williams Paint 1L"
 *               job_type_id:
 *                 type: integer
 *                 example: 1
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 25.99
 *               unit_id:
 *                 type: integer
 *                 example: 3
 *               image_url:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://example.ca/image_0.jpg", "https://example.ca/image_1.jpg"]
 *               rating:
 *                 type: number
 *                 format: float
 *                 example: 4.5
 *               product_url:
 *                 type: string
 *                 example: "https://homedepot.ca/product/12345"
 *               coverage:
 *                 type: number
 *                 format: float
 *                 example: 100.0
 *     responses:
 *       200:
 *         description: A successful response
 *       404:
 *         description: Material not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/:material_id', async (req, res) => {
    try {
        const { material_id } = req.params;
        const data = req.body;
        const updatedMaterial = await updateMaterial(material_id, data);
        if (!updatedMaterial) {
            return res.status(404).json({ error: 'Material not found' });
        }
        return res.status(200).json({
            message: 'Material updated successfully',
            data: updatedMaterial,
        });
    } catch (err) {
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete existing Material
/**
 * @swagger
 * /v1/materials/{material_id}:
 *   delete:
 *     summary: Delete a material
 *     description: Remove a material from the database by its ID.
 *     tags: [Materials]
 *     parameters:
 *       - in: path
 *         name: material_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the material.
 *     responses:
 *       200:
 *         description: a successful response
 *       404:
 *         description: Material not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:material_id', async (req, res) => {
    try {
        const { material_id } = req.params;
        const deletedMaterial = await deleteMaterial(material_id);
        if (!deletedMaterial) {
            return res.status(404).json({ error: 'Material not found' });
        }
        return res.status(200).json({ message: 'Material deleted successfully' });
    } catch (err) {
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;