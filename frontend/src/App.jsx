// frontend/src/App.jsx

import ChatBox from './components/ChatBox';
import './App.css'; // Asegúrate de que este archivo exista para el CSS personalizado

function App() {
  return (
    // Contenedor principal: min-vh-100 para cubrir toda la altura.
    // Usamos el ID 'app-container' para aplicar la imagen de fondo en App.css
    <div id="app-container" className="d-flex justify-content-center align-items-center min-vh-100 p-3">
      
      {/* Contenedor del Chatbox - Ahora con un fondo blanco semitransparente */}
      <div className="card shadow-lg bg-white bg-opacity-75" style={{ width: '100%', maxWidth: '800px', height: '90vh' }}>
        <ChatBox />
      </div>
      
    </div>
  );
}

export default App;