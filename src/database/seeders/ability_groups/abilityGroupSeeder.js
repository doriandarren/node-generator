import { faker } from '@faker-js/faker';
import AbilityGroup from '../../../models/AbilityGroup.js';

export async function seedAbilityGroups() {
  try {
    const data = [];

    for (let i = 0; i < 10; i++) {
      const fake = faker;

      data.push({
        name: fake.lorem.word(),
      });
    }

    await AbilityGroup.bulkCreate(data);
    console.log('✅ Datos falsos insertados en ability_groups');
  } catch (error) {
    console.error('❌ Error al insertar datos falsos en ability_groups:', error);
  }
}    
