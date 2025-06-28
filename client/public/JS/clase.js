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

// --- Fetch Data from Backend (Clases) ---
async function fetchClases() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Error al obtener las clases');
        return await res.json();
    } catch (error) {
        showMessage('No se pudo conectar con el servidor.');
        console.error(error);
        return [];
    }
}

async function createClase(clase) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clase),
    });

    if (!res.ok) throw new Error('Error al crear la clase');
    return await res.json();
}

async function updateClase(id, clase) {
    const res = await fetch(`${API_URL}${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clase),
    });

    if (!res.ok) throw new Error('Error al actualizar la clase');
    return await res.json();
}

async function deleteClase(id) {
    const res = await fetch(`${API_URL}${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) throw new Error('Error al eliminar la clase');
    return await res.json();
}

// --- Render Functions (Clases) ---
export async function renderClases() {
    const clases = await fetchClases();
    const tbody = document.getElementById('clases-table-body');
    tbody.innerHTML = '';

    clases.forEach(clase => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${clase.id_clase}</td>
            <td>${clase.num_curso}</td> <!-- ✅ Mostrar num_curso -->
            <td>${clase.fecha.split('T')[0]}</td>
            <td>${clase.descripcion}</td>
            <td>
                <button onclick="editClase(${clase.id_clase})" class="btn-edit px-3 py-1 rounded mr-2">Editar</button>
                <button onclick="deleteClaseConfirm(${clase.id_clase})" class="btn-delete px-3 py-1 rounded">Eliminar</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

// --- Form Handling (Clases) ---
document.getElementById('clase-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('clase-id').value;
    const numCurso = document.getElementById('clase-id-curso').value.trim(); // Campo que representa "num_curso"
    const fecha = document.getElementById('clase-fecha').value.trim();
    const descripcion = document.getElementById('clase-descripcion').value.trim();

    if (!numCurso || !fecha || !descripcion) {
        showMessage('Por favor completa todos los campos.');
        return;
    }

    const clase = { num_curso: numCurso, fecha, descripcion };

    try {
        if (id) {
            await updateClase(id, clase);
            showMessage('✅ Clase actualizada correctamente');
        } else {
            await createClase(clase);
            showMessage('✅ Clase creada correctamente');
        }
        document.getElementById('clase-form').reset();
        document.getElementById('clase-id').value = '';
        renderClases();
    } catch (error) {
        showMessage('❌ Error al guardar la clase');
        console.error(error);
    }
});

// --- Actions (Clases) ---
window.editClase = async (id) => {
    try {
        const res = await fetch(`${API_URL}${id}`);
        if (!res.ok) throw new Error('Error al obtener la clase');
        const clase = await res.json();

        document.getElementById('clase-id').value = clase.id_clase;
        document.getElementById('clase-id-curso').value = clase.num_curso; // ✅ Usamos num_curso
        document.getElementById('clase-fecha').value = clase.fecha.split('T')[0]; // Formato YYYY-MM-DD
        document.getElementById('clase-descripcion').value = clase.descripcion;
    } catch (error) {
        showMessage('❌ No se pudo cargar la clase para editar');
        console.error(error);
    }
};

window.deleteClaseConfirm = (id) => {
    showConfirm('¿Estás seguro de eliminar esta clase?', async (isConfirmed) => {
        if (isConfirmed) {
            try {
                await deleteClase(id);
                showMessage('🗑️ Clase eliminada correctamente');
                renderClases();
            } catch (error) {
                showMessage('❌ Error al eliminar la clase');
                console.error(error);
            }
        }
    });
};

// Inicialización automática
document.addEventListener('DOMContentLoaded', () => {
    const clasesSection = document.getElementById('section-clases');
    if (clasesSection && clasesSection.classList.contains('active')) {
        renderClases();
    }
});