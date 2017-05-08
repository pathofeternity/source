import React from 'react';
import './training_menu.css'
import {SKILLS} from '../skills.js'
import { connect } from 'react-redux'
import {Panel, Accordion, Fade} from 'react-bootstrap'
import {setPercent} from '../actions.js'

// Component with local state to expand/collapse panels.
const TrainingMenuLayout = ({cultivation, body, mind, soul, onChange, level, availableSkills, scores}) => (
	<div className="training-container">

		<Accordion>
			<Panel header={"Cultivation (" + (cultivation) + "%)"}>
				<table><tbody><tr>
					<td>Meditation</td>
					<td><input type="range" min="0" max="100"
						value={cultivation}
						disabled={true}/></td>
					<td>{cultivation}%</td>
				</tr></tbody></table>
			</Panel>
		</Accordion>
		<Fade in={level >= 2}>
			{level >= 2 ?
				<Accordion>
					<Panel header={"Basic (" + (body + mind + soul) + "%)"}>
						<table><tbody>
							<tr>
								<td>Physical Training</td>
								<td><input type="range" min="0" max="100"	value={body} onChange={e => {onChange("body", e)}}/></td>
								<td>{body}%</td>
							</tr>
							<Fade in={level >= 6}>
								{level >= 6 ?
									<tr>
										<td>Mental Training</td>
										<td><input type="range" min="0" max="100"	value={mind} onChange={e => {onChange("mind", e)}}/></td>
										<td>{mind}%</td>
									</tr>
									: <tr></tr>
								}
							</Fade>
							<Fade in={level >= 26}>
								{level >= 26 ?
									<tr>
										<td>Soul Training</td>
										<td><input type="range" min="0" max="100"	value={soul} onChange={e => {onChange("soul", e)}}/></td>
										<td>{soul}%</td>
									</tr>
									: <tr></tr>
								}</Fade>
						</tbody></table>
					</Panel>
				</Accordion>
				: <div></div> }
		</Fade>
		<Fade in={availableSkills.cultivationProficiency !== undefined}>
			{availableSkills.cultivationProficiency !== undefined ?
				<Accordion>
					<Panel header="Skills">
						<table><tbody>
							{Object.keys(scores)
								.filter(name => availableSkills[name])
								.map((name, index) =>{
									return <tr key={index}>
										<td>Train {SKILLS[name].name}</td>
										<td><input type="range" min="0" max="100"
											value={availableSkills[name].percent}
											onChange={e => {onChange(name, e)}}/></td>
										<td>{availableSkills[name].percent}%</td>
									</tr>})}
						</tbody></table>
					</Panel>
				</Accordion>
				: <div></div>
			}
		</Fade>
	</div>
)

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
		level: state.level,
		availableSkills: state.availableSkills,
		scores: state.scores,
	}
}


const TrainingMenu = connect(mapStateToProps, mapDispatchToProps)(TrainingMenuLayout)

export default TrainingMenu
