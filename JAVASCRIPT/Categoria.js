// =========================
//  CARRUSEL DE TARJETAS
// =========================

// Elementos
const carrusel = document.querySelector(".contenedor-categorias");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

let index = 0;
const tarjetas = document.querySelectorAll(".tarjeta-categoria");
const total = tarjetas.length;

// Ajustar ancho dinámico 
function actualizarCarrusel() {
    const anchoTarjeta = tarjetas[0].offsetWidth + 20; // margen
    carrusel.style.transform = `translateX(-${index * anchoTarjeta}px)`;
}

// Botón siguiente
btnNext.addEventListener("click", () => {
    if (index < total - 1) {
        index++;
        actualizarCarrusel();
    }
});

// Botón anterior
btnPrev.addEventListener("click", () => {
    if (index > 0) {
        index--;
        actualizarCarrusel();
    }
});

// =========================
//  BÚSQUEDA INTELIGENTE
// =========================

const inputBusqueda = document.getElementById("entrada-busqueda");

inputBusqueda.addEventListener("input", () => {
    const texto = inputBusqueda.value.toLowerCase();

    tarjetas.forEach(tarjeta => {
        const titulo = tarjeta.querySelector(".encabezado-categoria span")
            .textContent.toLowerCase();

        const coincide = titulo.includes(texto);

        tarjeta.style.display = coincide ? "block" : "none";
    });
});


// =========================
//  DESLIZAMIENTO TÁCTIL
// =========================

let startX = 0;

carrusel.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

carrusel.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50 && index < total - 1) {
        index++;
    } else if (endX - startX > 50 && index > 0) {
        index--;
    }

    actualizarCarrusel();
});
