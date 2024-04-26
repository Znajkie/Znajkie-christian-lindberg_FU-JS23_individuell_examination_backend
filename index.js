require('dotenv').config();
const URL = "127.0.0.1"
const PORT = "3000"
const express = require("express");
const app = express();
const notesRoutes = require('./routes/notesRoutes')
const userRoutes = require('./routes/userRoutes')

app.use(express.json());

app.use('/api/notes', notesRoutes);
app.use('/api/user', userRoutes);

const server = app.listen(PORT, URL, () => {
  console.log(`Server running at http://${URL}:${PORT} or http://localhost:${PORT}`);
});