import React from 'react';
import { connect } from 'react-redux'
import {Tabs, Tab} from 'react-bootstrap'
import TrainingMenu from './training_menu.js'
import SectListing from '../sect_panel/sect_listing.js'
import ItemsMenu from './items_menu.js'
import './tab_menu.css'

const TabLayout = () => (
    <Tabs id="tabs">
      <Tab eventKey={1} title="Training">
        <div className="tab-container">
          <TrainingMenu />
          <ItemsMenu />
        </div>
      </Tab>
      <Tab eventKey={2} title="Sects">
        <div className="tab-container">
          <SectListing/>
        </div>
      </Tab>
      <Tab eventKey={3} title="Elements">Tab 3 content</Tab>
      <Tab eventKey={4} title="Sects-Chosen">
        <div className="tab-container">Tab 4 content
        </div>
      </Tab>
    </Tabs>

)

const TabMenu = connect()(TabLayout)

export default TabMenu
