// Relaciones del modelo User
import User from './User.js';
import UserStatus from './UserStatus.js';
import RoleUser from './RoleUser.js';
import Role from './Role.js';
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
