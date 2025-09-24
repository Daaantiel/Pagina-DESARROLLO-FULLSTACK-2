const form = document.getElementById("formLogin");
const errores = document.getElementById("errores");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    errores.textContent = "";

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();

    let mensajesError = [];

    if (!correo.includes("@")) {
        mensajesError.push("Ingresa un correo electrónico válido.");
    }

    if (password.length < 6) {
        mensajesError.push("La contraseña debe tener mínimo 6 caracteres.");
    }

    if (mensajesError.length > 0) {
        errores.textContent = mensajesError.join(" | ");
        return;
    }


    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

    if (usuarioGuardado && usuarioGuardado.correo === correo && usuarioGuardado.password === password) {
        alert(`✅ Bienvenido, ${usuarioGuardado.nombre}!`);
        if (correo.includes('admin')) {
            window.location.href = "administrador.html";
        } else {
            window.location.href = "Index.html";
        }
    } else {
        errores.textContent = "Correo o contraseña incorrectos.";
    }
});
