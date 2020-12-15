const { request, response } = require('express')
const express = require('express')
const { Pool } = require('pg')
const app = express()
const port = 3000
const secrets = require('secrets.json')

const pege = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: secrets.password,
    port: 5432
});

// ENDPOINTS  ENTRIES

app.get("/", (request, response) => {
    console.log("MUNDO")
    response.send("hi");
});

app.get("/HELLO",
    function (req, res) {
        pege.query('select * from mentors ', (error, result) => {
            res.json(result.rows);
        });
    })



//FUNCTIONS


//ENDPOINTS


app.listen(port, () => console.log('Great ' + port))