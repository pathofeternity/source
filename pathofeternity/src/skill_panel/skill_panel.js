import React from 'react';
import { connect } from 'react-redux'
import {Tabs, Tab, Accordion, Panel, Button} from 'react-bootstrap'
import {skills, ATTACK_SKILL, DEFENSE_SKILL, BATTLE, MEDITATION, ALCHEMY} from '../skills.js'
import {equipSkill,selectSkill, unequipSkill} from '../actions.js'
import {BattleSkillDisplay} from './skill_icons_display.js'
import {SKILL_NAME, EVENT_TYPE, EQUIP} from './event_constants.js'
import './skill_panel.css'




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

const SelectedSkillDisplay = ({skillName, skillList, eventType, dispatchAdd, dispatchRemove}) => {
  if (!skillName) {
    return <div></div>
  }
  if (skills[skillName].eventType !== eventType) {
    return <div></div>
  }
  if (skillList.indexOf(skillName) === -1) {
    return <div>
      {skillName}
      <div>Skill description would go here if we had them.</div>
      <Button onClick={dispatchAdd(skillName, skillList.indexOf(null))}
        disabled={skillList.indexOf(null) === -1}>Add</Button>
    </div>
  }
  return <div>
    {skillName}
    <div>Skill description would go here if we had them.</div>
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
