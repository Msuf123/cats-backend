const express=require('express')
const cros=require('cors')
const app=express()
const con=require('./Connections/con')

const passport=require("passport")
const LocalStrategy=require("passport-local").Strategy
const session=require('express-session')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mysqlStore = require('express-mysql-session')(session);
const options={}
app.use(bodyParser.json())
const sessionStore=new mysqlStore({
    connectionLimit:9,
    password:'admin@123',
    user:'admin',
    database:'cats',
    host:'localhost',
    createDatabaseTable:true
})
app.use(cros({
    origin:'http://localhost:3000',
    methods:['GET','POST'],credentials:true
}))
app.use(session({
    secret: "secret-key",
    resave: false,
    store:sessionStore,
    saveUninitialized: true,
    cookie:{
        sameSite:'none',
        maxAge:9000*1000
    }
}))
app.use(morgan('tiny'))
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser((user, done) => {
    console.log(user+'thi s is me')
    done(null, user.userName);
  });
  passport.deserializeUser((user, done) => {
    
      done(null, user);

  });   

passport.use(new LocalStrategy(function(username,password,done){
con.query('SELECT * FROM users WHERE email = ? OR userName=?  AND password=?', [username,username,password],(err,result)=>{
    if(err){
        
        done(err)
    }
    console.log(result)
    if(result.length===0){
    
        done(null,false)
    }
    if(result.length!==0){
    
      done(null,result[0])
    }
})
}))
app.get('/dashboard',(req,res,next)=>{
    if(req.user){

    res.send({authenticate:true})}
    else{
        
        res.send({authenticate:false})
    }
})
app.post('/register',(req,res,next)=>{

})
app.get('/',(req,res,next)=>{
    req.logout(()=>{
        res.send('Logged out')
    })

    
})
app.post('/',(req,res,next)=>{console.log(req.body);next()},passport.authenticate('local'),(req,res,next)=>{
    let ans='';

    
    res.send({authenticate:true})
})
app.listen(3003,()=>{
    console.log('Server is up and running')
})              