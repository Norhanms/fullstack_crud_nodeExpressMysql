const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
/*if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
*/

const port = process.env.PORT || 5000;

console.log('The value of PORT is:', process.env.DB_PORT);

const dbService = require('./db_service');

app.use(cors());//to make request from front end to backend
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//create
app.post('/insert', (request, response) => {
    const { name } = request.body
    const db = dbService.getDbServiceInstance();
    const result = db.insertNewName(name);

    result.
        then(data => response.json({ success: true })).
        catch(err => console.log(err))
})
//read
app.get('/getAll', (request, response) => {


    console.log('test');
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();
    result.then(data => response.json({ data })).catch(
        err => console.log(err)
    )
})
//update

//delete


app.listen(port, () => {
    console.log('listen to the port')
    //  console.log(`Example app listening at http://localhost:${port}`)
})