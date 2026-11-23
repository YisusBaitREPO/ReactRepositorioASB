
import { Link } from "react-router-dom";
import { useIdioma } from "../context/IdiomaContext";

export default function Inicio() {
    const { textos } = useIdioma();

    return (
        <>
            {/* PORTADA */}
            <section className="portada">
                <div className="contenedor portada-contenido">

                    <div className="portada-texto">
                        <p className="subtitulo">
                            {textos.inicio.subtitulo}
                        </p>

                        <h1>
                            {textos.inicio.titulo}
                        </h1>

                        <p>
                            {textos.inicio.descripcion}
                        </p>

                        <Link to="/cursos" className="boton">
                            {textos.inicio.boton}
                        </Link>
                    </div>

                    <div className="portada-imagen">
                        <img
                            src="/MEDIA/IMG/bannerR.webp"
                            alt={textos.inicio.imagenAlt}
                            width="1792"
                            height="592"
                        />
                    </div>

                </div>
            </section>

            {/* BENEFICIOS */}
            <section className="seccion">
                <div className="contenedor">

                    <div className="titulo-seccion">
                        <p className="subtitulo">
                            {textos.inicio.ofrecemos}
                        </p>

                        <h2>{textos.inicio.seccionTitulo}</h2>

                        <p>
                            {textos.inicio.seccionDescripcion}
                        </p>
                    </div>

                    <div className="beneficios">

                        <article className="beneficio">
                            <img
                                src="/MEDIA/IMG/contenidoSencilloR.webp"
                                alt="Libro y computadora que representan el aprendizaje sencillo"
                                width="2048"
                                height="817"
                            />

                            <h2>{textos.inicio.beneficio1Titulo}</h2>
                            <p>{textos.inicio.beneficio1Descripcion}</p>
                        </article>

                        <article className="beneficio">
                            <img
                                src="/MEDIA/IMG/educacionInclusivaR.webp"
                                alt="Personas aprendiendo juntas frente a una computadora"
                                width="1600"
                                height="639"
                            />

                            <h2>{textos.inicio.beneficio2Titulo}</h2>
                            <p>
                                {textos.inicio.beneficio2Descripcion}
                            </p>
                        </article>

                        <article className="beneficio">
                            <img
                                src="/MEDIA/IMG/aprendizajeDigitalR.webp"
                                alt="Persona aprendiendo a utilizar herramientas digitales"
                                width="2235"
                                height="890"
                            />

                            <h2>{textos.inicio.beneficio3Titulo}</h2>
                            <p>
                                {textos.inicio.beneficio3Descripcion}
                            </p>
                        </article>

                    </div>
                </div>
            </section>
        </>
    );
}
