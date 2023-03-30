import { useEffect, useState, React} from 'react';

const AnnualReport = () => {
    const [mousePos, setMousePos] = useState({});
    const [bulletId, setBulletId] = useState(0);

    function handleClick(event) {
        setBulletId(bulletId+1);
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.font = "30px Arial";
        ctx.fillText(bulletId, mousePos.x,mousePos.y);
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.roundRect(mousePos.x-4,mousePos.y+2, 5, 5, 3);
        ctx.stroke();
    }
    function handleMove(event) {
        var c = document.getElementById("myCanvas");
        var rect = c.getBoundingClientRect();
        var x=event.clientX-rect.left;
        var y=event.clientY-rect.top;
        setMousePos( { x: x, y: y });
    }
    return (
        <table>
            <div
            >
                <h1>Health Questionnaire</h1>
                The mouse is at position{' '}
                <b>
                  {(Math.round(mousePos.x * 100) / 100).toFixed(2)},{(Math.round(mousePos.y * 100) / 100).toFixed(2)}
                </b>
                <br/>
                <canvas id='myCanvas' 
                    width="400" height="800"
                    onMouseMove={handleMove} onClick={handleClick}
                    style={{
                        width:'400px', height:'800px', border:'1px solid #c3c3c3', backgroundColor:'#ffffff'
                    }}
                />
            </div>
        </table>
    );
};
export default AnnualReport;
