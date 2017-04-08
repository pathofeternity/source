import React, { PropTypes } from 'react';
import './event_listing.css';
import {Button} from 'react-bootstrap'
import { connect } from 'react-redux'

/*
  This file technically defines two components:
  AppLayout, a presentational component (displays whatever it gets in props)
  and
  App, a container component (created by connect(), provides props)
*/

// Uses block arrow syntax to restrict the scope to this file.
const EventListingLayout = () =>  (
    <div>
      <Button>Gather Herbs</Button>
    </div>
  )


const mapDispatchToProps = (dispatch) => {
  return {

  }
}
const mapStateToProps = (state) => {
  return {
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(EventListingLayout)

export default App;
