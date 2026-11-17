
import { Link } from "react-router-dom";

export default function Cursos() {
    return (
        <section className="seccion">
            <div className="contenedor">

                {/* TÍTULO DE LA SECCIÓN */}
                <div className="titulo-seccion">
                    <p className="subtitulo">
                        APRENDE A TU RITMO
                    </p>

                    <h1>Nuestros cursos</h1>

                    <p>
                        Explora nuestros cursos y desarrolla nuevas
                        habilidades digitales desde cero.
                    </p>
                </div>

                {/* LISTA DE CURSOS */}
                <div className="cursos-contenedor">

                    <article className="tarjeta-curso">
                        <div className="curso-icono" aria-hidden="true">
                            💻
                        </div>

                        <h2>Computación básica</h2>

                        <p>
                            Aprende a utilizar una computadora,
                            manejar el teclado y organizar archivos.
                        </p>

                        <Link to="/contacto">
                            Consultar sobre este curso
                        </Link>
                    </article>

                    <article className="tarjeta-curso">
                        <div className="curso-icono" aria-hidden="true">
                            🌐
                        </div>

                        <h2>Uso de Internet</h2>

                        <p>
                            Descubre cómo navegar, buscar información
                            y utilizar diferentes páginas web.
                        </p>

                        <Link to="/contacto">
                            Consultar sobre este curso
                        </Link>
                    </article>

                    <article className="tarjeta-curso">
                        <div className="curso-icono" aria-hidden="true">
                            📧
                        </div>

                        <h2>Herramientas digitales</h2>

                        <p>
                            Aprende a utilizar el correo electrónico
                            y otras herramientas digitales.
                        </p>

                        <Link to="/contacto">
                            Consultar sobre este curso
                        </Link>
                    </article>

                    <article className="tarjeta-curso">
                        <div className="curso-icono" aria-hidden="true">
                            🔒
                        </div>

                        <h2>Seguridad digital</h2>

                        <p>
                            Conoce cómo proteger tus datos personales
                            y navegar de manera segura.
                        </p>

                        <Link to="/contacto">
                            Consultar sobre este curso
                        </Link>
                    </article>

                </div>
            </div>
        </section>
    );
}

