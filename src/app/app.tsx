import * as React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import { EditorView } from "./views/editorView";
import HomeView from "./views/homeView";


export class App extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/edit">
                        <EditorView/>
                    </Route>
                    <Route exact path="/">
                        <HomeView/>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;