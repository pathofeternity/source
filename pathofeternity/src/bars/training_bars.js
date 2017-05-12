import React, { PropTypes } from 'react';
import './training_bars.css';
import {startEvent} from '../actions.js'
import { connect } from 'react-redux'
import {getTotalMultiplier} from '../utils.js'
import {ProgressBar, Button, Fade} from 'react-bootstrap'
import {BodyBar, MindBar, SoulBar} from './small_bars.js'
import {levelName, formatNumber} from '../utils.js'

const spanOrButton = (value, max, rate, startBreakthrough, hasExistingEvent) => {

  if (value >= max) {
    return <span className="nomargin">
      <Button title={hasExistingEvent ? "An event is already active." : "Start Breakthrough"}
        disabled={hasExistingEvent} onClick={startBreakthrough}>Breakthrough</Button>
    </span>
  } else {
    return <span>{formatNumber(value)} / {formatNumber(max)} ({formatNumber(rate)}/sec)</span>
  }
}

const BarsLayout = ({cultivation, cultivationMax, level, cultivationRate,
  startBreakthrough, hasExistingEvent}) =>  (
  <div className="bars-component">
    <div className="bars-container">
      <h2>Cultivation - {levelName(cultivation)}</h2>
      <ProgressBar className="statProgress" max={cultivationMax} now={cultivation}
        label={spanOrButton(cultivation, cultivationMax, cultivationRate,
        startBreakthrough, hasExistingEvent)} />
    </div>
    <Fade in={level >= 2}><div>
      <BodyBar/>
    </div></Fade>
    <Fade in={level >= 6}><div>
      <MindBar/>
    </div></Fade>
    <Fade in={level >= 26}><div>
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
    var multiplier = getTotalMultiplier(state)
    return {
      cultivation: Number(state.scores.cultivation.toFixed(2)),
      cultivationMax: state.stats.cultivation.max,
      cultivationRate: statRate(state.stats.cultivation) * (multiplier.cultivation ? multiplier.cultivation : 1),
      hasExistingEvent: state.activeEvent != null,
      level: state.level
    }
  }

  const TrainingBars = connect(mapStateToProps, mapDispatchToProps)(BarsLayout)

  export default TrainingBars;
