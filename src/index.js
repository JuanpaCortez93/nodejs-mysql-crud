//VARIABLES
const express = require('express');
const path = require('path');
const index = express();
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

//IMPORTING ROUTES
const customerRoutes = require('./routes/customer');
const { appendFile } = require('fs');
const { urlencoded } = require('express');

//SETTINGS
index.set('port', process.env.port || 3000);
index.set('view engine','ejs');
index.set('views', path.join(__dirname,'views'));


//MIDDLEWARES
index.use(morgan('dev'));
index.use(myConnection(mysql,{
    host: 'localhost',
    user: 'root',
    password: '12345',
    port: 3306,
    database: 'crudnodejsmysql'
}, 'single'));
index.use(express.urlencoded({extended: false}));

//STARTING ROUTES
index.use('/',customerRoutes);

//STATIC FILES
index.use(express.static(path.join(__dirname, 'public')));

//START SERVER
index.listen(index.get('port'),()=>{
    console.log('Server on port ' + index.get('port'));
});