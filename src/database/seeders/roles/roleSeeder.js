import { EnumRole } from '../../../enums/enumRole.js';
import Role from '../../../models/Role.js';


export const seedRoles = async () => { 
  const roles = [
    {
      id: EnumRole.ADMIN_ID,
      name: EnumRole.ADMIN,
      description: EnumRole.ADMIN_DESCRIPTION,
    },
    {
      id: EnumRole.MANAGER_ID,
      name: EnumRole.MANAGER,
      description: EnumRole.MANAGER_DESCRIPTION,
    },
    {
      id: EnumRole.USER_ID,
      name: EnumRole.USER,
      description: EnumRole.USER_DESCRIPTION,
    },
    {
      id: EnumRole.ERP_ID,
      name: EnumRole.ERP,
      description: EnumRole.ERP_DESCRIPTION,
    },
  ];

  for (const role of roles) {
    const exists = await Role.findOne({ where: { id: role.id } });

    if (!exists) {
      await Role.create(role);
      console.log(`🟢 Rol "${role.name}" creado`);
    } else {
      console.log(`⚠️ Rol "${role.name}" ya existe`);
    }
  }

  console.log('🌱 Roles insertados correctamente');
};
