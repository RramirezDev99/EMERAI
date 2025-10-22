// frontend/src/App.jsx

import ChatBox from './components/ChatBox';
import './App.css'; 

// IMPORTA LAS IMÁGENES NUEVAS Y ASÍGnales NOMBRES ÚNICOS
import sonicImage from './assets/sonic.png'; 
import shrekImage from './assets/shrek.png'; 


function App() {
  return (
    // Contenedor principal: El fondo de imagen global está en el ID
    <div id="app-container" className="d-flex justify-content-center align-items-center min-vh-100 p-3">
      
      {/* Nuevo Contenedor de Fila (Row) para las tres columnas */}
      {/* row w-100 gx-0: Fila, 100% de ancho, sin margen entre columnas */}
      <div className="row w-100 gx-0 justify-content-center" style={{ maxWidth: '1200px', height: '90vh' }}>
        
        {/* === COLUMNA IZQUIERDA: SONIC (2/12) === */}
        {/* d-none d-lg-block: Oculta en móvil/tablet, visible en escritorio (lg) */}
        <div className="col-lg-2 d-none d-lg-block p-0 d-flex align-items-center justify-content-center">
          <img 
            src={sonicImage} // Usa la imagen de SONIC
            alt="Sonic" 
            className="img-fluid rounded shadow-lg" 
            style={{ maxHeight: '70%', objectFit: 'contain' }} // Usamos 'contain' para que la imagen se vea completa
          />
        </div>

        {/* === COLUMNA CENTRAL: CHATBOX (8/12) === */}
        {/* col-12: Ocupa todo en móvil. col-lg-8: Ocupa 8 columnas en escritorio. */}
        <div className="col-12 col-lg-8 p-0 h-100">
            <div className="card shadow-lg bg-dark bg-opacity-75" style={{ width: '100%', maxWidth: '800px', height: '90vh' }}>
                <ChatBox />
            </div>
        </div>

        {/* === COLUMNA DERECHA: SHREK (2/12) === */}
        {/* Oculta en móvil/tablet, visible solo en escritorio grande (lg) */}
        <div className="col-lg-2 d-none d-lg-block p-0 d-flex align-items-center justify-content-center">
          <img 
            src={shrekImage} // Usa la imagen de SHREK
            alt="Shrek" 
            className="img-fluid rounded shadow-lg" 
            style={{ maxHeight: '70%', objectFit: 'contain' }} // Usamos 'contain' para que la imagen se vea completa
          />
        </div>

      </div> {/* Fin de la Fila (row) */}
      
    </div> // Fin del Contenedor Principal
  );
}

export default App;