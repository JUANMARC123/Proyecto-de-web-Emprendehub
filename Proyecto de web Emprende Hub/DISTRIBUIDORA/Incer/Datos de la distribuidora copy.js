
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

const datosDistribuidora = {
    nombre: "Distribuidora El Sol",
    categoria: "Bebidas y Licores",
    logo: "../IMAGENES/distribuidoras/el-sol-logo.jpg",
    fotos: [
        "../IMAGENES/distribuidoras/el-sol-1.jpg",
        "../IMAGENES/distribuidoras/el-sol-2.jpg",
        "../IMAGENES/distribuidoras/el-sol-3.jpg"
    ],
    descripcion: `Somos una distribuidora mayorista con más de 15 años de experiencia en La Paz - Bolivia. 
    Ofrecemos las mejores marcas de bebidas nacionales e importadas a precios muy competitivos. 
    Entregas rápidas en toda la ciudad y el altiplano.`,
    productosPopulares: [
        "Coca Cola 3L",
        "Paceña Imperial 1L",
        "Singani San Pedro",
        "Energizante Red Bull"
    ],
    direccion: "Av. Ballivián #1234, Calacoto, La Paz - Bolivia",
    horario: {
        lunesViernes: "08:00 - 19:00",
        sabado: "08:00 - 14:00",
        domingo: "Cerrado"
    },
    telefonos: ["+591 77712345", "+591 22267890"],
    whatsapp: "59177712345", // solo números, sin + ni guiones
    coordenadas: {
        lat: -16.5405,
        lng: -68.0845
    }
};

// =============================
// Cargar todos los datos en la página
// =============================
document.addEventListener("DOMContentLoaded", function () {
    // Nombre y categoría
    document.querySelector(".nombre-distribuidora").textContent = datosDistribuidora.nombre;
    document.querySelector(".categoria").textContent = datosDistribuidora.categoria;

    // Logo
    document.getElementById("logoDistribuidora").src = datosDistribuidora.logo;

    // Galería de fotos
    const galeria = document.querySelector(".galeria-productos");
    galeria.innerHTML = ""; // limpiamos las imágenes de ejemplo
    datosDistribuidora.fotos.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Foto de la distribuidora";
        img.classList.add("imagen-producto");
        galeria.appendChild(img);
    });

    // Descripción
    document.querySelector(".parrafo-descripcion").textContent = datosDistribuidora.descripcion;

    // Productos populares
    const listaProductos = document.querySelector(".lista-productos");
    listaProductos.innerHTML = "";
    datosDistribuidora.productosPopulares.forEach(prod => {
        const li = document.createElement("li");
        li.classList.add("item-producto");
        li.textContent = prod;
        listaProductos.appendChild(li);
    });

    // Dirección
    document.querySelector(".parrafo-direccion").textContent = datosDistribuidora.direccion;

    // Horarios
    document.querySelectorAll(".item-horario")[0].textContent = `Lunes a Viernes: ${datosDistribuidora.horario.lunesViernes}`;
    document.querySelectorAll(".item-horario")[1].textContent = `Sábado: ${datosDistribuidora.horario.sabado}`;
    document.querySelectorAll(".item-horario")[2].textContent = `Domingo: ${datosDistribuidora.horario.domingo}`;

    // Teléfonos
    const enlacesTel = document.querySelectorAll(".enlace-telefono");
    enlacesTel[0].href = "tel:" + datosDistribuidora.telefonos[0];
    enlacesTel[0].textContent = datosDistribuidora.telefonos[0];
    if (datosDistribuidora.telefonos[1]) {
        enlacesTel[1].href = "tel:" + datosDistribuidora.telefonos[1];
        enlacesTel[1].textContent = datosDistribuidora.telefonos[1];
    } else {
        enlacesTel[1].parentElement.style.display = "none";
    }

    // =============================
    // Botón WhatsApp
    // =============================
    document.querySelector(".boton-whatsapp").addEventListener("click", function () {
        const mensaje = encodeURIComponent(`¡Hola ${datosDistribuidora.nombre}! Me interesa conocer sus precios y productos.`);
        const url = `https://wa.me/${datosDistribuidora.whatsapp}?text=${mensaje}`;
        window.open(url, "_blank");
    });

    // =============================
    // Botón Compartir Perfil
    // =============================
    document.querySelector(".boton-compartir").addEventListener("click", async function () {
        const shareData = {
            title: datosDistribuidora.nombre + " - EmprendeHub",
            text: "Mira esta distribuidora en EmprendeHub",
            url: window.location.href
        };

        try {
            await navigator.share(shareData);
        } catch (err) {
            // Si el navegador no soporta Web Share API, copiamos al portapapeles
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert("Enlace copiado al portapapeles");
            });
        }
    });

    // =============================
    // Zoom simple del mapa (imagen simulada)
    // =============================
    const imagenMapa = document.querySelector(".imagen-mapa");
    let escala = 1;

    document.querySelector(".zoom-mas").addEventListener("click", () => {
        escala = Math.min(escala + 0.3, 3);
        imagenMapa.style.transform = `scale(${escala})`;
    });

    document.querySelector(".zoom-menos").addEventListener("click", () => {
        escala = Math.max(escala - 0.3, 1);
        imagenMapa.style.transform = `scale(${escala})`;
    });

    // =============================
    // Animaciones al hacer scroll (opcional pero bonito)
    // =============================
    const elementosAnimados = document.querySelectorAll('.articulo-perfil > section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elementosAnimados.forEach(el => observer.observe(el));
});