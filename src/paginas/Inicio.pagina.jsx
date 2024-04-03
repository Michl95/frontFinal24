import { useState, useEffect } from 'react';
import Filtros from "../componentes/personajes/filtros.componente";
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente";
import Paginacion from "../componentes/paginacion/paginacion.componente";
import { useAppSelector, useAppDispatch } from '../redux/store/store';
import { fetchCharactersAPI, setFilter } from '../redux/actions/actions';

const PaginaInicio = () => {
    const dispatch = useAppDispatch();
    const { characters, loading, error, totalPaginas } = useAppSelector((state) => state.characters);
    const filtro = useAppSelector((state) => state.filter.filter);
    const [paginaActual, setPaginaActual] = useState(1);

    useEffect(() => {
        dispatch(fetchCharactersAPI(paginaActual, filtro));
        console.log('CHARACTERS: ', characters)
    }, [dispatch, paginaActual, filtro]);

    useEffect(() => {
        console.log('Characters después de actualización de estado:', characters);
    }, [characters]);


    /**
     * @function irAPaginaAnterior
     * Decrementa en 1 el numero actual de pagina para ir a la pagina anterior.
     * @returns {void} Nada es devuelto.
    */

    const irAPaginaAnterior = () => {
        if (paginaActual > 1) {
            console.log('Pagina anterior')
            setPaginaActual(prev => prev - 1);
        }
    };

    /**
     * @function irAPaginaSiguiente
     * Aumenta en 1 el numero actual de pagina para ir a la pagina siguiente.
     * @returns {void} Nada es devuelto.
    */
    
    const irAPaginaSiguiente = () => {
        if (paginaActual < totalPaginas) {
            console.log('Pasando Pagina')
            setPaginaActual(prev => prev + 1);
        }
    };

    /**
     * @function irAPagina
     * Navega a la pagina especifica.
     * @param {number} numeroPagina - Nnumero de pagina al cual se desea ir.
     * @returns {void} Nada es devuelto.
    */

    const irAPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    /**
     * Maneja el input del filtro
     * @function handleFilterChange
     * @param {string} filterText - el valor actual introducido en el input.
     * @returns {void} nada es devuelto.
    */
    
    const handleFilterChange = (filterText) => {
        dispatch(setFilter(filterText));
        setPaginaActual(1);
    };

    /**
     * Limpia el input del filtro y navega a la pagina 1 
     * @function handleClearFilters
     * @returns {void} Nada es devuelto.
    */

    const handleClearFilters = () => {
        dispatch(setFilter(''));
        setPaginaActual(1);
    };

    return (
        <div className="container">
            <div className="actions">
                <h3>Catálogo de Personajes</h3>
                {loading && <p>Cargando personajes...</p>}
                {error && <p>Error al cargar los personajes: {error}</p>}
            </div>
            <Filtros 
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters} 
            />
            {!loading && !error && (
                <>
                    <GrillaPersonajes characters={characters} />
                    <Paginacion
                        paginaActual={paginaActual}
                        totalPaginas={totalPaginas}
                        irAPaginaAnterior={irAPaginaAnterior}
                        irAPaginaSiguiente={irAPaginaSiguiente}
                        irAPagina={irAPagina}
                    />
                </>
            )}
        </div>
    );
}

export default PaginaInicio;
