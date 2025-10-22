// frontend/src/components/ChatBox.jsx

import { useState, useRef, useEffect } from 'react';
import { SendIcon, BotIcon, Loader2 } from 'lucide-react'; 
import MarkdownMessage from './MarkdownMessage'; 


const ChatBox = () => {
    // Definición de estados (sin cambios)
    const [messages, setMessages] = useState([
        { role: 'ai', text: '¡Hola! Soy Shrek. puto el que lo lea' },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const chatEndRef = useRef(null);

    // Efecto para hacer scroll (UX profesional)
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    
    // Lógica de Conexión y Streaming (Sin cambios)
    const handleSendMessage = async (e) => {
        e.preventDefault();
        const userMessage = input.trim();
        if (!userMessage || isLoading) return;

        setIsLoading(true);
        setInput('');

        const newUserMessage = { role: 'user', text: userMessage };
        const currentHistory = messages.map(msg => ({ 
            role: msg.role === 'ai' ? 'model' : 'user', 
            parts: [{ text: msg.text }] 
        }));

        setMessages((prev) => [...prev, newUserMessage, { role: 'ai', text: '' }]); 
        
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ history: currentHistory, newMessage: userMessage }),
            });

            if (!response.ok || !response.body) {
                throw new Error('Error en el servidor o la respuesta no es un stream.');
            }

            // Manejo del Streaming (sin cambios)
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let aiText = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                aiText += chunk;

                setMessages((prevMessages) => {
                    const lastMessageIndex = prevMessages.length - 1;
                    const updatedMessages = [...prevMessages];
                    if (updatedMessages[lastMessageIndex].role === 'ai') {
                         updatedMessages[lastMessageIndex] = { ...updatedMessages[lastMessageIndex], text: aiText };
                    }
                    return updatedMessages;
                });
            }

        } catch (error) {
            console.error("Error de comunicación:", error);
            setMessages((prev) => [...prev, { role: 'ai', text: 'Lo siento, hubo un error de conexión.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Renderizado con Clases de Bootstrap (TEMA OSCURO) ---
    return (
        <div className="d-flex flex-column h-100">
            {/* CABECERA (Header) - Fondo oscuro y texto blanco */}
            <div className="card-header bg-dark text-white d-flex align-items-center bg-opacity-90">
                <BotIcon className="me-2" size={24} />
                <h5 className="mb-0">Asistente Gemini (Dark Mode)</h5>
            </div>

            {/* HISTORIAL DE MENSAJES - Fondo muy oscuro y semitransparente */}
            <div className="card-body overflow-auto flex-grow-1 d-flex flex-column p-3 bg-secondary bg-opacity-90">
                <div className="d-flex flex-column w-100">
                    {messages.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`d-flex ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'} mb-3`}
                        >
                            <div 
                                className={`p-3 rounded-3 shadow-sm 
                                    ${msg.role === 'user' 
                                        ? 'bg-primary text-white bg-opacity-95' // Usuario: Azul/Primario para diferenciar
                                        : 'bg-dark border text-white bg-opacity-95' // AI: Fondo oscuro con texto blanco
                                    }
                                `}
                                style={{ maxWidth: '75%' }}
                            >
                                <MarkdownMessage content={msg.text} />
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>
            </div>

            {/* ÁREA DE ENTRADA (Input) - Fondo oscuro para el pie de página */}
            <div className="card-footer bg-secondary p-3 bg-opacity-95">
                <form onSubmit={handleSendMessage} className="d-flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isLoading ? "Esperando respuesta..." : "Escribe tu mensaje aquí..."}
                        // Clases para input oscuro
                        className="form-control me-2 bg-dark text-white border-secondary"
                        disabled={isLoading} 
                    />
                    <button
                        type="submit"
                        className="btn btn-primary d-flex align-items-center"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <SendIcon size={20} />
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatBox;