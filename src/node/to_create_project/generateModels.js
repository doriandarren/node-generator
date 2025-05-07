import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';


export const generateModels = async(fullPath) => {
  await createAbility(fullPath);
  await createAbilityGroup(fullPath);
  await createAbilityUser(fullPath);
  await createInitAssociations(fullPath);
  await createRole(fullPath);
  await createRoleUser(fullPath);
  await createUser(fullPath);
  await createUserSession(fullPath);
  await createUserStatus(fullPath);
}


const createAbility = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'models');
    
    // File
    const filePath = path.join(folderPath, 'Ability.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { DataTypes } from 'sequelize';
import sequelize from '../database/settings/config.js';


const Ability = sequelize.define('Ability', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  label: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ability_group_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  }
}, {
  tableName: 'abilities',
  timestamps: true,
  paranoid: true
});



export default Ability;

`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}


const createAbilityGroup = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'models');
    
    // File
    const filePath = path.join(folderPath, 'AbilityGroup.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { DataTypes } from 'sequelize';
import sequelize from '../database/settings/config.js';

const AbilityGroup = sequelize.define('AbilityGroup', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED, // ¡clave!
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'ability_groups',
  timestamps: true,
  paranoid: true, // 👈 Soft deletes (elimina con deletedAt)
});

export default AbilityGroup;

`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}


const createAbilityUser = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'models');
    
    // File
    const filePath = path.join(folderPath, '');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { DataTypes } from 'sequelize';
import sequelize from '../database/settings/config.js';



const AbilityUser = sequelize.define('AbilityUser', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  ability_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  }
}, {
  tableName: 'ability_user',
  timestamps: true,
  paranoid: true
});


export default AbilityUser;

`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}


const createInitAssociations = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'models');
    
    // File
    const filePath = path.join(folderPath, 'initAssociations.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
// Relaciones del modelo User
import User from './User.js';
import UserStatus from './UserStatus.js';
import RoleUser from './RoleUser.js';
import Role from './Role.js';
import UserSession from './UserSession.js';
import Ability from './Ability.js';
import AbilityUser from './AbilityUser.js';
import AbilityGroup from './AbilityGroup.js';

User.belongsTo(UserStatus, {
  foreignKey: 'user_status_id',
  as: 'status',
  onDelete: 'CASCADE'
});


User.hasMany(RoleUser, {
  foreignKey: 'user_id',
  as: 'role_user'
});


User.hasMany(UserSession, {
  foreignKey: 'user_id',
  as: 'sessions'
});


User.belongsToMany(Role, {
  through: RoleUser,
  foreignKey: 'user_id',
  otherKey: 'role_id',
  as: 'roles'
});

Role.belongsToMany(User, {
  through: RoleUser,
  foreignKey: 'role_id',
  otherKey: 'user_id',
  as: 'users'
});



User.belongsToMany(Ability, {
  through: AbilityUser,
  foreignKey: 'user_id',
  otherKey: 'ablity_id',
  as: 'ability'
});


Role.belongsTo(RoleUser, {
  foreignKey: 'role_id',
  as: 'role_users',
  onDelete: 'CASCADE'
});


Ability.belongsTo(AbilityUser, {
  foreignKey: 'ability_id',
  as: 'ability_users',
  onDelete: 'CASCADE'
});


AbilityGroup.belongsTo(Ability, {
  foreignKey: 'ability_group_id',
  as: 'abilities',
  onDelete: 'CASCADE'
});
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}


const createRole = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'models');
    
    // File
    const filePath = path.join(folderPath, 'Role.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { DataTypes } from 'sequelize';
import sequelize from '../database/settings/config.js';

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'roles',
  timestamps: true,
  paranoid: true
});




export default Role;
  
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}


const createRoleUser = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'models');
    
    // File
    const filePath = path.join(folderPath, 'RoleUser.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { DataTypes } from 'sequelize';
import sequelize from '../database/settings/config.js';


const RoleUser = sequelize.define('RoleUser', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  role_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  }
}, {
  tableName: 'role_user',
  timestamps: true,
  paranoid: true
});


export default RoleUser;

`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}

const createUser = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'models');
    
    // File
    const filePath = path.join(folderPath, 'User.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { DataTypes } from 'sequelize';
import sequelize from '../database/settings/config.js';


const User = sequelize.define('User', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  user_status_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email_verified_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  is_edited: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true
  },
  is_google: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  remember_token: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: true,
  paranoid: true // Soft deletes
});



User.prototype.toJSON = function() {
  
  const values = { ...this.get() };

  delete values.password;
  delete values.remember_token;

  return values;
}


export default User;

`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}


const createUserSession = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'models');
    
    // File
    const filePath = path.join(folderPath, 'UserSession.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { DataTypes } from 'sequelize';
import sequelize from '../database/settings/config.js';

const UserSession = sequelize.define('UserSession', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ip_address: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  user_agent: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  last_activity: {
    type: DataTypes.DATE,
    allowNull: true
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'user_sessions',
  timestamps: true,
  paranoid: true
});


export default UserSession;

`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}


const createUserStatus = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'models');
    
    // File
    const filePath = path.join(folderPath, 'UserStatus.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { DataTypes } from 'sequelize';
import sequelize from '../database/settings/config.js';

const UserStatus = sequelize.define('UserStatus', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
}, {
  tableName: 'user_statuses',
  timestamps: true,
  paranoid: true, // soft deletes
});

export default UserStatus;

`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}