
let productosAdmin = [...productos];//Copia local de productos para su respectivo uso

// Inicializar
//Busca verificar el acceso mas una carga de datos
document.addEventListener('DOMContentLoaded', function() {

    const productosGuardados = localStorage.getItem('productos-admin');//lee el local storage de productos guardados
    if (productosGuardados) {
        productosAdmin = JSON.parse(productosGuardados);
    } else {
        productosAdmin = productosAdmin.map(producto => ({
            ...producto,
            stock: producto.stock || Math.floor(Math.random() * 20) + 5// busca generar stock aleatorio si no existe
        }));
        guardarProductos(); // llama a la funcion de guardarProductos para sincronizar datos
    }
});


// Gestión de productos
function mostrarGestionProductos() {
    actualizarNavegacionActiva('nav-productos');// llama la funcion para actualizar la navegacion activa
    // Se conecta con administrador.html y le agrega contenido dinamicamente dependiendo de las constantes
    const contenido = document.getElementById('contenido-principal');
    //modifica el contenido principal del html, los botones llaman a las funciones respectivas
    contenido.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h1>Gestión de Productos</h1>
            <button onclick="agregarProductoSimple()" style="background: #8B4513; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                Agregar Producto
            </button>
        </div>
        
        <div class="productos-grid" id="productos-admin-grid">
            ${generarTarjetasProductos()}
        </div>
    `;
}

// Generar tarjetas de productos
//itera sobre productosAdmin y genera una tarjeta para cada producto con sus detalles y botones de editar/eliminar
//busca manejar tambien el caso donde el precio es string (ej: "1000 - 2000")
//contecta con funciones de editarProducto y eliminarProducto
function generarTarjetasProductos() {
    return productosAdmin.map(producto => `
        <div class="producto-card" style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin: 10px; background: white;">
            <img src="${producto.imagen}" alt="${producto.titulo}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 5px;">
            <h3>${producto.titulo}</h3>
            <p><strong>ID:</strong> ${producto.id}</p>
            <p><strong>Forma:</strong> ${producto.forma}</p>
            <p><strong>Tamaño:</strong> ${producto.tamanio}</p>
            <p><strong>Stock:</strong> ${producto.stock} unidades</p>
            <p><strong>Precio:</strong> $${typeof producto.precio === 'string' ? producto.precio : producto.precio.toLocaleString()}</p>
            <p>${producto.descripcion}</p>
            <div style="display: flex; gap: 10px; margin-top: 10px;">
                <button onclick="editarProducto(${producto.id})" style="background: #ffc107; border: none; padding: 8px 12px; border-radius: 3px; cursor: pointer;">
                    Editar
                </button>
                <button onclick="eliminarProducto(${producto.id})" style="background: #dc3545; color: white; border: none; padding: 8px 12px; border-radius: 3px; cursor: pointer;">
                    Eliminar
                </button>
            </div>
        </div>
    `).join('');
}

// Función para agregar producto
function agregarProductoSimple() {
    mostrarFormularioProducto();
}

// Función para editar producto
function editarProducto(id) {
    mostrarFormularioProducto(id);
}

// Mostrar formulario de producto (agregar o editar)
function mostrarFormularioProducto(id = null) {
    const producto = id ? productosAdmin.find(p => p.id === id) : null;
    const esEdicion = !!producto;
    
    const contenido = document.getElementById('contenido-principal');
    contenido.innerHTML = `
        <div style="max-width: 600px; margin: 0 auto;">
            <h1>${esEdicion ? 'Editar' : 'Agregar'} Producto</h1>
            <form id="form-producto" style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="margin-bottom: 15px;">
                    <label>Título:</label>
                    <input type="text" id="titulo" value="${producto?.titulo || ''}" required style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label>Descripción:</label>
                    <textarea id="descripcion" required style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px; height: 80px;">${producto?.descripcion || ''}</textarea>
                </div>
                <div style="display: flex; gap: 15px; margin-bottom: 15px;">
                    <div style="flex: 1;">
                        <label>Forma:</label>
                        <select id="forma" required style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
                            <option value="circular" ${producto?.forma === 'circular' ? 'selected' : ''}>Circular</option>
                            <option value="cuadrada" ${producto?.forma === 'cuadrada' ? 'selected' : ''}>Cuadrada</option>
                        </select>
                    </div>
                    <div style="flex: 1;">
                        <label>Tamaño:</label>
                        <select id="tamanio" required style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
                            <option value="individual" ${producto?.tamanio === 'individual' ? 'selected' : ''}>Individual</option>
                            <option value="familiar" ${producto?.tamanio === 'familiar' ? 'selected' : ''}>Familiar</option>
                            <option value="grande" ${producto?.tamanio === 'grande' ? 'selected' : ''}>Grande</option>
                        </select>
                    </div>
                </div>
                <div style="display: flex; gap: 15px; margin-bottom: 15px;">
                    <div style="flex: 1;">
                        <label>Precio:</label>
                        <input type="number" id="precio" value="${typeof producto?.precio === 'number' ? producto.precio : ''}" required style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                    <div style="flex: 1;">
                        <label>Stock:</label>
                        <input type="number" id="stock" value="${producto?.stock || 10}" required style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                </div>
                <div style="margin-bottom: 20px;">
                    <label>URL de Imagen:</label>
                    <input type="url" id="imagen" value="${producto?.imagen || ''}" required style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div style="display: flex; gap: 15px;">
                    <button type="submit" style="flex: 1; background: #8B4513; color: white; border: none; padding: 12px; border-radius: 5px; cursor: pointer;">
                        ${esEdicion ? 'Actualizar' : 'Agregar'} Producto
                    </button>
                    <button type="button" onclick="mostrarGestionProductos()" style="flex: 1; background: #6c757d; color: white; border: none; padding: 12px; border-radius: 5px; cursor: pointer;">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    `;
    
    // Manejar envío del formulario
    document.getElementById('form-producto').addEventListener('submit', function(e) {
        e.preventDefault();
        guardarProducto(id);
    });
}

// Guardar producto (agregar o editar)
function guardarProducto(id = null) {
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const forma = document.getElementById('forma').value;
    const tamanio = document.getElementById('tamanio').value;
    const precio = parseInt(document.getElementById('precio').value);
    const stock = parseInt(document.getElementById('stock').value);
    const imagen = document.getElementById('imagen').value;
    
    if (id) {
        // Editar producto existente
        const index = productosAdmin.findIndex(p => p.id === id);
        productosAdmin[index] = {
            ...productosAdmin[index],
            titulo, descripcion, forma, tamanio, precio, stock, imagen
        };
        alert('✅ Producto actualizado correctamente');
    } else {
        // Agregar nuevo producto
        const nuevoId = Math.max(...productosAdmin.map(p => p.id)) + 1;
        const nuevoProducto = {
            id: nuevoId,
            titulo, descripcion, forma, tamanio, precio, stock, imagen
        };
        productosAdmin.push(nuevoProducto);
        alert('✅ Producto agregado correctamente');
    }
    
    guardarProductos();
    mostrarGestionProductos();
}

// Eliminar producto
function eliminarProducto(id) {
    //confirma la eliminacion del producto
    if (confirm('¿Eliminar este producto?')) {
        productosAdmin = productosAdmin.filter(p => p.id !== id); //filtra el producto por id
        //Llama a las funciones respectivas para actualizar la interfaz y guardar los cambios
        guardarProductos();
        mostrarGestionProductos();
        alert('Producto eliminado');
    }
}



// Guardar productos
//almacena los productos en el local storage para persistencia
//sincronica productos, usado por catalogo, home
function guardarProductos() {
    localStorage.setItem('productos-admin', JSON.stringify(productosAdmin));
    localStorage.setItem('productos', JSON.stringify(productosAdmin));
}

// Gestión de usuarios básica
// Muestra una lista simple de usuarios registrados
function mostrarGestionUsuarios() {
    // Actualiza la navegación activa
    actualizarNavegacionActiva('nav-usuarios');
    const contenido = document.getElementById('contenido-principal');
    //lee los usuarios del local storage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    contenido.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h1>Gestión de Usuarios</h1>
            <button onclick="crearUsuario()" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                Crear Usuario
            </button>
        </div>
        <p>Total de usuarios registrados: ${usuarios.length}</p>
        
        <div style="margin-top: 20px;">
            ${generarListaUsuarios(usuarios)}
        </div>
    `;
}

// Función para actualizar la navegación activa
// Agrega la clase 'active' al enlace seleccionado y la remueve de los demás
function actualizarNavegacionActiva(idActivo) {
    // Remover clase active de todos los enlaces
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');//remueve la clase active de todos los enlaces
    });
    
    // Agregar clase active al enlace seleccionado
    const linkActivo = document.getElementById(idActivo);//verifica si el enlace existe
    if (linkActivo) {
        linkActivo.classList.add('active');//agrega la clase active al enlace seleccionado
    }
}

//FUNCIONES DE GESTIÓN DE USUARIOS 

// Función para generar la lista HTML de usuarios
// Cada usuario tiene un botón para ver detalles y otro para eliminar (si no es admin)
// Conecta con las funciones verDetalleUsuario y eliminarUsuario
function generarListaUsuarios(usuarios = null) {
    const listaUsuarios = usuarios || JSON.parse(localStorage.getItem('usuarios')) || [];//lee los usuarios del local storage si no se pasan como parámetro

    if (listaUsuarios.length === 0) {//verifica si hay usuarios registrados
        return `
            <div style="text-align: center; padding: 3rem; color: #666;">
                <i class='bx bx-user-x' style="font-size: 4rem; margin-bottom: 1rem; color: #FFC0CB;"></i>
                <h3 style="color: #8B4513; margin-bottom: 1rem;">No hay usuarios registrados</h3>
                <p>Cuando los usuarios se registren, aparecerán aquí.</p>
            </div>
        `;
    }
    
    let html = `
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: linear-gradient(135deg, #FFC0CB 0%, #FFB6C1 100%); color: #8B4513;">
                        <th style="padding: 1rem; text-align: left; border-radius: 8px 0 0 0;">Nombre</th>
                        <th style="padding: 1rem; text-align: left;">Email</th>
                        <th style="padding: 1rem; text-align: center;">Edad</th>
                        <th style="padding: 1rem; text-align: center;">Categoría</th>
                        <th style="padding: 1rem; text-align: center;">Beneficios</th>
                        <th style="padding: 1rem; text-align: center; border-radius: 0 8px 0 0;">Acciones</th>
                    </tr>
                </thead>
                <tbody>
    `;//inicia la tabla con estilos
    
    // Itera sobre los usuarios y genera una fila para cada uno
    listaUsuarios.forEach((usuario, index) => {
        const categoria = obtenerCategoriaUsuario(usuario);
        const beneficios = obtenerBeneficiosUsuario(usuario);
        const fechaRegistro = usuario.fechaRegistro ? new Date(usuario.fechaRegistro).toLocaleDateString('es-ES') : 'No disponible';
        html += `
            <tr style="border-bottom: 1px solid #f0f0f0; ${index % 2 === 0 ? 'background: #fafafa;' : 'background: white;'} transition: all 0.3s ease;" 
                onmouseover="this.style.background='#f5f5f5';" 
                onmouseout="this.style.background='${index % 2 === 0 ? '#fafafa' : 'white'}';">
                <td style="padding: 1rem;">
                    <div style="display: flex; align-items: center; gap: 0.8rem;">
                        <div style="width: 40px; height: 40px; background: ${categoria.color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                            ${usuario.nombre.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div style="font-weight: 600; color: #333;">${usuario.nombre}</div>
                            <div style="font-size: 0.85rem; color: #666;">Registrado: ${fechaRegistro}</div>
                        </div>
                    </div>
                </td>
                <td style="padding: 1rem;">
                    <div style="color: #333; font-weight: 500;">${usuario.email}</div>
                </td>
                <td style="padding: 1rem; text-align: center;">
                    <span style="background: #e9ecef; color: #495057; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.9rem;">
                        ${usuario.edad} años
                    </span>
                </td>
                <td style="padding: 1rem; text-align: center;">
                    <span style="background: ${categoria.color}; color: white; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.85rem; font-weight: 600;">
                        ${categoria.icono} ${categoria.nombre}
                    </span>
                </td>
                <td style="padding: 1rem; text-align: center;">
                    <div style="display: flex; flex-direction: column; gap: 0.3rem; align-items: center;">
                        ${beneficios.map(beneficio => 
                            `<span style="background: ${beneficio.color}; color: white; padding: 0.2rem 0.6rem; border-radius: 10px; font-size: 0.75rem; white-space: nowrap;">
                                ${beneficio.texto}
                            </span>`
                        ).join('')}
                    </div>
                </td>
                <td style="padding: 1rem; text-align: center;">
                    <div style="display: flex; gap: 0.5rem; justify-content: center;">
                        <!-- Botón de ver detalle eliminado -->
                        <button onclick="editarUsuario('${usuario.email}')" 
                                style="background: #ffc107; color: white; border: none; padding: 0.5rem; border-radius: 5px; cursor: pointer; display: flex; align-items: center; justify-content: center;"
                                title="Editar usuario">
                            <i class='bx bx-edit'></i>
                        </button>
                        ${!usuario.esAdministrador ? `
                            <button onclick="eliminarUsuario('${usuario.email}')" 
                                    style="background: #dc3545; color: white; border: none; padding: 0.5rem; border-radius: 5px; cursor: pointer; display: flex; align-items: center; justify-content: center;"
                                    title="Eliminar usuario">
                                <i class='bx bx-trash'></i>
                            </button>
                        ` : `
                            <span style="color: #6c757d; font-size: 0.8rem; padding: 0.5rem;">
                                <i class='bx bx-shield' title="Admin protegido"></i>
                            </span>
                        `}
                    </div>
                </td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    return html;//retorna la tabla completa
}

// Función para obtener la categoría de un usuario
// Devuelve un objeto con nombre, color e ícono según las propiedades del usuario
//Lee las propiedades creadas por Registro.js
function obtenerCategoriaUsuario(usuario) {
    if (usuario.esAdministrador) {
        return { nombre: 'Administrador', color: '#6f42c1', icono: '🛡️' };
    } else if (usuario.esDuocUC) {
        return { nombre: 'DuocUC', color: '#e83e8c', icono: '🎓' };
    } else if (usuario.tieneDescuentoPromocional) {
        return { nombre: 'Promocional', color: '#20c997', icono: '🎁' };
    } else {
        return { nombre: 'Usuario Normal', color: '#6c757d', icono: '👤' };
    }
}

// Función para obtener los beneficios de un usuario
// Devuelve un array de objetos con texto y color para cada beneficio
//Conexion con productos.js para descuentos
function obtenerBeneficiosUsuario(usuario) {
    const beneficios = [];
    if (usuario.esAdministrador) {
        beneficios.push({ texto: 'Panel Admin', color: '#6f42c1' });
    }
    if (usuario.esDuocUC && usuario.tortasGratis) {
        beneficios.push({ texto: 'Tortas Gratis', color: '#e83e8c' });
    }
    if (usuario.tieneDescuentoPromocional) {
        beneficios.push({ 
            texto: `10% OFF`, 
            color: '#20c997' 
        });
    }
    if (beneficios.length === 0) {
        beneficios.push({ texto: 'Sin beneficios', color: '#6c757d' });
    }
    return beneficios;
}


// Función para eliminar un usuario
function eliminarUsuario(email) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];//lee los usuarios del local storage
    const usuario = usuarios.find(u => u.email === email);//busca el usuario por email
    
    if (usuario.esAdministrador) {
        alert('❌ No se puede eliminar a un administrador');
        return;
    }
    
    // Confirmar eliminación
    //conexion con historial-compras.js para eliminar su historial tambien
    const confirmar = confirm(`¿Estás seguro de que quieres eliminar al usuario "${usuario.nombre}"?\n\nEsta acción no se puede deshacer.`);
    
    //si el usuario confirma, procede a eliminar
    if (confirmar) {
        const usuariosActualizados = usuarios.filter(u => u.email !== email);//elimina el usuario del array
        localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));//actualiza el local storage
        
        // También eliminar su historial de compras
        const historialCompras = JSON.parse(localStorage.getItem('historial-compras')) || [];//lee el historial de compras del local storage
        const historialFiltrado = historialCompras.filter(compra => compra.emailUsuario !== email);//filtra las compras del usuario eliminado
        localStorage.setItem('historial-compras', JSON.stringify(historialFiltrado));//actualiza el local storage
        
        alert(`✅ Usuario "${usuario.nombre}" eliminado correctamente`);//notifica la eliminacion
        mostrarGestionUsuarios();//llama a mostrarGestionUsuarios para actualizar la interfaz 
        // Recargar la lista
    }
}

// Función para crear usuario
function crearUsuario() {
    mostrarFormularioUsuario();
}

// Función para editar usuario
function editarUsuario(email) {
    mostrarFormularioUsuario(email);
}

// Mostrar formulario de usuario (crear o editar)
function mostrarFormularioUsuario(email = null) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = email ? usuarios.find(u => u.email === email) : null;
    const esEdicion = !!usuario;
    
    const contenido = document.getElementById('contenido-principal');
    contenido.innerHTML = `
        <div style="max-width: 600px; margin: 0 auto;">
            <h1>${esEdicion ? 'Editar' : 'Crear'} Usuario</h1>
            <form id="form-usuario" style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="margin-bottom: 15px;">
                    <label>Nombre:</label>
                    <input type="text" id="nombre" value="${usuario?.nombre || ''}" required style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label>Email:</label>
                    <input type="email" id="email" value="${usuario?.email || ''}" ${esEdicion ? 'readonly' : ''} required style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px; ${esEdicion ? 'background: #f5f5f5;' : ''}">
                </div>
                <div style="margin-bottom: 15px;">
                    <label>Edad:</label>
                    <input type="number" id="edad" value="${usuario?.edad || ''}" required min="1" max="120" style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                ${!esEdicion ? `
                <div style="margin-bottom: 15px;">
                    <label>Contraseña:</label>
                    <input type="password" id="password" required style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                ` : ''}
                <div style="margin-bottom: 15px;">
                    <label>
                        <input type="checkbox" id="esAdministrador" ${usuario?.esAdministrador ? 'checked' : ''}>
                        Es Administrador
                    </label>
                </div>
                <div style="margin-bottom: 15px;">
                    <label>
                        <input type="checkbox" id="esDuocUC" ${usuario?.esDuocUC ? 'checked' : ''}>
                        Es estudiante DuocUC
                    </label>
                </div>
                <div style="margin-bottom: 15px;">
                    <label>
                        <input type="checkbox" id="tieneDescuentoPromocional" ${usuario?.tieneDescuentoPromocional ? 'checked' : ''}>
                        Tiene descuento promocional
                    </label>
                </div>
                <div style="margin-bottom: 20px;">
                    <label>Porcentaje descuento promocional:</label>
                    <input type="number" id="porcentajeDescuentoPromocional" value="${usuario?.porcentajeDescuentoPromocional || 0}" min="0" max="100" style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div style="display: flex; gap: 15px;">
                    <button type="submit" style="flex: 1; background: #28a745; color: white; border: none; padding: 12px; border-radius: 5px; cursor: pointer;">
                        ${esEdicion ? 'Actualizar' : 'Crear'} Usuario
                    </button>
                    <button type="button" onclick="mostrarGestionUsuarios()" style="flex: 1; background: #6c757d; color: white; border: none; padding: 12px; border-radius: 5px; cursor: pointer;">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    `;
    
    // Manejar envío del formulario
    document.getElementById('form-usuario').addEventListener('submit', function(e) {
        e.preventDefault();
        guardarUsuario(email);
    });
}

// Guardar usuario (crear o editar)
function guardarUsuario(emailOriginal = null) {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const edad = parseInt(document.getElementById('edad').value);
    const esAdministrador = document.getElementById('esAdministrador').checked;
    const esDuocUC = document.getElementById('esDuocUC').checked;
    const tieneDescuentoPromocional = document.getElementById('tieneDescuentoPromocional').checked;
    
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    if (emailOriginal) {
        // Editar usuario existente
        const index = usuarios.findIndex(u => u.email === emailOriginal);
        usuarios[index] = {
            ...usuarios[index],
            nombre, 
            edad, 
            esAdministrador, 
            esDuocUC, 
            tieneDescuentoPromocional,
            tortasGratis: esDuocUC
        };
        alert('✅ Usuario actualizado correctamente');
    } else {
        // Crear nuevo usuario
        const password = document.getElementById('password').value;
        
        // Verificar si el email ya existe
        if (usuarios.find(u => u.email === email)) {
            alert('❌ Ya existe un usuario con este email');
            return;
        }
        
        const nuevoUsuario = {
            nombre,
            email,
            edad,
            password,
            esAdministrador,
            esDuocUC,
            tieneDescuentoPromocional,
            tortasGratis: esDuocUC,
            fechaRegistro: new Date().toISOString()
        };
        
        usuarios.push(nuevoUsuario);
        alert('✅ Usuario creado correctamente');
    }
    
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    mostrarGestionUsuarios();
}
