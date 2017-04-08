import React from 'react';
import './event_listing.css';
import {Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import {grantItemAction} from '../actions.js'

/*
  This file technically defines two components:
  AppLayout, a presentational component (displays whatever it gets in props)
  and
  App, a container component (created by connect(), provides props)
*/

// Uses block arrow syntax to restrict the scope to this file.
const EventListingLayout = ({onClick}) =>  (
    <div>
      <Button onClick={onClick}>Gather Herbs</Button>
    </div>
  )


const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => dispatch(grantItemAction('herb', 2))
  }
}
const mapStateToProps = (state) => {
  return {
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(EventListingLayout)

export default App;
