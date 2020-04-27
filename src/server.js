const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');

const app = express();

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine(
  '.hbs',
  hbs({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: require('./helpers/helpers')
  })
);
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use(require('./routes/index.routes'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
