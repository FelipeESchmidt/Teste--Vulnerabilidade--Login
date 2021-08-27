function BancoDeDados(){
    this.loginCorreto = 'admin';
    this.senhaCorreta = 'admin';

    this.tryAccessVulneravel = function ({login,senha}) {
        return ((this.loginCorreto == login) && (this.senhaCorreta == senha));
    }

}
module.exports = new BancoDeDados();