// src/models/Clase.js
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Clase = sequelize.define('Clase', {
  id_clase: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_clase'
  },
  num_curso: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'clases',
  timestamps: false
});

export default Clase;