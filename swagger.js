const swaggerAutogen = require('swagger-autogen')();

const doc={
    info:{
        title: 'Users API',
        description: 'Collects and displays user information'
    },
    host:'localhost:8080',
    schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile,endpointsFiles, doc);