import React from 'react';
import { connect } from 'react-redux'
import {Tabs, Tab} from 'react-bootstrap'
import TrainingMenu from './training_menu.js'
import './tab_menu.css'

const TabLayout = () => (
    <Tabs id="tabs">
      <Tab eventKey={1} title="Training">
        <div className="tab-container">
          <TrainingMenu />
        </div>
      </Tab>
      <Tab eventKey={2} title="Sects">Tab 2 content</Tab>
      <Tab eventKey={3} title="Elements">Tab 3 content</Tab>
    </Tabs>

)

const TabMenu = connect()(TabLayout)

export default TabMenu
