// src/routes/claseRoutes.js
import express from 'express';
import {
  registrarClase,
  obtenerClases,
  obtenerClasePorId,
  actualizarClase,
  eliminarClase
} from '../controllers/clase.controller.js';

const router = express.Router();

router.route('/clase/')
  .post(registrarClase)
  .get(obtenerClases);

router.route('/clase/:id')
  .get(obtenerClasePorId)
  .put(actualizarClase)
  .delete(eliminarClase);

export default router;