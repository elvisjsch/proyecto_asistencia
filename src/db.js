import { Sequelize } from 'sequelize';
import config from './config.js';

// Desestructurar la configuración de la base de datos
const { user, password, host, port, name } = config.db;

// Creando instancia de Sequelize
const sequelize = new Sequelize(name, user, password, {
  host,
  port,
  dialect: 'mysql',
  logging: false, // Desactiva los logs de Sequelize
});

// Verificar conexión
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión exitosa a la base de datos.');
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error.message);
    process.exit(1); // Detener la app si falla la conexión
  }
};

export { sequelize, connectDB };