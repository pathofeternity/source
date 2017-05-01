import React from 'react';
import { connect } from 'react-redux'
import {Tabs, Tab, Accordion, Panel, ProgressBar, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {SKILLS, ATTACK_SKILL, DEFENSE_SKILL, PASSIVE} from '../skills.js'
import {selectSkill} from '../actions.js'
import {BattleSkillDisplay} from './skill_icons_display.js'
import {BattleSelectedSkill, PassiveSelectedSkill} from './selected_skill_display.js'
import {SKILL_NAME, EVENT_TYPE, EQUIP} from './event_constants.js'
import {getTotalMultiplier} from '../utils.js'
import './skill_panel.css'

const equipDragStart = (event) => {
  event.dataTransfer.setData(SKILL_NAME, event.target.id)
  event.dataTransfer.setData(EVENT_TYPE, EQUIP)
}

const TooltipContentsLayout = ({availableSkills, scores, skillName, multiplier}) => {
var skillObject = SKILLS[skillName]
  var level = availableSkills[skillName].level
  var xpRequired = skillObject.xpRequiredFunction(level)
  var multiplierNumber = multiplier[skillName] ? multiplier[skillName] : 1
  var totalRate = availableSkills[skillName].rate * availableSkills[skillName].percent * multiplierNumber / 100
  return <div>
    {level === SKILLS[skillName].maxLevel ? <div>MAX</div> :
      <div>{scores[skillName]} / {xpRequired}, {totalRate}/sec</div>
    }
    <div>{SKILLS[skillName].description}</div>
    <div>Current / Next</div>
  </div>
}

const singleSkillDispatchToProps = (dispatch) => {
  return {
    onClick: (skillName) => () => dispatch(selectSkill(skillName)),

  }
}
const singleSkillStateToProps = (state) => {
  return {
    availableSkills: state.availableSkills,
    scores: state.scores,
    multiplier: getTotalMultiplier(state),
  }
}

const TooltipContents = connect(singleSkillStateToProps, singleSkillDispatchToProps)(TooltipContentsLayout)

const SingleSkillLayout = ({availableSkills, scores, skillName, onClick, multiplier}) => {
  var level = availableSkills[skillName].level
  var maxLevel = SKILLS[skillName].maxLevel
  var skillObject = SKILLS[skillName]
  var currXp = scores[skillName]
  var xpRequired = skillObject.xpRequiredFunction(level)

  return <div onClick={onClick(skillName)}>
    <OverlayTrigger placement="bottom" overlay={<Tooltip id="skill-tip"><TooltipContents skillName={skillName}/></Tooltip>}>
      <div className="name-div">
        <img className="skill-icon" alt={skillObject.name}
          src={skillObject.icon} draggable="false"
        />
        {skillObject.name} Lv. {level === maxLevel ? "MAX" : level}
      </div>
    </OverlayTrigger>
    {level === maxLevel ? null : <ProgressBar className="smallProgress" max={xpRequired} now={currXp}/>}

  </div>
}

const SingleSkill = connect(singleSkillStateToProps, singleSkillDispatchToProps)(SingleSkillLayout)

const FilteredSkillListing = (skillNameList, skillType) => (
  <div>
    {
      Object.keys(skillNameList)
      .filter(skillName => SKILLS[skillName].type === skillType)
      .map(skillName =>
        <div key={SKILLS[skillName].name}
          id={skillName}
          onDragStart={equipDragStart}
          draggable="true">
          <SingleSkill skillName={skillName}/>
        </div>
      )
    }
  </div>
)


const SkillTabsLayout = ({availableSkills}) => (
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
            {FilteredSkillListing(availableSkills, PASSIVE)}
          </Panel>
        </div>
        <PassiveSelectedSkill/>
      </div>
    </Tab>
  </Tabs>
)

const skillTabsDispatchToProps = (dispatch) => {
  return {}
}
const skillTabsStateToProps = (state) => {
  return {
    availableSkills: state.availableSkills
  }
}

const SkillPanel = connect(skillTabsStateToProps, skillTabsDispatchToProps)(SkillTabsLayout)

export default SkillPanel
