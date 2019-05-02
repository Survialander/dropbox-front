import React, { Component } from  'react';
import './style.css';
import logo from '../../assets/box.svg';
import api from '../../services/api';

export default class Main extends Component {
    state = {
        newBox: '',
    };
    
    HandleSubmit = async (event) => {
        event.preventDefault();

        const response = await api.post('/boxes', {
            title: this.state.newBox,
        });
        
        this.props.history.push(`/boxes/${response.data._id}`);
        console.log(response.data);
    };

    HandleInputChange = (event) => {
       this.setState({ newBox: event.target.value });
    };

    render() {
        return(  
        <div className="area">  
            <ul className="circles"> 
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li> 
                
                <div className="container">                    
                    <div className="formBox">
                        <form onSubmit={this.HandleSubmit} action="">                                               
                            <img src={logo} className="logo" alt="logo" />                      
                            <input className="input" placeholder="Criar uma Box" value={this.state.newBox} onChange={this.HandleInputChange}/>                                             
                            <button className="button button-purple">CreateBox</button>                                         
                        </form>        
                    </div>        
                </div>

                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>  
            </ul>
        </div>
        );
    }
}