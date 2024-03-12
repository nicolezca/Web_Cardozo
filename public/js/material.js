// Obtener referencias a los elementos del DOM
const btnDescription = document.getElementById('btn-description');
const btnDetails = document.getElementById('btn-details');
const Description = document.getElementById('description');
const Details = document.getElementById('details');

// Manejar el evento de clic en el botón de Descripción
btnDescription.addEventListener('click', () => {
    // Mostrar la sección de Descripción y ocultar la sección de Detalles
    Description.style.display = 'block';
    btnDescription.classList.add('active');
    btnDetails.classList.remove('active');
    Details.style.display = 'none';
});

// Manejar el evento de clic en el botón de Detalles
btnDetails.addEventListener('click', () => {
    // Mostrar la sección de Detalles y ocultar la sección de Descripción
    Description.style.display = 'none';
    Details.style.display = 'block';
    btnDetails.classList.add('active');
    btnDescription.classList.remove('active');
});
