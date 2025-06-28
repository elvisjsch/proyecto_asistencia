// src/models/Asistencia.js
import { DataTypes } from 'sequelize';
import {sequelize} from '../db.js';

const Asistencia = sequelize.define('Asistencia', {
  id_asistencia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_asistencia'
  },
  id_alumno: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_alumno'
  },
  id_clase: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_clase'
  },
  estado: {
    type: DataTypes.ENUM('presente', 'ausente', 'justificado'),
    allowNull: false
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fecha_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'fecha_registro'
  }
}, {
  tableName: 'asistencia',
  timestamps: false
});

export default Asistencia;