document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("menu-sitio");

    if (!contenedor) return;

    // Enlaces de navegación del sitio
    const enlaces = [
        { nombre: "Inicio", url: "index.html" },
        { nombre: "Beneficios", url: "beneficios.html" },
        { nombre: "Turismo", url: "turismo.html" },
        { nombre: "Formularios", url: "formularios.html" },
        { nombre: "Afiliación y empadronamiento", url: "afiliacionyempadronamiento.html" },
        { nombre: "Newsletters", url: "newsletters.html" },
        { nombre: "Oficinas sindicales", url: "oficinas.html" }
    ];

    // Crear cada enlace de navegación
    const crearEnlace = (enlace) => {
        const a = document.createElement("a");
        a.href = enlace.url;
        a.textContent = enlace.nombre;

        const paginaActual = location.pathname.split("/").pop() || "index.html";

        if (paginaActual === enlace.url) {
            a.setAttribute("aria-current", "page");
        }

        return a;
    };

    // Contenedor principal de navegación
    const nav = document.createElement("nav");
    nav.className = "navegacion-sitio";
    nav.setAttribute("aria-label", "Navegación principal");

    // Menú de computadora: todas las opciones visibles
    const escritorio = document.createElement("div");
    escritorio.className = "menu-escritorio";

    enlaces.forEach(enlace => {
        escritorio.appendChild(crearEnlace(enlace));
    });

    // Menú de celular: ícono de hamburguesa
    const movil = document.createElement("details");
    movil.className = "menu-movil";

    const botonMovil = document.createElement("summary");
    botonMovil.setAttribute("aria-label", "Abrir menú de navegación");
    botonMovil.setAttribute("title", "Menú");

    const icono = document.createElement("span");
    icono.className = "icono-hamburguesa";
    icono.setAttribute("aria-hidden", "true");

    botonMovil.appendChild(icono);
    movil.appendChild(botonMovil);

    // Opciones desplegables del menú de celular
    const opcionesMovil = document.createElement("div");
    opcionesMovil.className = "menu-opciones";

    enlaces.forEach(enlace => {
        opcionesMovil.appendChild(crearEnlace(enlace));
    });

    movil.appendChild(opcionesMovil);

    // Incorporar ambos menús a la página
    nav.appendChild(escritorio);
    nav.appendChild(movil);
    contenedor.appendChild(nav);

    // Alinear la hamburguesa con el título en páginas internas
    if (!document.body.classList.contains("pagina-inicio")) {
        const titulo = document.querySelector("main > h1");

        if (titulo) {
            const actualizarPosicion = () => {
                if (window.innerWidth <= 600) {
                    const posicionTitulo = titulo.getBoundingClientRect();
                    const posicionBody = document.body.getBoundingClientRect();

                    contenedor.style.top =
                        (posicionTitulo.top - posicionBody.top +
                            (posicionTitulo.height - 36) / 2 - 12) + "px";
                } else {
                    contenedor.style.top = "";
                }
            };

            actualizarPosicion();
            window.addEventListener("resize", actualizarPosicion);
        }
    }

    // Botón flotante para volver al inicio de la página
    const botonArriba = document.createElement("button");
    botonArriba.className = "boton-volver-arriba";
    botonArriba.type = "button";
    botonArriba.setAttribute("aria-label", "Volver arriba");
    botonArriba.setAttribute("title", "Volver arriba");
    botonArriba.innerHTML = "&#8593;";

    document.body.appendChild(botonArriba);

    // Mostrar el botón cuando se baja por la página
    const actualizarBotonArriba = () => {
        botonArriba.classList.toggle(
            "visible",
            window.scrollY > 300
        );
    };

    window.addEventListener("scroll", actualizarBotonArriba, { passive: true });
    actualizarBotonArriba();

    // Regresar suavemente al principio
    botonArriba.addEventListener("click", () => {
        const movimientoReducido = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        window.scrollTo({
            top: 0,
            behavior: movimientoReducido ? "auto" : "smooth"
        });
    });
});
