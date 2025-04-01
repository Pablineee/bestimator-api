const express = require('express');
const router = express.Router();
const { getClients, getClientById, addClient, updateClient, deleteClient } = require('../controllers/clientController');

// Get all Clients
/**
 * @swagger
 * /v1/clients/:
 *   get:
 *     summary: Get All Clients.
 *     description: Get all existing Clients.
 *     tags: [Clients]
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
    try {
        const userId = req.auth.userId;
        const clients = await getClients(userId);
        return clients.length > 0 ? res.status(200).json({ clients }) : res.status(200).json({});
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /v1/clients/{client_id}:
 *   get:
 *     summary: Get Client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: client_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A successful response
 *       404:
 *         description: Client not found
 *       500:
 *         description: Internal server error
 */
router.get('/:client_id', async (req, res) => {
    try {
        const userId = req.auth.userId;
        const client = await getClientById(userId, req.params.client_id);
        if (!client){
            return res.status(404).json({ error: 'Client not found' });
        } 
        return res.status(200).json(client);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create new Client
/**
 * @swagger
 * /v1/clients:
 *   post:
 *     summary: Create New Client.
 *     description: Create a new client.
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@email.com
 *               first_name:
 *                 type: string
 *                 example: john
 *               last_name:
 *                 type: string
 *                 example: doe
 *               company_name:
 *                 type: string
 *                 example: example company inc.
 *     responses:
 *       '201':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
    try {
        const userId = req.auth.userId;
        const data = req.body;
        const newClient = await addClient(userId, data);
        return res.status(201).json({
            message: 'New Client added successfully',
            data: newClient,
        });
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update existing Client
/**
 * @swagger
 * /v1/clients:
 *   put:
 *     summary: Update Existing Client.
 *     description: Update existing Client by ID.
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client_id:
 *                 type: string
 *                 example: gsdfg545-gf5f4g53-fdg54f-dg5g4f
 *               email:
 *                 type: string
 *                 example: example@email.com
 *               first_name:
 *                 type: string
 *                 example: john
 *               last_name:
 *                 type: string
 *                 example: doe
 *               company_name:
 *                 type: string
 *                 example: example company inc.
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Client not found
 *       '500':
 *         description: Internal server error
 */
router.put('/', async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { client_id } = req.body;
        const data = req.body;
        const updatedClient = await updateClient(userId, client_id, data);
        if (updatedClient){
            return res.status(200).json({
                message: 'Client updated successfully',
            });
        }
        return res.status(404).json({ error: 'Client not found' });
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete existing Client
/**
 * @swagger
 * /v1/clients:
 *   delete:
 *     summary: Delete Existing Client.
 *     description: Delete existing Client by ID.
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client_id:
 *                 type: string
 *                 example: gsdfg545-gf5f4g53-fdg54f-dg5g4f
 *     responses:
 *       '204':
 *         description: A successful response
 *       '404':
 *         description: Client not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/', async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { client_id } = req.body;
        const deletedClient = await deleteClient(userId, client_id);
        if (deletedClient){
            return res.status(204).send();
        }
        return res.status(404).json({ error: 'Client not found' });
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;