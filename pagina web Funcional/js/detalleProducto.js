document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const idProducto = params.get('id');
    const contenedorDetalle = document.querySelector("#contenedor-d");

    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const producto = productos.find(p => p.id == idProducto);

    if (producto) {
        const div = document.createElement("div");
        div.classList.add("producto-detalle");
        div.innerHTML = `
            <div class="contenedor-imagen-detalle">
                <img src="${producto.imagen}" alt="${producto.titulo}">
            </div>
            <div class="contenedor-detalle-p">
                <h2>${producto.titulo}</h2>
                <h2>$${producto.precio}</h2>
                <p>${producto.descripcion || ''}</p>
                <button id="btn-agregar">Agregar al carrito</button>
            </div>
        `;
        contenedorDetalle.append(div);

        document.getElementById("btn-agregar").addEventListener("click", () => {
            const existe = carrito.find(p => p.id == producto.id);
            if (existe) {
                existe.cantidad++;
            } else {
                carrito.push({...producto, cantidad: 1});
            }
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarNumerito();
            alert(`${producto.titulo} se agregó al carrito`);
        });
    } else {
        contenedorDetalle.innerHTML = "<p>Producto no encontrado.</p>";
    }

    actualizarNumerito();
});

function actualizarNumerito() {
    const numerito = document.getElementById("numerito");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalCantidad = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    if (numerito) numerito.textContent = totalCantidad;
}
