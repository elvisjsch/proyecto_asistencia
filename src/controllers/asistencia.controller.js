// src/controllers/asistenciaController.js
import { Asistencia } from '../models/relaciones.js';

// Registrar asistencia
export const registrarAsistencia = async (req, res) => {
  const { id_alumno, id_clase, estado, observaciones } = req.body;

  try {
    const nuevaAsistencia = await Asistencia.create({
      id_alumno,
      id_clase,
      estado,
      observaciones
    });
    res.status(201).json({
        message: 'asistencia anotada'
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al registrar la asistencia' });
  }
};

// Obtener todas las asistencias
export const obtenerAsistencias = async (req, res) => {
  try {
    const asistencias = await Asistencia.findAll();
    res.json(asistencias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener las asistencias' });
  }
};

// Obtener por ID
export const obtenerAsistenciaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const asistencia = await Asistencia.findByPk(id);
    if (!asistencia) return res.status(404).json({ msg: 'Asistencia no encontrada' });
    res.json(asistencia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener la asistencia' });
  }
};

// Actualizar asistencia
export const actualizarAsistencia = async (req, res) => {
  const { id } = req.params;
  const { id_alumno, id_clase, estado, observaciones } = req.body;

  try {
    const asistencia = await Asistencia.findByPk(id);
    if (!asistencia) return res.status(404).json({ msg: 'Asistencia no encontrada' });

    await asistencia.update({ id_alumno, id_clase, estado, observaciones });
    res.json(asistencia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar la asistencia' });
  }
};

// Eliminar asistencia
export const eliminarAsistencia = async (req, res) => {
  const { id } = req.params;

  try {
    const asistencia = await Asistencia.findByPk(id);
    if (!asistencia) return res.status(404).json({ msg: 'Asistencia no encontrada' });

    await asistencia.destroy();
    res.json({ msg: 'Asistencia eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar la asistencia' });
  }
};