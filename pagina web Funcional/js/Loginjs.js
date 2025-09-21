// Obtener referencia al formulario y al contenedor de errores
const form = document.getElementById("formLogin");
const errores = document.getElementById("errores");

// Escuchar el evento 'submit' del formulario
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe automáticamente
    errores.textContent = ""; // Limpiar mensajes de error previos

    // Obtener valores de los campos de correo y contraseña, eliminando espacios extra
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();

    // Array para almacenar mensajes de error
    let mensajesError = [];

    // Validar formato de correo
    if (!correo.includes("@")) {
        mensajesError.push("Ingresa un correo electrónico válido.");
    }

    // Validar longitud mínima de contraseña
    if (password.length < 6) {
        mensajesError.push("La contraseña debe tener mínimo 6 caracteres.");
    }

    // Mostrar errores si los hay y detener el proceso
    if (mensajesError.length > 0) {
        errores.textContent = mensajesError.join(" | ");
        return;
    }

    // Recuperar usuario guardado en localStorage
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

    // Verificar si los datos ingresados coinciden con los guardados
    if (usuarioGuardado && usuarioGuardado.correo === correo && usuarioGuardado.password === password) {
        alert(`✅ Bienvenido, ${usuarioGuardado.nombre}!`);
        window.location.href = "Index.html"; // Redirigir al inicio
    } else {
        // Mostrar mensaje de error si correo o contraseña no coinciden
        errores.textContent = "Correo o contraseña incorrectos.";
    }
});


