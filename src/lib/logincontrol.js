import {Component} from 'react';
import UserInfo from './userinfo';
import Login from './login';
import Register from './register';


class LoginControl extends Component{
    constructor(props){
        super(props);
        this.state = {
            registerClicked: false,
            isLoggedIn: false,
            user: {
                id: '',
                email: '',
                pw: '',
            }
            
        }
        this.LogIn = this.LogIn.bind(this);
        this.LogOut = this.LogOut.bind(this);
        this.Register = this.Register.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
    }

    Register(id, email, pw){
        return new Promise((resolve, reject) => {
            fetch('/login/reg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    id: id, 
                    email: email, 
                    pw: pw
                })
            }).then(res => res.json())
            .then(res => {
                console.log(res);
                return resolve(res.result);
            });
        });
    }

    handleRegisterClick(val){
        this.setState({ registerClicked : val });
    }

    LogIn(id, pw){
        return new Promise((resolve, reject) => {
            fetch('/login/valid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    pw: pw
                })
            }).then(res => res.json())
            .then(res => {
                if(res.result != null){
                    this.setState({
                        isLoggedIn: true,
                        registerClicked: false,
                        user: {
                            id: res.result.userid,
                            email: res.result.email,
                            pw: res.result.pw
                        }
                    });
                    return resolve(true);
                }
            });
        });
    }
    
    LogOut(){
        this.setState({
            isLoggedIn: false,
            user: {
                id: '',
                email: '',
                pw: ''
            }
        });
    }

    render(){
        return(
            <div className="login-container">
                {this.state.isLoggedIn ? <UserInfo id={this.state.user.id} email={this.state.user.email} LogOut={this.LogOut}/> : 
                this.state.registerClicked ? <Register Register={this.Register} handleRegisterClick={this.handleRegisterClick}/> : <Login LogIn={this.LogIn} handleRegisterClick={this.handleRegisterClick}/>}
            </div>
        );
    }
}

export default LoginControl;