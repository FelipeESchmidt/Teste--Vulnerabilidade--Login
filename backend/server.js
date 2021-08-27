const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const URL = 'http://localhost';
const PORT = 4343;
const BancoDeDados = require('./db');

app.use(express.json());

/* CORS - Vamos mostrar a importância dele, o que acha? Apenas destinando a url de acesso, ele bloqueia qualquer outra 
    app.use((req, res, next)=>{
        res.header('Access-Control-Allow-Origin', URL);
        app.use(cors());
        next();
    }); 
*/

app.get("/", (req, res, next) => {
    // Renderizar arquivos das pastas
    app.use(express.static(path.join(__dirname, '../frontend')));

    // Executo o arquivo html dentro da rota "/"
    fs.readFile(path.join(__dirname, '../frontend/login.html'), (error, html) => {
        if (!error) {
            return res.end(html);
        }
        
        return console.log('Erro ao gerar arquivo html', error)
    });
}); 

app.get("/ataque", (req, res, next) => {

    app.use(express.static(path.join(__dirname, '../ataque')));

    fs.readFile(path.join(__dirname, '../ataque/testAPI.html'), (error, html) => {
        if (!error) {
            return res.end(html);
        }
        
        return console.log('Erro ao gerar arquivo html', error)
    });
}); 


app.post("/login", function(req, res){
    var user = req.body;
    
    console.log(user);

    if(BancoDeDados.tryAccessVulneravel(user)){
        res.status(200);
        res.json({login:'accepted'});
    }else{
        res.status(401);
        res.json({login:'refused'});
    }

    res.end();
});

app.listen(PORT, () => {
    console.log(`Backend rodando em: ${URL}:${PORT} :::: ${new Date()}`);
});

