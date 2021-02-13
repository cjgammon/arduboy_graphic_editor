import * as React from "react";

import styles from './mainView.less';

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class MainView extends React.Component<{}, {}> {
  
    state = {
        scale: 1,
        w: 128,
        h: 64,
        mouse: null
    }

    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
    heightRef: React.RefObject<HTMLInputElement> = React.createRef();
    widthRef: React.RefObject<HTMLInputElement> = React.createRef();

    componentDidMount() {
        this.canvas = this.canvasRef.current;
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.style.width = `${this.state.w * this.state.scale}px`;
        this.canvas.style.height = `${this.state.h * this.state.scale}px`;

        this.canvas.addEventListener("mousemove", (e) => this.handle_MOUSEMOVE(e));
        this.canvas.addEventListener("mousedown", (e) => this.handle_MOUSEDOWN(e));
    }

    handle_MOUSEDOWN(e) {
        let x = (this.state.mouse.x - this.canvas.offsetLeft) / this.state.scale;
        let y = (this.state.mouse.y - this.canvas.offsetTop) / this.state.scale;
        this.ctx.fillRect(x, y, this.state.scale, this.state.scale);
    }

    handle_MOUSEMOVE(e) {
        this.setState({mouse: e});
    }

    handle_UPDATE_SIZE() {

    }

    handle_LOAD() {

    }

    draw() {

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
                    <canvas ref={this.canvasRef} className={styles.canvas} width={this.state.w} height={this.state.h}></canvas>
                </div>
            </div>
        );
    }
}