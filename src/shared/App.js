import React, {Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, Posts } from '../pages';
import { Menu } from '../components';
import { LoginControl, Info, Clock } from '../lib';
import logo from '../logo.svg';
import '../App.css';

class App extends Component {
    /*
    componentDidMount(){
        fetch('/api', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => { 
                this.setState({username: data.username}); 
                console.log(this.state.username) 
            });
            fetch('/api/group', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => { 
                    this.setState({username: data.username}); 
                    console.log(this.state.username) 
                });
    }
    */

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
                    </Switch>
                </header>
            </div>
        );
    }
}

export default App;