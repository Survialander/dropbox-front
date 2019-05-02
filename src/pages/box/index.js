import React, { Component } from  'react';
//import logo from '../../assets/parachute-box.png'
import logo from '../../assets/box.svg'
import './style.css';
import api from '../../services/api';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Dropzone from 'react-dropzone';
import socket from 'socket.io-client';
// import logo from '../../assets/parachute-box.png';
// import api from '../../services/api';

export default class Main extends Component {
    state = {
        box: {},
    }
    
    async componentDidMount(){
        this.NewFile();

        const box = this.props.match.params.id;
        const response = await api.get(`/boxes/${box}`);
        
        this.setState({box: response.data});
    }

    NewFile = () => {
        const box = this.props.match.params.id;
        const io = socket('https://dropp-box-back.herokuapp.com');

        io.emit('connectRoom', box);
        
        io.on('arquivo', data => {
            this.setState({ box: {...this.state.box, files: [data, ...this.state.box.files]} })
        })
    };

    handleUpload = (files) => {
        files.forEach(file => {
            const box = this.props.match.params.id;
            const data = new FormData();
            
            data.append('arquivo', file);

            api.post(`boxes/${box}/arquivos`, data);
        });
    };
 
    render() {
        return (
            <div className="boxContainer"> 
                <header className="header">
                    <img src={logo} alt="logo" className="logoHeader"/>
                    <h2>BOX: {this.state.box.title}</h2>
                </header>

                <Dropzone onDropAccepted={this.handleUpload}>
                    {({getRootProps, getInputProps}) => (
                        <div className="upload" { ... getRootProps() }>
                            <input { ...getInputProps()}/>
                            <p>Insira os arquivos ou clique aqui <i className="fas fa-upload"></i></p>
                        </div>
                    )}
                </Dropzone>

                <ul className="list">
                <span className="spanArquivos">Arquivos:</span>
                
                {!this.state.box.files && (
                    <li className="itemList">
                        <p>Não existem arquivos gravados na Box: <strong>{this.state.box.title}</strong></p>
                    </li>
                )} 

                {this.state.box.files && this.state.box.files.map(files => (
                    <li className="itemList" key={files._id}>
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
                
                                     
                </ul>
            </div>
        );
    }
}