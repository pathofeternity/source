import React from 'react';
import { connect } from 'react-redux'
import {SKILLS, PASSIVE} from '../skills.js'

const PassiveSelectedSkillLayout = ({skillName, skillList, eventType}) => {
  if (!skillName) {
    return <div></div>
  }
  if (SKILLS[skillName].eventType !== eventType) {
    return <div></div>
  }
  return <div>
    {skillName}
    <div>{SKILLS[skillName].description}</div>
  </div>
}
const mapDispatchToSelectedSkillProps = (dispatch) => {
  return { }
}
const mapStateToSelectedSkillProps = (state) => {
  return {
    skillName: state.selectedSkill,
    eventType: PASSIVE
  }
}
export const PassiveSelectedSkill = connect(mapStateToSelectedSkillProps, mapDispatchToSelectedSkillProps)(PassiveSelectedSkillLayout)
