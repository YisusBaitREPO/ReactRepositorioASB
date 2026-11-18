
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
                            src="/MEDIA/IMG/banner.jpg"
                            alt={textos.inicio.imagenAlt}
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
                    src="/MEDIA/IMG/contenidoSencillo.png"
                    alt="Libro y computadora que representan el aprendizaje sencillo"
                />

                <h2>{textos.inicio.beneficio1Titulo}</h2>
                <p>
                    {textos.inicio.beneficio1Descripcion}
                </p>
            </article>

            <article className="beneficio">
                <img
                    src="/MEDIA/IMG/educacionInclusiva.png"
                    alt="Personas aprendiendo juntas frente a una computadora"
                />

                <h2>{textos.inicio.beneficio2Titulo}</h2>
                <p>
                    {textos.inicio.beneficio2Descripcion}
                </p>
            </article>

            <article className="beneficio">
                <img
                    src="/MEDIA/IMG/aprendizajeDigital.png"
                    alt="Persona aprendiendo a utilizar herramientas digitales"
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

