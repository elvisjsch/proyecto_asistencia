// URL base del backend
const API_URL = 'http://localhost:4000/api/clase/';

// --- Utility Functions ---
function showMessage(message) {
    const modal = document.getElementById('message-modal');
    const text = document.getElementById('message-modal-text');
    text.textContent = message;
    modal.style.display = 'flex';

    // Cerrar automáticamente después de 3 segundos
    setTimeout(() => {
        modal.style.display = 'none';
    }, 3000);
}

window.confirmModalCallback = null;

window.showConfirm = function (message, callback) {
    const modal = document.getElementById('confirm-modal');
    const text = document.getElementById('confirm-modal-text');
    text.textContent = message;
    confirmModalCallback = (result) => {
        callback(result);
        modal.style.display = 'none';
    };
    modal.style.display = 'flex';
};

window.closeModal = function (id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'none';
    }
};

// --- Fetch Data from Backend (Asistencia) ---
async function fetchAsistencia() {
    try {
        const res = await fetch('http://localhost:4000/api/asistencia/');
        if (!res.ok) throw new Error('Error al obtener las asistencias');
        return await res.json();
    } catch (error) {
        showMessage('No se pudo conectar con el servidor.');
        console.error(error);
        return [];
    }
}

async function createAsistencia(asistencia) {
    const res = await fetch('http://localhost:4000/api/asistencia/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(asistencia),
    });
    if (!res.ok) throw new Error('Error al crear la asistencia');
    return await res.json();
}

async function updateAsistencia(id, asistencia) {
    const res = await fetch(`http://localhost:4000/api/asistencia/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(asistencia),
    });
    if (!res.ok) throw new Error('Error al actualizar la asistencia');
    return await res.json();
}

async function deleteAsistencia(id) {
    const res = await fetch(`http://localhost:4000/api/asistencia/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar la asistencia');
    return await res.json();
}

// --- Render Functions (Asistencia) ---
export async function renderAsistencia() {
    const asistencias = await fetchAsistencia();
    const tbody = document.getElementById('asistencia-table-body');
    tbody.innerHTML = '';
    console.log(asistencias)
    asistencias.forEach(asis => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${asis.id_asistencia}</td>
            <td>${asis.alumno ? `${asis.alumno.nombre} ${asis.alumno.apellido}` : 'Sin alumno'}</td>
            <td>${asis.clase ? asis.clase.descripcion : 'Sin clase'}</td>
            <td>${asis.estado}</td>
            <td>${asis.observaciones || '-'}</td>
            <td>${new Date(asis.fecha_registro).toLocaleString()}</td>
            <td>
                <button onclick="editAsistencia(${asis.id_asistencia})" class="btn-edit px-3 py-1 rounded mr-2">Editar</button>
                <button onclick="deleteAsistenciaConfirm(${asis.id_asistencia})" class="btn-delete px-3 py-1 rounded">Eliminar</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

async function getClase(id, clase) {
    const res = await fetch(`http://localhost:4000/api/asistencia/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clase),
    });

    if (!res.ok) throw new Error('Error al actualizar la clase');
    return await res.json();
}

// --- Form Handling (Asistencia) ---
document.getElementById('asistencia-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('asistencia-id').value;
    const idAlumno = document.getElementById('asistencia-id-alumno').value.trim();
    const idClase = document.getElementById('asistencia-id-clase').value.trim();
    const estado = document.getElementById('asistencia-estado').value;
    const observaciones = document.getElementById('asistencia-observaciones').value.trim();

    if (!idAlumno || !idClase || !estado) {
        showMessage('Por favor completa los campos obligatorios.');
        return;
    }

    const asistencia = {
        id_alumno: idAlumno,
        id_clase: idClase,
        estado,
        observaciones
    };

    try {
        if (id) {
            await updateAsistencia(id, asistencia);
            showMessage('✅ Asistencia actualizada correctamente');
        } else {
            await createAsistencia(asistencia);
            showMessage('✅ Asistencia creada correctamente');
        }
        document.getElementById('asistencia-form').reset();
        document.getElementById('asistencia-id').value = '';
        renderAsistencia();
    } catch (error) {
        showMessage('❌ Error al guardar la asistencia');
        console.error(error);
    }
});

// --- Actions (Asistencia) ---
window.editAsistencia = async (id) => {
    try {
        const res = await fetch(`http://localhost:4000/api/asistencia/${id}`);
        if (!res.ok) throw new Error('Error al obtener la asistencia');
        const asis = await res.json();

        document.getElementById('asistencia-id').value = asis.id_asistencia;
        document.getElementById('asistencia-id-alumno').value = asis.id_alumno;
        document.getElementById('asistencia-id-clase').value = asis.id_clase;
        document.getElementById('asistencia-estado').value = asis.estado;
        document.getElementById('asistencia-observaciones').value = asis.observaciones;
    } catch (error) {
        showMessage('❌ No se pudo cargar la asistencia para editar');
        console.error(error);
    }
};

window.deleteAsistenciaConfirm = (id) => {
    showConfirm('¿Estás seguro de eliminar esta asistencia?', async (isConfirmed) => {
        if (isConfirmed) {
            try {
                await deleteAsistencia(id);
                showMessage('🗑️ Asistencia eliminada correctamente');
                renderAsistencia();
            } catch (error) {
                showMessage('❌ Error al eliminar la asistencia');
                console.error(error);
            }
        }
    });
};

// --- Populate Selects for Asistencia Form ---
export async function populateAsistenciaSelects() {
    const alumnosRes = await fetch('http://localhost:4000/api/alumno/');
    const alumnos = await alumnosRes.json(); // ✅ Aquí conviertes la respuesta en JSON

    const clasesRes = await fetch('http://localhost:4000/api/clase/');
    const clases = await clasesRes.json();

    const selectAlumno = document.getElementById('asistencia-id-alumno');
    const selectClase = document.getElementById('asistencia-id-clase');

    selectAlumno.innerHTML = '<option value="">Selecciona un alumno</option>';
    selectClase.innerHTML = '<option value="">Selecciona una clase</option>';

    alumnos.forEach(alumno => {
        const option = document.createElement('option');
        option.value = alumno.id_alumno;
        option.textContent = `${alumno.nombre} ${alumno.apellido}`;
        selectAlumno.appendChild(option);
    });

    clases.forEach(clase => {
        const option = document.createElement('option');
        option.value = clase.id_clase;
        option.textContent = `${clase.descripcion} (${clase.fecha.split('T')[0]})`;
        selectClase.appendChild(option);
    });
}