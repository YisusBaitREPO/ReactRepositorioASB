
import { NavLink } from "react-router-dom";
import { useIdioma } from "../context/IdiomaContext";

export default function Footer() {
    const { textos } = useIdioma();

    return (
        <footer className="pie-pagina">

            <div className="contenedor footer-contenido">

                {/* INFORMACIÓN DEL PORTAL */}
                <section className="footer-columna">

                    <h2>{textos.footer.titulo}</h2>

                    <p>
                        {textos.footer.descripcion}
                    </p>

                </section>


                {/* NAVEGACIÓN */}
                <nav
                    className="footer-columna"
                    aria-label={textos.menu.navegacionPrincipal}
                >

                    <h2>{textos.footer.navegacion}</h2>

                    <ul>
                        <li><NavLink to="/">{textos.menu.inicio}</NavLink></li>
                        <li><NavLink to="/cursos">{textos.menu.cursos}</NavLink></li>
                        <li><NavLink to="/nosotros">{textos.menu.nosotros}</NavLink></li>
                        <li><NavLink to="/accesibilidad">{textos.menu.accesibilidad}</NavLink></li>
                        <li><NavLink to="/contacto">{textos.menu.contacto}</NavLink></li>
                    </ul>

                </nav>


                {/* RECURSOS EDUCATIVOS */}
                <section className="footer-columna">

                    <h2>{textos.footer.areas}</h2>

                    <ul>
                        <li><NavLink to="/cursos">{textos.footer.computacion}</NavLink></li>
                        <li><NavLink to="/cursos">{textos.footer.internet}</NavLink></li>
                        <li><NavLink to="/cursos">{textos.footer.herramientas}</NavLink></li>
                        <li><NavLink to="/cursos">{textos.footer.seguridad}</NavLink></li>
                    </ul>

                </section>


                {/* INFORMACIÓN ADICIONAL */}
                <section className="footer-columna">

                    <h2>{textos.footer.informacion}</h2>

                    <ul>
                        <li><NavLink to="/nosotros">{textos.footer.mision}</NavLink></li>
                        <li><NavLink to="/accesibilidad">{textos.footer.compromiso}</NavLink></li>
                        <li><NavLink to="/contacto">{textos.footer.consulta}</NavLink></li>
                    </ul>

                </section>

            </div>


            {/* DERECHOS RESERVADOS */}
            <div className="footer-inferior">

                <div className="contenedor">

                    <p>{textos.footer.derechos}</p>

                    <p>{textos.footer.frase}</p>

                </div>

            </div>

        </footer>
    );
}
