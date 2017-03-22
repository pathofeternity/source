import React, { PropTypes } from 'react';
import './App.css';
import {tick } from './actions.js'
import { connect } from 'react-redux'

/*
  This file technically defines two components:
  AppLayout, a presentational component (displays whatever it gets in props)
  and
  App, a container component (created by connect(), provides props)
*/

// Uses block arrow syntax to restrict the scope to this file.
const AppLayout = ({score, onClick}) =>  (
    <div className="App-container">
      <div className="App-column">
        <div className="App-stats">
          <div className="App-bars">
            {score}
          </div>
          <div className="App-timer">
            <button onClick={onClick} >CLICK ME</button>
          </div>
        </div>
        <div className="App-menu">
        </div>
      </div>
      <div className="App-column">
        <div className="App-skills">
          Skills go here.
        </div>
        <div className="App-map">
        </div>
      </div>
    </div>
  )

AppLayout.propTypes = {
  score: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

/*
  The extra curly braces and return are necessary due to quirks in block syntax.
  We want to return an object, but the braces around the object make it look
  like a set of statements instead.
*/
const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => { dispatch(tick())}
  }
}
const mapStateToProps = (state) => {
  return {
    score: state.score
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppLayout)

export default App;
