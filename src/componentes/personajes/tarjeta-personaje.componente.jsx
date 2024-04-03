import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';

/**
 * Tarjeta para cada personaje dentro de la grilla de personajes. 
 * 
 * @param {string} nombre - El nombre del personaje.
 * @param {string} imagenUrl - La URL de la imagen del personaje.
 * @param {boolean} esFavorito - Indica si el personaje es favorito o no.
 * @param {Function} toggleFavorito - Función para cambiar el estado de favorito del personaje.
 * @returns {JSX.Element} - Elemento JSX que representa la tarjeta del personaje.
 */
const TarjetaPersonaje = ({ nombre, imagenUrl, esFavorito, toggleFavorito, id }) => {
    return (
        <div className="tarjeta-personaje">
            <img src={imagenUrl} alt={nombre} />
            <div className="tarjeta-personaje-body">
                <span>{nombre}</span>
                <BotonFavorito esFavorito={esFavorito} onClick={() => toggleFavorito(id)} />
            </div>
        </div>
    );
};

export default TarjetaPersonaje;
