// src/app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import usuarioRoutes from './routers/usuario.route.js';
import alumnoRoutes from './routers/alumno.route.js';
import claseRoutes from './routers/clase.route.js';
import asistenciaRoutes from './routers/asistencia.route.js';
const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api', usuarioRoutes);
app.use('/api', alumnoRoutes);
app.use('/api', claseRoutes);
app.use('/api', asistenciaRoutes);
// Ruta de prueba
// app.get('/', (req, res) => {
//   res.json({ message: 'Backend funcionando correctamente' });
// });

export default app;