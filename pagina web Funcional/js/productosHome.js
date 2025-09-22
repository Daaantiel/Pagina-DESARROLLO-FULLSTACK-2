/* Listado de productos destacados */
/* Puede ser el mismo listado que en catalogo.js o uno diferente con ofertas y promociones */
const productos = [
    {
        id: 1,
        titulo: "Torta1",
        imagen: "../pagina web/IMG/TortaCircular1.jpg",
        forma: "Circulares",
        tamanio: "Grande",
        precio: 18200
    },
    {
        id: 2,
        titulo: "Torta2",
        imagen: "../pagina web/IMG/TortaCircular2.jpg",
        forma: "Circulares",
        tamanio: "Grande",
        precio: 15500
    },
    {
        id: 3,
        titulo: "Torta3",
        imagen: "../pagina web/IMG/TortaCircular3.jpg",
        forma: "Circulares",
        tamanio: "Grande",
        precio: 30000
    },
    {
        id: 4,
        titulo: "Torta4",
        imagen: "../pagina web/IMG/TortaCircular4.jpg",
        forma: "Circulares",
        tamanio: "Grande",
        precio: 40000
    }
];

// Selecciona el contenedor donde se mostrarán los productos destacados
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
                <button class="producto-pagina" id="${producto.id}">Me interesa</button>
            </div>
        `;

        // Agregar el producto al contenedor
        contenedorProductosDestacados.append(div);
    });
}

// Llamar a la función para mostrar los productos al cargar la página
cargarProductos();
