    //const { json } = require('express');
const { json } = require('express');
const express = require('express');
const session = require('express-session');

const dataService = require('./services/data.service');

const app = express();

app.use(session({
    secret:'randomsecurestring',
    resave:false,
    saveUninitialized:false
}))
const logMiddleware = (req,res,next)=>{
    console.log(req.body);
    next()
}
app.use(logMiddleware)


const authMiddleware = (req,res,next)=> {
    if(req.session.currentUser){
        return res,json({
          status:false,
           statusCode:401,
          message:"please login"
          
   } )

      }
      else{
          next()
      }

}

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(401).send("hello world")
})

app.post('/',(req,res)=>{
    res.send("post method")
})


app.post('/register',(req,res)=>{
    //console.log(req.body);
    const result = dataService.register(req.body.acno,req.body.name,req.body.password)
    res.status(result.statusCode);
    console.log(res.json(result));
})
app.post('/login',(req,res)=>{
    //console.log(req.body);
    const result = dataService.login(req,req.body.acno,req.body.password)
    console.log(res.status(result.statusCode).json(result));
})
app.post('/deposit',authMiddleware ,(req,res)=>{
    console.log(req.session.currentUser);
    const result = dataService.deposit(req.body.acno,req.body.password,req.body.amount)
    console.log(res.status(result.statusCode).json(result));
})

app.post('/withdraw',authMiddleware ,(req,res)=>{
    //console.log(req.body);
    const result = dataService.withdraw(req.body.acno,req.body.password,req.body.amount)
    console.log(res.status(result.statusCode).json(result));
})

app.put('/',(req,res)=>{
    res.send("put method")
})
app.patch('/',(req,res)=>{
   res.send("patch method")
})
app.delete('/',(req,res)=>{
    res.send("patch method")
 })
app.listen(3000,()=>{
    console.log("server started at port 3000");
})
