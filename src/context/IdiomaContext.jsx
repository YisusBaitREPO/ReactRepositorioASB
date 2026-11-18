
import { createContext, useContext, useState, useEffect } from "react";
import { obtenerTraducciones } from "../JS/idiomas";

const IdiomaContext = createContext();

export function IdiomaProvider({ children }) {

    const [idioma, setIdioma] = useState(() => {
        const idiomaGuardado = localStorage.getItem("idioma");

        if (idiomaGuardado === "es" || idiomaGuardado === "en") {
            return idiomaGuardado;
        }

        return "es";
    });

    const textos = obtenerTraducciones(idioma);

    useEffect(() => {
        localStorage.setItem("idioma", idioma);
    }, [idioma]);

    return (
        <IdiomaContext.Provider value={{ idioma, setIdioma, textos }}>
            {children}
        </IdiomaContext.Provider>
    );
}

export function useIdioma() {
    return useContext(IdiomaContext);
}
