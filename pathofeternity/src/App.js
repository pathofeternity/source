import React, { PropTypes } from 'react';
import './App.css';
import {Fade} from 'react-bootstrap'
import TrainingBars from './bars/training_bars.js';
import TabMenu from './tab_menu/tab_menu.js';
import EventPanel from './event_panel/event_panel.js';
import SkillPanel from './skill_panel/skill_panel.js';
import TimerArea from './timer_area.js';
import EventListing from './event_listing/event_listing.js';
import {tick } from './actions.js'
import { connect } from 'react-redux'

/*
  This file technically defines two components:
  AppLayout, a presentational component (displays whatever it gets in props)
  and
  App, a container component (created by connect(), provides props)
*/

// Uses block arrow syntax to restrict the scope to this file.
const AppLayout = ({onClick, save, deleteSave, hasEvent}) =>  (
    <div className="App-container">
      <div className="App-column">
        <div className="App-stats">
          <div className="App-bars">
            <TrainingBars />
          </div>
          <div className="App-timer">
            <button onClick={onClick} >TICK (for manual debugging)</button>
            <button onClick={save}>Save</button>
            <button onClick={deleteSave}>Delete Save</button>
            <TimerArea/>
          </div>
        </div>
        <div className="App-menu">
          <TabMenu />
        </div>
      </div>
      <div className="App-column">
        <div className="App-skills">
          <SkillPanel/>
        </div>
        <div className="App-map">
          {
            hasEvent ? <EventPanel /> : <EventListing />
          }
        </div>
      </div>
    </div>
  )

AppLayout.propTypes = {
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
    score: state.score,
    save: () => localStorage.setItem('saved_game', JSON.stringify(state)),
    deleteSave: () => localStorage.setItem('saved_game', null),
    hasEvent: state.activeEvent != null
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppLayout)

export default App;
