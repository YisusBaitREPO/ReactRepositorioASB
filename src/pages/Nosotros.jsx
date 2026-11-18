
import { useIdioma } from "../context/IdiomaContext";

export default function Nosotros() {
    const { textos } = useIdioma();

    return (
        <>
            {/* PORTADA DE NOSOTROS */}
            <section className="nosotros-portada">

                <img
                    className="nosotros-portada-img"
                    src="/MEDIA/IMG/portada-nosotros.jpg"
                    alt=""
                />

                <div className="contenedor">

                    <p className="subtitulo">
                        {textos.nosotros.subtitulo}
                    </p>

                    <h1>{textos.nosotros.titulo}</h1>

                    <p>
                        {textos.nosotros.descripcion}
                    </p>

                </div>
            </section>


            {/* FONDO GENERAL: HISTORIA, MISIÓN, VISIÓN Y COMPROMISO */}
            <div className="nosotros-fondo-global">

                {/* IMAGEN DE FONDO PARA TODA ESTA ZONA */}
                <img
                    className="nosotros-fondo-img"
                    src="/MEDIA/IMG/nosotros/fondoNosotros.png"
                    alt=""
                />


                {/* NUESTRA HISTORIA */}
                <section className="seccion">
                    <div className="contenedor">

                        <div className="titulo-seccion">
                            <h2>{textos.nosotros.historiaTitulo}</h2>
                        </div>

                        <div className="nosotros-historia-contenido">

                            <div className="nosotros-texto">
                                <p>
                                    {textos.nosotros.historiaDescripcion}
                                </p>
                            </div>

                        </div>

                    </div>
                </section>


                {/* MISIÓN Y VISIÓN */}
                <section className="seccion">
                    <div className="contenedor">

                        <div className="titulo-seccion">
                            <h2>{textos.nosotros.misionVisionTitulo}</h2>
                        </div>

                        <div className="valores">

                            {/* TARJETA MISIÓN */}
                            <article className="valor">

                                <img
                                    className="valor-imagen"
                                    src="/MEDIA/IMG/nosotros/mision.png"
                                    alt=""
                                />

                                <h2>{textos.nosotros.misionTitulo}</h2>

                                <p>
                                    {textos.nosotros.misionDescripcion}
                                </p>

                            </article>


                            {/* TARJETA VISIÓN */}
                            <article className="valor">

                                <img
                                    className="valor-imagen"
                                    src="/MEDIA/IMG/nosotros/vision.png"
                                    alt=""
                                />

                                <h2>{textos.nosotros.visionTitulo}</h2>

                                <p>
                                    {textos.nosotros.visionDescripcion}
                                </p>

                            </article>


                            {/* TARJETA COMPROMISO */}
                            <article className="valor">

                                <img
                                    className="valor-imagen"
                                    src="/MEDIA/IMG/nosotros/compromiso.png"
                                    alt=""
                                />

                                <h2>{textos.nosotros.compromisoTitulo}</h2>

                                <p>
                                    {textos.nosotros.compromisoDescripcion}
                                </p>

                            </article>

                        </div>

                    </div>
                </section>

            </div>
        </>
    );
}
