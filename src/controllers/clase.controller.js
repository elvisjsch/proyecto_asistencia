// src/controllers/claseController.js
import { Clase } from '../models/relaciones.js';

// Registrar clase
export const registrarClase = async (req, res) => {
  const { num_curso, fecha, descripcion } = req.body;

  try {
    const nuevaClase = await Clase.create({ num_curso, fecha, descripcion });
    res.status(201).json({
      message: 'clase creada',

    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al registrar la clase' });
  }
};

// Obtener todas las clases
export const obtenerClases = async (req, res) => {
  try {
    const clases = await Clase.findAll();
    res.json(clases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener las clases' });
  }
};

// Obtener clase por ID
export const obtenerClasePorId = async (req, res) => {
  const { id } = req.params;
  try {
    const clase = await Clase.findByPk(id);
    if (!clase) return res.status(404).json({ msg: 'Clase no encontrada' });
    res.json(clase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener la clase' });
  }
};

// Actualizar clase
export const actualizarClase = async (req, res) => {
  const { id } = req.params;
  const { num_curso, fecha, descripcion } = req.body;

  try {
    const clase = await Clase.findByPk(id);
    if (!clase) return res.status(404).json({ msg: 'Clase no encontrada' });

    await clase.update({ num_curso, fecha, descripcion });
    res.json(clase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar la clase' });
  }
};

// Eliminar clase
export const eliminarClase = async (req, res) => {
  const { id } = req.params;

  try {
    const clase = await Clase.findByPk(id);
    if (!clase) return res.status(404).json({ msg: 'Clase no encontrada' });

    await clase.destroy();
    res.json({ msg: 'Clase eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar la clase' });
  }
};