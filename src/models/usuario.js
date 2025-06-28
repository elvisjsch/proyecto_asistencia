// src/models/Usuario.js
import { DataTypes } from 'sequelize';
import {sequelize} from '../db.js';

const Usuario = sequelize.define('Usuario', {
  id_usurios: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_usurios'
  },
  nombre_user: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'nombre_user'
  },
  contra_user: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'contra_user'
  },
  nivel_user: {
    type: DataTypes.ENUM(['1', '2', '3']),
    allowNull: false,
    defaultValue: '3',
    field: 'nivel_user'
  },
  estado_user: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    allowNull: false,
    defaultValue: 'activo',
    field: 'estado_user'
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

export default Usuario;