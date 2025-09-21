// ===========================================================
// Catálogo de Productos y Carrito de Compras
// ===========================================================

// ===========================================================
// 1. Datos de productos
// Array que contiene todos los productos disponibles en la tienda.
// Cada producto tiene:
// - id: número único para identificarlo
// - titulo: nombre del producto
// - imagen: ruta de la imagen del producto
// - forma: forma de la torta (Circular o Cuadrada)
// - tamanio: tamaño de la torta (Grande o Pequeña)
// - precio: valor en pesos
// ===========================================================
const productos = [
    {
        id: 1,
        titulo: "Torta1",
        imagen: "../pagina web/IMG/TortaCircular1.jpg",
        forma: "Circular",
        tamanio: "Grande",
        precio: 18200
    },
    {
        id: 2,
        titulo: "Torta2",
        imagen: "../pagina web/IMG/TortaCircular2.jpg",
        forma: "Circular",
        tamanio: "Grande",
        precio: 15500
    },
    {
        id: 3,
        titulo: "Torta3",
        imagen: "../pagina web/IMG/TortaCircular3.jpg",
        forma: "Circular",
        tamanio: "Grande",
        precio: 30000
    },
    {
        id: 4,
        titulo: "Torta4",
        imagen: "../pagina web/IMG/TortaCircular4.jpg",
        forma: "Circular",
        tamanio: "Grande",
        precio: 40000
    },
    {
        id: 5,
        titulo: "Torta5",
        imagen: "../pagina web/IMG/TortaCircular5.jpg",
        forma: "Circular",
        tamanio: "Grande",
        precio: 40000
    },
    {
        id: 6,
        titulo: "Torta6",
        imagen: "../pagina web/IMG/TortaPequeña1.jpg",
        forma: "Circular",
        tamanio: "Pequeña",
        precio: 5850
    },
    {
        id: 7,
        titulo: "Torta7",
        imagen: "../pagina web/IMG/TortaPequeña2.jpg",
        forma: "Circular",
        tamanio: "Pequeña",
        precio: 7450
    },
    {
        id: 8,
        titulo: "Torta8",
        imagen: "../pagina web/IMG/TortaPequeña3.jpg",
        forma: "Circular",
        tamanio: "Pequeña",
        precio: 5500
    },
    {
        id: 9,
        titulo: "Torta9",
        imagen: "../pagina web/IMG/TortaCuadrada1.jpg",
        forma: "Cuadrada",
        tamanio: "Grande",
        precio: 26000
    },
    {
        id: 10,
        titulo: "Torta10",
        imagen: "../pagina web/IMG/TortaCuadrada2.jpg",
        forma: "Cuadrada",
        tamanio: "Grande",
        precio: 26000
    },
    {
        id: 11,
        titulo: "Torta11",
        imagen: "../pagina web/IMG/TortaCuadrada3.webp",
        forma: "Cuadrada",
        tamanio: "Grande",
        precio: 76000
    },
    {
        id: 12,
        titulo: "Torta12",
        imagen: "../pagina web/IMG/TortaCuadrada4.png",
        forma: "Cuadrada",
        tamanio: "Grande",
        precio: 50000
    },
    {
        id: 13,
        titulo: "Torta13",
        imagen: "../pagina web/IMG/TortaCuadradaPequeña1.jpg",
        forma: "Cuadrada",
        tamanio: "Pequeña",
        precio: 7600
    },
    {
        id: 14,
        titulo: "Torta14",
        imagen: "../pagina web/IMG/TortaCuadradaPequeña2.jpg",
        forma: "Cuadrada",
        tamanio: "Pequeña",
        precio: 10000
    },
    {
        id: 15,
        titulo: "Torta15",
        imagen: "../pagina web/IMG/TortaCuadradaPequeña3.webp",
        forma: "Cuadrada",
        tamanio: "Pequeña",
        precio: 7500
    },
    {
        id: 16,
        titulo: "Torta16",
        imagen: "../pagina web/IMG/TortaCuadradaPequeña4.webp",
        forma: "Cuadrada",
        tamanio: "Pequeña",
        precio: 9500
    },
    {
        id: 17,
        titulo: "Torta17",
        imagen: "../pagina web/IMG/TortaCuadradaPequeña5.jpg",
        forma: "Cuadrada",
        tamanio: "Pequeña",
        precio: 7500
    },
    {
        id: 18,
        titulo: "Torta18",
        imagen: "../pagina web/IMG/TortaCuadradaPequeña6.jpg",
        forma: "Cuadrada",
        tamanio: "Pequeña",
        precio: 9900
    }
];

// ===========================================================
// 2. Selección de elementos del DOM
// Se capturan elementos necesarios para interactuar con productos y carrito
// ===========================================================
const contenedorProductos = document.querySelector("#contenedor-p"); // Contenedor principal donde se mostrarán los productos
const botonesFiltro = document.querySelectorAll(".botones-filtro"); // Botones que aplican filtros por forma o tamaño
let botonesAgregar = document.querySelectorAll(".producto-agregar"); // Botones "Agregar" para cada producto
const numerito = document.querySelector("#numerito"); // Elemento que muestra el número total de productos en el carrito

// ===========================================================
// 3. Función para cargar productos en el DOM
// Permite renderizar todos los productos o una lista filtrada
// ===========================================================
function cargarProductos(lista = productos) {
    contenedorProductos.innerHTML = ""; // Limpiar el contenedor antes de mostrar productos

    lista.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="Imagen de ${producto.titulo}">
            <div class="producto-informacion">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio} c/u</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div); // Se agrega el producto al contenedor
    });

    actualizarBotonesAgregar(); // Se asignan eventos a los botones "Agregar"
}

// Inicializar mostrando todos los productos
cargarProductos();

// ===========================================================
// 4. Funcionalidad de filtros
// Permite filtrar productos según forma o tamaño usando data attributes
// ===========================================================
botonesFiltro.forEach(boton => { 
    boton.addEventListener("click", () => {
        const forma = boton.dataset.forma; // Extrae la forma a filtrar
        const tamanio = boton.dataset.tamanio; // Extrae el tamaño a filtrar

        let filtrados = productos; // Comenzamos con todos los productos

        if (forma) filtrados = filtrados.filter(p => p.forma === forma);
        if (tamanio) filtrados = filtrados.filter(p => p.tamanio === tamanio);

        cargarProductos(filtrados); // Renderiza solo los productos filtrados
    });
});

// ===========================================================
// 5. Limpiar filtros
// Resetea todos los checkboxes y vuelve a mostrar todos los productos
// ===========================================================
const btnLimpiar = document.querySelector("#btn-limpiar");
btnLimpiar.addEventListener("click", () => {
    document.querySelectorAll(".filtros input[type='checkbox']").forEach(chk => {
        chk.checked = false; // Desmarcar todos los filtros
    });
    cargarProductos(productos); // Mostrar todos los productos
});

// ===========================================================
// 6. Funcionalidades de carrito
// ===========================================================

// Actualiza los botones "Agregar al carrito" después de renderizar productos
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

// ===========================================================
// 6a. Inicializar carrito desde localStorage
// ===========================================================
let productosEnCarrito;
const productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito(); // Mostrar cantidad inicial en el carrito
} else {
    productosEnCarrito = []; // Si no hay productos, inicializar vacío
}

// ===========================================================
// 6b. Función para agregar productos al carrito
// ===========================================================
function agregarAlCarrito(e) {
    const idBoton = parseInt(e.currentTarget.id); // Identificar el producto por su id
    const productoAgregado = productos.find(producto => producto.id === idBoton); // Obtener objeto del producto

    // Si el producto ya existe en el carrito, aumentar cantidad
    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        const nuevoProducto = { ...productoAgregado, cantidad: 1 }; // Si es nuevo, agregar con cantidad 1
        productosEnCarrito.push(nuevoProducto);
    }

    actualizarNumerito(); // Actualiza el contador visual
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); // Guardar cambios
}

// ===========================================================
// 6c. Función para actualizar el numerito del carrito
// ===========================================================
function actualizarNumerito() {
    const newNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = newNumerito; // Mostrar número total de productos
}
