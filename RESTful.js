var express = require('express');
var cors = require('cors');

var BancoDeDados = require('./BancoDeDados');

var app = express();
app.use(express.json());

app.use((request,response,next)=>{
    response.header('Access-Control-Allow-Origin','http://localhost');
    app.use(cors());
    next();
});

app.post("/login",function(request, response){
    
    var user = request.body;

    console.log(user);

    if(BancoDeDados.tryAccessVulneravel(user)){
        response.status(200);
        response.json({login:'accepted'});
    }else{
        response.status(401);
        response.json({login:'refused'});
    }

    response.end();
});

app.listen(4343);