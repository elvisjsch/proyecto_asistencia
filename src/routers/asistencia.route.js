// src/routes/asistenciaRoutes.js
import express from 'express';
import {
  registrarAsistencia,
  obtenerAsistencias,
  obtenerAsistenciaPorId,
  actualizarAsistencia,
  eliminarAsistencia
} from '../controllers/asistencia.controller.js';

const router = express.Router();

router.route('/asistencia/')
  .post(registrarAsistencia)
  .get(obtenerAsistencias);

router.route('/asistencia/:id')
  .get(obtenerAsistenciaPorId)
  .put(actualizarAsistencia)
  .delete(eliminarAsistencia);

export default router;