
import { useState, useEffect } from "react";
import { useIdioma } from "../context/IdiomaContext";
import "../CSS/accesibilidad.css"
import { createPortal } from "react-dom";


export default function PanelAccesible() {

    const { idioma, setIdioma } = useIdioma();


    const [abierto, setAbierto] = useState(false);

    const ajustesIniciales = {
        texto: 100,
        contraste: "normal",
        enlaces: false,
        animaciones: false,
        daltonismo: "normal",
        saturacion: "normal"
    };
    const [ajustes, setAjustes] = useState(() => {
        const guardado = localStorage.getItem("ajustesAccesibilidad");

        if (guardado) {
            try {
                return {
                    ...ajustesIniciales,
                    ...JSON.parse(guardado)
                };
            } catch {
                return ajustesIniciales;
            }
        }

        return ajustesIniciales;
    });

    function cambiarAjuste(nombre, valor) {
        setAjustes((anterior) => ({
            ...anterior,
            [nombre]: valor
        }));
    }

    useEffect(() => {
        const pagina = document.documentElement;

        pagina.style.setProperty(
            "--tamano-texto",
            ajustes.texto + "%"
        );

        pagina.dataset.contraste = ajustes.contraste;

        pagina.dataset.saturacion = ajustes.saturacion;

        pagina.dataset.enlaces = ajustes.enlaces ? "resaltados" : "normal";

        pagina.dataset.animaciones = ajustes.animaciones ? "detenidas" : "normal";

        pagina.dataset.daltonismo = ajustes.daltonismo;

        localStorage.setItem(
            "ajustesAccesibilidad",
            JSON.stringify(ajustes)
        );

    }, [ajustes]);

    function restablecerAjustes() {
        setAjustes(ajustesIniciales);
    }

    return (
        <>
            {/* Filtros de colores para los modos de daltonismo */}
            <svg
                className="filtros-daltonismo"
                aria-hidden="true"
                focusable="false"
            >
                <defs>
                    <filter id="filtro-protanopia">
                        <feColorMatrix
                            type="matrix"
                            values="
                                0.567 0.433 0     0 0
                                0.558 0.442 0     0 0
                                0     0.242 0.758 0 0
                                0     0     0     1 0
                            "
                        />
                    </filter>

                    <filter id="filtro-deuteranopia">
                        <feColorMatrix
                            type="matrix"
                            values="
                                0.625 0.375 0     0 0
                                0.700 0.300 0     0 0
                                0     0.300 0.700 0 0
                                0     0     0     1 0
                            "
                        />
                    </filter>

                    <filter id="filtro-tritanopia">
                        <feColorMatrix
                            type="matrix"
                            values="
                                0.950 0.050 0     0 0
                                0     0.433 0.567 0 0
                                0     0.475 0.525 0 0
                                0     0     0     1 0
                            "
                        />
                    </filter>
                </defs>
            </svg>

            <button
    type="button"
    className="boton-accesibilidad"
    onClick={() => setAbierto(!abierto)}
    aria-expanded={abierto}
    aria-controls="panel-accesibilidad"
    aria-label="Abrir panel de accesibilidad"
>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <circle cx="12" cy="4" r="2" />
        <path d="M3 8h18" />
        <path d="M12 6v7" />
        <path d="m7 21 5-8 5 8" />
    </svg>
</button>

            {abierto && createPortal(
    <section
        id="panel-accesibilidad"
        className="panel-accesibilidad"
        aria-label="Opciones de Accesibilidad"
    >
                    <div className="panel-accesibilidad-cabecera">
                        <h2>Panel de accesibilidad</h2>

                        <button
                            type="button"
                            onClick={() => setAbierto(false)}
                            aria-label="Cerrar panel"
                        >
                            X
                        </button>
                    </div>

                    {/* Selector de idioma */}
                    <div className="selector-idioma">

                        <span className="icono-opcion" aria-hidden="true">🌐</span>
                                
                        <label htmlFor="idioma-panel">
                            Language / Idioma / Langue
                        </label>
                                
                        <select
                            id="idioma-panel"
                            value={idioma}
                            onChange={(e) => setIdioma(e.target.value)}
                        >
                            <option value="es">Español</option>
                            <option value="en">English</option>
                            <option value="fr">Français</option>
                        </select>

                    </div>

                    <div className="opcion-accesibilidad">

                        <span className="icono-opcion" aria-hidden="true">👁️</span>
                                
                        <label htmlFor="modo-daltonismo">
                            Modo para daltónicos
                        </label>
                                
                        <select
                            id="modo-daltonismo"
                            value={ajustes.daltonismo}
                            onChange={(e) => cambiarAjuste("daltonismo", e.target.value)}
                        >
                            <option value="normal">Visión normal</option>
                            <option value="protanopia">Protanopia</option>
                            <option value="deuteranopia">Deuteranopia</option>
                            <option value="tritanopia">Tritanopia</option>
                        </select>

                    </div>

                    {/* Tamaño del texto */}
                    <div className="opcion-accesibilidad">

                        <span className="icono-opcion" aria-hidden="true">🔠</span>

                        <h3>Tamaño del texto</h3>

                        <div className="botones-texto">

                            <button
                                type="button"
                                onClick={() => cambiarAjuste(
                                    "texto",
                                    Math.max(80, ajustes.texto - 10)
                                )}
                                aria-label="Disminuir texto"
                            >
                                A-
                            </button>
                            
                            <span>{ajustes.texto}%</span>
                            
                            <button
                                type="button"
                                onClick={() => cambiarAjuste(
                                    "texto",
                                    Math.min(150, ajustes.texto + 10)
                                )}
                                aria-label="Aumentar texto"
                            >
                                A+
                            </button>
                            
                        </div>

                    </div>

                    {/* Alto contraste */}
                    {/** Contraste de pantalla */}
                    <div className="opcion-accesibilidad">

                        <span className="icono-opcion" aria-hidden="true">◐</span>

                        <label htmlFor="contraste">
                            Contraste de pantalla
                        </label>

                        <select
                            id="contraste"
                            value={ajustes.contraste}
                            onChange={(e) => cambiarAjuste("contraste", e.target.value)}
                        >
                            <option value="normal">Normal</option>
                            <option value="invertido">Invertir colores</option>
                            <option value="oscuro">Contraste oscuro</option>
                            <option value="luz">Contraste de luz</option>
                        </select>

                    </div>

                    {/** Saturación de colores */}
                    <div className="opcion-accesibilidad">

                        <span className="icono-opcion" aria-hidden="true">💧</span>

                        <label htmlFor="saturacion">
                            Saturación de colores
                        </label>

                        <select
                            id="saturacion"
                            value={ajustes.saturacion}
                            onChange={(e) => cambiarAjuste("saturacion", e.target.value)}
                        >
                            <option value="normal">Normal</option>
                            <option value="baja">Baja saturación</option>
                            <option value="alta">Alta saturación</option>
                            <option value="desaturada">Desaturación</option>
                        </select>

                    </div>

                    {/* Resaltar enlaces */}
                    <div className="opcion-accesibilidad">

                        <span className="icono-opcion" aria-hidden="true">🔗</span>

                                            <button
                            type="button"
                            className="boton-opcion"
                            aria-pressed={ajustes.enlaces}
                            onClick={() => cambiarAjuste("enlaces", !ajustes.enlaces)}
                        >
                            {ajustes.enlaces ? "Desactivar" : "Activar"} resaltado de enlaces
                        </button>

                    </div>

                    {/* Detener animaciones */}
                    <div className="opcion-accesibilidad">

                        <span className="icono-opcion" aria-hidden="true">🎬</span>

                        <button
                            type="button"
                            className="boton-opcion"
                            aria-pressed={ajustes.animaciones}
                            onClick={() => cambiarAjuste("animaciones", !ajustes.animaciones)}>
                            {ajustes.animaciones ? "Activar" : "Detener"} animaciones
                        </button>
                    </div>
                    {/* Restablecer */}
                    <button
                        type="button"
                        className="boton-restablecer"
                        onClick={restablecerAjustes}
                    >
                        Restablecer ajustes
                    </button>
                </section>,
                document.body
            )}
        </>
    );
}
