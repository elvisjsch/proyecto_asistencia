// URL base del backend para login
const API_URL = 'http://localhost:4000/api/usuario/';

// --- Utility Functions ---

// Mostrar mensaje en modal
function showMessage(message) {
    const modal = document.getElementById('message-modal');
    const text = document.getElementById('message-modal-text');

    if (!modal || !text) return;

    text.textContent = message;
    modal.style.display = 'flex';

    // Cerrar automáticamente después de 3 segundos
    setTimeout(() => {
        modal.style.display = 'none';
    }, 3000);
}

// Mostrar modal de confirmación
window.confirmModalCallback = null;

window.showConfirm = function (message, callback) {
    const modal = document.getElementById('confirm-modal');
    const text = document.getElementById('confirm-modal-text');

    if (!modal || !text) return;

    text.textContent = message;

    confirmModalCallback = (result) => {
        if (typeof callback === 'function') {
            callback(result);
        }
        modal.style.display = 'none';
    };

    modal.style.display = 'flex';
};

// Cerrar cualquier modal
window.closeModal = function (id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'none';
    }
};

// --- Función de Login ---
window.loginUsuario = async () => {
    const nombre_user = document.getElementById('login-nombre')?.value.trim();
    const contra_user = document.getElementById('login-password')?.value.trim();

    if (!nombre_user || !contra_user) {
        showMessage('Por favor completa ambos campos.');
        return;
    }

    try {
        const res = await fetch(`${API_URL}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre_user, contra_user })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.msg || 'Credenciales incorrectas');
        }else{
            showMessage("Tidi bien");
        }

        // Guardar datos del usuario en localStorage
        localStorage.setItem('usuario', JSON.stringify(data.usuario));

        // Mostrar mensaje de éxito
        showMessage(`✅ Bienvenido, ${data.usuario.nombre_user}`);
        window.location.replace('../dashboard.html')
    } catch (error) {
        console.error('Error en login:', error.message);
        showMessage('❌ Usuario o contraseña incorrectos');
    }
};

// --- Inicialización automática ---
document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.querySelector('.login-card');
    const dashboard = document.querySelector('.dashboard-container');

    if (!loginSection && !dashboard) return;

    const storedUser = localStorage.getItem('usuario');

    if (storedUser) {
        // Ya hay sesión iniciada → ir directamente al dashboard
        window.location.href = './dashboard.html';
    } else {
        // No hay sesión → mostrar login
        if (loginSection) loginSection.style.display = 'block';
        if (dashboard) dashboard.style.display = 'none';
    }

});