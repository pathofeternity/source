import React from 'react';
import { connect } from 'react-redux'
import {Tabs, Tab, Accordion, Panel} from 'react-bootstrap'
import {skills, ATTACK_SKILL, DEFENSE_SKILL} from '../skills.js'
import {equipSkill, unequipSkill} from '../actions.js'
import './skill_panel.css'

const allowDrop = (event) => {event.preventDefault()}
const SkillDisplay = ({skillList, skillLimit, onDrop}) => {
  return (<div>{
    skillList.map((item, index) => {
      if (item == null) {
        return <img className="empty-slot" key={index} src={require("../images/empty.png")}
          onDragOver={allowDrop} onDrop={onDrop(index)}/>
      } else {
        return <img className="skill-icon" key={index} src={skills[item].icon}
          title={skills[item].name}
          onDragOver={allowDrop} onDrop={onDrop(index)}/>
      }
    })
  }

  </div>
)
}


    const SKILL_NAME = "skillName"
    const EVENT_TYPE = "eventType"
    const EQUIP = "equip"
    const UNEQUIP = "unequip"

    const mapDispatchToSkillDisplayProps = (dispatch) => {
      return {
        onDrop: (index) => (event) =>  {
          if (event.dataTransfer.getData(EVENT_TYPE) == EQUIP) {
            dispatch(equipSkill(event.dataTransfer.getData(SKILL_NAME), index))
          }
        }
      }
    }
    const mapStateToBattleProps = (state) => {
      return {
        skillList: state.equippedBattleSkills,
        skillLimit: state.battleSkillLimit
      }
    }
    const BattleSkillDisplay = connect(mapStateToBattleProps, mapDispatchToSkillDisplayProps)(SkillDisplay)

    const dragStart = (event) => {
      console.log(event.target.id)
      event.dataTransfer.setData(SKILL_NAME, event.target.id)
      event.dataTransfer.setData(EVENT_TYPE, EQUIP)
    }

    const FilteredSkillListing = (skillNameList, skillType) => (
    <div>
      {
        skillNameList.filter(skillName => skills[skillName].type == skillType)
        .map(skillName =>
          <div key={skills[skillName].name}
            id={skillName}
            onDragStart={dragStart}
            draggable="true">
            <img className="skill-icon" src={skills[skillName].icon} />{skills[skillName].name}
          </div>)
      }
    </div>
    )

const SkillTabsLayout = ({availableSkills, onClick, onDrop}) => (
    <Tabs id="tabs">
      <Tab eventKey={1} title="Battle">
        <div className="skill-tab-container">
          <div className="skill-listing">
            <Accordion>
              <Panel
                header={"Attack"}>
                {FilteredSkillListing(availableSkills, ATTACK_SKILL)}
              </Panel>
            </Accordion>
            <Accordion>
              <Panel
                header={"Defense"}>
                {FilteredSkillListing(availableSkills, DEFENSE_SKILL)}
              </Panel>
            </Accordion>
          </div>

          <BattleSkillDisplay/>
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
    onClick: (skillName) => () => dispatch(equipSkill(skillName)),

  }
}
const mapStateToProps = (state) => {
  return {
    availableSkills: state.availableSkills
  }
}


const SkillPanel = connect(mapStateToProps, mapDispatchToProps)(SkillTabsLayout)

export default SkillPanel
