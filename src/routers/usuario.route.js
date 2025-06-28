// src/routes/usuarioRoutes.js
import express from 'express';
import {
  registrarUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
} from '../controllers/usuario.controller.js';


const router = express.Router();
router.route('/usuario/')
  .post(registrarUsuario)
  .get(obtenerUsuarios);

router.route('/usuario/:id')
  .get(obtenerUsuarioPorId)
  .put(actualizarUsuario)
  .delete(eliminarUsuario);

export default router;