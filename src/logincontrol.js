import {Component} from 'react';
import UserInfo from './userinfo';
import Login from './login';

class LoginControl extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false,
            user: [
                {
                    id: 'asd',
                    email: 'asd@naver.com',
                    pw: 'qwe'
                }
            ]
        }
        this.LogIn = this.LogIn.bind(this);
        this.LogOut = this.LogOut.bind(this);
    }
    LogIn(id, pw){
        let check = false;
        this.state.user.forEach(user => {
            if(user.id === id && user.pw === pw) {
                this.setState({isLoggedIn: true});
                check = true;
            }
        });
        return check;
    }

    LogOut(){
        this.setState({isLoggedIn: false});
    }

    render(){
        return(
            <div className="login-container">
                {this.state.isLoggedIn ? <UserInfo id={this.state.id} email={this.state.email} LogOut={this.LogOut}/> : <Login LogIn={this.LogIn}/>}
            </div>
        );
    }
}

export default LoginControl;