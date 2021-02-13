import appState from "app/models/appModel";
import * as React from "react";

import styles from './editorView.less';

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class EditorView extends React.Component<{}, {}> {
  
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
    heightRef: React.RefObject<HTMLInputElement> = React.createRef();
    widthRef: React.RefObject<HTMLInputElement> = React.createRef();
    w: number;
    h: number;
    active: boolean = false;
    data;

    color: Array<number> = [0, 0, 0, 255];
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
        this.data = [...Array(appState.width)].map(e => Array(appState.height).fill([255, 255, 255, 255]));

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
        let rect = this.canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        x = Math.floor(appState.width * x / this.canvas.clientWidth);
        y = Math.floor(appState.height * y / this.canvas.clientHeight);
        this.draw(x, y);
    }

    handle_MOUSEUP(e) {
        this.active = false;
    }

    handle_MOUSEDOWN(e) {
       this.active = true;
    }

    handle_MOUSEMOVE(e) {
        if (this.active) {
            let rect = this.canvas.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            x = Math.floor(appState.width * x / this.canvas.clientWidth);
            y = Math.floor(appState.height * y / this.canvas.clientHeight);
            this.draw(x, y);
        }
    }

    handle_UPDATE_SIZE() {

    }

    handle_LOAD() {

    }

    setColor(color) {
        this.color = color;
        this.ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
    }

    draw(x, y, count?) {
        if (x > 0 && x < appState.width && y > 0 && y < appState.height) {
            console.log("draw");
            console.log(this.data);
            this.data[x][y] = this.color;
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
                <div>
                    width <input ref={this.widthRef}></input> 
                    height <input ref={this.heightRef}></input>
                    <button onClick={() => this.handle_UPDATE_SIZE()}>create</button> 
                    <button onClick={() => this.handle_LOAD()}>load</button>
                </div>
                <div className={styles.main}>
                    <canvas ref={this.canvasRef} className={styles.canvas}></canvas>
                </div>
            </div>
        );
    }
}