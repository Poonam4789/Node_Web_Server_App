
const express = require('express');
const fs = require('fs');
// const beautify = require("json-beautify");
const hbs = require('hbs');
const port = process.env.PORT||3000;
console.log("port = ", process.env.PORT);

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear() });
hbs.registerHelper("toUpperCase",(text)=>{
    return text.toUpperCase();
});

app.use((req,resp,next)=>{
var date = new Date().toString();
var log = `${date}: ${req.method} ${req.url}`;
    next();
    console.log(log);
fs.appendFile('server.log',log + '\n', (err)=>{
if(err){
    console.log('unable to log error');
}
});
});

// app.use((req,res,next)=>{
// res.render('maintanance.hbs');  

// });

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express , First Server App!</h1>');
    // res.send({
    //     name: 'poonam',
    //     hobby: [
    //         'painting', 'gardening'
    //     ]
    // });
    res.render('home.hbs', {
        titlePage: 'Home',
        message: 'Welcome to Home Page !'
        // year: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    // res.send("how about you!");
    res.render('about.hbs', {
        titlePage: 'About',
        message: 'You Are on About'
        // year: new Date().getFullYear()
    });
});

app.get('/project', (req, res) => {
    // res.send("how about you!");
    res.render('project.hbs', {
        titlePage: 'project',
        message: 'You Are on project page'
        // year: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error Page!'
    });
});
app.listen(port, () => {
    console.log(`Server stated listening to port ${port}`);
});