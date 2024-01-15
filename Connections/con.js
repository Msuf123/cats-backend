const sql=require('mysql2')
const con=sql.createPool({
    host:'localhost',
    user:'admin',
    password:'admin@123',
    database:'cats',
    waitForConnections:true,
    connectionLimit:5,
    connectTimeout:200,
    maxIdle:1,
    idleTimeout:100
})
console.log('Running')
module.exports=con