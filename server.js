const { request, response } = require('express')
const express = require('express')
const { Pool } = require('pg')
const app = express()
const port = 3000
const secrets = require('./secrets.json')
const bodyParser = require("body-parser");
app.use(bodyParser.json());


const pool = new Pool({
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

app.get("/hotels",
    function (req, res) {
        pege.query('select * from hotels ', (error, result) => {
            res.json(result.rows);
        });
    })


//POST

app.post("/hotels", function (req, res) {
    const newHotelName = req.body.name;
    const newHotelRooms = req.body.rooms;
    const newHotelPostcode = req.body.postcode;

    const query =
        "INSERT INTO hotels (name, rooms, postcode) VALUES ($1, $2, $3)";

    pool
        .query(query, [newHotelName, newHotelRooms, newHotelPostcode])
        .then(() => res.send("Hotel created!"))
        .catch((e) => console.error(e));
});


// PUT
app.put("/customers/:customerId", function (req, res) {
    const customerId = req.params.customerId;
    const newEmail = req.body.email;

    pool
        .query("UPDATE customers SET email=$1 WHERE id=$2", [newEmail, customerId])
        .then(() => res.send(`Customer ${customerId} updated!`))
        .catch((e) => console.error(e));
});

//DELETE
app.delete("/customers/:customerId", function (req, res) {
    const customerId = req.params.customerId;

    pool
        .query("DELETE FROM bookings WHERE customer_id=$1", [customerId])
        .then(() => {
            pool
                .query("DELETE FROM customers WHERE id=$1", [customerId])
                .then(() => res.send(`Customer ${customerId} deleted!`))
                .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
});


//

//FUNCTIONS


//ENDPOINTS


app.listen(port, () => console.log('Great ' + port))