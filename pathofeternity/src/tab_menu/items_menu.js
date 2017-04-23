import React from 'react';
import './items_menu.css'
import { connect } from 'react-redux'
import {useItem} from '../actions.js'
import {Button} from 'react-bootstrap'
import {ITEMS} from '../items.js'

class InstantUseLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {quantity: 1}
  }

  changeQuantity(event) {
    this.setState({quantity: event.target.value})
  }
  fixQuantity(event) {
      var quantity = event.target.value
      const {inventory, item} = this.props
      var newQuantity = Math.min(quantity, inventory[item])
      newQuantity = Math.max(1, quantity)
      this.setState({quantity:newQuantity})
  }
  useItem() {
    const {dispatch, inventory, item} = this.props
    dispatch(useItem(this.props.item, this.state.quantity))

    var limit = inventory[item] - this.state.quantity
    var newQuantity = Math.min(this.state.quantity, limit)
    newQuantity = Math.max(newQuantity, 1)

    this.setState({quantity: newQuantity})
  }

  render() {
    const {inventory, item} = this.props
    if (inventory[item] !== undefined) {
      return <div>
        {ITEMS[item].displayName} x{inventory[item]}
        <Button onClick={() => {this.useItem()}}
          disabled={this.state.quantity > inventory[item]}
        >Use</Button>
        <input type="number"
          onChange={(event) => {this.changeQuantity(event)}}
          onBlur={event => {this.fixQuantity(event)}}
          min="1" value={this.state.quantity} max={inventory[item]}/>
      </div>
    }
    return null
  }
}
const mapDispatchToEntryProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}
const mapStateToEntryProps = (state) => {
  return {
    inventory: state.inventory
  }
}
const InstantUseEntry = connect(mapStateToEntryProps, mapDispatchToEntryProps)(InstantUseLayout)

// Actually the right side of the training menu, includes foundation slider.
const ItemsMenuLayout = () => (
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
        Object.keys(ITEMS).map((item, index) => <InstantUseEntry key={index} item={item} />)
      }
    </div>
  </div>
)


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
