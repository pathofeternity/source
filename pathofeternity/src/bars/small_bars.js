import React, { PropTypes } from 'react';
import './training_bars.css';
import { connect } from 'react-redux'
import {getTotalMultiplier} from '../utils.js'
import {ProgressBar} from 'react-bootstrap'

const SmallBarLayout = ({name, value, max, rate}) =>  (
    <div className="small bars-container">
      <h3>{name}</h3>
      <ProgressBar max={max} now={value}
        label={<span>{value.toFixed(0)} / {max.toFixed(0)} ({rate}/sec)</span>} />
    </div>
  )
  SmallBarLayout.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired
  }

const mapDispatchToProps = (dispatch) => {return {}}
const statRate = (stat) => stat.percent * stat.rate / 100
const mapStateToBodyProps = (state) => {
  var multiplier = getTotalMultiplier(state)
  return {
    name: "Body",
    value: Number(state.scores.body.toFixed(2)),
    max: state.stats.body.max,
    rate: statRate(state.stats.body) * multiplier.body,
  }
}
const mapStateToMindProps = (state) => {
  var multiplier = getTotalMultiplier(state)
  return {
    name: "Mind",
    value: Number(state.scores.mind.toFixed(2)),
    max: state.stats.mind.max,
    rate: statRate(state.stats.mind) * multiplier.mind,
  }
}
const mapStateToSoulProps = (state) => {
  var multiplier = getTotalMultiplier(state)
  return {
    name: "Soul",
    value: Number(state.scores.soul.toFixed(2)),
    max: state.stats.soul.max,
    rate: statRate(state.stats.soul) * multiplier.soul,
  }
}

const BodyBar = connect(mapStateToBodyProps, mapDispatchToProps)(SmallBarLayout)
const MindBar = connect(mapStateToMindProps, mapDispatchToProps)(SmallBarLayout)
const SoulBar = connect(mapStateToSoulProps, mapDispatchToProps)(SmallBarLayout)

export {BodyBar, MindBar, SoulBar}
