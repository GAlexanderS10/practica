import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/PerfilCliente.css';
import Perfil from '../../assets/perfildefecto.png'

const Usuario = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {

    const obtenerUsuarioPorDNI = async () => {
      const dni = localStorage.getItem('dni');
      try {
        const response = await axios.get(`https://localhost:7266/api/Usuario/Dni/${dni}`);
        setUsuario(response.data);

        localStorage.setItem('usuarioId', response.data.usuarioId);
      } catch (error) {
        console.error('Error al obtener los datos del cliente:', error);
      }
    };

    obtenerUsuarioPorDNI();
  }, []);

  return (
    <div>
      {usuario ? (
        <div> 
          <div className="card_datos_cliente">
            <div className="card__perfil">
              <div className="card__nombre">
                <img className="img-cliente" src={Perfil} alt="" />
              </div>
              <div className="card__descripcion">
                <div className="detalle-texto-cliente">
                  <span className="subtitulo-cliente">ID:</span> <span className="campos-card">{usuario.usuarioId}</span>
                </div>
                <div className="detalle-texto-cliente">
                  <span className="subtitulo-cliente">Nombres:</span> <span className="campos-card">{usuario.nombres}</span>
                </div>
                <div className="detalle-texto-cliente">
                  <span className="subtitulo-cliente">Apellidos:</span> <span className="campos-card">{usuario.apellidos}</span>
                </div>
                <div className="detalle-texto-cliente">
                  <span className="subtitulo-cliente">Dni:</span> <span className="campos-card">{usuario.dni}</span>
                </div>
                <div className="detalle-texto-cliente">
                  <span className="subtitulo-cliente">Celular:</span> <span className="campos-card">{usuario.celular}</span>
                </div>
                <div className="detalle-texto-cliente">
                  <span className="subtitulo-cliente">Email:</span> <span className="campos-card">{usuario.email}</span>
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

export default Usuario;
