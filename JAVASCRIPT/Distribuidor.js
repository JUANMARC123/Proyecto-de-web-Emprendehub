
let map;
let zoomActual = 15; // Zoom inicial

function initMapaReal() {
    const mapaDiv = document.getElementById("mapaReal");

    // Leer coordenadas desde el atributo data-coordenadas
    const coords = mapaDiv.getAttribute("data-coordenadas").split(",");
    const latitud = parseFloat(coords[0]);
    const longitud = parseFloat(coords[1]);

    const ubicacion = { lat: latitud, lng: longitud };

    // Crear mapa
    map = new google.maps.Map(mapaDiv, {
        center: ubicacion,
        zoom: zoomActual,
    });

    // Crear marcador
    new google.maps.Marker({
        position: ubicacion,
        map: map,
        title: "Ubicación de la empresa"
    });

    // Zoom personalizado
    document.getElementById("zoomMas").addEventListener("click", () => {
        zoomActual++;
        map.setZoom(zoomActual);
    });

    document.getElementById("zoomMenos").addEventListener("click", () => {
        zoomActual--;
        map.setZoom(zoomActual);
    });
}

// Iniciar mapa cuando cargue la página
window.onload = initMapaReal;

