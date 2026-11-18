
import { useState } from "react";
import { useIdioma } from "../context/IdiomaContext";

export default function Contacto() {
    const { textos } = useIdioma();
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
};

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
                
                {/* FORMULARIO */}
                <form className="formulario" onSubmit={enviarFormulario} noValidate>

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
