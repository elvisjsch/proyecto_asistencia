// src/controllers/usuarioController.js
import { Usuario } from '../models/relaciones.js';
import bcrypt from 'bcryptjs';

// 1. Registrar un nuevo usuario
export const registrarUsuario = async (req, res) => {
  const { nombre_user, contra_user, nivel_user } = req.body;

  try {
  // Verificar si el usuario ya existe
    const existeUsuario = await Usuario.findOne({
      where: { nombre_user}
    });

    if (existeUsuario) {
      return res.status(400).json({ msg: 'El nombre de usuario ya está en uso' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contra_user, salt);

    // Crear usuario
    const nuevoUsuario = await Usuario.create({
      nombre_user,
      contra_user: hashedPassword,
      nivel_user
    });

    res.status(201).json({
      message: 'usuario creado',
      nombre_user: nombre_user}
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al registrar el usuario' });
  }
};

// 2. Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener los usuarios' });
  }
};

// 3. Obtener usuario por ID
export const obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener el usuario' });
  }
};

// 4. Actualizar usuario
export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre_user, contra_user, nivel_user, estado_user } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    let hashedPassword = usuario.contra_user; // Mantener contraseña actual si no se envía nueva
    if (contra_user) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(contra_user, salt);
    }

    await usuario.update({
      nombre_user,
      contra_user: hashedPassword,
      nivel_user,
      estado_user
    });

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar el usuario' });
  }
};

// 5. Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    await usuario.destroy();

    res.json({ msg: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar el usuario' });
  }
};