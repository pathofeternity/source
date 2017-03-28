import React, { PropTypes } from 'react';
import './training_bars.css';
import { connect } from 'react-redux'
import {ProgressBar, Button, Fade} from 'react-bootstrap'
import {BodyBar, MindBar, SoulBar} from './small_bars.js'

const spanOrButton = (value, max, rate) => {
  if (value >= max) {
    return <span className="nomargin"><Button>Breakthrough</Button></span>
  } else {
    return <span>{value} / {max} ({rate}/sec)</span>
  }
}

const BarsLayout = ({cultivation, cultivationMax, cultivationRate,
  showSmallBars}) =>  (
  <div className="bars-component">
    <div className="bars-container">
      <h2>Cultivation</h2>
      <ProgressBar max={cultivationMax} now={cultivation}
        label={spanOrButton(cultivation, cultivationMax, cultivationRate)} />
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
    showSmallBars: PropTypes.bool
  }

  const mapDispatchToProps = (dispatch) => {return {}}
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
