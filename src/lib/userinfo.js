import { Component } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';


class UserInfo extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        alert('로그아웃 되었습니다.');
        this.props.LogOut();
    }

    render(){
        return (
            <div>
                <div className="info">
                    <div>
                        <img className="profile-img" src={logo} alt="profile"/>
                        <h1>{this.props.id}</h1>
                        <h2>{this.props.email}</h2>
                    </div>
                    <div className="button-fields">
                        <Link to="/info">
                            <button className="btn">내 정보</button>
                        </Link>
                        <button className="btn" onClick={this.handleClick}>로그아웃</button>
                    </div>

                </div>
            </div>
        );
    }
}

export default UserInfo;