import React from 'react';
import { connect } from 'react-redux'
import {Tabs, Tab, Accordion, Panel} from 'react-bootstrap'
import {SKILLS, ATTACK_SKILL, DEFENSE_SKILL, PASSIVE} from '../skills.js'
import {selectSkill} from '../actions.js'
import {BattleSkillDisplay} from './skill_icons_display.js'
import {BattleSelectedSkill} from './selected_skill_display.js'
import {PassiveSelectedSkill} from './passive_selected_skill.js'
import {SKILL_NAME, EVENT_TYPE, EQUIP} from './event_constants.js'
import './skill_panel.css'

const equipDragStart = (event) => {
  event.dataTransfer.setData(SKILL_NAME, event.target.id)
  event.dataTransfer.setData(EVENT_TYPE, EQUIP)
}

const FilteredSkillListing = (skillNameList, skillType, onClick) => (
  <div>
    {
      Object.keys(skillNameList)
      .filter(skillName => SKILLS[skillName].type === skillType)
      .map(skillName =>
        <div key={SKILLS[skillName].name}
          id={skillName}
          onDragStart={equipDragStart}
          onClick={onClick(skillName)}
          draggable="true">
          <img className="skill-icon" alt={SKILLS[skillName]}
            src={SKILLS[skillName].icon} draggable="false"
          />
          {SKILLS[skillName].name}
        </div>
      )
    }
  </div>
)


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
        <BattleSelectedSkill/>
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
        <div className="skill-listing">
          <Panel header={"Passives"}>
            {FilteredSkillListing(availableSkills, PASSIVE, onClick)}
          </Panel>
        </div>
        <PassiveSelectedSkill/>
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
