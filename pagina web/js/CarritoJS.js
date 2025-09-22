

// Obtener usuario logueado (si existe)
const usuario = JSON.parse(localStorage.getItem("usuario"));
const esUsuarioDuocuc = usuario && usuario.usuarioDuocuc;
let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
let descuentoAplicado = false;
let totalConDescuento = 0;
let codigoIngresado = "";

document.addEventListener('DOMContentLoaded', function() {
    const carroVacio = document.querySelector("#carro-vacio");
    const carroProductos = document.querySelector("#carro-productos");
    const carroOpciones = document.querySelector("#carro-opciones");
    const carroComprado = document.querySelector("#carro-comprado");
    const botonVaciar = document.querySelector(".carro-acciones-v");
    const botonComprar = document.querySelector(".carro-acciones-comprar");
    let botonEliminar = document.querySelectorAll(".carro-producto-eliminar");
    const total = document.querySelector("#total");

    function cargarProductosCarrito() {
        if (productosEnCarrito && productosEnCarrito.length > 0) {
            carroVacio.classList.add("disabled");
            carroProductos.classList.remove("disabled");
            carroOpciones.classList.remove("disabled");
            carroComprado.classList.add("disabled");

            carroProductos.innerHTML = "";

            productosEnCarrito.forEach(producto => {
                // Si es usuario duocuc, mostrar precio $0
                const precioMostrar = esUsuarioDuocuc ? 0 : producto.precio;
                const subtotalMostrar = esUsuarioDuocuc ? 0 : producto.precio * producto.cantidad;
                const div = document.createElement("div"); 
                div.classList.add("carrito-producto");
                div.innerHTML = `
                    <img class="carro-img" src="${producto.imagen}" alt="Imagen de ${producto.titulo}">
                    <div class="carro-producto-titulo">
                        <h3>${producto.titulo}</h3>
                    </div>
                    <div class="carro-producto-cantidad">
                        <small>Cantidad</small>
                        <p>${producto.cantidad}</p>
                    </div>
                    <div class="carro-producto-precio">
                        <small>Precio</small>
                        <p>$${precioMostrar}</p>
                    </div>
                    <div class="carro-producto-subtotal">
                        <small>Subtotal</small>
                        <p>$${subtotalMostrar}</p>
                    </div>
                    <button id="${producto.id}" class="carro-producto-eliminar">
                      <i class='bx bx-trash'></i>
                    </button>
                `;
                carroProductos.append(div);
            });

        } else {
            carroVacio.classList.remove("disabled");
            carroProductos.classList.add("disabled");
            carroOpciones.classList.add("disabled");
            carroComprado.classList.add("disabled");
        }
        actualizarBotonesEliminar();
        actualizarTotal();
    }
    cargarProductosCarrito();

    function actualizarBotonesEliminar() {
        botonEliminar = document.querySelectorAll(".carro-producto-eliminar");
        botonEliminar.forEach(boton => {
            boton.addEventListener("click", eliminarDelCarrito);
        });
    }

    function eliminarDelCarrito(e) {
        const idBoton = parseInt(e.currentTarget.id);
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

        if (index !== -1) { 
            productosEnCarrito.splice(index, 1);
            cargarProductosCarrito();
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        }
    }

    botonVaciar.addEventListener("click", vaciarCarrito);

    function vaciarCarrito() {
        if (confirm("¿Seguro que quieres vaciar el carrito?")) { 
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
    }

    // Crear campo de código promocional si no existe
    function crearCampoDescuento() {
        if (!document.getElementById("codigo-descuento")) {
            const div = document.createElement("div");
            div.className = "carro-codigo-descuento";
            div.innerHTML = `
                <input type="text" id="codigo-descuento" placeholder="Código promocional">
                <button id="aplicar-descuento">Aplicar</button>
                <span id="mensaje-descuento" style="color:green;font-size:13px;"></span>
            `;
            carroOpciones.insertBefore(div, carroOpciones.firstChild);
            document.getElementById("aplicar-descuento").addEventListener("click", aplicarDescuento);
        }
    }

    function actualizarTotal() {
        // Si es usuario duocuc, total es 0
        let totalCalculado = 0;
        if (esUsuarioDuocuc) {
            totalCalculado = 0;
        } else {
            totalCalculado = productosEnCarrito.reduce(
                (acc, producto) => acc + (producto.precio * producto.cantidad),
                0
            );
        }

        // Si hay descuento aplicado y no es usuario duocuc
        if (descuentoAplicado && !esUsuarioDuocuc) {
            totalConDescuento = Math.round(totalCalculado * 0.9);
            total.innerText = `$${totalConDescuento}`;
        } else {
            total.innerText = `$${totalCalculado}`;
        }
    }

    function aplicarDescuento() {
        const input = document.getElementById("codigo-descuento");
        const mensaje = document.getElementById("mensaje-descuento");
        codigoIngresado = input.value.trim();
        if (codigoIngresado === "FELICES50") {
            descuentoAplicado = true;
            mensaje.textContent = "¡Descuento aplicado! 10% OFF";
        } else {
            descuentoAplicado = false;
            mensaje.textContent = "Código inválido.";
            mensaje.style.color = "red";
        }
        actualizarTotal();
    }

    // Crear campo de descuento al cargar carrito
    crearCampoDescuento();

    botonComprar.addEventListener("click", comprarCarrito);

    function comprarCarrito() {
        // Si es usuario duocuc, mostrar mensaje especial
        if (esUsuarioDuocuc) {
            alert("¡Eres usuario DUOC UC! Tus tortas son gratis.");
        } else if (descuentoAplicado) {
            alert("¡Descuento aplicado! Total a pagar: $" + totalConDescuento);
        }
        productosEnCarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

        carroVacio.classList.add("disabled");
        carroProductos.classList.add("disabled");
        carroOpciones.classList.add("disabled");
        carroComprado.classList.remove("disabled");
    }
});
