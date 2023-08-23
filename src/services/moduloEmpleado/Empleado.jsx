import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/PerfilCliente.css';
import Perfil from '../../assets/perfildefecto.png'

const Empleado = () => {
  const [empleado, setEmpleado] = useState(null);

  useEffect(() => {

    const obtenerEmpleadoPorDNI = async () => {
      const dni = localStorage.getItem('dni');
      try {
        const response = await axios.get(`https://localhost:7266/api/Empleado/Dni/${dni}`);
        setEmpleado(response.data);

        localStorage.setItem('empleadoId', response.data.empleadoId);
      } catch (error) {
        console.error('Error al obtener los datos del cliente:', error);
      }
    };

    obtenerEmpleadoPorDNI();
  }, []);

  return (
    <div>
      {empleado ? (
        <div> 
          <div className="card_datos_cliente">
            <div className="card__perfil">
              <div className="card__nombre">
                <img className="img-cliente" src={Perfil} alt="" />
              </div>
              <div className="card__descripcion">
                <div className="detalle-texto-cliente">
                  <span className="subtitulo-cliente">ID:</span> <span className="campos-card">{empleado.clienteId}</span>
                </div>
                <div className="detalle-texto-cliente">
                  <span className="subtitulo-cliente">Nombres:</span> <span className="campos-card">{empleado.nombres}</span>
                </div>
                <div className="detalle-texto-cliente">
                  <span className="subtitulo-cliente">Apellidos:</span> <span className="campos-card">{empleado.apellidos}</span>
                </div>
                <div className="detalle-texto-cliente">
                  <span className="subtitulo-cliente">Dni:</span> <span className="campos-card">{empleado.dni}</span>
                </div>
                <div className="detalle-texto-cliente">
                  <span className="subtitulo-cliente">Celular:</span> <span className="campos-card">{empleado.celular}</span>
                </div>
                <div className="detalle-texto-cliente">
                  <span className="subtitulo-cliente">Email:</span> <span className="campos-card">{empleado.email}</span>
                </div>
              </div>
              <hr />
              <div className="card__button">
                <button className="btn-editar-cliente">
                  <i className='bx bx-edit'></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Empleado;
