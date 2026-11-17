import { NavLink } from "react-router-dom";

export default function Footer() {

    return (

        <footer className="pie-pagina">

            <div className="contenedor footer-contenido">

                {/* INFORMACIÓN DEL PORTAL */}
                <section className="footer-columna">

                    <h2>Aprende sin Barreras</h2>

                    <p>
                        Somos un portal educativo que promueve
                        el aprendizaje digital accesible e inclusivo.
                        Queremos que todas las personas tengan
                        la oportunidad de aprender.
                    </p>

                </section>


                {/* NAVEGACIÓN */}
                <nav className="footer-columna" aria-label="Enlaces del pie de página">

                    <h2>Navegación</h2>

                    <ul>
                        <li><NavLink to="/">Inicio</NavLink></li>
                        <li><NavLink to="/cursos">Nuestros cursos</NavLink></li>
                        <li><NavLink to="/nosotros">Nosotros</NavLink></li>
                        <li><NavLink to="/accesibilidad">Accesibilidad</NavLink></li>
                        <li><NavLink to="/contacto">Contacto</NavLink></li>
                    </ul>

                </nav>


                {/* RECURSOS EDUCATIVOS */}
                <section className="footer-columna">

                    <h2>Áreas de aprendizaje</h2>

                    <ul>
                        <li><NavLink to="/cursos">Computación básica</NavLink></li>
                        <li><NavLink to="/cursos">Uso de Internet</NavLink></li>
                        <li><NavLink to="/cursos">Herramientas digitales</NavLink></li>
                        <li><NavLink to="/cursos">Seguridad digital</NavLink></li>
                    </ul>

                </section>


                {/* INFORMACIÓN ADICIONAL */}
                <section className="footer-columna">

                    <h2>Información</h2>

                    <ul>
                        <li><NavLink to="/nosotros">Nuestra misión</NavLink></li>
                        <li><NavLink to="/accesibilidad">Compromiso accesible</NavLink></li>
                        <li><NavLink to="/contacto">Enviar una consulta</NavLink></li>
                    </ul>

                </section>

            </div>


            {/* DERECHOS RESERVADOS */}
            <div className="footer-inferior">

                <div className="contenedor">

                    <p>© 2026 Aprende sin Barreras. Todos los derechos reservados.</p>

                    <p>La educación es un derecho de todos.</p>

                </div>

            </div>

        </footer>

    );

}

