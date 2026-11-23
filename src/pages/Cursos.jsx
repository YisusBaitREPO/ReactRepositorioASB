import { Link } from "react-router-dom";
import { useIdioma } from "../context/IdiomaContext";

export default function Cursos() {
    const { textos } = useIdioma();

    return (
        <section className="seccion">
            <div className="contenedor">

                {/* TÍTULO DE LA SECCIÓN */}
                <div className="titulo-seccion">
                    <p className="subtitulo">
                        {textos.cursos.subtitulo}
                    </p>

                    <h1>{textos.cursos.titulo}</h1>

                    <p>
                        {textos.cursos.descripcion}
                    </p>
                </div>

                {/* LISTA DE CURSOS */}
                <div className="cursos-contenedor">

                    <article className="tarjeta-curso">

                        <div className="curso-imagen" aria-hidden="true">
                            <img src="/MEDIA/IMG/computacionBasica.webp" alt="laptop en 2D referente al tema" />
                        </div>

                        <h2>{textos.cursos.curso1Titulo}</h2>

                        <p>
                            {textos.cursos.curso1Descripcion}
                        </p>

                        <Link to="/contacto">
                            {textos.cursos.consultar}
                        </Link>
                    </article>

                    <article className="tarjeta-curso">

                        <div className="curso-imagen" aria-hidden="true">
                            <img src="/MEDIA/IMG/usoDeInternet.webp" alt="Lupa en un navegador que representa Busqueda" />
                        </div>

                        <h2>{textos.cursos.curso2Titulo}</h2>

                        <p>
                            {textos.cursos.curso2Descripcion}
                        </p>

                        <Link to="/contacto">
                            {textos.cursos.consultar}
                        </Link>
                    </article>

                    <article className="tarjeta-curso">

                        <div className="curso-imagen" aria-hidden="true">
                            <img src="/MEDIA/IMG/herramientasDigitales.webp" alt="Correo electronico (Herramienta)" />
                        </div>

                        <h2>{textos.cursos.curso3Titulo}</h2>

                        <p>
                            {textos.cursos.curso3Descripcion}
                        </p>

                        <Link to="/contacto">
                            {textos.cursos.consultar}
                        </Link>
                    </article>

                    <article className="tarjeta-curso">

                        <div className="curso-imagen" aria-hidden="true">
                            <img src="/MEDIA/IMG/seguridadDigital.webp" alt="candado en una laptop representa seguridad" />
                        </div>

                        <h2>{textos.cursos.curso4Titulo}</h2>

                        <p>
                            {textos.cursos.curso4Descripcion}
                        </p>

                        <Link to="/contacto">
                            {textos.cursos.consultar}
                        </Link>
                    </article>

                </div>
            </div>
        </section>
    );
}