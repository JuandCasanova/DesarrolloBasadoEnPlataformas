const express = require('express');
const homeRoutes = require('./routes/home.routes');
const productosRoutes = require('./routes/productos.routes');
const contactanosRoutes = require('./routes/contactanos.routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3306;

app.use(express.json());

// Prefijo de la API y montaje de las rutas
app.use('/api/home', homeRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/contactanos', contactanosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});