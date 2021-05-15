// JavaScript source code
const express = require('express');
const calc = require("@smogon/calc");
const setsou = require("@smogon/sets/gen8ou.json");
const setsuu = require("@smogon/sets/gen8uu.json");
const setsru = require("@smogon/sets/gen8ru.json");
const setsnu = require("@smogon/sets/gen8nu.json");
const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/public'));

//setting our app port
app.set('port', process.env.PORT || 3000);

//Route for get requests.
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

app.get('/sets', (request, response) => {
    const sets = {
        "ou": setsou,
        "uu": setsuu,
        "ru": setsru,
        "nu": setsnu
    }
    response.json(sets)
});

//Route to handle POST form requests.
app.post('/', (req, res) => {
    //we check if the request is an AJAX one and if accepts JSON
    if (req.xhr || req.accepts('json, html') === 'json') {
        const gen = 8
        const result = calc.calculate(
            gen,
            new calc.Pokemon(gen, req.body.aname, req.body.aopts),
            new calc.Pokemon(gen, req.body.dname, req.body.dopts),
            new calc.Move(gen, req.body.mname),
            new calc.Field((typeof req.body.field === 'undefined') ? undefined : req.body.field)
        );
        
        res.json(result);

    } else {
        //Do something else by reloading the page.
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Express server started at port 3000');
});