import { DataTypes } from 'sequelize';
import sequelize from '../database/settings/config.js';


const Country = sequelize.define('Country', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  common_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  iso_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  code_alpha_2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  code_alpha_3: {
    type: DataTypes.STRING,
    allowNull: true
  },
  numerical_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone_code: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'countries',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  paranoid: true
});


export default Country;
