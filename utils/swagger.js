const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'Notes',
    version: '1.0.0',
    description: 'API endpoints for managing notes and user.',
  },
  basePath: '/',
  components: {
    schemas: {
      Note: {
        type: 'object',
        properties: {
          userId: { type: 'string' },
          id: { type: 'string' },
          title: { type: 'string' },
          text: { type: 'string' },
          createdAt: {
            type: 'string',
            pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$',
          },
          modifiedAt: {
            type: 'string',
            pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$',
          },
        },
      },
    },
  },
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);


module.exports = {
  swaggerSpec,
  swaggerUi,
};
