-- Active: 1745884158569@@127.0.0.1@3306@db_asistencia
-- Tabla: Alumnos
CREATE TABLE usuarios (
    id_usurios INT AUTO_INCREMENT PRIMARY KEY,
    nombre_user VARCHAR(100) NOT NULL,
    contra_user VARCHAR(100) NOT NULL,
    nivel_user ENUM ("1","2","3") NOT NULL DEFAULT 3,
    estado_user ENUM ("activo", "inactivo") NOT NULL DEFAULT "activo"
);
-- Tabla de alumnos
CREATE TABLE alumnos (
    id_alumno INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    cedula VARCHAR(20) UNIQUE
);

-- Tabla: Clases (sesiones de clase)
CREATE TABLE clases (
    id_clase INT AUTO_INCREMENT PRIMARY KEY,
    num_curso INT NOT NULL,
    fecha DATE NOT NULL,
    descripcion VARCHAR(255)
)
-- Tabla: Asistencia

CREATE TABLE asistencia (
    id_asistencia INT AUTO_INCREMENT PRIMARY KEY,
    id_alumno INT,
    id_clase INT,
    estado ENUM('presente', 'ausente', 'justificado') NOT NULL,
    observaciones TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_alumno) REFERENCES alumnos(id_alumno) ON DELETE CASCADE,
    FOREIGN KEY (id_clase) REFERENCES clases(id_clase) ON DELETE CASCADE
);