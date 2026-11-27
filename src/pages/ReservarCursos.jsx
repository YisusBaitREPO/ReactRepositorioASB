
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIdioma } from "../context/IdiomaContext";
import { obtenerCursos } from "../JS/apiCursosASB.js";
import "../CSS/reservarCursos.css";

const CLAVE_CURSOS = "cursosASB_admin";
const CLAVE_CATEGORIAS = "categoriasASB_admin";

const formularioVacio = {
    nombre: "",
    categoria: "",
    stock: "",
    imagen: "",
    descripcion: "",
    precioMensual: ""
};

export default function ReservarCursos() {

    const { idioma, textos } = useIdioma();
    const navegar = useNavigate();
    const t = textos.reservarCursos;

    const [cursos, setCursos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    const [datosCargados, setDatosCargados] = useState(false);

    // CATÁLOGO
    const [busqueda, setBusqueda] = useState("");
    const [filtroCategoria, setFiltroCategoria] = useState("");

    // CARRITO
    const [carrito, setCarrito] = useState([]);
    const [cantidad, setCantidad] = useState(1);
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
    const [mensaje, setMensaje] = useState(null);

    // ADMINISTRACIÓN
    const [mostrarAdministracion, setMostrarAdministracion] = useState(false);
    const [busquedaAdmin, setBusquedaAdmin] = useState("");
    const [filtroCategoriaAdmin, setFiltroCategoriaAdmin] = useState("");
    const [formularioCurso, setFormularioCurso] = useState(formularioVacio);
    const [cursoEditando, setCursoEditando] = useState(null);

    // ADMINISTRACIÓN DE CATEGORÍAS
    const [nombreCategoria, setNombreCategoria] = useState("");
    const [categoriaEditando, setCategoriaEditando] = useState(null);

    // CONFIGURACIÓN REGIONAL
    const configuracion = {
        es: { locale: "es-PE", moneda: "PEN" },
        en: { locale: "en-US", moneda: "USD" },
        fr: { locale: "fr-FR", moneda: "EUR" }
    };

    const region = configuracion[idioma] || configuracion.es;

    // =====================================
    // CARGAR CURSOS Y CATEGORÍAS
    // =====================================

    useEffect(() => {

        async function cargarCursos() {

            try {

                const cursosGuardados = localStorage.getItem(CLAVE_CURSOS);
                const categoriasGuardadas = localStorage.getItem(CLAVE_CATEGORIAS);

                let datos;

                if (cursosGuardados) {

                    datos = JSON.parse(cursosGuardados);

                } else {

                    datos = await obtenerCursos();

                }

                if (!Array.isArray(datos) || datos.length === 0) {
                    throw new Error("No hay cursos disponibles");
                }

                setCursos(datos);

                let listaCategorias;

                if (categoriasGuardadas) {

                    listaCategorias = JSON.parse(categoriasGuardadas);

                } else {

                    listaCategorias = [
                        ...new Set(datos.map((curso) => curso.categoria))
                    ];

                }

                setCategorias(listaCategorias);

                setFormularioCurso((actual) => ({
                    ...actual,
                    categoria: listaCategorias[0] || ""
                }));

                setError(false);

            } catch (error) {

                console.error("Error al cargar cursos:", error);
                setError(true);

            } finally {

                setCargando(false);
                setDatosCargados(true);

            }

        }

        cargarCursos();

    }, []);

    // =====================================
    // GUARDAR CAMBIOS EN LOCALSTORAGE
    // =====================================

    useEffect(() => {

        if (!datosCargados) {
            return;
        }

        localStorage.setItem(CLAVE_CURSOS, JSON.stringify(cursos));
        localStorage.setItem(CLAVE_CATEGORIAS, JSON.stringify(categorias));

    }, [cursos, categorias, datosCargados]);

    // =====================================
    // TRADUCCIONES
    // =====================================

    function obtenerTextoCurso(curso, campo) {

        if (idioma === "es") {
            return curso[campo];
        }

        return curso.traducciones?.[idioma]?.[campo] || curso[campo];

    }

    function obtenerTextoCategoria(categoria) {

        const curso = cursos.find(
            (item) => item.categoria === categoria
        );

        if (curso) {
            return obtenerTextoCurso(curso, "categoria");
        }

        return categoria;

    }

    // =====================================
    // FORMATO DE PRECIOS
    // =====================================

    function formatearPrecio(precio) {

        return new Intl.NumberFormat(region.locale, {
            style: "currency",
            currency: region.moneda
        }).format(precio);

    }

    // =====================================
    // FILTRAR CATÁLOGO
    // =====================================

    const cursosFiltrados = cursos.filter((curso) => {

        const nombre = obtenerTextoCurso(curso, "nombre").toLowerCase();
        const categoria = obtenerTextoCurso(curso, "categoria").toLowerCase();

        const coincideBusqueda =
            nombre.includes(busqueda.toLowerCase()) ||
            categoria.includes(busqueda.toLowerCase());

        const coincideCategoria =
            filtroCategoria === "" ||
            curso.categoria === filtroCategoria;

        return coincideBusqueda && coincideCategoria;

    });

    // =====================================
    // DETALLES DEL CURSO
    // =====================================

    function abrirCurso(curso) {

        setCursoSeleccionado(curso);
        setCantidad(1);
        setMensaje(null);

    }

    function cerrarCurso() {

        setCursoSeleccionado(null);
        setCantidad(1);

    }

    // =====================================
    // CARRITO
    // =====================================

    function agregarAlCarrito() {

        const cursoEnCarrito = carrito.find(
            (item) => item.curso.id === cursoSeleccionado.id
        );

        const cantidadActual = cursoEnCarrito
            ? cursoEnCarrito.cantidad
            : 0;

        if (cantidadActual + cantidad > cursoSeleccionado.stock) {

            setMensaje({
                tipo: "error",
                texto: t.sinStock
            });

            return;

        }

        if (cursoEnCarrito) {

            setCarrito(carrito.map((item) => {

                if (item.curso.id === cursoSeleccionado.id) {

                    return {
                        ...item,
                        cantidad: item.cantidad + cantidad
                    };

                }

                return item;

            }));

        } else {

            setCarrito([
                ...carrito,
                {
                    curso: cursoSeleccionado,
                    cantidad
                }
            ]);

        }

        setMensaje({
            tipo: "exito",
            texto: t.agregado
        });

    }

    function aumentarCarrito(id) {

        const item = carrito.find(
            (producto) => producto.curso.id === id
        );

        if (item && item.cantidad >= item.curso.stock) {

            setMensaje({
                tipo: "error",
                texto: t.sinStock
            });

            return;

        }

        setCarrito(carrito.map((item) => {

            if (item.curso.id === id) {

                return {
                    ...item,
                    cantidad: item.cantidad + 1
                };

            }

            return item;

        }));

    }

    function disminuirCarrito(id) {

        setCarrito(carrito.map((item) => {

            if (item.curso.id === id && item.cantidad > 1) {

                return {
                    ...item,
                    cantidad: item.cantidad - 1
                };

            }

            return item;

        }));

    }

    function eliminarDelCarrito(id) {

        setCarrito(carrito.filter(
            (item) => item.curso.id !== id
        ));

    }

    const total = carrito.reduce((acumulado, item) => {

        return acumulado + (
            item.curso.precioMensual * item.cantidad
        );

    }, 0);

    const cantidadTotalCarrito = carrito.reduce((acumulado, item) => {

        return acumulado + item.cantidad;

    }, 0);

    function irAlCarrito() {

        const seccionCarrito = document.getElementById("carrito");

        if (seccionCarrito) {

            seccionCarrito.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }

    function continuarInvitado() {

        if (carrito.length === 0) {
            return;
        }

        const fecha = new Intl.DateTimeFormat(region.locale, {
            dateStyle: "long",
            timeStyle: "short"
        }).format(new Date());

        setMensaje({
            tipo: "compra",
            texto: t.pagoSimulado,
            detalle: t.confirmacion,
            fecha,
            total: formatearPrecio(total)
        });

        setCarrito([]);
        cerrarCurso();

    }

    function pagarAhora() {

        if (carrito.length === 0) {
            return;
        }

        const cursosPedido = carrito.map((item) => ({

            id: item.curso.id,
            nombre: obtenerTextoCurso(item.curso, "nombre"),
            cantidad: item.cantidad,
            precioMensual: item.curso.precioMensual,
            subtotal: item.curso.precioMensual * item.cantidad

        }));

        navegar("/contacto", {

            state: {
                cursos: cursosPedido,
                total,
                totalFormateado: formatearPrecio(total),
                moneda: region.moneda,
                locale: region.locale
            }

        });

    }

    // =====================================
    // FORMULARIO DE PRODUCTOS
    // =====================================

    function cambiarCampoCurso(e) {

        const { name, value } = e.target;

        setFormularioCurso({
            ...formularioCurso,
            [name]: value
        });

    }

    function limpiarFormularioCurso() {

        setFormularioCurso({
            ...formularioVacio,
            categoria: categorias[0] || ""
        });

        setCursoEditando(null);

    }

    function guardarCurso(e) {

        e.preventDefault();

        const nombre = formularioCurso.nombre.trim();
        const descripcion = formularioCurso.descripcion.trim();
        const imagen = formularioCurso.imagen.trim();
        const stock = Number(formularioCurso.stock);
        const precio = Number(formularioCurso.precioMensual);
        const categoria = formularioCurso.categoria;

        if (
            !nombre ||
            !descripcion ||
            !imagen ||
            !categoria ||
            formularioCurso.stock === "" ||
            formularioCurso.precioMensual === "" ||
            !Number.isInteger(stock) ||
            stock < 0 ||
            !Number.isFinite(precio) ||
            precio < 0
        ) {

            alert("Completa todos los campos con valores válidos.");
            return;

        }

        if (cursoEditando) {

            const cantidadEnCarrito = carrito.find(
                (item) => item.curso.id === cursoEditando
            )?.cantidad || 0;

            if (stock < cantidadEnCarrito) {

                alert("El stock no puede ser menor que la cantidad que ya está en el carrito.");
                return;

            }

            setCursos(cursos.map((curso) => {

                if (curso.id !== cursoEditando) {
                    return curso;
                }

                const categoriaCambio = curso.categoria !== categoria;

                return {
                    ...curso,
                    nombre,
                    categoria,
                    stock,
                    imagen,
                    descripcion,
                    precioMensual: precio,

                    traducciones: {
                        en: {
                            ...curso.traducciones?.en,
                            nombre: curso.traducciones?.en?.nombre || nombre,
                            categoria: categoriaCambio
                                ? categoria
                                : curso.traducciones?.en?.categoria || categoria,
                            descripcion: curso.traducciones?.en?.descripcion || descripcion
                        },

                        fr: {
                            ...curso.traducciones?.fr,
                            nombre: curso.traducciones?.fr?.nombre || nombre,
                            categoria: categoriaCambio
                                ? categoria
                                : curso.traducciones?.fr?.categoria || categoria,
                            descripcion: curso.traducciones?.fr?.descripcion || descripcion
                        }
                    }
                };

            }));

            setCarrito(carrito.map((item) => {

                const cursoActualizado = cursos.find(
                    (curso) => curso.id === cursoEditando
                );

                if (item.curso.id === cursoEditando) {

                    return {
                        ...item,
                        curso: {
                            ...cursoActualizado,
                            nombre,
                            categoria,
                            stock,
                            imagen,
                            descripcion,
                            precioMensual: precio
                        }
                    };

                }

                return item;

            }));

            alert("Curso actualizado correctamente.");

        } else {

            const nuevoCurso = {

                id: Date.now(),
                nombre,
                categoria,
                stock,
                imagen,
                descripcion,
                precioMensual: precio,

                traducciones: {
                    en: {
                        nombre,
                        categoria,
                        descripcion
                    },
                    fr: {
                        nombre,
                        categoria,
                        descripcion
                    }
                }

            };

            setCursos([...cursos, nuevoCurso]);

            alert("Curso registrado correctamente.");

        }

        limpiarFormularioCurso();

    }

    // =====================================
    // EDITAR PRODUCTO
    // =====================================

    function editarCurso(curso) {

        setCursoEditando(curso.id);

        setFormularioCurso({

            nombre: curso.nombre,
            categoria: curso.categoria,
            stock: String(curso.stock),
            imagen: curso.imagen,
            descripcion: curso.descripcion,
            precioMensual: String(curso.precioMensual)

        });

        document.getElementById("formulario-producto")?.scrollIntoView({
            behavior: "smooth"
        });

    }

    // =====================================
    // ELIMINAR PRODUCTO
    // =====================================

    function eliminarCurso(id) {

        const confirmar = window.confirm(
            "¿Estás seguro de que deseas eliminar este curso?"
        );

        if (!confirmar) {
            return;
        }

        setCursos(cursos.filter((curso) => curso.id !== id));

        setCarrito(carrito.filter(
            (item) => item.curso.id !== id
        ));

        if (cursoSeleccionado?.id === id) {
            cerrarCurso();
        }

        if (cursoEditando === id) {
            limpiarFormularioCurso();
        }

    }

    // =====================================
    // BUSCADOR Y FILTRO ADMINISTRATIVO
    // =====================================

    const cursosAdministracion = cursos.filter((curso) => {

        const coincideNombre = curso.nombre
            .toLowerCase()
            .includes(busquedaAdmin.toLowerCase());

        const coincideCategoria =
            filtroCategoriaAdmin === "" ||
            curso.categoria === filtroCategoriaAdmin;

        return coincideNombre && coincideCategoria;

    });

    // =====================================
    // REGISTRAR CATEGORÍA
    // =====================================

    function guardarCategoria(e) {

        e.preventDefault();

        const nombre = nombreCategoria.trim();

        if (!nombre) {
            alert("Escribe el nombre de la categoría.");
            return;
        }

        if (
            categorias.some((categoria) =>
                categoria.toLowerCase() === nombre.toLowerCase() &&
                categoria !== categoriaEditando
            )
        ) {

            alert("Esta categoría ya existe.");
            return;

        }

        if (categoriaEditando) {

            setCategorias(categorias.map((categoria) =>
                categoria === categoriaEditando ? nombre : categoria
            ));

            setCursos(cursos.map((curso) => {

                if (curso.categoria !== categoriaEditando) {
                    return curso;
                }

                return {
                    ...curso,
                    categoria: nombre,
                    traducciones: {
                        en: {
                            ...curso.traducciones?.en,
                            categoria: nombre
                        },
                        fr: {
                            ...curso.traducciones?.fr,
                            categoria: nombre
                        }
                    }
                };

            }));

            setCarrito(carrito.map((item) => {

                if (item.curso.categoria === categoriaEditando) {

                    return {
                        ...item,
                        curso: {
                            ...item.curso,
                            categoria: nombre
                        }
                    };

                }

                return item;

            }));

            alert("Categoría actualizada correctamente.");

        } else {

            setCategorias([...categorias, nombre]);

            alert("Categoría registrada correctamente.");

        }

        setNombreCategoria("");
        setCategoriaEditando(null);

    }

    // =====================================
    // EDITAR CATEGORÍA
    // =====================================

    function editarCategoria(categoria) {

        setCategoriaEditando(categoria);
        setNombreCategoria(categoria);

    }

    // =====================================
    // ELIMINAR CATEGORÍA
    // =====================================

    function eliminarCategoria(categoria) {

        const tieneCursos = cursos.some(
            (curso) => curso.categoria === categoria
        );

        if (tieneCursos) {

            alert("No puedes eliminar esta categoría porque todavía tiene cursos asociados. Primero cambia la categoría de esos cursos.");

            return;

        }

        const confirmar = window.confirm(
            "¿Deseas eliminar la categoría " + categoria + "?"
        );

        if (!confirmar) {
            return;
        }

        setCategorias(categorias.filter(
            (item) => item !== categoria
        ));

        if (categoriaEditando === categoria) {
            setCategoriaEditando(null);
            setNombreCategoria("");
        }

    }

    // =====================================
    // VISTA
    // =====================================

    return (

        <section className="reservar-cursos">

            <div className="contenedor-cursos">

                {/* BOTÓN FLOTANTE DEL CARRITO */}

                <button
                    type="button"
                    className="boton-carrito-flotante"
                    onClick={irAlCarrito}
                >
                    🛒 Mi carrito ({cantidadTotalCarrito})
                </button>

                <h1>{t.titulo}</h1>
                <p>{t.descripcion}</p>

                {/* BOTÓN PARA MOSTRAR ADMINISTRACIÓN */}

                <div className="acciones-administracion">

                    <button
                        type="button"
                        onClick={() => setMostrarAdministracion(!mostrarAdministracion)}
                    >
                        {mostrarAdministracion
                            ? "Ocultar administración"
                            : "Administrar cursos y categorías"}
                    </button>

                </div>

                {/* =====================================
                    PANEL DE ADMINISTRACIÓN
                ===================================== */}

                {mostrarAdministracion && (

                    <section className="panel-administracion">

                        <h2>Gestión de productos</h2>

                        {/* FORMULARIO DE PRODUCTOS */}

                        <form
                            id="formulario-producto"
                            className="formulario-admin"
                            onSubmit={guardarCurso}
                        >

                            <h3>
                                {cursoEditando
                                    ? "Editar producto"
                                    : "Registrar nuevo producto"}
                            </h3>

                            <div className="campo-admin">
                                <label htmlFor="nombre-producto">
                                    Nombre del producto
                                </label>

                                <input
                                    id="nombre-producto"
                                    name="nombre"
                                    value={formularioCurso.nombre}
                                    onChange={cambiarCampoCurso}
                                    required
                                />
                            </div>

                            <div className="campo-admin">
                                <label htmlFor="categoria-producto">
                                    Categoría
                                </label>

                                <select
                                    id="categoria-producto"
                                    name="categoria"
                                    value={formularioCurso.categoria}
                                    onChange={cambiarCampoCurso}
                                    required
                                >

                                    <option value="">
                                        Selecciona una categoría
                                    </option>

                                    {categorias.map((categoria) => (

                                        <option
                                            key={categoria}
                                            value={categoria}
                                        >
                                            {categoria}
                                        </option>

                                    ))}

                                </select>
                            </div>

                            <div className="campo-admin">
                                <label htmlFor="stock-producto">
                                    Stock
                                </label>

                                <input
                                    id="stock-producto"
                                    type="number"
                                    name="stock"
                                    min="0"
                                    step="1"
                                    value={formularioCurso.stock}
                                    onChange={cambiarCampoCurso}
                                    required
                                />
                            </div>

                            <div className="campo-admin">
                                <label htmlFor="precio-producto">
                                    Precio mensual
                                </label>

                                <input
                                    id="precio-producto"
                                    type="number"
                                    name="precioMensual"
                                    min="0"
                                    step="0.01"
                                    value={formularioCurso.precioMensual}
                                    onChange={cambiarCampoCurso}
                                    required
                                />
                            </div>

                            <div className="campo-admin">
                                <label htmlFor="imagen-producto">
                                    URL de la imagen
                                </label>

                                <input
                                    id="imagen-producto"
                                    type="url"
                                    name="imagen"
                                    value={formularioCurso.imagen}
                                    onChange={cambiarCampoCurso}
                                    required
                                />
                            </div>

                            <div className="campo-admin">
                                <label htmlFor="descripcion-producto">
                                    Descripción
                                </label>

                                <textarea
                                    id="descripcion-producto"
                                    name="descripcion"
                                    value={formularioCurso.descripcion}
                                    onChange={cambiarCampoCurso}
                                    required
                                />
                            </div>

                            <div className="botones-admin">

                                <button type="submit">
                                    {cursoEditando
                                        ? "Guardar cambios"
                                        : "Registrar producto"}
                                </button>

                                {cursoEditando && (

                                    <button
                                        type="button"
                                        onClick={limpiarFormularioCurso}
                                    >
                                        Cancelar edición
                                    </button>

                                )}

                            </div>

                        </form>

                        {/* LISTA Y FILTROS DE PRODUCTOS */}

                        <div className="lista-administracion">

                            <h3>Productos registrados ({cursos.length})</h3>

                            <input
                                type="search"
                                placeholder="Buscar producto por nombre..."
                                value={busquedaAdmin}
                                onChange={(e) => setBusquedaAdmin(e.target.value)}
                                aria-label="Buscar producto por nombre"
                            />

                            <select
                                value={filtroCategoriaAdmin}
                                onChange={(e) => setFiltroCategoriaAdmin(e.target.value)}
                                aria-label="Filtrar productos por categoría"
                            >

                                <option value="">
                                    Todas las categorías
                                </option>

                                {categorias.map((categoria) => (

                                    <option
                                        key={categoria}
                                        value={categoria}
                                    >
                                        {categoria}
                                    </option>

                                ))}

                            </select>

                            {cursosAdministracion.length === 0 ? (

                                <p>No se encontraron productos.</p>

                            ) : (

                                <div className="tabla-administracion">

                                    {cursosAdministracion.map((curso) => (

                                        <article
                                            className="producto-admin"
                                            key={curso.id}
                                        >

                                            <img
                                                src={curso.imagen}
                                                alt={curso.nombre}
                                            />

                                            <div className="producto-admin-info">

                                                <h4>{curso.nombre}</h4>

                                                <p>
                                                    Categoría: {curso.categoria}
                                                </p>

                                                <p>
                                                    Stock: {curso.stock}
                                                </p>

                                                <p>
                                                    Precio: {formatearPrecio(curso.precioMensual)}
                                                </p>

                                            </div>

                                            <div className="producto-admin-acciones">

                                                <button
                                                    type="button"
                                                    onClick={() => abrirCurso(curso)}
                                                >
                                                    Ver detalle
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => editarCurso(curso)}
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => eliminarCurso(curso.id)}
                                                >
                                                    Eliminar
                                                </button>

                                            </div>

                                        </article>

                                    ))}

                                </div>

                            )}

                        </div>

                        {/* =====================================
                            GESTIÓN DE CATEGORÍAS
                        ===================================== */}

                        <div className="gestion-categorias">

                            <h2>Gestión de categorías</h2>

                            <form
                                className="formulario-admin"
                                onSubmit={guardarCategoria}
                            >

                                <h3>
                                    {categoriaEditando
                                        ? "Actualizar categoría"
                                        : "Registrar nueva categoría"}
                                </h3>

                                <div className="campo-admin">

                                    <label htmlFor="nombre-categoria">
                                        Nombre de la categoría
                                    </label>

                                    <input
                                        id="nombre-categoria"
                                        type="text"
                                        value={nombreCategoria}
                                        onChange={(e) => setNombreCategoria(e.target.value)}
                                        required
                                    />

                                </div>

                                <div className="botones-admin">

                                    <button type="submit">
                                        {categoriaEditando
                                            ? "Actualizar categoría"
                                            : "Registrar categoría"}
                                    </button>

                                    {categoriaEditando && (

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setCategoriaEditando(null);
                                                setNombreCategoria("");
                                            }}
                                        >
                                            Cancelar
                                        </button>

                                    )}

                                </div>

                            </form>

                            <h3>Categorías disponibles ({categorias.length})</h3>

                            <div className="lista-categorias-admin">

                                {categorias.map((categoria) => (

                                    <article
                                        className="categoria-admin"
                                        key={categoria}
                                    >

                                        <span>{categoria}</span>

                                        <div>

                                            <button
                                                type="button"
                                                onClick={() => editarCategoria(categoria)}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => eliminarCategoria(categoria)}
                                            >
                                                Eliminar
                                            </button>

                                        </div>

                                    </article>

                                ))}

                            </div>

                        </div>

                    </section>

                )}

                {/* =====================================
                    CATÁLOGO DE CURSOS
                ===================================== */}

                <h2 className="titulo-catalogo">
                    Catálogo de cursos
                </h2>

                <input
                    type="search"
                    className="buscador-cursos"
                    placeholder={t.buscar}
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    aria-label={t.buscar}
                />

                <select
                    className="filtro-categoria-cursos"
                    value={filtroCategoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                    aria-label="Filtrar cursos por categoría"
                >

                    <option value="">
                        Todas las categorías
                    </option>

                    {categorias.map((categoria) => (

                        <option
                            key={categoria}
                            value={categoria}
                        >
                            {obtenerTextoCategoria(categoria)}
                        </option>

                    ))}

                </select>

                {cargando && <p>{t.cargando}</p>}

                {error && (
                    <p className="mensaje-error">
                        {t.error}
                    </p>
                )}

                {!cargando && !error && (

                    <div className="lista-cursos">

                        {cursosFiltrados.length > 0 ? (

                            cursosFiltrados.map((curso) => (

                                <article
                                    className="tarjeta-curso"
                                    key={curso.id}
                                >

                                    <button
                                        type="button"
                                        className="boton-curso"
                                        onClick={() => abrirCurso(curso)}
                                    >

                                        <img
                                            src={curso.imagen}
                                            alt={obtenerTextoCurso(curso, "nombre")}
                                        />

                                        <h2>
                                            {obtenerTextoCurso(curso, "nombre")}
                                        </h2>

                                        <p>
                                            <strong>{t.categoria}:</strong>{" "}
                                            {obtenerTextoCurso(curso, "categoria")}
                                        </p>

                                        <p>
                                            <strong>{t.stock}:</strong>{" "}
                                            {curso.stock}
                                        </p>

                                        <p>
                                            <strong>{t.precio}:</strong>{" "}
                                            {formatearPrecio(curso.precioMensual)}
                                        </p>

                                        <span>{t.verDetalles}</span>

                                    </button>

                                </article>

                            ))

                        ) : (

                            <p className="sin-resultados">
                                {t.sinResultados}
                            </p>

                        )}

                    </div>

                )}

                {/* =====================================
                    CARRITO
                ===================================== */}

                <section
                    className="seccion-carrito"
                    id="carrito"
                >

                    <h2>{t.carrito}</h2>

                    {carrito.length === 0 ? (

                        <p>{t.carritoVacio}</p>

                    ) : (

                        <>

                            <div className="lista-carrito">

                                {carrito.map((item) => (

                                    <article
                                        className="producto-carrito"
                                        key={item.curso.id}
                                    >

                                        <img
                                            src={item.curso.imagen}
                                            alt={obtenerTextoCurso(item.curso, "nombre")}
                                        />

                                        <div className="informacion-carrito">

                                            <h3>
                                                {obtenerTextoCurso(item.curso, "nombre")}
                                            </h3>

                                            <p>
                                                {formatearPrecio(item.curso.precioMensual)}
                                            </p>

                                            <div className="controles-cantidad">

                                                <button
                                                    type="button"
                                                    onClick={() => disminuirCarrito(item.curso.id)}
                                                    disabled={item.cantidad <= 1}
                                                    aria-label={t.disminuir}
                                                >
                                                    -
                                                </button>

                                                <span>{item.cantidad}</span>

                                                <button
                                                    type="button"
                                                    onClick={() => aumentarCarrito(item.curso.id)}
                                                    disabled={item.cantidad >= item.curso.stock}
                                                    aria-label={t.aumentar}
                                                >
                                                    +
                                                </button>

                                            </div>

                                            <p>
                                                {t.total}:{" "}
                                                {formatearPrecio(
                                                    item.curso.precioMensual * item.cantidad
                                                )}
                                            </p>

                                        </div>

                                        <button
                                            type="button"
                                            className="boton-eliminar"
                                            onClick={() => eliminarDelCarrito(item.curso.id)}
                                        >
                                            {t.eliminar}
                                        </button>

                                    </article>

                                ))}

                            </div>

                            <h3 className="total-carrito">
                                {t.total}: {formatearPrecio(total)}
                            </h3>

                            <div className="acciones-carrito">

                                <button
                                    type="button"
                                    onClick={pagarAhora}
                                >
                                    {t.pagar}
                                </button>

                                <button
                                    type="button"
                                    onClick={continuarInvitado}
                                >
                                    {t.invitado}
                                </button>

                            </div>

                        </>

                    )}

                </section>

                {/* MENSAJES */}

                {mensaje && (

                    <div
                        className={"mensaje-compra " + mensaje.tipo}
                        role="status"
                    >

                        <button
                            type="button"
                            className="cerrar-mensaje"
                            onClick={() => setMensaje(null)}
                            aria-label={t.cerrar}
                        >
                            ×
                        </button>

                        <h3>{mensaje.texto}</h3>

                        {mensaje.detalle && <p>{mensaje.detalle}</p>}

                        {mensaje.fecha && (
                            <p>{t.fecha}: {mensaje.fecha}</p>
                        )}

                        {mensaje.total && (
                            <p>{t.total}: {mensaje.total}</p>
                        )}

                    </div>

                )}

                {/* MODAL DE DETALLES */}

                {cursoSeleccionado && (

                    <div
                        className="fondo-modal"
                        onClick={cerrarCurso}
                    >

                        <section
                            className="modal-curso"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="titulo-modal-curso"
                            onClick={(e) => e.stopPropagation()}
                        >

                            <button
                                type="button"
                                className="cerrar-modal"
                                onClick={cerrarCurso}
                                aria-label={t.cerrar}
                            >
                                ×
                            </button>

                            <h2 id="titulo-modal-curso">
                                {t.detalle}
                            </h2>

                            <img
                                src={cursoSeleccionado.imagen}
                                alt={obtenerTextoCurso(cursoSeleccionado, "nombre")}
                            />

                            <h3>
                                {obtenerTextoCurso(cursoSeleccionado, "nombre")}
                            </h3>

                            <p>
                                {obtenerTextoCurso(cursoSeleccionado, "descripcion")}
                            </p>

                            <p>
                                <strong>{t.categoria}:</strong>{" "}
                                {obtenerTextoCurso(cursoSeleccionado, "categoria")}
                            </p>

                            <p>
                                <strong>{t.stock}:</strong>{" "}
                                {cursoSeleccionado.stock}
                            </p>

                            <p>
                                <strong>{t.precio}:</strong>{" "}
                                {formatearPrecio(cursoSeleccionado.precioMensual)}
                            </p>

                            <div className="selector-cantidad">

                                <button
                                    type="button"
                                    onClick={() => setCantidad(
                                        cantidad > 1 ? cantidad - 1 : 1
                                    )}
                                    disabled={cantidad <= 1}
                                    aria-label={t.disminuir}
                                >
                                    -
                                </button>

                                <span>
                                    {t.cantidad}: {cantidad}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => setCantidad(
                                        cantidad < cursoSeleccionado.stock
                                            ? cantidad + 1
                                            : cantidad
                                    )}
                                    disabled={cantidad >= cursoSeleccionado.stock}
                                    aria-label={t.aumentar}
                                >
                                    +
                                </button>

                            </div>

                            <p>
                                <strong>{t.total}:</strong>{" "}
                                {formatearPrecio(
                                    cursoSeleccionado.precioMensual * cantidad
                                )}
                            </p>

                            <button
                                type="button"
                                className="boton-agregar"
                                onClick={agregarAlCarrito}
                                disabled={cursoSeleccionado.stock <= 0}
                            >
                                {t.agregar}
                            </button>

                            <button
                                type="button"
                                className="boton-seguir"
                                onClick={cerrarCurso}
                            >
                                {t.seguirExplorando}
                            </button>

                            {mensaje && mensaje.tipo !== "compra" && (

                                <p className={"mensaje-modal " + mensaje.tipo}>
                                    {mensaje.texto}
                                </p>

                            )}

                        </section>

                    </div>

                )}

            </div>

        </section>

    );

}
