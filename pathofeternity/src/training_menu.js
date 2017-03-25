import React, { PropTypes } from 'react';
import './training_menu.css'
import { connect } from 'react-redux'
import {Panel, Accordion} from 'react-bootstrap'
import {setPercent} from './actions.js'

const rate = (stat) => stat.percent * stat.rate / 100

// Component with local state to expand/collapse panels.
const TrainingMenuLayout = ({cultivation, body, mind, soul, onChange}) => (
  <div className="training-container">

    <table><tbody><tr>
      <td>Meditation</td>
      <td><input type="range" min="0" max="100"
        value={cultivation}
        onChange={e => {onChange("cultivation", e)}}/></td>
      <td>{cultivation}%</td>
    </tr></tbody></table>
    <div>
      <Accordion>
        <Panel
          header={"Basic (" + (body + mind + soul) + "%)"}>
          <table><tbody>
            <tr>
              <td>Physcial Training</td>
              <td><input type="range" min="0" max="100"
                value={body}
                onChange={e => {onChange("body", e)}}/></td>
              <td>{body}%</td>
            </tr>
            <tr>
              <td>Mental Training</td>
              <td><input type="range" min="0" max="100"
                value={mind}
                onChange={e => {onChange("mind", e)}}/></td>
              <td>{mind}%</td>
            </tr>
            <tr>
              <td>Soul Training</td>
              <td><input type="range" min="0" max="100"
                value={soul}
                onChange={e => {onChange("soul", e)}}/></td>
              <td>{soul}%</td>
            </tr>
          </tbody></table>
        </Panel>
      </Accordion>

    </div>
  </div>
)
TrainingMenuLayout.propTypes = {
  cultivation: PropTypes.number,
  body: PropTypes.number,
  mind: PropTypes.number,
  soul: PropTypes.number
}


const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (statName, e) => { dispatch(setPercent(statName, e.target.value))}
  }
}
const mapStateToProps = (state) => {
  return {
    cultivation: state.stats.cultivation.percent,
    body: state.stats.body.percent,
    mind: state.stats.mind.percent,
    soul: state.stats.soul.percent
  }
}


const TrainingMenu = connect(mapStateToProps, mapDispatchToProps)(TrainingMenuLayout)

export default TrainingMenu
