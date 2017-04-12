import React from 'react';
import { connect } from 'react-redux'
import {ButtonToolbar, Button,  ProgressBar} from 'react-bootstrap'
import {progressEvent, endEvent} from '../actions.js'
import {EVENTS} from '../events.js'
import {BATTLE, ALCHEMY, MEDITATION} from '../skills.js'
import './event_panel.css'

// May have to be changed to allow for intermediate step costs and rewards.



class EventPanelLayout extends React.Component {
  constructor() {
    super()
    this.state = {progress: 0, disableButtons: false}
  }

  makeBarTimeout(i) {
    setTimeout(() => this.setState({progress: i}), i * 1000)
  }

  eventNextStep(stepIndex, skillName) {
    const {steps, dispatch} = this.props
    var step = steps[stepIndex]
    if (step.finishAction) {
      dispatch(step.finishAction(skillName))
    }
    if (stepIndex < steps.length - 1) {
      dispatch(progressEvent())
    } else {
      dispatch(endEvent())
    }
  }

  clickSkill(stepIndex, skillName) {
    const {steps, dispatch} = this.props
    // cost gets handled here.
    this.setState({disableButtons: true})
    var i
    for (i = 1; i <= 5; i++) {
      this.makeBarTimeout(i)
    }
    setTimeout(() => {
      this.setState({progress: 0, disableButtons:false})
      this.eventNextStep(stepIndex, skillName)
    }, 6000)
  }

  render() {
    const {stepIndex, steps, dispatch, equippedSkills, eventTitle} = this.props
    var currentStep = steps[stepIndex]
    return (
      <div className="event-panel">
        <div className="event-top">
          <h2>{eventTitle}</h2>
          <ButtonToolbar className="event-buttonbar">
            {steps.map((step, index) =>
              <Button bsStyle={index === stepIndex ? "primary" : "default"}
                key={index}
                className="toolbar-button">
                {step.titleText}
              </Button>
            )}

          </ButtonToolbar>
        </div>
        <div>
          <div className="event-usable-skills">
            <ButtonToolbar>
              {
                currentStep.showDefaultAction ?
                  <Button bsStyle="primary"
                    onClick={() => this.clickSkill(stepIndex, "default")}
                    disabled={this.state.disableButtons}>
                    {steps[stepIndex].defaultActionName}
                  </Button>
                  : null
              }
              {
                equippedSkills.map((skill, index) => {
                  if (skill === null) {return null}
                    return <Button key={index}>{skill}</Button>
                })

              }
              <Button onClick={() => dispatch(endEvent())}
                disabled={this.state.disableButtons}>
                Cancel
              </Button>
            </ButtonToolbar>
          </div>
          <div className="event-progress-display">
            <h3>{steps[stepIndex].displayText}</h3>
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
  var event = state.activeEvent == null ? null : EVENTS[state.activeEvent]
  var stepIndex = state.eventStep
  var currentStep = event.steps[stepIndex]
  var equippedSkills
  switch (currentStep.type) {
    case BATTLE:
      equippedSkills = state.equippedBattleSkills
      break
    case MEDITATION:
      equippedSkills = state.equippedMeditationSkills
      break
    case ALCHEMY:
      equippedSkills = state.equippedAlchemySkills
      break
    default:
      console.log("Illegal skill type: " + currentStep.type)
  }
  return {
    equippedSkills: equippedSkills,
    eventTitle: event == null ? null : event.name,
    stepIndex: stepIndex,
    finishAction: event == null ? null : event.steps[stepIndex].finishAction,
    steps: event == null ? [] : event.steps
  }
}


const EventPanel = connect(mapStateToProps, mapDispatchToProps)(EventPanelLayout)

export default EventPanel
