import React from 'react';
import './items_menu.css'
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'
import {ITEMS} from '../items.js'



// Actually the right side of the training menu, includes foundation slider.
class ItemsMenuLayout extends React.Component {
  constructor() {
    super()
    var stateBuilder = {}
    Object.keys(ITEMS).forEach(item => {stateBuilder[item] = 1})
    this.state = stateBuilder
    console.log(this.state)
  }
  itemEntry(item, index, inventory) {


    if (inventory[item]) {
      return <div key={index}>
        {ITEMS[item].displayName} x{inventory[item]}
        <Button>Use</Button>
        <input type="number" defaultValue="1" min="1" max={inventory[item]}/>
      </div>
    }
    return null
  }
  render() {
    const {inventory} = this.props
    return (
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
          {
            Object.keys(ITEMS).map((item, index) => this.itemEntry(item, index, inventory))
          }
        </div>
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}
const mapStateToProps = (state) => {
  return {
    inventory: state.inventory
  }
}


const ItemsMenu = connect(mapStateToProps, mapDispatchToProps)(ItemsMenuLayout)

export default ItemsMenu
