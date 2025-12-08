let mapa; // variable global
let marcadores = [];

function initMap() {
    const mapaDiv = document.getElementById("mapaReal");

    mapa = new google.maps.Map(mapaDiv, {
        center: { lat: -16.529, lng: -68.169 },
        zoom: 12
    });

    document.getElementById("zoomMas").addEventListener("click", () => mapa.setZoom(mapa.getZoom() + 1));
    document.getElementById("zoomMenos").addEventListener("click", () => mapa.setZoom(mapa.getZoom() - 1));

    actualizarMarcadores();
}

function actualizarMarcadores() {
    marcadores.forEach(m => m.setMap(null));
    marcadores = [];

    const tarjetas = document.querySelectorAll(".tarjeta-distribuidora");

    tarjetas.forEach(tarjeta => {
        if (tarjeta.style.display === "none") return;

        const coordenadas = tarjeta.getAttribute("data-coordenadas");
        if (!coordenadas) return;

        const [lat, lng] = coordenadas.split(",").map(Number);

        const marcador = new google.maps.Marker({
            position: { lat, lng },
            map: mapa,
            title: tarjeta.querySelector("h3").textContent
        });

        const info = new google.maps.InfoWindow({
            content: `<strong>${tarjeta.querySelector("h3").textContent}</strong><br>
                      ${tarjeta.querySelector("p:nth-of-type(1)").textContent}<br>
                      ${tarjeta.querySelector("p:nth-of-type(2)").textContent}`
        });

        marcador.addListener("click", () => info.open(mapa, marcador));
        marcadores.push(marcador);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const inputBusqueda = document.querySelector(".campo-busqueda input");
    const selectZona = document.querySelector(".filtro-zona select");
    const selectCategoria = document.querySelector(".filtro-categoria select");
    const botonWhatsApp = document.querySelector(".boton-whatsapp");
    const listaResultados = document.querySelector(".lista-resultados");

    // Recuperamos búsqueda previa desde localStorage
    const busquedaNombre = localStorage.getItem("busquedaNombre")?.toLowerCase() || "";
    const busquedaZona = localStorage.getItem("busquedaZona")?.toLowerCase() || "";

    botonWhatsApp.dataset.activado = "false";

    function filtrarResultados() {
        const textoBusqueda = inputBusqueda.value.toLowerCase() || busquedaNombre;
        const zonaSeleccionada = selectZona.value.toLowerCase() || busquedaZona;
        const categoriaSeleccionada = selectCategoria.value.toLowerCase();
        const filtrarWhatsApp = botonWhatsApp.dataset.activado === "true";

        const tarjetas = listaResultados.querySelectorAll(".tarjeta-distribuidora");
        let contador = 0;

        tarjetas.forEach(tarjeta => {
            const nombre = tarjeta.querySelector("h3").textContent.toLowerCase();
            const zona = tarjeta.querySelector("p:nth-of-type(2)").textContent.toLowerCase();
            const categoria = tarjeta.querySelector("p:nth-of-type(1)").textContent.toLowerCase();
            const whatsapp = tarjeta.querySelector("p:nth-of-type(5)")?.textContent.toLowerCase() || "";

            const cumpleNombre = nombre.includes(textoBusqueda);
            const cumpleZona = zonaSeleccionada === "zona" || zonaSeleccionada === "" || zona.includes(zonaSeleccionada);
            const cumpleCategoria = categoriaSeleccionada === "categoría" || categoriaSeleccionada === "" || categoria.includes(categoriaSeleccionada);
            const cumpleWhatsApp = !filtrarWhatsApp || whatsapp.includes("si tiene");

            if (cumpleNombre && cumpleZona && cumpleCategoria && cumpleWhatsApp) {
                tarjeta.style.display = "block";
                contador++;
            } else {
                tarjeta.style.display = "none";
            }
        });

        // Actualizamos el título de resultados
        listaResultados.querySelector("h2").textContent = `Resultados (${contador})`;

        // Actualizamos los marcadores del mapa
        if (typeof actualizarMarcadores === "function") {
            actualizarMarcadores();
        }
    }

    // Eventos
    inputBusqueda.addEventListener("input", filtrarResultados);
    selectZona.addEventListener("change", filtrarResultados);
    selectCategoria.addEventListener("change", filtrarResultados);

    botonWhatsApp.addEventListener("click", () => {
        botonWhatsApp.dataset.activado = botonWhatsApp.dataset.activado === "true" ? "false" : "true";
        botonWhatsApp.textContent = botonWhatsApp.dataset.activado === "true" ? "Solo con WhatsApp" : "Con WhatsApp Directo";
        filtrarResultados();
    });

    // Ejecutar filtrado inicial
    filtrarResultados();
});
