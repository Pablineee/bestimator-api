const { Client } = require('../models/index');
const { v4: uuid } = require('uuid');

const getClients = async () => {
    const clients = await Client.findAll();
    return clients;
};

const getClientById = async (clientId) => {
    const client = await Client.findByPk(clientId);
    if (!client) return null;
    return client;
};

const addClient = async (data) => {
    const newClient = await Client.create({
        client_id: uuid(),
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        company_name: data.company_name
    });
    return newClient;
};

const updateClient = async (clientId, data) => {
    const updatedClient = await Client.update(
        {
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            company_name: data.company_name
        },
        {
            where: {
                client_id: clientId
            }
        }
    );
    return updatedClient;
};

const deleteClient = async (clientId) => {
    const deletedClient = await Client.destroy({
        where: {
            client_id: clientId
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