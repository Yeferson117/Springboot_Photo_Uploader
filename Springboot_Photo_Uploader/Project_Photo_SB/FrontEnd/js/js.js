// Toma de datos
const form = document.getElementById("form");
const photoInput = document.getElementById("photoInput");
const photoContainer = document.getElementById("photoContainer");
const photoPreview = document.getElementById("photoPreview");

// Vista previa de la imagen subida
photoInput.addEventListener("change", function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            photoPreview.src = e.target.result;
            photoPreview.style.display = 'block';
        };

        reader.readAsDataURL(file);
    } else {
        photoPreview.src = '';
        photoPreview.style.display = 'none';
    }
});

// Fetch para guardar la imagen en formato BLOB
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const file = photoInput.files[0]; // Obtener el archivo de imagen

    if (!file) {
        alert("No se ha seleccionado ninguna imagen.");
        return;
    }

    const formData = new FormData();
    formData.append('image', file); // Agregar el archivo al FormData

    fetch('http://localhost:8080/api/offer', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Se ha guardado la oferta');
        GetOffers(); // Cargar las ofertas después de guardar
        location.href = "index.html"; // Redirigir después de guardar
    })
    .catch(error => {
        alert("Hubo un problema al subir la imagen");
        console.error('Hubo un problema al guardar la oferta:', error);
    });
});

// Función para obtener las imágenes de la DB
function GetOffers() {
    photoContainer.innerHTML = '';
    fetch('http://localhost:8080/api/offer', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(i => {
            const photoDiv = document.createElement('div');
            photoDiv.className = 'photoContainer';
            
            const img = document.createElement('img');
            img.src = `data:image/jpeg;base64,${i.image}`; // Asumiendo que se almacena como Base64
            img.alt = 'Image';
            img.className = 'photo';
            
            // Añadir la imagen al div
            photoDiv.appendChild(img);
            
            // Añadir el div al contenedor
            photoContainer.appendChild(photoDiv);
        });
        console.log('Se han cargado las ofertas');
    })
    .catch(error => {
        console.error('Error al cargar las ofertas:', error);
    });
}