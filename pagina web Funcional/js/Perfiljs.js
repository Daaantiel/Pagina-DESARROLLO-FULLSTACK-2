const bienvenida = document.getElementById("bienvenida");
const btnCerrar = document.getElementById("cerrarSesion");


const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

if (usuarioGuardado) {
    bienvenida.textContent = `👋 Bienvenido/a, ${usuarioGuardado.nombre}`;
} else {

    window.location.href = "inicioSesion.html";
}

btnCerrar.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    alert("Sesión cerrada. Hasta pronto 👋");
    window.location.href = "inicioSesion.html";
});