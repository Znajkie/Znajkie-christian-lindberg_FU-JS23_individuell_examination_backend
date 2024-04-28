require('dotenv').config();
const cors = require('cors');
const express = require('express');
const URL = "localhost"
const PORT = 3000
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const notesRoutes = require('./routes/notesRoutes')
const userRoutes = require('./routes/userRoutes')
const { auth } = require('./utils/utils');

app.use(express.json());
app.use(cors());

const swaggerDefinition = {
  info: {
    title: 'Notes',
    version: '1.0.0',
    description: 'API endpoints for managing Notes.',
  },
  basePath: '/',
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

swaggerSpec.components = {
  schemas: {
    Note: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
        id: { type: 'string' },
        title: { type: 'string' },
        text: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        modifiedAt: { type: 'string', format: 'date-time' },
      },
    },
  },
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/notes', auth, notesRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, URL, () => {
  console.log(`Server running at http://${URL}:${PORT}`);
});
