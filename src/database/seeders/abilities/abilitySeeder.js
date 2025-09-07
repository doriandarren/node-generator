import { faker } from '@faker-js/faker';
import Ability from '../../../models/Ability.js';

export async function seedAbilities() {
  try {
    const data = [];

    for (let i = 0; i < 10; i++) {
      const fake = faker;

      data.push({
        name: fake.lorem.word(),
        label: fake.lorem.word(),
        ability_group_id: fake.lorem.word(),
      });
    }

    await Ability.bulkCreate(data);
    console.log('✅ Datos falsos insertados en abilities');
  } catch (error) {
    console.error('❌ Error al insertar datos falsos en abilities:', error);
  }
}    
