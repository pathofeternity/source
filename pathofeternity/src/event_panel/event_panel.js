import React from 'react';
import { connect } from 'react-redux'
import {ButtonToolbar, Button,  ProgressBar} from 'react-bootstrap'
import {successfulBreakthrough} from '../actions.js'
import {events} from '../events.js'
import './event_panel.css'

const EventPanelLayout = ({onFinish, steps}) => (
    <div className="event-panel">
      <div className="event-top">
        <h2>Breakthrough to Essence 1</h2>
        <ButtonToolbar className="event-buttonbar">
          {steps.map((step, index) =>
            <Button bsStyle="primary" key={index} className="toolbar-button">{step.buttonText}</Button>
          )}

        </ButtonToolbar>
      </div>
      <div>
        <div className="event-usable-skills">
          <ButtonToolbar>
            <Button bsStyle="primary">Focus</Button>
            <Button onClick={onFinish}>Cancel</Button>
          </ButtonToolbar>
        </div>
        <div className="event-progress-display">
          Focusing Energy
          <ProgressBar max={5} now={1}/>
        </div>
      </div>
    </div>

)

let currentEvent = {
  steps: [
    {
      buttonText: "Focus Mind",
      name: "Preparing Mind",
    },
    {
      buttonText: "Focus Energy",
      name: "Focusing Energy",
    }
  ],
  finishAction: successfulBreakthrough(),
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFinish: () => dispatch(currentEvent.finishAction),
    steps: currentEvent.steps
  }
}
const mapStateToProps = (state) => {
  return {

  }
}


const EventPanel = connect(mapStateToProps, mapDispatchToProps)(EventPanelLayout)

export default EventPanel
