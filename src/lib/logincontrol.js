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
            user: [
                {
                    id: 'asd',
                    email: 'asd@naver.com',
                    pw: 'qwe',
                    login: false
                }
            ]
        }
        this.LogIn = this.LogIn.bind(this);
        this.LogOut = this.LogOut.bind(this);
        this.Register = this.Register.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
    }

    Register(id, email, pw){
        let registerCode = 0;
        this.state.user.forEach(user => {
            if(user.id === id){
                registerCode = 1;
            } else if(user.email === email){
                registerCode = 2;
            }
        });
        if(registerCode === 0){
            this.setState({
                user: this.state.user.concat({
                    id: id,
                    email: email,
                    pw: pw,
                    login: false
                })
            });
        }
        return registerCode;
    }

    handleRegisterClick(val){
        this.setState({ registerClicked : val });
    }

    LogIn(id, pw){
        let check = false;
        this.state.user.forEach(user => {
            if(user.id === id && user.pw === pw) {
                user.login = true;
                this.setState({isLoggedIn: true});
                this.setState({registerClicked : false});
                check = true;
            }
        });
        return check;
    }
    
    LogOut(){
        this.setState({isLoggedIn: false});
        this.state.user.filter(user => user.login === true).map(user => user.login = false);
    }

    render(){
        return(
            <div className="login-container">
                {this.state.isLoggedIn ? this.state.user.filter(user => user.login === true).map(user => <UserInfo id={user.id} email={user.email} LogOut={this.LogOut}/>) : 
                this.state.registerClicked ? <Register Register={this.Register} handleRegisterClick={this.handleRegisterClick}/> : <Login LogIn={this.LogIn} handleRegisterClick={this.handleRegisterClick}/>}
            </div>
        );
    }
}

export default LoginControl;