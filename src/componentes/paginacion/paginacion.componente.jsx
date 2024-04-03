import './paginacion.css';

type PaginacionProps = {
  paginaActual: number;
  totalPaginas: number;
  irAPaginaAnterior: () => void;
  irAPaginaSiguiente: () => void;
  irAPagina: (numeroPagina: number) => void;
};

const Paginacion: React.FC<PaginacionProps> = ({
  paginaActual,
  totalPaginas,
  irAPaginaAnterior,
  irAPaginaSiguiente,
  irAPagina,
}) => {
  const maxPaginas = 6;

  const renderNumerosPagina = () => {
    let items: JSX.Element[] = [];
    let inicio = Math.max(paginaActual - 2, 1);
    let fin = Math.min(inicio + 5, totalPaginas); // se muestran hasta 6 números
  
    if (fin === totalPaginas) {
      inicio = Math.max(fin - 5, 1);
    }
  
    for (let numero = inicio; numero <= fin; numero++) {
      items.push(
        <button
          key={numero}
          onClick={() => irAPagina(numero)}
          className={`numero-pagina ${paginaActual === numero ? 'active' : ''}`}
        >
          {numero}
        </button>
      );
    }
  
    // Agregar puntos suspensivos al final si es necesario
    if (fin < totalPaginas) {
      items.push(<span key="suspensivos">...</span>);
    }
  
    return items;
  };

  return (
    <div className="paginacion">
      <button
        disabled={paginaActual === 1}
        onClick={irAPaginaAnterior}
        className="primary"
      >
        Anterior
      </button>

      {renderNumerosPagina()} {/* Renderiza los números */}

      <button
        disabled={paginaActual === totalPaginas}
        onClick={irAPaginaSiguiente}
        className="primary"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Paginacion;
