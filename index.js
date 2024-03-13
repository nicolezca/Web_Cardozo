const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar el motor de vistas EJS
app.set('view engine', 'ejs');

// Servir archivos estáticos desde los directorios especificados
app.use(express.static('public'));
app.use(express.static('public/css/'));
app.use(express.static('public/js/'));
app.use(express.static('assets/'));
app.use(express.static('assets/galery/'));
// Middleware de seguridad Helmet
app.use(helmet());

// Middleware para parsear el cuerpo de la solicitud (body-parser)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importar las rutas
const indexRoutes = require('./routes/routes');

// Rutas
app.use('/', indexRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`La aplicación está escuchando en http://localhost:${PORT}`);
});
