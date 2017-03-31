import React from 'react';
import { connect } from 'react-redux'
import {Tabs, Tab, Accordion, Panel} from 'react-bootstrap'
import './skill_panel.css'

const SkillTabsLayout = () => (
    <Tabs id="tabs">
      <Tab eventKey={1} title="Battle">
        <div className="skill-tab-container">
          <div className="skill-listing">
            <Accordion>
              <Panel
                header={"Attack"}>
                <img className="skill-icon" src={require("../images/logo.svg")} /> React-ion
              </Panel>
            </Accordion>
            <Accordion>
              <Panel
                header={"Defense"}>
                <img className="skill-icon" src={require("../images/logo.svg")} /> Redux-ion
              </Panel>
            </Accordion>
          </div>
          <div className="skill-selection">
            <img className="skill-icon" src={require("../images/logo.svg")} />
            <img className="skill-icon" src={require("../images/empty.png")} />
            <img className="empty-slot" src={require("../images/empty.png")}/>
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

const SkillPanel = connect()(SkillTabsLayout)

export default SkillPanel
