import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Home from './Home';
import Login from './Login'
import QuestionInfo from './QuestionInfo'
import Leaderboard from './Leaderboard'

import Nav from './Nav'
import '../App.css';
import AddQuestion from './AddQuestion';
import ProtectRoute from './ProtectRoute'
import NotFound from './NotFound'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <div className='container'>
                        <Nav />
                        <div className="main-content">
                            <Switch>
                                <Route path="/" exact component={Login} />
                                <ProtectRoute path='/Home' exact component={Home} />
                                <ProtectRoute path='/add' exact component={AddQuestion} />
                                <ProtectRoute path='/question/:id' component={QuestionInfo} />
                                <ProtectRoute path='/leaderboard' component={Leaderboard} />
                                <Route path="/not-found" component={NotFound} />
                            </Switch>
                        </div>
                    </div>
                </Fragment>
            </Router>
        )
    }
}

export default connect()(App);