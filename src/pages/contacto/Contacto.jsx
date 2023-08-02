import React, { Fragment } from 'react';
import Navbar from "../../components/navbar/Navbar";
import { useForm } from "../../hooks/useForm";
import Loader from "../../components/animacion/Loaders";
import Message from "../../components/animacion/Message";
import './Contacto.css'

const initialForm = {
  nombres: "",
  email: "",
  numerocontac: "",
  asunto: "",
  mensajecontacto: "",
};

const validationsForm = (form) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexComments = /^.{1,255}$/;
  
    if (!form.nombres.trim()) {
      console.log("El campo 'Nombres' es requerido");
    } else if (!regexName.test(form.nombres.trim())) {
      errors.nombres = "El campo 'Nombres' sólo acepta letras y espacios en blanco";
    }
  
    if (!form.email.trim()) {
      console.log("El campo 'Email' es requerido");
    } else if (!regexEmail.test(form.email.trim())) {
      errors.email = "El campo 'Email' es incorrecto";
    }

    if (!form.numerocontac.trim()) {
        console.log("El campo 'Número de Contacto' es requerido");
      } 
  
    if (!form.asunto.trim()) {
       console.log("El campo 'Asunto' es requerido");
    }
  
    if (!form.mensajecontacto.trim()) {
      console.log("El campo 'Mensaje' es requerido");
    }else if (!regexComments.test(form.mensajecontacto.trim())) {
      errors.mensajecontacto =
        "El campo 'Mensaje' no debe exceder los 255 caracteres";
    }
    if(!form.asunto.trim() && !form.mensajecontacto.trim() && !form.email.trim() && !form.nombres.trim() && !form.numerocontac.trim()){
      errors.nombres =
      "El campo 'Nombres' es requerido";
      errors.email =
      "El campo 'Email' es requerido";
      errors.numerocontac =
      "El campo 'Número de Contacto' es requerido";
      errors.asunto =
      "El campo 'Asunto' es requerido";
      errors.mensajecontacto =
        "El campo 'Mensaje' es requerido";
    }
  
    return errors;
  };

let styles = {
  fontSize: "11px",
  color: "#dc3545",
};

const Contacto = () => {
  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialForm, validationsForm);

  return (
    <>
      <Navbar />
      <br/>
      <br/>
      <br/>
      <br/>
      <div class="cuerpo">
        <div class="contenedor">
          <div class="contacto-wrapper animated bounceInUp">
            <div class="contacto-form">
              <h3>Contáctenos</h3>
              <form onSubmit={handleSubmit}>
                    <p>
                        <label>Nombres y Apellidos</label>
                        <input type="text" name="nombres" placeholder="Juan Perez"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={form.nombres}
                        required/>
                        {errors.nombres && <span style={styles}>{errors.nombres}</span>}
                    </p>
                    <p>
                        <label>Correo Electrónico</label>
                        <input type="email" name="email" placeholder="contacto@contacto.com"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={form.email}
                            required/>
                            {errors.email && <span style={styles}>{errors.email}</span>}
                    </p>
                    <p>
                        <label>Número de Contacto</label>
                        <input type="number" name="numerocontac" placeholder="98652006"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={form.numerocontac}
                            required/>
                            {errors.numerocontac && <span style={styles}>{errors.numerocontac}</span>}
                    </p>
                    <p>
                        <label>Asunto</label>
                        <input type="text" name="asunto" placeholder="Asunto"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={form.asunto}
                            required/>
                            {errors.asunto && <span style={styles}>{errors.asunto}</span>}
                    </p>
                    <p class="block">
                       <label>Mensaje</label> 
                        <textarea name="mensajecontacto" rows="4" placeholder="Escribe tus comentarios"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={form.mensajecontacto}
                            required></textarea>
                            {errors.mensajecontacto && <p style={styles}>{errors.mensajecontacto}</p>}
                    </p>
                    <p class="block">
                        <button>
                            ENVIAR
                        </button>
                    </p>
                </form>
                {loading && <Loader />}
                    {response && (
                <Message msg="Los datos han sido enviados" bgColor="#198754" />
      )}
            </div>
            <div class="contacto-info">
                <h4>Más Información a nuestros canales de Contacto</h4>
                <ul class="lista-contacto">
                    <li><i class="fas fa-map-marker-alt"></i> Colocar Dirección</li>
                    <li><i class="fas fa-phone"></i> (01)545-1181</li>
                    <li><i class="fas fa-envelope-open-text"></i> contactanos@vetpet.pe</li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacto;
