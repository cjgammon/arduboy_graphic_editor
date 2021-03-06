import appState from "app/models/appModel";
import * as React from "react";

import classnames from 'classnames';
import styles from './editorView.less';

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class EditorView extends React.Component<{}, {}> {
  
    state = {
        tool: 'brush',
        color: appState.color
    }

    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
    w: number;
    h: number;
    active: boolean = false;

    steps: Array<any> = [];
    redo_arr: Array<any> = [];
    frames: Array<any> = [];

    componentDidMount() {
        this.initCanvas();
    }

    initCanvas() {
        this.canvas = this.canvasRef.current;
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.width = 10 * appState.width;
        this.canvas.height = 10 * appState.height;

        this.w = this.canvas.width;
        this.h = this.canvas.height;
        appState.data = [...Array(appState.width)].map(e => Array(appState.height).fill([255, 255, 255, 255]));

        this.canvas.addEventListener("mousemove", (e) => this.handle_MOUSEMOVE(e));
        this.canvas.addEventListener("mousedown", (e) => this.handle_MOUSEDOWN(e));
        this.canvas.addEventListener("mouseup", (e) => this.handle_MOUSEUP(e));
        this.canvas.addEventListener("click", (e) => this.handle_CLICK(e));

        this.ctx.fillStyle = "white";
        this.ctx.globalAlpha = 1;
        this.ctx.fillRect(0, 0, this.w, this.h);
   
        this.setColor([0, 0, 0, 255]);
    }

    handle_CLICK(e) {
        let {x, y} = this.getMousePosition(e.clientX, e.clientY);

        if (this.state.tool == 'brush') {
            this.draw(x, y);
        } else if (this.state.tool == 'fill') {
            this.filler(x, y, appState.data[x][y]);
        }
    }

    handle_MOUSEUP(e) {
        this.active = false;
    }

    handle_MOUSEDOWN(e) {
       this.active = true;
    }

    handle_MOUSEMOVE(e) {
        if (this.active) {
            let {x, y} = this.getMousePosition(e.clientX, e.clientY);
            this.draw(x, y);
        }
    }

    getMousePosition(_x, _y) {
        let rect = this.canvas.getBoundingClientRect();
        let x = _x - rect.left;
        let y = _y - rect.top;
        x = Math.floor(appState.width * x / this.canvas.clientWidth);
        y = Math.floor(appState.height * y / this.canvas.clientHeight);

        return {x, y};
    }

    setColor(color) {
        appState.color = color;
        this.setState({color});
        this.ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
    }

    filler(x, y, cc) {
        if (x >= 0 && x < appState.width && y >= 0 && y < appState.height) {
            if (JSON.stringify(appState.data[x][y]) == JSON.stringify(cc) && 
                JSON.stringify(appState.data[x][y]) !== JSON.stringify(this.state.color)) 
            {
                this.draw(x, y);
                this.filler(x + 1, y, cc);
                this.filler(x, y + 1, cc);
                this.filler(x - 1, y, cc);
                this.filler(x, y - 1, cc);
            }
        }
    }

    draw(x, y, count?) {
        if (x > 0 && x < appState.width && y > 0 && y < appState.height) {
            appState.data[x][y] = appState.color;
            let _x = Math.floor(x * (this.w / appState.width));
            let _y = Math.floor(y * (this.h / appState.height));
            let _w = Math.floor(this.w / appState.width);
            let _h = Math.floor(this.h / appState.height);
            this.ctx.fillRect(_x, _y, _w, _h);
        }
    }
    
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.main}>
                    <canvas ref={this.canvasRef} className={styles.canvas}></canvas>

                    <div className={styles.ui}>
                        <button onClick={() => this.setState({tool: 'brush'})}>brush</button>
                        <button onClick={() => this.setState({tool: 'fill'})}>bucket</button>

                        <div className={styles.swatches}>
                            {this.renderSwatches()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderSwatches() {
        let arr = [];

        for (let i = 0; i < appState.colors.length; i++) {
            let color = appState.colors[i];
            arr.push(<div 
                onClick={() => this.setColor(color)}
                className={classnames({
                    [styles.swatch]: true, 
                    [styles.selected]: color.join(',') == this.state.color.join(',')
                })} 
                style={{
                    backgroundColor: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`
                }}></div>);
        }

        return arr;
    }

}