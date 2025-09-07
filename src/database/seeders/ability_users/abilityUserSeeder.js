import { faker } from '@faker-js/faker';
import AbilityUser from '../../../models/AbilityUser.js';

export async function seedAbilityUsers() {
  try {
    const data = [];

    for (let i = 0; i < 10; i++) {
      const fake = faker;

      data.push({
        user_id: fake.lorem.word(),
        ability_id: fake.lorem.word(),
      });
    }

    await AbilityUser.bulkCreate(data);
    console.log('✅ Datos falsos insertados en ability_users');
  } catch (error) {
    console.error('❌ Error al insertar datos falsos en ability_users:', error);
  }
}    
