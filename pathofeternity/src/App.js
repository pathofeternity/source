import React from 'react';
import './App.css';
import TrainingBars from './bars/training_bars.js';
import TabMenu from './tab_menu/tab_menu.js';
import EventPanel from './event_panel/event_panel.js';
import SkillPanel from './skill_panel/skill_panel.js';
import TimerArea from './timer_area.js';
import Popup from './popup.js';
import EventListing from './event_listing/event_listing.js';
import {tick, showPopup} from './actions.js'
import { connect } from 'react-redux'
import {Fade} from 'react-bootstrap'

/*
  This file technically defines two components:
  AppLayout, a presentational component (displays whatever it gets in props)
  and
  App, a container component (created by connect(), provides props)
*/

// Uses block arrow syntax to restrict the scope to this file.
const AppLayout = ({onClick, save, deleteSave, hasEvent, showPopup, level}) =>  (

  <div className="App-container">
    <Popup />
    <div className="App-column">
      <div className="App-stats">
        <div className="App-bars">
          <TrainingBars />
        </div>
        <div className="App-timer">
          <Fade in={level >= 1}>
      			{level >= 0 ?
              <div>
                <button onClick={onClick} >TICK (for manual debugging)</button>
                <button onClick={save}>Save</button>
                <button onClick={deleteSave}>Delete Save</button>
                <button onClick={showPopup}>Open Popup</button>
                <TimerArea/>
              </div>
            : <div/> }
          </Fade>
        </div>
      </div>
          <div className="App-menu">
            <Fade in={level >= 1}>
        			{level >= 1 ?
                <TabMenu />
              : <div/> }
            </Fade>
          </div>
    </div>
    <div className="App-column">
          <div className="App-skills">
            <Fade in={level >= 1}>
        			{level >= 1 ?
                <SkillPanel/>
              : <div/> }
            </Fade>
          </div>
          <div className="App-map">
            <Fade in={level >= 1 || hasEvent} >
        			{level >= 1 || hasEvent ?
                <div>
                  {hasEvent ? <EventPanel /> : <EventListing />}
                </div>
              : <div/> }
            </Fade>
          </div>
    </div>
  </div>
  )

/*
  The extra curly braces and return are necessary due to quirks in block syntax.
  We want to return an object, but the braces around the object make it look
  like a set of statements instead.
*/
const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => dispatch(tick()),
    showPopup: () => dispatch(showPopup("Sample title", "Message goes here"))
  }
}
const mapStateToProps = (state) => {
  return {
    score: state.score,
    save: () => localStorage.setItem('saved_game', JSON.stringify(state)),
    deleteSave: () => localStorage.setItem('saved_game', null),
    hasEvent: state.activeEvent != null,
    level: state.level
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppLayout)

export default App;
