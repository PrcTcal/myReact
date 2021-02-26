import React, {Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, Posts } from '../pages';
import { Menu } from '../components';
import { LoginControl, Info, Clock, Migration } from '../lib';
import logo from '../logo.svg';
import '../App.css';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

class App extends Component {
    componentDidMount(){
        socket.emit("box", "hello");
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Clock />
                    <img src={logo} className="App-logo" alt="logo" />
                    <Menu />
                    <Route exact path="/" component={Home}/>
                    <Switch>
                        <Route path="/about/:name" component={About} />
                        <Route path="/about" component={About}/>
                    </Switch>
                    <Route path="/posts" component={Posts}/>
                    <Switch>
                        <Route exact path="/home" component={LoginControl}/>
                        <Route exact path="/info" component={Info}/>
                        <Route path="/migration" component={Migration}/>
                    </Switch>
                </header>
            </div>
        );
    }
}

export default App;