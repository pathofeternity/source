import React from 'react';
import { connect } from 'react-redux'
import {Tabs, Tab, Accordion, Panel} from 'react-bootstrap'
import {skills, ATTACK_SKILL, DEFENSE_SKILL} from '../skills.js'
import {equipSkill, unequipSkill} from '../actions.js'
import './skill_panel.css'

const SkillDisplay = ({skillList, skillLimit, onClick}) => {
  let emptyArr = Array.apply(null, Array(skillLimit - skillList.length))
  return (<div>
    {
      skillList.map((item, index) =>
        <img className="skill-icon" key={index} src={skills[item].icon} onClick={onClick(item)} title={skills[item].name}/>)
    }
    {
      emptyArr.map((_, index) =>
        <img className="empty-slot" key={skillList.length + index} src={require("../images/empty.png")}/>)
    }
  </div>
)
}

const mapDispatchToSkillDisplayProps = (dispatch) => {
  return {
    onClick: (skillName) => () => dispatch(unequipSkill(skillName))
  }
}
const mapStateToBattleProps = (state) => {
  return {
    skillList: state.equippedBattleSkills,
    skillLimit: state.battleSkillLimit
  }
}
const BattleSkillDisplay = connect(mapStateToBattleProps, mapDispatchToSkillDisplayProps)(SkillDisplay)

const FilteredSkillListing = (skillNameList, skillType, onClick) => (
  <div>
    {
      skillNameList.filter(skillName => skills[skillName].type == skillType)
      .map(skillName => <div key={skills[skillName].name} onClick={onClick(skillName)}>
        <img className="skill-icon" src={skills[skillName].icon} />{skills[skillName].name}
      </div>)
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
          <div className="skill-selection">
            <BattleSkillDisplay/>
          </div>
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
    </Tabs>
)

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (skillName) => () => dispatch(equipSkill(skillName))
  }
}
const mapStateToProps = (state) => {
  return {
    availableSkills: state.availableSkills
  }
}


const SkillPanel = connect(mapStateToProps, mapDispatchToProps)(SkillTabsLayout)

export default SkillPanel
