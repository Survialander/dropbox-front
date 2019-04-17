import React, { Component } from  'react';
import './style.css';
import logo from '../../assets/parachute-box.png';
import api from '../../services/api';

export default class Main extends Component {
    state = {
        newBox: '',
    };
    
    HandleSubmit = async (event) => {
        event.preventDefault();

        const response = await api.post('/boxes', {
            title: this.state.newBow
        });
        
        console.log(response.data);
    };

    HandleInputChange = (event) => {
       this.setState({ newBox: event.target.value });
    };

    render() {
        return (
           <div className="container">
                <div>
                    <form onSubmit={this.HandleSubmit} action="" >
                        <img className="logo" src={logo} alt="logo"/>
                        <input className="input" placeholder="Criar uma Box" value={this.state.newBox} onChange={this.HandleInputChange}/>
                        <button className="button button-purple">Teste</button>     
                    </form> 
                </div>
           </div>
        );
    }
}