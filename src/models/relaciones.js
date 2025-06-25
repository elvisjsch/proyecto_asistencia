// src/models/index.js
import Usuario from './usuario.js';
import Alumno from './alumno.js';
import Clase from './clase.js';
import Asistencia from './Asistencia.js';

// Definir relaciones (si es necesario)

// Relación Alumno - Asistencia
Alumno.hasMany(Asistencia, {
  foreignKey: 'id_alumno',
  as: 'asistencias'
});
Asistencia.belongsTo(Alumno, {
  foreignKey: 'id_alumno',
  as: 'alumno'
});

// Relación Clase - Asistencia
Clase.hasMany(Asistencia, {
  foreignKey: 'id_clase',
  as: 'asistencias'
});
Asistencia.belongsTo(Clase, {
  foreignKey: 'id_clase',
  as: 'clase'
});

export {
  Usuario,
  Alumno,
  Clase,
  Asistencia
};