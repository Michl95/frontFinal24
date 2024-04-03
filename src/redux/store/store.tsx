import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import rootReducer, { CharacterState, FilterState } from "../reducers/reducer";

export interface RootState {
  characters: CharacterState;
  filter: FilterState; 
}

export const loadFavoritesFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('favorites');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

// Cargar los favoritos desde el almacenamiento local
const favorites = loadFavoritesFromLocalStorage();

// Inicializar el estado de los personajes con los favoritos cargados
const initialCharacterState: CharacterState = {
  allCharacters: favorites, 
  characters: [],
  totalPaginas: 1, 
  loading: false,
  error: null,
};

const initialFilterState: FilterState = {
  filter: '', 
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    characters: initialCharacterState,
    filter: initialFilterState
  }
});

export type AppDispatch = typeof store.dispatch;

type DispatchFunction = () => AppDispatch;

export const useAppDispatch: DispatchFunction = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
