const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'HTTP Documentation',
        description: 'Consoles APIs'
    },
    host: 'localhost:3000',
    scheme: ['https']
};

const outputFile = './swagger.json';
const endPointsFiles = ['./routes/computers.js'];

swaggerAutogen (outputFile, endPointsFiles, doc);