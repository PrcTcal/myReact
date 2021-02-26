import { Component } from 'react';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

class Export extends Component{
    constructor(props){
        super(props);
        this.state = {
            bar: {
                width: '0px'
            },
            item: []
        }
        this.handleOnClick = this.handleOnClick.bind(this);
    }
    componentDidMount(){
        let arr = [];
        for(let i = 0 ; i < 10 ; i++){
            arr.push({background: '#000', boxShadow: '0 0 30px 5px #000'});
        }
        this.setState({item: arr});
        socket.on('tick', function(data){
            this.setState({ bar: { width: String(10 * data) + 'px' }});
            if(data % 10 === 0){
                let arr = [];
                for(let i = 0 ; i < 10 ; i++){
                    if(i < (data / 10)){
                        arr.push({background: '#fff', boxShadow: '0 0 30px 5px #fff'});
                    } else {
                        arr.push({background: '#000', boxShadow: '0 0 30px 5px #000'});
                    }
                }
                this.setState({
                    item: arr
                });
            }
        }.bind(this));
    }

    handleOnClick(){
        socket.emit('export', 'good');
    }

    render(){
        return(
            <div>
                <button onClick={this.handleOnClick}>start</button>
                <div className="progress">
                    <div className="bar" style={this.state.bar}/>
                    <div className="stick"/>
                    <div className="stick"/>
                    <div className="stick"/>
                    <div className="stick"/>
                    <div className="stick"/>
                    <div className="stick"/>
                    <div className="stick"/>
                    <div className="stick"/>
                    <div className="stick"/>
                </div>
                <ul className="fileList w1000 exp-li">
                    <li style={this.state.item[0]}>export0</li>
                    <li style={this.state.item[1]}>export1</li>
                    <li style={this.state.item[2]}>export2</li>
                    <li style={this.state.item[3]}>export3</li>
                    <li style={this.state.item[4]}>export4</li>
                    <li style={this.state.item[5]}>export5</li>
                    <li style={this.state.item[6]}>export6</li>
                    <li style={this.state.item[7]}>export7</li>
                    <li style={this.state.item[8]}>export8</li>
                    <li style={this.state.item[9]}>export9</li>
                </ul>
            </div>
        );
    }
}

export default Export;