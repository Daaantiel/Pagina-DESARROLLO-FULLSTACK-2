// Esperar a que todo el contenido de la página se cargue
document.addEventListener('DOMContentLoaded', () => {

    // Seleccionar elementos del DOM que muestran información del usuario y botones de sesión
    const usuarioNav = document.getElementById('usuario-nav'); // Muestra "Hola, [nombre]"
    const iniciar = document.getElementById('iniciar'); // Botón de iniciar sesión
    const registrar = document.getElementById('registrar'); // Botón de registro
    const cerrarSesion = document.getElementById('cerrar-sesion'); // Botón de cerrar sesión
    const numerito = document.getElementById('numerito'); // Indicador de cantidad de productos en carrito

    // Obtener usuario logueado y carrito desde localStorage
    const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Actualizar numerito del carrito si existe
    if (numerito) numerito.textContent = carrito.length;

    // Configurar la vista según si hay un usuario logueado
    if (usuario) {
        // Mostrar nombre del usuario y ocultar botones de iniciar/registrar
        if (usuarioNav) usuarioNav.textContent = `Hola, ${usuario.nombre}`;
        if (iniciar) iniciar.style.display = 'none';
        if (registrar) registrar.style.display = 'none';
        if (cerrarSesion) cerrarSesion.style.display = 'inline';
    } else {
        // No hay usuario logueado: ocultar nombre y mostrar botones de iniciar/registrar
        if (usuarioNav) usuarioNav.textContent = '';
        if (iniciar) iniciar.style.display = '';
        if (registrar) registrar.style.display = '';
        if (cerrarSesion) cerrarSesion.style.display = 'none';
    }

    // Evento para cerrar sesión
    if (cerrarSesion) {
        cerrarSesion.addEventListener('click', (e) => {
            e.preventDefault(); // Evitar comportamiento por defecto del enlace
            localStorage.removeItem('usuarioLogueado'); // Eliminar usuario de localStorage
            window.location.reload(); // Recargar la página para actualizar la vista
        });
    }
});
