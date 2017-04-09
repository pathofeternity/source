import React, { PropTypes } from 'react';
import './training_menu.css'
import { connect } from 'react-redux'
import {Panel, Accordion, Fade} from 'react-bootstrap'
import {setPercent} from '../actions.js'

// Component with local state to expand/collapse panels.
const TrainingMenuLayout = ({cultivation, body, mind, soul, cultivationMax, onChange}) => (
	<div className="training-container">

		<Accordion>
			<Panel header={"Cultivation (" + (cultivation) + "%)"}>
				<table><tbody><tr>
					<td>Meditation</td>
					<td><input type="range" min="0" max="100"
					value={cultivation}
					onChange={e => {onChange("cultivation", e)}}/></td>
					<td>{cultivation}%</td>
				</tr></tbody></table>
			</Panel>
			<Fade in={cultivationMax >= 1e2}>
				<Panel header={"Basic (" + (body + mind + soul) + "%)"}>
					<table><tbody>
					<tr>
						<td>Physical Training</td>
						<td><input type="range" min="0" max="100"	value={body} onChange={e => {onChange("body", e)}}/></td>
						<td>{body}%</td>
					</tr>
					<Fade in={cultivationMax >= 1e6}>
						<tr>
							<td>Mental Training</td>
							<td><input type="range" min="0" max="100"	value={mind} onChange={e => {onChange("mind", e)}}/></td>
							<td>{mind}%</td>
						</tr>
					</Fade>
					<Fade in={cultivationMax >= 1e26}>
						<tr>
							<td>Soul Training</td>
							<td><input type="range" min="0" max="100"	value={soul} onChange={e => {onChange("soul", e)}}/></td>
							<td>{soul}%</td>
						</tr>
					</Fade>
					</tbody></table>
				</Panel>
			</Fade>
		</Accordion>
	</div>
)
TrainingMenuLayout.propTypes = {
	cultivation: PropTypes.number,
	cultivationMax: PropTypes.number,
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
		soul: state.stats.soul.percent,
		cultivationMax: state.stats.cultivation.max,
	}
}


const TrainingMenu = connect(mapStateToProps, mapDispatchToProps)(TrainingMenuLayout)

export default TrainingMenu
