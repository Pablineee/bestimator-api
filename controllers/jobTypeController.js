const { JobType } = require('../models/index');

const getJobTypes = async () => {
    const jobTypes = await JobType.findAll();
    return jobTypes;
};

const addJobType = async (jobType) => {
    const newJobType = await JobType.create({
        job_type: jobType
    });
    return newJobType;
};
    
const updateJobType = async (jobTypeId, data) => {
    const updatedJobType = await JobType.update(
        { job_type: data },
        {
            where: {
                job_type_id: jobTypeId
            }
        }
    );
    return updatedJobType; // Returns number of rows updated
};

const deleteJobType = async (jobTypeId) => {
    const deletedJobType = await JobType.destroy({
        where: {
            job_type_id: jobTypeId
        }
    });
    return deletedJobType;
};

module.exports = {
    addJobType,
    getJobTypes,
    updateJobType,
    deleteJobType
};