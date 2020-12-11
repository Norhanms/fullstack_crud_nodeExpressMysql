const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config({ path: '../.env' });

const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE

});

connection.connect((err) => {
    if (err) {
        console.log(err.message)
    }
    console.log('db' + connection.state)

})

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = 'SELECT * FROM names;';
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                });

            });
            console.log(response);
            return response;
        } catch (err) {
            console.log(err)
        }
    }

    //==============================================================
    async insertNewName(name) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = 'INSERT INTO names (name, date) VALUES (?,?);';
                connection.query(query, [name, dateAdded], (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result.insertId)
                });

            });
            console.log(insertId);

        } catch (err) { console.log(err) }
    }
}
module.exports = DbService;