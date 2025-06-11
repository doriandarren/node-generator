import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';


export const generateDatabase = async(fullPath) => {
    await createRoleSeeder(fullPath);
    await createUserSeeder(fullPath);
    await createUserStatuses(fullPath);
    await createConfig(fullPath);
}



const createRoleSeeder = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'database', 'seeders', 'roles');
    
    // File
    const filePath = path.join(folderPath, 'roleSeeder.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
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
      console.log(\`🟢 Rol "\${role.name}" creado\`);
    } else {
      console.log(\`⚠️ Rol "\${role.name}" ya existe\`);
    }
  }

  console.log('🌱 Roles insertados correctamente');
};

`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}


const createUserSeeder = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'database', 'seeders', 'users');
    
    // File
    const filePath = path.join(folderPath, 'userSeeder.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
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
      password: '${process.env.PASSWORD_DEFAULT}',
      role: EnumRole.ADMIN,
      image_url: 'https://i.pravatar.cc/150?img=2'
    },
    {
      name: 'Milena',
      email: 'darimile@gmail.com',
      password: '${process.env.PASSWORD_DEFAULT}',
      role: EnumRole.ADMIN,
      image_url: 'https://i.pravatar.cc/150?img=1'
    },
    {
      name: 'Dilan',
      email: 'dilandarren@gmail.com',
      password: '${process.env.PASSWORD_DEFAULT}',
      role: EnumRole.ADMIN,
      image_url: 'https://i.pravatar.cc/150?img=3'
    },
    {
      name: 'Dariana',
      email: 'dorianadamiled@gmail.com',
      password: '${process.env.PASSWORD_DEFAULT}',
      role: EnumRole.ADMIN,
      image_url: 'https://i.pravatar.cc/150?img=4'
    },
    {
      name: 'Max',
      email: 'max16506@gmail.com',
      password: '${process.env.PASSWORD_DEFAULT}',
      role: EnumRole.ADMIN,
      image_url: 'https://i.pravatar.cc/150?img=5'
    },
    {
      name: 'Manager',
      email: 'manager@splytin.com',
      password: '${process.env.PASSWORD_DEFAULT}',
      role: EnumRole.MANAGER,
      image_url: 'https://i.pravatar.cc/150?img=6'
    },
    {
      name: 'User',
      email: 'user@splytin.com',
      password: '${process.env.PASSWORD_DEFAULT}',
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
      console.log(\`🟢 Usuario "\${item.email}" creado\`);
    } else {
      console.log(\`⚠️ Usuario "\${item.email}" ya existe\`);
    }

    // Buscar rol
    const role = await Role.findOne({ where: { name: item.role.toLowerCase() } });

    if (!role) {
      console.warn(\`⚠️ Rol "\${item.role}" no existe\`);
      continue;
    }

    // Asignar rol si no lo tiene
    const hasRole = await RoleUser.findOne({
      where: { user_id: user.id, role_id: role.id }
    });

    if (!hasRole) {
      await RoleUser.create({ user_id: user.id, role_id: role.id });
      console.log(\`✅ Rol "\${item.role}" asignado a \${item.email}\`);
    } else {
      console.log(\`🔁 \${item.email} ya tiene el rol "\${item.role}"\`);
    }
  }

  console.log('🌱 Usuarios con roles insertados correctamente');

};


`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}


const createUserStatuses = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'database', 'seeders', 'userStatuses');
    
    // File
    const filePath = path.join(folderPath, 'userStatusSeeder.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import UserStatus from '../../../models/UserStatus.js';
import { EnumUserStatus } from '../../../enums/enumUserStatuses.js';

export const seedUserStatuses = async () => {
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
      console.log(\`🟢 Estado "\${status.name}" insertado\`);
    } else {
      console.log(\`⚠️ Estado "\${status.name}" ya existe\`);
    }
  }

  console.log('🌱 Estados de usuario insertados correctamente');
};

`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}


const createConfig = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'database', 'settings');
    
    // File
    const filePath = path.join(folderPath, 'config.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
    // database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

export default sequelize;
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}