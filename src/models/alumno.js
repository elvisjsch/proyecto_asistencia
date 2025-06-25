// src/models/Alumno.js
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Alumno = sequelize.define('Alumno', {
  id_alumno: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_alumno'
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  apellido: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  cedula: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'alumnos',
  timestamps: false
});

export default Alumno;