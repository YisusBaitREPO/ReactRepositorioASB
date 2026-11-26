
import { useState } from "react";
import { Link } from "react-router-dom";
import { useIdioma } from "../context/IdiomaContext";

export default function Cursos() {

    const { textos, idioma } = useIdioma();

    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

    const cursos = [
        {
            id: 1,
            titulo: textos.cursos.curso1Titulo,
            descripcion: textos.cursos.curso1Descripcion,
            imagen: "/MEDIA/IMG/computacionBasica.webp",
            video: "/MEDIA/VIDEOS/computacionBasica.mp4",
            subtitulos: {
                es: "/MEDIA/SUBTITULOS/computacion-es.vtt",
                en: "/MEDIA/SUBTITULOS/computacion-en.vtt",
                fr: "/MEDIA/SUBTITULOS/computacion-fr.vtt"
            }
        },
        {
            id: 2,
            titulo: textos.cursos.curso2Titulo,
            descripcion: textos.cursos.curso2Descripcion,
            imagen: "/MEDIA/IMG/usoDeInternet.webp",
            video: "/MEDIA/VIDEOS/usoDeInternet.mp4",
            subtitulos: {
                es: "/MEDIA/SUBTITULOS/internet-es.vtt",
                en: "/MEDIA/SUBTITULOS/internet-en.vtt",
                fr: "/MEDIA/SUBTITULOS/internet-fr.vtt"
            }
        },
        {
            id: 3,
            titulo: textos.cursos.curso3Titulo,
            descripcion: textos.cursos.curso3Descripcion,
            imagen: "/MEDIA/IMG/herramientasDigitales.webp",
            video: "/MEDIA/VIDEOS/herramientasDigitales.mp4",
            subtitulos: {
                es: "/MEDIA/SUBTITULOS/herramientas-es.vtt",
                en: "/MEDIA/SUBTITULOS/herramientas-en.vtt",
                fr: "/MEDIA/SUBTITULOS/herramientas-fr.vtt"
            }
        },
        {
            id: 4,
            titulo: textos.cursos.curso4Titulo,
            descripcion: textos.cursos.curso4Descripcion,
            imagen: "/MEDIA/IMG/seguridadDigital.webp",
            video: "/MEDIA/VIDEOS/seguridadDigital.mp4",
            subtitulos: {
                es: "/MEDIA/SUBTITULOS/seguridad-es.vtt",
                en: "/MEDIA/SUBTITULOS/seguridad-en.vtt",
                fr: "/MEDIA/SUBTITULOS/seguridad-fr.vtt"
            }
        }
    ];

    return (
        <section className="seccion">
            <div className="contenedor">

                <div className="titulo-seccion">
                    <p className="subtitulo">
                        {textos.cursos.subtitulo}
                    </p>

                    <h1>{textos.cursos.titulo}</h1>

                    <p>
                        {textos.cursos.descripcion}
                    </p>
                </div>

                <div className="cursos-contenedor">

                    {cursos.map((curso) => (

                        <article className="tarjeta-curso" key={curso.id}>

                            <div className="curso-imagen" aria-hidden="true">
                                <img
                                    src={curso.imagen}
                                    alt=""
                                />
                            </div>

                            <h2>{curso.titulo}</h2>

                            <p>{curso.descripcion}</p>

                            <button
                                type="button"
                                onClick={() => setCursoSeleccionado(curso)}
                            >
                                {textos.cursos.consultar}
                            </button>

                        </article>

                    ))}

                    <Link to="/reservar-cursos" className="boton-explorar">Explorar más cursos</Link>

                    <button> Explorar mas cursos</button>

                </div>

            </div>

            {cursoSeleccionado && (

                <div className="modal-video">

                    <section
                        className="contenido-modal-video"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="titulo-video"
                    >

                        <div className="cabecera-modal-video">

                            <h2 id="titulo-video">
                                {cursoSeleccionado.titulo}
                            </h2>

                            <button
                                type="button"
                                onClick={() => setCursoSeleccionado(null)}
                                aria-label="Cerrar video"
                            >
                                X
                            </button>

                        </div>

                        <video
                            key={cursoSeleccionado.id}
                            controls
                            preload="metadata"
                            width="100%"
                        >

                            <source
                                src={cursoSeleccionado.video}
                                type="video/mp4"
                            />

                            <track
                                kind="subtitles"
                                src={cursoSeleccionado.subtitulos.es}
                                srcLang="es"
                                label="Español"
                                default={idioma === "es"}
                            />

                            <track
                                kind="subtitles"
                                src={cursoSeleccionado.subtitulos.en}
                                srcLang="en"
                                label="English"
                                default={idioma === "en"}
                            />

                            <track
                                kind="subtitles"
                                src={cursoSeleccionado.subtitulos.fr}
                                srcLang="fr"
                                label="Français"
                                default={idioma === "fr"}
                            />

                            Tu navegador no puede reproducir este video.

                        </video>

                        <p>
                            Selecciona los subtítulos desde el botón CC
                            del reproductor.
                        </p>

                        <Link to="/contacto">
                            Inscribirme en este curso
                        </Link>

                    </section>

                </div>

            )}

        </section>
    );
}