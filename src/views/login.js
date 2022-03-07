import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'
import { mensagemErro } from '../components/toastr'
import { AuthContext } from '../main/provedorAutenticacao'

class Login extends React.Component {

    constructor(){
        super()
        this.service = new UsuarioService();
    }

    state = {
        email: '',
        senha: '',
    }

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then( response => {
            this.context.iniciarSessao(response.data)
            this.props.history.push('/home')
        }).catch( erro => {
            mensagemErro(erro.response.data)
        })
    }

    preparaCadastrar = () => { this.props.history.push('/cadastro-usuarios') }

    render() {
        return (
            <div className="row">
                <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="E-mail: *" htmlFor="exampleInputEmail1">
                                                <input value={this.state.email}
                                                    onChange={e => this.setState({ email: e.target.value })}
                                                    type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Digite o Email" />
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                <input value={this.state.senha}
                                                    onKeyDown={ e => e.key ==='Enter' ? this.entrar : '' }
                                                    onChange={e => this.setState({ senha: e.target.value })}
                                                    type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                            </FormGroup>
                                            <div className="mt-1">
                                                <button className="btn btn-success" onClick={this.entrar} >
                                                    <i className="pi pi-sign-in"></i> Entrar
                                                </button>
                                                <button onClick={this.preparaCadastrar} className="btn btn-danger">
                                                    <i className="pi pi-plus"></i> Cadastrar
                                                </button>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

Login.contextType = AuthContext
export default withRouter ( Login )