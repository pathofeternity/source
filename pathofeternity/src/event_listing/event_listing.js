import React from 'react';
import './event_listing.css';
import {EVENTS} from '../events.js'
import {Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import {startEvent} from '../actions.js'

const EventListingLayout = ({eventDisplayInfo, onClick}) =>  (
  <div>
    {Object.keys(EVENTS).filter(name => EVENTS[name].shouldDisplay(eventDisplayInfo))
      .map((eventName, index) => {
        return <Button onClick={onClick(eventName)} key={index}>
          {EVENTS[eventName].name}
        </Button>
      })
    }
  </div>
)

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (eventName) => () => dispatch(startEvent(eventName))
  }
}
const mapStateToProps = (state) => {
  var eventDisplayInfo = {
    level: state.level
  }
  return {
    eventDisplayInfo: eventDisplayInfo,
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(EventListingLayout)

export default App;
