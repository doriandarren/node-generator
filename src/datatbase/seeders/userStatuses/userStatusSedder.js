import RoleUser from "../../../models/RoleUser.js";
import { EnumRole } from "../../../enums/enumRole.js";
import { EnumUserStatus } from "../../../enums/enumUserStatuses.js";
import User from "../../../models/User.js";
import bcrypt from "bcryptjs";
import UserStatus from "../../../models/UserStatus.js";
import Role from "../../../models/Role.js";


export const seedUsers = async () => {

  const salt = bcrypt.genSaltSync();

  const usersToCreate = [
    {
      name: 'Dorian',
      email: 'doriandarren1@gmail.com',
      password: 'Splytin2024',
      role: EnumRole.ADMIN,
      image_url: 'https://i.pravatar.cc/150?img=2'
    },
    {
      name: 'Milena',
      email: 'darimile@gmail.com',
      password: 'Splytin2024',
      role: EnumRole.ADMIN,
      image_url: 'https://i.pravatar.cc/150?img=1'
    },
    {
      name: 'Dilan',
      email: 'dilandarren@gmail.com',
      password: 'Splytin2024',
      role: EnumRole.ADMIN,
      image_url: 'https://i.pravatar.cc/150?img=3'
    },
    {
      name: 'Dariana',
      email: 'dorianadamiled@gmail.com',
      password: 'Splytin2024',
      role: EnumRole.ADMIN,
      image_url: 'https://i.pravatar.cc/150?img=4'
    },
    {
      name: 'Max',
      email: 'max16506@gmail.com',
      password: 'Splytin2024',
      role: EnumRole.ADMIN,
      image_url: 'https://i.pravatar.cc/150?img=5'
    },
    {
      name: 'Manager',
      email: 'manager@splytin.com',
      password: 'Splytin2024',
      role: EnumRole.MANAGER,
      image_url: 'https://i.pravatar.cc/150?img=6'
    },
    {
      name: 'User',
      email: 'user@splytin.com',
      password: 'Splytin2024',
      role: EnumRole.USER,
      image_url: 'https://i.pravatar.cc/150?img=7'
    }

  ];

  const userStatus = await UserStatus.findOne({ where: { name: EnumUserStatus.STATUS_ACTIVE_NAME } });

  if (!userStatus) {
    console.error('❌ Estado de usuario ACTIVO no encontrado');
    return;
  }

  for (const item of usersToCreate) {
    // Crear o encontrar usuario
    let user = await User.findOne({ where: { email: item.email } });

    if (!user) {
      user = await User.create({
        name: item.name,
        email: item.email,
        password: bcrypt.hashSync(item.password, salt),
        email_verified_at: new Date(),
        image_url: item.image_url,
        remember_token: null,
        user_status_id: userStatus.id,
      });
      console.log(`🟢 Usuario "${item.email}" creado`);
    } else {
      console.log(`⚠️ Usuario "${item.email}" ya existe`);
    }

    // Buscar rol
    const role = await Role.findOne({ where: { name: item.role.toLowerCase() } });

    if (!role) {
      console.warn(`⚠️ Rol "${item.role}" no existe`);
      continue;
    }

    // Asignar rol si no lo tiene
    const hasRole = await RoleUser.findOne({
      where: { user_id: user.id, role_id: role.id }
    });

    if (!hasRole) {
      await RoleUser.create({ user_id: user.id, role_id: role.id });
      console.log(`✅ Rol "${item.role}" asignado a ${item.email}`);
    } else {
      console.log(`🔁 ${item.email} ya tiene el rol "${item.role}"`);
    }
  }

  console.log('🌱 Usuarios con roles insertados correctamente');

};
