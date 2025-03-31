const path = 
require('path')
const express = 
require('express')
const morgan = 
require('morgan')
const { engine } = 
require('express-handlebars')

const app = express()

const route = 
require('./routes')

//
            app.use(express.static(path.join(__dirname, 'public')))

// Middleware to parse JSON request bodies
            app.use(express.json());
            app.use(
                  express.urlencoded({
                        extended: true,
                  }),
            );

// HTTP logger
      app.use(morgan('combined'));

// Cấu hình Handlebars với đuôi `.hbs`
                  app.engine('hbs', engine({ extname: '.hbs' }));
                  app.set('view engine', 'hbs');
                  app.set('views', path.join(__dirname, 'resources/views'));

console.log('Views path:', path.join(__dirname, 'resources/views'));

// Routes init
route(app);
