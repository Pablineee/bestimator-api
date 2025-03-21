const { User } = require('../models/index');
const dotenv = require('dotenv');
dotenv.config();

const getUsers = async () => {
    const users = await User.findAll();
    return users;
};

const findOrAddUser = async (clerkUserId, clerkUser) => {
    let user = await User.findByPk(clerkUserId);

    if (!user){
        user = await User.create({
            user_id: clerkUserId,
            email: clerkUser.emailAddresses?.[0]?.emailAddress || '',
            first_name: clerkUser.firstName || '',
            last_name: clerkUser.lastName || '',
            company_name: '',
            phone_number: clerkUser.phoneNumbers?.[0]?.phoneNumber || '',
            address: '',
            profile_image_url: clerkUser.imageUrl || '',
        });
    }
    
    return user;
};

const getUserById = async (userId) => {
    const user = await User.findByPk(userId);
    return user;
};

const updateUser = async (userId, data) => {
    const updatedUser = await User.update(
        data,
        {
            where: {
                user_id: userId
            }
        }
    );
    return updatedUser;
};

const deleteUser = async (userId) => {
    const [affectedRows] = await User.update(
        { is_active: false },
        {
            where: {
                user_id: userId
            },
        },
    );
    return affectedRows > 0; // Returns true if user was found and updated
};

module.exports = {
    findOrAddUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser
};