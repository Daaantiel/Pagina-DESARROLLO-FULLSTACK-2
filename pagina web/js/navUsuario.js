document.addEventListener('DOMContentLoaded', () => {

    const usuarioNav = document.getElementById('usuario-nav');
    const iniciar = document.getElementById('iniciar');
    const registrar = document.getElementById('registrar');
    const cerrarSesion = document.getElementById('cerrar-sesion');
    const numerito = document.getElementById('numerito');


    const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    
    if (numerito) numerito.textContent = carrito.length;

    
    if (usuario) {
        if (usuarioNav) usuarioNav.textContent = `Hola, ${usuario.nombre}`;
        if (iniciar) iniciar.style.display = 'none';
        if (registrar) registrar.style.display = 'none';
        if (cerrarSesion) cerrarSesion.style.display = 'inline';
    } else {
        if (usuarioNav) usuarioNav.textContent = '';
        if (iniciar) iniciar.style.display = '';
        if (registrar) registrar.style.display = '';
        if (cerrarSesion) cerrarSesion.style.display = 'none';
    }


    if (cerrarSesion) {
        cerrarSesion.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('usuarioLogueado');
            window.location.reload();
        });
    }
});
