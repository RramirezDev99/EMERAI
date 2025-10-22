// frontend/src/App.jsx

import ChatBox from './components/ChatBox';
import './App.css'; 

// IMPORTA SOLO LA IMAGEN DE SHREK
import shrekImage from './assets/shrek.png'; 


function App() {
  return (
    // Contenedor principal: El fondo de imagen global está en el ID
    <div id="app-container" className="d-flex justify-content-center align-items-center min-vh-100 p-3">
      
      {/* Nuevo Contenedor de Fila (Row) para el contenido */}
      <div className="row w-100 gx-4 justify-content-center" style={{ maxWidth: '1000px', height: '90vh' }}>
        
        {/* === COLUMNA IZQUIERDA: SHREK (Solo visible en LG y alineado abajo) === */}
        {/* d-none d-lg-flex: Oculta en móvil/tablet. Solo visible en escritorio (lg). */}
        <div className="col-lg-3 d-none d-lg-flex p-0 align-items-end justify-content-center h-100">
          <img 
            src={shrekImage} 
            alt="Shrek" 
            className="img-fluid" 
            style={{ maxHeight: '90%', objectFit: 'contain' }} 
          />
        </div>

        {/* === COLUMNA CENTRAL: CHATBOX (9/12) === */}
        {/* col-12: Ocupa todo el ancho en móvil/tablet. col-lg-9: Ocupa 9 columnas en escritorio. */}
        <div className="col-12 col-lg-9 p-0 h-100">
          {/* Contenedor principal del chat: Tema oscuro y semitransparente */}
          <div className="card shadow-lg bg-dark bg-opacity-75 h-100">
            <ChatBox />
          </div>
        </div>

        {/* === COLUMNA DERECHA ELIMINADA === */}

      </div> {/* Fin de la Fila (row) */}
      
    </div> // Fin del Contenedor Principal
  );
}

export default App;