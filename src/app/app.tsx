import * as React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { MainView } from "./views/mainView";

export default class App extends React.Component {

    render() {
        return (
            <Router>
                    <Switch>
                        <Route path="/">
                            <MainView/>
                        </Route>
                    </Switch>
            </Router>
        );
    }
}