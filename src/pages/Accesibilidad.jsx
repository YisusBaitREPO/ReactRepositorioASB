
export default function Accesibilidad() {
    return (
        <>
            {/* PORTADA */}
            <section className="nosotros-portada">
                <div className="contenedor">

                    <p className="subtitulo">
                        EDUCACIÓN INCLUSIVA
                    </p>

                    <h1>Accesibilidad para todos</h1>

                    <p>
                        Nuestro objetivo es que cualquier persona
                        pueda navegar y aprender en nuestra plataforma.
                    </p>

                </div>
            </section>

            {/* CARACTERÍSTICAS DE ACCESIBILIDAD */}
            <section className="seccion">
                <div className="contenedor">

                    <div className="titulo-seccion">
                        <h2>¿Cómo facilitamos el aprendizaje?</h2>

                        <p>
                            Aplicaremos características que ayuden
                            a diferentes personas a utilizar el portal.
                        </p>
                    </div>

                    <div className="accesibilidad-lista">

                        <article className="accesibilidad-item">
                            <h2>Contenido perceptible</h2>

                            <p>
                                Utilizaremos textos alternativos, subtítulos,
                                contrastes adecuados y contenido comprensible
                                visual y auditivamente.
                            </p>
                        </article>

                        <article className="accesibilidad-item">
                            <h2>Navegación operable</h2>

                            <p>
                                Permitiremos recorrer las páginas mediante
                                el teclado y mantendremos visible el foco.
                            </p>
                        </article>

                        <article className="accesibilidad-item">
                            <h2>Contenido comprensible</h2>

                            <p>
                                Presentaremos instrucciones claras,
                                textos sencillos y formularios fáciles de usar.
                            </p>
                        </article>

                        <article className="accesibilidad-item">
                            <h2>Contenido robusto</h2>

                            <p>
                                Organizaremos el HTML correctamente para
                                facilitar su interpretación por navegadores
                                y tecnologías asistivas.
                            </p>
                        </article>

                    </div>

                </div>
            </section>

            {/* NUESTRO COMPROMISO */}
            <section className="seccion">
                <div className="contenedor">

                    <div className="titulo-seccion">
                        <h2>Nuestro compromiso</h2>

                        <p>
                            Trabajaremos para mejorar continuamente
                            la accesibilidad del portal tomando como
                            referencia las pautas WCAG 2.1.
                        </p>
                    </div>

                </div>
            </section>
        </>
    );
}

