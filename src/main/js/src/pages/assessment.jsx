import React from 'react';
//I would like to get it with root path /services/provider.js
import providerSvc from '../services/provider.js';
import assessmentSvc from '../services/assessment.js';
import bodyDiagram from '/images/bodydiagram.jpeg';

class Assessment extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            mousePos:{},
            bulletId:0,
            texts:[],
            saved:false,
            curVersion: 0
        };
        this.providerId=props.providerid;
        this.patientId=props.patientid;
        this.assessmentDoc=null;
        this.maxVersion=0;
        
        this.handleMove = (event) => {
            const c = document.getElementById("myCanvas");
            const rect = c.getBoundingClientRect();
            const x=event.clientX-rect.left;
            const y=event.clientY-rect.top;
            this.setState( { mousePos: { x: x, y: y }});
        };
        this.handleClick = (event) => {
            const texts=this.state.texts;
            texts[this.state.bulletId]={fromPos:{x:this.state.mousePos.x, y:this.state.mousePos.y}};
            this.setState({texts:texts,saved:false,bulletId:this.state.bulletId+1});
        };
        this.handleSubmit= (event) => {
            const assessDoc=this.buildAssesmentDoc();
            assessmentSvc.putAssessment(this.providerId,this.patientId,assessDoc).then(() => {
                //History needs to load the assessment after a save, it should be fix
                this.loadAssessment();
                this.setState({saved:true});
            });
        };
    }
    buildAssesmentDoc() {
        const bodyQuestions=[];
        const answers=this.state.texts;
        for(let ind=0;ind<answers.length;ind++) {
            const ansTexts=[];
            if(
                answers[ind].text
                && answers[ind].assessmentVersionId === 0
            ) {
                //"versionTexts" : [{"assessmentVersionId," : 1, "content" : "First ouch"}]
                ansTexts.push({'assessmentVersionId' : 0, 'content' : answers[ind].text});
            }
            bodyQuestions.push({
                'bodyQuestionId':ind,
                'x':answers[ind].fromPos.x,
                'y':answers[ind].fromPos.y,
                'versionTexts':ansTexts
            });
        }
        //Should add a note field
        const assessDoc={'assessmentId':0,'providerId':this.providerId,'patientId':this.patientId,
            'assessmentVersions':[{'assessmentVersionId':0,'note':'firstNote'}],
            'bodyQuestions': bodyQuestions
        };
        return assessDoc;
    }
    loadAssessment() {
        assessmentSvc.getAssessment(this.providerId,this.patientId).then( assDoc => {
            this.assessmentDoc=assDoc;
            const lTexts=[];
            if(!assDoc.bodyQuestions) {
                return;
            }
            assDoc.bodyQuestions.forEach((bq)=>{
                const vId=(bq.versionTexts)?bq.versionTexts[0].assessmentVersionId:0;
                this.maxVersion=vId>this.maxVersion?vId:this.maxVersion;

                lTexts[bq.bodyQuestionId-1]={
                    fromPos:{x:bq.x, y:bq.y},
                    // 0 should be good ordered in version descending on the server
                    text:bq.versionTexts!==null?bq.versionTexts[0].content:''
                }
            });
            this.setState({
                saved:true, 
                bulletId:assDoc.bodyQuestions.length,
                texts:lTexts,
                curVersion: this.maxVersion
            });
            this.showQuestions();
        }, reject => {
            console.log("No assessment exists");
        });
    }
    showQuestions(props) {
        const c = document.getElementById("myCanvas");
        if(!c||!props) return;
        const ctx = c.getContext("2d");
       
        props.texts.forEach((q,index)=>{
            ctx.font = "30px Arial";
            ctx.fillText(index+1, q.fromPos.x, q.fromPos.y);
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.roundRect( q.fromPos.x-4, q.fromPos.y+2, 5, 5, 3);
            ctx.stroke();
        });
    }
    Goto(props) {
        const self=this;
        function navigate(events) {
            const dir=events.target.name;
            const nv=parseInt(self.state.curVersion)+parseInt(dir);
            if(nv<0 || nv>self.maxVersion+1) {
                return ;
            }
            const lTexts=[];
            self.assessmentDoc.bodyQuestions.forEach((bq)=>{
                if(bq.versionTexts) {
                    for(let ind=0;ind<bq.versionTexts.length;ind++) {
                        if(bq.versionTexts[ind].assessmentVersionId<=nv) {
                            lTexts[bq.bodyQuestionId-1]={
                                fromPos:{x:bq.x, y:bq.y},
                                text:bq.versionTexts[ind].content||''
                            }
                            break;
                        }
                    }
                    if(!lTexts[bq.bodyQuestionId-1]) {
                        lTexts[bq.bodyQuestionId-1]={
                            fromPos:{x:bq.x, y:bq.y},
                            text:''
                        }
                    };
                } else {
                    lTexts[bq.bodyQuestionId-1]={
                        fromPos:{x:bq.x, y:bq.y},
                        text:''
                    };
                }
            });
            self.setState({curVersion:nv,texts:lTexts});
        }
        const label=props.direction>0?'Next':'previous';
        return (
            <button onClick={navigate} name={props.direction}>{label}</button>
        );
    }
    
    DiagnosesQ(props) {
        const self=this;
        function handleDiaChanges(event) {
            self.state.texts[event.target.name-1].text=event.target.value;
            //props.texts[event.target.name-1].text=event.target.value;
            self.state.texts[event.target.name-1].assessmentVersionId=0;
            self.setState({saved:false,texts:self.state.texts});
        };
        const rows=[]; 
        if (!props.texts) {
            return ;
        }
        for(let ind=0;ind<props.texts.length;ind++) {
            const text=props.texts[ind].text||'';
            rows.push(<tr key={ind+1}>
                <td><b>{ind+1}.</b></td>
                <td><input type='text' size='70' onChange={handleDiaChanges} name={ind+1} value={text}/></td>
            </tr>);
        }
        return (
            <table><tbody>
                {rows}
            </tbody></table>
            
        );
    }
    DiagnosesA(props) {
        const rows=[];
        for(let ind=0;ind<props.texts.length;ind++) {
            if(!props.texts[ind]) break;
            const text=props.texts[ind]?props.texts[ind].text:'';
            rows.push(<tr key={ind}>
                <td><b>{ind+1}.</b></td>
                <td>{props.texts[ind].text} at position:
                    {(Math.round( props.texts[ind].fromPos.x * 100) / 100).toFixed(2)},{(Math.round( props.texts[ind].fromPos.y * 100) / 100).toFixed(2)}</td>
            </tr>);
        }
        return (
            <table><tbody>
                {rows}
            </tbody></table>
            
        );
    }
    showSaved() {
        if(this.state.saved) {
            return <div>Saved</div>;
        } else {
            return;
        }
    }
    componentDidMount() {
        //const image = document.getElementById('bodydiagram');
        const image=new Image();
        image.src='/images/bodydiagram.jpeg';
        const c = document.getElementById("myCanvas");
        if(!c) return;
        const ctx = c.getContext("2d");
        image.onload= ()=>{
            ctx.drawImage(image,0,0);
            this.loadAssessment();
            
        }
    }

    
    render() {
        return this.providerId?(
            <div>
                <h1>Health Questionnaire</h1>
                navigation: {this.Goto({direction:1})}{this.Goto({direction:-1})}
                The mouse is at position{' '}
                <b>
                  {(Math.round( this.state.mousePos.x * 100) / 100).toFixed(2)},{(Math.round( this.state.mousePos.y * 100) / 100).toFixed(2)}
                </b>
                <br/>
                <table>
                    <tbody>
                        <tr><td>
                            <canvas id='myCanvas' 
                                width='516' height='507'
                                onMouseMove={this.handleMove} onClick={this.handleClick}
                                style={{
                                    border:'1px solid #c3c3c3', backgroundColor:'#ffffff'
                                }}
                            />
                        </td><td>
                            Provider: {this.providerId}<br/>
                            patient: {this.patientId}
                        </td></tr>
                    </tbody>
                </table>

                <this.showQuestions texts={this.state.texts} />
                {this.DiagnosesQ({rowcount:this.state.bulletId,texts:this.state.texts})}
                <this.DiagnosesA rowcount={this.state.bulletId} texts={this.state.texts}/>
                <button onClick={this.handleSubmit} >Submit</button>
                {this.showSaved()}
            </div>
        ):(
           <div>
                <h1>Health Questionnaire</h1>
                Please login first
            </div>
        );
     
    }

}
export default Assessment;
