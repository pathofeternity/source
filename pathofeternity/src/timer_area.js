import React from 'react';
import { connect } from 'react-redux'
import {tick} from './actions.js'

class TimerLayout extends React.Component {
  render() {
    const {start, stop} = this.props
    return (
      <div>
        <button onClick={start}>Start</button>
          <button onClick={stop}>Stop</button>
          </div>
          )
        }

  componentDidMount() {
    const {onMount} = this.props
    onMount()
  }
  componentWillUnmount() {
    const {onUnmount} = this.props
    onUnmount()
  }

}

let timer = null;
const mapStateToProps = (state) => {return {}}


const mapDispatchToProps = (dispatch) => {
  const startTimer = () => {timer = setInterval(() => dispatch(tick()), 1000)}
  const stopTimer = () =>  {clearInterval(timer); timer = null}
  return {
    start: startTimer,
    stop: stopTimer,
    onMount: startTimer,
    onUnmount: stopTimer,
  }
}
const TimerArea = connect(mapStateToProps, mapDispatchToProps)(TimerLayout)
export default TimerArea
