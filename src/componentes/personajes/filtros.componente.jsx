import { useState } from 'react';
import './filtros.css';

const Filtros = ({ onFilterChange, onClearFilters }) => {
    const [filtro, setFiltro] = useState('');

    const handleInputChange = (event) => {
        const value = event.target.value;
        setFiltro(value);
        onFilterChange(value);
        console.log(value)
    };

    const handleClearFilters = () => {
        setFiltro('');
        onFilterChange('');
        onClearFilters();
        console.log('Limpiano Filtro')
    };

    return (
        <div className="filtros">
            <label htmlFor="nombre">Filtrar por nombre:</label>
            <input
                type="text"
                placeholder="Rick, Morty, Beth, Alien, ...etc"
                name="nombre"
                value={filtro}
                onChange={handleInputChange}
            />
            <button onClick={handleClearFilters}>Limpiar filtros</button>
        </div>
    );
};

export default Filtros;
