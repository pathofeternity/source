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
    this.state = {progress: 0, disableButtons: false, hasHP: false, HP: 0}
  }

  componentWillMount() {
    const {steps, stepIndex} = this.props
    if (steps[stepIndex].isFight) {
      this.setState({HP: steps[stepIndex].maxHp})
    }
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
      if (steps[stepIndex + 1].isFight) {
        this.setState({HP: steps[stepIndex + 1].maxHp})
      }
      dispatch(progressEvent())
    } else {
      dispatch(endEvent())
    }
  }

  canPayCost(skillName) {
    const {currentStep, scores} = this.props
    var costFunction = currentStep.costFunction
    if (!costFunction) { return true }
    var cost = costFunction(skillName)
    if (cost.itemCosts) {
    }
    if (cost.statCosts) {
      var stat
      for (stat in cost.statCosts) {
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

  nonCombatStep() {
    const {currentStep, steps, equippedSkills, dispatch, stepIndex} = this.props
    return <div>
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
  }
  attackWith(skill) {console.log(skill)}

  // Enable/disable skills based on in-combat cost (MP) later on.
  renderAttackButton(skill, index) {
    if (skill === null) {return null}
    return <Button key={index}
      onClick={() => this.attackWith(skill)}>
      {SKILLS[skill].name}
    </Button>
  }

  combatStep() {
    const {equippedSkills, dispatch, steps, stepIndex} = this.props
    return <div>
      <div className="event-usable-skills">
        <ButtonToolbar>
          <Button bsStyle="primary"
            onClick={() => this.attackWith(DEFAULT)}
            disabled={this.state.disableButtons}>
            Normal Punch
          </Button>
          {
            equippedSkills.map((skill, index) => this.renderAttackButton(skill, index))
          }
          <Button onClick={() => dispatch(endEvent())}
            disabled={this.state.disableButtons}>
            Flee
          </Button>
        </ButtonToolbar>
      </div>
      <div className="event-progress-display">
        <h3>vs. {steps[stepIndex].enemyName}</h3>
        <ProgressBar max={steps[stepIndex].maxHp} now={this.state.HP}/>
      </div>
    </div>
  }
  render() {
    const {stepIndex, steps, eventTitle} = this.props
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
        {steps[stepIndex].isFight ? this.combatStep() : this.nonCombatStep()}
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
