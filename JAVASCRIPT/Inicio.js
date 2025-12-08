
document.addEventListener("DOMContentLoaded", () => {
    const botonBuscar = document.getElementById("boton-buscar");
    const inputBusqueda = document.querySelector(".campo-busqueda");
    const selectorZona = document.getElementById("selector-zona");

    botonBuscar.addEventListener("click", () => {
        const termino = inputBusqueda.value.trim();
        const zonaSeleccionada = selectorZona.options[selectorZona.selectedIndex].text;

        // Guardamos los criterios en localStorage
        localStorage.setItem("busquedaNombre", termino);
        localStorage.setItem("busquedaZona", zonaSeleccionada);

        // Redirigimos a distribuidora.html
        window.location.href = "./Distribuidoras.html";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Selecciona todos los botones de navegación (clase común: boton-nav)
    const botonesNav = document.querySelectorAll(".boton-nav");

    // Función que recibe el tipo a filtrar (por ejemplo: "Agencia", "Distribuidora", "Importadora")
    function filtrarPorTipo(tipo) {
        const tarjetas = document.querySelectorAll(".tarjeta-negocio");

        // Normalizamos para comparar sin importar mayúsculas/minúsculas
        const tipoNormal = tipo.trim().toLowerCase();

        tarjetas.forEach(tarjeta => {
            const tipoElem = tarjeta.querySelector(".tipo-distribuidor");
            const tipoTexto = tipoElem ? tipoElem.textContent.trim().toLowerCase() : "";

            // Queremos ocultar/mostrar el elemento <a> que envuelve la tarjeta
            const wrapper = tarjeta.closest("a") || tarjeta.parentElement;

            if (tipoNormal === "todos" || tipoTexto === tipoNormal) {
                // Mostrar
                if (wrapper) wrapper.style.display = ""; // deja que CSS original controle la presentación
                else tarjeta.style.display = "";
            } else {
                // Ocultar
                if (wrapper) wrapper.style.display = "none";
                else tarjeta.style.display = "none";
            }
        });
    }

    // Conectar eventos a cada botón, determinando el tipo a partir de su clase o texto
    botonesNav.forEach(boton => {
        boton.addEventListener("click", () => {
            // Intenta deducir el tipo desde una de las clases específicas si existen
            // (tu HTML tenía: <button class="boton-nav Agencia">, <button class="boton-nav Distribuidoras">, ...)
            let tipo = "";
            if (boton.classList.contains("Agencia")) tipo = "Agencia";
            else if (boton.classList.contains("Distribuidoras")) tipo = "Distribuidora"; // normalizamos plural -> singular
            else if (boton.classList.contains("Importadora")) tipo = "Importadora";
            else {
                // fallback: usar el texto del botón (por ejemplo "Agencias", "Distribuidoras" -> normalizamos)
                tipo = boton.textContent.trim();
                // si viene en plural, opcionalmente convertir "Agencias" -> "Agencia"
                if (tipo.toLowerCase().endsWith("s")) tipo = tipo.slice(0, -1);
            }

            filtrarPorTipo(tipo);
        });
    });

}); 
