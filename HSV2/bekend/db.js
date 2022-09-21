const mysql = require("mysql")
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'todo_db'
});
connection.connect((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log('Database is connected')
    }
})
module.exports= connection