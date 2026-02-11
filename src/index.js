const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/database');
const homeRoutes = require('./routes/homeRoutes');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', homeRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido al backend de Tesis Clínica' });
});

// Iniciar servidor
app.listen(PORT, async () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);

  try {
    // Probar conexión a la base de datos
    await db.query('SELECT 1');
    console.log('✅ Conectado exitosamente a la base de datos PostgreSQL');
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error.message);
  }
});
