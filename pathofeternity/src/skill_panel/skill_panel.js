import React from 'react';
import { connect } from 'react-redux'
import {Tabs, Tab, Accordion, Panel} from 'react-bootstrap'
import {skills, ATTACK_SKILL, DEFENSE_SKILL} from '../skills.js'
import {equipSkill,selectSkill, unequipSkill} from '../actions.js'
import './skill_panel.css'


const SKILL_NAME = "skillName"
const EVENT_TYPE = "eventType"
const FROM_INDEX = "fromIndex"
const EQUIP = "equip"
const UNEQUIP = "unequip"
const MOVE = "move"
const DONE = "done"

const allowDrop = (event) => {event.preventDefault()}

const SkillDisplay = ({skillList, skillLimit, onDrop, onDragEnd, unequipDragStart, onClick}) => {
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
            key={index} src={skills[item].icon}
            draggable="true"
            title={skills[item].name}  alt={skills[item].name}
            onDragStart={unequipDragStart(index)}
            onDragEnd={onDragEnd(item, index)}
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
      dispatch(unequipSkill(event.dataTransfer.getData(SKILL_NAME),
      parseInt(event.dataTransfer.getData(FROM_INDEX), 10)))
      dispatch(equipSkill(event.dataTransfer.getData(SKILL_NAME),
      index))
    }
    event.stopPropagation()
  }
  const onDragEnd = (skillName, index) => (event) => {
    if (ignoreEvent) {
      return
    }
    dispatch(unequipSkill(skillName, index))
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
const BattleSkillDisplay = connect(mapStateToBattleProps, mapDispatchToSkillDisplayProps)(SkillDisplay)

const equipDragStart = (event) => {
  event.dataTransfer.setData(SKILL_NAME, event.target.id)
  event.dataTransfer.setData(EVENT_TYPE, EQUIP)
}

const FilteredSkillListing = (skillNameList, skillType, onClick) => (
  <div>
    {
      skillNameList.filter(skillName => skills[skillName].type === skillType)
      .map(skillName =>
        <div key={skills[skillName].name}
          id={skillName}
          onDragStart={equipDragStart}
          onClick={onClick(skillName)}
          draggable="true">
          <img className="skill-icon" alt={skills[skillName]}
            src={skills[skillName].icon}
          />
          {skills[skillName].name}
        </div>
      )
    }
  </div>
)

const SelectedSkillDisplay = ({skillName}) => (
  <div>
    {skillName}
  </div>
)
const mapDispatchToSelectedSkillProps = (dispatch) => {
  return {}
}
const mapStateToSelectedSkillProps = (state) => {
  return {
    skillName: state.selectedSkill
  }
}
const SelectedSkillComponent = connect(mapStateToSelectedSkillProps, mapDispatchToSelectedSkillProps)(SelectedSkillDisplay)

const SkillTabsLayout = ({availableSkills, onClick}) => (
  <Tabs id="tabs">
    <Tab eventKey={1} title="Battle">
      <div className="skill-tab-container">
        <div className="skill-listing">
          <Accordion>
            <Panel
              header={"Attack"}>
              {FilteredSkillListing(availableSkills, ATTACK_SKILL, onClick)}
            </Panel>
          </Accordion>
          <Accordion>
            <Panel
              header={"Defense"}>
              {FilteredSkillListing(availableSkills, DEFENSE_SKILL, onClick)}
            </Panel>
          </Accordion>
        </div>

        <BattleSkillDisplay/>
        <SelectedSkillComponent/>
      </div>
    </Tab>
    <Tab eventKey={2} title="Alchemy">
      <div className="skill-tab-container">
      </div>
    </Tab>
    <Tab eventKey={3} title="Meditation">
      <div className="skill-tab-container">
      </div>
    </Tab>
    <Tab eventKey={4} title="Passive">
      <div className="skill-tab-container">
      </div>
    </Tab>
  </Tabs>
)

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (skillName) => () => dispatch(selectSkill(skillName)),

  }
}
const mapStateToProps = (state) => {
  return {
    availableSkills: state.availableSkills
  }
}


const SkillPanel = connect(mapStateToProps, mapDispatchToProps)(SkillTabsLayout)

export default SkillPanel
