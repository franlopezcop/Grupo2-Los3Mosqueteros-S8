// ************ Require's ************
const express = require('express');
const app = express();
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const session = require("express-session");
const cookies = require("cookie-parser");

const usuarioLogueadoMiddleware = require("./middleware/usuarioLogueadoMiddleware");

// ************ Middlewares - (don't touch) ************

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false })); // para poder trabajar con formularios
app.use(express.json()); // para poder trabajar con información que llegue en formato json
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(session({
    secret: "Un mensaje secreto de Mercado Liebre",
    resave: false,
    saveUninitialized: false
}));
app.use(cookies());
app.use(usuarioLogueadoMiddleware);

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas

const mainRouter = require('./routes/main'); // Rutas main
const productsRouter = require('./routes/products'); // Rutas /products
const usersRouter = require('./routes/users'); // Rutas /products

app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);

const port = process.env.PORT || 3030;

// Si no encuentra ninguna ruta que coincida, va a renderizar la vista error.
app.use((req, res, next) => {
    const error = new Error('Error 404 - No se encontró la pagina solicitada');
    res.status(404).render('error', {
        message: error.message,
        path: `http://${req.hostname}:${port}${req.url}`,
        status: 404,
        error
    })
})


app.listen(port, () => console.log(`aplicación funcionando ${port}!`))