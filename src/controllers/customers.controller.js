import connection from "../database/database.js";

export async function postCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;

    try {
        await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`, [name, phone, cpf, birthday])

        res.status(201)
    } catch (error) {
        res.sendStatus(500)
    }
}

export async function getCustomer(req, res) {
    const cpf = Number(req.query.cpf)
    try {

        if (cpf) {
            const customer = await connection.query(`SELECT * FROM customers WHERE cpf LIKE CONCAT(CAST($1 AS int),'%');`, [cpf])

            return res.send(customer.rows)
        }

        const costumers = await connection.query(`SELECT * FROM customers;`)

        res.send(costumers.rows)
    } catch (error) {
        res.sendStatus(500)
    }
}

export async function getCustomerById(req, res) {
    const { id } = req.params;

    try {
        const customer = await connection.query(`SELECT * FROM customers WHERE id = $1;`, [id])

        if (customer.rows.length > 0) {
            return res.send(customer.rows[0])
        }

        return res.status(404).send('Not Found')
    } catch (error) {
        res.sendStatus(500)
    }
}