import React from 'react';
import './event_listing.css';
import {Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import {startEvent} from '../actions.js'

/*
This file technically defines two components:
AppLayout, a presentational component (displays whatever it gets in props)
and
App, a container component (created by connect(), provides props)
*/

// Uses block arrow syntax to restrict the scope to this file.
const EventListingLayout = ({maxCultivation, onClick}) =>  (

  <div>
    {maxCultivation > 100 ? <Button onClick={onClick('gatherHerbs')}>Gather Herbs</Button> : null}
    <Button onClick={onClick('thornyRoad')}>Travel through Woods</Button>
  </div>
)


const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (eventName) => () => dispatch(startEvent(eventName))
  }
}
const mapStateToProps = (state) => {
  return {
    maxCultivation: state.stats.cultivation.max,
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(EventListingLayout)

export default App;
