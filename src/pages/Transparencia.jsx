
import { useIdioma } from "../context/IdiomaContext";

export default function Transparencia() {
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
                        {textos.transparencia.subtitulo}
                    </p>

                    <h1>{textos.transparencia.titulo}</h1>

                    <p>
                        {textos.transparencia.descripcion}
                    </p>

                </div>
            </section>

            {/* CARACTERÍSTICAS DE ACCESIBILIDAD */}
            <section className="seccion">
                <div className="contenedor">

                    <div className="titulo-seccion">
                        <h2>{textos.transparencia.seccionTitulo}</h2>

                        <p>
                            {textos.transparencia.seccionDescripcion}
                        </p>
                    </div>

                    <div className="accesibilidad-lista">

                        <article className="accesibilidad-item">
                            <h2>{textos.transparencia.perceptibleTitulo}</h2>

                            <p>
                                {textos.transparencia.perceptibleDescripcion}
                            </p>
                        </article>

                        <article className="accesibilidad-item">
                            <h2>{textos.transparencia.operableTitulo}</h2>

                            <p>
                                {textos.transparencia.operableDescripcion}
                            </p>
                        </article>

                        <article className="accesibilidad-item">
                            <h2>{textos.transparencia.comprensibleTitulo}</h2>

                            <p>
                                {textos.transparencia.comprensibleDescripcion}
                            </p>
                        </article>

                        <article className="accesibilidad-item">
                            <h2>{textos.transparencia.robustoTitulo}</h2>

                            <p>
                                {textos.transparencia.robustoDescripcion}
                            </p>
                        </article>

                    </div>

                </div>
            </section>
            
            {/* FORMATOS REGIONALES */}
            <section className="seccion">
                <div className="contenedor">

                    <div className="titulo-seccion">
                        <h2>{textos.transparencia.formatosTitulo}</h2>

                        <p>
                            {textos.transparencia.formatosDescripcion}
                        </p>
                    </div>

                    <div className="formatos-grid">

                        <article className="formato-item">
                            <h3>{textos.transparencia.fecha}</h3>
                            <p>{fecha}</p>
                        </article>

                        <article className="formato-item">
                            <h3>{textos.transparencia.hora}</h3>
                            <p>{hora}</p>
                        </article>

                        <article className="formato-item">
                            <h3>{textos.transparencia.numero}</h3>
                            <p>{numero}</p>
                        </article>

                        <article className="formato-item">
                            <h3>{textos.transparencia.moneda}</h3>
                            <p>{moneda}</p>
                        </article>

                    </div>

                </div>
            </section>

            {/* NUESTRO COMPROMISO */}
            <section className="seccion">
                <div className="contenedor">

                    <div className="titulo-seccion">
                        <h2>{textos.transparencia.compromisoTitulo}</h2>

                        <p>
                            {textos.transparencia.compromisoDescripcion}
                        </p>
                    </div>

                </div>
            </section>
        </>
    );
}
