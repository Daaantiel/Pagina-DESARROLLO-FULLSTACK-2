// Esperar a que todo el contenido de la página esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Obtener parámetros de la URL (para identificar el producto)
    const params = new URLSearchParams(window.location.search);
    const idProducto = params.get('id');

    // Seleccionar el contenedor donde se mostrará el detalle del producto
    const contenedorDetalle = document.querySelector("#contenedor-d");

    // Obtener lista de productos y carrito desde localStorage (si existe)
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Buscar el producto que coincide con el id de la URL
    const producto = productos.find(p => p.id == idProducto);

    if (producto) {
        // Crear un div para mostrar los detalles del producto
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

        // Escuchar el evento click del botón "Agregar al carrito"
        document.getElementById("btn-agregar").addEventListener("click", () => {
            // Verificar si el producto ya existe en el carrito
            const existe = carrito.find(p => p.id == producto.id);
            if (existe) {
                // Si existe, incrementar la cantidad
                existe.cantidad++;
            } else {
                // Si no existe, agregarlo con cantidad 1
                carrito.push({...producto, cantidad: 1});
            }
            // Guardar el carrito actualizado en localStorage
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarNumerito(); // Actualizar indicador de cantidad en el carrito
            alert(`${producto.titulo} se agregó al carrito`);
        });
    } else {
        // Mostrar mensaje si el producto no se encuentra
        contenedorDetalle.innerHTML = "<p>Producto no encontrado.</p>";
    }

    // Actualizar indicador de cantidad en el carrito al cargar la página
    actualizarNumerito();
});

// Función para actualizar el número de productos en el carrito
function actualizarNumerito() {
    const numerito = document.getElementById("numerito");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalCantidad = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    if (numerito) numerito.textContent = totalCantidad;
}
