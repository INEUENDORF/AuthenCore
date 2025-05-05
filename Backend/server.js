// backend/server.js

const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos (documentos, fotos, credenciales)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas principales
app.use('/api', authRoutes);

// Middleware de error global
app.use(errorHandler);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
