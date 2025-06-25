import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Objeto con todas las configuraciones
const config = {
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    name: process.env.DB_NAME,
  },
  index: {
    port: parseInt(process.env.PORT, 10) || 4000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default_secret_key',
  },
};

export default config;