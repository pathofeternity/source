import React, { PropTypes } from 'react';
import './items_menu.css'
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'

// Actually the right side of the training menu, includes foundation slider.
const ItemsMenuLayout = ({cultivation, body, mind, soul, onChange}) => (
  <div className="items-column-container">
    <div className="thin"><h3>Foundation and bar</h3></div>
    <div className="thin">
      Placeholder:
      <div className="small-slider">
        <input type="range" min="0" max="100"></input>
      </div>
      25%
    </div>
    <div className="thick">
      Herb <Button>Use</Button><input type="number" defaultValue="1" min="1"></input>
    </div>
  </div>
)


const mapDispatchToProps = (dispatch) => {
  return {
  }
}
const mapStateToProps = (state) => {
  return {
  }
}


const ItemsMenu = connect(mapStateToProps, mapDispatchToProps)(ItemsMenuLayout)

export default ItemsMenu
