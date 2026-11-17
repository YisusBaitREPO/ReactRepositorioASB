import { createContext, useContext, useState } from "react";
import { obtenerTraducciones } from "../utils/idiomas";

const IdiomaContext = createContext();

export function IdiomaProvider({ children }) {

    const [idioma, setIdioma] = useState("es");

    const textos = obtenerTraducciones(idioma);

    return (
        <IdiomaContext.Provider
            value={{ idioma, setIdioma, textos }}
        >
            {children}
        </IdiomaContext.Provider>
    );
}

export function useIdioma() {
    return useContext(IdiomaContext);
}