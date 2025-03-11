const express = require('express');
const router = express.Router();
const { getJobTypes, addJobType, updateJobType, deleteJobType } = require('../controllers/jobTypeController');

// Get all Job Type
router.get('/', async (req, res) => {
    try {
        const jobTypes = await getJobTypes();
        return jobTypes.length > 0 ? res.status(200).json({ jobTypes }) : res.status(200).json({});
    } catch(err){
        console.error(`Error: ${err.message}`);
        return res.status(501).json({ error: 'Internal Server Error' });
    }
});

// Create new Job Type
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
        return res.status(501).json({ error: 'Internal Server Error' });
    }
});

// Update existing Job Type
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
        return res.status(501).json({ error: 'Internal Server Error' });
    }
});

// Delete existing Job Type
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
        return res.status(501).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;