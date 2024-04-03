import { combineReducers } from 'redux';
import { CharacterAction, Character, FETCH_CHARACTERS_REQUEST, FETCH_CHARACTERS_SUCCESS, FETCH_CHARACTERS_FAILURE, SET_FILTER, TOGGLE_FAVORITE } from '../actions/actions';
import { loadFavoritesFromLocalStorage } from '../store/store';


export interface CharacterState {
    characters: Character[];
    totalPaginas: number;
    loading: boolean;
    error: string | null;
    allCharacters: Character[];
}


const initialCharacterState: CharacterState = {
    characters: [],
    totalPaginas: 1, 
    loading: false,
    error: null,
    allCharacters: [],
};


export interface FilterState {
    filter: string;
}


const initialFilterState: FilterState = {
    filter: ''
};


const characterReducer = (state = initialCharacterState, action: CharacterAction): CharacterState => {
    switch (action.type) {
        case FETCH_CHARACTERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
            case FETCH_CHARACTERS_SUCCESS:
    const favorites = loadFavoritesFromLocalStorage();

    // Actualizamos los personajes con los nuevos resultados, manteniendo el estado de favoritos
    const updatedAllCharacters = action.payload.characters.map((newChar: Character) => {
        const existingChar = state.allCharacters.find((char: Character) => char.id === newChar.id);
        const isFavorite = existingChar ? existingChar.isFavorite : favorites.some((fav: Character) => fav.id === newChar.id);
        return { ...newChar, isFavorite };
    });

    // todos los favoritos se mantengan en el estado
    const allFavorites = state.allCharacters.filter((char: Character) => char.isFavorite);
    const allCharacters = [...updatedAllCharacters, ...allFavorites.filter((fav: Character) => !updatedAllCharacters.some((newChar: Character) => newChar.id === fav.id))];

    // Filtrar los personajes para mostrar basado en el filtro actual
    const filteredCharacters = allCharacters.filter((char: Character) =>
        char.name.toLowerCase().includes(action.payload.filter.toLowerCase())
    );

    return {
        ...state,
        loading: false,
        allCharacters,
        characters: filteredCharacters,
        totalPaginas: action.payload.totalPaginas,
        error: null
    };




        case FETCH_CHARACTERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
            case TOGGLE_FAVORITE:
    // Actualizamos el estado de favoritos en allCharacters
    const newAllCharacters = state.allCharacters.map(character =>
        character.id === action.payload
        ? { ...character, isFavorite: !character.isFavorite }
        : character
    );

    // Guardamos favoritos actualizados en localStorage
    localStorage.setItem('favorites', JSON.stringify(newAllCharacters.filter(char => char.isFavorite)));


    return {
        ...state,
        allCharacters: newAllCharacters, // Actualizamos simepre la lista completa
        characters: state.characters.map(character =>
            character.id === action.payload
            ? { ...character, isFavorite: !character.isFavorite }
            : character
        ),
    };

        default:
            return state;
    }
};


const filterReducer = (state = initialFilterState, action: CharacterAction): FilterState => {
    switch (action.type) {
        case SET_FILTER:
    return {
        ...state,
        filter: action.payload
    };
    default:
        return state;
    }
};


const rootReducer = combineReducers({
    characters: characterReducer,
    filter: filterReducer
});


export default rootReducer;
