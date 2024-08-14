//toma de datos

const form = document.getElementById("form");
const photo = document.getElementById("photoInput");
const photoContainer = document.getElementById("photoContainer");
const photoPreview = document.getElementById("photoPreview");

//vista previa de la imagen subida
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

//fetch para guardar la url de la imagen
form.addEventListener("submit", function(event){
    event.preventDefault();

    const url = photoPreview.src;

    const data = {
        url: url
    };

    fetch('http://localhost:8080/api/offer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Se ha guardado la oferta');
    })
    .catch(error => {
        alert("Hubo un problema al subir la imagen")
        console.error('hubo un problema al guardar la oferta ', error);
    });

    GetOffers();
    location.href = "index.html";
});

//funcion para obtener las imagenes de la DB
function GetOffers(){
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
            img.src = i.url;
            img.alt = 'Image';
            img.className = 'photo';
            
            // Añadir la imagen al div
            photoDiv.appendChild(img);
            
            // Añadir el div al contenedor
            photoContainer.appendChild(photoDiv);
        });
        console.log('se han cargado las ofertas');
    })
    .catch(error => {
        alert("El server esta Apagado")
        console.error('Error al cargar las ofertas: ', error);
    });
}