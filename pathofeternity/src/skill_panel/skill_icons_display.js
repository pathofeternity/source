import React from 'react';
import { connect } from 'react-redux'
import {SKILLS} from '../skills.js'
import {SKILL_NAME, FROM_INDEX, EVENT_TYPE, MOVE, EQUIP} from './event_constants.js'
import {equipSkill,selectSkill, unequipSkill} from '../actions.js'

const allowDrop = (event) => {event.preventDefault()}

const SkillIconsLayout = ({skillList, skillLimit, onDrop, onDragEnd, unequipDragStart, onClick}) => {
  return (<div>
    {
      skillList.map((item, index) => {
        if (item == null) {
          return <img className="empty-slot" key={index}
            src={require("../images/empty.png")}
            title="No skill" alt="No skill"
            onDragOver={allowDrop} onDrop={onDrop(item, index)}
          />
        } else {
          return <img className="skill-icon" id={item}
            key={index} src={SKILLS[item].icon}
            draggable="true"
            title={SKILLS[item].name}  alt={SKILLS[item].name}
            onDragStart={unequipDragStart(index)}
            onDragEnd={onDragEnd(item)}
            onClick={onClick(item)}
            onDragOver={allowDrop} onDrop={onDrop(item, index)}
          />
        }
      })
    }
  </div>)
}
const mapDispatchToSkillDisplayProps = (dispatch) => {
  var ignoreEvent
  const unequipDragStart = (index) => (event) => {
    ignoreEvent = false;
    event.dataTransfer.setData(SKILL_NAME, event.target.id)
    event.dataTransfer.setData(FROM_INDEX, index)
    event.dataTransfer.setData(EVENT_TYPE, MOVE)
  }

  const onDrop = (skillName, index) => (event) =>  {
    ignoreEvent = true;
    if (event.dataTransfer.getData(EVENT_TYPE) === EQUIP) {
      dispatch(equipSkill(event.dataTransfer.getData(SKILL_NAME), index))
    }
    if (event.dataTransfer.getData(EVENT_TYPE) === MOVE) {
      dispatch(unequipSkill(event.dataTransfer.getData(SKILL_NAME)))
      dispatch(equipSkill(event.dataTransfer.getData(SKILL_NAME),
      index))
    }
    event.stopPropagation()
  }
  const onDragEnd = (skillName) => (event) => {
    if (ignoreEvent) {
      return
    }
    dispatch(unequipSkill(skillName))
  }
  return {
    onDrop: onDrop,
    onDragEnd: onDragEnd,
    unequipDragStart: unequipDragStart,
    onClick: (skillName) => () => dispatch(selectSkill(skillName)),
  }
}
const mapStateToBattleProps = (state) => {
  return {
    skillList: state.equippedBattleSkills,
    skillLimit: state.battleSkillLimit
  }
}
export const BattleSkillDisplay = connect(mapStateToBattleProps, mapDispatchToSkillDisplayProps)(SkillIconsLayout)
