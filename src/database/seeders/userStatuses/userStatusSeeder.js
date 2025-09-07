import { EnumUserStatus } from '../../../enums/enumUserStatuses.js';
import UserStatus from '../../../models/UserStatus.js';


const seedUserStatus = async () => {
  const statuses = [
    {
      id: EnumUserStatus.STATUS_ACTIVE_ID,
      name: EnumUserStatus.STATUS_ACTIVE_NAME,
    },
    {
      id: EnumUserStatus.STATUS_INACTIVE_ID,
      name: EnumUserStatus.STATUS_INACTIVE_NAME,
    },
  ];

  for (const status of statuses) {
    const exists = await UserStatus.findOne({ where: { id: status.id } });

    if (!exists) {
      await UserStatus.create(status);
      console.log(`🟢 Estado "${status.name}" insertado`);
    } else {
      console.log(`⚠️ Estado "${status.name}" ya existe`);
    }
  }

  console.log('🌱 Estados de usuario insertados correctamente');
};


export default seedUserStatus;

