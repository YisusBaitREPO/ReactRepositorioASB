import es from "../locales/es.json";
import en from "../locales/en.json";

// Reunimos todos los idiomas
const idiomas = {
    es: es,
    en: en
};

// Obtenemos las traducciones del idioma seleccionado
export function obtenerTraducciones(idioma) {
    return idiomas[idioma] || idiomas.es;
}