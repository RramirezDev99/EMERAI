// frontend/src/App.jsx
import ChatBox from './components/ChatBox';
import './App.css'; 

function App() {
  return (
    // EL FONDO DE IMAGEN VA AQUÍ (usando el ID en CSS)
    // d-flex, justify-content-center, y min-vh-100 aseguran el centrado y que cubra toda la página.
    <div id="app-container" className="d-flex justify-content-center align-items-center min-vh-100 p-3">
      
      {/* EL CHATBOX ES EL ÚNICO ELEMENTO QUE SERÁ SEMITRANSPARENTE */}
      {/* Usamos bg-white y bg-opacity-75 para la transparencia */}
      {/* w-100, maxWidth, y h-[90vh] aseguran la responsividad y el tamaño */}
      <div className="card shadow-lg bg-white bg-opacity-75" style={{ width: '100%', maxWidth: '800px', height: '90vh' }}>
        <ChatBox />
      </div>
      
    </div>
  );
}

export default App;