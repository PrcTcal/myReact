import { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Export, Import } from './';

class Migration extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeStyle : {
                color: 'green',
                fontSize: '2rem'
            }
        }
    }
    render(){
        return(
            <div>
                <div className="menu">
                    <ul>
                        <li><NavLink to="/migration/export" activeStyle={this.state.activeStyle}>export</NavLink></li>
                        <li><NavLink to="/migration/import" activeStyle={this.state.activeStyle}>import</NavLink></li>
                    </ul>
                </div>
                <div>
                    <Switch>
                        <Route path="/migration/export" component={Export}/>
                        <Route path="/migration/import" component={Import}/>
                    </Switch>
                </div>
            </div>
            
        );
    }
}

export default Migration;