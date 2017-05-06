import React from 'react';
import './event_listing.css';
import {EVENTS} from '../events.js'
import {Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import {startEvent} from '../actions.js'

const EventListingLayout = ({maxCultivation, availableEvents, onClick}) =>  (

  <div>
    {availableEvents.map((eventName, index) => {
      return <Button onClick={onClick(eventName)} key={index}>
        {EVENTS[eventName].name}
      </Button>
    })}
  </div>
)


const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (eventName) => () => dispatch(startEvent(eventName))
  }
}
const mapStateToProps = (state) => {
  return {
    availableEvents: state.availableEvents,
    maxCultivation: state.stats.cultivation.max,
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(EventListingLayout)

export default App;
