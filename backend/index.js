const express = require('express');
const cors = require('cors');
const mysql = require('mysql2')
const body_parser = require('body-parser');

const app = express()
const port = process.env.PORT || 3000;

app.use(cors());
app.use(body_parser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aboutmoney',
    port: 3306
});

// check db connection
db.connect(err => {
    try {
        console.log('database connected');
    } catch (error) {
        console.error(error);
    }
})

// EXPENSES
// ------------ GET (EXPENSES) ------------
app.get('/ex', (req, res) => {
    const qr = `SELECT * FROM ex`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error get all data'
            })
        } else {
            res.send({
                message: 'Get all data data',
                data: result
            })
        }
    })
})

app.get('/ex/:id', (req, res) => {
    const id = req.params;
    const qr = `SELECT * FROM ex WHERE exID = ?`;

    db.query(qr, id , (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error get single data'
            })
        }

        if (result.length > 0) {
            res.send({
                message: 'Get single data',
                data: result
            })
        } else {
            res.send({
                message: 'Data not found'
            })
        }
    })
})

// ------------ POST (EXPENSES) ------------
app.post('/ex', (req, res) => {
    const { extypeID, exAmount} = req.body;

    const exDate = new Date().toISOString();

    const qr = `
        INSERT INTO ex (extypeID, exAmount, exDate)
        VALUES (?,?,?)
    `

    db.query(qr, [extypeID, exAmount, exDate], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error creating data'
            })
        } else {
            res.send({
                message: 'Data created successfully'
            })
        }
    })
})

// ------------ PUT (EXPENSES) ------------
app.put('/ex/:id', (req, res) => {
    const { id } = req.params;
    const { extypeID, exAmount } = req.body;

    const qr = `
        UPDATE ex
        SET
            extypeID = ?,
            exAmount = ?
        WHERE exID = ?
    `

    db.query(qr, [extypeID, exAmount, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error updating data'
            })
        } else {
            res.send({
                message: 'data updated successfully'
            })
        }
    })
})

// ------------ DELETE (EXPENSES) ------------
app.delete('/ex', (req, res) => {
    const qr = `DELETE FROM ex`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error to delete all data'
            })
        } else {
            res.send({
                message: 'All data deleted successfully'
            })
        }
    })
})

app.delete('/ex/:id', (req, res) => {
    const { id } = req.params;

    const qr = `DELETE FROM ex WHERE exID = ?`;

    db.query(qr, id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error to delete single data'
            })
        } else {
            res.send({
                meesage: 'Single data deleted successfully'
            })
        }
    })
})



// EXPENSES TYPE
// ------------ GET (EXPENSES TYPE) ------------
app.get('/extype', (req, res) => {
    const qr = `SELECT * FROM extype`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error get all data'
            })
        } else {
            res.send({
                message: 'Get all expenses type data',
                data: result
            })
        }
    })
})

app.get('/extype/:id', (req, res) => {
    const { id } = req.params;
    const qr = `SELECT * FROM extype WHERE extypeID = ?`;

    db.query(qr, id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error get single data'
            })
        }

        if (result.length > 0) {
            res.send({
                message: 'Get single expenses type data',
                dta: result
            })
        } else {
            res.send({
                message: 'Data not found'
            })
        }
    }) 
})



// INCOME
// ------------ GET (INCOME) ------------
app.get('/inc', (req, res) => {
    const qr = `SELECT * FROM inc`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error get all data'
            })
        } else {
            res.send({
                message: 'Get all data data',
                data: result
            })
        }
    })
})

app.get('/inc/:id', (req, res) => {
    const id = req.params;
    const qr = `SELECT * FROM inc WHERE incID = ?`;

    db.query(qr, id , (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error get single data'
            })
        }

        if (result.length > 0) {
            res.send({
                message: 'Get single data data',
                data: result
            })
        } else {
            res.send({
                message: 'Data not found'
            })
        }
    })
})

// ------------ POST (INCOME) ------------
app.post('/inc', (req, res) => {
    const { inctypeID, incAmount} = req.body;

    const incDate = new Date().toISOString();

    const qr = `
        INSERT INTO inc (inctypeID, incAmount, incDate)
        VALUES (?,?,?)
    `

    db.query(qr, [inctypeID, incAmount, incDate], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error creating data'
            })
        } else {
            res.send({
                message: 'Data created successfully'
            })
        }
    })
})

// ------------ PUT (INCOME) ------------
app.put('/inc/:id', (req, res) => {
    const { id } = req.params;
    const { inctypeID, incAmount } = req.body;

    const qr = `
        UPDATE inc
        SET
            inctypeID = ?,
            incAmount = ?
        WHERE incID = ?
    `

    db.query(qr, [inctypeID, incAmount, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error updating data'
            })
        } else {
            res.send({
                message: 'data updated successfully'
            })
        }
    })
})

// ------------ PUT (INCOME) ------------
app.delete('/inc', (req, res) => {
    const qr = `DELETE FROM inc`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error to delete all data'
            })
        } else {
            res.send({
                message: 'All data deleted successfully'
            })
        }
    })
})

app.delete('/inc/:id', (req, res) => {
    const { id } = req.params;

    const qr = `DELETE FROM inc WHERE incID = ?`;

    db.query(qr, id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error to delete single data'
            })
        } else {
            res.send({
                meesage: 'Single data deleted successfully'
            })
        }
    })
})



// INCOME TYPE
// ------------ GET (INCOME TYPE) ------------
app.get('/inctype', (req, res) => {
    const qr = `SELECT * FROM inctype`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error get all data'
            })
        } else {
            res.send({
                message: 'Get all data type data',
                data: result
            })
        }
    })
})

app.get('/inctype/:id', (req, res) => {
    const { id } = req.params;
    const qr = `SELECT * FROM inctype WHERE inctypeID = ?`;

    db.query(qr, id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error get single data'
            })
        }

        if (result.length > 0) {
            res.send({
                message: 'Get single data type data',
                dta: result
            })
        } else {
            res.send({
                message: 'Data not found'
            })
        }
    }) 
})


// TOTAL AMOUNT
// ------------ GET (Expenses Total Amount) ------------
app.get('/ex_amount', (req, res) => {
    const qr =`
    SELECT 
        COALESCE(SUM(exAmount), 0) AS ex_amount
    FROM ex`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                messgae: 'Eror get data'
            })
        } else {
            res.send({
                message: 'Get data',
                data: result
            })
        }
    })
})

// ------------ GET (Expenses Total Amount) ------------
app.get('/inc_amount', (req, res) => {
    const qr =`
    SELECT 
        COALESCE(SUM(incAmount), 0) AS inc_amount
    FROM inc`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                messgae: 'Eror get all data'
            })
        } else {
            res.send({
                message: 'Get all data',
                data: result
            })
        }
    })
})

app.get('/total_amount', (req, res) => {
    const qr = `
        SELECT
            (SELECT COALESCE(SUM(incAmount), 0) FROM inc) -
            (SELECT COALESCE(SUM(exAmount), 0) FROM ex) 
            AS netAmount
    `;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                messgae: 'Eror get all data'
            })
        } else {
            res.send({
                message: 'Get all data',
                data: result
            })
        }
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})