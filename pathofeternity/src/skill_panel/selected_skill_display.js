import React from 'react';
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'
import {SKILLS, BATTLE, PASSIVE/*, MEDITATION, ALCHEMY*/} from '../skills.js'
import {equipSkill, unequipSkill} from '../actions.js'

const makeButton = (skillName, skillList, dispatchAdd, dispatchRemove) => {
  if (skillList.indexOf(skillName) === -1) {
    return <Button onClick={dispatchAdd(skillName, skillList.indexOf(null))}
      disabled={skillList.indexOf(null) === -1}>Add</Button>
  }
  return <Button onClick={dispatchRemove(skillName)}>Remove</Button>
}

const SelectedSkillLayout = ({score, skillName, skillList, skillStats, eventType, dispatchAdd, dispatchRemove}) => {
  var skillObject = SKILLS[skillName]
  if (!skillName) {
    return <div></div>
  }
  if (skillObject.eventType !== eventType) {
    return <div></div>
  }
  return <div>
    {skillObject.name} Level {skillStats.level}
    <div>XP: {score.toFixed(2)} / {skillObject.xpRequiredFunction(skillStats.level)} </div>
    <div>{skillObject.description}</div>
    {eventType !== PASSIVE ? makeButton(skillName, skillList, dispatchAdd, dispatchRemove) : null}
  </div>
}
const mapDispatchToSelectedSkillProps = (dispatch) => {
  return {
    dispatchRemove: (skillName) => () => dispatch(unequipSkill(skillName)),
    dispatchAdd: (skillName, index) => () => dispatch(equipSkill(skillName, index))
  }
}
const mapStateToProps = (eventType) => (state) => {
  return {
    score: state.scores[state.selectedSkill],
    skillName: state.selectedSkill,
    skillStats: state.availableSkills[state.selectedSkill],
    skillList: state.equippedBattleSkills,
    eventType: eventType
  }
}
export const BattleSelectedSkill = connect(mapStateToProps(BATTLE), mapDispatchToSelectedSkillProps)(SelectedSkillLayout)
export const PassiveSelectedSkill = connect(mapStateToProps(PASSIVE), mapDispatchToSelectedSkillProps)(SelectedSkillLayout)
