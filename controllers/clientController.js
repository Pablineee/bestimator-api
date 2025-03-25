const { Client } = require('../models/index');
const { v4: uuid } = require('uuid');

const getClients = async (userId) => {
    const clients = await Client.findAll({ where: { user_id: userId } });
    return clients;
};

const getClientById = async (userId, clientId) => {

    const client = await Client.findByPk(clientId);
    if (!client || client.user_id !== userId) return null;
    return client;
};

const addClient = async (userId, data) => {
    if (!userId) throw new Error('User ID is required to create a client');
    const newClient = await Client.create({
        client_id: uuid(),
        user_id: userId,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        company_name: data.company_name
    });
    return newClient;
};

const updateClient = async (userId, clientId, data) => {
    if (!userId) throw new Error('User ID is required to update a client');
    const updatedClient = await Client.update(
        {
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            company_name: data.company_name
        },
        {
            where: {
                client_id: clientId,
                user_id: userId
            }
        }
    );
    return updatedClient;
};

const deleteClient = async (userId, clientId) => {
    if (!userId) throw new Error('User ID is required to delete a client');
    const deletedClient = await Client.destroy({
        where: {
            client_id: clientId,
            user_id: userId
        }
    });
    return deletedClient;
};

module.exports = {
    addClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient
};