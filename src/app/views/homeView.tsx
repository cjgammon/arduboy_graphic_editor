import appState from "app/models/appModel";
import * as React from "react";

import {withRouter} from "react-router-dom";

interface Props{
    history: any
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class HomeView extends React.Component<Props, {}> {

    heightRef: React.RefObject<HTMLInputElement> = React.createRef();
    widthRef: React.RefObject<HTMLInputElement> = React.createRef();

    handle_CREATE() {

        appState.width = parseInt(this.widthRef.current.value);
        appState.height = parseInt(this.heightRef.current.value);
        
        this.props.history.push('/edit')
    }

    handle_LOAD() {

    }

    handle_width_CHANGE(e) {
        appState.width = e;
    }

    handle_height_CHANGE(e) {
        appState.height = e;
    }
    
    render() {
        return (
            <div>
                width <input ref={this.widthRef} defaultValue={appState.width} onInput={(e) => this.handle_width_CHANGE(e)}></input> 
                height <input ref={this.heightRef} defaultValue={appState.height} onInput={(e) => this.handle_height_CHANGE(e)}></input>
                <button onClick={() => this.handle_CREATE()}>create</button> 
                <button onClick={() => this.handle_LOAD()}>load</button>
            </div>
        );
    }
}

export default withRouter(HomeView);