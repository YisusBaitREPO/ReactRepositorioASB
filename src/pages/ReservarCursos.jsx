
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIdioma } from "../context/IdiomaContext";
import { obtenerCursos } from "../JS/apiCursosASB.js";
import "../CSS/reservarCursos.css";

export default function ReservarCursos() {

    const { idioma } = useIdioma();
    const navegar = useNavigate();

    const [cursos, setCursos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(true);

    // CARGAR LOS CURSOS DEL JSON
    useEffect(() => {

        async function cargarCursos() {
            const datos = await obtenerCursos();

            setCursos(datos);
            setCargando(false);
        }

        cargarCursos();

    }, []);

    // CONFIGURACIÓN REGIONAL
    const configuracion = {
        es: {
            locale: "es-PE",
            moneda: "PEN"
        },
        en: {
            locale: "en-US",
            moneda: "USD"
        },
        fr: {
            locale: "fr-FR",
            moneda: "EUR"
        }
    };

    const region = configuracion[idioma] || configuracion.es;

    // FORMATO DE PRECIO
    function formatearPrecio(precio) {

        return new Intl.NumberFormat(region.locale, {
            style: "currency",
            currency: region.moneda
        }).format(precio);

    }

    // FILTRAR CURSOS
    const cursosFiltrados = cursos.filter((curso) => {

        const nombre = curso.nombre.toLowerCase();
        const categoria = curso.categoria.toLowerCase();
        const texto = busqueda.toLowerCase();

        return nombre.includes(texto) || categoria.includes(texto);

    });

    // ABRIR VENTANA DEL CURSO
    function abrirCurso(curso) {

        setCursoSeleccionado(curso);
        setCantidad(1);
        setMensaje("");

    }

    // CERRAR VENTANA
    function cerrarCurso() {

        setCursoSeleccionado(null);
        setCantidad(1);

    }

    // AGREGAR UNA UNIDAD
    function agregarUnidad() {

        if (cantidad < cursoSeleccionado.stock) {
            setCantidad(cantidad + 1);
        }

    }

    // QUITAR UNA UNIDAD
    function quitarUnidad() {

        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }

    }

    // CALCULAR TOTAL
    const total = cursoSeleccionado
        ? cursoSeleccionado.precioMensual * cantidad
        : 0;

    // CONTINUAR COMO INVITADO
    function continuarInvitado() {

        const fecha = new Intl.DateTimeFormat(region.locale, {
            dateStyle: "long",
            timeStyle: "short"
        }).format(new Date());

        setMensaje(
            "¡Operación completada correctamente! " +
            "Fecha y hora: " + fecha +
            ". Total: " + formatearPrecio(total) +
            ". (Simulación)"
        );

        cerrarCurso();

    }

    // IR A CONTACTO
    function pagarAhora() {

        navegar("/contacto", {
            state: {
                curso: cursoSeleccionado.nombre,
                cantidad: cantidad,
                total: formatearPrecio(total)
            }
        });

    }

    return (

        <section className="seccion reservar-seccion">

            <div className="contenedor">

                <div className="titulo-seccion">

                    <p className="subtitulo">
                        {idioma === "en"
                            ? "LEARN SOMETHING NEW"
                            : idioma === "fr"
                                ? "APPRENEZ QUELQUE CHOSE DE NOUVEAU"
                                : "APRENDE ALGO NUEVO"}
                    </p>

                    <h1>
                        {idioma === "en"
                            ? "Explore our courses"
                            : idioma === "fr"
                                ? "Explorez nos cours"
                                : "Explora nuestros cursos"}
                    </h1>

                    <p>
                        {idioma === "en"
                            ? "Find the course that best suits you."
                            : idioma === "fr"
                                ? "Trouvez le cours qui vous convient le mieux."
                                : "Encuentra el curso que mejor se adapte a ti."}
                    </p>

                </div>

                {/* BUSCADOR */}

                <div className="buscador-cursos">

                    <label htmlFor="buscarCurso">
                        {idioma === "en"
                            ? "Search courses"
                            : idioma === "fr"
                                ? "Rechercher des cours"
                                : "Buscar cursos"}
                    </label>

                    <input
                        type="search"
                        id="buscarCurso"
                        placeholder={
                            idioma === "en"
                                ? "Type a course name or category..."
                                : idioma === "fr"
                                    ? "Saisissez un cours ou une catégorie..."
                                    : "Escribe el nombre o categoría de un curso..."
                        }
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />

                </div>

                {/* LISTADO DE CURSOS */}

                {cargando ? (

                    <p className="mensaje-cursos">
                        {idioma === "en"
                            ? "Loading courses..."
                            : idioma === "fr"
                                ? "Chargement des cours..."
                                : "Cargando cursos..."}
                    </p>

                ) : cursosFiltrados.length > 0 ? (

                    <div className="reservar-grid">

                        {cursosFiltrados.map((curso) => (

                            <button
                                type="button"
                                className="tarjeta-reservar"
                                key={curso.id}
                                onClick={() => abrirCurso(curso)}
                            >

                                <img
                                    src={curso.imagen}
                                    alt={curso.nombre}
                                    loading="lazy"
                                />

                                <div className="tarjeta-reservar-contenido">

                                    <span className="categoria-curso">
                                        {curso.categoria}
                                    </span>

                                    <h2>{curso.nombre}</h2>

                                    <p>
                                        {idioma === "en"
                                            ? "Available places:"
                                            : idioma === "fr"
                                                ? "Places disponibles :"
                                                : "Disponibilidad:"}
                                        {" "}{curso.stock}
                                    </p>

                                    <strong>
                                        {formatearPrecio(curso.precioMensual)}
                                        {" / "}
                                        {idioma === "en"
                                            ? "month"
                                            : idioma === "fr"
                                                ? "mois"
                                                : "mes"}
                                    </strong>

                                </div>

                            </button>

                        ))}

                    </div>

                ) : (

                    <p className="mensaje-cursos">
                        {idioma === "en"
                            ? "No matches were found"
                            : idioma === "fr"
                                ? "Aucun résultat trouvé"
                                : "No se encontraron coincidencias"}
                    </p>

                )}

            </div>

            {/* VENTANA FLOTANTE */}

            {cursoSeleccionado && (

                <div
                    className="modal-fondo"
                    onClick={cerrarCurso}
                >

                    <div
                        className="modal-curso"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="tituloModalCurso"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <button
                            type="button"
                            className="modal-cerrar"
                            onClick={cerrarCurso}
                            aria-label={
                                idioma === "en"
                                    ? "Close"
                                    : idioma === "fr"
                                        ? "Fermer"
                                        : "Cerrar"
                            }
                        >
                            ×
                        </button>

                        <img
                            className="modal-imagen"
                            src={cursoSeleccionado.imagen}
                            alt={cursoSeleccionado.nombre}
                        />

                        <span className="categoria-curso">
                            {cursoSeleccionado.categoria}
                        </span>

                        <h2 id="tituloModalCurso">
                            {cursoSeleccionado.nombre}
                        </h2>

                        <p>{cursoSeleccionado.descripcion}</p>

                        <p>
                            {idioma === "en"
                                ? "Available places:"
                                : idioma === "fr"
                                    ? "Places disponibles :"
                                    : "Stock disponible:"}
                            {" "}{cursoSeleccionado.stock}
                        </p>

                        <strong>
                            {formatearPrecio(cursoSeleccionado.precioMensual)}
                            {" / "}
                            {idioma === "en"
                                ? "month"
                                : idioma === "fr"
                                    ? "month"
                                    : "mes"}
                        </strong>

                        {/* CANTIDAD */}

                        <div className="cantidad-cursos">

                            <span>
                                {idioma === "en"
                                    ? "Quantity:"
                                    : idioma === "fr"
                                        ? "Quantité :"
                                        : "Cantidad:"}
                            </span>

                            <button
                                type="button"
                                onClick={quitarUnidad}
                                disabled={cantidad <= 1}
                                aria-label="Disminuir cantidad"
                            >
                                −
                            </button>

                            <span>{cantidad}</span>

                            <button
                                type="button"
                                onClick={agregarUnidad}
                                disabled={cantidad >= cursoSeleccionado.stock}
                                aria-label="Aumentar cantidad"
                            >
                                +
                            </button>

                        </div>

                        {/* TOTAL */}

                        <div className="total-cursos">

                            <span>
                                {idioma === "en"
                                    ? "Total:"
                                    : idioma === "fr"
                                        ? "Total :"
                                        : "Total:"}
                            </span>

                            <strong>{formatearPrecio(total)}</strong>

                        </div>

                        <div className="acciones-modal">

                            <button
                                type="button"
                                onClick={pagarAhora}
                                className="boton-pagar"
                            >
                                {idioma === "en"
                                    ? "Pay now"
                                    : idioma === "fr"
                                        ? "Payer maintenant"
                                        : "Pagar ahora"}
                            </button>

                            <button
                                type="button"
                                onClick={continuarInvitado}
                                className="boton-invitado"
                            >
                                {idioma === "en"
                                    ? "Continue as guest"
                                    : idioma === "fr"
                                        ? "Continuer en tant qu'invité"
                                        : "Continuar como invitado"}
                            </button>

                        </div>

                    </div>

                </div>

            )}

            {/* MENSAJE DE CONFIRMACIÓN */}

            {mensaje && (

                <div className="mensaje-exito" role="status">

                    <p>{mensaje}</p>

                    <button
                        type="button"
                        onClick={() => setMensaje("")}
                    >
                        {idioma === "en"
                            ? "Close"
                            : idioma === "fr"
                                ? "Fermer"
                                : "Cerrar"}
                    </button>

                </div>

            )}

        </section>

    );

}
