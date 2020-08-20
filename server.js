const express = require('express')
const pool = require('./db')
const app = express()
const port = 5000

let conn = null;
app.use(express.static('public'));
app.use(express.json());

// POST request
app.post('/studibase.group', async (req, res, next) => {
    console.log('i am here');
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await pool.getConnection();
        const category_id = req.body.category_id;
        const title = req.body.title;
        const date = req.body.date;
        const description = req.body.description;
        const place = req.body.place;

        await conn.query("INSERT INTO studibase.group VALUES (null, '" +
        req.body.category_id + "', '" + req.body.title + "', '" +
        req.body.description + "', '" + req.body.place + "', '" +
        req.body.date + "');");
        res.json({ status: "OK" });
    }catch (err) {
        throw err;
    }
    finally {
        next();
    }

});

app.post('/studibase.membre', async (req, res, next) => {
	let conn;
	try{
		conn = await pool.getConnection();
		await conn.query("INSERT INTO studibase.membre VALUES (null, '" + req.body.group_id + "', '" + req.body.etudiant_id + "');");
		res.json({ status: "OK" });
	}catch(err){
		throw err;
	}
	finally {
		next();
	}
});

// POST request
app.post('/studibase.etudiant', async (req, res, next) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await pool.getConnection();

        await conn.query("INSERT INTO studibase.etudiant VALUES (null, '" +
        req.body.email + "', '" + req.body.nom + "', '" +
        req.body.prenom + "', '" + req.body.bio + "', '" +
        req.body.userimage_id + "', '" +
        req.body.avis_id + "', '" + req.body.motdepasse + "' );");
        res.json({ status: "OK" });
    }catch (err) {
        throw err;
    }
    finally {
        next();
    }

});

// POST Avis

app.post('/studibase.avis', async (req, res, next) => {
	let conn;
	try {
		conn = await pool.getConnection();

		await conn.query("INSERT INTO studibase.avis VALUES (null, '" + req.body.description + "', '" + req.body.id_from + "', '" + req.body.etudiant_id + "', '" + req.body.nbr_etoile + "');");
		res.json({status: "OK" });
	}catch (err);
		throw err;
	}finally {
		next();
	}
});

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

app.get('/studibase.category', async (req, res) => {
	let conn;
	try {
		conn = await pool.getConnection();
		var query = "select * from studibase.category";
		var rows = await conn.query(query);

		res.send(rows);
	}catch (err){
		throw err;
	}finally {
		if (conn) return conn.release();
	}

});

app.get('/studibase.membre', async (req, res) =>{
	let conn;
	try{
		conn = await pool.getConnection();
		var query = "select * from studibase.membre";
		var rows = await conn.query(query);

		res.send(rows);
	}catch (err){
		throw err;
	}finally {
		if (conn) return conn.release();
	}
});

app.get('/studibase.etudiant', async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await pool.getConnection();

        // create a new query
        var query = "select * from studibase.etudiant";

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

app.get('/studibase.avis', async (req, res) => {
	let conn;
	try {
		conn = await pool.getConnection();
		var query = 'select * from studibase.avis';
		var rows = await conn.query(query);

		res.send(rows);
	}catch (err) {
		throw err;
	}finally {
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

// Update request

app.post('/studibase.etudiant/:id', async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        const { id } = req.params;
        conn = await pool.getConnection();

        // create a new query
        var query = 'UPDATE studibase.etudiant SET studibase.etudiant.bio = ?  WHERE id = ?';

        // execute the query and set the result to a new variable
        var rows = await conn.query(query, [req.body.bio, id]);

        // return the results
        res.send(rows);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
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


app.delete('/studibase.membre/:id', async (req, res) => {
	let conn;
	try {
		const {id} = req.params;
		conn = await pool.getConnection();

		var query = "DELETE FROM studibase.membre WHERE id = ?";
		var rows = await conn.query(query, [id]);

		res.send(rows);
	}catch (err){
		throw err;
	}finally {
		if (conn) return conn.release();
	}
});


app.listen(port, () => console.log(`Listening on port ${port}`));
