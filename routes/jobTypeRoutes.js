const express = require('express');
const router = express.Router();
const { getJobTypes, getJobTypeById, addJobType, updateJobType, deleteJobType } = require('../controllers/jobTypeController');

// Get all Job Type
/**
 * @swagger
 * /v1/job-types:
 *   get:
 *     summary: Get All Job Types.
 *     description: Get all existing Job Types.
 *     tags: [Job Types]
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
    try {
        const jobTypes = await getJobTypes();
        return jobTypes.length > 0 ? res.status(200).json({ jobTypes }) : res.status(200).json({});
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /v1/job-types/{job_type_id}:
 *   get:
 *     summary: Get Job Type by ID
 *     description: Retrieve a specific job type by its unique ID.
 *     tags: [Job Types]
 *     parameters:
 *       - in: path
 *         name: job_type_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the job type.
 *     responses:
 *       200:
 *         description: A successful response
 *       404:
 *         description: Job type not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:job_type_id', async (req, res) => {
    try {
        const jobType = await getJobTypeById(req.params.job_type_id);
        if (!jobType){
            return res.status(404).json({ error: 'Job type not found' });
        }
        return res.status(200).json(jobType);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create new Job Type
/**
 * @swagger
 * /v1/job-types:
 *   post:
 *     summary: Create New Job Type.
 *     description: Create a new job type.
 *     tags: [Job Types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job_type:
 *                 type: string
 *                 example: painting
 *     responses:
 *       '201':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
    try {
        const { job_type } = req.body;
        const newJobType = await addJobType(job_type);
        return res.status(201).json({
            message: 'New Job Type added successfully',
            data: newJobType,
        });
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update existing Job Type
/**
 * @swagger
 * /v1/job-types:
 *   put:
 *     summary: Update Existing Job Type.
 *     description: Update existing Job Type by ID.
 *     tags: [Job Types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job_type_id:
 *                 type: integer
 *                 example: 1
 *               job_type:
 *                 type: string
 *                 example: painting
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Job Type not found
 *       '500':
 *         description: Internal server error
 */
router.put('/', async (req, res) => {
    try {
        const { job_type_id, job_type } = req.body;
        const updatedJobType = await updateJobType(job_type_id, job_type);
        if (updatedJobType){
            return res.status(200).json({
                message: 'Job Type updated successfully',
            });
        }
        return res.status(404).json({ error: 'Job Type not found' });
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete existing Job Type
/**
 * @swagger
 * /v1/job-types:
 *   delete:
 *     summary: Delete Existing Job Type.
 *     description: Delete existing Job Type by ID.
 *     tags: [Job Types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job_type_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '204':
 *         description: A successful response
 *       '404':
 *         description: Job Type not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/', async (req, res) => {
    try {
        const { job_type_id } = req.body;
        const jobTypeDeleted = await deleteJobType(job_type_id);
        if (jobTypeDeleted){
            return res.status(204).send();
        }
        return res.status(404).json({ error: 'Job Type not found' });
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;