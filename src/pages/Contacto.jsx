
import { useState } from "react";
import { useIdioma } from "../context/IdiomaContext";
import { useLocation } from "react-router-dom";

export default function Contacto() {

    const { textos } = useIdioma();
    const ubicacion = useLocation();

    const pedido = ubicacion.state;

    const [mensajeEstado, setMensajeEstado] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("");

    function enviarFormulario(e) {

        e.preventDefault();

        const formulario = e.target;

        const nombre = formulario.nombre.value.trim();
        const correo = formulario.correo.value.trim();
        const asunto = formulario.asunto.value.trim();
        const mensaje = formulario.mensaje.value.trim();

        if (!nombre || !correo || !asunto || !mensaje) {

            setTipoMensaje("error");
            setMensajeEstado(textos.contacto.errorCampos);
            return;

        }

        const validarCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!validarCorreo.test(correo)) {

            setTipoMensaje("error");
            setMensajeEstado(textos.contacto.errorCorreo);
            return;

        }

        setTipoMensaje("exito");
        setMensajeEstado(textos.contacto.exito);

        formulario.reset();

    }

    return (

        <section className="seccion">

            <div className="contenedor">

                {/* TÍTULO DE CONTACTO */}

                <div className="titulo-seccion">

                    <p className="subtitulo">
                        {textos.contacto.subtitulo}
                    </p>

                    <h1>{textos.contacto.titulo}</h1>

                    <p>
                        {textos.contacto.descripcion}
                    </p>

                </div>

                {/* RESUMEN DEL PEDIDO */}

                {pedido?.cursos && pedido.cursos.length > 0 && (

                    <section className="resumen-pedido">

                        <h2>Resumen de tu pedido</h2>

                        <p>
                            Estos son los cursos que seleccionaste:
                        </p>

                        <div className="lista-resumen">

                            {pedido.cursos.map((curso) => (

                                <article
                                    className="producto-resumen"
                                    key={curso.id}
                                >

                                    <div>

                                        <h3>{curso.nombre}</h3>

                                        <p>
                                            Cantidad: {curso.cantidad}
                                        </p>

                                        <p>
                                            Precio mensual:{" "}
                                            {new Intl.NumberFormat(
                                                textos.contacto.locale || "es-PE",
                                                {
                                                    style: "currency",
                                                    currency: pedido.moneda || "PEN"
                                                }
                                            ).format(curso.precioMensual)}
                                        </p>

                                    </div>

                                    <strong>
                                        {new Intl.NumberFormat(
                                            textos.contacto.locale || "es-PE",
                                            {
                                                style: "currency",
                                                currency: pedido.moneda || "PEN"
                                            }
                                        ).format(curso.subtotal)}
                                    </strong>

                                </article>

                            ))}

                        </div>

                        <div className="total-resumen">

                            <h3>
                                Total: {pedido.totalFormateado}
                            </h3>

                        </div>

                    </section>

                )}

                {/* FORMULARIO */}

                <form
                    className="formulario"
                    onSubmit={enviarFormulario}
                    noValidate
                >

                    <p className="mensaje-ayuda">
                        {textos.contacto.ayuda}
                    </p>

                    <div className="campo">

                        <label htmlFor="nombre">
                            {textos.contacto.nombre}
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
                            {textos.contacto.correo}
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
                            {textos.contacto.asunto}
                        </label>

                        <input
                            type="text"
                            id="asunto"
                            name="asunto"
                            defaultValue={
                                pedido?.cursos
                                    ? "Solicitud de inscripción a cursos"
                                    : ""
                            }
                            required
                        />

                    </div>

                    <div className="campo">

                        <label htmlFor="mensaje">
                            {textos.contacto.mensaje}
                        </label>

                        <textarea
                            id="mensaje"
                            name="mensaje"
                            rows="5"
                            defaultValue={
                                pedido?.cursos
                                    ? "Deseo solicitar información sobre los cursos seleccionados."
                                    : ""
                            }
                            required
                        />

                    </div>

                    {mensajeEstado && (

                        <p
                            className={"mensaje-formulario " + tipoMensaje}
                            role={tipoMensaje === "error" ? "alert" : "status"}
                        >
                            {mensajeEstado}
                        </p>

                    )}

                    <button type="submit" className="boton">
                        {textos.contacto.boton}
                    </button>

                </form>

            </div>

        </section>

    );

}
