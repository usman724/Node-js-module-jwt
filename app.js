const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',(req,res)=>{

     res.json({
         message : "hello world"
     })
})

// here we want to varify the route then we use the middleware function 
app.post('/api/post',validateuser ,(req,res)=>{

    jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  }); 
});



app.post('/api/login' , (req,res)=>{
  
    // Now here we send the user record use any formate 
    // you can use the json or get current value form the input fields

    const users = {
        
        id:1,
        username:"usman",
        email:"usm@gmail.com"

    }

     jwt.sign({users},'secretkey',{expiresIn:'30s'} ,(err,token)=>{
         res.json({
             token
         })
     });
    
});


function validateuser(req,res,next) {

    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
      
        const bearer = bearerHeader.split(' ');
             
        console.log(`Now Here is ${bearer}`);
        
        const bearerToken = bearer[1];
        // Set the token

        console.log(bearerToken);
        req.token = bearerToken;
        // Next middleware
        next();


    } else {

        res.sendStatus(403);
    }
     

}


app.listen(3000,()=>console.log('At port 3000'));