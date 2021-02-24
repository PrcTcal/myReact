import logo from './logo.svg';
import './App.css';
import Clock from './clock';
import LoginControl from './logincontrol';
import Info from './components/info';
import {Link, Switch, Route, BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Clock />
        <img src={logo} className="App-logo" alt="logo" />
        <Router>
          <Switch>
            <Route exact path="/" component={LoginControl}/>
            <Route exact path="/info" component={Info}/>
          </Switch>
        </Router>
        
      </header>
    </div>
  );
}

export default App;
