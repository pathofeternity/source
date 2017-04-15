import React from 'react';
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'
import {SKILLS, BATTLE /*, MEDITATION, ALCHEMY*/} from '../skills.js'
import {equipSkill, unequipSkill} from '../actions.js'

const SelectedSkillLayout = ({skillName, skillList, eventType, dispatchAdd, dispatchRemove}) => {
  if (!skillName) {
    return <div></div>
  }
  if (SKILLS[skillName].eventType !== eventType) {
    return <div></div>
  }
  if (skillList.indexOf(skillName) === -1) {
    return <div>
      {SKILLS[skillName].name}
      <div>{SKILLS[skillName].description}</div>
      <Button onClick={dispatchAdd(skillName, skillList.indexOf(null))}
        disabled={skillList.indexOf(null) === -1}>Add</Button>
    </div>
  }
  return <div>
    {SKILLS[skillName].name}
    <div>{SKILLS[skillName].description}</div>
    <Button onClick={dispatchRemove(skillName)}>Remove</Button>
  </div>
}
const mapDispatchToSelectedSkillProps = (dispatch) => {
  return {
    dispatchRemove: (skillName) => () => dispatch(unequipSkill(skillName)),
    dispatchAdd: (skillName, index) => () => dispatch(equipSkill(skillName, index))
  }
}
const mapStateToSelectedSkillProps = (state) => {
  return {
    skillName: state.selectedSkill,
    skillList: state.equippedBattleSkills,
    eventType: BATTLE
  }
}
export const BattleSelectedSkill = connect(mapStateToSelectedSkillProps, mapDispatchToSelectedSkillProps)(SelectedSkillLayout)
