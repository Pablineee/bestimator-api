const swaggerjsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Bestimator API',
            description: 'Bestimator API Information',
            contact: {
                name: 'System Administrator'
            },
        },
        servers: [
            {
                url: "https://unityhosting.ca"
            }
        ],
    },
    apis: ['./routes/*.js', './models/*.js']
}

const swaggerDocs = swaggerjsdoc(swaggerOptions);

module.exports = swaggerDocs;