const {  User } = require('../models/index');

const userActive = async (userId) => {
    try {
        // Fetch only the 'is_active' field
        const user = await User.findByPk(userId,
            {
                attributes: ['is_active']
            }
        );

        if (!user) return null;

        return user.is_active;
    } catch(err){
        console.error(`Error: ${err.message}`);
        throw new Error(`An error occurred while checking user status: ${err.message}`);
    }
};

module.exports = userActive;