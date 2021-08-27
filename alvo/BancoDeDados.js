function BancoDeDados(){
    this.loginCorreto = 'UsuarioX';
    this.senhaCorreta = 'admin';

    this.tryAccessVulneravel = function ({login,senha}) {
        return ((this.loginCorreto == login) && (this.senhaCorreta == senha));
    }

    this.tryAccessNotVulneravel = async function ({login,senha}) {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1000);
        return ((this.loginCorreto == login) && (this.senhaCorreta == senha));
    }

}
module.exports = new BancoDeDados();