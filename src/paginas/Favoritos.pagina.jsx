import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente";
import { useAppSelector } from '../redux/store/store';
import { useDispatch } from "react-redux";
import { removeAllFavoritesThunk } from "../redux/actions/actions";

const PaginaFavoritos = () => {

    const dispatch = useDispatch();
    // Seleccionar todos los personajes marcados como favoritos de la lista allCharacters
    const favoritos = useAppSelector(state => 
        state.characters.allCharacters.filter(character => character.isFavorite)
    );


    /**
     * Maneja el click del eliminar.
     * Dispatchea la accion para eliminar todos los favs.
     * @returns {void}
    */
    const handleRemoveAllFavorites = (): void => {
        dispatch(removeAllFavoritesThunk());
    };

    return (
        <div className="container">
            <div className="actions">
                <h3>Personajes Favoritos</h3>
            </div>
            <button onClick={handleRemoveAllFavorites}>
                Eliminar todos
            </button>
            {/* Pasar favoritos al componente GrillaPersonajes */}
            <GrillaPersonajes characters={favoritos} />
        </div>
    );
}

export default PaginaFavoritos;
