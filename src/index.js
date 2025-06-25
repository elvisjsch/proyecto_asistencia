// src/index.js
import app from './app.js';
import {connectDB} from './db.js';

const PORT = process.env.PORT || 3000;

// Sincronizar modelos con la base de datos
    connectDB()
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });