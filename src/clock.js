import {Component} from 'react';

class Clock extends Component{
    constructor(props){
        super(props);
        this.state = {
            date : new Date(),
            timerID : 1,
            clicked : false
        };
        this.handleHover = this.handleHover.bind(this);
        this.handleHout = this.handleHout.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.tick = this.tick.bind(this);
    }
    handleHover(){
        if(!this.state.clicked){
            this.tick();        
            this.setState({timerID: setInterval(
                () => this.tick(),
                1000
            )});
        }
        
    }

    handleHout(){
        if(!this.state.clicked){
            clearInterval(this.state.timerID);
        }
    }

    handleClick(){
        this.state.clicked ? this.setState({clicked : false}) : this.setState({clicked : true});
    }

    tick() {
        this.setState({
            date : new Date()
        });
    }

    render(){
        return(
            <div>
                <div className={"clock " + (this.state.clicked ? "actv" : "")} onMouseOver={this.handleHover} onMouseOut={this.handleHout} onClick={this.handleClick}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <div>{this.state.date.toLocaleTimeString()}</div>
                </div>

            </div>
        );
    }
    
}

export default Clock;