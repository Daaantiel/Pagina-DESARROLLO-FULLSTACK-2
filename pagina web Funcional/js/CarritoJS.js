// ===========================================================
// Carrito de Compras - JavaScript
// ===========================================================

// Obtener productos del localStorage. Si no hay, se inicializa como un array vacío.
const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

// ===========================================================
// Selección de elementos del DOM
// ===========================================================
const carroVacio = document.querySelector("#carro-vacio"); // Contenedor que muestra "Carrito vacío"
const carroProductos = document.querySelector("#carro-productos"); // Contenedor donde se listan los productos
const carroOpciones = document.querySelector("#carro-opciones"); // Contenedor de botones "Vaciar carrito" y "Comprar"
const carroComprado = document.querySelector("#carro-comprado"); // Mensaje que se muestra al completar la compra
const botonVaciar = document.querySelector(".carro-acciones-v"); // Botón para vaciar el carrito
const botonComprar = document.querySelector(".carro-acciones-comprar"); // Botón para comprar el carrito
let botonEliminar = document.querySelectorAll(".carro-producto-eliminar"); // Botones individuales para eliminar un producto
const total = document.querySelector("#total"); // Elemento que muestra el total calculado del carrito

// ===========================================================
// Función para cargar y renderizar los productos en el carrito
// ===========================================================
function cargarProductosCarrito() {
    if (productosEnCarrito.length > 0) {
        // Si hay productos, mostrar carrito y opciones, ocultar mensajes de carrito vacío o compra realizada
        carroVacio.classList.add("disabled");
        carroProductos.classList.remove("disabled");
        carroOpciones.classList.remove("disabled");
        carroComprado.classList.add("disabled");

        // Limpiar contenedor de productos antes de renderizar
        carroProductos.innerHTML = "";

        // Crear dinámicamente cada producto
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carro-img" src="${producto.imagen}" alt="Imagen de ${producto.titulo}">
                <div class="carro-producto-titulo"><h3>${producto.titulo}</h3></div>
                <div class="carro-producto-cantidad"><small>Cantidad</small><p>${producto.cantidad}</p></div>
                <div class="carro-producto-precio"><small>Precio</small><p>$${producto.precio}</p></div>
                <div class="carro-producto-subtotal"><small>Subtotal</small><p>$${producto.precio * producto.cantidad}</p></div>
                <button id="${producto.id}" class="carro-producto-eliminar"><i class='bx bx-trash'></i></button>
            `;
            carroProductos.append(div); // Agregar producto al contenedor
        });
    } else {
        // Si no hay productos, mostrar mensaje de carrito vacío y ocultar otros elementos
        carroVacio.classList.remove("disabled");
        carroProductos.classList.add("disabled");
        carroOpciones.classList.add("disabled");
        carroComprado.classList.add("disabled");
    }

    // Actualizar los botones de eliminar y recalcular total
    actualizarBotonesEliminar();
    actualizarTotal();
}

// Inicializar carrito al cargar la página
cargarProductosCarrito();

// ===========================================================
// Función para actualizar los eventos de los botones eliminar
// ===========================================================
function actualizarBotonesEliminar() {
    botonEliminar = document.querySelectorAll(".carro-producto-eliminar");
    botonEliminar.forEach(boton => boton.addEventListener("click", eliminarDelCarrito));
}

// ===========================================================
// Función para eliminar un producto específico del carrito
// ===========================================================
function eliminarDelCarrito(e) {
    const idBoton = parseInt(e.currentTarget.id); // Obtener el id del producto a eliminar
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton); // Encontrar índice en el array

    if (index !== -1) {
        productosEnCarrito.splice(index, 1); // Eliminar producto del array
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); // Guardar cambios en localStorage
        cargarProductosCarrito(); // Volver a renderizar carrito
    }
}

// ===========================================================
// Vaciar carrito completo
// ===========================================================
botonVaciar.addEventListener("click", () => {
    if (confirm("¿Seguro que quieres vaciar el carrito?")) {
        productosEnCarrito.length = 0; // Vaciar array
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); // Actualizar storage
        cargarProductosCarrito(); // Actualizar vista
    }
});

// ===========================================================
// Función para actualizar el total del carrito
// ===========================================================
function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce(
        (acc, producto) => acc + (producto.precio * producto.cantidad),
        0
    );
    total.innerText = `$${totalCalculado}`;
}

// ===========================================================
// Función para completar la compra
// ===========================================================
botonComprar.addEventListener("click", () => {
    productosEnCarrito.length = 0; // Vaciar array
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); // Guardar cambios en storage

    // Actualizar vista mostrando mensaje de compra y ocultando carrito y opciones
    carroVacio.classList.add("disabled");
    carroProductos.classList.add("disabled");
    carroOpciones.classList.add("disabled");
    carroComprado.classList.remove("disabled");
});

