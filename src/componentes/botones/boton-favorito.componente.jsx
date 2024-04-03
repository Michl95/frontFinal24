import './boton-favorito.css';

/**
 * Botón que indica si un elemento es favorito o no, y da la posibilidad de marcarlo/desmarcarlo
 *
 * @param {boolean} esFavorito - Indica si el elemento está marcado como favorito.
 * @param {Function} onClick - Función para manejar el evento de clic en el botón.
 * @returns {JSX.Element} - Elemento JSX que representa un botón de favorito.
 */
const BotonFavorito = ({ esFavorito, onClick }) => {
    const src = esFavorito ? "imagenes/star-filled.png" : "imagenes/star.png";

    return (
        <div className="boton-favorito" onClick={onClick}>
            <img src={src} alt={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"} />
        </div>
    );
};

export default BotonFavorito;
