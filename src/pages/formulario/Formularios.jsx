import React, { createRef, useState } from "react";
import axios from "axios";
import "../../styles/FormulariosStyles.css";
import ImgLogin from "../../assets/ImgIniciar.jpg";
import ImgRegistro from "../../assets/ImgRegistro.jpeg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Formularios = () => {
  const namePattern = /^[A-Za-zñÑáÁéÉíÍóÓúÚ\s]+$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [signInFormData, setSignInFormData] = useState({
    userName: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    userName: false,
    password: false,
  });

  const [formErrors, setFormErrors] = useState({
    nombres: false,
    apellidos: false,
    dni: false,
    celular: false,
    email: false,
    userName: false,
    password: false,
  });

  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [blockLoginTime, setBlockLoginTime] = useState(null);

  const handleSignInInputChange = (event) => {
    const { name, value } = event.target;
    setSignInFormData({
      ...signInFormData,
      [name]: value,
    });
  };

  const handleSignInSubmit = async (event) => {
    event.preventDefault();

    if (blockLoginTime && new Date() < new Date(blockLoginTime)) {
      const remainingTime = Math.ceil(
        (new Date(blockLoginTime) - new Date()) / 1000
      );
      Swal.fire({
        icon: "error",
        title: "Inicio de sesión bloqueado",
        text: `Por favor, espere ${remainingTime} segundos antes de intentar nuevamente.`,
      });
      return;
    }

    if (!signInFormData.userName || !signInFormData.password) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos del formulario.",
      });
      setErrors({
        userName: !signInFormData.userName,
        password: !signInFormData.password,
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7266/api/Autenticacion/Validar",
        signInFormData
      );

      setIncorrectAttempts(0);

      const { token, dni, roles } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("dni", dni);
      localStorage.setItem("role", roles);

        console.log(token)
        setTimeout(() => {
          console.clear();
        }, 30000);
      navigate("/menu");

      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
        text: `¡Bienvenido al Sistema "${roles}"!`,
      });

      setSignInFormData({
        userName: "",
        password: "",
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      setIncorrectAttempts(incorrectAttempts + 1);
      setBlockLoginTime(
        new Date(new Date().getTime() + incorrectAttempts * 60000)
      );

      Swal.fire({
        icon: "error",
        title: "Error al iniciar sesión",
        text: "Username o Password incorrecto",
      });
    }
  };

  const containerRef = createRef();
  const formRef = createRef();
  const [showSignInForm, setShowSignInForm] = useState(true);
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    celular: "",
    email: "",
    userName: "",
    password: "",
  });

  const handleSignUpClick = () => {
    if (containerRef.current) {
      containerRef.current.classList.add("sign-up-mode");
    }
  };

  const handleSignInClick = () => {
    if (containerRef.current) {
      containerRef.current.classList.remove("sign-up-mode");
    }
  };

  const handleRegistroSubmit = async (event) => {
    event.preventDefault();

    try {
      const requiredFields = [
        "nombres",
        "apellidos",
        "dni",
        "celular",
        "email",
        "userName",
        "password",
      ];

      const isEmptyField = requiredFields.some((field) => !formData[field]);

      if (isEmptyField) {
        Swal.fire({
          icon: "warning",
          title: "Campos incompletos",
          text: "Por favor, complete todos los campos del formulario.",
        });
        return;
      }

      const response = await axios.post(
        "https://localhost:7266/api/Usuario/crearusuario",
        formData
      );
      const usuarioIdRecienCreado = response.data;

      console.log(
        `Usuario registrado con el UsuarioId: ${usuarioIdRecienCreado}`
      );

      setFormData({
        nombres: "",
        apellidos: "",
        dni: "",
        celular: "",
        email: "",
        userName: "",
        password: "",
      });

      handleSignInClick();

      const asignarRolModel = {
        UsuarioId: usuarioIdRecienCreado,
        RolId: 4,
      };

      await axios.post(
        "https://localhost:7266/api/UsuarioRol",
        asignarRolModel
      );

      console.log('Rol "Cliente" asignado al usuario exitosamente.');

      Swal.fire({
        icon: "success",
        title: "Registro de usuario exitoso",
        text: "Ahora puede ingresar al sistema!",
      });

      handleSignInClick();
    } catch (error) {
      console.error("Error al registrar el usuario:", error);

      Swal.fire({
        icon: "error",
        title: "Error al registrar el usuario",
        text: "Revise los datos ingresados",
      });
    }
  };

  const handleFieldFocus = (fieldName) => {
    setErrors({
      ...errors,
      [fieldName]: false,
    });
  };

  const handleFieldBlur = (fieldName) => {
    if (!signInFormData[fieldName]) {
      setErrors({
        ...errors,
        [fieldName]: true,
      });
    }
  };

  const handleFieldFocusRegistro = (fieldName) => {
    setFormErrors({
      ...formErrors,
      [fieldName]: false,
    });
  };

  const handleFieldBlurRegistro = (fieldName) => {
    if (!formData[fieldName]) {
      setFormErrors({
        ...formErrors,
        [fieldName]: true,
      });
    }
  };

  return (
    <div className="container-view-user">
      <div className="container" ref={containerRef}>
        <div className="forms-container">
          <div className="signin-signup">
            <form
              action="#"
              className={`sign-in-form ${showSignInForm ? "visible" : ""}`}
              ref={formRef}
              onSubmit={handleSignInSubmit}
            >
              {/* Formulario de inicio de sesión */}
              <h2 className="title">INICIAR SESIÓN</h2>
              <div className={`input-field ${errors.userName ? "error" : ""}`}>
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="UserName"
                  name="userName"
                  value={signInFormData.userName}
                  onChange={handleSignInInputChange}
                  onFocus={() => handleFieldFocus("userName")}
                  onBlur={() => handleFieldBlur("userName")}
                />
                {errors.userName && (
                  <p className="error-message">Este campo es requerido.</p>
                )}
              </div>
              <div className={`input-field ${errors.password ? "error" : ""}`}>
                <i className="fas fa-lock"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={signInFormData.password}
                  onChange={handleSignInInputChange}
                  onFocus={() => handleFieldFocus("password")}
                  onBlur={() => handleFieldBlur("password")}
                />
                <i
                  className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
                {errors.password && (
                  <p className="error-message">Este campo es requerido.</p>
                )}
              </div>

              <input type="submit" value="Ingresar" className="btn solid" />
            </form>
            
            {/* Formulario de Registro de Usuario */}

            <form
              action="#"
              className={`sign-up-form ${showSignInForm ? "" : "visible"}`}
              onSubmit={handleRegistroSubmit}
            >
              <h2 className="title">REGISTRO DE USUARIO</h2>
              <div className="input-field-grid">
                <div
                  className={`input-field ${formErrors.nombres ? "error" : ""}`}
                >
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Nombres"
                    name="nombres"
                    required
                    value={formData.nombres}
                    onChange={(e) => {
                      setFormData({ ...formData, nombres: e.target.value });

                      if (!namePattern.test(e.target.value)) {
                        setErrors({ ...formErrors, nombres: true });
                      } else {
                        setErrors({ ...formErrors, nombres: false });
                      }
                    }}
                    onFocus={() => handleFieldFocusRegistro("nombres")}
                    onBlur={() => handleFieldBlurRegistro("nombres")}
                  />
                  {formErrors.nombres && (
                    <p className="error-message">Campo requerido.</p>
                  )}
                  {errors.nombres && (
                    <p className="error-message">
                      Este campo solo permite texto
                    </p>
                  )}
                </div>
                <div
                  className={`input-field ${
                    formErrors.apellidos ? "error" : ""
                  }`}
                >
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Apellidos"
                    name="apellidos"
                    required
                    value={formData.apellidos}
                    onChange={(e) => {
                      setFormData({ ...formData, apellidos: e.target.value });

                      if (!namePattern.test(e.target.value)) {
                        setErrors({ ...formErrors, apellidos: true });
                      } else {
                        setErrors({ ...formErrors, apellidos: false });
                      }
                    }}
                    onFocus={() => handleFieldFocusRegistro("apellidos")}
                    onBlur={() => handleFieldBlurRegistro("apellidos")}
                  />
                  {formErrors.apellidos && (
                    <p className="error-message">Campo requerido.</p>
                  )}
                  {errors.apellidos && (
                    <p className="error-message">
                      Este campo solo permite texto
                    </p>
                  )}
                </div>
              </div>
              <div className="input-field-grid">
                <div className={`input-field ${formErrors.dni ? "error" : ""}`}>
                  <i className="fas fa-address-card"></i>
                  <input
                    type="number"
                    placeholder="Dni"
                    name="dni"
                    required
                    value={formData.dni}
                    onChange={(e) => {
                      setFormData({ ...formData, dni: e.target.value });

                      if (!/^\d{8}$/.test(e.target.value)) {
                        setErrors({ ...formErrors, dni: true });
                      } else {
                        setErrors({ ...formErrors, dni: false });
                      }
                    }}
                    onFocus={() => handleFieldFocusRegistro("dni")}
                    onBlur={() => handleFieldBlurRegistro("dni")}
                  />
                  {formErrors.dni && (
                    <p className="error-message">Campo requerido.</p>
                  )}
                  {errors.dni && (
                    <p className="error-message">
                      El DNI solo tiene 8 caracteres
                    </p>
                  )}
                </div>
                <div
                  className={`input-field ${formErrors.celular ? "error" : ""}`}
                >
                  <i className="fas fa-phone"></i>
                  <input
                    type="number"
                    placeholder="Celular"
                    name="celular"
                    required
                    value={formData.celular}
                    onChange={(e) => {
                      setFormData({ ...formData, celular: e.target.value });

                      if (!/^\d{9}$/.test(e.target.value)) {
                        setErrors({ ...formErrors, celular: true });
                      } else {
                        setErrors({ ...formErrors, celular: false });
                      }
                    }}
                    onFocus={() => handleFieldFocusRegistro("celular")}
                    onBlur={() => handleFieldBlurRegistro("celular")}
                  />
                  {formErrors.celular && (
                    <p className="error-message">Campo requerido.</p>
                  )}
                  {errors.celular && (
                    <p className="error-message">
                      El Celular solo tiene 9 caracteres
                    </p>
                  )}
                </div>
              </div>
              <div className={`input-field ${formErrors.email ? "error" : ""}`}>
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });

                    if (!emailPattern.test(e.target.value)) {
                      setErrors({ ...formErrors, email: true });
                    } else {
                      setErrors({ ...formErrors, email: false });
                    }
                  }}
                  onFocus={() => handleFieldFocusRegistro("email")}
                  onBlur={() => handleFieldBlurRegistro("email")}
                />
                {formErrors.email && (
                  <p className="error-message">Campo requerido.</p>
                )}
                {errors.email && (
                  <p className="error-message">
                    Ingrese un formato de correo válido.
                  </p>
                )}
              </div>

              <div className="input-field-grid">
                <div
                  className={`input-field ${
                    formErrors.userName ? "error" : ""
                  }`}
                >
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="UserName"
                    name="userName"
                    required
                    value={formData.userName}
                    onChange={(e) => {
                      setFormData({ ...formData, userName: e.target.value });

                      if (
                        e.target.value.length < 8 ||
                        e.target.value.length > 60 ||
                        /\s/.test(e.target.value)
                      ) {
                        setErrors({ ...formErrors, userName: true });
                      } else {
                        setErrors({ ...formErrors, userName: false });
                      }
                    }}
                    onFocus={() => handleFieldFocusRegistro("userName")}
                    onBlur={() => handleFieldBlurRegistro("userName")}
                  />
                  {formErrors.userName && (
                    <p className="error-message">Campo requerido.</p>
                  )}
                  {errors.userName && (
                    <p className="error-message">
                      Ingresar entre 8 y 60 caracteres
                    </p>
                  )}
                </div>
                <div
                  className={`input-field ${
                    formErrors.password ? "error" : ""
                  }`}
                >
                  <i className="fas fa-lock"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });

                      if (!passwordPattern.test(e.target.value)) {
                        setErrors({ ...formErrors, password: true });
                      } else {
                        setErrors({ ...formErrors, password: false });
                      }
                    }}
                    onFocus={() => handleFieldFocusRegistro("password")}
                    onBlur={() => handleFieldBlurRegistro("password")}
                  />
                  {formErrors.password && (
                    <p className="error-message">Campo requerido.</p>
                  )}
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye" : "fa-eye-slash"
                    }`}
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                  {errors.password && (
                    <p className="error-message">
                      Ingresar como mínimo 8 caracteres, 1 Mayuscula, 1 caracter
                      especial y 1 número
                    </p>
                  )}
                </div>
              </div>
              <input
                type="submit"
                className="btn"
                value="Registrate"
                id="btnRegistrar"
              />
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>¡BIENVENIDO!</h3>
              <p>
                ¿Aún no ha registrado una cuenta con la cual ingresar al
                Sistema?
              </p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={handleSignUpClick}
              >
                Registrate
              </button>
            </div>
            <img src={ImgLogin} className="image" alt="ImgLogin" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>INGRESA AL SISTEMA</h3>
              <p>
                Ahora puede Iniciar Sesión al Sistema con la cuenta Registrada
              </p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={handleSignInClick}
              >
                Ingresar
              </button>
            </div>
            <img src={ImgRegistro} className="image" alt="ImgRegistro" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formularios;
