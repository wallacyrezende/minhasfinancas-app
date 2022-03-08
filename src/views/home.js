import React from 'react'
import UsuarioService from '../app/service/usuarioService'
import { AuthContext } from '../main/provedorAutenticacao'
import LancamentosTable from '../views/lancamentos/lancamentosTable'
import LancamentoService from '../../src/app/service/lancamentoService'

class Home extends React.Component{

    state = {
        saldo: 0,
        lancamentos: [],
    }

    constructor() {
        super()
        this.usuarioService = new UsuarioService();
        this.lancamentoService = new LancamentoService();
    }

    componentDidMount(){
        const usuarioLogado =  this.context.usuarioAutenticado
        this.usuarioService
            .obterSaldoPorUsuario(usuarioLogado.id)
            .then( response => {
                this.setState({ saldo: response.data })
            }).catch( error => {
                console.error(error.response)
            })

        this.lancamentoService.ultimosLancamentos(usuarioLogado.id)
            .then( response => {
                this.setState({ lancamentos: response.data })
            }).catch( error => {
                console.error(error.response)
            })
    }

    render(){
        return(
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" href="#/cadastro-usuarios" role="button"><i className="pi pi-users">
                        </i>  Cadastrar Usuário
                    </a>
                    <a className="btn btn-danger btn-lg" href="#/cadastro-lancamentos"role="button"><i className="pi pi-money-bill">
                        </i>  Cadastrar Lançamento
                    </a>
                </p>
                <br/ >
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable 
                                lancamentos={this.state.lancamentos}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Home.contextType = AuthContext
export default Home