const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const contenedor = document.getElementById('contenedor');

// Agregamos adEventListener para el buscador.
btnBuscar.addEventListener('click', () => {
  const searchText = inputBuscar.value.trim();
  if (searchText !== '') {
    const apiUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(
      searchText
    )}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Limpia el campo de entrada.
        contenedor.innerHTML = '';

        // Comprueba si se encontró alguna imagen.
        if (data.collection.items.length > 0) {
          // Itera sobre las imágenes y muestra su información.
          data.collection.items.forEach(item => {
            const image = item.links.find(link => link.rel === 'preview');
            const title = item.data[0].title;
            const description = item.data[0].description;
            const dateCreated = item.data[0].date_created;

            // Crea elementos HTML para mostrar la imagen y su información.
            const imageElement = document.createElement('img');
            imageElement.src = image.href;

            const titleElement = document.createElement('h2');
            titleElement.textContent = title;

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = description;

            const dateElement = document.createElement('p');
            dateElement.textContent = 'Fecha de creacion: ' + dateCreated;

            // Agregar los elementos al contenedor.
            contenedor.appendChild(imageElement);
            contenedor.appendChild(titleElement);
            contenedor.appendChild(descriptionElement);
            contenedor.appendChild(dateElement);
          });
        } else {
          // Mensaje por si no hay imagenes encontradas.
          contenedor.textContent = 'No se encontraron imágenes de la busqueda.';
        }
      })
      .catch(error => {
        console.log('Ocurrio un error:', error);
      });
  }
});