// src/controllers/alumnoController.js
import { Alumno } from '../models/relaciones.js';

// Registrar alumno
export const registrarAlumno = async (req, res) => {
  const { nombre, apellido, cedula } = req.body;

  try {
    const existeAlumno = await Alumno.findOne({ where: { cedula } });
    if (existeAlumno) {
      return res.status(400).json({ msg: 'El alumno ya está registrado' });
    }

    const nuevoAlumno = await Alumno.create({ nombre, apellido, cedula });
    res.status(201).json({
      message: 'alumno agregado',
      alumno: nombre + apellido,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al registrar el alumno' });
  }
};

// Obtener todos los alumnos
export const obtenerAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.findAll();
    res.json(alumnos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener los alumnos' });
  }
};

// Obtener por ID
export const obtenerAlumnoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const alumno = await Alumno.findByPk(id);
    if (!alumno) return res.status(404).json({ msg: 'Alumno no encontrado' });
    res.json(alumno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener el alumno' });
  }
};

// Actualizar alumno
export const actualizarAlumno = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, cedula } = req.body;

  try {
    const alumno = await Alumno.findByPk(id);
    if (!alumno) return res.status(404).json({ msg: 'Alumno no encontrado' });

    await alumno.update({ nombre, apellido, cedula });
    res.json(alumno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar el alumno' });
  }
};

// Eliminar alumno
export const eliminarAlumno = async (req, res) => {
  const { id } = req.params;

  try {
    const alumno = await Alumno.findByPk(id);
    if (!alumno) return res.status(404).json({ msg: 'Alumno no encontrado' });

    await alumno.destroy();
    res.json({ msg: 'Alumno eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar el alumno' });
  }
};