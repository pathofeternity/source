import React, { PropTypes } from 'react';
import './training_bars.css';
import {startEvent} from '../actions.js'
import { connect } from 'react-redux'
import {ProgressBar, Button, Fade} from 'react-bootstrap'
import {BodyBar, MindBar, SoulBar} from './small_bars.js'

const spanOrButton = (value, max, rate, startBreakthrough) => {
  if (value >= max) {
    return <span className="nomargin">
      <Button onClick={startBreakthrough}>Breakthrough</Button>
    </span>
  } else {
    return <span>{value} / {max} ({rate}/sec)</span>
  }
}

const BarsLayout = ({cultivation, cultivationMax, cultivationRate,
  startBreakthrough}) =>  (
  <div className="bars-component">
    <div className="bars-container">
      <h2>Cultivation</h2>
      <ProgressBar max={cultivationMax} now={cultivation}
        label={spanOrButton(cultivation, cultivationMax, cultivationRate,
        startBreakthrough)} />
    </div>
    <Fade in={cultivationMax >= 100}><div>
      <BodyBar/>
      <MindBar/>
      <SoulBar/>
    </div></Fade>

  </div>
  )
  BarsLayout.propTypes = {
    cultivation: PropTypes.number.isRequired,
    cultivationMax: PropTypes.number.isRequired,
    cultivationRate: PropTypes.number.isRequired,
  }

  const mapDispatchToProps = (dispatch) => {return {
    startBreakthrough: () => dispatch(startEvent("breakthroughE1"))
  }}
  const statRate = (stat) => stat.percent * stat.rate / 100
  const mapStateToProps = (state) => {
    return {
      cultivation: Number(state.scores.cultivation.toFixed(2)),
      cultivationMax: state.stats.cultivation.max,
      cultivationRate: statRate(state.stats.cultivation)
    }
  }

  const TrainingBars = connect(mapStateToProps, mapDispatchToProps)(BarsLayout)

  export default TrainingBars;
