import {renderClases} from './clase.js';
import {populateAsistenciaSelects, renderAsistencia} from './asistencia.js';
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and sections
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));

        // Add active class to clicked tab and corresponding section
        tab.classList.add('active');
        const sectionId = tab.id.replace('tab-', 'section-');
        document.getElementById(sectionId).classList.add('active');

        // Refresh tables and selects when switching tabs
        // renderAlumnos();
        renderClases();
        renderAsistencia();
        populateAsistenciaSelects();
    });
});

document.getElementById('logout-button').addEventListener('click', function () {
    // Limpiar todo el localStorage
    localStorage.clear();

    // Opcional: mostrar mensaje de confirmación o usar un modal

    // Redirigir al login o index
    window.location.href = 'login.html'; // Cambia por 'login.html' si es necesario
});