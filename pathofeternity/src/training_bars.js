import React, { PropTypes } from 'react';
import './training_bars.css';
import { connect } from 'react-redux'
import {ProgressBar, Button} from 'react-bootstrap'

const spanOrButton = (value, max) => {
  if (value === max) {
    return <Button>Breakthrough</Button>
  } else {
    return <span>{value} / {max}</span>
  }
}

const BarsLayout = ({cultivation, body, mind, soul,
cultivationMax, bodyMax, mindMax, soulMax}) =>  (
  <div className="bars-component">
    <div className="bars-container">
      <h2>Cultivation</h2>
      <ProgressBar max={cultivationMax} now={cultivation}
        label={spanOrButton(cultivation, cultivationMax)} />
    </div>

    <div className="small bars-container">
      <h3>Body</h3>
      <ProgressBar max={bodyMax} now={body}
        label={<span>{body} / {bodyMax}</span>} />
    </div>
    <div className="small bars-container">
      <h3>Mind</h3>
      <ProgressBar max={mindMax} now={mind}
        label={<span>{mind} / {mindMax}</span>} />
    </div>
    <div className="small bars-container">
      <h3>Soul</h3>
      <ProgressBar max={soulMax} now={soul}
        label={<span>{soul} / {soulMax}</span>} />
    </div>
  </div>
  )
  BarsLayout.propTypes = {
    cultivation: PropTypes.number.isRequired,
    cultivationMax: PropTypes.number.isRequired,
    body: PropTypes.number.isRequired,
    bodyMax: PropTypes.number.isRequired,
    mind: PropTypes.number.isRequired,
    mindMax: PropTypes.number.isRequired,
    soul: PropTypes.number.isRequired,
    soulMax: PropTypes.number.isRequired,
  }

const mapDispatchToProps = (dispatch) => {return {}}
const mapStateToProps = (state) => {
  return {
    cultivation: state.scores.cultivation,
    cultivationMax: state.stats.cultivation.max,
    body: state.scores.body,
    bodyMax: state.stats.body.max,
    mind: state.scores.mind,
    mindMax: state.stats.mind.max,
    soul: state.scores.soul,
    soulMax: state.stats.soul.max,
  }
}

const TrainingBars = connect(mapStateToProps, mapDispatchToProps)(BarsLayout)

export default TrainingBars;
