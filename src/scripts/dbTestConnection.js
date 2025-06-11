// testConnection.js
import sequelize from '../database/settings/config.js';

async function dbTestConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('❌ Error al conectar:', error);
  }
}

dbTestConnection();
