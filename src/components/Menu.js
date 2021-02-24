import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    const activeStyle = {
        color: 'green',
        fontSize: '2rem'
    }
    return(
        <div className="menu">
            <ul>
                <li><NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink></li>
                <li><NavLink exact to="/about" activeStyle={activeStyle}>About</NavLink></li>
                <li><NavLink to="/about/foo" /* activeClassName="[클래스명] --> 활성화 됬을 때 특정 클래스를 설정하는 방법" */ activeStyle={activeStyle}>About Foo</NavLink></li>
                <li><NavLink to="/posts" activeStyle={activeStyle}>Posts</NavLink></li>
                <li><NavLink to="/home">React Home</NavLink></li>
            </ul>
        </div>
    );
};

export default Menu;