const express = require('express');
const app = express();


 app.use(express.urlencoded({ extended: false }));
 const cookieParser = require('cookie-parser')
 app.use(cookieParser())

const path = require('path');
const public = path.join(__dirname, 'public');
app.use(express.static(public));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/Public/styles'));  

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const router = require('./routes/webappRoutes');
app.use('/', router); 

app.listen(5000, () => {
    console.log('Server started on port 5000. Ctrl^c to quit.');
}) 