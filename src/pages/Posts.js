import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Post } from './';

const Posts = ({location, match}) => {
    return (
        <div>
            <h2>Post List</h2>
            <div className="menu">
                <ul>
                    <li><Link to={`${match.url}/1`}>Post #1</Link></li>
                    <li><Link to={`${match.url}/2`}>Post #2</Link></li>
                    <li><Link to={`${match.url}/3`}>Post #3</Link></li>
                    <li><Link to={`${match.url}/4`}>Post #4</Link></li>
                </ul>
            </div>
            <br/>
              
            <div className="br">
                <Route exact path={match.url} render={() => (<h3>Please select any post</h3>)}/>
                <Route path={`${match.url}/:id`} component={Post}/>  
                <h1>Posts</h1>
                lication.pathname : {location.pathname /* 현재 브라우저상의 위치 */}<br/> 
                match.path: {match.path /* Route에서 설정한 path값 그대로가 나옴 */}<br/>
                match.url: {match.url /* Route에서 설ㅈ어한 path값에 실제 url의 param이 붙어서 나옴 */}<br/>
            </div>
        </div>
    );
};

export default Posts;