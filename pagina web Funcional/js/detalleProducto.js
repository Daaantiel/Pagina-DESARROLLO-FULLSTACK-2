document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const idProducto = params.get('id');
  const contenedorDetalle = document.querySelector("#contenedor-d");

 
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  let carrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

  
  const producto = productos.find(p => p.id == idProducto);

  if (producto) {
    const div = document.createElement("div");
    div.classList.add("producto-detalle");
    div.innerHTML = `
      <div class="contenedor-imagen-detalle">
        <img src="${producto.imagen}" alt="${producto.titulo}">
      </div>
      <div class="contenedor-detalle-p">
        <div id="titulo-precio-d">
          <h2>${producto.titulo}</h2>
          <h2>$${producto.precio}</h2>
        </div>
        <div id="descripcion-p">
          <p>${producto.descripcion || "Un delicioso producto de nuestra pastelería."}</p>
        </div>
        <div id="btn-carro">
          <button class="producto-agregar">Agregar al carrito</button>
        </div>
      </div>
    `;
    contenedorDetalle.append(div);


    const btnAgregar = div.querySelector(".producto-agregar");
    btnAgregar.addEventListener("click", () => {
      const productoEnCarrito = carrito.find(p => p.id == producto.id);

      if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
      } else {
        producto.cantidad = 1;
        carrito.push(producto);
      }

      localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
      alert(`${producto.titulo} se agregó al carrito`);
    });

  } else {
    contenedorDetalle.innerHTML = "<p>Producto no encontrado.</p>";
  }

  function actualizarNumerito() {
    const numerito = document.getElementById("numerito");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalCantidad = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);

    numerito.textContent = totalCantidad;
}


actualizarNumerito();
}
);
