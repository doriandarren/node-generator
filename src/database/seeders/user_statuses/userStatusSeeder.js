import { faker } from '@faker-js/faker';
import UserStatus from '../../../models/UserStatus.js';

export async function seedUserStatuses() {
  try {
    const data = [];

    for (let i = 0; i < 10; i++) {
      const fake = faker;

      data.push({
        name: fake.lorem.word(),
      });
    }

    await UserStatus.bulkCreate(data);
    console.log('✅ Datos falsos insertados en user_statuses');
  } catch (error) {
    console.error('❌ Error al insertar datos falsos en user_statuses:', error);
  }
}    
