import { NavLink } from "react-router-dom";
import { useIdioma } from "../context/IdiomaContext";

export default function Header() {
    const { idioma, setIdioma, textos } = useIdioma();

    return (
        <header className="encabezado">
            <div className="contenedor encabezado-contenido">

                {/* LOGO */}
                <NavLink to="/" className="logo">
                    <img
                        src="/MEDIA/IMG/logo.png"
                        alt="Aprende sin Barreras - Inicio"
                    />
                </NavLink>

                {/* MENÚ DE NAVEGACIÓN */}
                <nav aria-label={textos.menu.navegacionPrincipal}>
                    <ul className="menu">
                        <li><NavLink to="/">{textos.menu.inicio}</NavLink></li>
                        <li><NavLink to="/cursos">{textos.menu.cursos}</NavLink></li>
                        <li><NavLink to="/nosotros">{textos.menu.nosotros}</NavLink></li>
                        <li><NavLink to="/accesibilidad">{textos.menu.accesibilidad}</NavLink></li>
                        <li><NavLink to="/contacto">{textos.menu.contacto}</NavLink></li>
                    </ul>
                </nav>

                {/* SELECTOR DE IDIOMA */}
                <div className="selector-idioma">
                    <label htmlFor="idioma">
                        Language / Idioma
                    </label>

                    <select
                        id="idioma"
                        value={idioma}
                        onChange={(e) => setIdioma(e.target.value)}
                    >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                    </select>
                </div>

            </div>
        </header>
    );
}


