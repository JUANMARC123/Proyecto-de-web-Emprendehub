// ../JAVASCRIPT/Inicio.js

document.addEventListener("DOMContentLoaded", function () {
    console.log("EmprendeHub - Página cargada correctamente");

    /* ==========================================
       1. CARRUSEL DE CATEGORÍAS
    (horizontal)
    ========================================== */
    const listaCategorias = document.querySelector(".lista-categorias");
    const btnAtras = document.querySelector(".boton-carrusel.atras");
    const btnAdelante = document.querySelector(".boton-carrusel.adelante");

    const scrollAmount = 300; // píxeles que se desplaza cada vez (ajusta según tu diseño)

    btnAdelante.addEventListener("click", () => {
        listaCategorias.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    btnAtras.addEventListener("click", () => {
        listaCategorias.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    // Opcional: desplazamiento con rueda del ratón (horizontal)
    listaCategorias.addEventListener("wheel", (e) => {
        e.preventDefault();
        listaCategorias.scrollLeft += e.deltaY;
    });

    /* ==========================================
       2. FILTROS SUPERIORES (Agencias, Distribuidoras, Importadoras)
    ========================================== */
    const botonesNav = document.querySelectorAll(".boton-nav");

    botonesNav.forEach(boton => {
        boton.addEventListener("click", function () {
            // Quitar clase activa de todos
            botonesNav.forEach(b => b.classList.remove("activo"));

            // Añadir clase activa al clicado
            this.classList.add("activo");

            const tipoSeleccionado = this.textContent.trim();
            console.log(`Filtro seleccionado: ${tipoSeleccionado}`);

            // Aquí puedes filtrar las tarjetas de negocio
            filtrarNegocios(tipoSeleccionado, obtenerTextoBusqueda(), obtenerZonaSeleccionada());
        });
    });

    /* ==========================================
       3. BÚSQUEDA EN TIEMPO REAL (texto + zona)
    ========================================== */
    const campoBusqueda = document.querySelector(".campo-busqueda");
    const selectorZona = document.querySelector("#selector-zona");
    const botonBuscar = document.querySelector("#boton-buscar");

    // Función auxiliar para obtener el texto de búsqueda
    function obtenerTextoBusqueda() {
        return campoBusqueda.value.trim().toLowerCase();
    }

    // Función auxiliar para obtener la zona seleccionada
    function obtenerZonaSeleccionada() {
        return selectorZona.value; // devuelve "" si no hay nada seleccionado
    }

    // Búsqueda al escribir
    campoBusqueda.addEventListener("input", () => {
        filtrarNegocios(obtenerTipoActivo(), obtenerTextoBusqueda(), obtenerZonaSeleccionada());
    });

    // Búsqueda al cambiar zona
    selectorZona.addEventListener("change", () => {
        filtrarNegocios(obtenerTipoActivo(), obtenerTextoBusqueda(), obtenerZonaSeleccionada());
    });

    // Búsqueda al pulsar el botón grande
    botonBuscar.addEventListener("click", () => {
        filtrarNegocios(obtenerTipoActivo(), obtenerTextoBusqueda(), obtenerZonaSeleccionada());
        console.log("Búsqueda realizada:", {
            texto: obtenerTextoBusqueda(),
            zona: selectorZona.options[selectorZona.selectedIndex]?.text || "Todas",
            tipo: obtenerTipoActivo()
        });
    });

    // Función que devuelve el texto del botón activo (o "Todos" si ninguno)
    function obtenerTipoActivo() {
        const activo = document.querySelector(".boton-nav.activo");
        return activo ? activo.textContent.trim() : "Todos";
    }

    /* ==========================================
       4. FILTRADO DE TARJETAS DE NEGOCIO (ejemplo básico)
    ========================================== */
    const todasLasTarjetas = document.querySelectorAll(".tarjeta-negocio");

    function filtrarNegocios(tipo = "Todos", texto = "", zona = "") {
        todasLasTarjetas.forEach(tarjeta => {
            const nombre = tarjeta.querySelector(".nombre-distribuidora")?.textContent.toLowerCase() || "";
            const categoria = tarjeta.querySelector(".categoria-distribuidora")?.textContent.toLowerCase() || "";
            const tipoTarjeta = tarjeta.querySelector(".tipo-distribuidor")?.textContent || "Distribuidor";
            const zonaTarjeta = tarjeta.querySelector(".info-negocio p:last-child")?.textContent || "";

            const coincideTexto = nombre.includes(texto) || categoria.includes(texto);
            const coincideTipo = tipo === "Todos" || tipoTarjeta.includes(tipo);
            const coincideZona = zona === "" || zonaTarjeta.includes(zona);

            if (coincideTexto && coincideTipo && coincideZ) {
                tarjeta.style.display = "flex";
            } else {
                tarjeta.style.display = "none";
            }
        });
    }

    // Al cargar la página mostramos todas
    filtrarNegocios();

    /* ==========================================
       5. CLIC EN CATEGORÍAS
    ========================================== */
    const tarjetasCategoria = document.querySelectorAll(".tarjeta-categoria");

    tarjetasCategoria.forEach(tarjeta => {
        tarjeta.addEventListener("click", function () {
            // Quitar selección anterior
            tarjetasCategoria.forEach(t => t.classList.remove("seleccionada"));

            // Marcar como seleccionada
            this.classList.add("seleccionada");

            const nombreCategoria = this.querySelector("span").textContent;
            console.log("Categoría seleccionada:", nombreCategoria);

            // Aquí puedes cargar los destacados de esa categoría
            // Por ejemplo: cargarDestacados(nombreCategoria);
        });
    });

    /* ==========================================
       6. EFECTOS VISUALES (hover en tarjetas)
    ========================================== */
    document.querySelectorAll(".tarjeta-negocio, .tarjeta-categoria").forEach(el => {
        el.addEventListener("mouseenter", () => el.style.transform = "translateY(-4px)");
        el.addEventListener("mouseleave", () => el.style.transform = "translateY(0)");
    });

    /* ==========================================
       7. BOTÓN "MÁS CATEGORÍAS" (scroll suave al carrusel)
    ========================================== */
    const botonMasCategorias = document.querySelector(".boton-grande");
    if (botonMasCategorias) {
        botonMasCategorias.addEventListener("click", () => {
            document.querySelector(".seccion-categorias").scrollIntoView({ behavior: "smooth" });
        });
    }



});