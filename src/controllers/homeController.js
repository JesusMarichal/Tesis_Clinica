const db = require('../config/database');

exports.getHome = (req, res) => {
    res.json({ message: 'Bienvenido a la API con arquitectura MVC' });
};

exports.getDbTest = async (req, res) => {
    try {
        const result = await db.query('SELECT NOW()');
        res.json({
            message: 'Conexión a Base de Datos exitosa',
            timestamp: result.rows[0].now
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error de conexión a la base de datos' });
    }
};
