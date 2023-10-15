const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const url = 'http://localhost:8080';
const schemes = ['http'];

const doc = {
    info: {
        title: 'Users API',
        description: 'Collects and displays user information',
    },
    servers: [
        {
            url,
            description: 'local server',
        },
        {
            url: 'https://cse341-personalproject-nnod.onrender.com/',
            description: 'production server',
        },
    ],
    schemes,
    tags: ['Users'],
    definitions: {
        UserInput: {
            type: 'object',
            properties: {
                username: { type: 'string' },
                password: { type: 'string' },
                email: { type: 'string' },
                displayName: { type: 'string' },
                accessLevel: { type: 'integer' },
            },
        },
    },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
