import sequelize from '../database/settings/config.js';
/**********
 * Models
 **********/
import '../models/UserStatus.js'; 
import '../models/User.js'; 
import '../models/Role.js'; 
import '../models/Ability.js'; 
import '../models/RoleUser.js'; 
import '../models/AbilityUser.js'; 


/**********
 * Relaciones entre modelos
 **********/
import '../models/initAssociations.js';


/**********
 * Seeders
 **********/
import { seedUsers } from '../database/seeders/users/userSeeder.js';
import { seedUserStatuses } from '../database/seeders/userStatuses/userStatusSeeder.js';
import { seedRoles } from '../database/seeders/roles/roleSeeder.js';





async function resetDatabase() {
  try {
    await sequelize.authenticate();
    console.log('🔌 Conectado a la base de datos');

    await sequelize.sync({ force: true });
    console.log('🧨 Base de datos restablecida');


    await seedUserStatuses();
    await seedRoles();

    await seedUsers();

    console.log('✅ Datos sembrados correctamente');


  } catch (error) {
    console.error('❌ Error al restablecer la base de datos:', error);
  } finally {
    await sequelize.close();
  }
}

resetDatabase();    
