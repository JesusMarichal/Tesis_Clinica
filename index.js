const path = require('path');
require('dotenv').config();

try {
    const port = process.env.PORT || 3000;
    console.log(`🚀 Iniciando Entorno de Producción de Tesis Clínica (Puerto ${port})...`);

    // Ruta absoluta para evitar errores en Cleavr
    const serverPath = path.join(__dirname, 'server', 'dist', 'main');

    console.log(`📂 Cargando servidor desde: ${serverPath}`);
    require(serverPath);

} catch (error) {
    console.error('❌ ERROR CRÍTICO AL INICIAR:');
    console.error(error.stack);
    process.exit(1);
}
