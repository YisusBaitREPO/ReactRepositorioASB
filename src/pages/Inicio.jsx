import { Link } from "react-router-dom";


export default function Inicio() {
    return (
        <>
            {/* PORTADA */}
            <section className="portada">
                <div className="contenedor portada-contenido">

                    <div className="portada-texto">
                        <p className="subtitulo">
                            EDUCACIÓN PARA TODOS
                        </p>

                        <h1>
                            Aprender no debería tener barreras.
                        </h1>

                        <p>
                            Descubre nuevas habilidades digitales mediante
                            cursos sencillos y recursos educativos diseñados
                            para que todas las personas puedan aprender.
                        </p>

                        <Link to="/cursos" className="boton">
                            Explorar cursos
                        </Link>
                    </div>

                    <div className="portada-imagen">
                        <img
                            src="/MEDIA/IMG/portada.jpg"
                            alt="Estudiantes utilizando herramientas digitales para aprender"
                        />
                    </div>

                </div>
            </section>

            {/* BENEFICIOS */}
            <section className="seccion">
                <div className="contenedor">

                    <div className="titulo-seccion">
                        <p className="subtitulo">
                            ¿QUÉ OFRECEMOS?
                        </p>

                        <h2>Aprende a tu propio ritmo</h2>

                        <p>
                            Encuentra recursos educativos pensados
                            para facilitar tu aprendizaje.
                        </p>
                    </div>

                    <div className="beneficios">

                        <article className="beneficio">
                            <h2>Contenido sencillo</h2>
                            <p>
                                Lecciones explicadas de manera clara
                                y comprensible.
                            </p>
                        </article>

                        <article className="beneficio">
                            <h2>Educación inclusiva</h2>
                            <p>
                                Una experiencia que considera
                                diferentes necesidades.
                            </p>
                        </article>

                        <article className="beneficio">
                            <h2>Aprendizaje digital</h2>
                            <p>
                                Desarrolla habilidades útiles
                                para tu vida diaria.
                            </p>
                        </article>

                    </div>
                </div>
            </section>
        </>
    );
}
