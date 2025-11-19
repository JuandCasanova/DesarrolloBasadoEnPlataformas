// src/app.js

const express = require('express');
// ----------------------------------------------------
// 1. CARGA DE VARIABLES DE ENTORNO (¡CRÍTICO!)
// Debe ir antes de cualquier require que use process.env
require('dotenv').config(); 
// ----------------------------------------------------

const homeRoutes = require('./routes/home.routes');
const productosRoutes = require('./routes/productos.routes');
const contactanosRoutes = require('./routes/contactanos.routes');
const categoriasRoutes = require('./routes/categorias.routes');
const pedidosRoutes = require('./routes/pedidos.routes');
const clientesRoutes = require('./routes/clientes.routes');
const authRoutes = require('./routes/auth.routes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3307; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','HEAD','PUT','PATCH','POST','DELETE'],
    credentials: true,
}));


app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/contactanos', contactanosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/clientes', clientesRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});