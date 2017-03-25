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
        value={cultivation.percent}
        onChange={e => {onChange("cultivation", e)}}/></td>
      <td>{rate(cultivation)}/sec</td>
      <td>{cultivation.percent}%</td>
    </tr></tbody></table>
    <div>
      <Accordion>
        <Panel
          header={"Basic (" + (body.percent + mind.percent + soul.percent) + "%)"}>
          <table><tbody>
            <tr>
              <td>Physcial Training</td>
              <td><input type="range" min="0" max="100"
                value={body.percent}
                onChange={e => {onChange("body", e)}}/></td>
              <td>{rate(body)}/sec</td>
              <td>{body.percent}%</td>
            </tr>
            <tr>
              <td>Mental Training</td>
              <td><input type="range" min="0" max="100"
                value={mind.percent}
                onChange={e => {onChange("mind", e)}}/></td>
              <td>{rate(mind)}/sec</td>
              <td>{mind.percent}%</td>
            </tr>
            <tr>
              <td>Soul Training</td>
              <td><input type="range" min="0" max="100"
                value={soul.percent}
                onChange={e => {onChange("soul", e)}}/></td>
              <td>{rate(soul)}/sec</td>
              <td>{soul.percent}%</td>
            </tr>
          </tbody></table>
        </Panel>
      </Accordion>

    </div>
  </div>
)
TrainingMenuLayout.propTypes = {
  cultivation: PropTypes.object,
  body: PropTypes.object,
  mind: PropTypes.object,
  soul: PropTypes.object
}


const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (statName, e) => { dispatch(setPercent(statName, e.target.value))}
  }
}
const mapStateToProps = (state) => {
  return {
    cultivation: state.stats.cultivation,
    body: state.stats.body,
    mind: state.stats.mind,
    soul: state.stats.soul
  }
}


const TrainingMenu = connect(mapStateToProps, mapDispatchToProps)(TrainingMenuLayout)

export default TrainingMenu
