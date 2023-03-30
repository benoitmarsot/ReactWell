import React from 'react';
import bodyDiagram from '/images/bodydiagram.jpeg';

class Assesment extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            mousePos:{},
            bulletId:1,
            texts:[]
        };
        this.handleMove = (event) => {
            const c = document.getElementById("myCanvas");
            const rect = c.getBoundingClientRect();
            const x=event.clientX-rect.left;
            const y=event.clientY-rect.top;
            this.setState( { mousePos: { x: x, y: y }});
        };
        this.handleClick = (event) => {
            this.setState({bulletId:this.state.bulletId+1});
            const c = document.getElementById("myCanvas");
            const ctx = c.getContext("2d");
            const texts=this.state.texts;
            texts[this.state.bulletId-1]={fromPos:{x:this.state.mousePos.x, y:this.state.mousePos.y}};
            this.setState({texts:texts});
            ctx.font = "30px Arial";
            ctx.fillText(this.state.bulletId, this.state.mousePos.x, this.state.mousePos.y);
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.roundRect( this.state.mousePos.x-4, this.state.mousePos.y+2, 5, 5, 3);
            ctx.stroke();
        };
    }
    diagnosesQ(props) {
        const self=this;
        function handleDiaChanges(event) {
            self.state.texts[event.target.name-1].text=event.target.value;
            self.setState({texts:self.state.texts});
        };
        const rows=[];   
        for(let ind=1;ind<props.rowcount;ind++) {
            rows.push(<tr key={ind}>
                <td><b>{ind}.</b></td>
                <td><input type='text' size='70' onChange={handleDiaChanges} name={ind} /></td>
            </tr>);
        }
        return (
            <table><tbody>
                {rows}
            </tbody></table>
            
        );
    }
    diagnosesA(props) {
        const rows=[];
        for(let ind=0;ind<props.rowcount-1;ind++) {
            rows.push(<tr key={ind}>
                <td><b>{ind+1}.</b></td>
                <td>{this.state.texts[ind].text} at position:
                    {(Math.round( this.state.texts[ind].fromPos.x * 100) / 100).toFixed(2)},{(Math.round( this.state.texts[ind].fromPos.y * 100) / 100).toFixed(2)}</td>
            </tr>);
        }
        return (
            <table><tbody>
                {rows}
            </tbody></table>
            
        );
    }
    componentDidMount() {
        //const image = document.getElementById('bodydiagram');
        const image=new Image();
        image.src='/images/bodydiagram.jpeg';
        const c = document.getElementById("myCanvas");
        const ctx = c.getContext("2d");
        image.onload= ()=>{
            ctx.drawImage(image,0,0);
        }
    }
    
    render() {
        return (
                <div>
                    <h1>Health Questionnaire</h1>
                    The mouse is at position{' '}
                    <b>
                      {(Math.round( this.state.mousePos.x * 100) / 100).toFixed(2)},{(Math.round( this.state.mousePos.y * 100) / 100).toFixed(2)}
                    </b>
                    <br/>
                    <canvas id='myCanvas' 
                        width='516' height='507'
                        onMouseMove={this.handleMove} onClick={this.handleClick}
                        style={{
                            border:'1px solid #c3c3c3', backgroundColor:'#ffffff'
                        }}
                    />
                    
                    {this.diagnosesQ({rowcount:this.state.bulletId})}
                    {this.diagnosesA({rowcount:this.state.bulletId})}
                </div>
        );
     
    }

}
export default Assesment;
