import React from 'react';
import { connect } from 'react-redux'
import {ButtonToolbar, Button,  ProgressBar} from 'react-bootstrap'
import {progressEvent, endEvent, deductCost} from '../actions.js'
import {EVENTS, DEFAULT} from '../events.js'
import {SKILLS, BATTLE, ALCHEMY, MEDITATION} from '../skills.js'
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

  eventNextStep(skillName) {
    const {steps, currentStep, stepIndex, dispatch} = this.props
    // Ensure we don't invoke undefined.
    if (currentStep.finishAction) {
      dispatch(currentStep.finishAction(skillName))
    }
    if (stepIndex < steps.length - 1) {
      dispatch(progressEvent())
    } else {
      dispatch(endEvent())
    }
  }

  canPayCost(skillName) {
    const {currentStep, scores, inventory} = this.props
    var costFunction = currentStep.costFunction
    if (!costFunction) { return true }
    var cost = costFunction(skillName)
    if (cost.itemCosts) {
    }
    if (cost.statCosts) {
      var stat
      for (stat of Object.keys(cost.statCosts)) {
        if (scores[stat] < cost.statCosts[stat]) {
          return false;
        }
      }
    }

    return true
  }

  clickSkill(skillName) {
    const {currentStep, dispatch} = this.props
    var costFunction = currentStep.costFunction
    if (costFunction) {
      // handle cost
      dispatch(deductCost(costFunction(skillName)))
    }
    this.setState({disableButtons: true})
    var i
    for (i = 1; i <= 5; i++) {
      this.makeBarTimeout(i)
    }
    setTimeout(() => {
      this.setState({progress: 0, disableButtons:false})
      this.eventNextStep(skillName)
    }, 6000)
  }

  canUseSkill(skillName) {
    const {currentStep} = this.props
    var legalSkillIndicator = currentStep.legalSkillIndicator
    if (!legalSkillIndicator) {
      return false
    }
    return legalSkillIndicator(skillName)
  }

  renderSkillButton(skill, index) {
    if (skill === null) {return null}
    return <Button key={index}
      onClick={() => this.clickSkill(skill)}
      disabled={this.state.disableButtons || !this.canUseSkill(skill) || !this.canPayCost(skill)}>
      {SKILLS[skill].name}
    </Button>
  }
  render() {
    const {stepIndex, currentStep, steps, dispatch, equippedSkills, eventTitle} = this.props
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
                    onClick={() => this.clickSkill(DEFAULT)}
                    disabled={this.state.disableButtons || !this.canPayCost(DEFAULT)}>
                    {steps[stepIndex].defaultActionName}
                  </Button>
                  : null
              }
              {
                equippedSkills.map((skill, index) => this.renderSkillButton(skill, index))
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
    currentStep: currentStep,
    eventTitle: event == null ? null : event.name,
    stepIndex: stepIndex,
    finishAction: event == null ? null : event.steps[stepIndex].finishAction,
    steps: event == null ? [] : event.steps,
    inventory: state.inventory,
    scores: state.scores
  }
}


const EventPanel = connect(mapStateToProps, mapDispatchToProps)(EventPanelLayout)

export default EventPanel
