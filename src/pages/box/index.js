import React, { Component } from  'react';
//import logo from '../../assets/parachute-box.png'
import logo from '../../assets/box.svg'
import './style.css';
import api from '../../services/api';
// import logo from '../../assets/parachute-box.png';
// import api from '../../services/api';

export default class Main extends Component {
    state = {
        box: {},
    }
    
    async componentDidMount(){
        const caixa = this.props.match.params.id;
        const response = await api.get(`/boxes/${caixa}`);
        
        this.setState({box: response.data});
    }

    render() {
        return (
            <div className="boxContainer"> 
                <header className="header">
                    <img src={logo} alt="logo" className="logoHeader"/>
                    <h2>BOX: {this.state.box.title}</h2>
                </header>

                <ul className="list">
                <span className="spanArquivos">Arquivos:</span>
                {!this.state.box.files && (
                    <li className="itemList">
                        <p>Não existem arquivos gravados na Box: <strong>{this.state.box.title}</strong></p>
                    </li>
                )}

                {this.state.box.files && this.state.box.files.map(files => (
                    <li className="itemList">
                        <div>
                            <a href={files.url}>
                            <i className="fas fa-file"></i>
                            <strong>{files.title}</strong>                           
                            </a> 
                            <span>date</span>
                        </div>
                    </li>
                )) }                              
                </ul>
            </div>
        );
    }
}