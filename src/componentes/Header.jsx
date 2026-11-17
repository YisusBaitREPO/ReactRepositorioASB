import { NavLink } from "react-router-dom";
import { useIdioma } from "../context/IdiomaContext";
export default function Header() {

    const { textos } = useIdioma();
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
                            <NavLink to="/">{textos.menu.inicio}</NavLink>
                        </li>

                        <li>
                            <NavLink to="/cursos">{textos.menu.cursos}</NavLink>
                        </li>

                        <li>
                            <NavLink to="/nosotros">{textos.menu.nosotros}</NavLink>
                        </li>

                        <li>
                            <NavLink to="/accesibilidad">{textos.menu.accesibilidad}</NavLink>
                        </li>

                        <li>
                            <NavLink to="/contacto">{textos.menu.contacto}</NavLink>
                        </li>

                    </ul>

                </nav>

            </div>

        </header>

    );

}
