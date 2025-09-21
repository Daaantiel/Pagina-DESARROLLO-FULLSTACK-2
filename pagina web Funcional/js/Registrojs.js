// Obtener referencia al formulario de registro y al contenedor de errores
const form = document.getElementById("formRegistro");
const errores = document.getElementById("errores");

// Escuchar el evento 'submit' del formulario
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe automáticamente
    errores.textContent = ""; // Limpiar mensajes de error previos

    // Obtener valores de los campos del formulario y eliminar espacios extra
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmar = document.getElementById("confirmar").value.trim();

    // Array para almacenar mensajes de error
    let mensajesError = [];

    // Validar longitud mínima del nombre
    if (nombre.length < 3) {
        mensajesError.push("El nombre debe tener al menos 3 caracteres.");
    }

    // Validar formato de correo
    if (!correo.includes("@")) {
        mensajesError.push("Ingresa un correo electrónico válido.");
    }

    // Validar longitud mínima de la contraseña
    if (password.length < 6) {
        mensajesError.push("La contraseña debe tener mínimo 6 caracteres.");
    }

    // Validar que la contraseña y su confirmación coincidan
    if (password !== confirmar) {
        mensajesError.push("Las contraseñas no coinciden.");
    }

    // Mostrar errores si los hay y detener el proceso
    if (mensajesError.length > 0) {
        errores.textContent = mensajesError.join(" | ");
    } else {
        // Si no hay errores, crear el objeto usuario y guardarlo en localStorage
        const usuario = { nombre, correo, password };
        localStorage.setItem("usuario", JSON.stringify(usuario));

        // Mostrar mensaje de éxito, limpiar el formulario y redirigir al login
        alert("Te haz registrado con exito. Ahora puedes iniciar sesión.");
        form.reset();
        window.location.href = "NuevoLogin.html";
    }
});

