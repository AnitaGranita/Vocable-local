// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configurazione delle opzioni per Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentazione',
      version: '1.0.0',
      description: 'Documentazione delle API per la tua applicazione',
    },
    servers: [
      {
        url: 'http://localhost:9992',
        description: 'Server locale',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./route/routes.js'], // Percorso ai file delle rotte
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs,
};
