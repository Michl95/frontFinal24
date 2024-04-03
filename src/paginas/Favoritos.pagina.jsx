import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente";
import { useAppSelector } from '../redux/store/store';

const PaginaFavoritos = () => {
    // Seleccionar todos los personajes marcados como favoritos de la lista allCharacters
    const favoritos = useAppSelector(state => 
        state.characters.allCharacters.filter(character => character.isFavorite)
    );

    return (
        <div className="container">
            <div className="actions">
                <h3>Personajes Favoritos</h3>
            </div>
            {/* Pasar favoritos al componente GrillaPersonajes */}
            <GrillaPersonajes characters={favoritos} />
        </div>
    );
}

export default PaginaFavoritos;
