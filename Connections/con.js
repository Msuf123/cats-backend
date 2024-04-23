const sql=require('mysql2')
const con=sql.createPool({
    host:'',
    user:'',
    password:'',
    database:'',
    waitForConnections:true,
    connectionLimit:5,
    connectTimeout:200,
    maxIdle:1,
    idleTimeout:100
})
console.log('Running')
module.exports=con
