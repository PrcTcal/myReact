import { Component } from 'react';
import io from 'socket.io-client';
import ForwardOutlinedIcon from '@material-ui/icons/ForwardOutlined';

const socket = io.connect("http://localhost:3001");

class Import extends Component{
    constructor(props){
        super(props);
        this.state = {
            exportFile : [
                { width: '50px', boxShadow: '0 0 30px 5px #fff', percentage: 100},
                { width: '50px', boxShadow: '0 0 30px 5px #fff', percentage: 100},
                { width: '50px', boxShadow: '0 0 30px 5px #fff', percentage: 100},
                { width: '50px', boxShadow: '0 0 30px 5px #fff', percentage: 100},
                { width: '50px', boxShadow: '0 0 30px 5px #fff', percentage: 100},
                { width: '50px', boxShadow: '0 0 30px 5px #fff', percentage: 100},
                { width: '50px', boxShadow: '0 0 30px 5px #fff', percentage: 100},
                { width: '50px', boxShadow: '0 0 30px 5px #fff', percentage: 100},
                { width: '50px', boxShadow: '0 0 30px 5px #fff', percentage: 100},
                { width: '50px', boxShadow: '0 0 30px 5px #fff', percentage: 100}
            ],
            importFile : {
                height: '0px',
                percentage: 0,
                boxShadow: '0 0 30px 5px #000'
            },
            animation: 'none',
            idx: 0
        }
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    componentDidMount(){
        socket.on('importTick', function(data){
            let arr = this.state.exportFile;
            arr[this.state.idx].width = String(50 - (0.5 * data)) + 'px';
            arr[this.state.idx].percentage = 100 - data;

            if(arr[this.state.idx].percentage % 10 === 0){
                if(arr[this.state.idx].percentage === 0){
                    arr[this.state.idx].boxShadow = '0 0 30px 5px #000';
                    this.setState({ exportFile: arr, importFile: { height: String(1.5 * (this.state.importFile.percentage + 1)) + 'px', percentage: this.state.importFile.percentage + 1}, idx: this.state.idx + 1});
                } else {
                    this.setState({ exportFile: arr, importFile: { height: String(1.5 * (this.state.importFile.percentage + 1)) + 'px', percentage: this.state.importFile.percentage + 1}});
                }

            } else {
                this.setState({exportFile: arr});
            }
            if(this.state.importFile.percentage === 100){
                this.setState({importFile: {boxShadow: '0 0 30px 5px #fff'}, animation: 'none'});
            }

        }.bind(this));
    }

    handleOnClick(){
        socket.emit('import', 'good');
        this.setState({animation: 'charging infinite 2s linear'})
    }

    render(){
        return(
            <div>
                <button onClick={this.handleOnClick}>start</button>
                <div className="flex-row">
                    <div className="progress-src">
                        <ul className="fileList w300 imp-li">
                            <li>
                            <div className="progress-box source-box" style={{boxShadow: this.state.exportFile[0].boxShadow}}>
                                <div className="percentage-text src-percent">{this.state.exportFile[0].percentage}%</div>
                                <div className="source" style={{width: this.state.exportFile[0].width}}/>
                            </div>
                            </li>
                            <li>
                                <div className="progress-box source-box" style={{boxShadow: this.state.exportFile[1].boxShadow}}>
                                    <div className="percentage-text src-percent">{this.state.exportFile[1].percentage}%</div>
                                    <div className="source" style={{width: this.state.exportFile[1].width}}/>
                                </div>
                            </li>
                            <li>
                                <div className="progress-box source-box" style={{boxShadow: this.state.exportFile[2].boxShadow}}>
                                    <div className="percentage-text src-percent">{this.state.exportFile[2].percentage}%</div>
                                    <div className="source" style={{width: this.state.exportFile[2].width}}/>
                                </div>
                            </li>
                            <li>
                                <div className="progress-box source-box" style={{boxShadow: this.state.exportFile[3].boxShadow}}>
                                    <div className="percentage-text src-percent">{this.state.exportFile[3].percentage}%</div>
                                    <div className="source" style={{width: this.state.exportFile[3].width}}/>
                                </div>
                            </li>
                            <li>
                                <div className="progress-box source-box" style={{boxShadow: this.state.exportFile[4].boxShadow}}>
                                    <div className="percentage-text src-percent">{this.state.exportFile[4].percentage}%</div>
                                    <div className="source" style={{width: this.state.exportFile[4].width}}/>
                                </div>
                            </li>
                        </ul>
                        <ul className="fileList w300 imp-li">
                            <li>
                                <div className="progress-box source-box" style={{boxShadow: this.state.exportFile[5].boxShadow}}>
                                    <div className="percentage-text src-percent">{this.state.exportFile[5].percentage}%</div>
                                    <div className="source" style={{width: this.state.exportFile[5].width}}/>
                                </div>
                            </li>
                            <li>
                                <div className="progress-box source-box" style={{boxShadow: this.state.exportFile[6].boxShadow}}>
                                    <div className="percentage-text src-percent">{this.state.exportFile[6].percentage}%</div>
                                    <div className="source" style={{width: this.state.exportFile[6].width}}/>
                                </div>
                            </li>
                            <li>
                                <div className="progress-box source-box" style={{boxShadow: this.state.exportFile[7].boxShadow}}>
                                    <div className="percentage-text src-percent">{this.state.exportFile[7].percentage}%</div>
                                    <div className="source" style={{width: this.state.exportFile[7].width}}/>
                                </div>
                            </li>
                            <li>
                                <div className="progress-box source-box" style={{boxShadow: this.state.exportFile[8].boxShadow}}>
                                    <div className="percentage-text src-percent">{this.state.exportFile[8].percentage}%</div>
                                    <div className="source" style={{width: this.state.exportFile[8].width}}/>
                                </div>
                            </li>
                            <li>
                                <div className="progress-box source-box" style={{boxShadow: this.state.exportFile[9].boxShadow}}>
                                    <div className="percentage-text src-percent">{this.state.exportFile[9].percentage}%</div>
                                    <div className="source" style={{width: this.state.exportFile[9].width}}/>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="arrow"><ForwardOutlinedIcon style={{fontSize: 100, animation: this.state.animation}}/></div>
                    <div className="progress-box dest-box" style={{boxShadow: this.state.importFile.boxShadow}}>
                        <div className="percentage-text dest-percent">{this.state.importFile.percentage}%</div>
                        <div className="dest" style={{height: this.state.importFile.height}}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Import;