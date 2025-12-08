
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

document.addEventListener("DOMContentLoaded", () => {
    // Seleccionamos elementos
    const boton = document.querySelector(".boton-whatsapp");
    const telefonoEl = document.getElementById("telefono-principal");

    // Debug rápido si algo falta
    if (!telefonoEl) {
        console.error("No se encontró el elemento #telefono-principal");
        alert("Error: no se encontró el número en la página. Revisa el id telefono-principal.");
        return;
    }
    if (!boton) {
        console.error("No se encontró el botón .boton-whatsapp");
        alert("Error: no se encontró el botón de WhatsApp. Revisa la clase boton-whatsapp.");
        return;
    }

    // Tomamos y normalizamos solo los dígitos del número
    let telefonoRaw = telefonoEl.textContent || telefonoEl.innerText || "";
    let telefono = telefonoRaw.replace(/\D/g, ""); // elimina todo lo que no sea dígito

    if (!telefono) {
        console.error("El número está vacío después de normalizar:", telefonoRaw);
        alert("Error: el número de teléfono está vacío o tiene formato inválido.");
        return;
    }

    // Si el usuario ya incluyó código de país, no lo duplicamos.
    // Si el número comienza con '591' (Bolivia) lo usamos tal cual; si comienza con '0' lo quitamos.
    if (telefono.startsWith("0")) {
        telefono = telefono.replace(/^0+/, "");
    }
    // Si el número ya tiene 591 al inicio, no añadimos. Si no, añadimos 591.
    const codigoPais = "591";
    const telefonoConPais = telefono.startsWith(codigoPais) ? telefono : codigoPais + telefono;

    // Hacemos que el link "tel" también funcione (opcional)
    if (telefonoEl.tagName.toLowerCase() === "a") {
        telefonoEl.setAttribute("href", "tel:" + telefono);
    }

    // Evento del botón
    boton.addEventListener("click", (e) => {
        e.preventDefault();
        const url = "https://wa.me/" + telefonoConPais;
        // Para depuración en consola:
        console.log("Abriendo WhatsApp URL:", url);
        // Abrir en nueva pestaña/ventana
        window.open(url, "_blank");
    });
});