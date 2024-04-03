// actions.ts
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store/store';
import { fetchCharacters } from './api'; 


export interface Character {
    id: number;
    name: string;
    isFavorite: boolean; 
}


export interface CharacterAction {
    type: string;
    payload?: any;
}

// definicio de acciones
export const FETCH_CHARACTERS_REQUEST = 'FETCH_CHARACTERS_REQUEST';
export const FETCH_CHARACTERS_SUCCESS = 'FETCH_CHARACTERS_SUCCESS';
export const FETCH_CHARACTERS_FAILURE = 'FETCH_CHARACTERS_FAILURE';
export const SET_FILTER = 'SET_FILTER';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const REMOVE_ALL_FAVORITES = 'REMOVE_ALL_FAVORITES';


export const setFilter = (filterText: string): CharacterAction => ({
    type: SET_FILTER,
    payload: filterText
});

export const toggleFavorite = (characterId: number): CharacterAction => ({
    type: TOGGLE_FAVORITE,
    payload: characterId
});

export const removeAllFavorites = (): CharacterAction => ({
    type: REMOVE_ALL_FAVORITES
});

// Thunk para eliminar todos los favs
export const removeAllFavoritesThunk = (): ThunkAction<void, RootState, unknown, CharacterAction> => (dispatch) => {
    // limpiamos del storage
    localStorage.removeItem('favorites');

    // Dispatch para eliminar todos los favs
    dispatch(removeAllFavorites());
};


export const fetchCharactersAPI = (pagina: number = 1): ThunkAction<void, RootState, unknown, CharacterAction> => async (dispatch, getState) => {
    dispatch({ type: FETCH_CHARACTERS_REQUEST });

    // filtro directamente del estado
    const filtroActual = getState().filter.filter;

    try {
        const response = await fetchCharacters(filtroActual, pagina);
        dispatch({
            type: FETCH_CHARACTERS_SUCCESS,
            payload: {
                characters: response.results,
                totalPaginas: response.info.pages,
                filter: filtroActual
            }
        });
             
    } catch (error) {
        if (error instanceof Error) {
            dispatch({ type: FETCH_CHARACTERS_FAILURE, payload: error.message });
        } else {
            dispatch({ type: FETCH_CHARACTERS_FAILURE, payload: 'An unknown error occurred' });
        }
    }
};



