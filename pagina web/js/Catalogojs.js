const productos = [
    {
        id: 1,
        titulo: "Torta Circular De Chocolate Grande",
        imagen: "../pagina web/IMG/TortaCircular1.jpg",
        forma: "Circular",
        tamanio: "Grande",
        precio: 18200
    },
    {
        id: 2,
        titulo: "Torta Circular De vainilla Grande",
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
        titulo: "Torta Circular De berries Grande",
        imagen: "../pagina web/IMG/TortaCircular4.jpg",
        forma: "Circular",
        tamanio: "Grande",
        precio: 40000
    },
    {
        id: 5,
        titulo: "Torta Circular De pistacho Grande",
        imagen: "../pagina web/IMG/TortaCircular5.jpg",
        forma: "Circular",
        tamanio: "Grande",
        precio: 40000
    },
    {
        id: 6,
        titulo: "Torta Circular De Chocolate Pequeña",
        imagen: "../pagina web/IMG/TortaPequeña1.jpg",
        forma: "Circular",
        tamanio: "Pequeña",
        precio: 5850
    },
    {
        id: 7,
        titulo: "Torta Circular De vainilla pequeña",
        imagen: "../pagina web/IMG/TortaPequeña2.jpg",
        forma: "Circular",
        tamanio: "Pequeña",
        precio: 7450
    },
    {
        id: 8,
        titulo: "Torta Circular De fresas Pequeña",
        imagen: "../pagina web/IMG/TortaPequeña3.jpg",
        forma: "Circular",
        tamanio: "Pequeña",
        precio: 5500
    },
    {
        id: 9,
        titulo: "Torta Cuadrada De Chocolate Grande",
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
        titulo: "Torta Circular De vainilla Grande",
        imagen: "../pagina web/IMG/TortaCuadrada3.webp",
        forma: "Cuadrada",
        tamanio: "Grande",
        precio: 76000
    },
    {
        id: 12,
        titulo: "Torta Circular De frutilla Grande",
        imagen: "../pagina web/IMG/TortaCuadrada4.png",
        forma: "Cuadrada",
        tamanio: "Grande",
        precio: 50000
    },
    {
        id: 13,
        titulo: "Torta cuadrada De Chocolate pequeña",
        imagen: "../pagina web/IMG/TortaCuadradaPequeña1.jpg",
        forma: "Cuadrada",
        tamanio: "Pequeña",
        precio: 7600
    },
    {
        id: 14,
        titulo: "Torta cuadrada De vainilla pequeña",
        imagen: "../pagina web/IMG/TortaCuadradaPequeña2.jpg",
        forma: "Cuadrada",
        tamanio: "Pequeña",
        precio: 10000
    },
    {
        id: 15,
        titulo: "Torta cuadrada De frambuesa pequeña",
        imagen: "../pagina web/IMG/TortaCuadradaPequeña3.webp",
        forma: "Cuadrada",
        tamanio: "Pequeña",
        precio: 7500
    },
    {
        id: 16,
        titulo: "Torta cuadrada De Pistacho pequeña",
        imagen: "../pagina web/IMG/TortaCuadradaPequeña4.webp",
        forma: "Cuadrada",
        tamanio: "Pequeña",
        precio: 9500
    },
    {
        id: 17,
        titulo: "Torta cuadrada De Chocolate y frutilla pequeña",
        imagen: "../pagina web/IMG/TortaCuadradaPequeña5.jpg",
        forma: "Cuadrada",
        tamanio: "Pequeña",
        precio: 7500
    },
    {
        id: 18,
        titulo: "Torta cuadrada De vainilla pequeña",
        imagen: "../pagina web/IMG/TortaCuadradaPequeña6.jpg",
        forma: "Cuadrada",
        tamanio: "Pequeña",
        precio: 9900
    }
];

const contenedorProductos = document.querySelector("#contenedor-p");
const botonesFiltro = document.querySelectorAll(".botones-filtro");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(lista = productos) {
    contenedorProductos.innerHTML = "";
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
        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar();
}

cargarProductos();


botonesFiltro.forEach(boton => { 
    boton.addEventListener("click", () => {
        const forma = boton.dataset.forma;
        const tamanio = boton.dataset.tamanio;

        let filtrados = productos;

        if (forma) {
            filtrados = filtrados.filter(p => p.forma === forma);
        }

        if (tamanio) {
            filtrados = filtrados.filter(p => p.tamanio === tamanio);
        }

        cargarProductos(filtrados);
    });
});

const btnLimpiar = document.querySelector("#btn-limpiar");
btnLimpiar.addEventListener("click", () => {
    document.querySelectorAll(".filtros input[type='checkbox']").forEach(chk => {
        chk.checked = false;
    });
    cargarProductos(productos);
});


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}


let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito(); 
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = parseInt(e.currentTarget.id);
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        const nuevoProducto = { ...productoAgregado, cantidad: 1 }; 
        productosEnCarrito.push(nuevoProducto);
    }

    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let newNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = newNumerito;

}
