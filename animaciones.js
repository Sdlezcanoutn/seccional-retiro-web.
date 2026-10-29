/* ========================================
   1. ANIMACIONES AL DESPLAZARSE
======================================== */

/* Tarjetas de los catálogos de la miniweb */
document.addEventListener("DOMContentLoaded", () => {

    const elementos = document.querySelectorAll(
        ".catalogo-tarjetas .tarjeta-catalogo, " +
        ".pagina-beneficio .documentacion-tramite, " +
        ".pagina-beneficio .formulario-tramite"
    );

    if (!("IntersectionObserver" in window)) {
        return;
    }

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elementos.forEach((elemento) => {
        elemento.classList.add("animacion-scroll");
        observador.observe(elemento);
    });

});