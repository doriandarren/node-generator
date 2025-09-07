import { faker } from '@faker-js/faker';
import RoleUser from '../../../models/RoleUser.js';

export async function seedRoleUsers() {
  try {
    const data = [];

    for (let i = 0; i < 10; i++) {
      const fake = faker;

      data.push({
        user_id: fake.lorem.word(),
        role_id: fake.lorem.word(),
      });
    }

    await RoleUser.bulkCreate(data);
    console.log('✅ Datos falsos insertados en role_users');
  } catch (error) {
    console.error('❌ Error al insertar datos falsos en role_users:', error);
  }
}    
