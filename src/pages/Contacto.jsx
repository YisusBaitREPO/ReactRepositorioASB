
export default function Contacto() {
    return (
        <section className="seccion">
            <div className="contenedor">

                {/* TÍTULO DE CONTACTO */}
                <div className="titulo-seccion">
                    <p className="subtitulo">
                        ESTAMOS PARA AYUDARTE
                    </p>

                    <h1>Contáctanos</h1>

                    <p>
                        Si tienes alguna consulta o sugerencia,
                        puedes comunicarte con nosotros.
                    </p>
                </div>

                {/* FORMULARIO */}
                <form className="formulario">

                    <div className="campo">
                        <label htmlFor="nombre">
                            Nombre completo
                        </label>

                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            autoComplete="name"
                            required
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="correo">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="asunto">
                            Asunto
                        </label>

                        <input
                            type="text"
                            id="asunto"
                            name="asunto"
                            required
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="mensaje">
                            Escribe tu mensaje
                        </label>

                        <textarea
                            id="mensaje"
                            name="mensaje"
                            rows="5"
                            required
                        />
                    </div>

                    <button type="button" className="boton">
                        Enviar mensaje
                    </button>

                </form>

            </div>
        </section>
    );
}


