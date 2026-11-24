import es from "../assets/locales/es.json";
import en from "../assets/locales/en.json";
import fr from "../assets/locales/fr.json"

// Reunimos todos los idiomas
const idiomas = {
    es: es,
    en: en,
    fr: fr
};

// Obtenemos las traducciones del idioma seleccionado
export function obtenerTraducciones(idioma) {
    return idiomas[idioma] || idiomas.es;
}