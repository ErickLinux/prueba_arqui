const express = require('express'); 
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const cors = require('cors'); // Importar cors
const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT;

app.use(cors()); // Habilitar CORS
app.use(express.json());

app.get('/estado', async (req, res) => {
    const estado = await prisma.estado.findMany();
    res.json(estado);
});

app.post('/estado', async (req, res) => {
    try {
        const nuevoEstado = await prisma.estado.create({
            data: {
                estado: req.body.estado, // Asegúrate de que el cuerpo de la solicitud incluya este campo
                fecha_hora: new Date() // O puedes usar req.body.fecha_hora si lo envías en el POST
            }
        });
        res.status(201).json(nuevoEstado); // Respuesta con código 201 para creación exitosa
    } catch (error) {
        console.error('Error al crear el estado:', error);
        res.status(500).json({ error: 'Error al crear el estado.' });
    }
});

app.get('/estado/ultimo', async (req, res) => {
    try {
        const ultimoEstado = await prisma.estado.findFirst({
            orderBy: {
                fecha_hora: 'desc', // Ordena por fecha y hora de forma descendente
            },
        });

        if (ultimoEstado) {
            res.json(ultimoEstado); // Envía el último estado como respuesta
        } else {
            res.status(404).json({ error: 'No hay estados disponibles' });
        }
    } catch (error) {
        console.error('Error al obtener el último estado:', error);
        res.status(500).json({ error: 'Error al obtener el último estado.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
