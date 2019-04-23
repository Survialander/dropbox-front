import React, { Component } from  'react';
//import logo from '../../assets/parachute-box.png'
import logo from '../../assets/box.svg'
import './style.css';
import api from '../../services/api';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
// import logo from '../../assets/parachute-box.png';
// import api from '../../services/api';

export default class Main extends Component {
    state = {
        box: {},
    }
    
    async componentDidMount(){
        const box = this.props.match.params.id;
        const response = await api.get(`/boxes/${box}`);
        
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
                
                {this.state.box.files && this.state.box.files.map(files => (
                    <li className="itemList">
                        <div>
                            <a href={files.url} target="blank">
                            <i className="fas fa-file"></i>
                            <strong>{files.title}</strong>                           
                            </a> 
                            <span>há { " " }
                            {distanceInWords(files.createdAt, new Date(), {
                                locale: pt
                            })}</span>
                        </div>
                    </li>
                ))}      
                
                {!this.state.box.files && (
                    <li className="itemList">
                        <p>Não existem arquivos gravados na Box: <strong>{this.state.box.title}</strong></p>
                    </li>
                )}                      
                </ul>
            </div>
        );
    }
}