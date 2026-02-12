const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Importar Rutas
const homeRoutes = require('./src/routes/homeRoutes');
const authRoutes = require('./src/routes/authRoutes');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (Frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API
app.use('/api', homeRoutes);
app.use('/api/auth', authRoutes);

// Ruta principal para el Frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor listo en Cleavr (Modo Mock - Sin DB)`);
    console.log(`🔗 URL: http://localhost:${PORT}`);
    console.log(`👤 Usuario de prueba: admin@test.com / admin123`);
});
