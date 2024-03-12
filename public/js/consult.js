document.addEventListener('DOMContentLoaded', function () {
    const consultaList = document.getElementById('consulta-list');
    const carrito = document.getElementById('carrito');
    const botonContactar = document.getElementById('contactar');
    const botonesCarrito = document.querySelectorAll('.btn-select');
    
    // Cargar el carrito guardado del almacenamiento local al cargar la página
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    console.log('Contenido actual del localStorage:', localStorage.getItem('carrito'));

    // Función para generar un identificador único
    function generarIdUnico(nombreMaterial) {
        return `${nombreMaterial}-${Date.now()}`;
    }

    // Función para agregar un material al carrito
    function agregarAlCarrito(event, nombreMaterial, imagenUrl, esCargaInicial = false) {
        event.preventDefault();

        // Generar un identificador único para el material
        const idUnico = generarIdUnico(nombreMaterial);

        // Verificar si el material ya está en el carrito
        const materialExistenteIndex = carritoGuardado.findIndex(item => item.nombre === nombreMaterial);

        if (!esCargaInicial && materialExistenteIndex !== -1) {
            alert('El material ya está en el carrito.');
            return;
        }

        // Actualizar el carrito guardado en el almacenamiento local
        const carritoActualizado = [...carritoGuardado, { id: idUnico, nombre: nombreMaterial, imagen: imagenUrl }];
        localStorage.setItem('carrito', JSON.stringify(carritoActualizado));

        console.log(carritoActualizado)
        // Crear un nuevo elemento div
        const nuevoElemento = document.createElement('div');

        // Agregar el atributo data-material-id al nuevo elemento
        nuevoElemento.setAttribute('data-material-id', idUnico);

        // Crear un elemento de imagen
        const imagenElemento = document.createElement('img');
        imagenElemento.src = imagenUrl;
        imagenElemento.alt = nombreMaterial;

        // Crear un elemento de párrafo para el nombre del material
        const nombreElemento = document.createElement('p');
        nombreElemento.textContent = nombreMaterial;

        // Crear un botón de eliminar
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', function () {
            limpiarMaterial(idUnico);
        });

        // Agregar la imagen, el nombre y el botón al nuevo elemento
        nuevoElemento.appendChild(imagenElemento);
        nuevoElemento.appendChild(nombreElemento);
        nuevoElemento.appendChild(botonEliminar);

        // Agregar el nuevo elemento al contenedor
        consultaList.appendChild(nuevoElemento);

        // Mostrar el contenedor de la lista de consulta
        consultaList.style.display = 'block';

        // Actualizar la visibilidad del botón de contacto
        actualizarVisibilidadBotonContactar();
    }

  
    // Función para limpiar un material específico del carrito
    function limpiarMaterial(idMaterial) {
        // Eliminar el material del carrito guardado
        const carritoActualizado = carritoGuardado.filter(item => item.id !== idMaterial);
        localStorage.setItem('carrito', JSON.stringify(carritoActualizado));

        // Eliminar el material del DOM
        const elementoMaterial = document.querySelector(`[data-material-id="${idMaterial}"]`);
        if (elementoMaterial) {
            elementoMaterial.remove();
        }

        // Actualizar la visibilidad del botón de contacto
        actualizarVisibilidadBotonContactar();
    }

    // Función para actualizar la visibilidad del botón de contacto
    function actualizarVisibilidadBotonContactar() {
        const tieneMateriales = carritoGuardado.length > 0;
        botonContactar.style.display = tieneMateriales ? 'block' : 'none';
    }

     // Verificar si hay elementos en el carrito guardado y agregarlos al DOM
    if (carritoGuardado.length > 0) {
        carritoGuardado.forEach(item => {
            const idUnico = item.id;
            const nombreMaterial = item.nombre;
            const imagenUrl = item.imagen;

            // Crear un nuevo elemento div
            const nuevoElemento = document.createElement('div');

            // Agregar el atributo data-material-id al nuevo elemento
            nuevoElemento.setAttribute('data-material-id', idUnico);

            // Crear un elemento de imagen
            const imagenElemento = document.createElement('img');
            imagenElemento.src = imagenUrl;
            imagenElemento.alt = nombreMaterial;

            // Crear un elemento de párrafo para el nombre del material
            const nombreElemento = document.createElement('p');
            nombreElemento.textContent = nombreMaterial;

            // Crear un botón de eliminar
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', function () {
                limpiarMaterial(idUnico);
            });

            // Agregar la imagen, el nombre y el botón al nuevo elemento
            nuevoElemento.appendChild(imagenElemento);
            nuevoElemento.appendChild(nombreElemento);
            nuevoElemento.appendChild(botonEliminar);

            // Agregar el nuevo elemento al contenedor
            consultaList.appendChild(nuevoElemento);

            // Mostrar el contenedor de la lista de consulta
            consultaList.style.display = 'block';
        });
    }


    // Ejemplo de uso en el botón
    botonesCarrito.forEach(function (boton) {
        boton.addEventListener('click', function (event) {
            event.preventDefault();
            const nombreMaterial = boton.closest('.material').querySelector('a.card-material h3').textContent;
            const imagenUrl = boton.closest('.material').querySelector('a.card-material img').src;
            agregarAlCarrito(event, nombreMaterial, imagenUrl);
        });
    });

    // Mostrar el carrito guardado al cargar la página
    carritoGuardado.forEach(item => {
        agregarAlCarrito(new Event('click'), item.nombre, item.imagen);
    });

    // Manejar la visibilidad del carrito
    carrito.addEventListener('click', () => {
        const displayValue = window.getComputedStyle(consultaList).getPropertyValue('display');
        consultaList.style.display = (displayValue === 'none') ? 'block' : 'none';
    });
});
