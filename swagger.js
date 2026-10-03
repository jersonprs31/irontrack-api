const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'IronTrack API',
    description: 'Backend API for tracking strength and fitness progression.'
  },
  host: 'irontrack-api-m4om.onrender.com', 
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];


swaggerAutogen(outputFile, endpointsFiles);