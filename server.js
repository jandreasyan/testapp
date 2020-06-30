const express = require('express')
const pool = require('./db')
const app = express()
const port = 5000

let conn = null;
app.use(express.json());

// expose an endpoint "cours"
// GET (all) request
app.get('/cours', async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await pool.getConnection();

        // create a new query
        var query = "select * from cours";

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

app.get('/cours/:id', async (req, res) => {

    let conn;
    try {
        // establish a connection to MariaDB
	const {id} = req.params;
        conn = await pool.getConnection();

        // create a new query
        var query = 'select * from cours where id= ?';

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

app.post('/cours', async(req, res, next)=>{

	conn = await pool.getConnection();

	const category = req.body.category;
	const title = req.body.title;
	const memberCount = req.body.memberCount;
	const day = req.body.day;
	const likes = req.body.likes;
	const description = req.body.description;
	const place = req.body.place;
	const time =  req.body.time;
	const imagePath = req.body.imagePath;

	await conn.query("INSERT INTO cours VALUES (null, '"+req.body.category+"', '"+req.body.title+"', '"+req.body.memberCount+"', '"+req.body.day+"', '"+req.body.likes+"','"+req.body.description+"', '"+req.body.place+"', '"+req.body.time+"', '"+req.body.imagePath+"');");

	res.json({status:"OK"});
	next();

});

// Delete request

app.delete('/cours/:id', async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await pool.getConnection();

        // create a new query
        var query = "DELETE FROM cours WHERE id = ?";

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
