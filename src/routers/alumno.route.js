// src/routes/alumnoRoutes.js
import express from 'express';
import {
  registrarAlumno,
  obtenerAlumnos,
  obtenerAlumnoPorId,
  actualizarAlumno,
  eliminarAlumno
} from '../controllers/alumno.controller.js';

const router = express.Router();

router.route('/alumno/')
  .post(registrarAlumno)
  .get(obtenerAlumnos);

router.route('/alumno/:id')
  .get(obtenerAlumnoPorId)
  .put(actualizarAlumno)
  .delete(eliminarAlumno);

export default router;