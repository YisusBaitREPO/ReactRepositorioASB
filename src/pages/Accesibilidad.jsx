
import { useIdioma } from "../context/IdiomaContext";

export default function Accesibilidad() {
    const { idioma, textos } = useIdioma();

    const region = idioma === "es" ? "es-PE" : "en-US";

    const fecha = new Intl.DateTimeFormat(region, {
        dateStyle: "long"
    }).format(new Date());

    const hora = new Intl.DateTimeFormat(region, {
        hour: "numeric",
        minute: "2-digit"
    }).format(new Date());

    const numero = new Intl.NumberFormat(region).format(1234567.89);

    const moneda = new Intl.NumberFormat(region, {
        style: "currency",
        currency: idioma === "es" ? "PEN" : "USD"
    }).format(1250.50);

    return (
        <>
            {/* PORTADA */}
            <section className="nosotros-portada">
                <div className="contenedor">

                    <p className="subtitulo">
                        {textos.accesibilidad.subtitulo}
                    </p>

                    <h1>{textos.accesibilidad.titulo}</h1>

                    <p>
                        {textos.accesibilidad.descripcion}
                    </p>

                </div>
            </section>

            {/* CARACTERÍSTICAS DE ACCESIBILIDAD */}
            <section className="seccion">
                <div className="contenedor">

                    <div className="titulo-seccion">
                        <h2>{textos.accesibilidad.seccionTitulo}</h2>

                        <p>
                            {textos.accesibilidad.seccionDescripcion}
                        </p>
                    </div>

                    <div className="accesibilidad-lista">

                        <article className="accesibilidad-item">
                            <h2>{textos.accesibilidad.perceptibleTitulo}</h2>

                            <p>
                                {textos.accesibilidad.perceptibleDescripcion}
                            </p>
                        </article>

                        <article className="accesibilidad-item">
                            <h2>{textos.accesibilidad.operableTitulo}</h2>

                            <p>
                                {textos.accesibilidad.operableDescripcion}
                            </p>
                        </article>

                        <article className="accesibilidad-item">
                            <h2>{textos.accesibilidad.comprensibleTitulo}</h2>

                            <p>
                                {textos.accesibilidad.comprensibleDescripcion}
                            </p>
                        </article>

                        <article className="accesibilidad-item">
                            <h2>{textos.accesibilidad.robustoTitulo}</h2>

                            <p>
                                {textos.accesibilidad.robustoDescripcion}
                            </p>
                        </article>

                    </div>

                </div>
            </section>
            
            {/* FORMATOS REGIONALES */}
            <section className="seccion">
                <div className="contenedor">

                    <div className="titulo-seccion">
                        <h2>{textos.accesibilidad.formatosTitulo}</h2>

                        <p>
                            {textos.accesibilidad.formatosDescripcion}
                        </p>
                    </div>

                    <div className="formatos-grid">

                        <article className="formato-item">
                            <h3>{textos.accesibilidad.fecha}</h3>
                            <p>{fecha}</p>
                        </article>

                        <article className="formato-item">
                            <h3>{textos.accesibilidad.hora}</h3>
                            <p>{hora}</p>
                        </article>

                        <article className="formato-item">
                            <h3>{textos.accesibilidad.numero}</h3>
                            <p>{numero}</p>
                        </article>

                        <article className="formato-item">
                            <h3>{textos.accesibilidad.moneda}</h3>
                            <p>{moneda}</p>
                        </article>

                    </div>

                </div>
            </section>

            {/* NUESTRO COMPROMISO */}
            <section className="seccion">
                <div className="contenedor">

                    <div className="titulo-seccion">
                        <h2>{textos.accesibilidad.compromisoTitulo}</h2>

                        <p>
                            {textos.accesibilidad.compromisoDescripcion}
                        </p>
                    </div>

                </div>
            </section>
        </>
    );
}
