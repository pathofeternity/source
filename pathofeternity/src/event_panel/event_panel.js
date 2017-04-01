import React from 'react';
import { connect } from 'react-redux'
import {ButtonToolbar, Button,  ProgressBar} from 'react-bootstrap'
import {progressEvent, endEvent} from '../actions.js'
import {events} from '../events.js'
import './event_panel.css'

// May have to be changed to allow for intermediate step costs and rewards.
const eventNextStep = (stepIndex, steps, dispatch, finishAction) => {
  if (stepIndex < steps.length - 1) {
    dispatch(progressEvent())
  } else {
    dispatch(finishAction)
    dispatch(endEvent())
  }
}


class EventPanelLayout extends React.Component {
  constructor() {
    super()
    this.state = {progress: 0, disableButtons: false}
  }

  makeBarTimeout(i) {
    setTimeout(() => this.setState({progress: i}), i * 1000)
  }

  clickSkill(stepIndex, steps, dispatch, finishAction) {
    this.setState({disableButtons: true})
    var i
    for (i = 1; i <= 5; i++) {
      this.makeBarTimeout(i)
    }
    setTimeout(() => {
      eventNextStep(stepIndex, steps, dispatch, finishAction)
      this.setState({progress: 0, disableButtons:false})
    }, 6000)

  }

  render() {
    const {stepIndex, steps, dispatch, finishAction} = this.props
    return (
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
              <Button bsStyle="primary"
                onClick={() => this.clickSkill(stepIndex, steps, dispatch, finishAction)}
                disabled={this.state.disableButtons}
              >Focus</Button>
              <Button onClick={() => dispatch(endEvent())}
                disabled={this.state.disableButtons}>Cancel</Button>
            </ButtonToolbar>
          </div>
          <div className="event-progress-display">
            Focusing Energy
            <ProgressBar max={5} now={this.state.progress}/>


          </div>

        </div>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
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
