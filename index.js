require('dotenv').config();
const cors = require('cors');
const express = require('express');
const URL = 'localhost';
const PORT = 3000;
const app = express();
const notesRoutes = require('./routes/notesRoutes');
const userRoutes = require('./routes/userRoutes');
const { swaggerSpec, swaggerUi } = require('./utils/swagger');
const { auth } = require('./utils/auth');

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/notes', auth, notesRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, URL, () => {
  console.log(`Server running at http://${URL}:${PORT}`);
});
