import React from 'react';
import { connect } from 'react-redux'
import {ButtonToolbar, Button,  ProgressBar} from 'react-bootstrap'
import {progressEvent, endEvent} from '../actions.js'
import {events} from '../events.js'
import './event_panel.css'

// May have to be changed to allow for intermediate step costs and rewards.
const ContinueButton = (stepIndex, steps, dispatch, finishAction) => {
  if (stepIndex < steps.length - 1) {
    return <Button onClick={() => dispatch(progressEvent())}>Continue</Button>
  } else {
    return <Button onClick={() => {
      dispatch(finishAction)
      dispatch(endEvent())
    }}>
      Finish
    </Button>
  }
}

const EventPanelLayout = ({steps, stepIndex, dispatch, continueEvent, finishAction}) => (
  <div className="event-panel">
    <div className="event-top">
      <h2>Breakthrough to Essence 1</h2>
      <ButtonToolbar className="event-buttonbar">
        {steps.map((step, index) =>
          <Button bsStyle={index === stepIndex ? "primary" : "default"}
            key={index}
            className="toolbar-button">
            {step.buttonText}
          </Button>
        )}

      </ButtonToolbar>
    </div>
    <div>
      <div className="event-usable-skills">
        <ButtonToolbar>
          <Button bsStyle="primary">Focus</Button>
          <Button>Cancel</Button>
        </ButtonToolbar>
      </div>
      <div className="event-progress-display">
        Focusing Energy
        <ProgressBar max={5} now={1}/>
        {ContinueButton(stepIndex, steps, dispatch, finishAction)}

      </div>

    </div>
  </div>

)


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    continueEvent: () => dispatch(progressEvent())
  }
}
const mapStateToProps = (state) => {
  var event = state.activeEvent == null ? null : events[state.activeEvent]
  return {
    stepIndex: state.eventStep,
    finishAction: event == null ? null : event.finishAction,
    steps: event == null ? [] : event.steps
  }
}


const EventPanel = connect(mapStateToProps, mapDispatchToProps)(EventPanelLayout)

export default EventPanel
