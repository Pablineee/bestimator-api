const express = require('express');
const router = express.Router();
const { getUsers, getUserById, findOrAddUser, updateUser, deleteUser } = require('../controllers/userController');
const { createClerkClient } = require('@clerk/backend');
const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// Get all Users
/**
 * @swagger
 * /v1/users:
 *   get:
 *     summary: Get All Users.
 *     description: Get all existing Users.
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
    try {
        const users = await getUsers();
        return users.length > 0 ? res.status(200).json({ users }) : res.status(200).json({});
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get user by ID
/**
 * @swagger
 * /v1/users/{user_id}:
 *   get:
 *     summary: Get User by ID
 *     description: Get user details using the user's ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the user
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await getUserById(user_id);
        if (!user){
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(user);
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create new User
/**
 * @swagger
 * /v1/users:
 *   post:
 *     summary: Create New User.
 *     description: Create a new user.
 *     tags: [Users]
 *     responses:
 *       '201':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
    try {
        const clerkUserId = req.auth.userId; // Clerk UUID
        const clerkUser = await clerkClient.users.getUser(clerkUserId);
        const newUser = await findOrAddUser(clerkUserId ,clerkUser);
        return res.status(201).json({
            message: 'User successfully synced with database',
            data: newUser,
        });
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update existing User
/**
 * @swagger
 * /v1/users/{user_id}:
 *   put:
 *     summary: Update Existing User
 *     description: Updates user details. Only fields sent in the request body will be updated.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the user
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
 *                 example: John
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               company_name:
 *                 type: string
 *                 example: Sample Company Inc.
 *               phone_number:
 *                 type: string
 *                 example: 8454564568
 *               address:
 *                 type: string
 *                 example: 1234 Sample St, City, Country
 *               profile_image_url:
 *                 type: string
 *                 example: example.com/path/to/photo
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        const updatedUser = await updateUser(user_id, req.body);
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });

        return res.status(200).json({
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (err) {
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete existing User
/**
 * @swagger
 * /v1/users/{user_id}:
 *   delete:
 *     summary: Soft Delete User (Deactivate)
 *     description: Deactivates a user instead of completely deleting their record.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the user
 *     responses:
 *       200:
 *         description: User successfully deactivated.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        const deletedUser = await deleteUser(user_id);
        if (!deletedUser) return res.status(404).json({ error: 'User not found' });

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;