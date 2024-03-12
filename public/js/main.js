  const searchInput = document.querySelector('.search input');
  const materialesCategory = document.getElementById('materiales-category');
  const fabricacionCategory = document.getElementById('fabricacion-category');

  // Agregar evento de entrada al campo de búsqueda
  searchInput.addEventListener('input', function () {
      const searchTerm = searchInput.value.toLowerCase();

      // Filtrar materiales en las categorías de Materiales y Fabricación
      filterMaterials(materialesCategory, searchTerm);
      filterMaterials(fabricacionCategory, searchTerm);
  });

  // Función para filtrar materiales en una categoría específica
  function filterMaterials(category, term) {
      const materials = category.querySelectorAll('.material');

      materials.forEach(material => {
          const title = material.querySelector('h3').textContent.toLowerCase();
          // Mostrar u ocultar materiales según el término de búsqueda
          material.style.display = title.includes(term) ? 'flex' : 'none';
      });
  }


  //terminos y condiciones mostrar u ocultar
  const terminos = document.getElementById('terminos');
  const privacidad = document.getElementById('privacidad');
  const closeTerminos = document.getElementById('close-terminos');
  const closePrivacidad = document.getElementById('close-privacidad');
  const btnTerminos = document.getElementById('btnTerminos');
  const btnPrivacidad = document.getElementById('btnPrivacidad');


// Agregar un evento al botón para mostrar los términos
btnTerminos.addEventListener('click', (event) => {
    // Prevenir el comportamiento predeterminado del enlace
    event.preventDefault();
    // Mostrar los términos agregando la clase 'active'
    terminos.classList.add('active');
  });
  
  // Agregar un evento al botón para mostrar la política de privacidad
  btnPrivacidad.addEventListener('click', (event) => {
    // Prevenir el comportamiento predeterminado del enlace
    event.preventDefault();
    console.log("hola")
    // Mostrar la política de privacidad agregando la clase 'active'
    privacidad.classList.add('active');
  });
  
  // Agregar un evento al botón de cerrar términos para ocultar los términos
  closeTerminos.addEventListener('click', () => {
    // Ocultar los términos eliminando la clase 'active'
    terminos.classList.remove('active');
  });
  
  // Agregar un evento al botón de cerrar privacidad para ocultar la política de privacidad
  closePrivacidad.addEventListener('click', () => {
    // Ocultar la política de privacidad eliminando la clase 'active'
    privacidad.classList.remove('active');
  });
