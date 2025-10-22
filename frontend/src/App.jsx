// frontend/src/App.jsx
// Quita todas las importaciones innecesarias de logos y CSS
import ChatBox from '/src/components/ChatBox.jsx';

function App() {
  return (
    // Usa clases de Bootstrap para centrar el contenido y ocupar toda la vista (min-vh-100)
    <div className="container-fluid d-flex justify-content-center align-items-center bg-light min-vh-100 p-3">
      
      {/* Contenedor del Chatbox: card para estética, sombra y dimensiones controladas */}
      <div className="card shadow-lg" style={{ width: '100%', maxWidth: '800px', height: '90vh' }}>
        <ChatBox />
      </div>
      
    </div>
  );
}

export default App;