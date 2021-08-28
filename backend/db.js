function BancoDeDados(){
    this.loginCorreto = 'admin';
    this.senhaCorreta = 'admin';

    /** Essa função é a vulnerabilidade
     *  Ela retorna true caso o login seja igual ao setado como correto
     *  Caso não seja, ele retorna false, e não cai no if
     */
    this.vulnerabilidade = login => login === this.loginCorreto ;

    this.tryAccessVulneravel = function ({login,senha}) {
        return ((this.loginCorreto == login) && (this.senhaCorreta == senha));
    }

}

module.exports = new BancoDeDados();