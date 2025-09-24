/*Listado de productos destacados*/

const productos = [
    {
        id:1,
        titulo: "Torta Circula Grande de Pistacho",
        imagen : "../pagina web/IMG/TortaCircular1.jpg",
        forma : "Circulares",
        tamanio : "Grande",
        precio : 18200,
        descripcion: "Deliciosa torta de pistacho con capas de bizcocho esponjoso y crema suave, decorada con trozos de pistacho y un toque de chocolate blanco."
    },
    {
        id:2,
        titulo: "Torta Circula Grande de Arandano",
        imagen : "../pagina web/IMG/TortaCircular2.jpg",
        forma : "Circulares",
        tamanio :"Grande",
        precio : 15500,
        descripcion: "Exquisita torta de arándanos frescos con bizcocho húmedo y relleno cremoso, perfecta para cualquier ocasión especial."

    },
    {
        id:3,
        titulo: "Torta Circula Grande de Chocolate",
        imagen : "../pagina web/IMG/TortaCircular3.jpg",
        forma : "Circulares",
        tamanio :"Grande",
        precio : 30000,
        descripcion: "Irresistible torta de chocolate con capas de bizcocho rico y denso, rellena de ganache de chocolate y cubierta con glaseado brillante."

    },
    {
        id:4,
        titulo: "Torta Circula Grande de Fresas",
        imagen : "../pagina web/IMG/TortaCircular4.jpg",
        forma : "Circulares",
        tamanio :"Grande",
        precio : 40000,
        descripcion: "Deliciosa torta de fresas frescas con bizcocho esponjoso y crema batida, decorada con fresas enteras y un toque de menta."

    }

];

const contenedorProductosDestacados = document.querySelector("#contenedor-pd");

/* Función para cargar los productos en el contenedor */
function cargarProductos(lista = productos) {
    // Limpiar contenedor antes de cargar los productos
    contenedorProductosDestacados.innerHTML = "";

    // Recorrer cada producto y crear su estructura HTML
    lista.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-informacion">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio} c/u</p>
                <button class="producto-pagina" id="${producto.id}" onclick="verDetalle(${producto.id})">Ver detalle</button>
            </div>
        `;
        // Agregar el producto al contenedor
        contenedorProductosDestacados.append(div);
    });
}

// Llamar a la función para mostrar los productos al cargar la página
cargarProductos();

// Guardar productos en localStorage para que detalleProducto.js pueda acceder a ellos
localStorage.setItem("productos", JSON.stringify(productos));

// Función para redirigir al detalle del producto
function verDetalle(idProducto) {
    window.location.href = `detalleProd.html?id=${idProducto}`;
}