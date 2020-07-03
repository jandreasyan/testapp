const express = require('express')
const pool = require('./db')
const app = express()
const port = 5000

let conn = null;
app.use(express.json());

// expose an endpoint "cours"
// GET (all) request
app.get('/studibase.group', async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await pool.getConnection();

        // create a new query
        var query = "select * from studibase.group";

        // execute the query and set the result to a new variable
        var rows = await conn.query(query);

        // return the results
        res.send(rows);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});



// GET (one) request

app.get('/studibase.group/:id', async (req, res) => {

    let conn;
    try {
        // establish a connection to MariaDB
        const { id } = req.params;
        conn = await pool.getConnection();

        // create a new query
        var query = 'select * from studibase.group where id= ?';

        // execute the query and set the result to a new variable
        var rows = await conn.query(query, [id]);

        // return the results
        res.send(rows);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});

// POST request

app.post('/studibase.group', async (req, res, next) => {

    conn = await pool.getConnection();

    const category_id = req.body.category_id;
    const title = req.body.title;
    const date = req.body.date;
    const description = req.body.description;
    const place = req.body.place;

    await conn.query("INSERT INTO studibase.group VALUES (null, '" + req.body.category_id + "', '" + req.body.title + "', '" + req.body.date + "', '" + req.body.description + "', '" + req.body.place + "');");

    res.json({ status: "OK" });
    next();

});

// Delete request

app.delete('/studibase.group/:id', async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        const { id } = req.params;
        conn = await pool.getConnection();

        // create a new query
        var query = 'DELETE FROM studibase.group WHERE id = ?';

        // execute the query and set the result to a new variable
        var rows = await conn.query(query, [id]);

        // return the results
        res.send(rows);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});



app.listen(port, () => console.log(`Listening on port ${port}`));
