// src/scripts/dbAlter.js
import sequelize from '../database/settings/config.js';
import Prompt from '../models/Prompt.js';



async function syncAlter() {
  try {
    await sequelize.authenticate();
    console.log('🔌 Conectado a la base de datos');

    await sequelize.sync({ alter: true }); // 🧠 solo aplica cambios
    console.log('✅ Estructura actualizada (sin perder datos)');

  } catch (error) {
    console.error('❌ Error al aplicar alter:', error);
  } finally {
    await sequelize.close();
  }
}

syncAlter();
