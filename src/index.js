const express = require('express'); 
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const cors = require('cors'); // Importar cors
const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT;

// Habilitar CORS
app.use(cors({
    origin: ['http://localhost:3001', 'https://yellow-bush-0a21bb70f.5.azurestaticapps.net']
})); 
app.use(express.json());

// Simulación de datos
const estadosSimulados = [
    { id: 1, estado: true, fecha_hora: new Date() },
    { id: 2, estado: false, fecha_hora: new Date() },
];

// Obtener todos los estados
app.get('/estado', async (req, res) => {
    const estado = estadosSimulados; // Usar datos simulados
    res.json(estado);
});

// Crear nuevo estado
app.post('/estado', async (req, res) => {
    try {
        const nuevoEstado = {
            id: estadosSimulados.length + 1, // Simular ID
            estado: req.body.estado,
            fecha_hora: new Date()
        };
        estadosSimulados.push(nuevoEstado); // Agregar nuevo estado a la simulación
        res.status(201).json(nuevoEstado); // Respuesta con código 201
    } catch (error) {
        console.error('Error al crear el estado:', error);
        res.status(500).json({ error: 'Error al crear el estado.' });
    }
});

// Obtener último estado
app.get('/estado/ultimo', async (req, res) => {
    const ultimoEstado = estadosSimulados[estadosSimulados.length - 1]; // Obtener último estado simulado
    
    if (ultimoEstado) {
        res.json(ultimoEstado); // Envía el último estado como respuesta
    } else {
        res.status(404).json({ error: 'No hay estados disponibles' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
