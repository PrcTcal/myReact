import logo from './logo.svg';
import './App.css';
import Clock from './clock';
import LoginControl from './logincontrol';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Clock />
        <img src={logo} className="App-logo" alt="logo" />
        <LoginControl />
      </header>
    </div>
  );
}

export default App;
