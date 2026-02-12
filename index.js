/**
 * ENTRY POINT PARA CLEAVR
 * Este archivo redirige la ejecución al servidor NestJS compilado.
 */

// Asegurarse de que el servidor esté compilado antes de ejecutar
// require('./server/dist/main');

try {
    console.log('🚀 Iniciando Servidor de Producción de Tesis Clínica...');
    require('./server/dist/main');
} catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    console.error('Asegúrate de haber ejecutado "npm run build" antes de iniciar.');
    process.exit(1);
}
