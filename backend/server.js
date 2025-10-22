// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// 1. Cargar Variables de Entorno y Inicializar Gemini
dotenv.config();

// Inicializa la API. Busca automáticamente GEMINI_API_KEY en .env
const ai = new GoogleGenAI({}); 

const app = express();
const PORT = 3000;

// Configuración de Middlewares
app.use(cors()); 
app.use(express.json()); 

// --- Endpoint de Chat con Streaming ---
app.post('/api/chat', async (req, res) => {
    // 1. Extracción de datos
    const { history, newMessage } = req.body;

    if (!newMessage) {
        return res.status(400).send({ error: 'El campo newMessage es obligatorio.' });
    }

    try {
        // 2. Creación del Chat
        const chat = ai.chats.create({
            model: "gemini-2.5-flash", 
            history: history || [] 
        });

        // 3. Configurar Streaming
        res.setHeader('Content-Type', 'text/plain'); 
        res.setHeader('Transfer-Encoding', 'chunked');

        // 4. Obtener y Enviar Stream
        const stream = await chat.sendMessageStream({ message: newMessage });

        for await (const chunk of stream) {
            res.write(chunk.text);
        }

        // 5. Finalizar la respuesta
        res.end();

    } catch (error) {
        console.error("Error en la API de Gemini:", error);
        res.status(500).send("Error interno del servidor. Revisa tu clave API.");
    }
});

// --- Inicio del Servidor ---
app.listen(PORT, () => {
    console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});