// src/scripts/dbAlter.js
import sequelize from '../database/settings/config.js';

/**********
 * Modelos (se registran en Sequelize)
 **********/
import Ability from '../models/Ability.js';
import AbilityGroup from '../models/AbilityGroup.js';
import AbilityUser from '../models/AbilityUser.js';
import Country from '../models/Country.js';
import Role from '../models/Role.js';
import RoleUser from '../models/RoleUser.js';
import User from '../models/User.js';
import UserStatus from '../models/UserStatus.js';


/**********
 * Relaciones entre modelos
 **********/
import '../models/initAssociations.js';



/**********
 * Seeders
 **********/
import seedUserStatuses from '../database/seeders/userStatuses/userStatusSeeder.js';
import seedRoles from '../database/seeders/roles/roleSeeder.js';
import seedUsers from '../database/seeders/users/userSeeder.js';



async function syncMigration() {
  try {
    await sequelize.authenticate();
    console.log('🔌 Conectado a la base de datos');

    await sequelize.sync({ alter: true }); // 🧠 solo aplica cambios
    console.log('✅ Estructura actualizada (sin perder datos)');

    
    // 🚀 Ejecutar seeders después de alterar la estructura
    await seedUserStatuses();
    await seedRoles();
    await seedUsers();

    console.log('✅ Seeders ejecutados con éxito');


  } catch (error) {
    console.error('❌ Error al aplicar alter:', error);
  } finally {
    await sequelize.close();
  }
}

syncMigration();
