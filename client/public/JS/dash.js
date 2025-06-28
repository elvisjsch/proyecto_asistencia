// URL base del backend
const API_URL = 'http://localhost:4000/api/alumno';

// --- Utility Functions ---
function showMessage(message) {
    const modal = document.getElementById('message-modal');
    const text = document.getElementById('message-modal-text');
    text.textContent = message;
    modal.style.display = 'flex';
}

let confirmModalCallback = null;

window.showConfirm = function showConfirm(message, callback) {
    const modal = document.getElementById('confirm-modal');
    const text = document.getElementById('confirm-modal-text');
    text.textContent = message;
    confirmModalCallback = (result) => {
        callback(result);
        modal.style.display = 'none';
    };
    modal.style.display = 'flex';
}

window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'none';
    }
};

// --- Tab Navigation ---
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and sections
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
        // Add active class to clicked tab and corresponding section
        tab.classList.add('active');
        const sectionId = tab.id.replace('tab-', 'section-');
        document.getElementById(sectionId).classList.add('active');

        // Solo cargar datos cuando se cambia a la sección de alumnos
        if (sectionId === 'section-alumnos') {
            renderAlumnos();
        }
    });
});

// --- Fetch Data from Backend ---
async function fetchAlumnos() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Error al obtener los alumnos');
        return await res.json();
    } catch (error) {
        showMessage('No se pudo conectar con el servidor.');
        console.error(error);
        return [];
    }
}

async function createAlumno(alumno) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alumno),
    });
    if (!res.ok) throw new Error('Error al crear el alumno');
    return await res.json();
}

async function updateAlumno(id, alumno) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alumno),
    });
    if (!res.ok) throw new Error('Error al actualizar el alumno');
    return await res.json();
}

async function deleteAlumno(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar el alumno');
    return await res.json();
}

// --- Render Functions ---
async function renderAlumnos() {
    const alumnos = await fetchAlumnos();
    const tbody = document.getElementById('alumnos-table-body');
    tbody.innerHTML = '';

    alumnos.forEach(alumno => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${alumno.id_alumno}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.cedula}</td>
            <td>
                <button onclick="editAlumno(${alumno.id_alumno})" class="btn-edit px-3 py-1 rounded mr-2">Editar</button>
                <button onclick="deleteAlumnoConfirm(${alumno.id_alumno})" class="btn-delete px-3 py-1 rounded">Eliminar</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

// --- Form Handling ---
document.getElementById('alumno-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('alumno-id').value;
    const nombre = document.getElementById('alumno-nombre').value.trim();
    const apellido = document.getElementById('alumno-apellido').value.trim();
    const cedula = document.getElementById('alumno-cedula').value.trim();

    if (!nombre || !apellido || !cedula) {
        showMessage('Por favor completa todos los campos.');
        return;
    }

    const alumno = { nombre, apellido, cedula };

    try {
        if (id) {
            await updateAlumno(id, alumno);
            showMessage('✅ Alumno actualizado correctamente');
        } else {
            await createAlumno(alumno);
            showMessage('✅ Alumno creado correctamente');
        }
        document.getElementById('alumno-form').reset();
        document.getElementById('alumno-id').value = '';
        renderAlumnos();
    } catch (error) {
        showMessage('❌ Error al guardar el alumno');
        console.error(error);
    }
});

// --- Actions ---
window.editAlumno = async (id) => {
    try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error('Error al obtener el alumno');
        const alumno = await res.json();

        document.getElementById('alumno-id').value = alumno.id_alumno;
        document.getElementById('alumno-nombre').value = alumno.nombre;
        document.getElementById('alumno-apellido').value = alumno.apellido;
        document.getElementById('alumno-cedula').value = alumno.cedula;
    } catch (error) {
        showMessage('❌ No se pudo cargar el alumno para editar');
        console.error(error);
    }
};

window.deleteAlumnoConfirm = (id) => {
    showConfirm('¿Estás seguro de eliminar este alumno?', async (isConfirmed) => {
        if (isConfirmed) {
            try {
                await deleteAlumno(id);
                showMessage('🗑️ Alumno eliminado correctamente');
                renderAlumnos();
            } catch (error) {
                showMessage('❌ Error al eliminar el alumno');
                console.error(error);
            }
        }
    });
};

// Inicialización automática
document.addEventListener('DOMContentLoaded', () => {
    const alumnosSection = document.getElementById('section-alumnos');
    if (alumnosSection.classList.contains('active')) {
        renderAlumnos();
    }
});