import * as React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { EditorView } from "./views/editorView";

export default class App extends React.Component {

    render() {
        return (
            <Router>
                    <Switch>
                        <Route path="/">
                            <EditorView/>
                        </Route>
                    </Switch>
            </Router>
        );
    }
}