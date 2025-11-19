const express = require('express');
const homeRoutes = require('./routes/home.routes');
const productosRoutes = require('./routes/productos.routes');
const contactanosRoutes = require('./routes/contactanos.routes');
const categoriasRoutes = require('./routes/categorias.routes');
const pedidosRoutes = require('./routes/pedidos.routes');
const clientesRoutes = require('./routes/clientes.routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3307;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Prefijo de la API y montaje de las rutas
app.use('/api/home', homeRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/contactanos', contactanosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/clientes', clientesRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});