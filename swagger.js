const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'IronTrack API',
    description: 'Backend API for tracking strength and fitness progression.'
  },
  host: 'localhost:8080', // Reminder for me to CHANGE THIS to your Render URL 
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles);