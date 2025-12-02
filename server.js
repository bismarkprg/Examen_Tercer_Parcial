// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// ================================
// MIDDLEWARES
// ================================
app.use(express.json()); // para JSON en el body (raw)
app.use(express.urlencoded({ extended: true })); // por si usan x-www-form-urlencoded

// Función para formatear fecha "YYYY-MM-DD HH:mm:ss.SSS"
function formatDate(date) {
  const pad = (n, size = 2) => String(n).padStart(size, '0');
  return (
    `${date.getFullYear()}-` +
    `${pad(date.getMonth() + 1)}-` +
    `${pad(date.getDate())} ` +
    `${pad(date.getHours())}:` +
    `${pad(date.getMinutes())}:` +
    `${pad(date.getSeconds())}.` +
    `${pad(date.getMilliseconds(), 3)}`
  );
}

// ================================
// 1. GET /estado
// ================================
app.get('/estado', (req, res) => {
  const now = new Date();

  const respuesta = {
    servicio: 'proyecto-backend',
    version: '1.11.2',
    entorno: 'production',
    estado: 'Servicio funcionando correctamente',
    fecha: formatDate(now),
    hora: now.getTime()
  };

  res.json(respuesta);
});

// ================================
// 2. POST /datos
// ================================

app.post('/datos', (req, res) => {
  const { nombre, correo, edad } = req.body;
  const now = new Date();

  const respuesta = {
    mensaje: 'Datos recibidos exitosamente',
    datosRecibidos: {
      nombre: nombre,
      correo: correo,
      edad: Number(edad)
    },
    fechaRegistro: formatDate(now),
    horaRegistro: now.getTime()
  };

  res.json(respuesta);
});

// ================================
// 3. PUT /datos/:id
// ================================

app.put('/datos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, correo } = req.body;
  const now = new Date();

  const respuesta = {
    mensaje: 'Datos actualizados exitosamente',
    idUsuario: String(id),
    datosActualizados: {
      nombre: nombre,
      correo: correo
    },
    fechaActualizacion: formatDate(now),
    horaActualizacion: now.getTime()
  };

  res.json(respuesta);
});

// Ruta básica opcional
app.get('/', (req, res) => {
  res.send('Backend tercer parcial en ejecución');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
