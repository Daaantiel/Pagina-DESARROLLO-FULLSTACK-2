const form = document.getElementById("formRegistro");
const errores = document.getElementById("errores");

form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    errores.textContent = "";

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmar = document.getElementById("confirmar").value.trim();

    let mensajesError = [];

    if (nombre.length < 3) {
        mensajesError.push("El nombre debe tener al menos 3 caracteres.");
    }

    if (!correo.includes("@")) {
        mensajesError.push("Ingresa un correo electrónico válido.");
    }

    if (password.length < 6) {
        mensajesError.push("La contraseña debe tener mínimo 6 caracteres.");
    }

    if (password !== confirmar) {
        mensajesError.push("Las contraseñas no coinciden.");
    }

    if (mensajesError.length > 0) {
        errores.textContent = mensajesError.join(" | ");
    } else {
        
        const usuario = { nombre, correo, password };
        localStorage.setItem("usuario", JSON.stringify(usuario));

        alert("Te haz registrado con exito. Ahora puedes iniciar sesión.");
        form.reset();
        window.location.href = "NuevoLogin.html"; 
    }
});
