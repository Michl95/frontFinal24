import React from 'react';
import TarjetaPersonaje from "./tarjeta-personaje.componente";
import { useDispatch } from "react-redux";
import { toggleFavorite } from "../../redux/actions/actions";

import './grilla-personajes.css';

const GrillaPersonajes = ({ characters }) => {
    const dispatch = useDispatch();

    // aseguramos que characters sea siempre un array
    if (!Array.isArray(characters)) {
        // error
        return <div>No se han encontrado personajes o están cargando.</div>;
    }

    const toggleFavorito = (id) => {
        dispatch(toggleFavorite(id));
        console.log('FAVORITEANDO', id);
    };

    return (
        <div className="grilla-personajes">
            {characters.length > 0 ? (
                characters.map(character => (
                    <TarjetaPersonaje
                        key={character.id}
                        id={character.id}
                        nombre={character.name}
                        imagenUrl={character.image}
                        esFavorito={character.isFavorite}
                        toggleFavorito={() => toggleFavorito(character.id)}
                    />
                ))
            ) : (
                <div>No hay personajes para mostrar.</div>
            )}
        </div>
    );
};

export default GrillaPersonajes;
