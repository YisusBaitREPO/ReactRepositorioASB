import { NavLink } from "react-router-dom";
export default function Header() {

    return (

        <header className="encabezado">

            <div className="contenedor encabezado-contenido">

                {/* LOGO */}
                <NavLink to="/" className="logo">
                    <img
                        src="../../public/MEDIA/IMG/logo.png"
                        alt="Aprende sin Barreras - Inicio"
                    />
                </NavLink>


                {/* MENÚ DE NAVEGACIÓN */}
                <nav aria-label="Navegación principal">

                    <ul className="menu">

                        <li>
                            <NavLink to="/">Inicio</NavLink>
                        </li>

                        <li>
                            <NavLink to="/cursos">Cursos</NavLink>
                        </li>

                        <li>
                            <NavLink to="/nosotros">Nosotros</NavLink>
                        </li>

                        <li>
                            <NavLink to="/accesibilidad">Accesibilidad</NavLink>
                        </li>

                        <li>
                            <NavLink to="/contacto">Contacto</NavLink>
                        </li>

                    </ul>

                </nav>

            </div>

        </header>

    );

}
